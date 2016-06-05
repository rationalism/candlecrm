(ns spectra.loom
  (:require [loom.alg :as galg]
            [loom.attr :as attr]
            [loom.graph :as graph]
            [loom.io :as gviz]
            [spectra.common :refer :all]))

(defn has-edge? [g edge]
  (graph/has-edge? g (first edge) (second edge)))

(defn multi-edge [g edge]
  (map #(conj edge %) (attr/attr g edge :label)))

(defn add-edge [g [e1 e2 e3 :as edge]]
  {:pre [(= 3 (count edge))]}
  (cond
    (has-edge? g edge)
    (->> (attr/attr g [e1 e2] :label) (cons e3)
         distinct (attr/add-attr g edge :label))
    :else (attr/add-attr
           (graph/add-edges g [e1 e2])
           edge :label [e3])))

(defn nodes [g]
  (graph/nodes g))
  
(defn edges-impl [g]
  (graph/edges g))

(defn edges [g]
  (mapcat #(multi-edge g %) (edges-impl g)))

(defn out-edges [g node]
  (mapcat #(multi-edge g %) (graph/out-edges g node)))

(defn in-edges [g node]
  (mapcat #(multi-edge g %) (graph/in-edges g node)))

(defn all-edges [g node]
  (concat (out-edges g node) (in-edges g node)))

(defn out-edge-label [g node label]
  (->> (out-edges g node)
       (filter #(= (third %) label))
       first))

(defn in-edge-label [g node label]
  (->> (in-edges g node)
       (filter #(= (third %) label))
       first))

(defn fan-in [g node]
  (count (in-edges g node)))

(defn fan-out [g node]
  (count (out-edges g node)))

(defn top-nodes [g]
  (filter #(zero? (fan-in g %)) (nodes g)))

(defn bottom-nodes [g]
  (filter #(zero? (fan-out g %)) (nodes g)))
       
(defn add-nodes [g nodes]
  (apply graph/add-nodes g nodes))

(defn add-edges [g edges]
  (reduce add-edge g edges))

(defn loners [g]
  (galg/loners g))

(defn one-label-left? [g [e1 e2 e3]]
  (let [label (attr/attr g [e1 e2] :label)]
    (and (= 1 (count label))
         (= (first label) e3))))

(defn remove-edge [g [e1 e2 e3 :as edge]]
  {:pre [(= 3 (count edge))]}
  (cond
    (not (has-edge? g edge)) g
    (not (some #{e3} (attr/attr g [e1 e2] :label))) g
    (one-label-left? g edge)
    (-> (attr/remove-attr g [e1 e2] :label)
        (graph/remove-edges [e1 e2]))
    :else (->> (attr/attr g [e1 e2] :label)
               (remove #(= e3 %))
               (attr/add-attr g edge :label))))

(defn remove-edges [g edges]
  (reduce remove-edge g edges))

(defn remove-edges-label [g label]
  (->> (edges g)
       (filter #(= label (third %)))
       (remove-edges g)))

(defn remove-nodes [g nodes]
  (as-> nodes $
    (mapcat #(all-edges g %) $)
    (remove-edges g $)
    (apply graph/remove-nodes $ nodes)))

(defn up-nodes [g node]
  (->> (graph/in-edges g node)
       (map first)))

(defn down-nodes [g node]
  (->> (graph/out-edges g node)
       (map first)))

(defn sort-nodes [g]
  (sort-by count > g))

(defn labeled-edges [g node label]
  (filter #(= label (third %)) (out-edges g node)))

(defn select-edges [g edge-type]
  (filter #(= edge-type (third %)) (edges g)))

(defn replace-node [g old-node new-node]
  (if (= old-node new-node) g
      (-> (add-nodes g [new-node])
          (add-edges (->> (out-edges g old-node)
                          (map #(assoc % 0 new-node))))
          (add-edges (->> (in-edges g old-node)
                          (map #(assoc % 1 new-node))))
          (remove-nodes [old-node]))))

(defn split-node [g old-node new-node-up new-node-down]
  (-> (add-edges g (->> (out-edges g old-node)
                        (map #(assoc % 0 new-node-down))))
      (add-edges (->> (in-edges g old-node)
                      (map #(assoc % 1 new-node-up))))
      (remove-nodes [old-node])))  

(defn build-graph [nodes edges]
  {:pre [(coll? nodes) (coll? edges)]}
  (-> (graph/digraph) (add-nodes nodes) (add-edges edges)))

(defn reverse-edges [edges]
  (map #(assoc % 1 (% 0) 0 (% 1)) edges))

(defn reverse-graph [g]
  (build-graph (nodes g)
               (reverse-edges (edges g))))

(defn attach-all [g old-nodes new-node label]
  (-> (add-nodes g [new-node])
      (add-edges (->> (map vector old-nodes)
                      (map #(assoc % 1 new-node))
                      (map #(assoc % 2 label))))))

(defn subgraphs [g]
  (galg/connected-components g))

(defn merge-graphs [graphs]
  (build-graph (mapcat nodes graphs)
               (mapcat edges graphs)))

(defn count-downstream [g node]
  (->> (galg/bf-span g node) vals
       (apply concat) distinct count))

(defn count-upstream [g node]
  (count-downstream (reverse-graph g) node))

(defn spider-path [g path node]
  (if (-> g (out-edges node) count (= 0))
    (conj path g)
    (let [edge (-> g (out-edges node) first)]
      (recur (remove-edges g [edge])
             (conj path edge)
             (second edge)))))

(defn spider-edges [g edge-set]
  (if (-> g edges count (= 0)) edge-set
      (let [[first-path & rest-path]
            (->> g nodes
                 (sort-by (partial fan-out g) >)
                 first (spider-path g '()))]
        (->> rest-path reverse (conj edge-set)
             (recur first-path)))))

(defn display-graph [g]
  (gviz/view g) g)

(defn replace-inc [i g old-node]
  (swap! i inc)
  (replace-node g old-node @i))

(defn structure [g]
  (let [i (atom 0)]
    (-> replace-inc (partial i)
        (reduce g (nodes g)))))

(defn display-structure [g]
  (display-graph (structure g)) g)

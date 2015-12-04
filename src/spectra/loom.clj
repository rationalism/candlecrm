(ns spectra.loom
  (:require [loom.alg :as galg]
            [loom.attr :as attr]
            [loom.graph :as graph]
            [loom.io :as gviz]))

(defn multi-edge [g edge]
  (->> (attr/attr g edge :label)
       (map #(conj edge %))))

(defn add-edge [g edge]
  {:pre [(= 3 (count edge))]}
  (cond
    (graph/has-edge? g (first edge) (second edge))
    (->> (attr/attr g (vec (take 2 edge)) :label)
         (cons (nth edge 2)) distinct
         (attr/add-attr g edge :label))
    :else (-> (graph/add-edges g (vec (take 2 edge)))
              (attr/add-attr edge :label (vector (nth edge 2))))))

(defn nodes [g]
  (graph/nodes g))
  
(defn edges [g]
  (graph/edges g))

(defn multi-edges [g]
  (->> (edges g)
       (mapcat #(multi-edge g %))))

(defn out-edges [g node]
  (->> (graph/out-edges g node)
       (mapcat #(multi-edge g %))))

(defn in-edges [g node]
  (->> (graph/in-edges g node)
       (mapcat #(multi-edge g %))))

(defn all-edges [g node]
  (concat (out-edges g node)
          (in-edges g node)))

(defn out-edge-label [g node label]
  (->> (out-edges g node)
       (filter #(= (nth % 2) label))
       first))

(defn in-edge-label [g node label]
  (->> (in-edges g node)
       (filter #(= (nth % 2) label))
       first))

(defn fan-in [g node]
  (count (in-edges g node)))

(defn fan-out [g node]
  (count (out-edges g node)))

(defn top-nodes [g]
  (filter #(= 0 (fan-in g %))
          (nodes g)))

(defn bottom-nodes [g]
  (filter #(= 0 (fan-out g %))
          (nodes g)))
       
(defn add-nodes [g nodes]
  (apply graph/add-nodes g nodes))

(defn add-edges [g edges]
  (reduce add-edge g edges))

(defn loners [g]
  (galg/loners g))

(defn one-label-left? [g edge]
  (let [label (attr/attr g (vec (take 2 edge)) :label)]
    (and (= 1 (count label))
         (= (first label) (nth edge 2)))))

(defn remove-edge [g edge]
  {:pre [(= 3 (count edge))]}
  (cond
    (not (graph/has-edge? g (first edge) (second edge))) g
    (not (some #{(nth edge 2)} (attr/attr g (vec (take 2 edge)) :label))) g
    (one-label-left? g edge)
    (-> (attr/remove-attr g (vec (take 2 edge)) :label)
        (graph/remove-edges (vec (take 2 edge))))
    :else (->> (attr/attr g (vec (take 2 edge)) :label)
               (remove #(= (nth edge 2) %))
               (attr/add-attr g edge :label))))

(defn remove-edges [g edges]
  (reduce remove-edge g edges))

(defn remove-edges-label [g label]
  (remove-edges
   g (filter #(= label (nth % 2))
             (multi-edges g))))

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
  (->> (out-edges g node)
       (filter #(= label (nth % 2)))))

(defn select-edges [g edge-type]
  (->> (multi-edges g)
       (filter #(= edge-type (nth % 2)))))

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
                (reverse-edges (multi-edges g))))

(defn attach-all [g old-nodes new-node label]
  (-> (add-nodes g [new-node])
      (add-edges (->> old-nodes
                      (map vector)
                      (map #(assoc % 1 new-node))
                      (map #(assoc % 2 label))))))

(defn subgraphs [g]
  (->> (galg/connected-components g)
       (map #(graph/subgraph g %))))

(defn merge-graphs [graphs]
  (build-graph (mapcat nodes graphs)
               (mapcat multi-edges graphs)))

(defn count-downstream [g node]
  (->> (galg/bf-span g node)
       vals (apply concat)
       distinct count))

(defn count-upstream [g node]
  (count-downstream (reverse-graph g) node))

(defn spider-path [g path node]
  (if (-> g (out-edges node) count (= 0))
    (conj path g)
    (let [edge (-> g (out-edges node) first)]
      (recur (remove-edges g [edge])
             (conj path edge)
             (second edge)))))

(defn spider-edges [g edges]
  (if (-> g multi-edges count (= 0))
    edges (let [new-path (->> g nodes (sort-by (partial fan-out g) >)
                              first (spider-path g '()))]
            (recur (first new-path)
                   (->> new-path rest reverse (conj edges))))))

(defn display-graph [g]
  (gviz/view g) g)

(defn replace-inc [i g old-node]
  (swap! i inc)
  (replace-node g old-node @i))

(defn structure [g]
  (let [i (atom 0)]
    (-> replace-inc
        (partial i)
        (reduce g (nodes g)))))

(defn display-structure [g]
  (display-graph (structure g)) g)

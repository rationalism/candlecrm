#!/bin/bash

rm -r maven_repo/edu/stanford/nlp/stanford-corenlp/3.6.1/stanford-corenlp-3.6.1*

rm -r ~/.m2/repository/edu/stanford/nlp/stanford-corenlp/3.6.1

mvn install:install-file \
    -Dfile=stanford-corenlp-3.6.1.jar \
    -DgroupId=edu.stanford.nlp \
    -DartifactId=stanford-corenlp \
    -Dversion=3.6.1 \
    -Dpackaging=jar \
    -DgeneratePom=true \
    -DcreateChecksum=true \
    -DlocalRepositoryPath=maven_repo

mvn install:install-file \
    -Dfile=stanford-corenlp-3.6.1-models.jar \
    -DgroupId=edu.stanford.nlp \
    -DartifactId=stanford-corenlp \
    -Dversion=3.6.1 \
    -Dpackaging=jar \
    -DgeneratePom=true \
    -DcreateChecksum=true \
    -Dclassifier=models \
    -DlocalRepositoryPath=maven_repo

lein deps

#!/bin/bash

rm -r maven_repo/edu/stanford/nlp/stanford-corenlp/3.6.1-SNAPSHOT/stanford-corenlp-3.6.1-SNAPSHOT*

rm -r ~/.m2/repository/edu/stanford/nlp/stanford-corenlp/3.6.1-SNAPSHOT

mvn install:install-file \
    -Dfile=stanford-corenlp-3.6.1-SNAPSHOT.jar \
    -DgroupId=edu.stanford.nlp \
    -DartifactId=stanford-corenlp \
    -Dversion=3.6.1-SNAPSHOT \
    -Dpackaging=jar \
    -DgeneratePom=true \
    -DcreateChecksum=true \
    -DlocalRepositoryPath=maven_repo

mvn install:install-file \
    -Dfile=stanford-corenlp-3.6.1-SNAPSHOT-models.jar \
    -DgroupId=edu.stanford.nlp \
    -DartifactId=stanford-corenlp \
    -Dversion=3.6.1-SNAPSHOT \
    -Dpackaging=jar \
    -DgeneratePom=true \
    -DcreateChecksum=true \
    -Dclassifier=models \
    -DlocalRepositoryPath=maven_repo

lein deps

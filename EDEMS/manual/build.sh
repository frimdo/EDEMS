#!/bin/bash

pandoc -f markdown -t html ../../README.md > tmp.html  
cat header.html tmp.html footer.html > index.html 
rm tmp.html
sed -i 's/↕/\&#8597;/g' index.html


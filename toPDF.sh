#!/bin/sh
pandoc --from=markdown --output=README.pdf README.md                                   \
       --variable=geometry:"margin=2cm" \
       --highlight-style=espresso


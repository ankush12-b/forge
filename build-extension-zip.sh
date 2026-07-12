#!/bin/bash
# Regenerates site/public/forge-extension.zip from extension/ and prints the SHA-256
# to paste into the checksum line in site/index.html.
set -e
cd "$(dirname "$0")"
rm -f site/public/forge-extension.zip
cd extension
zip -r ../site/public/forge-extension.zip . -x ".*" > /dev/null
cd ..
echo "Rebuilt site/public/forge-extension.zip"
echo "New checksum (update in site/index.html):"
sha256sum site/public/forge-extension.zip

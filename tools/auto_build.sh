#!/bin/bash

VIDEO_DIR=$1
VERSION_NAME=$(basename $VIDEO_DIR)

SERVER="45.76.11.163:8000"
echo $VERSION_NAME

curl -X GET "http://${SERVER}/api/${VERSION_NAME}/create"

url="http://${SERVER}/api/${VERSION_NAME}/init_comments"
videos=$(ls $VIDEO_DIR)
json=$(printf '%s\n' "${videos[@]}" | jq -R . | jq -s .)
file=/tmp/init_comments.json
echo $json > $file
# # Upload the JSON payload
curl -H "Content-Type: application/json" -X POST --data @"$file" "$url"

python tools/copy_videos.py $VIDEO_DIR public/$VERSION_NAME

sed -i "/const version/s/=.*/= '${VERSION_NAME}'/" src/App.js

yarn run build

mv build $VERSION_NAME && zip -r $VERSION_NAME.zip $VERSION_NAME && rm -rf $VERSION_NAME public/$VERSION_NAME
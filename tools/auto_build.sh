#!/bin/bash

VIDEO_DIR=$1
VERSION_NAME=$(basename $VIDEO_DIR)

SERVER="45.76.11.163:8000"
echo $VERSION_NAME

curl -X GET "http://${SERVER}/api/${VERSION_NAME}/create"

python tools/init_comments.py $VIDEO_DIR "http://${SERVER}/api/${VERSION_NAME}/init_comments"

python tools/copy_videos.py $VIDEO_DIR public/$VERSION_NAME

sed -i "/const version/s/=.*/= '${VERSION_NAME}'/" src/App.js

yarn run build

mv build $VERSION_NAME && zip -r $VERSION_NAME.zip $VERSION_NAME && rm -rf $VERSION_NAME public/$VERSION_NAME
#!/bin/bash

VIDEO_DIR=$1
VERSION_NAME=$(basename $VIDEO_DIR)

SERVER="45.76.11.163:8000"
echo $VERSION_NAME

curl -X GET "http://${SERVER}/api/${VERSION_NAME}/create"
for video in $(ls $VIDEO_DIR)
do
    # Check if end with '_action.mp4'
    if [[ $video =~ _action.mp4$ ]]; then
        echo "$video"
        curl -X POST \
            -H "Content-Type: application/json" \
            -d '{"video":"'"$video"'","comment":"Action"}' "http://${SERVER}/api/${VERSION_NAME}/insert"
    fi
done

python tools/copy_videos.py $VIDEO_DIR public/$VERSION_NAME

sed -i "/const version/s/=.*/= '${VERSION_NAME}'/" src/App.js

yarn run build

mv build $VERSION_NAME && zip -r $VERSION_NAME.zip $VERSION_NAME && rm -rf $VERSION_NAME public/$VERSION_NAME
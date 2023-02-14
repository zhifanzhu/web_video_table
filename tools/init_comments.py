import argparse
import os
import requests, json


def parse_args():
    parser = argparse.ArgumentParser(description="Initialize video processing.")
    parser.add_argument("video_dir", help="Directory containing the video files.")
    parser.add_argument("url", help="URL of the server.")
    return parser.parse_args()

def main(args):
    data_list = []

    # Loop through the files in the directory
    for filename in os.listdir(args.video_dir):
        if filename.endswith("_action.mp4"):
            video = filename
            metric_filename = video.replace("_action.mp4", "_best_metric.json")
            with open(os.path.join(args.video_dir, metric_filename), "r") as f:
                metric_data = json.load(f)

            # Add the video name and best metric value to the list
            data = {
                'video': video,
                'iou': metric_data['iou'],
                'collision': metric_data['collision'],
                'min_dist': metric_data['min_dist'],
            }
            data_list.append(data)
        

    url = args.url
    # Make a POST request with the JSON data
    response = requests.post(url, json=data_list)

    # Check the response status code
    if response.status_code == 200:
        print("Successfully sent the JSON data.")
    else:
        print("Failed to send the JSON data.")

if __name__ == '__main__':
    main(parse_args())
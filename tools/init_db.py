# Flask app to serve the model
import os
import sqlite3
from argparse import ArgumentParser

DATABASE = './database.db'

def parse_args():
    parser = ArgumentParser()
    parser.add_argument('--video_dir', default='./public/Results-01-28', help='directory of videos')
    return parser.parse_args()

# return list of mp4 files in the directory
def get_video_list(video_dir):
    video_list = []
    for file in os.listdir(video_dir):
        if file.endswith('_action.mp4'):
            video_list.append(file)
    return video_list


if __name__ == '__main__':
    # Insert all videos into the database with comment 'Unfinished'
    args = parse_args()
    video_dir = args.video_dir
    video_dir_basename = os.path.basename(video_dir)
    db_path = DATABASE
    db = sqlite3.connect(db_path)
    db.cursor().execute(f"CREATE TABLE '{video_dir_basename}' (video VARCHAR(255), comment VARCHAR(255))")
    for video in get_video_list(video_dir):
        db.cursor().execute(f"INSERT INTO '{video_dir_basename}' (video, comment) VALUES (?, ?)", (video, 'Unfinished'))
    db.commit()
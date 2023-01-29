# Flask app to serve the model
import os
import sqlite3

DATABASE = './database.db'

# return list of mp4 files in the directory
def get_video_list():
    video_list = []
    for file in os.listdir('./public/Results-01-28'):
        if file.endswith('.mp4'):
            video_list.append(file)
    return video_list


if __name__ == '__main__':
    # Insert all videos into the database with comment 'Unfinished'
    db = sqlite3.connect(DATABASE)
    db.cursor().execute("CREATE TABLE comments (video VARCHAR(255), comment VARCHAR(255))")
    for video in get_video_list():
        db.cursor().execute("INSERT INTO comments (video, comment) VALUES (?, ?)", (video, 'Unfinished'))
    db.commit()
# Flask app to serve the model
import os
from flask import Flask, jsonify, request, g
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = './database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)

    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# return list of mp4 files in the directory
def get_video_list():
    video_list = []
    for file in os.listdir('./public/Results-01-28'):
        if file.endswith('.mp4'):
            video_list.append(file)
    return video_list

@app.route('/api/video_list')
def video_list():
    return jsonify(get_video_list())

@app.route('/api/get_all_comments', methods=['GET'])
def get_all_comments():
    res = get_db().cursor().execute("SELECT * FROM comments").fetchall()
    # convert list to dict
    res = {i[0]: i[1] for i in res}
    return jsonify(res)

@app.route('/api/get_comment', methods=['POST'])
def get_comment():
    video = request.get_json()['video']
    return jsonify(get_db().cursor().execute("SELECT comment FROM comments WHERE video = ?", (video,)).fetchone())

""" update comment for a video """
@app.route('/api/update_comment', methods=['POST'])
def update_comment():
    data = request.get_json()
    video = data['video']
    comment = data['comment']
    get_db().cursor().execute("UPDATE comments SET comment = ? WHERE video = ?", (comment, video))
    get_db().commit()
    return jsonify('success')
    # return jsonify(get_db().cursor().execute("SELECT * FROM comments").fetchall())

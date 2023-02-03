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

@app.route('/api/<version_name>/get_all_comments', methods=['GET'])
def get_all_comments(version_name):
    res = get_db().cursor().execute(f"SELECT * FROM '{version_name}'").fetchall()
    res = {i[0]: i[1] for i in res}  # convert list to dict
    return jsonify(res)

@app.route('/api/<version_name>/get_comment', methods=['POST'])
def get_comment(version_name):
    video = request.get_json()['video']
    return jsonify(get_db().cursor().execute(f"SELECT comment FROM '{version_name}' WHERE video = ?", (video,)).fetchone())

""" update comment for a video """
@app.route('/api/<version_name>/update_comment', methods=['POST'])
def update_comment(version_name):
    data = request.get_json()
    video = data['video']
    comment = data['comment']
    get_db().cursor().execute(f"UPDATE '{version_name}' SET comment = ? WHERE video = ?", (comment, video))
    get_db().commit()
    return jsonify('success')
    # return jsonify(get_db().cursor().execute("SELECT * FROM comments").fetchall())

@app.route('/api/<version_name>/create', methods=['GET'])
def create_table(version_name):
    get_db().cursor().execute(f"CREATE TABLE IF NOT EXISTS '{version_name}' (video VARCHAR(255), comment VARCHAR(255))")
    get_db().commit()
    return jsonify('success')

@app.route('/api/<version_name>/insert', methods=['POST'])
def insert_comment(version_name):
    data = request.get_json()
    video = data['video']
    comment = data['comment']
    get_db().cursor().execute(
        f"insert into '{version_name}' (video, comment) select ?, ? where not exists (select 1 from '{version_name}' where video = ?)",
        (video, comment, video))
    get_db().commit()
    return jsonify('success')

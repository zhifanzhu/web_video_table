import os
import json
import sqlite3

DATABASE = './database.db'

if __name__ == '__main__':
    # Insert all videos into the database with comment 'Unfinished'
    with sqlite3.connect(DATABASE) as db:
        res = db.cursor().execute("SELECT * FROM comments").fetchall()
        # convert list to dict
        res = {i[0]: i[1] for i in res}
        with open('./comments.json', 'w') as f:
            json.dump(res, f)
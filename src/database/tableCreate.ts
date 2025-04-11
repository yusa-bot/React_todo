import * as sqlite3 from "sqlite3"

const db = new sqlite3.Database('db')

db.run(`CREATE TABLE todo (
    id TEXT PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    due_date TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status = 'running' or status = 'completed')
    )`)
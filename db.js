import sqlite3 from "sqlite3";
sqlite3.verbose();

const DB_FILE = "cats.sqlite";
const db = new sqlite3.Database(DB_FILE);

const sql = `
CREATE TABLE IF NOT EXISTS cats (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  gender TEXT NOT NULL,
  age INTEGER
);
`;

db.serialize(() => {
  db.run(sql, (err) => {
    if (err) {
      console.error("error creando tabla:", err.message);
    } else {
      console.log("tabla 'cats' lista en", DB_FILE);
    }
  });
});

db.close();

// node db.js
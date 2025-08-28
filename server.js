import express from "express";
import sqlite3 from "sqlite3";
sqlite3.verbose();

const app = express();
const PORT = process.env.PORT || 8000;
const DB_FILE = "cats.sqlite";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getDB() {
  return new sqlite3.Database(DB_FILE);
}

// GET/POST/cats
app.route("/cats")
  .get((req, res) => {
    const db = getDB();
    const sql = "SELECT * FROM cats";
    db.all(sql, [], (err, rows) => {
      db.close();
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  })
  .post((req, res) => {
    const { name, breed, gender, age } = req.body;
    if (!name || !breed || !gender) {
      return res
        .status(400)
        .json({ error: "name, breed y gender son requeridos" });
    }
    const db = getDB();
    const sql = `INSERT INTO cats (name, breed, gender, age) VALUES (?,?,?,?)`;
    db.run(sql, [name, breed, gender, age ?? null], function (err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .send(`cat with id: ${this.lastID} created successfully`);
    });
  });

// GET/PUT/DELETE/cat/:id
app.route("/cat/:id")
  .get((req, res) => {
    const db = getDB();
    const sql = "SELECT * FROM cats WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
      db.close();
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).send("cat not found");
      res.status(200).json(row);
    });
  })
  .put((req, res) => {
    const { name, breed, gender, age } = req.body;
    if (!name || !breed || !gender) {
      return res
        .status(400)
        .json({ error: "name, breed y gender son requeridos" });
    }
    const db = getDB();
    const sql = `
      UPDATE cats SET name = ?, breed = ?, gender = ?, age = ?
      WHERE id = ?
    `;
    db.run(sql, [name, breed, gender, age ?? null, req.params.id], function (err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).send("cat not found");
      res.json({
        id: Number(req.params.id),
        name,
        breed,
        gender,
        age: age ?? null
      });
    });
  })
  .delete((req, res) => {
    const db = getDB();
    const sql = "DELETE FROM cats WHERE id = ?";
    db.run(sql, [req.params.id], function (err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).send("cat not found");
      res.status(200).send(`the cat with id: ${req.params.id} has been deleted.`);
    });
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API de gatitos corriendo en http://0.0.0.0:${PORT}`);
});
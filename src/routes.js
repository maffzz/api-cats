const express = require('express');
const { getDatabase } = require('../db');

const router = express.Router();

// GET all items
router.get('/items', (req, res) => {
  const db = getDatabase();
  
  db.all('SELECT * FROM items ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error('Error fetching items:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    res.json({ items: rows });
  });
});

// GET single item by ID
router.get('/items/:id', (req, res) => {
  const db = getDatabase();
  const { id } = req.params;
  
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching item:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ item: row });
  });
});

// POST create new item
router.post('/items', (req, res) => {
  const db = getDatabase();
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  const params = [name, description || ''];
  
  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error creating item:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    res.status(201).json({
      message: 'Item created successfully',
      id: this.lastID
    });
  });
});

// PUT update item
router.put('/items/:id', (req, res) => {
  const db = getDatabase();
  const { id } = req.params;
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  const params = [name, description || '', id];
  
  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error updating item:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item updated successfully' });
  });
});

// DELETE item
router.delete('/items/:id', (req, res) => {
  const db = getDatabase();
  const { id } = req.params;
  
  const sql = 'DELETE FROM items WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Error deleting item:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item deleted successfully' });
  });
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Database config
const pool = new Pool({
  user: 'postgres',
  password: 'Saswati@1625',
  host: 'localhost',
  port: 5432, 
  database: 'postgres',
});

// Middleware 
app.use(bodyParser.json());

// GET API 

app.get('/api/employees', async (req, res) => {
  try {
    const client = await pool.connect();


    await client.query('BEGIN');

    const result = await client.query('SELECT * FROM employee');
    const employees = result.rows;

    
    await client.query('COMMIT');

    client.release();
    res.json(employees);
  } catch (error) {
    console.error(error);

    
    await client.query('ROLLBACK');

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//POST API

app.post('/api/employees', async (req, res) => {
  const { name, designation } = req.body;

  try {
    const client = await pool.connect();

    
    await client.query('BEGIN');

    
    const result = await client.query(
      'INSERT INTO employee (name, designation) VALUES ($1, $2) RETURNING *',
      [name, designation]
    );

    const insertedEmployee = result.rows[0];

    await client.query('COMMIT');

    client.release();

    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      employee: insertedEmployee,
    });
  } catch (error) {
    console.error(error);

    await client.query('ROLLBACK');

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
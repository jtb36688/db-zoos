const express = require('express');
const helmet = require('helmet');
const db = require("./data/db-model.js")

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

server.post('/api/:table', (req, res) => {
  const { table } = req.params
  const { name } = req.body
  const addition = { name }
  if (!name) {
    return res.status(400).json({ error: 'Please provide a name for your addition' })
  }
  db.add(table)
  .then(add => {
    res.status(201).json(add)
  })
  .catch(({ code, message }) => {
    res.status(code).json({ message });
  });
})

server.get('/api/:table', (req, res) => {
  const { table } = req.params
  db.get(table)
  .then(found => {
    res.status(200).json(found);
  })
  .catch(({ code, message }) => {
    res.status(code).json({ message });
  });
});

server.get('/api/:table/:id', (req, res) => {
  const { table, id } = req.params
  db.getById(table, id)
  .then(found => {
    if (found) {
      res.status(200).json(found)
    } else {
      res.status(404).json({
        error: 'Unable to find any entries matching ID'
      })
    }
  })
  .catch(({ code, message }) => {
    res.status(code).json({ message });
  });
})

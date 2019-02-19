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


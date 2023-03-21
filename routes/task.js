const { Router } = require('express');
const { writeFile } = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const Task = require('../models/Task');
const route = Router();

route.get('/', (req, res) => {
  const user = req.users.find(e => e.id === req.session.id);
  res.json(user.tasks);
});

route.get('/:id', (req, res) => {
  const user = req.users.find(e => e.id === req.session.id);
  const task = user.tasks.find(e => e.id === req.params.id);

  if (!task) {
    res.status(404).json({});

    return;
  }

  res.json(task);
});

route.post('/', async (req, res) => {
  const { content } = req.body;
  const user = req.users.find(e => e.id === req.session.id);
  const task = new Task(uuidv4(), content, user.tasks.length);
  user.tasks.push(task);
  
  try {
    await writeFile('./db.json', JSON.stringify({
      users: req.users
    }));    
    
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'try later'
    })
  }
});

route.put('/:id', async (req, res) => {
  const { order } = req.body;

  const user = req.users.find(e => e.id === req.session.id);
  const task = user.tasks.find(e => e.id === req.params.id);

  if(!task) {
    res.status(404).json({
      error: 'not found'
    });

    return;
  }

  task.order = order;
  user.tasks.sort((a, b) => a.order - b.order);

  try {
    await writeFile('./db.json', JSON.stringify({
      users: req.users
    }));    
    
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'try later'
    })
  }
});

route.delete('/:id', async (req, res) => {

  const user = req.users.find(e => e.id === req.session.id);
  const task = user.tasks.find(e => e.id === req.params.id);

  if (!task) {
    res.status(404).json({
      error: 'not found'
    });

    return;
  }

  user.tasks.splice(user.tasks.indexOf(task) - 1, 1);

  try {
    await writeFile('./db.json', JSON.stringify({
      users: req.users
    }));    
    
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'try later'
    })
  }
});

module.exports = route;
const { Router } = require('express');
const fs = require('fs/promises');
const route = Router();

route.get('/', async (req, res) => {
  const id = req.session.id;

  req.session.destroy();
  req.users = req.users.filter(e => e.id !== id);
  
  try {
    await fs.writeFile('./db.json', JSON.stringify({
      users: req.users
    }));

    res.json({
      message: 'Done'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'try later'
    });
  }
});

module.exports = route;
const { writeFile } = require('fs/promises');

module.exports = async (req, res, next) => {
  const isExist = (req.users.length !== 0 && req.users.find(e => e.id === req.session.id));
  if (isExist) return next();
  req.users.push({
    id: req.session.id,
    tasks: []
  });
  
  try {
    await writeFile('./db.json', JSON.stringify({
      users: req.users
    }));
    next();
  } catch(err) {
    console.log(err);
    res.status(500).json({
      error: 'try later'
    });
  }
}
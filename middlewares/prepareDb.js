const fs = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    const file = await fs.readFile('./db.json');
    const db = JSON.parse(file);
    req.users = db.users;
    return next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "try later"
    });
  }
}
const { User } = require('../models');
const comparePassword = require('../helpers/bcrypt').comparePassword;
const jwt = require('jsonwebtoken');
exports.register = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  .then(response => {
    res.status(201).json({
      response,
      message: 'Successfully registered'
    })
  })
  .catch(err => {
    const errorMessage = err.errors[0].message;
    res.status(500).json({ error: errorMessage });
  })
}

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    }
  })
  .then(response => {
    if (response) {
      let validateUser = comparePassword(req.body.password, response.password);
      if (validateUser) {
        const payload = {
          name: response.name,
          email: response.email,
          imageUrl: response.imageUrl
        }
        const token = jwt.sign(payload, process.env.SECRET);
        res.status(200).json({
          token,
          message: 'Successfully login'
        })
      } else {
        res.status(400).json({ message: 'Invalid email/password' });
      }
    } else {
      res.status(400).json({ message: 'Invalid email/password' });
    }
  })
  .catch(err => {
    console.error(err.errors);
    res.status(500).json({ error: err.errors });
  })
}
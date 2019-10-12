const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(8);

exports.hashPassword = password => {
  return bcrypt.hashSync(password, salt);
}

exports.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}
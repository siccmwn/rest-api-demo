'use strict';
const sequelize = require('sequelize');
const Op = sequelize.Op;
const hash = require('../helpers/bcrypt').hashPassword;
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique: function(email) {
          return User.findOne({
            where: {
              email: email,
              id: { [Op.ne]: this.id }
            }
          })
          .then(result => {
            if (result) throw 'Email already in use!';
          })
          .catch(err => {
            throw err;
          });
        }
      }
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  User.beforeCreate(user => {
    user.password = hash(user.password);
  });

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
const sequelize = require('../config');
const { DataTypes } = require('sequelize');

const Post = sequelize.define('Post', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Post;

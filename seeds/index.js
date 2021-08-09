const sequelize = require('../config/connection');
// const { User, Post, Comment } = require('../models');

// const userData = require('./users.json');
// const postData = require('./posts.json');
// const commentData = require('./comments.json');

const userSeeds = require('./user_seeds');
const postSeeds = require('./post_seeds');
const commentSeeds = require('./comment_seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    // syncs database
    await userSeeds();
    // adds users to db
    console.log('\n');
    // adds posts to db
    await postSeeds();
    console.log('\n');
    // adds comments to db
    await commentSeeds();
    console.log('\n');
  
    process.exit(0);
};
  
seedAll();
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
    console.log('\n');
    await userSeeds();
    // adds users to db
    console.log('\n');
    await postSeeds();
    // adds posts to db
    console.log('\n');
    await commentSeeds();
    // adds comments to db
      
    process.exit(0);
};
  
seedAll();
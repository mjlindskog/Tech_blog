const { Post } = require('../models');

const postData = [
    {
        "title":"Express.js",
        "post_content":"Easy and commonly used way to setup a server with Javascript.",
        "user_id":1
    },
    {
        "title":"bcrypt",
        "post_content":"Node package that will return a randomized string, can be used with hash() to protect passwords.",
        "user_id":2
    },
    {
        "title":"cfonts",
        "post_content":"Node package that allows users to make vibrant and creative fonts to be displayede in their terminal.",
        "user_id":3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
const { Comment } = require('../models');

const commentData = [
    {
        "comment_content":"great post!",
        "user_id":1,
        "post_id":2
    },
    {
        "comment_content":"I'll have to give that a try sometime",
        "user_id":2,
        "post_id":3
    },
    {
        "comment_content":"spot on!",
        "user_id":3,
        "post_id":1
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
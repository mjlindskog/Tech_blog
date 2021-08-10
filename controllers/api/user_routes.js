const router = require('express').Router();

const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
          ]

    })
    .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
  
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
  
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
  
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
  
        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect email please try again' });
            return;
        }
  
        const validPassword = await userData.checkPassword(req.body.password);
  
        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect password, please try again' });
            return;
        }
  
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
        
            res.json({ user: userData, message: 'You are now logged in!' });
        });
  
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;
  
const articleController = require('../controllers/articleController.js');
const router = require('express').Router();

router.get('/scrape', (req, res, next) => {
    articleController.scrapeWebsite(req, res, next);
});

router.get('/', (req, res) => {
    articleController.renderHome(req, res);
});

router.post('/save', (req, res) => {
    articleController.unsaveArticle(req,res);
});

router.get('/saved', (req, res) => {
    articleController.viewSaved(req, res);
});

router.get('/articles/:id', function(req, res){
    Models.Article.findOne({'_id': req.params.id})
    .populate('comment')
    .exec(function(error, doc){
        if(error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    });
});

module.exports = router;
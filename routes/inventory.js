var express = require('express');
var router = express.Router();
var querydata = require("../Query/querydata")

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/inventory', function (req, res, next) {

    querydata.connections();
    res.send('respond with a resource');
});
module.exports = router;
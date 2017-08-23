'use strict';
var express = require('express');
var router = express.Router();
var uploadManager = require('./uploadManager')(router);

/* GET home page. */
router.get('/:id', function(req, res) {
  res.render('index', { title: 'Express',ticket_id:'/upload/'+req.params.id+'/'});
});

module.exports = router;

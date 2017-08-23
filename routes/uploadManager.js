var fs = require('fs');

var mkdirp  = require('mkdirp');

module.exports = function(router) {
  router.get('/uploaded/:id/', function(req, res) {
    
    var options = {
      tmpDir: __dirname + '/../public/uploaded/tmp/',
      uploadDir: __dirname + '/../public/uploaded/files/'+ req.params.id +'/',
      uploadUrl: '/uploaded/files/'+ req.params.id +'/',
      storage: {
        type: 'local'
      }
    };
    var uploader = require('blueimp-file-upload-expressjs')(options);
    checkExists(options.uploadDir);
    uploader.get(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.post('/upload/:id/', function(req, res) {
    var options = {
      tmpDir: __dirname + '/../public/uploaded/tmp/',
      uploadDir: __dirname + '/../public/uploaded/files/'+req.params.id+'/',
      uploadUrl: '/uploaded/files/'+req.params.id + '/',
      storage: {
        type: 'local'
      }
    };
    var uploader = require('blueimp-file-upload-expressjs')(options);
    checkExists(options.uploadDir);
    uploader.post(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.delete('/uploaded/files/:id/:name', function(req, res) {
   // options.uploadDir =  options.uploadDir+'/'+req.params.id+'/'
   var options = {
    tmpDir: __dirname + '/../public/uploaded/tmp/',
    uploadDir: __dirname + '/../public/uploaded/files/'+req.params.id+'/',
    uploadUrl: '/uploaded/files/'+req.params.id+'/',
    storage: {
      type: 'local'
    }
  };
  var uploader = require('blueimp-file-upload-expressjs')(options);
   uploader.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });
  function checkExists(dir) {
    if(!fs.existsSync(dir)) {
        var firstDir = mkdirp.sync(dir)
        if(firstDir){
          console.log('The uploads folder was not present, we have created it for you [' + dir + ']');
        }
    }
  };

  return router;
};


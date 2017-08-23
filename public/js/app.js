Dropzone.options.myDropzone = {
  init: function() {
    var self = this;
    // config
    self.options.addRemoveLinks = true;
    self.options.dictRemoveFile = "Delete";
    self.options.acceptedFiles=".xlsx"
    self.options.maxFilesize=1,
    self.maxFiles=2
    

    // load already saved files
    $.get('/uploaded/'+document.URL.substr(document.URL.lastIndexOf('/') + 1)+'/', function(data) {
      var files = JSON.parse(data).files;
      for (var i = 0; i < files.length; i++) {

        var mockFile = {
          name: files[i].name,
          size: files[i].size,
          type: 'image/jpeg'
        };

        self.options.addedfile.call(self, mockFile);
        self.options.thumbnail.call(self, mockFile, files[i].url);

      };

    });

    // bind events

    //New file added
    self.on("addedfile", function(file) {
      console.log('new file added ', file);
    });

    // Send file starts
    self.on("sending", function(file) {
      console.log('upload started', file);
      $('.meter').show();
    });

    // File upload Progress
    self.on("totaluploadprogress", function(progress) {
      console.log("progress ", progress);
      $('.roller').width(progress + '%');
    });

    self.on("queuecomplete", function(progress) {
      $('.meter').delay(999).slideUp(999);
    });

    // On removing file
    self.on("removedfile", function(file) {
      console.log(file);
      $.ajax({
        url: '/uploaded/files/'+ document.URL.substr(document.URL.lastIndexOf('/') + 1) +'/' + file.name,
        type: 'DELETE',
        success: function(result) {
          console.log('>>About to Delete the File')
          console.log(result);
        }
      });
    });

    self.on("success", function(file) {
      var a = document.createElement('a');
      a.setAttribute('href',"/uploads/" + file.fullname);
      a.innerHTML = "<br>download";
      file.previewTemplate.appendChild(a);
      });

  }
};

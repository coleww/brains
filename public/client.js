/* globals saveAs */

$(function() {
  var canvas = document.getElementById("doItForHer");
  var ctx = canvas.getContext("2d");
  
  var y = 927;
  
  
  var templateUrl = "https://cdn.glitch.com/0d338432-25fc-4b03-b052-a853700f8e0d%2Fbrain-memes-resolution.jpg?1494544352511";
  
  var template = new Image();
  template.src = templateUrl + '?' + new Date().getTime();
  template.setAttribute('crossOrigin', '');  
  
  template.onload = function() {
    ctx.drawImage(template, 0, 0, 300, 927);
  }
  
  
//   width: 105
  // height: 105?
  
  var $imageList = $('#sortable');
  
  $('#upload').change(function(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = function() {
//           probably need to constrain the image somehow?
          // but also not mess it up for drawing it?
          // link thumbnail to a cached version?
          
          $imageList.append(img)
          
          draw();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  });
  
  $('.download').click(function () {
    
    var data = ctx.getImageData(0, 0, 300, y)
    var tempCanvas = document.createElement('canvas')
    tempCanvas.width = 300
    tempCanvas.height = y
    var tempCtx = tempCanvas.getContext("2d");
  
    
    tempCtx.putImageData(data, 0, 0)
    
    tempCanvas.toBlob(function(blob) {
      saveAs(blob, "brains.png");
    });
  });

//   x, y, and width, height for each place you want to draw an image
  
// 150 across
  
//   104,
//     218
//   326
//   412
//   498
//   610
//   720
//   830
  var coordinates = [
    [0, 0, 150, 104],
    [0, 104, 150, 114],
    [0, 218, 150, 108],
    [0, 326, 150, 86],
    
    
    [0, 412, 150, 86],
    [0, 498, 150, 112],
    [0, 610, 150, 110],
    [0, 720, 150, 110],
    
    
    [0, 830, 150, 97]
  ];
  
  $imageList.sortable({
    revert: true
  });
  
  $("ul, li").disableSelection();

  $imageList.on( "sortchange", function(event, ui) {
    draw();
  });
  
  
  function draw () {
    var imgs = document.querySelectorAll('.toolbar img')
    
    y = 0;
    for (var i = 0; i < imgs.length; i++){
      y += coordinates[i][3]
    }
    
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, 300, 927)
    
    ctx.drawImage(template, 0, 0, 300, y, 0, 0, 300, y);
    
    imgs.forEach(function(element, i) {
      if (i < coordinates.length) {
        var c = coordinates[i];
        ctx.drawImage(element, c[0], c[1], c[2], c[3]);
      }
    });
    
    
    
    
  }
});

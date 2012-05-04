Raphael.fn.vlogitWheel = function () {
  var paper = this;
  wheel = this.set();
  var angle = 0;
  var first = true;
  var slices = [];
  svgcanv = $('svg')[0];
  svg = "http://www.w3.org/2000/svg";
  var clippath = document.createElementNS(svg,"clipPath");
  svgcanv.appendChild(clippath);
  clippath.setAttribute("id","clipw");
  p = paper.path("M200,175.223L97.395,34c62.396-45.334,142.814-45.334,205.211,0L200,175.223z");
  clippath.appendChild(p.node);
  for (var j = 0; j < 5; j++) {
    angleplus = 360 / 5;
    var indimg = $('img').get(j).src;
    var titleimg = $('img').get(j);
    var bong = titleimg.getAttribute('alt');
    var maskedImg = paper.image(indimg, 65,0, 240,150);
    maskedImg.node.setAttribute("clip-path","url(#clipw)");
    var deg = angleplus*j;
    maskedImg.rotate(deg, 202, 175);
    maskedImg.attr({"opacity": "0.7"});
    maskedImg.node.style.cursor = 'pointer';
    maskedImg.index = j;
    maskedImg.hover(
    function(event){
      slices[this.index].animate({"opacity": "1"}, 200, "<>");
    },
    function(event){
      slices[this.index].animate({"opacity": "0.7"}, 200, "<>");
    }).click(function() {
      openDescr(this.index);
      //stop the animation of every slice
      stopAll();
    });
    rotateWheel(maskedImg,angleplus,j);
    angle += angleplus;
    slices.push(maskedImg);
  };

  function openDescr(el) {
    $(".descr").fadeOut();
    el = $(".descr").get(el).id;
    //display the pentagon animation only at the first click; in a 'real' site could be displayed several animations associated to different elements clicked
    if(first) {
      $("header").fadeOut();
      var pentagon = paper.path("M 148.721,249.6 115.991,148.868 201.679,86.612 287.368,148.868 254.638,249.6 z").attr({fill: '#eee', "transform": "s0.01r180,202,175","stroke": "none"});
      pentagon.animate({"transform":"s1.3r0,202,175"}, "1500", "<>", function(){$('#'+el).css("top",120).fadeIn(1000)});
      first = false;
    }
    else {
      $('#'+el).css("top",120).fadeIn(1000);
    }
  };

  // this function could be re-written using CSS3 transformations or the new Raphael version's Animation.repeat() http://raphaeljs.com/reference.html#Animation.repeat
  function rotateWheel(laimg, t, j) {
    var newgrade = -360+j*t;
    var loop = function() {
      laimg.attr({"transform": "r"+j*t+",200,175"}).animate({"transform": "r"+newgrade +",200,175"}, 30000,loop);
    };
    loop();
  }

  function stopAll() {
    $.each(slices, function() {
      this.pause();
    });
  }
  return wheel;
};

$(document).ready(function() {
  var paper = Raphael(document.getElementById('wheel'),400,350);
  var wheelayout = paper.vlogitWheel();
  var headerback = paper.circle(202, 175, 90).attr({fill: '#111', "stroke": "none"}).toFront();
});

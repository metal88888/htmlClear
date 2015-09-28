;$(function(){

  // new WxMoment.OrientationTip();

  // document.addEventListener('touchmove', function(e){
  //   e.preventDefault();
  // },false);

  // document.addEventListener('touchstart', function(e){
  //   alert('touchstart');
  // },false);

  // document.addEventListener('touchend', function(e){
  //   alert('touchend');
  // },false);



  //初始化页面
  (function(){
      __global._scrollStop(),
      document.body.style.userSelect = "none",
      document.body.style.mozUserSelect = "none",
      document.body.style.webkitUserSelect = "none",
      __global._IsPC() ? $(document.body).addClass("pc") : $(document.body).addClass("mobile"),
      __global._Android && $(document.body).addClass("android"),
      __global._iPhoen && $(document.body).addClass("iphone"),
      __global._hasPerspective() ? (__global._rotateNode.addClass("transformNode-3d"),

      $(document.body).addClass("perspective"),
      $(document.body).addClass("yes-3d")) : (__global._rotateNode.addClass("transformNode-2d"),
      $(document.body).addClass("no-3d")), $(".translate-back").addClass("z-pos");

      $(".p-loading,.p-ct,.m-page").height($(window).height());

      init();

  })();


  var stage_1_canvas, stage, exportRoot, lastPt, listener;

  var $show_test = $('#show_test');

  function init() {
    listener = {};

    var pageslide = new PageSlide({
      pages: document.querySelectorAll('.pagelist'),
      swipe: 'X'
    });


    stage_1_canvas = document.getElementById("stage_1");
    images = images||{};

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);

    //加载列表
    loader.loadManifest( _.flatten( [ lib.properties.manifest]) );



  }

  function handleFileLoad(evt) {
    if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
  }

  function handleComplete(evt) {
    var $loading = $('#loading'),
    $pagelists = $('#pagelists');

    $loading.addClass('f-hide');

    exportRoot = new lib.stage2();

    exportRoot.instance_2.on('click',function(event){
      console.log(event.type);
      exportRoot.play();
    })
    // exportRoot.mc.on('pressup',function(event){
    //   console.log(event.type);
    //   $show_test.append(event.type+'   |,');
    //   exportRoot.gotoAndPlay(1);
    // })
    // exportRoot.mc.on('pressmove',function(event){
    //   $show_test.append(event.type+'   |,');
    //   console.log(event.type);
    // })

    stage = new createjs.Stage(stage_1_canvas);
    stage.addChild(exportRoot);
    stage.update();

    // stage.on('stagemousedown',function(e){
    //   console.log('1111');
    //   exportRoot.stop();

    // });
    // stage.on('stagemouseup',function(e){
    //   console.log('2222');

    //   exportRoot.play();

    // });


    // createjs.Touch.enable(stage);
    // stage.enableMouseOver();
    createjs.Touch.enable(stage);


    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
  }


});

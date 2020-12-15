//地理数据加工处理中心，将geojson的数据源在3d环境中建模、绘图，
//提取对后续操作有用的数据，在export.country之中
var imgSRC = 'image/';
//////////参数：
(function(exports) {

  var GeoTexture = function(options) { //每导入一次地理数据调用下这个函数，initGeography会判断输入类型并对数据进行处理
    this.defaults = {};

    this.defaults.canvasW = 2000*1.8;
    this.defaults.canvasH = 1200*1.8;

    this.setOptions(options);
    this.setSource();

    this.initCanvas("Bg");
    this.initCanvas("Visual");
    
    // this.drawBoundary();
  };

  GeoTexture.prototype.setOptions = function(options) {
    return _.extend(this.defaults, options);
  };


  GeoTexture.prototype.setSource = function() {
  }

  GeoTexture.prototype.initCanvas = function(id) {
    var conf = this.defaults;

    var canvas = document.createElement("canvas");
    canvas.width = conf.canvasW;
    canvas.height = conf.canvasH;
    canvas.style.position = 'absolute'
    var ctx = canvas.getContext("2d");
    this['canvas' + id] = canvas;
    this["ctx" + id] = ctx;

    this.loadBgImg();
  }

  GeoTexture.prototype.loadBgImg = function(){
    var img = new Image();
    var bgURL = '../data/world1.png';
    img.src = bgURL;
    img.onload = function(){
       this.ctxBg.drawImage(img,0,0,this.canvasBg.width,this.canvasBg.height);
    }.bind(this); 
  }
 
// var  boundary1 = [[97.207,42.8027],[99.4922,42.583],[100.8105,42.6709],[101.7773,42.4951],[102.041,42.2314],[102.7441,42.1436],[103.3594,41.8799],[103.8867,41.792],[104.502,41.8799],[104.502,41.6602],[105.0293,41.5723],[105.7324,41.9238],[107.4023,42.4512],[109.4238,42.4512],[110.3906,42.7588],[111.0059,43.3301],[111.9727,43.6816],[111.9727,43.8135],[111.4453,44.3848],[111.7969,45],[111.9727,45.0879],[113.6426,44.7363],[114.1699,44.9561],[114.5215,45.3955],[115.6641,45.4395],[116.1914,45.7031],[116.2793,45.9668],[116.543,46.2744],[117.334,46.3623],[117.4219,46.582],[117.7734,46.5381],[118.3008,46.7578],[118.7402,46.7139],[118.916,46.7578],[119.0918,46.6699],[119.707,46.626],[119.9707,46.7139],[119.707,47.1973],[118.4766,47.9883],[117.8613,48.0322],[117.334,47.6807],[116.8066,47.9004],[116.1914,47.8564],[115.9277,47.6807],[115.5762,47.9004],[115.4883,48.1641],[115.8398,48.252],[115.8398,48.5596],[116.7188,49.834],[117.7734,49.5264],[118.5645,49.9219],[119.2676,50.0977],[119.3555,50.3174],[119.1797,50.3613],[119.5313,50.7568],[119.5313,50.8887],[119.707,51.0645],[120.1465,51.6797],[120.6738,51.9434],[120.7617,52.1191],[120.7617,52.251],[120.5859,52.3389],[120.6738,52.5146],[120.4102,52.6465],[120.0586,52.6025],[120.0586,52.7344],[120.8496,53.2617],[121.4648,53.3496],[121.8164,53.042],[121.2012,52.5586],[121.6406,52.4268],[121.7285,52.2949],[121.9922,52.2949],[122.168,52.5146],[122.6953,52.251],[122.6074,52.0752],[122.959,51.3281],[123.3105,51.2402],[123.6621,51.3721],[124.3652,51.2842],[124.541,51.3721],[124.8926,51.3721],[125.0684,51.6357],[125.332,51.6357],[126.0352,51.0205],[125.7715,50.7568],[125.7715,50.5371],[125.332,50.1416],[125.1563,49.834],[125.2441,49.1748],[124.8047,49.1309],[124.4531,48.1201],[124.2773,48.5156],[122.4316,47.373],[123.0469,46.7139],[123.3984,46.8896],[123.3984,46.9775],[123.4863,46.9775],[123.5742,46.8457],[123.5742,46.8896],[123.5742,46.6699],[123.0469,46.582],[123.2227,46.2305],[122.7832,46.0107],[122.6953,45.7031],[122.4316,45.8789],[122.2559,45.791],[121.8164,46.0107],[121.7285,45.7471],[121.9043,45.7031],[122.2559,45.2637],[122.0801,44.8682],[122.3438,44.2529],[123.1348,44.4727],[123.4863,43.7256],[123.3105,43.5059],[123.6621,43.374],[123.5742,43.0225],[123.3105,42.9785],[123.1348,42.8027],[122.7832,42.7148],[122.3438,42.8467],[122.3438,42.6709],[121.9922,42.7148],[121.7285,42.4512],[121.4648,42.4951],[120.498,42.0996],[120.1465,41.7041],[119.8828,42.1875],[119.5313,42.3633],[119.3555,42.2754],[119.2676,41.7041],[119.4434,41.6162],[119.2676,41.3086],[118.3887,41.3086],[118.125,41.748],[118.3008,41.792],[118.3008,42.0996],[118.125,42.0557],[117.9492,42.2314],[118.0371,42.4072],[117.7734,42.627],[117.5098,42.583],[117.334,42.4512],[116.8945,42.4072],[116.8066,42.0117],[116.2793,42.0117],[116.0156,41.792],[115.9277,41.9238],[115.2246,41.5723],[114.9609,41.6162],[114.873,42.0996],[114.5215,42.1436],[114.1699,41.792],[114.2578,41.5723],[113.9063,41.4404],[113.9941,41.2207],[113.9063,41.1328],[114.082,40.7373],[114.082,40.5176],[113.8184,40.5176],[113.5547,40.3418],[113.2031,40.3857],[112.7637,40.166],[112.3242,40.2539],[111.9727,39.5947],[111.4453,39.6387],[111.3574,39.4189],[111.0938,39.375],[111.0938,39.5947],[110.6543,39.2871],[110.127,39.4629],[110.2148,39.2871],[109.8633,39.2432],[109.9512,39.1553],[108.9844,38.3203],[109.0723,38.0127],[108.8965,37.9688],[108.8086,38.0127],[108.7207,37.7051],[108.1934,37.6172],[107.666,37.8809],[107.3145,38.1006],[106.7871,38.1885],[106.5234,38.3203],[106.9629,38.9795],[106.7871,39.375],[106.3477,39.2871],[105.9082,38.7158],[105.8203,37.793],[104.3262,37.4414],[103.4473,37.8369],[103.3594,38.0127],[103.5352,38.1445],[103.4473,38.3643],[104.2383,38.9795],[104.0625,39.4189],[103.3594,39.3311],[103.0078,39.1113],[102.4805,39.2432],[101.8652,39.1113],[102.041,38.8916],[101.7773,38.6719],[101.3379,38.7598],[101.25,39.0234],[100.9863,38.9355],[100.8105,39.4189],[100.5469,39.4189],[100.0195,39.7705],[99.4922,39.8584],[100.1074,40.2539],[100.1953,40.6494],[99.9316,41.001],[99.2285,40.8691],[99.0527,40.6934],[98.9648,40.7813],[98.7891,40.6055],[98.5254,40.7373],[98.6133,40.6494],[98.3496,40.5615],[98.3496,40.9131],[97.4707,41.4844],[97.8223,41.6162],[97.8223,41.748],[97.207,42.8027]]
 
//  GeoTexture.prototype.drawBoundary = function (){
//     var ctxVisual = this.ctxVisual; 
//     var canvasW = this.defaults.canvasW;
//     var canvasH = this.defaults.canvasH;
//     ctxVisual.beginPath();
//     ctxVisual.fillStyle = "rgba(255,255,0,0.1)";
//     ctxVisual.strokeStyle = "rgb(122,122,0)";
//     ctxVisual.lineWidth = 1;
//    ctxVisual.fill();
//    ctxVisual.stroke();

//    ctxVisual.closePath();
//   }

  GeoTexture.prototype.getPixelY = function (pty){//因为贴图在y方向上压缩过
    var scale = this.defaults.scale;
    var canvasH = this.defaults.canvasH;
    var pixelY = canvasH/2 + scale*(pty-canvasH/2);
    return pixelY;
  }

  function x(longitude,canvasW){
    var pixelX = ((longitude + 180) / 360) * canvasW;
    return pixelX;
  }

  function y(latitude,canvasH){//y的有点问题
    // latitude = latitude-7;
    var sinLatitude = Math.sin(latitude * Math.PI/180);
    var a = (1+sinLatitude)/(1- sinLatitude);
    var pixelY = (0.5 - Math.log(a))/(4*Math.PI)*canvasH;
    return pixelY;  
  }

  GeoTexture.prototype.update = function(func) {
    try {
      this.mapTexture.needsUpdate = true;
      this.mapCtx.drawImage(this.img, 0, 0, this.canvasW, this.canvasH);
      var mapCtx = this.mapCtx;
      func(mapCtx);
    } catch (e) {}
  }

  exports.GeoTexture = GeoTexture;
})(window);
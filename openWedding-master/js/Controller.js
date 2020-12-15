window.articleText = '作为一个热爱旅行的人，虽然向往远方却总是未能成行，但我知道我们的未来还有很多的路要走，我想我们还可以一起走过这个世界许许多多的美好角落。所以有了这个创意和网站，并且去论坛里发帖，感谢泥潭，也感谢各路网友和身边朋友帮我在这个世界的美好角落写下了他们的祝福，感谢帮我的照片收集提供帮助的朋友们：大姐二姐和我小外甥女，尤其是帮了我很多的李岩和李若冰，然后还有腿毛、大神、猛神、寝室长、贾总、嫖总、洋洋、杜玉洁、Ashley、康建。感谢那些素不相识的拍与被拍的网友：笑语戏流觞、aki530、月半Ocean、漂海大香蕉 、叫我小1、微尘万世、HbuMichaelLee、克苏喵、 Alfee卷毛、传说中酷炫的药王、DiurEnR、dddlv-chai、shiro07、Archxlb、shz8012、铁锭能赢、Mtkmtk、白井黑子嘤嘤嘤、RayRayVic、醉剑度凡尘。'
window.titleText = '这个星球的祝福 - The World Wishes';
////////提示图层
!(function(root) {
  var Controller = function(delay, startFunc) {
    this.delay = delay; //延迟几分钟开始
    this.startFunc = startFunc;
    this.clicks();
    this.time();
    this.text(window.articleText);
    this.title(window.titleText);
    this.show();
  };

  Controller.prototype.start = function() {
    //场景开始后，面板开始有交互
    this.hover();
    this.hide();
    this.startFunc();
  }

  Controller.prototype.clicks = function() {
    var self = this;
    //开始按钮
    $('#start').click(
      function() {
        self.clickBol = true;
        self.start();
        self.hide();
      }
    );
  }

  Controller.prototype.hover = function() {
    var self = this;
    $('#controller').hover(
      function() {
        self.show();
      },
      function() {
        self.hide();
      }
    );
  }

  Controller.prototype.time = function(title) { //进去一个状态，过一段时间发生变化
    var self = this;
    var delay = 12000;

    setTimeout(
      function() {
        if (!self.clickBol) {
          $('#background').css('background', 'rgb(0,180,180)')
        }
      }, (delay - 2000)
    );

    setTimeout(function() {
      if (!self.clickBol) {
        self.hide;
        self.start();
      }
    }, delay);
  }

  Controller.prototype.text = function(text) {
    $('#article')
    .text(text)
    .attr("href", "http://www.52zhongtou.com/ProjectView/Detail/pid/560") 
    .css('cursor','pointer')
  }
  
  Controller.prototype.title = function(title) {
    var len = title.length;
    for(var k = 0; k < len;k++){
      var str = title[k];
      var h = 200 + 160*k/len;
      // var color = Color({hue:h, saturation:1, value:0.9}).toString();
      var color = 'rgb(0,200,200)';
      var span = $('<div></div>')
      .css('color',color)
      .css('fontWeight','bold')
      .css('float','left')
      .css('fontSize','30px')
      .css('textShadow', 'rgba(255, 255, 255, 1) 1px 1px 1px')
      .text(str);
      $('#articleTitle').append(span);
    }
  }


  Controller.prototype.hide = function() {
    $('#controller').css('top', '-82%').css('opacity', 0.3);
    // $('#webgl').removeClass('blur');
    // $('#divDisplay').removeClass('blur');
  }
  Controller.prototype.show = function() {
    $('#controller').css('top', '0%').css('opacity', 0.7)
    // $('#webgl').addClass('blur');
    // $('#divDisplay').addClass('blur');
  }


  Controller.prototype.bg = function(color) {
    $('#background').css('background', '#111');
    setTimeout(function() {
      $('#background').css('background', color);
    }, 1000);
  }

  Controller.prototype.all = function(dataObj) {
    //设置标题
    var title = dataObj.title;
    this.title(title);

    //设置kpi指标
    var kpiArrs = dataObj.kpis;
    for (var k = 0; k < kpiArrs.length; k++) {
      var kpiArr = kpiArrs[k];
      this.kpi(kpiArr, k);
    }
  }

  function clearDiv(div) { ///////////////////
    $(div).find('div').remove();
  }

  root.Controller = Controller;
})(window);
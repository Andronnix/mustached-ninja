function loadBar(){
  var bar = new createjs.Shape();
  var backBar = new createjs.Shape();
  this.drawBackBar = function(x1, y1, x2, y2){
    bar.graphics.beginLinearGradientFill(["#708090","#BEBEBE","#DCDCDC"], [0, 0.4, 1], 0, y1, 0, y1 + y2).drawRect(x1, y1, x2, y2);
    stage.addChild(backBar);
    stage.update();
  }
  this.drawBar = function(x1, y1, x2, y2){
        //bar.graphics.clear();
        //stage.update();
        bar.graphics.beginLinearGradientFill(["#4DA4F3","#ADD9FF","#9ED1FF"], [0, 0.4, 1], 0, y1, 0, y1 + y2).drawRect(x1, y1, x2, y2);
        stage.update();
      }
      stage.addChild(bar);
      
      stage.update();
}
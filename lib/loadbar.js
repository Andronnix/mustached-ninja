function loadBar(){
  var bar = new createjs.Shape();
  var backBar = new createjs.Shape();
  var text = new createjs.Text("Loading", "14px Arial", "#ffffff");

  this.drawBackBar = function(x1, y1, x2, y2){
    bar.graphics.beginLinearGradientFill(["#708090","#BEBEBE","#DCDCDC"], [0, 0.4, 1], 0, y1, 0, y1 + y2).drawRect(x1, y1, x2, y2);
    text.x = x1;
    text.y = y1+y2/1.5;
    text.text = "0 %";
    text.textBaseline = "alphabetic";  
    stage.addChild(text);    
    stage.addChild(backBar);
    stage.update();
  }
  this.drawBar = function(x1, y1, x2, y2, pers){
        //bar.graphics.clear();
        //stage.update();
        bar.graphics.beginLinearGradientFill(["#4DA4F3","#ADD9FF","#9ED1FF"], [0, 0.4, 1], 0, y1, 0, y1 + y2).drawRect(x1, y1, x2, y2);
        text.text = pers + " %";
        if (x2 - text.getMeasuredWidth() > 0){
          text.x = x1 + x2 - text.getMeasuredWidth();
        }
        stage.update();
      }
      stage.addChild(bar);
      
      stage.update();
}
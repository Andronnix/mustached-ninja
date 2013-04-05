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

function fadeScreen(pause){
  pause = pause || false;
  if (pause)createjs.Ticker.setPaused(true);
  var fade = new createjs.Shape();
  fade.graphics.beginFill("#708090").drawRect(0, 0, WIDTH, HEIGHT);
  fade.alpha = 0.5;
  stage.addChild(fade);
  stage.update();
}

function fadeBtn(x, y, w, h, func, input, fade){
  fade = fade || false;
  var text = new createjs.Text("Start", "14px Arial", "#ffffff"); //בוכûי רנטפע - ‎עמ קטעונםמ)
  text.text = input;
  text.x = x + w/2 - text.getMeasuredWidth()/2;
  text.y = y + h/2 - text.getMeasuredHeight()/2;
  
  this.alp = 0;
  this.isSeen = false; 
  var ME = this;
  var btn = new createjs.Shape();
  btn.graphics.beginFill("#708090").drawRoundRect(x, y, w, h, w/6);
  stage.addChild(btn);
  stage.addChild(text);  
  this.isSeen = true;
 
  if (fade){

    this.FF = createjs.Ticker.addEventListener("tick", function(){
      ME.alp += 0.01;
      btn.alpha = ME.alp;
      console.log(ME.alp);
      stage.update();
      if (ME.alp >= 1){
          ME.isSeen = true;
          var FF = ME.FF;
          createjs.Ticker.removeEventListener("tick", FF);
          
        }
    });  
  }
  btn.addEventListener( "click", function() {
    if (ME.isSeen){
      func();
    }
  });
}

function CLMenu(x, y, w, h){
  this.toDo = function(){
    fadeScreen();
    startMenu();
  }
  var startBtn = new fadeBtn(x, y, w, h, this.toDo, "Start", true);

}
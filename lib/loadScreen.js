function loadBar(){
  this.bar = new createjs.Shape();
  var backBar = new createjs.Shape();
  this.text = new createjs.Text("Loading", "14px Arial", "#ffffff");

  this.drawBackBar = function(x1, y1, x2, y2){
    this.bar.graphics.beginLinearGradientFill(["#708090","#BEBEBE","#DCDCDC"], [0, 0.4, 1], 0, y1, 0, y1 + y2).drawRect(x1, y1, x2, y2);
    this.text.x = x1;
    this.text.y = y1+y2/1.5;
    this.text.text = "0 %";
    this.text.textBaseline = "alphabetic";  
    stage.addChild(this.text);    
    stage.addChild(backBar);
    //stage.update();
  }
  this.drawBar = function(x1, y1, x2, y2, pers){
        //this.bar.graphics.clear();
        ////stage.update();
        this.bar.graphics.beginLinearGradientFill(["#4DA4F3","#ADD9FF","#9ED1FF"], [0, 0.4, 1], 0, y1, 0, y1 + y2).drawRect(x1, y1, x2, y2);
        this.text.text = pers + " %";
        if (x2 - this.text.getMeasuredWidth() > 0){
          this.text.x = x1 + x2 - this.text.getMeasuredWidth();
        }
        //stage.update();
      }
      stage.addChild(this.bar);
      
      //stage.update();
}

function fadeScreen(pause){
  pause = pause || false;
  if (pause)createjs.Ticker.setPaused(true);
  this.fade = new createjs.Shape();
  this.fade.graphics.beginFill("#708090").drawRect(0, 0, WIDTH, HEIGHT);
  this.fade.alpha = 0.5;
  stage.addChild(this.fade);
  stage.update();
}

function fadeBtn(x, y, w, h, func, input, fade, opt){
  opt = opt || null;
  fade = fade || false;
  this.text = new createjs.Text("Start", "14px Arial", "#ffffff"); //בוכûי רנטפע - ‎עמ קטעונםמ)
  this.text.text = input;
  this.text.x = x + w/2 - this.text.getMeasuredWidth()/2;
  this.text.y = y + h/2 - this.text.getMeasuredHeight()/2;
  
  this.alp = 0;
  this.isSeen = false; 
  var ME = this;
  this.btn = new createjs.Shape();
  this.btn.graphics.beginFill("#5C7A72").drawRoundRect(x, y, w, h, w/6);
  this.btn.alpha = 0;
  this.text.alpha = 0;  
  stage.addChild(this.btn);
  stage.addChild(this.text);  
 
  if (fade){

    /*this.FF = createjs.Ticker.addEventListener("tick", function(){
      //var ME = 
      ME.alp += 0.01;
      ME.btn.alpha = ME.alp;
      console.log(ME.alp);
      //stage.update();
      if (ME.alp >= 1){
          ME.isSeen = true;
          var FF = ME.FF;
          createjs.Ticker.removeEventListener("tick", FF);
          
        }
    });  */
    shapeAppear(this.btn);
    shapeAppear(this.text, this);
  }
  else
  {
      this.isSeen = true; 
      this.btn.alpha = 1;
      this.text.alpha = 1;        
  }
  this.fn = func;
  this.opt = opt;
  ME.btn.addEventListener( "click", function() {
    console.log("click!" + ME.isSeen);
    if (ME.isSeen){
      ME.fn(ME.opt);
    }
  });
 } 

function CLMenu(x, y, w, h, tempBar){
  this.toDo = function(){
    startBtn.isSeen = false;
    shapeDis(startBtn.btn);
    shapeDis(startBtn.text);
    shapeDis(tempBar.bar);
    shapeDis(tempBar.text);
    var back = new drawMenu(true);
    //fadeScreen();
    //startMenu();
  }
  var startBtn = new fadeBtn(x, y, w, h, this.toDo, "Start", true);

}

function shapeAppear(sh, obj){
  obj = obj || {isSeen:false};
  sh.y += 8;

  sh.AA = createjs.Ticker.addEventListener("tick", function(){
    sh.alpha += 0.025;
    sh.y -= 0.1;
    //console.log(sh.alpha);
    //stage.update();
    if (sh.alpha >= 1){
        obj.isSeen = true;
        var AA = sh.AA;
        createjs.Ticker.removeEventListener("tick", AA);
      }
      
  });
}

function shapeDis(sh){
      console.log("y = " + sh.y);
      
      sh.DD = createjs.Ticker.addEventListener("tick", function(){
      sh.alpha -= 0.025;
      sh.y -= 0.2;
      //btn.alpha = ME.alp;
      //console.log(sh.alpha);
      //stage.update();
      if (sh.alpha <= 0.01){
          sh.isSeen = false;
          stage.removeChild(sh);
          var DD = sh.DD;
          createjs.Ticker.removeEventListener("tick", DD);
          console.log("after y = " + sh.y);
          delete sh;
        }
        
    });
}

function drawMenu(start){
  this.menu = ["Large Map", "Test map 4", "Test map 5"];
  this.menuMaps = ["omgLargeMap", "testMap4", "testMap5"];
  this.currY = 200;
  this.buttons = [];
  
  this.removeButtons = function (){
    for (var i = 0; i < this.buttons.length; i++){
      stage.removeChild(this.buttons[i].btn);
      stage.removeChild(this.buttons[i].text);
    }
  }
  
  if (start){
    this.back = new createjs.Shape();
    this.back.graphics.beginFill("#BBBCBE").drawRect(0, -10, WIDTH, HEIGHT+15);
    this.back.alpha = -0.3;
    stage.addChild(this.back);
    shapeAppear(this.back);
    //startMenu();
  
    gMap = new TILEDMap(); 
  }
  else
  {
    var fn = function(o){ 
      o.removeButtons();
      stage.removeChild(pause.fadeScr.fade);
      createjs.Ticker.setPaused(false);
      paused = false
    }
    var btn = new fadeBtn(WIDTH/2.5, this.currY, WIDTH/4, 50, fn, "Resume", false, this);
    this.buttons.push(btn);
    this.currY += 70;
  }
  for(var i = 0; i < this.menu.length; i++){
    var fn = (start) ? function(o){ gMap.load(o); } : function(o){ gMap.load(o); createjs.Ticker.setPaused(false); paused = false };       
    var btn = new fadeBtn(WIDTH/2.5, this.currY, WIDTH/4, 50, fn, this.menu[i], start, this.menuMaps[i]);
    this.buttons.push(btn);
    this.currY += 70;
  }
  stage.update();
}

function gamePause(){
  if (pauseHeld)return;
  if (paused){
    createjs.Ticker.setPaused(false);
    stage.removeChild(pause.fadeScr.fade);
    pause.pauseMenu.removeButtons();
  }
  else
  {
    //createjs.Ticker.setPaused(true);
    this.fadeScr = new fadeScreen(true);
    this.pauseMenu = new drawMenu(false);

    
  }
  paused = !paused;
  pauseHeld = true;
} 
  /*
function startMenu(){
  gMap = new TILEDMap();

  var menu = ["Large Map", "Test map 4", "Test map 5"];
  var menuMaps = ["omgLargeMap", "testMap4", "testMap5"];
  for(var i = 0; i < menu.length; i++){
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = menu[i];
    btn.mapName = menuMaps[i];
    btn.onclick = function(){ gMap.load(this.mapName);};
    body.appendChild(btn);
  }
  var pauseBtn = document.createElement("input");
  pauseBtn.type = "button";
  pauseBtn.value = "Pause";
  pauseBtn.onclick = function(){ createjs.Ticker.setPaused(true);};
  body.appendChild(pauseBtn);
  var playBtn = document.createElement("input");
  playBtn.type = "button";
  playBtn.value = "Play";
  playBtn.onclick = function(){ createjs.Ticker.setPaused(false);};
  body.appendChild(playBtn);
}  
  */
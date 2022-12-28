var colors = "641220-6e1423-85182a-a11d33-a71e34-b21e35-bd1f36-c71f37-da1e37-e01e37".split("-").map(a=>"#"+a)
var colors_r = "0466c8-0353a4-023e7d-002855-001845-001233-33415c-5c677d-7d8597-979dac".split("-").map(a=>"#"+a)
var clr,clr_r

var positionX =[]
var positionY =[]
var clrList =[]
var clr_r_List =[]
var sizeList =[]

var m_x,m_y
var song
var songIsplay=false //設定此變數為"假"，收到按下滑鼠把變數改為"真"，音樂播放
var amp
var vol=0
var music_btn,mouse_btn,Speech_btn
var musicIsplay=true
var mouseIsplay=true
var myRec = new p5.SpeechRec();
var result

function preload(){
 song = loadSound("368 - Dyalla.mp3");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  
  music_btn = createButton("播音樂")
  music_btn.position(10,10)
  music_btn.size(350, 100);
  music_btn.style('background-color', 'black');
  music_btn.style('font-size', '44px');
  music_btn.style('color', 'white');
  music_btn.mousePressed(music_btn_pressed)

  mouse_btn = createButton("暫停")
  mouse_btn.position(370,10)
  mouse_btn.size(350, 100);
  mouse_btn.style('background-color', 'black');
  mouse_btn.style('font-size', '44px');
  mouse_btn.style('color', 'white');
  mouse_btn.mousePressed(mouse_btn_pressed)

  Speech_btn = createButton("語音辨識(跳舞/不要跳)") //設定按鈕(語音辨識(跳舞/不要跳))
  Speech_btn.position(740,10) //設定按鈕(座標:740,10)
  Speech_btn.size(350, 100); //設定按鈕(大小350,100)
  Speech_btn.style('background-color', 'black'); //設定按鈕(背景:黑)
  Speech_btn.style('font-size', '32px'); //設定按鈕(文字大小32)
  Speech_btn.style('color', 'white'); //設定按鈕(文字顏色白色)
  Speech_btn.mousePressed(Speech_btn_pressed)//設定按鈕(Speech_btn_pressed)
  
}

function music_btn_pressed(){
  song.stop()
  song.play()
  songIsplay = true
  amp=new p5.Amplitude()
  music_btn.style('background-color', '#00b4d8');
  mouse_btn.style('background-color', 'black');
}
function mouse_btn_pressed(){  
  song.pause()
  songIsplay = true
  songIsplay = false
  music_btn.style('background-color', 'black');
  mouse_btn.style('background-color', '#00b4d8');
}
  function Speech_btn_pressed(){ //語音說話
    song.stop()
  song.play()
  songIsplay = true
  songIsplay = false
  mouse_btn.style('background-color', 'black');//設定按鈕顏色 
  Speech_btn.style('background-color', '#a8dadc');//設定按鈕顏色 
  myRec.onResult = showResult;
  myRec.start();  
}
function showResult()
  {
      if(myRec.resultValue==true) {
      
      push()
        translate(0,0)
        background(192, 255, 192);
        fill(255,0,0)
        textStyle("italic")
        text(myRec.resultString,1200,10);
        text(myRec.resultString,0, height/2);
      pop()
      result = myRec.resultString
      console.log(1)
      console.log(myRec.resultString)
      if(myRec.resultString==="播音樂")
      {
        music_btn_pressed()
        mosueIsplay = false
        songIsplay = true
      }
      if(myRec.resultString==="暫停")
      {
        song.pause()
        mosueIsplay = true
        songIsplay = false
        }
    }
  }

function draw() {
  background("#f2cc8f");
  if(songIsplay){
    vol = amp.getLevel()
    m_x =map(vol,0,1,0,width) 
    m_y= map(vol,0,1,0,height)
    
  }
  else
  if(mouseIsplay)
  {
    m_x = mouseX
    m_y= mouseY
  
  }
  for(var j=0;j<10;j++){
    positionX.push(random(width))
    positionY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
  // textSize(40)
  // text("x:"+mouseX+  "y:"+mouseY,50,50)
  push() 
  translate(positionX[j],positionY[j])
  clr = clrList[j]
  clr_r = clr_r_List[j]
  drawFlower(clr,clr_r,sizeList[j])
  pop()
}
}
function drawFlower(clr,clr_r,size=1){
  push()
  scale(size) //縮放
   
  rectMode(CENTER)
  noStroke()
  fill(clr)
  rect(0,0,420,300)
  
  fill("#e9c46a")
  ellipse(-120+map(mouseX,0,width,-20,60)+m_x/20,0+map(mouseY,0,height,-20,60)+m_y/20,60)//左眼
  fill("#e76f51")
  ellipse(100+map(mouseX,0,width,-20,60),0+map(mouseY,0,height,-20,60),100)//右眼
  console.log(map(mouseX,0,width,-20,60))
  fill("#e9c46a")
  rect(-90,-100,150,30)//左眉毛
  fill("#e9d8a6")
  rect(100+m_x/20,-100+m_y/20,150,30)//右眉毛
 
  fill("#0077b6")
  rect(0+m_x/20,10+m_y/20,30,80)//鼻
  fill("#588157")
  rect(-250,10,50,150)//左耳
  fill(clr_r)
  rect(250,10,60,150)//右耳
   

   

  //fill("#e9d8a6")
  //arc(0,100,200,100,0,180)
 if(mouseIsPressed)
  { //mouseIsPressed為true，代表有按下滑鼠
    fill("#e9d8a6")
  arc(0,75,200,150,0,PI) //下弧
  }
  else              
  {//mouseIsPressed為false，代表沒有按下滑鼠
    fill("#e9d8a6")
    arc(0,75,200,200,0,PI)//上弧
  }  
pop()
}
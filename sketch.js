var x=0, t=0,soma,y2,y1;
var caminho1=[],caminho2=[],caminho_soma=[],caminho3=[];
var canvas
var aux=0;
var f1,f2,f3;
var play;
var osc1,osc2,osc3;
var playing = false;
var sp1,sp2,sp3;
var k1,k2,k3.omega1,omega2,omega3,lambda1,lambda2,lambda3,phi2,phi,phi3;

function setup() {
  
  canvas = createCanvas(800,600);
  background(0)

  var p1=createP('Frequência 1')
  f1= createSlider(55, 880,220,1);
  sp1 = createSpan(+f1.value()+' Hz');
  var p2=createP('Frequência 2')  
  f2= createSlider(55, 880,330,1);
  sp2 = createSpan(f2.value()+' Hz');
  var p2=createP('Frequência 3')  
  f3= createSlider(55, 880,330,1);
  sp3 = createSpan(f3.value()+' Hz');
  play = createCheckbox('Tocar');
  
  play.changed(som);

  osc1 = new p5.Oscillator();
  osc1.setType('sine');
  osc1.amp(0);
  osc1.start();

  osc2 = new p5.Oscillator();
  osc2.setType('sine');
  osc2.amp(0);
  osc2.start();
  
  osc3 = new p5.Oscillator();
  osc3.setType('sine');
  osc3.amp(0);
  osc3.start();

  canvas.style("padding","5px")

  p1.position(840,140);
  f1.position(930,152);
  sp1.position(1080,153);

  p2.position(840,180);
  f2.position(930,192);
  sp2.position(1080,193);

  p3.position(840,220);
  f3.position(930,232);
  sp3.position(1080,233);
  
  play.position(838,120);
  
  
}

function som(){
  
  osc1.freq(f1.value());
  osc2.freq(f2.value());
  osc3.freq(f3.value());

  if (!playing) {
    
    osc1.amp(0.5, 0.05);
    osc2.amp(0.5, 0.05);
    osc3.amp(0.5, 0.05);
    playing = true;
  } else {
    
    osc1.amp(0, 0.5);
    osc2.amp(0, 0.5);
    osc3.amp(0, 0.5);
    playing = false;
  }
  
}

function draw(){

  sp1.html(f1.value()+' Hz');
  sp2.html(f2.value()+' Hz');
  sp3.html(f3.value()+' Hz');

  t=t+0.02;
  x=200*t;
  
  lambda1=1/f1.value();
  k1=2*PI/lambda1;
  omega1=2*PI*f1.value();

  lambda2=1/f2.value();
  k2=2*PI/lambda2;
  omega2=2*PI*f2.value();

  lambda3=1/f3.value();
  k3=2*PI/lambda3;
  omega3=2*PI*f3.value();  

  phi=k1*x-omega1*t;
  phi2=k2*x-omega2*t;
  phi3=k3*x-omega3*t;
  y1=100-50*sin(phi/50000)
  y2=100-50*sin(phi2/50000)
  y3=100-50*sin(phi3/50000)
  soma=(y1+y2+y3)+200;
 
  var posicao1=createVector(x,y1);
  var posicao2=createVector(x,y2);
  var posicao3=createVector(x,y3);
  var posicao_soma=createVector(x,soma);
    
  caminho1.push(posicao1);
  caminho2.push(posicao2);
  caminho3.push(posicao3);
  caminho_soma.push(posicao_soma);

  for (var i = 1; i < caminho1.length; i++) {
    line(caminho1[i-1].x,caminho1[i-1].y,caminho1[i].x,caminho1[i].y)
    stroke(255,0,0);
    strokeWeight(4);
    line(caminho2[i-1].x,caminho2[i-1].y,caminho2[i].x,caminho2[i].y)
    stroke(0,255,0);
    strokeWeight(4);
    line(caminho3[i-1].x,caminho3[i-1].y,caminho3[i].x,caminho3[i].y)
    stroke(255,0,255);
    strokeWeight(4);
    line(caminho_soma[i-1].x,caminho_soma[i-1].y,caminho_soma[i].x,caminho_soma[i].y)
    stroke(0,0,255);
    strokeWeight(4);
    aux=caminho1.length  
  }

  if(x>800){
    for (var i = 1; i < aux; i++) {
      caminho1.pop();
      caminho2.pop();
      caminho3.pop();
      caminho_soma.pop(); 
    }
    background(0);
    t=0;
  }

  print('Frequencia 1 = ' + phi);
  print('Frequencia 2 = ' + f1.value()*PI*t/100);


}


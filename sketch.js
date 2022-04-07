p5.disableFriendlyErrors = true;
// 
function setup() {
  frameRate(30);
  cvSiz = createVector(1024,768);
  img = [], q = 200; s = 16, scl = 32, grille = [cvSiz.x / scl, cvSiz.y / scl ];
  createCanvas( cvSiz.x, cvSiz.y, WEBGL ).id("mc");
  noiseDetail(4,.5);
  for ( i=2; i--; ) 
    img.push( createGraphics(cvSiz.x, cvSiz.y) );
  for ( y = 0; y < grille[1]; y++ ) {
    for ( x = 0; x < grille[0]; x++ ) {
      img[0].noStroke();
      img[0].fill( ((x+y)%2)?"#604060":"#404060" );
      img[0].rect( x *scl, y * scl, scl );
    }
  }
  img.push( createGraphics( cvSiz.x, 320 ) );
  windowResized();
}

function draw(f = frameCount) {
  push();
    translate(0,0,380);
    rotateX(80 * PI/180);
    img[1].copy( img[0], 0, cvSiz.y-s/2, cvSiz.x, s/2, 0, 0, cvSiz.x, s/2 );
    img[1].copy( img[0], 0, 0, cvSiz.x, cvSiz.y-s/2, 0, s/2, cvSiz.x, cvSiz.y-s/2 );
    img[0,1] = img[1,0];
    texture( img[0] );
    plane(cvSiz.x, cvSiz.y,2);
  pop();
  for(i=1024/s;i--;){
    for(j=320/s;j--;){
      r=map(sin(noise(i/q,j/q+cos(f/q)*1.6,f/q)*100),-1,1,32,96);
      img[2].noStroke();
      img[2].fill(0x40,r,0x60);
      img[2].rect(i*s,j*s,s,s);
    }   
  }
  image( img[2],-width/2,-height/2);
}

function windowResized(){
  let ratio  = createVector( windowWidth / cvSiz.x, windowHeight / cvSiz.y );
  if ( windowWidth > windowHeight && ratio.x > ratio.y )
  {
    select("#mc").style("width", round(cvSiz.x * ratio.y) + "px");
    select("#mc").style("height", windowHeight + "px");
  } else
  {
    select("#mc").style("width", windowWidth  + "px");
    select("#mc").style("height", round(cvSiz.y * ratio.x) + "px");
  }
}

/**
* @projectDescription   Canvas Particles Test
*
* @author   Diego Vilariño - http://www.ensegundoplano.com - @ensegundoplano - http://www.sond3.com
* @version  0.1
*/
var MAX_PARTICLES = 500,
   MAX_SPAWNRATE = 100,
   MAX_VELOCITY = 30,
   MAX_ACCELERATION = 1.5,
   MAX_VELOCITY_DEVIATION = 15,
   MAX_DEGREE = 360,
   MAX_DEGREE_DEVIATION = 180,
   MAX_SIZE = 100,
   MAX_STROKE_SIZE = 10,

   configDefault = {
      particles: 50,
      spawnrate: 1,
      color: "#ffae23",
      shape: "circle",
      position: "center",
      random_color: 0,
      velocity: 0,
      velocity_deviation: 2,
      acceleration: 0.0,
      direction_accel: 0,
      direction: 0,
      direction_deviation: 180,
      back_color: '#333333',
      stroke_size: 0,
      stroke_color: '#ffffff',
      opacity: 1,
      random_size: false,
      size: 5,
      particle_dead: true,
      shadow_blur: 0
   },

   config,

   mousePosX = window.innerWidth / 2,
   mousePosY = window.innerHeight / 2,

   degreesToRadians = (Math.PI / 180),
   stats,
   canvas,
   c,
   particleArray = [];

var ParticleGUI = function (config) {
   this.particles = config.particles;
   this.spawnrate = config.spawnrate;
   this.color = config.color;
   this.shape = config.shape;
   this.position = config.position;
   this.random_color = config.random_color;
   this.velocity = config.velocity;
   this.velocity_deviation = config.velocity_deviation;
   this.direction = config.direction;
   this.direction_deviation = config.direction_deviation;
   this.acceleration = config.acceleration;
   this.direction_accel = config.direction_accel;
   this.backcolor = config.back_color;
   this.stroke_size = config.stroke_size;
   this.stroke_color = config.stroke_color;
   this.opacity =  config.opacity;
   this.size = config.size;
   this.random_size = config.random_size;
   this.particle_dead = config.particle_dead;
   this.shadow_blur = config.shadow_blur;
   this.Share = function () {
      window.open('index.html?' + JSURL.stringify(config));
   };
   this.Export = function () {
      window.open('export.php?' + JSURL.stringify(config));
   };
};

window.onload = function() {
   var search = window.export_search || location.search.substr(1),
      params = decodeURIComponent(search),
      parsed = JSURL.parse(params),
      datGui = new dat.GUI(),
      pGui;
   
   config = $.extend({}, configDefault, parsed);
   pGui = new ParticleGUI(config);

   var controller_particules = datGui.add(pGui, 'particles', 1, MAX_PARTICLES);
   controller_particules.onChange(function(value) {
      config.particles = Math.round(value);
   });

   var controller_spawnrate = datGui.add(pGui, 'spawnrate', 1, MAX_SPAWNRATE);
   controller_spawnrate.onChange(function(value) {
      config.spawnrate = Math.round(value);
   });

   var controller_type = datGui.add(pGui, 'shape', { Rect: 'rect', Circle: 'circle', Triangle:'triangle'} );
   controller_type.onChange(function(value){
      config.shape = value;
   });
   var controller_position = datGui.add(pGui, 'position', { Mouse: 'mouse', Center: 'center', Random: 'random'} );
   controller_position.onChange(function(value){
      config.position = value;
   });

   var controller_size_rand = datGui.add(pGui, 'random_size');
   controller_size_rand.onChange(function(value){
      config.random_size = value;
   });
   var controller_size = datGui.add(pGui, 'size', 1, MAX_SIZE);
   controller_size.onChange(function(value) {
      config.size = Math.round(value);
   });
   var controller_stroke_size = datGui.add(pGui, 'stroke_size', 0, MAX_STROKE_SIZE);
   controller_stroke_size.onChange(function(value) {
      config.stroke_size = Math.round(value);
   });
   var controller_opacity = datGui.add(pGui, 'opacity', 0, 1);
   controller_opacity.onChange(function(value) {
      config.opacity = value;
   });
   var controller_dead_particle = datGui.add(pGui, 'particle_dead');
   controller_dead_particle.onChange(function(value){
      config.particle_dead = value;
   });
   var controller_shadow_blur = datGui.add(pGui, 'shadow_blur', 0,10);
   controller_shadow_blur.onChange(function(value) {
      config.shadow_blur = Math.round(value);
   });

   var folder_speeddir = datGui.addFolder("Speed and Direction");
   var controller_velocity = folder_speeddir.add(pGui, 'velocity', 0, MAX_VELOCITY);
   controller_velocity.onChange(function(value) {
      config.velocity = value;
   });
   var controller_velocitydeviation = folder_speeddir.add(pGui, 'velocity_deviation', 0, MAX_VELOCITY_DEVIATION);
   controller_velocitydeviation.onChange(function(value) {
      config.velocity_deviation = Math.round(value);
   });
   var controller_direction = folder_speeddir.add(pGui, 'direction', 0, MAX_DEGREE);
   controller_direction.onChange(function(value) {
      config.direction = Math.round(value);
   });
   var controller_directiondeviation = folder_speeddir.add(pGui, 'direction_deviation', 0, MAX_DEGREE_DEVIATION);
   controller_directiondeviation.onChange(function(value) {
      config.direction_deviation = Math.round(value);
   });

   var controller_acceleration = folder_speeddir.add(pGui, 'acceleration', 0.0, MAX_ACCELERATION);
   controller_acceleration.onChange(function(value) {
      config.acceleration = value;
   });
   var controller_direction_accel = folder_speeddir.add(pGui, 'direction_accel', 0, MAX_DEGREE);
   controller_direction_accel.onChange(function(value) {
      config.direction_accel = Math.round(value);
   });

   var folder_colors = datGui.addFolder("Colors");
   var controller_color = folder_colors.addColor(pGui, 'color', config.color);
   controller_color.onChange(function(value){
      config.color = value;
   });
   var controller_color_rand = folder_colors.add(pGui, 'random_color', { OFF: 0, ON: 1 } );
   controller_color_rand.onChange(function(value){
      config.random_color = value;
   });
   var controller_stroke_color = folder_colors.addColor(pGui, 'stroke_color', config.stroke_color);
   controller_stroke_color.onChange(function(value){
      config.stroke_color = value;
   });
   var controller_back_color = folder_colors.addColor(pGui, 'backcolor', config.back_color);
   controller_back_color.onChange(function(value){
      config.back_color = value;
   });

   datGui.add(pGui, 'Share');
   datGui.add(pGui, 'Export');

   init();

};

$(window).resize(function(){
  var canvas = document.getElementById('canvas');
  canvas.width=window.innerWidth;
  canvas.height = window.innerHeight;
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.top - root.scrollTop;
  var mouseY = evt.clientY - rect.left - root.scrollLeft;
  return {
      x: mouseX,
      y: mouseY
  };
}

function createParticle(){
  var particle = {};

  switch (config.position){
  case 'mouse':
    particle.x = mousePosX;
    particle.y = mousePosY;
    break;
  case 'center':
    particle.x = window.innerWidth/2;
    particle.y = window.innerHeight/2;
    break;
  case 'random':
    particle.x = randomRange(0,window.innerWidth);
    particle.y = randomRange(0,window.innerHeight);
    break;
  }

  var dirVel = randomRange(config.direction - config.direction_deviation, config.direction + config.direction_deviation),
    radVel = dirVel * degreesToRadians,
    xVel = Math.cos(radVel),
    yVel = Math.sin(radVel),
    radAccel = config.direction_accel * degreesToRadians,
    xAccel = config.acceleration * Math.cos(radAccel),
    yAccel = config.acceleration * Math.sin(radAccel),
    velocity = randomRange(config.velocity, config.velocity + config.velocity_deviation);

  particle.xSpeed = xVel * velocity;
  particle.ySpeed = yVel * velocity;
  particle.xAccel = xAccel;
  particle.yAccel = yAccel;

  var size;
  if (config.random_size){
    size = randomRange(1,MAX_SIZE);
  }else{
    size = config.size;
  }
  particle.size  = size;
  particle.active = true;

  return particle;
}

function init(){

    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '150px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );

    canvas = document.getElementById("canvas");
    c = canvas.getContext("2d");
    c.canvas.width  = window.innerWidth;
    c.canvas.height = window.innerHeight;

    canvas.addEventListener('mousemove', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      mousePosX = mousePos.x;
      mousePosY = mousePos.y;
    }, false);

    animate();
}

function update (particle) {
   var particle_color = config.color;
   if (config.random_color){
      var r = Math.random()*255>>0;
      var g = Math.random()*255>>0;
      var b = Math.random()*255>>0;
      particle_color = "rgba("+r+", "+g+", "+b+", "+config.opacity+")";
   }else{
      particle_color = "rgba("+hexToR(particle_color)+", "+hexToG(particle_color)+", "+hexToB(particle_color)+", "+config.opacity+")";
   }

   c.beginPath();

   c.lineWidth = config.stroke_size;
   c.fillStyle = particle_color;

   if (config.shadow_blur>0){
      c.shadowBlur = config.shadow_blur;
      c.shadowOffsetX = 1;
      c.shadowOffsetY = 1;
      c.shadowColor = "rgba(100, 100, 100, 1)";
   } else {
      c.shadowBlur = null;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;
      c.shadowColor = "rgba(100, 100, 100, 0)";
   }

   var particle_stroke_color = "rgba("+hexToR(config.stroke_color)+", "+hexToG(config.stroke_color)+", "+hexToB(config.stroke_color)+", "+config.opacity+")";
   c.strokeStyle = particle_stroke_color;

   switch (config.shape){
   case 'rect':
      c.fillRect(particle.x, particle.y, particle.size, particle.size);
      if(config.stroke_size>0){
         c.strokeRect(particle.x, particle.y, particle.size, particle.size);
      }
      break;

   case 'circle':
      var radius = particle.size / 2;
      c.arc(particle.x, particle.y, radius, 0, 2 * Math.PI);
      c.fill();
      if(config.stroke_size>0){
         c.stroke();
      }
      break;

   case 'triangle':
      c.moveTo(particle.x, particle.y);
      c.lineTo(particle.x + (particle.size*2) , particle.y);
      c.lineTo(particle.x + particle.size , particle.y - particle.size);
      c.lineTo(particle.x, particle.y);
      c.fill();
      if(config.stroke_size>0){
         c.stroke();
      }
      break;
   }

   c.closePath();

   particle.x = particle.x + particle.xSpeed;
   particle.y = particle.y + particle.ySpeed;
   particle.xSpeed += particle.xAccel;
   particle.ySpeed += particle.yAccel;

   if (config.particle_dead) {
      particle.size = particle.size * (0.9 + (randomRange(1,10)/100));
      if(particle.size<=0.25){
         particle.active = false;
      }
   } else {
      if (particle.x < -(particle.size) ||
         particle.y < -(particle.size) ||
         particle.x > window.innerWidth+particle.size ||
         particle.y > window.innerHeight+particle.size){
         particle.active = false;
      }
   }
}

function draw () {
   var particle, i, spawned;

   c.clearRect(0,0,window.innerWidth,window.innerHeight);
   c.fillStyle = config.back_color;
   c.fillRect(0,0,window.innerWidth,window.innerHeight);

   for (i in particleArray) {
      particle = particleArray[i];

      if (particle.active) {
         update(particle);
      } else {
         particleArray.splice(i, 1);
      }
   }

   for (spawned = 0; spawned < config.spawnrate; spawned++) {
      if (particleArray.length >= config.particles) {
         return; 
      }

      particleArray.push(createParticle());
   }
}

function animate(){
    requestAnimationFrame(animate);
    stats.begin();
    draw();
    stats.end();
}

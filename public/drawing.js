let socket = io();

socket.on('count connections', (contador) => {
  document.querySelector('.contador').innerHTML = ' ' + contador;
});

let pulsado;
let movimientos = [];

let crearLienzo = () => {
  var canvasDiv = document.getElementById('pizarra');
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', 500);
  canvas.setAttribute('height', 500);

  canvasDiv.appendChild(canvas);
  context = canvas.getContext('2d');

  canvas.addEventListener('mousedown', function(e) {
    pulsado = true;
    socket.emit('draw', [e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false]);
  });

  canvas.addEventListener('mousemove', function(e) {
    if (pulsado) {
      socket.emit('draw', [e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true]);
    }
  });

  canvas.addEventListener('mouseup',function(e) {
    pulsado = false;
  });

  canvas.addEventListener('mouseleave',function(e) {
    pulsado = false
  });
};

var drawing = function (movements) {
  movimientos.push(movements);
  context.lineJoin = 'round';
  context.lineWidth = 6;
  context.strokeStyle = 'blue';
  for( var i = 0; i < movimientos.length; i++){
    context.beginPath();
    // [Cord X, Cord Y, true ];
    if (movimientos[i][2] && i) {
      context.moveTo(movimientos[i-1][0],movimientos[i-1][1]);
    }else{
      context.moveTo(movimientos[i][0],movimientos[i][1]);
    }
    context.lineTo(movimientos[i][0],movimientos[i][1]);
    context.closePath();
    context.stroke();
  }
}

socket.on('update', function(_movimientos) {
  drawing(_movimientos);
});

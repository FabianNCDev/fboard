let io = require('socket.io');

module.exports = (HTTPServer) => {

  io = io.listen(HTTPServer);

  var contador = 0;

  io.on('connection', (socket) => {

    contador++;

    emitConnectionsCounts();

    socket.on('draw', (_movements)=> {
      console.log(_movements);
      io.sockets.emit('update',_movements);
    });

    socket.on('disconnect', () => {
      contador--;
      emitConnectionsCounts();
    });

  });

  function emitConnectionsCounts() {
    io.sockets.emit('count connections', contador);
  }
}

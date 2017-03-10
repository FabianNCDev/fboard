const path = require('path');

const express = require('express');
const app = express();
const pug = require('pug');

const http = require('http').Server(app);

//config
app.set('port', process.env.PORT || 3000);
app.set('views',path.resolve(__dirname,'views'));
app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.render('home', {title: 'Drawing'});
});

app.use(express.static(path.join(__dirname,'/public')));


const server = http.listen(3000,()=>{
  console.log('server on port', app.get('port'));
});

require('./sockets')(server);

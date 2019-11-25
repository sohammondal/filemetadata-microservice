'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname, size, mimetype } = req.file;
  return res.status(200).json({
    name: originalname,
    type: mimetype,
    size
  });
})

app.listen(process.env.PORT || 3000, function () {
  console.log('listening on', this.address().port);
});

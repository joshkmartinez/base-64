var express = require('express')
var app = express()
var validUrl = require('valid-url')
//const { parse } = require('url')

const api = express.Router()
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

function decode(s) {
  return Buffer.from(s, 'base64').toString('ascii')
}

function encode(s) {
  return Buffer.from(s).toString('base64')
}

function isBase64(s) {
  return Buffer.from(s, 'base64').toString('base64') === s
}

api.get('/rick', (req, res) => {
  res.writeHead(302, {
    Location: 'https://rickroll.now.sh'
  })
  res.end()
})

api.get('/:param', async (req, res) => {
  let u = req.params.param
  if (isBase64(u)) {
    let d = decode(u)
    if (validUrl.isUri(d)) {
      res.writeHead(302, {
        Location: d
      })
      res.end()
    } else {
      res.send(d)
    }
  } else {
    res.send(encode(u))
  }
})

api.get(['/e/:param', '/encode/:param'], async (req, res) => {
  res.send(encode(req.params.param))
})

api.get(['/d/:param', '/decode/:param'], async (req, res) => {
  res.send(decode(req.params.param))
})

api.get(['/is/:param', '/isBase64/:param'], async (req, res) => {
  res.send(isBase64(req.params.param))
})

api.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
})
app.use('/', api)
app.listen(3000, () => {
  //console.log('Server running on port 3000')
})

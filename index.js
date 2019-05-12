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

api.get('/e/:param', async (req, res) => {
  res.send(encode(req.params.param))
})

api.get('/d/:param', async (req, res) => {
  res.send(decode(req.params.param))
})

api.get('/is/:param', async (req, res) => {
  res.send(isBase64(req.params.param))
})

api.get('/', (req, res) => {
  res.send(`
  Base 64 Microservice

  Endpoints:
    /:param    ~ if :param is a valid base 64 hash it will be decoded an returned
                 if the decoded hash is a valid url then you will automatically be redirected to it
                  ex: /aHR0cHM6Ly9nb29nbGUuY29t goes to https://google.com

    /d/:param  ~ decode :param and return it
                 This will not redirect you if the hash is a valid url

    /e/:param  ~ encode :param and return it

    /is/:param ~ return true if the hash is valid base 64, else return false

    /rick      ~ just try it for yourself
    
`)
  //if link option to redirect
  //link to decode and encode
  //if no option given if valid base 64 decode
  // else encode
})
app.use('/', api)
app.listen(3000, () => {
  //console.log('Server running on port 3000')
})

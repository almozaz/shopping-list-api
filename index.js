const express = require('express')
const bodyParser = require('body-parser')
const passport = require('./config/auth')
const { shoppingLists, users } = require('./routes')

const PORT = process.env.PORT || 3030

let app = express()

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())

  .use(shoppingLists)
  .use(users)

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })


app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    // only print full errors in development
    error: app.get('env') === 'development' ? err : {}
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

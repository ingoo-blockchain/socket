const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const router = require('./routes')
const webSocket = require('./socket')

app.use(express.urlencoded({extended:true,}))
app.use(express.json())

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true
})

app.use(router)



webSocket(app.listen(3005,()=>{
    console.log('서버시작')
}))
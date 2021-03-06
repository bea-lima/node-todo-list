const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const path = require('path') 
const exphbs = require('express-handlebars')

tasks = require('./routes/tasks')

app.use(bodyParser.urlencoded({extended: true}))

app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.get('/tasks', tasks.findAll);
app.get('/tasks/:task', tasks.findByTask);
app.post('/tasks', tasks.addTask);
app.post('/update/:task', tasks.updateTask);
app.post('/delete/:task', tasks.deleteTask);

app.listen(3000, () => {
    console.log('listening on 3000')
})
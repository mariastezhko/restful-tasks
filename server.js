var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Create an Express App
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/1955_api');

var TaskSchema = new mongoose.Schema({
    title: String,
    description: { type: String, default: '' },
    completed: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/helloAngular/dist' ));


// Set our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Set our View Engine set to EJS
app.set('view engine', 'ejs');

// Routes
app.get('/tasks', function(req, res) {
    Task.find({}, function(err, tasks) {
      if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      } else {
        //res.json({data: names})
        res.json({message: "Success", tasks: tasks})
      }
    })
    //res.render('index', {errors: req.session.errors});
})

app.get('/tasks/:id', function(req, res) {
  console.log(req.params.id);
  let id = req.params.id;
  Task.find({_id: id}, function(err, task) {
    if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
    } else {
        console.log('successfully retrieved a task!', task);
        res.json({message: "Success", task: task})
    }
  })
})

app.post('/tasks/', function(req, res) {
    console.log("REQUEST", req.body.title)
    var task = new Task({title: req.body.title, description: req.body.description, completed: req.body.completed });
    task.save(function(err) {
      if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      } else {
        console.log('successfully added a task!');
        res.json({message: "Success", task: task})
        //res.redirect('/');
      }
    })
})

app.put('/tasks/:id', function(req, res) {
    let id = req.params.id;
    Task.findById(id, function(err, task) {
      if (err) {
        console.log('something went wrong');
      } else {
        if (req.body.title) {
          task.title = req.body.title;
        }
        if (req.body.description) {
          task.description = req.body.description;
        }
        if (req.params.completed) {
          task.completed = req.body.completed;
        }
        task.save(function(err) {
          // if there is an error console.log that something went wrong!
          if (err) {
              console.log("Returned error", err);
              res.json({message: "Error", error: err});
          } else { // else console.log that we did well and then redirect to the root route
              console.log('successfully edited a task!');
              res.json(task)
          }
        })
      }
    })
})

app.delete('/tasks/:id', function(req, res) {
    console.log("trying to delete");
    let id = req.params.id;
    Task.remove({_id: id}, function(err) {
      if (err){
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      }else {
        console.log('successfully deleted a task!');
        res.json({message: "Success"})
        //res.redirect('/');
      }
    })
})


// Set our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})

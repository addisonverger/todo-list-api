var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    }
];

// GET /api/todos

app.get('/api/todos', function (req, res, nextFn) {
  console.log('GET request sent to /api/todos')
  res.send(todoList)
})

// GET /api/todos/:id

app.get('/api/todos/:id', function (req, res, nextFn) {
  console.log('GET request sent to /api/todos/' + req.params.id)

  function isId (todoListItem) {
    return todoListItem.id == req.params.id
  }

  var todoListItem = todoList.find(isId)

  if (todoListItem === undefined) {
    res.sendStatus(404)
  } else {
    res.send(todoListItem)
  }

})

// POST /api/todos

app.post('/api/todos', function (req, res, nextFn) {
  console.log('POST request sent to /api/todos')
  res.send(req.body)
  todoList.push(req.body)
})

// PUT /api/todos/:id

app.put('/api/todos/:id', function (req, res, nextFn) {
  var idNum = req.params.id

  console.log('PUT request sent to /api/todos/' + idNum)

  res.send(req.body)
  todoList.splice(idNum - 1, 1, req.body)
})

// DELETE /api/todos/:id

app.delete('/api/todos/:id', function (req, res, nextFn) {
  var idNum = req.params.id

  console.log('DELETE request sent to /api/todos/' + idNum)

  res.send(req.body)
  todoList.splice(idNum - 1, 1)
})

app.listen(3000, function () {
    console.log('Todo List API is now listening on port 3000...');
})

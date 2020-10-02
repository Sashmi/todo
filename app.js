const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoDB", {useNewUrlParser: true});

const todoSchema = {
    todos: String
  };
  
  const todo = mongoose.model("todo", todoSchema);
  
  
  const todo1 = new todo({
    todos: "todolist!(default)"
  });
  
  const todo2 = new todo({
    todos: "<--click the check box if completed!!"
  });
  
const defaultItems = [todo1, todo2];

app.get("/", function(req, res) {

    todo.find({}, function(err, foundItems){
  
      if (foundItems.length === 0) {
        todo.insertMany(defaultItems, function(err){
          if (err) {
            console.log(err);
          } else {
            console.log(" savevd default to DB.");
          }
        });
        res.redirect("/");
      } else {
        todo.find({},function(err,found){
            res.render("index",{list:found})
        })
      }
    });
  
  });

  app.post("/",function(req,res){
    const newtodo=req.body.item;
    console.log(newtodo);
    

    const newitem= new todo({
        todos: newtodo
    });
    defaultItems.push(newitem);
    newitem.save();
    res.redirect("/");

  })

     


app.listen(3000, function() {
    console.log("Server started");
  });
require('dotenv').config();

const express = require('express');
const BodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

// const mongoDB = "mongodb+srv://admin-yash:Test123@cluster0.ccem9v6.mongodb.net/todolistDB\retryWrites=true";

// mongoose.connect(process.env.mongoDB);


// mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.connect(process.env.mongoDB, function (err) {
    if (err) {
        console.log(`unable to connect server : ${err}`)
    }
    else {
        console.log('Mongodb connected')
    }
});

const itemSchema = new mongoose.Schema({
    item: String
})
const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({
    item: 'welcome task list'
});
const item2 = new Item({
    item: '+ button to add task'
});
const item3 = new Item({
    item: '<-- to delete this task'
});

const defaultItem = [item1, item2, item3];


const app = express();

app.set('view engine', 'ejs');



app.use(BodyParser.urlencoded({ extenden: true }))
app.use(express.static("public"))
var Itemarr = ["eat", "sleep", "code"]
var workitem = [];
var date1 = require(__dirname + "/date.js");
console.log(date1.getDay());

app.get("/", function (req, res) {

    // var day = new Date();

    // var options={
    //     weekday:'long',
    //     day:"numeric",
    //     month:'long'
    // };
    // var today=day.toLocaleDateString("en-US",options);
    let day = date1.getDay()

    Item.find({}, function (err, foundItem) {
        if (foundItem.length === 0) {
            Item.insertMany(defaultItem, function (err) {
                if (err) {
                    console.log('your item not save')

                }
                else {
                    console.log('saved suceesfully')
                }
            })
             res.redirect("/");


        }
        else {
             res.render("list.ejs",{newlistitem : foundItem,listTitle :day})

        }



    })






})

app.post("/", function (req, res) {
    var newItem = req.body.worklist;
    // conole.log(req.body);
     const item=new Item({
        item:newItem
     });
     item.save();
     res.redirect('/');



    // if (req.body.list === "Work") {
    //     workitem.push(item);
    //     res.redirect("/work");

    // }
    // else {
    //     Itemarr.push(item);


    //     res.redirect("/");
    // }

    //  console.log(item);

})

app.post("/delete",function(req,res){
    const cheakitemid=req.body.checkbox;
    Item.findByIdAndRemove(cheakitemid,function(err)
    {
        if(!err)
        {
            console.log('sucessfully delete');
            res.redirect('/');
            
        }

    })

})

app.get("/about", function (req, res) {
    res.render("about");

})



app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newlistitem: workitem });
})

const port=process.env.PORT||3000;




app.listen(port, function () {
    console.log("server started");
})

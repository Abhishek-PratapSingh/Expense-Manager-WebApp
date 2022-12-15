const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true} //useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const User = require('./models/register.model');
const Budget = require('./models/budget.model');
const Category = require('./models/category.model');
const Expense = require('./models/expense.model');

app.post("/login", (req, res)=> {
  const { email, password} = req.body
  User.findOne({ email: email}, (err, user) => {
      if(user){
          if(password === user.password ) {
              res.send({message: "Login Successfull", user: user})
          } else {
              res.send({ message: "Password didn't match"})
          }
      } else {
          res.send({message: "User not registered"})
      }
  })
}) 

app.post("/budget/:id", async(req, res)=> {
    const id  = req.params.id
    console.log(id)
    const newBudget= await new Budget({
        userId: id ,
        amount: req.body.budget
    })
   
    // Budget.findOne({id: id}, (err, bgt) =>{
    //    // console.log(req.body.budget)
    //     // console.log(bgt);
        
    //     if(bgt){
    //       bgt.amount=req.body.budget;
    //    }
    //    else{
           newBudget.save(err=>{
             if(err){
                res.send(err)
               // console.log(err)
             }
             else{
                console.log(newBudget)
                res.send({message: "Budget Saved"})
             }
    //        })
    //    }
    })
  }) 

  app.post("/category/:id", async (req, res)=> {
    const id  = req.params.id
    console.log(req.body.category)

    const newCategory= await new Category({
        userId: id ,
        ctg: req.body.category || [] 
    })

    //console.log(ctg)
    
        newCategory.save(err=>{
            if(err){
            console.log("errrr")
            res.send(err)
            }
            else{
            // console.log(ctg)
            res.send({message: "Category Saved"})
            }
    })
  }) 


  app.post("/expense/:id", (req, res)=> {
    const id = req.params.id
    const newObj=req.body.expense;
    const newExpense= new Expense({
        userId: id ,
        obj: newObj 
    })
           newExpense.save(err=>{
             if(err){
                res.send(err)
             }
             else{
                console.log(newExpense)
                res.send({message: "Expense Saved"})
             }
    })
  }) 


app.post("/register", (req, res)=> {
  const { name, email, password} = req.body
  User.findOne({email: email}, (err, user) => {
      if(user){
          res.send({message: "User already registerd"})
      } else {
          const user = new User({
              name,
              email,
              password
          })
          user.save(err => {
              if(err) {
                  res.send(err)
              } else {
                  res.send( { message: "Successfully Registered, Please login now." })
              }
          })
      }
  })
}) 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

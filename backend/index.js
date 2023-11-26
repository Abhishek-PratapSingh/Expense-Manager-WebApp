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

app.get("/budget/:id", async(req, res)=>{
    const id  = req.params.id
    const data = await Budget.findOne({userdId : id});
    console.log(data);
    res.send({data});
})


app.post("/budget/:id", async(req, res)=> {
    const id  = req.params.id
    console.log("id is: " + id)

    const q = await Budget.findOne({userId:id}); 
    // console.log(q);
    if(!q){ 
        const newBudget= await new Budget({
            userId: id ,
            amount: req.body.budget
        })
        await newBudget.save(err=>{
            if(err){
                console.log("oops")    
                res.send(err)
            }
            else{
                console.log("newBudget: " + newBudget)
                res.send({message: "Budget Saved"})
            }
        })
    }
    else{
        // console.log("budget changed");
        q.amount = req.body.budget
        q.save(err => {
            if (err) {
                console.log("oops");
                res.send(err);
            } else {
                console.log("Budget updated:", q);
                res.send({ message: "Budget Updated" });
            }
        });
    }
  }) 

 
  app.post("/category/:id", async (req, res)=> {
    const id  = req.params.id
    console.log(req.body.category)
    //console.log(ctg)
    const q = await Category.findOne({userId:id}); 
    // console.log(q);
    if(!q){ 

        const newCategory= await new Category({
            userId: id ,
            ctg: req.body.category
        })
        console.log(`new category : ${newCategory}`);

        await newCategory.save(err=>{
            if(err){
                console.log("errrr")
                res.send(err)
            }
            else{
            // console.log(ctg)
            res.send({message: "Category Saved"})
            }
         })
    }
    else{
     
        q.ctg.push(...req.body.category);   
        await q.save(err => {
            if (err) {
                console.log("oops");
                res.send(err);
            } else {
                console.log("Category Added: ", q);
                res.send({ message: "Category Added"});
            }
        });
    }

  }) 
 
app.get("/category/:id", async(req, res)=>{
    const id  = req.params.id
    const data = await Category.findOne({userdId : id});
    console.log(data);
    res.send({data});
})

app.get("/expense/:id", async(req, res)=>{
    const id  = req.params.id
    const data = await Expense.findOne({userdId : id});
    console.log(data);
    res.send({data});
})


  app.post("/expense/:id", async(req, res)=> {
    const id = req.params.id
    const newObj=req.body.expense;
    console.log(`new obj: ${newObj}`);
 
    const q = await Expense.findOne({userId:id}); 
    if(!q) {
        const newExpense= new Expense({
            userId: id ,
            obj: newObj 
        })
            newExpense.save(err=>{
                if(err){
                    res.send(err)
                }
                else{
                    // console.log(newExpense)
                    res.send({message: "Expense Saved"})
                }
         })
     }
     else{
        // q.obj.push(...req.body.expense);
        console.log(`expense is : ${q}`);
        await q.save(err => {
            if (err) {
                console.log("oops");
                res.send(err);
            } else {
                console.log("Expense Added: ", q);
                res.send({ message: "Expense Added"});
            }
        });
         

     }

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

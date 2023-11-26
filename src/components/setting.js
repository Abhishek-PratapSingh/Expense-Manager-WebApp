import React from 'react'
import { Link, useParams ,useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect} from "react";
import axios from "axios";

const Setting = () => {
    const navigate = useNavigate()
    const uuid = require("uuid");
    uuid.v4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    
    const user_id = localStorage.getItem("userId")
   // const [idx , setIdx] =useState(0)
    // let tmpIdx;
    //const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route.  
   const [budget , setBudget] = useState(0);
   const [ctg , setCtg] = useState('')
   const [val , setVal] =useState('')

   const[newId,setNewId] = useState('')

   const [category , setCategory]=useState([])

    const [expense , setExpense] = useState([
         {  index:  '',
            ctgg:  '',
            vall : ''
           }
    ]);  

   useEffect(()=>{

    const auto = async()=>{
      const b = await axios.get(`http://localhost:5000/budget/${user_id}`);
      const c = await axios.get(`http://localhost:5000/category/${user_id}`);
      const e = await axios.post(`http://localhost:5000/expense/${user_id}`);

      console.log(b.data.data.amount);
      console.log(`fetched categories ${c.data.data.ctg}`);
      setBudget(b.data.data.amount)
      setCategory(c.data.data.ctg)
      // setExpense(e.data.data.obj)
      // console.log(e.data.data.obj); 
    }
  
    auto(); 

   },[])  
    
   const onBudgetChange =  e =>{
       e.preventDefault()
       if(e.target.value > 0)
       setBudget(e.target.value);
       console.log(budget);
   }
   
   const addCategory= e=>{
   // setCategory(category =>[ ...category , e.target.value ] )
    //  setCategory({...setCategory, [e.target.name]:  e.target.value});
    e.preventDefault();
    setCtg(e.target.value);
    console.log(ctg);
    // console.log(category)
   }

   const handleCategory= async e=>{
    e.preventDefault();
    setCategory(category => [...category, ctg]);
    console.log(`category array: ${category}`)
    alert('catergory added')
    await axios.post(`http://localhost:5000/category/${user_id}`,{"category":category})
    // console.log("hi")
   }

    const onValueChange = (e)=>{
        e.preventDefault();
       setVal(e.target.value)
       console.log(val)
    }

    const handleExpense = (e)=>{
      e.preventDefault()

      if(budget - val < 0){
        alert("Can't add expense, budget is low");
        return;
      }

      setBudget(budget-val);
      
      setExpense(expense => [...expense, {index : uuid.v4() , ctgg : ctg , vall : val}]);
      console.log(expense);
    }
     
    const style1={
      display : "flex" ,
      justifyContent : "space-between", 
      backgroundColor:"azure"
    }

    const deleteExpense = id=>{
        
        setExpense(expense.filter(item =>
           item.index!==id 
        ))
        
        
        let j= expense.findIndex( x =>{
           return x.index === id
        });
         
        rebateBudget(expense[j].vall)
        console.log(j +" "+ id )
        navigate("/setting")
    }

    const rebateBudget = e =>{
      
      console.log(typeof(budget))
      console.log(typeof(e))


      setBudget(budget + parseInt(e))
    }

    const editExpense = id =>{

        let j= expense.findIndex( x =>{
          return x.index === id
        });
       
        setNewId(j);
    }

    const handleEditExpense = e=>{
          
          e.preventDefault()
          // expense[i].ctgg= obj.selectedCategory
          // expense[i].vall=obj.val  
          const obj=Object.fromEntries(new FormData(e.target));
          console.log(obj.selectedCategory);
          let i = parseInt(newId)
          console.log(budget + expense[i].vall)
         
          if(parseInt(obj.val) > parseInt(budget) + parseInt(expense[i].vall)){
            alert("Please enter value within the Budget")
            return ;
          }
          
          let temp= expense[i].index
          setBudget(budget + parseInt(expense[i].vall) - parseInt(obj.val)) 
          setExpense([...expense.slice(0,i), { index: temp , ctgg: obj.selectedCategory , vall : obj.val} , ...expense.slice(i+1)])

          alert("Expense Successfully edited")
          setNewId('')
          axios.post(`http://localhost:5000/expense/${user_id}`,{"expense":expense})
          navigate('/setting')
    }
     
    return ( 

    <div style={{backgroundColor: "powderBlue"}}>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
                <li className="nav-item px-5">
                  <Link to="/login" className="nav-link ">login</Link>
                </li>
                <li className="nav-item px-5">
                  <Link to="/logout" className="nav-link" href="#">logout</Link>
                </li>
                <li className="nav-item px-5">
                  <Link to="/register" className="nav-link" href="#">register</Link>
                </li>
              </ul>
          </div>
        </div>
      </nav>
 
      <div class="container" >  
    
      <div class="">
       <div class="">
          <div className="box p-3 mb-3 mt-5" style={{border:"3px solid #d0d0d0" , backgroundColor: "#588ebb"}}>
          <div  style={style1}> 
            <form onSubmit={e => {e.preventDefault();  if(budget> 0)alert("Budget added"); else alert("Please entern non-negative budget") }}> 
            <h5 className="mb-3 ">Define Budget</h5>
                <div class="form-group">
                   <input type="number" className="form-control  mb-4" name="budget"  onChange={ e => {onBudgetChange(e)}} placeholder="Enter Budget" required/>
                </div>
                  
                <button onClick={e =>{ axios.post(`http://localhost:5000/budget/${user_id}`,{"budget":budget})}} type="submit" className="btn btn-primary btn-block mt-4">Submit</button>
             </form>
         
           
              <hr />
              <hr />
              <form onSubmit={handleCategory}> 
            <h5 className="mb-3 ">Define Categories</h5>
                <div class="form-group">
                   <input type="text" className="form-control  mb-4" name="category"    onChange={e => addCategory(e)} placeholder="Add Category" required/>
                </div>
  
                <button type="submit" className="btn btn-primary btn-block mt-4">Add Category</button>
             </form>
             
        </div>
        </div>
      </div>

      <div class="">
       <div class="">
          <div className="box p-3 mb-3 mt-5" style={{border:"5px solid #d0d0d0" , backgroundColor:"#588ebb"} }>
            
            <form  onSubmit={handleExpense} style={{border:"5px solid #d0d0d0" , backgroundColor:"azure"} }> 
            <h5 className="mb-3" >Add Expenses</h5>
                
            <div class="form-group" style={style1}>
            {/* <input type="text" id=""  className="form-control" placeholder="Search Category" style={{backgroundColor:"#ececec"}}/> */}
              <select name="category-select" id=""  
                    style={{ width : "100rem" }}
                    onChange={e => addCategory(e)} required >
                        /<option value="" />
                    {category.map(e => {
                    return <option value={e}>{e}</option>;
                    })}
                </select>  
                
              </div>
             <br />
                
                <div class="form-group">
                   <input type="number" className="form-control  mb-4" name="val" onChange={e => onValueChange(e)} placeholder="Enter Amount" required/>
                </div>
  
                <button onClick={e =>{ axios.post(`http://localhost:5000/expense/${user_id}`,{"expense":expense})}} type="submit" className="btn btn-primary btn-block mt-4">Submit</button>
             </form>

        </div>
      </div>
      
      </div>
      </div>
    </div>
        
         <br />
         <br /> 
         <hr />
        <h3 className="text-center mb-4" > Budget: {budget} </h3>

      <div className="container "  >
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5" style={{border:"5px solid #d0d0d0" , backgroundColor: "Azure"}}>
     

        <h4 className="text-center mb-4">Expense Chart</h4>
       
        <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>Category</th>
                <th>Spent Amount</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            { 
             expense.map((e,i) =>{
                return ( <tr>
                     

                      <td> {e.ctgg} </td>
                      <td> {e.vall}  </td>

                     {/* {e.map(val=>{
                        
                        if(Number.isInteger(val)){
                          tmpIdx=val;
                          console.log("tmpIdx: " + tmpIdx)
                          return ;
                        }
                        else  return <td > {val} </td> 

                       }) }  */}

                     { i > 0 ? 
                     <td> 
                         <button value={e.index}  onClick={f=>{editExpense(f.target.value)}} style={{backgroundColor:"LightGreen"}}  > Edit</button>
                         <button value={e.index}  onClick={f=>{deleteExpense(f.target.value)}} style={{backgroundColor:"Orange"}}  > Delete</button>
                     </td>

                      : 
                      console.log(i)
                       }
                  </tr>
                )
             })
            
            }
            </tbody>
        </table>

          </div>
      </div> 
    </div>
   
   <br />
        { newId!=='' ?
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5" style={{marginBottom:"2rem" ,  border:"5px solid #d0d0d0" , backgroundColor: "Azure"}}>

        
        <h4 className="text-center mb-4">Edit Expense</h4> 
        <form  onSubmit={e=> handleEditExpense(e)}> 
            {/* <h5 className="mb-3" >Edit your Expense</h5> */}
                
            <div class="form-group" style={style1} >
            {/* <input type="text" id=""  className="form-control" placeholder="Search Category" style={{backgroundColor:"#ececec"}}/> */}
              <select name="selectedCategory" id=""  
                    style={{ width : "100rem" }}
                    onChange={e => addCategory(e)} required >
                        /<option value="" />
                    {category.map(e => {
                    return <option value={e}>{e}</option>;
                    })}
                </select>  
                
              </div>
             <br />
                
                <div class="form-group">
                   <input type="number" className="form-control  mb-4" name="val"  placeholder="Enter Amount" required/>
                </div>
  
                <button type="submit" className="btn btn-primary btn-block mt-4">Submit</button>
        
             </form> 
           </div> </div> </div>

           : console.log('Nothing to edit ')
     }          
                  
        </div>
     );
}
 
export default Setting;
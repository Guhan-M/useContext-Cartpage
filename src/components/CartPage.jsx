import React,{useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import {userContext} from '../utils/UserContext'

function CartPage() {
  let userall = useContext(userContext)
  let [total,setTotal]=useState(0)

  const removedata=(e,i)=>{
    const updatedCart = userall.totalamount.filter(item => item.id !== e.id);
    userall.setTotalamount(updatedCart)
}

useEffect(() => {
    let sum = 0;
    userall.totalamount.forEach(item => {
      // if(total==0){
      //   sum += 1 * item.price ; 
      //   setTotal(sum) 
      // }
      // else
      sum += item.quantity * item.price ;
      setTotal(sum); 
    });
   
   
},[userall.totalamount]);

const handleamout=(a,id)=>{
  userall.setTotalamount(userall.totalamount.map((value,index)=>{
    if(index==id){
      value.quantity=a
    }
    return value
  }
  ))
}

    return <>
  <div className='container' style={{display:"flex",flexDirection:"column",padding:"50px"}}>
   <div  style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
   {userall.totalamount.map((e,i)=>{
    return <div key={i} > 
    <div >
      <Card style={{ width:"20rem",padding:"5px",margin:"20px"}}>
      <Card.Img variant="top" src={e.thumbnail} style={{height:"10rem"}}/>
      <Card.Body>
        <Card.Title>{e.title}</Card.Title>
        <Card.Text style={{height:"5rem"}}> {e.description}</Card.Text>
        <Button variant='danger' className='btn-sm' onClick={()=>removedata(e,i)}>Remove</Button>
      </Card.Body>
       <div style={{display:"flex",justifyContent:"space-around", padding:"15px"}}>
      <Form.Select style={{width:"60px"}}  onChange={(e)=>{handleamout(e.target.value,i)}}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      </Form.Select>
    <h4><b>${e.quantity*e.price?e.quantity*e.price:e.price} </b></h4>
      </div>
      </Card>
    </div>
    </div>
   })}
   </div>
    

      <hr/>
    <div>
        <div style={{display:"flex",justifyContent:"space-between"}}><span>SUBTOTAL :</span><span><b>${total}</b></span></div><br/>
         <div style={{display:"flex",justifyContent:"space-between"}}><span>SHIPPING :</span> <span><b>FREE</b></span></div></div>
         <hr/>
         <div style={{display:"flex",justifyContent:"space-between"}}><span><b><h5>TOTAL :</h5></b></span><span><b><h5>${total}</h5></b></span></div>
    </div>
</>
}

export default CartPage
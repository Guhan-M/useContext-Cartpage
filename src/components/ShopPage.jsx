import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import {userContext} from '../utils/UserContext'
import Container from 'react-bootstrap/Container';
import {Navbar,Button,Card} from 'react-bootstrap';
import StarRateTwoToneIcon from '@mui/icons-material/StarRateTwoTone';
import { Link } from 'react-router-dom';


function ShopPage() {
  let users = useContext(userContext)
  let [cart,setCart]=useState(0);
  let [toggle,setToggles]=useState(users.data.map(() => true ))

  
  const handleToggle = (e,index) => {
    const newToggles = [...toggle];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
    if  (!newToggles[index]) {
      const updatedCart = [...users.totalamount, e];
      users.setTotalamount(updatedCart)
    } else{
      const updatedCart = users.totalamount.filter(item => item.id !== e.id);
      users.setTotalamount(updatedCart)
    }
  };

  return <>

  <Navbar expand="lg" className="bg-light">
      <Container>
        <Navbar.Brand >Shopping Site</Navbar.Brand>
        <Link to={"/cartpage"}><Button variant="outline-success"> Cart <span className="badge bg-dark text-white ms-1 rounded-pill" >{cart}</span></Button></Link>
      </Container>
  </Navbar>  
    <div className="container" style={{display:"flex",marginTop:"3%",justifyContent:"space-between"}}>
     {
       users.data.map((e,i)=>{
          return <div key={i} >  
               <Card style={{ width:'18rem', height:"100%"}}>
                    <Card.Img variant="top" src={e.thumbnail} style={{ width:'auto', height:"100%"}} />
                    <Card.Body>
                      <Card.Title>{e.title}</Card.Title>
                      <Card.Text>{e.description}</Card.Text>
                      <div style={{display:"flex",justifyContent:"space-between",margin:"5px"}}>
                      <Card.Text><StarRateTwoToneIcon fontSize='small'/>Rating:{e.rating}</Card.Text>
                      <Card.Text><b>Price: ${e.price} </b></Card.Text>
                      </div>
                      <div style={{textAlign:"center"}}>
                      {toggle[i] ? 
                      ( <button  className="btn btn-outline-dark mt-auto"  onClick={()=>{setCart(cart + 1); handleToggle(e,i);}}> Add to cart </button>) : 
                       ( <button className="btn btn-outline-dark mt-auto" onClick={() => { setCart(cart - 1); handleToggle(e,i);}}> Remove from cart </button>) }
                       </div>
                       </Card.Body>
                  </Card>
            </div>
          })
      }
</div>

</>
}

export default ShopPage
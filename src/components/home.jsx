import React from 'react'
import {Link} from 'react-router-dom'
import './home.css'
import HappyDogOwner from '../images/happy-owner-dog.jpg'

const Home = () => {
  return (
    
    <div>
    <div className="title"><h1>Welcome to Dog Match</h1></div>

    <div className="home">
<div className="information-container">

<h2>  Are you hunting for that perfect companion
   that is always happy to see you anytime of day?  
   No matter if you forgot to take the trash out.. 
   No matter if you have if you was hangry and got 
   a little snappy. Well will help you locate
   that perfect companion here... 
   </h2>

</div>
<Link to="/login"> <button className='login-button'>Login</button></Link> 
</div>




    </div>
  )
}

export default Home
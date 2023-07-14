import React from 'react'
import {Link} from 'react-router-dom'
import './home.css'
import HappyDogOwner from '../images/happy-owner-dog.jpg'

const Home = () => {
  return (
    <div className='home'>

    <div className="intro">
   
    <h1 className='title'>
    Welcome to dog match. Where we will help match you to your new addition to the family. First things first please navigate your way to the <Link to="/login">login</Link>  page!    </h1>

    </div>



    </div>
  )
}

export default Home
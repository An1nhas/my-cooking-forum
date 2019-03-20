import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import xhr from 'xhr';
import { Button, Row, Col} from 'reactstrap';
import image from '../assets/img5.jpg';
import NavBar from './Navbar';


export default class Homepage extends Component {
    
  constructor(props){
    super(props);
    this.state = {
      recipes: [],
      userName: '',
    }
  }

  componentDidMount=()=>{
    xhr.get('/api/user', {json: true}, (err, res)=>{
      if(res.statusCode === 401) window.location.href = '/';
      this.setState({userName: res.body.userName});
    })
    xhr.get('/api/recipes', {json: true}, (err, res)=>{
      if(!this.state.userName) { 
        console.log(err);
        window.location.href = '/';
      }
      else{
        console.log(res.statusCode)
        this.setState({recipes: res.body.reverse()});
      }   
    })
  }


  render() {

    const Bg ={
      backgroundImage: `url(${image})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      overflow: 'hidden',
      backgroundAttachment: 'fixed'
    }
    
    const Title = {
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow:'black 0px 0px 20px',
      color: 'white'   
    }
    
    return (
      <div className="Homepage" style={Bg}>
      <NavBar />
      
        <div className="Titles" >

         <h1 style={Title}>Little Chefs </h1>
         <p style={Title}>Free Cooking Forum</p>        
     </div>
    <div className="Container" >   
         { this.state.recipes && this.state.recipes.map((recipe)=>{
              return(

                <div key={recipe._id}>
              <Row >
                <Col xs={10}>
                <p>{recipe.title} (posted by:  {recipe.user.name})</p>
                </Col>
                <Col xs={2}>
                <Button outline color="info"><Link style={{color: '#41b0c2', float:'right'}} to={`/recipe/${recipe.title}`}>Check</Link></Button>
                </Col>
              </Row>
                 
              
                 
                </div>
              )
            })}
           </div>
       </div> 
    
    );
  }
};

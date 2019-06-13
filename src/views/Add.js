import React, { Component } from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import xhr from 'xhr';
import NavBar from './Navbar';
import image from '../assets/img3.jpg';


export default class Homepage extends Component {
    
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      errors: ''
    }
  }


  updateValue = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }


  
  sendForm = (event) => {
    event.preventDefault();
    this.setState({errors: ''});
    if(this.state.title === ''){
      this.setState({errors: "Title required!"});
    }
    else{
      xhr.post('/api/create', {json:true, body:this.state}, (err, res)=>{
        if(res.body.ok) {
          window.location = "/homepage";
        }else{
          this.setState({errors: "Server error!"});
        }
      })
    }
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

    const Title ={
        color:'#58b9c4',
        textShadow:'grey 0px 0px 30px',
        marginBottom: '20px',
        marginTop: '20px',
        textAlign: 'center'
    }

    return (
        <div style={Bg}>
          <NavBar />
         <div className="WriteRecipe">   
        <h3 style={Title}>Write your Recipe</h3>
         <h3 style={{color:'#990000'}}>{this.state.errors}</h3>
        <Form>
          <FormGroup>
          <p>Title</p>
            <Input type="text" name="title" onChange={this.updateValue} value={this.state.title}/>
          </FormGroup>
          <FormGroup>
          <p>Description</p>
            <Input type="textarea" style={{height:'200px'}} name="description" onChange={this.updateValue} value={this.state.description} placeholder="Write your recipe here..."/>  
          </FormGroup>
            <Button color="info" type="submit" onClick={this.sendForm}>Share</Button>
        </Form>
          </div>
          </div>
    );
  }
};


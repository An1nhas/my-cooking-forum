import React, { Component } from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import NavBar from './Navbar';
import image from '../assets/img3.jpg';
import axios from 'axios';


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

     
  componentDidMount=()=>{
    let title = this.props.match.params.title;
    axios.get(`/api/recipe/${title}`)
    .then(res => {
      console.log(res);
      this.setState({title: res.data.title, description: res.data.description})
    })
    .catch(err => {
      console.log(err);
    });
} 
  
  sendForm = (event) => {
    event.preventDefault();
    this.setState({errors: ''});
    if(this.state.title === ''){
      this.setState({errors: "Title required!"});
    }
    else{
        let title = this.props.match.params.title;
        axios.put('/api/recipe/edit/' + title, {title:this.state.title, description: this.state.description})
      .then(res => {
        console.log(res);
        window.location.href="/homepage";
      })
      .catch(err => {
        console.log(err);
      });
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
        <h3 style={Title}>Edit your Recipe</h3>
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
            <Button color="info" type="submit" onClick={this.sendForm}>Update</Button>
        </Form>
          </div>
          </div>
    );
  }
};


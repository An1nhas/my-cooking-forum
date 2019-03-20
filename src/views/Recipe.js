import React, { Component } from 'react';
import xhr from 'xhr';
import NavBar from './Navbar';
import {Button, Form, FormGroup, Input, Row, Col} from 'reactstrap';
import image from '../assets/img4.jpg';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Recipe extends Component{
   

    constructor(props){
        super(props);
        this.state = {
          title:'',
          description: '',
          comments:[],
          errors: '',
          comment: '',
          user:{}     
        }
    }


   
  updateValue = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  
  sendForm = (event) => {
    console.log('event', event)
    event.preventDefault();
    this.setState({errors: ''});
      xhr.post('/api/create/comment', {json:true, body:{comment: this.state.comment, title: this.state.title}}, (err, res)=>{
        console.log('The response: ', res.body);
        if(res.body.ok) {
          console.log('comment successful')
          var comments = this.state.comments
          comments.push({comment: this.state.comment, user: this.state.user})
          this.setState(
            {
              comment: '',
              comments,
              user: {
                name:''
              }
            })
        }else{
          this.setState({errors: "Server error!"});
        }
      })
  }
      
   componentDidMount=()=>{
    let title = this.props.match.params.title;
    xhr.get(`/api/recipe/${title}`, {json: true} ,(req, res)=>{
     if(res.statusCode === 401) return window.location = '/';
     this.setState(res.body);
    });
    xhr.post(`/api/comments`, {json: true, body: {title}} ,(req, res)=>{
     if(res.statusCode === 401) return window.location = '/';
     this.setState({comments: res.body,});
    });
} 


    deleteRecipe = () => {
      const title = this.props.match.params.title;
      axios.delete(`/api/recipe/delete/${title}`)
      .then((res)=>{
        console.log(res)
        window.location.href = "/homepage";
      }).catch((err)=>{
        console.log(err)
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

          const Title ={
              color:'#58b9c4',
              textShadow:'grey 0px 0px 30px',
              marginBottom: '30px',
              marginTop: '30px',
              textAlign: 'center'
          }

          const {title} = this.props.match.params
        return (
            <div className="OneRecipe" style={Bg}>
            
            <NavBar />
            <div className="Recipe">    
                <h1 style={Title}>{this.state.title}</h1>
                <p>{this.state.description}</p>
                <Row>
                  <Col md={10}></Col>
                  <Col md={1}>
                  <Button outline color="secondary" type="submit" onClick={this.deleteRecipe}>Delete</Button>
                  </Col>
                  <Col md={1}>
                  <Button outline color="info" type="submit" ><Link style={{color: '#41b0c2'}} to={`/recipe/edit/${this.state.title}`}>Edit</Link></Button>
                  </Col>
                </Row>
                    </div>
            <div className="Response" >  
            { this.state.comments && this.state.comments.map((com)=>{
              return(
                <div key={com._id}>
              <div className="com">                    
                <p>{com.comment}</p>
                <p style={{fontSize: '11px'}}>(posted by:  {com.user.name}) </p>
       </div>
                </div>
              )
            })}
           </div>
            <div className="CommentForm">
                    <p>Comment</p>
                     <Form>
                         <FormGroup>
                         <Input type="text" name="comment" value={this.state.comment} onChange={this.updateValue}/>
                         </FormGroup>
                         <input type="hidden" name="title" value={title} onChange={this.updateValue} />
                        <Button color="info" onClick={this.sendForm} type="submit">Comment</Button>
                    </Form>
            </div>
            </div>
              
        );
    }
    
}
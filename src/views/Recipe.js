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
          errors:'',
          comment:'',
          user:{},
          userName:''    
        }
    }


   
  updateValue = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  
  sendForm = (event) => {
    event.preventDefault();
    this.setState({errors: ''});
      xhr.post('/api/create/comment', {json:true, body:{comment: this.state.comment, title: this.state.title}}, (err, res)=>{
        if(res.body.ok) {
          var comments = this.state.comments
          comments.push({comment: this.state.comment, user: this.state.userName}) 
          let title = this.props.match.params.title;
          xhr.post(`/api/comments`, {json: true, body: {title}} ,(req, res)=>{
            if(res.statusCode === 401) return window.location = '/';
            if(res.body) {
              this.setState({comments: res.body});
            }
          });
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
     this.setState({comments: res.body});
    });
    xhr.get('/api/user', {json: true}, (err, res)=>{
      if(res.statusCode === 401) return window.location = '/';
      this.setState({userName: res.body.userName});
    })
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


    
    deleteComment = (id) => {
      const title = this.props.match.params.title;
      axios.delete(`/api/comment/delete/${id}`)
      .then((res)=>{
        console.log(res)
        window.location.href = `/recipe/${title}`;
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
                {this.state.user.name === this.state.userName ? (
                  
                    <Row>
                  <Col md={8}></Col>
                  <Col md={2}>
                  <Button outline color="secondary" type="submit" onClick={this.deleteRecipe}>Delete</Button>
                  </Col>
                  <Col md={2}>
                  <Button outline color="info" type="submit" ><Link style={{color: '#41b0c2'}} to={`/recipe/edit/${this.state.title}`}>Edit</Link></Button>
                  </Col>
                </Row>
                  ):<span></span>
                }
                
                    </div>
            <div className="Response" >  
            { this.state.comments ? this.state.comments.map((com)=>{
              return(
                <div key={com._id}>
              <div className="com">                    
                <p>{com.comment}</p>
                <p style={{fontSize: '12px'}}>(posted by:  {com.user.name}, {com.created_at.slice(0,10)} at {com.created_at.slice(11,16)})</p>
                {com.user.name === this.state.userName ? (
                <Button outline color="secondary" size="sm" type="submit" id={com} onClick={(e)=>this.deleteComment(com._id, e)}>Delete</Button>
                ):<span></span>
              }
              </div>
                </div>
              )
            }) : <p>No comments</p>}
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
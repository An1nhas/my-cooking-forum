import React, { Component } from 'react';
import xhr from 'xhr';
import image from './../assets/img1.jpg';
import { Button, Form, FormGroup, Input, Col, Row} from 'reactstrap';

class LogReg extends Component {
    constructor(props){
        super(props);
        this.state = {
          message: '',
          loginerror: '',
          loginEmail: 'ana@restart.com',
          loginPass:'111111',
          errors: '',
          username: '',
          email: '',
          password: '',
          confirmpass: '',

        }
    }


  updateValue = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  sendForm = (event) => {
    event.preventDefault();
    this.setState({errors: ''});
    if(this.state.password !== this.state.confirmpass){
      return this.setState({errors: "Passwords don't match!"});
    }
    else if (this.state.password.length < 5){
      return this.setState({errors: "Passwords must have at least 5 characters!"});
    }
    else{
      xhr.post('/api/register', {json:true, body:this.state}, (err, res)=>{
        console.log('The response: ', res);
        if(res.body.ok) {
          this.setState({message: "Register successful!"});
        }else{
          this.setState({errors: "Server error!"});
        }
      })
    }
  }

  loginForm = (event) => {
    event.preventDefault();
    this.setState({errors: ''});
    xhr.post('/api/login',  {json:true, body:{email:this.state.loginEmail, password:this.state.loginPass}}, (err, res)=>{
      if(res.statusCode === 200) {
          window.location = "/homepage";
      }else{
        this.setState({loginerror: "Error logging in!"});
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


const FormBox = {
  float: 'right',
  marginRight: '30px',
  marginTop: '30px',
  width: '55%',
}



const Title = {
  color: '#58b9c4',

}

    return (
      <div className="LogReg" style={Bg}>
   
        <div className="LogForm" style={FormBox}>
          <h1 style={Title}>Login</h1>
          <h3 style={{color:'#990000'}}>{this.state.loginerror}</h3>
          <Form>
            <Row form>
              <Col xs={5}>
              <Input type="email" onChange={this.updateValue} value={this.state.loginEmail} name="loginEmail" placeholder="email" />
              </Col>
              <Col xs={5}>
              <Input type="password" onChange={this.updateValue} value={this.state.loginPass} name="loginPass"  placeholder="password" />
              </Col>
              <Col xs={2}>
              <Button outline color="info" type="submit" onClick={this.loginForm}>Login</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="RegForm" style={FormBox}>
          <h1 style={Title}>Register</h1>
          <h3 style={{color:'#990000'}}>{this.state.errors}</h3>
          <h3 style={{color:'#339338'}}>{this.state.message}</h3>
          <Form>
            <FormGroup>
                <p>Username</p>
                <Input type="text" onChange={this.updateValue} value={this.state.username} name="username" />
            </FormGroup>
            <FormGroup>
                <p>E-mail</p>
                <Input type="email" onChange={this.updateValue} value={this.state.email} name="email" />              
            </FormGroup> 
            <FormGroup>
                <p>Password</p>
                <Input type="password" onChange={this.updateValue} value={this.state.password} name="password" />      
            </FormGroup> 
            <FormGroup>
                <p>Confirm Password</p>
                <Input type="password" onChange={this.updateValue} value={this.state.confirmpass} name="confirmpass" />
            </FormGroup>
                <Button color="info" type="submit" onClick={this.sendForm}>Register</Button>
          </Form>
       </div> 
    
      </div>
    );
  }
}

export default LogReg;
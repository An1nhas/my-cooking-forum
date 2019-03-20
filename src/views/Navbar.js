import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink} from 'reactstrap';
import xhr from 'xhr';


export default class NavBar extends Component{
   
    constructor(props){
        super(props);
        this.state = {
          userName: '',
          isOpen: false
        }
      }
    
      toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      } 
    
    
      componentDidMount=()=>{
        xhr.get('/api/user', {json: true}, (err, res)=>{
          if(res.statusCode === 401) return window.location = '/';
          this.setState({userName: res.body.userName});
        })
        xhr.get('/api/recipes', {json: true}, (err, res)=>{
          if(!this.state.userName) { 
            console.log(err);
            window.location.href = '/';
          }
        })
      }
    render() {
        return (
              
            <div className="Navbar">
            <Navbar color="light" fixed="top" expand="sm" >
            <NavbarBrand style={{color: '#58b9c4', fontSize: '30px' }}>Welcome {this.state.userName}</NavbarBrand>
                <NavbarToggler onClick={this.toggle}  />
                    <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                          <NavLink href="/homepage"><Button outline color="info">Forum</Button></NavLink>
                          <NavLink href="/add"><Button outline color="info">Create Recipe</Button></NavLink>
                          <NavLink href="/logout"><Button color="info">Logout</Button></NavLink>
                      </Nav>
                    </Collapse>
            </Navbar>
      </div>
                
        );
    }
    
}





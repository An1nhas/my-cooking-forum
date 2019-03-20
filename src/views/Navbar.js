import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, NavItem} from 'reactstrap';
import xhr from 'xhr';
import { FaBars } from 'react-icons/fa';


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
                <NavbarToggler onClick={this.toggle}><FaBars style={{color: '#58b9c4', fontSize: '30px' }}/></NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                      <NavItem className="ml-auto">
                          <NavLink href="/homepage"><Button outline color="info">Forum</Button></NavLink>
                      </NavItem>
                      <NavItem className="ml-auto">
                          <NavLink href="/add"><Button outline color="info">Create Recipe</Button></NavLink>
                      </NavItem>
                      <NavItem className="ml-auto">
                          <NavLink href="/logout"><Button color="info">Logout</Button></NavLink>
                      </NavItem>
                      </Nav>
                    </Collapse>
            </Navbar>
      </div>
                
        );
    }
    
}





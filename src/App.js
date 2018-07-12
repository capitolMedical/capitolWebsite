import React, { Component } from 'react';

import './App.css';
import logo from './ccmc-logo.png';
import Books from './components/books.component';
import {BrowserRouter , Route , Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
     <BrowserRouter>
        <div>
          <div style={{
            width: '100%',
            borderBottom: '0.05em solid #f0f0f0',
            boxShadow: '0.05em 0.05em 2px rgba(0,0,0,0.2)',
            height: '70px',
            position:'fixed',
            display:'flex',
            zIndex: 99,
            alignItems: 'center',
            backgroundColor : '#fff',
          }}>
            <div style={{
              flex: 2,
              display:'flex',
              alignItems: 'center'
            }}>
              <img src={logo} alt="" style={{
                height: '60px',
                margin:'0 10px'
              }}/>
              <h3 style={{
                color : '#2e3786'
              }}>
                CAPITOL MEDICAL CENTER COLLEGES
              </h3>
            </div>
        
            <div style={{
              margin: '0 20px'
            }}>
            
              <div className='menu-button'>
                <Link to="/">Books</Link>
              </div>
              <div className='menu-button'>
              <Link to="/borrowers">Borrowers</Link>
              </div>
              <div className='menu-button'>
              <Link to="/borrowers">REPORTS</Link>
              </div>
            </div>
          </div>
          <div style={{height: '70px'}}></div>
        
            <Route path="/" exact render={()=> (<Books/>)}/>
          
        </div>
     </BrowserRouter>
    );
  }
}

export default App;

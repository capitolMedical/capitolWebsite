import React, { Component } from 'react'
import axios from 'axios';
import {url} from '../environment';
export default class AddBook extends Component {
  closeAddBook = () => {
      this.props.onCloseAddBook()
  }
  state ={
      cellNumber : '',
      accessionNumber : '',
      barcodeNumber : '',
      bookTitle: '',
      author : '',
      publisher : '',
      location: '',
      copies : 0
  }
  saveBook = () => {
      axios.post(`${url}/book` , this.state)
      .then(payload => {
          if(payload.data.success){
              window.location.reload()
          }else{
              console.log(payload)
          }
      })
  }
  render() {
    const formGroup = {}
    const formLabel = {
        fontSize : '0.7em',
        margin: '10px 0',
        textTransform : 'capitalize',
        color : '#9a9a9a'
    }
    const formInput = {
        width: 'calc(100% - 20px)',
        padding: '10px'
    }
    return (
      <div 
      style={{
          position:'fixed',
          left: 0,
          top: 0,
          zIndex: 999,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display:'flex',
          width: '100vw',
          height: '100vh'
      }}>
        <div 
        style={{
            flex: 2,
            cursor: 'pointer'
        }}
        onClick={this.closeAddBook}
        >
        </div>
        <div style={{
            flex: 1,
            backgroundColor : '#fff',
            padding: '10px',
            overflowY: 'auto'
        }}>
            <h2 style={{color : '#0096cc'}}>ADD BOOK</h2>
            <div style={formGroup}>
                <div style={formLabel}>
                    Cell Number
                </div>
                <div>
                    <input type="text" style={formInput} 
                           onChange={(e)=> this.setState({cellNumber : e.target.value})}/>
                </div>
            </div>
            <div style={formGroup}>
                <div style={formLabel}>
                    Accession Number
                </div>
                <div>
                    <input type="text" style={formInput}
                            onChange={(e)=> this.setState({accessionNumber : e.target.value})}/>
                </div>
            </div>
            <div style={formGroup}>
                <div style={formLabel}>
                    Barcode Number
                </div>
                <div>
                     <input type="text" style={formInput}
                            onChange={(e)=> this.setState({barcodeNumber : e.target.value})}/>
                </div>
            </div>
            <div style={formGroup}>
                <div style={formLabel}>
                    Book Title
                </div>
                <div>
                    <input type="text" style={formInput}
                            onChange={(e)=> this.setState({bookTitle : e.target.value})}/>
                </div>
            </div>
            <div style={formGroup}>
                <div style={formLabel}>
                    Author
                </div>
                <div>
                    <input type="text" style={formInput}
                            onChange={(e)=> this.setState({author : e.target.value})}/>
                </div>
            </div>
            <div style={formGroup}>
                <div style={formLabel}>
                    Publisher
                </div>
                <div>
                   <input type="text" style={formInput}
                            onChange={(e)=> this.setState({publisher : e.target.value})}/>
                </div>
            </div>
            <div style={formGroup}>
                <div style={formLabel}>
                    Location
                </div>
                <div>
                  <input type="text" style={formInput}
                            onChange={(e)=> this.setState({location : e.target.value})}/>
                </div>
            </div>
            <div style={formGroup}>
                <div style={formLabel}>
                    No. of Copies
                </div>
                <div>
                    <input type="number" style={formInput}
                            onChange={(e)=> this.setState({copies : e.target.value})}/>
                </div>
            </div>
            <div style={formGroup}>
                <div style={{
                    width: 'calc(100% - 36px)',
                    margin: '20px 0',
                    padding: '20px',
                    backgroundColor : '#0096cc',
                    color :'#fff',
                    textAlign: 'center',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}
                onClick={this.saveBook}
                >
                    Save
                </div>
            </div>
        </div>
      </div>
    )
  }
}

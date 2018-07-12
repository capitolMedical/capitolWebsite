import React, { Component } from 'react'
import AddBook from './addBook.component'
import axios from 'axios'
import {url} from '../environment';

export default class Books extends Component {
  state = {
      addBook :false,
      loaded: false,
      books : [],
      selectedBooks : [],
      error: {
        hasError: false,
        message: ''
      },
      wantsToDelete : false
  }
  componentWillMount(){
    axios.get(`${url}/books`)
    .then(res => {
    
      this.setState({books : res.data.Books, loaded : true})
    })
  }
  handleCheckboxChange = (bookID , cbValue) => {

    const sBooks = this.state.selectedBooks;
    if(cbValue){
      sBooks.push(bookID)
    } else {
      sBooks.splice(sBooks.indexOf(bookID , 1))
    }
    this.setState({selectedBooks : sBooks})
    
  }
  openDeleteModal = () => {
    if(this.state.selectedBooks.length <= 0){
      this.setState({
        error : {
          hasError : true,
          message : 'you do not have any selected books to be deleted'
        }
      })

      setTimeout(()=> {
        this.setState({
          error : {
            hasError : false,
            messgage : ''
          }
        })
      }, 1500)
    } else {
      this.setState({
        wantsToDelete : true
      })
    }
  }
  deleteBooks = () => {
    axios.post(`${url}/books/delete`, this.state.selectedBooks)
    .then(res => {
      if(res.data.success) {
        window.location.reload()
      }else {
        console.log(res.data.err)
      }
    })
  }
  render() {
    return (
        <div style={{
            display:'flex',
            flexDirection : 'column'
          }}>
           <div className='page-header'>
             <div className='page-header-title'>
                BOOKS
             </div>
             <div className="page-header-search">
                <input type="text" placeholder="search books here"/>
              
             </div>
             <div className="page-header-button">
                <i className="material-icons">
                  search
                </i>
             </div>
             <div className="page-header-button" onClick={()=> this.setState({addBook: true})}>
                 <i className="material-icons">
                 add
                </i>
             </div>
             <div className="page-header-button" onClick={this.openDeleteModal}>
                <i className="material-icons">
                  delete
                </i>
             </div>
           </div>
           <div style={{
             height: 'calc(100vh - 151px)',
             backgroundColor: '#fafafa'
           }}>
            {
               this.state.loaded ?
               <table>
               <thead>
                    <tr>
                      <th style={{width: '40px'}}></th>
                      <th style={{width: '120px'}}>Cell Number</th>
                      <th style={{width: '120px'}}>Accession Number</th>
                      <th style={{width: '120px'}}>Barcode Number</th>
                      <th style={{width: '400px'}}>Book Title</th>
                      <th>Author</th>
                      <th>Publisher</th>
                      <th>Location</th>
                      <th style={{width: '80px'}}>Number of Copies</th>
                    </tr>
               </thead>
               <tbody>
                 {
                   this.state.loaded &&
                   this.state.books.map(book => {
                    return(
                       <tr key={book._id}>
                         <td><input type="checkbox" onChange={(e)=> this.handleCheckboxChange(book._id , e.target.checked)}/></td>
                         <td>{book.cellNumber}</td>
                         <td>{book.accessionNumber}</td>
                         <td>{book.barcodeNumber}</td>
                         <td>{book.bookTitle}</td>
                         <td>{book.author}</td>
                         <td>{book.publisher}</td>
                         <td>{book.location}</td>
                         <td>{book.copies}</td>

                       </tr>
                    )
                  })
                 }
               </tbody>
             </table> :
             'loading'
            }
           </div>
           {
               this.state.addBook &&
               <AddBook onCloseAddBook={()=> this.setState({addBook : false})}/>
           }
           {
             this.state.error.hasError &&
             <div style={{
               position:'fixed',
               zIndex: 10,
               bottom: '50px',
               padding: '20px',
               left: 'calc(50% - 200px)',
               backgroundColor : '#333',
               color : '#fff',
               borderRadius: '50px'
             }}>
                {this.state.error.message}
             </div>
           }
           {
             this.state.wantsToDelete &&
             <div className='transparentContainer'>
              <div className="modal-container-delete">
                are you sure you want to delete {this.state.selectedBooks.length} book{this.state.selectedBooks.length > 1 ? 's?' : '?'}
                <br/>
                <br/>
                <br/>
                <div style={{
                  display:'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  height: '50px'
                }}>
                <div className='page-header-button' onClick={this.deleteBooks}> 
                  delete
                </div>
                <div className='page-header-button' onClick={()=> this.setState({wantsToDelete : false})}>
                  cancel
                </div>
                </div>
              </div>
             </div>
           }
        </div>
    )
  }
}

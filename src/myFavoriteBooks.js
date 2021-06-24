import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import BestBooks from './BestBooks';
import BookFormModal from './BookFormModal';
import UpdateBookForm from './updateBookForm';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class MyFavoriteBooks extends React.Component {
  constructor (props){
    super (props);
    this.state= {
      show:false,
      showForm:false,
      server: process.env.REACT_APP_SERVER_URL,
      Books: [],
      BookIdx: 0,
      Bname:'',
      Bdesc:'',
      Bstat:'',
    }

  }
   
  componentDidMount() {
    this.getBooks();
  }

  getBooks = async ()=>{
      console.log(this.props.useremail);
      try {
        const  pObj ={
            useremail: this.props.useremail
        }
        const books= await axios.get(`${this.state.server}/books`,{params:pObj});
        console.log(books.data);
        this.setState({
            Books: books.data,
            showBooksComponent: true,
        });
      }catch (error) {
        console.log(error);
      }
  };

  handleShow=()=>{
    this.setState({
        show:true
    })
    
 }
 handleClose=()=>{
      this.setState({
          show:false
      })
  }
  handleFormShow=(BookIdx)=>{
    this.setState({
        showForm:true,
        BookIdx:BookIdx,
        Bname:this.state.Books[BookIdx].bookName,
        Bdesc:this.state.Books[BookIdx].description,
        Bstat:this.state.Books[BookIdx].status,
    })
    
 }
 handleFormClose=()=>{
      this.setState({
          showForm:false
      })
  }
  

  addBook =async (event) =>{
    event.preventDefault();

   const bookForm ={
      bookname:event.target.bookName.value,
      bookDescription:event.target.bookDescription.value,
      bookStatus:event.target.bookStatus.value,
      useremail:this.props.useremail,
    }
    try {
    console.log('test from add.');
    // console.log(bookForm.useremail); 
    const newbooks= await axios.post(`${this.state.server}/addbooks`,bookForm);
    console.log(newbooks);
    this.setState({
      Books:newbooks.data,
    })
    }catch (error) {
      console.log(error);
    }
    
   }

   deletebook =async (idx) =>{
     const userE={
      useremail:this.props.useremail,
     }
     try {
      let dbook =await axios.delete(`${this.state.server}/deletebooks/${idx}`,{params:userE});
      this.setState({
        Books:dbook.data,
      })
    // console.log('hi from delete'+idx);
     }catch (error) {
      console.log(error);
    }
   }
   updateBook =async (event) =>{
    event.preventDefault();
     console.log('hello from update');
    const bData ={
      bookname:event.target.bookName.value,
      bookDescription:event.target.bookDescription.value,
      bookStatus:event.target.bookStatus.value,
      useremail:this.props.useremail,
    }
    try {
      let ubook= await axios.put(`${this.state.server}/updatebooks/${this.state.BookIdx}`,bData);
      this.setState({
        Books:ubook.data,
      })

    }catch(error){
      console.log(error);
    }
     
   }
  
   render() {
    return(
      
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <Button variant="primary" onClick={this.handleShow}>
        Add a Book
      </Button>
        <BookFormModal 
        handleShow={this.handleShow} 
        handleClose={this.handleClose}
        addBook={this.addBook}
        show={this.state.show}
        
        />
       <br/>
        <BestBooks useremail={this.props.useremail} booksarr={this.state.Books} deletebook={this.deletebook} handleFormShow={this.handleFormShow}/>
        <UpdateBookForm 
         show={this.state.showForm}
         handleClose={this.handleFormClose}
         updateBook={this.updateBook}
         Bname={this.state.Bname}
         Bdesc={this.state.Bdesc}
         Bstat={this.state.Bstat}
        />
      </Jumbotron>
    )
    }
}

export default MyFavoriteBooks;

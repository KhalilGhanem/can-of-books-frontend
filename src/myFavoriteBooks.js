import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import BestBooks from './BestBooks';
import { Modal,Form,Button } from 'react-bootstrap';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  constructor (props){
    super (props);
    this.state= {
      show:false,
      server: process.env.REACT_APP_SERVER_URL,
      Books: [],
    }

  }
   
  
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

  addBook =async (event) =>{
    event.preventDefault();



  const bookForm ={
      bookname:event.target.bookName.value,
      bookDescription:event.target.bookDescription.value,
      bookStatus:event.target.bookStatus.value,
      useremail:this.props.useremail,
    }

    console.log(bookForm.useremail); 
    const newbooks= await axios.post(`${this.state.server}/addbooks`,bookForm);
    this.setState({
      Books:newbooks.data,
    })
    
    
  }
  
  render() {
    return(
      
      <Jumbotron>
        <h1>My Favorite Books</h1>
        
      <Button variant="primary" onClick={this.handleShow}>
        Add a Book
      </Button>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="my-form" onSubmit={this.addBook}>
          <Form.Group className="mb-3" >
            <Form.Label>Book name</Form.Label>
            <Form.Control type="text" name="bookName" required />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Book Description</Form.Label>
            <Form.Control type="text" name="bookDescription"/>
          </Form.Group>
          <Form.Group className="mb-3" >
          <Form.Label>Status</Form.Label><br/>
          <Form.Control as="select"  className='bookStatus' required  name="bookStatus">
            <option value=''> </option>
            <option value='favorite'>favorite</option>
            <option value='Top rated'>Top rated</option>
             <option value='Life Changing'>Life Changing</option>
             </Form.Control>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button type="submit" form="my-form" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

       <br/>
        <BestBooks useremail={this.props.useremail} booksarr={this.state.Books}/>
      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;

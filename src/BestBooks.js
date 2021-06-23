import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card,Button,Container ,Row } from 'react-bootstrap';
import './BestBooks.css';
import UpdateBookForm from './updateBookForm'

class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          show:false,
          showBooksComponent: true,
          server: process.env.REACT_APP_SERVER_URL,
          updateBook:this.props.updateBook,
        }
      }
      
      
  handleShow=()=>{
    console.log(this.state.updateBook);
    this.setState({
        show:true
    })
    
 }
 handleClose=()=>{
      this.setState({
          show:false
      })
  }
      

 
    render(){
        return(
            <>
            {this.state.showBooksComponent && <Container>

              <Row xs={2} md={4} lg={6}>
                    { this.props.booksarr.map((item,idx) =>{
                    return (
                      <Card style={{ width: '18rem' }} key={idx} >
                      <Card.Body>
                        <Card.Title>{item.bookName}</Card.Title>
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                        <Card.Footer>
                        <small className="text-muted">{item.status}</small>
                        </Card.Footer><br/>
                        <Button variant="primary" onClick={()=>this.props.deletebook(idx)}>Delete</Button>
                        <Button variant="primary" onClick={this.handleShow} >Update</Button>
                        <UpdateBookForm 
                          show={this.state.show}
                          handleClose={this.handleClose}
                          updateBook={this.state.updateBook}
                          cardidx={idx}
                          />
                      </Card.Body>
                     </Card>
                       
                    );
                })}
              </Row>
              </Container>
            }
           
            </>
        );
    } 
}

export default BestBooks;

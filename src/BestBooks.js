import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card,Button,Container ,Row } from 'react-bootstrap';
import './BestBooks.css';


class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showBooksComponent: true,
          server: process.env.REACT_APP_SERVER_URL,
          updateBook:this.props.updateBook,
        }
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
                        <Button variant="primary" onClick={()=>this.props.handleFormShow(idx)} >Update</Button>
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

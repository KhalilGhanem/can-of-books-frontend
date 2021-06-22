import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card,Button } from 'react-bootstrap';
import './BestBooks.css';

class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          Books:[],
        //   useremail: '',
          showBooksComponent: true,
          server: process.env.REACT_APP_SERVER_URL,
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
            this.setState({
                Books: books.data,
                showBooksComponent: true,
            });
          }catch (error) {
            console.log(error);
          }
      };

 
    render(){
        return(
            <>
            {this.state.showBooksComponent && <div className="bookdiv">
               
                    { this.state.Books.map((item,idx) =>{
                    return (
                      <Card style={{ width: '18rem' }} key={idx} >
                      <Card.Body>
                        <Card.Title>{item.bookName}</Card.Title>
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                        <Card.Text>
                        {item.status}
                        </Card.Text>
                        <Button variant="primary">Delete</Button>
                      </Card.Body>
                     </Card>
                       
                    );
                })}
              
                </div>
            }
            </>
        );
    } 
}

export default BestBooks;

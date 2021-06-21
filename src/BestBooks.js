import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          Books: [],
        //   useremail: '',
          showBooksComponent: false,
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

    //    function componentDidMount (){ 
    //     getBooks();
    //    };
    //    componentDidMount();
    
    render(){
        return(
            <>
            {this.state.showBooksComponent && 
                <Carousel>
                    { this.state.Books.map((item,idx) =>{
                    return (
                        <Carousel.Item key={idx}>
                        <img
                        className="d-block w-100"
                        src={item.bookUrl}
                        alt={item.bookName}
                        />
                        <Carousel.Caption>
                        <h3>{item.bookName}</h3>
                        <p>{item.description}</p>
                        <p>{item.status}</p>
                        </Carousel.Caption>
                         </Carousel.Item>
                        // <div key={idx}>
                        //     <p>{item.bookName}</p>
                        //     <p>{item.description}</p>
                        //     <p>{item.status}</p>
                        // </div>
                    );
                })}
                </Carousel>    
               
            }
            </>
        );
    } 
}

export default BestBooks;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Form,Button } from 'react-bootstrap';

class BookFormModal extends React.Component {
constructor (props) {
 super(props);
    this.state={

    }
}

render(){
    return (
        <>
       

      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="my-form" onSubmit={this.props.addBook}>
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
            <option value='favorite'>favorite</option>
            <option value='Top rated'>Top rated</option>
             <option value='Life Changing'>Life Changing</option>
             </Form.Control>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button type="submit" form="my-form" onClick={this.props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

}


export default BookFormModal;
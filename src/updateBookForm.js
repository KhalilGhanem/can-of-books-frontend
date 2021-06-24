import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Form,Button } from 'react-bootstrap';



class UpdateBookForm extends React.Component {
    
    render(){
        return(
            <> 
             <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="update-form" onSubmit={this.props.updateBook}>
          <Form.Group className="mb-3" >
            <Form.Label>Book name</Form.Label>
            <Form.Control type="text" name="bookName" required defaultValue={this.props.Bname}/>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Book Description</Form.Label>
            <Form.Control type="text" name="bookDescription" defaultValue={this.props.Bdesc}/>
          </Form.Group>
          <Form.Group className="mb-3" >
          <Form.Label>Status</Form.Label><br/>
          <Form.Control as="select"  className='bookStatus' defaultValue={this.props.Bstat}  name="bookStatus">
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
          <Button type="submit" form="update-form" onClick={this.props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

            </>
        )
    }
}

export default UpdateBookForm;
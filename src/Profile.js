import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    const { user,isAuthenticated } = this.props.auth0;
    return (
        <>
        {isAuthenticated && 
        <div>
            <p>Hello {user.name}</p>
            <p>Email : {user.email}</p>
            <img src={user.picture} />            
        </div>
        }
        </>
    )
  }
}

export default withAuth0(Profile);

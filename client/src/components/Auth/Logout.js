import React, { Component } from 'react';

class Logout extends Component {

  componentWillMount(){
    localStorage.removeItem('token');
    this.props.history.push("/login");
  }

  render() {
    return (
      <div>
        logout page
      </div>
    );
  }
}

export default Logout;

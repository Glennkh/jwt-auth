import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <h1>Navbar</h1>
        <ul>
          <li><Link to="/">Issues</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    );
  }
}

export default Navbar;

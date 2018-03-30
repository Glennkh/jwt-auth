import React, { Component } from 'react';
import axios from 'axios';

class Issues extends Component {

  constructor(){
    super();
    this.state = {
      issues: []
    }
  }

  componentWillMount(){
    this.getIssues();
  }

  getIssues(){
    axios.get('http://localhost:5000/users/')
      .then(res => {
        this.setState({issues: res.data}, () =>{
          // console.log(this.state)
        })
      })
      .catch(err => console.log(err));
  } 

  render() {
    const issueItems = this.state.issues;
    return (
      <div>
        <h1>Issues</h1>
        {issueItems.map((issue, i) => {
          return (
            <li>{issue.email}</li>
          )
        })}
      </div>
    );
  }
}

export default Issues;
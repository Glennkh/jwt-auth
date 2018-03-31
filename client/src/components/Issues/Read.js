import React, { Component } from 'react';
import axios from 'axios';

class ReadIssue extends Component {

  constructor(){
    super();
    this.state = {
      issue: {}
    }
  }

  componentWillMount(){
    this.getIssues();
  }

  getIssues(){
    axios.get('/api/issues/'+this.props.match.params.id)
      .then(res => {
        this.setState({issue: res.data}, () =>{
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const issue = this.state.issue;
    return (
      <div>
        <h1>Issues</h1>
          <p>Name: {issue.name}</p>
          <p>Description: {issue.description}</p>
          <p>Building: {issue.building}</p>
          <p>Floor: {issue.floor}</p>
          <p>Room: {issue.room}</p>
          <p>Created At: {issue.createdAt}</p>
      </div>
    );
  }
}

export default ReadIssue;
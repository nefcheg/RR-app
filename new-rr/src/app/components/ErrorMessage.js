import React, { Component } from 'react';

export default class ErrorMessage extends Component{
  render() {
    return (
      <div className="container">
        <div className="alert alert-danger">Error occurred =(</div>
      </div>
    );
  }
};
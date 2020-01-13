import React, { Component } from "react";
import axios from "../Query From API/axios";

class Users extends Component {
  state = {};

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    let url = "http://localhost:3000/api/users";
    axios
      .get({
        method: "get",
        url: url
        // responseType: "json"
      })
      .then(response => {
        console.log(response);
      });
  };

  render() {
    return <h1>Users</h1>;
  }
}

export default Users;

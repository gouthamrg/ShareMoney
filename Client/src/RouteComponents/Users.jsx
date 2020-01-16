import React, { Component } from "react";
import axios from "../Services/httpService";
import config from "./../config.json";
import http from "./../Services/httpService";

class Users extends Component {
  state = {};

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    let url = `${config.apiEnpoint}/api/users`;
    const response = await http.get({
      method: "get",
      url: url
    });
    console.log(response);
  };

  render() {
    return <h1>Users</h1>;
  }
}

export default Users;

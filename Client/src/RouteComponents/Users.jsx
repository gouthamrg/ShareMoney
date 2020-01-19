import React, { Component } from "react";
import config from "./../config";
import http from "./../Services/httpService";

class Users extends Component {
  state = {};

  async componentDidMount() {
    console.log("didmount");
    await this.getUsers();
  }

  getUsers = async () => {
    let url = `${config.apiEndpoint}/api/users`;
    const { data: users } = await http.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
    this.setState({ users: users });
  };

  render() {
    const { users } = this.state;
    if (!users) return <h4>Loading</h4>;

    // ToDO: UI
    return <h1>{users.length}</h1>;
  }
}

export default Users;

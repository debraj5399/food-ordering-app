import React from "react";
import { USER_API } from "../utils/constants";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resInfo: {
        name: "",
        location: "",
      },
    };
  }

  async componentDidMount() {
    const response = await fetch(USER_API);
    const data = await response.json();
    console.log(data);
    this.setState({
      resInfo: data,
    });
  }

  render() {
    const { name, location, company, avatar_url } = this.state.resInfo;
    const { count } = this.state;
    return (
      <div>
        <img className="user-img" src={avatar_url}></img>
        <h3>Name: {name}</h3>
        <h3>Location: {location}</h3>
        <h3>Company: {company}</h3>
      </div>
    );
  }
}

export default User;

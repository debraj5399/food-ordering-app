import React from "react";
import { USER_API } from "../utils/constants";
import Shimmer from "./Shimmer";
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
    this.setState({
      resInfo: data,
    });
  }

  render() {
    if (this.state.resInfo.name === "") return <Shimmer />;
    const { name, location, company, avatar_url } = this.state.resInfo;
    const { count } = this.state;
    return (
      <div className="about-user-main">
        <div className="about-user">
          <img className="user-img" src={avatar_url}></img>
          <div className="user-info">
            <p>Name: {name}</p>
            <p>Location: {location}</p>
            <p>Company: {company}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default User;

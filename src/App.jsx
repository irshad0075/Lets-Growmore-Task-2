import React, { Component } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import CardList from "./components/CardList";
import Scroll from "./components/Scroll";
import Navbar from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

import Loader from "./components/loader";

class App extends Component {
  constructor() {
    super();
    //defining the states
    this.state = {
      robots: [],
      searchfeild: "",
      isButtonClicked: false,
    };
  }

  //function when the button is clicked.
  //it fetches the api
  //and stores in robots
  onButtonSubmit = async () => {
    // Change the state to indicate that the button is clicked
    this.setState({ isButtonClicked: true });

    try {
      // Make the API request using Axios
      const response = await axios.get("https://reqres.in/api/users?page=2");
      // Extract the data from the response
      const users = response.data.data;
      // Update the state with the fetched data
      this.setState({ robots: users });
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching data:", error);
    }
  };

  //function used to change the searchfield
  onSearchChange = (event) => {
    this.setState({ searchfeild: event.target.value });
  };

  render() {
    //used to filter the robots bt their first name
    const filteredRobots = this.state.robots.filter((robots) => {
      return robots.first_name
        .toLowerCase()
        .includes(this.state.searchfeild.toLowerCase());
    });

    //at the starting
    //when the user has not clicked the button
    //and the api is not fetched
    if (
      this.state.robots.length === 0 &&
      this.state.isButtonClicked === false
    ) {
      return (
        <>
          <Navbar onButtonSubmit={this.onButtonSubmit} />
          <h1 className="tc">Please click on get users to get all details</h1>
        </>
      );
    }

    //when the button is clicked and the api is being called
    //but no data is fetched
    else if (this.state.robots.length === 0) {
      return (
        <>
          <Navbar onButtonSubmit={this.onButtonSubmit} />
          <h1 className="tc">Loading...</h1>
          <Loader className="loader"></Loader>
        </>
      );
    }

    //when the button is clicked and the api has fetched data
    else {
      return (
        <>
          <Navbar onButtonSubmit={this.onButtonSubmit} />
          <div className="tc">
            <h1>Client Info</h1>
            <SearchBox searchChange={this.onSearchChange} />
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>
            <Footer>
              <p
                className="copy"
                style={{
                  padding: "5px 0px",
                  height: "70px",
                  color: "white",
                  background: "black",
                }}
              >
                by &copy; Irshad
              </p>
            </Footer>
          </div>
        </>
      );
    }
  }
}

export default App;

import React, { Component } from "react";
//import { DrizzleProvider } from "drizzle-react";
//import { LoadingContainer } from "drizzle-react-components";

import "./App.css";

//import drizzleOptions from "./drizzleOptions";
//import MyContainer from "./MyContainer";
import MyComponent from "./MyComponent";

class App extends Component {
  render() {
    return (
      // <DrizzleProvider options={drizzleOptions}>
       // <LoadingContainer>
          //<MyContainer />
        //</LoadingContainer>
      //</DrizzleProvider>
      <MyComponent/>
    );
  }
}

export default App;

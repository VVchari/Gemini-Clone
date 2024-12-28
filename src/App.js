import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Components/Main";
import { Context } from "./context/context";

class App extends Component {
  state = {
    prevPrompts: [],
    presentPrompt: "",
    resultData: "",
  };

  addPrompts = ({ id,Prompt, resultData }) => {
    this.setState((prevState) => ({
      prevPrompts: [{id, Prompt, resultData }, ...prevState.prevPrompts],
      presentPrompt: Prompt,
      resultData: resultData,
    }));
  };

  render() {
    const { prevPrompts, resultData,presentPrompt } = this.state;

    return (
      <Context.Provider
        value={{
          prevPrompts,
          presentPrompt,
          resultData,
          addSavedPrompts: this.addPrompts,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    );
  }
}

export default App;
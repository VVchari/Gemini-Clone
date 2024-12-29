import React, { Component } from "react";
import Sidebar from "../Sidebar";
import "./index.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import run from "../../config/gemini";
import { v4 as uuidv4 } from 'uuid';

class Main extends Component {
  state = { Prompt: "", isPrompt: false, responseText: "", displayPrompt: "", isLoading: false };

  // Handle input change
  setPrompt = (event) => {
    this.setState({ Prompt: event.target.value });
  };

  render() {
    const { Prompt, isPrompt, responseText, displayPrompt, isLoading } = this.state;

    return (
      <Context.Consumer>
        {({ addSavedPrompts, prevPrompts }) => {
           const predefinedPrompts = (x) => {
            this.setState({ Prompt: x });
          };

          const onClickPrompt = (id) => {
            const foundPrompt = prevPrompts.find(x => x.id === id); // Find the prompt by id
            
            if (foundPrompt) {
              this.setState({
                displayPrompt: foundPrompt.Prompt, // Set the Prompt value from the found object
                responseText: foundPrompt.resultData,
                isPrompt: true // Set the responseText value from the found object
              });
            } else {
              this.setState({ isPrompt: false });
            }
          };

          const newChat = () => {
            this.setState({ isPrompt: false, displayPrompt: "", responseText: "" });
          };

          const sendPrompt = async () => {
            // Check if Prompt is empty or only contains spaces
            if (!Prompt.trim()) {
              console.error("Prompt is empty. Please provide a valid input.");
              return; // Stop execution if Prompt is empty
            }

            try {
              console.log("Prompt:", Prompt); // Debug log to check the value of Prompt
              this.setState({ isPrompt: true, isLoading: true, displayPrompt: Prompt, Prompt: "" });

              let response = await run(Prompt); // This response is text
              let responseArr = response.split("**");
              let newResponse = ''; // Initialize as an empty string
              for (let i = 0; i < responseArr.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                  newResponse += responseArr[i]; // Append to the string
                } else {
                  newResponse += "<b>" + responseArr[i] + "</b>";
                }
              }
              let finalResponse = newResponse.split("*").join("<br/>"); // Final transformation

              console.log("Response from run:", finalResponse);

              // Save the prompt and its result
              const id = uuidv4();
              addSavedPrompts({ id, Prompt, resultData: finalResponse });

              // Update UI to show the response
              this.setState({ responseText: finalResponse, isLoading: false });
            } catch (error) {
              console.error("Error:", error.message);
              this.setState({ isPrompt: false, responseText: "" });
            }
          };

          return (
            <div className="home">
              <Sidebar onClickPrompt={onClickPrompt} newChat={newChat} />
              <div className="main">
                <div className="head">
                  <p>Gemini</p>
                  <img src={assets.user_icon} alt="logo" />
                </div>
                {isPrompt ? (
                  <div className="body-prompt">
                    <div className="prompt">
                      <img src={assets.user_icon} alt="user-icon" />
                      <p>{displayPrompt}</p>
                    </div>
                    {/* Display the responseText here */}
                    <div className="result">
                      <img src={assets.gemini_icon} />
                      {isLoading ? (
                        <div className="loading">
                          <hr />
                          <hr />
                          <hr />
                        </div>
                      ) : (
                        <p dangerouslySetInnerHTML={{ __html: responseText }}></p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="body">
                    <div className="body-titles">
                      <p>
                        <span>Hello, Dev.</span>
                      </p>
                      <p>How can I help you today?</p>
                    </div>
                    <div className="body-cont">
                      <div className="cont" onClick={() => predefinedPrompts("Suggest beautiful places to see on an upcoming road trip")}>
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="compass-icon" />
                      </div>
                      <div className="cont" onClick={() => predefinedPrompts("Briefly summarize this concept: urban planning")}>
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt="bulb-icon" />
                      </div>
                      <div className="cont" onClick={() => predefinedPrompts("Brainstorm team bonding activities for our work retreat")}>
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="message-icon" />
                      </div>
                      <div className="cont" onClick={() => predefinedPrompts("Improve the readability of the following code")}>
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="code-icon" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="input-cont">
                  <div className="search-box">
                    <input
                      placeholder="Enter a prompt here"
                      type="text"
                      onChange={this.setPrompt}
                      value={Prompt}
                    />
                    <div className="input-images">
                      <img src={assets.gallery_icon} alt="gallery-icon" />
                      <img src={assets.mic_icon} alt="mic-icon" />
                      {Prompt.length !== 0 ? (
                        <img src={assets.send_icon} alt="send-icon" onClick={sendPrompt} />
                      ) : null}
                    </div>
                  </div>
                  <div className="bottom-info">
                    <p>
                      Gemini may display inaccurate info, including about people, so double-check its
                      responses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Main;

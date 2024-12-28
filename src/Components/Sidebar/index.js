import React, { Component } from "react";
import { Context } from "../../context/context";
import { assets } from "../../assets/assets";
import "./index.css";

class Sidebar extends Component {
  state = { extend: false };

  // Function to toggle the sidebar menu
  menuBar = () => {
    this.setState((prevState) => ({ extend: !prevState.extend }));
  };

  // Function to handle click on a recent prompt
  displayRecentPrompt = (id) => {
    const { onClickPrompt } = this.props;
    onClickPrompt(id); // Calling onClickPrompt passed from parent
  };
  chat=()=>{
    const {newChat}=this.props
    newChat()
  }

  render() {
    const { extend } = this.state;
    return (
      <Context.Consumer>
        {({ prevPrompts }) => {
          const prompts = Array.isArray(prevPrompts) ? prevPrompts : [];
          console.log("Prompts in Sidebar:", prompts); // Debug log

          return (
            <div className="sidebar">
              <div className="top">
                <img
                  onClick={this.menuBar}
                  className="menu"
                  src={assets.menu_icon}
                  alt="menu"
                />
                <div className="new-chat" onClick={this.chat}>
                  <img src={assets.plus_icon} alt="plus" />
                  {extend ? <p>New Chat</p> : null}
                </div>
                {extend ? (
                  <div className="recent">
                    <p className="recent-title">Recent</p>
                    <div className="recent-cont">
                      {prompts.length !== 0 ? (
                        prompts.map((x) => (
                          <div
                            key={x.id}
                            className="recent-entry"
                            onClick={() => this.displayRecentPrompt(x.id)} // Pass the id correctly
                          >
                            <img src={assets.message_icon} alt="message-icon" />
                            <p>{x.Prompt}</p>
                          </div>
                        ))
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="bottom">
                <div className="help">
                  <img src={assets.question_icon} alt="question-icon" />
                  {extend ? <p>Help</p> : null}
                </div>
                <div className="activity">
                  <img src={assets.history_icon} alt="history-icon" />
                  {extend ? <p>Activity</p> : null}
                </div>
                <div className="settings">
                  <img src={assets.setting_icon} alt="settings-icon" />
                  {extend ? <p>Settings</p> : null}
                </div>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Sidebar;

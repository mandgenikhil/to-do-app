import React, { Component } from "react";
import "./index.scss";
import ToDoItem from "./to-do-item";
import APIURLS from "../../api-urls/to-do-api";

export class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
      todo_id: "",
      text_data: "",
      text_edit_data: "",    
      responseList: [],
    };
    this.handleModalDisplay = this.handleModalDisplay.bind(this);
    this.onClickFunction = this.onClickFunction.bind(this);
    this.handleModalDisplay = this.handleModalDisplay.bind(this);
  }

  handleModalDisplay(todo_id, todo_data) {
    this.setState((prev) => {
      return {
        toggleModal: !prev.toggleModal,
        todo_id: todo_id,
        text_edit_data: todo_data,
      };
    });
  }

  componentDidMount() {
    if (localStorage.getItem("key") === null) {
      this.props.history.push("/");
      localStorage.clear();
    } else {
      fetch(APIURLS.V1.gettodos, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("key"),
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            key: json["key"],
          });
          if (json["response"] !== undefined) {
            this.setState({
              responseList: json["response"],
            });
          } else {
            this.setState({
              isError: true,
              errorMsg: "Please enter valid credentials",
            });
          }
        });
    }
  }

  clearAll = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      text_data: event.target.value,
    });
  };

  onClearClickAction() {
    this.setState({
      text_data: " ",
    });
  }

  editToDo(todo_id) {
    var text_edit_data = document.getElementById("edit").value;

    if (text_edit_data !== null && text_edit_data.trim() !== "") {
      fetch(APIURLS.V1.edittodo, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("key"),
        },
        body: JSON.stringify({
          todo_id: todo_id,
          todo_data: text_edit_data,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json["response"] !== undefined) {
            fetch(APIURLS.V1.gettodos, {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + localStorage.getItem("key"),
              },
            })
              .then((response) => response.json())
              .then((json) => {               
                if (json["response"] !== undefined) {
                  this.setState({
                    responseList: json["response"],
                  });
                } else {
                  this.setState({
                    isError: true,
                    errorMsg: "Please enter valid credentials",
                  });
                }
              });
          }
        });

      this.setState((prev) => {
        return { toggleModal: !prev.toggleModal, todo_id: "" };
      });
    }
  }
  onEnterClickAction() {
    if (this.state.text_data !== "")
    {
      fetch(APIURLS.V1.savetodos, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("key"),
        },
        body: JSON.stringify({
          todo_title: "Test To Do",
          todo_data: this.state.text_data,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json["response"] !== undefined) {
            fetch(APIURLS.V1.gettodos, {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + localStorage.getItem("key"),
              },
            })
              .then((response) => response.json())
              .then((json) => {             
                if (json["response"] !== undefined) {
                  this.setState({
                    responseList: json["response"],
                  });
                } else {
                  this.setState({
                    isError: true,
                    errorMsg: "Please enter valid credentials",
                  });
                }
              });
          }
        });

    }
    else
    {
      alert("Please provide your inputs");
    }
    
  }
  onClickFunction(todo_id) {
    if (todo_id !== undefined) {
      fetch(APIURLS.V1.deletetodo, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("key"),
        },
        body: JSON.stringify({
          todo_id: todo_id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json["response"] !== undefined) {
            fetch(APIURLS.V1.gettodos, {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + localStorage.getItem("key"),
              },
            })
              .then((response) => response.json())
              .then((json) => {               
                if (json["response"] !== undefined) {
                  this.setState({
                    responseList: json["response"],
                  });
                } else {
                  this.setState({
                    isError: true,
                    errorMsg: "Please enter valid credentials",
                  });
                }
              });
          }
        });
    }
  }

  render() {
    const ModalDescription = (props) => {
      if (props.toggleModal === true) {
        return (
          <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">Please edit your todo</header>
              <section class="modal-card-body">
                <textarea
                  id="edit"
                  class="textarea"
                  placeholder={props.text_edit_data}
                ></textarea>
                <button
                  className="button info"
                  onClick={() => this.editToDo(props.todo_id)}
                >
                  Save
                </button>
                <button
                  className="button info"
                  onClick={() => this.handleModalDisplay()}
                >
                  Cancel
                </button>
              </section>
            </div>
          </div>
        );
      } else {
        return null;
      }
    };
    return (
      <div>
        <ModalDescription
          toggleModal={this.state.toggleModal}
          handleEditChange={this.handleEditChange}
          todo_id={this.state.todo_id}
          text_edit_data={this.state.text_edit_data}
        />
        <header>
          <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <a class="navbar-item" href="/ToDo">
                <img
                  alt=""
                  src="https://img.icons8.com/fluent/48/000000/todo-list.png"
                />
              </a>
              <text class="navbar-item">To-Do</text>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
              <div class="navbar-start"></div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item ">
                <a href>
                  Hi{" "}
                  {localStorage.getItem("user_name") == null
                    ? "User"
                    : localStorage.getItem("user_name").toUpperCase()}
                </a>
              </div>
              <div class="navbar-item">
                <div class="buttons">
                  <button onClick={this.clearAll} class="button is-light">
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div id = "div_1" class="div_1">
        
          {this.state.responseList.map((elementData) => {
            return (
              <ToDoItem
                todo={elementData}
                onClickFunction={this.onClickFunction}
                handleModalDisplay={this.handleModalDisplay}
              />
            );
          })}
          {this.state.responseList.length === 0 ? 
          <div className="center is-size-1-touch">
            Your To-Do List Is Empty, Please add your To-Do's

            </div>
            : null
          }
           
          </div>
       
          <div id = "div_2" className="div_2">
            <textarea
              class="textarea"
              placeholder="Please write your todo here"
              onChange={this.handleChange}
            ></textarea>
              <div class="level-right">
            <span>
              <button
                className="button info"
                onClick={() => this.onEnterClickAction()}
              >
                Save
              </button>
            </span>
          </div>
          </div>
        
       
      </div>
    );
  }
}

export default ToDo;

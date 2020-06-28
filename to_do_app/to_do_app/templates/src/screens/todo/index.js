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
      answer: "",
      responseList: [],
    };
    this.handleModalDisplay = this.handleModalDisplay.bind(this);
    this.onClickFunction = this.onClickFunction.bind(this);
    this.handleModalDisplay = this.handleModalDisplay.bind(this);
  }

  handleModalDisplay(todo_id) {
    this.setState((prev) => {
      return { toggleModal: !prev.toggleModal, todo_id: todo_id };
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

  clearData = () => {
    this.setState({
      text_data: " ",
      answer: "",
      responseList: [],
    });
  };

  onClearClickAction() {
    this.setState({
      text_data: " ",
    });
  }

  onEnterClickAction() {
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
      });
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
            console.log("Mandge", json);
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
        });
    }
  }

  render() {
    const ModalDescription = (props) => {
      if (props.toggleModal === true) {
        return (
          <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">
                  Do You Wanted To Delete This ToDo?
                </p>
                <button class="delete" aria-label="close"></button>
              </header>
              <section class="modal-card-body">
                <button class="button is-success">Yes</button>
                <button class="button">Cancel</button>
              </section>
              {/* <footer class="modal-card-foot">
      <button class="button is-success">Save changes</button>
      <button class="button">Cancel</button>
    </footer> */}
            </div>
          </div>
        );
      } else {
        return null;
      }
    };
    return (
      <div>
        <ModalDescription toggleModal={this.state.toggleModal} />
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

        <article class="box">
          {this.state.responseList.map((elementData) => {
            return (
              <ToDoItem
                todo={elementData}
                onClickFunction={this.onClickFunction}
                handleModalDisplay={this.handleModalDisplay}
              />
            );
          })}
          <div>
            <textarea
              class="textarea"
              placeholder="e.g. Hello world"
              onChange={this.handleChange}
            ></textarea>
          </div>
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
        </article>
      </div>
    );
  }
}

export default ToDo;

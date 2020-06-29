import React from "react";

import "./index.scss";

export default function ToDoItem(props) {
  return (
    <div className="todo_div">
      <div class="notification is-primary">
        <i
          class="fa fa-pencil-square-o edit"
          title={"Edit To Do"}
          aria-hidden="true"
          onClick={() =>
            props.handleModalDisplay(props.todo.todo_id, props.todo.todo_data)
          }
        ></i>
        <button
          class="delete"
          onClick={() => props.onClickFunction(props.todo.todo_id)}
        ></button>
        {props.todo.todo_data}
        <p class="level-item"> {props.todo.created_at.substr(0, 16)}</p>
        {/* <button class="button" onClick={() => props.handleModalDisplay(props.todo.todo_id)}>Edit</button> */}
      </div>
    </div>
  );
}

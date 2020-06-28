import React from "react";

export default function ToDoItem(props) {  
  return (
    <div>
      <div class="notification is-primary">
      
        <button
          class="delete"
          onClick={() => props.onClickFunction(props.todo.todo_id)}
        ></button>
        {props.todo.todo_data}
        <p class="level-item"> {props.todo.created_at}</p>
        {/* <button class="button" onClick={() => props.handleModalDisplay(props.todo.todo_id)}>Edit</button> */}
      </div>
    </div>
  );
}

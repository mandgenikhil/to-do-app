import React from 'react'

export default function ToDoItem(todo) {

    console.log("todo = ", todo.todo.todo_title)
    return (


        <div class="notification is-primary">
            <div class="is-size-4	">{todo.todo.todo_title}</div>
            <button class="delete"></button>
            {todo.todo.todo_data}
        </div>
    )
}

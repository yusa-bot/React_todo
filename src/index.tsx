import React from "react";
import { createRoot } from "react-dom/client";
import Count from './component/Count'
import TodoList from "./component/TodoList";

const root = createRoot(document.getElementById('root'))

root.render(
    <TodoList />
)


// function component() {
//     const element = document.createElement('div')

//     element.innerHTML = _.join(['Hello', 'webpack'], ' ')

//     return element
// }

// document.body.appendChild(component())
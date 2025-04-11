import React from "react";
import TodoHook from "../customHook/TodoHook";
import ToRegister from "./ToRegister";

//ToRegisterの親。状態を持つだけ
const TodoList: React.FC = () => {

  const {
    content,
    SetContent,
    due_date,
    SetDueDate,
    CreateTodo
  } = TodoHook(); //Hookを全部持ってくる

  return (
    //HookをToRegisterで使えるようにPropsで渡している
    <>
    <ToRegister
      content={ content }
      SetContent={ SetContent }
      due_date={ due_date }
      SetDueDate={ SetDueDate }
      CreateTodo={ CreateTodo }
    />
    </>
    //ToRegisterへ続く
  )
}

export default TodoList;
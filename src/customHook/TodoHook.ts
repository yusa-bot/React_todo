import { useState } from "react"
import MyFetch from "../general/MyFetch"
import Todo from "../general/Todo"
import {v4 as uuidv4} from 'uuid'
//import TodoUpdateData from "../general/TodoUpdateData"

const TodoHook = () => {
    const [content, setContent] = useState<string>("")
    const [due_date, setDueDate] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    //const [updateData, setUpdateData] = useState<string>("f5h93272-112a-86b0-a32e-7b15a208fd95")

    const  SetContent = (content: string) => {
        setContent(content)
    }
    const SetDueDate = (due_date: string) => {
        setDueDate(due_date)
    }

    const CreateTodo = async () => {
        const todo = new Todo(uuidv4(), content, due_date, "running")
        const myFetch = new MyFetch(
            "POST",
            "http://127.0.0.1:3000/api/todos",
            todo
        )
        await myFetch.fetch()
        setTodos(todos.concat(todo))
        ResetContent()
        ResetDueDate()
    }

    const ResetContent = () => {
        const elemContent = document.getElementById("textareaForContent") as HTMLTextAreaElement
        elemContent.value = ""
        setContent("")
    }
    const ResetDueDate = () => {
        const elemDueDate = document.getElementById("inputForDueDate") as HTMLInputElement
        elemDueDate.value = ""
        setDueDate("")
    }

    const SelectAndSetTodos = async () => {
        const myFetch = new MyFetch("GET", "http://127.0.0.1:3000/api/todos/running", null)
        const todos = await myFetch.fetch()
        setTodos(todos)
    }

    // const SetUpdateData = (data:string) => {
    //     setUpdateData(data) //Hook(stateに保存)。ここでupdateDataを初期化、変更
    // }

    //const UpdateTodo = async (id:string, column:"content"|"due_date") => {
    //     if(updateData === "f5h93272-112a-86b0-a32e-7b15a208fd95") return
    //     const todoUpdateData = new TodoUpdateData(id, updateData, column) //引数をimportのTodoUpdateDataへ
    //     const myFetch = new MyFetch("PUT", "http://127.0.0.1:3000/api/todos/", todoUpdateData)
    //     await myFetch.fetch() //更新用データをDBに登録
    //     setUpdateData("f5h93272-112a-86b0-a32e-7b15a208fd95")
    // }

    return {
        content,
        SetContent,
        due_date,
        SetDueDate,
        CreateTodo,
        todos,
        SelectAndSetTodos,
        // SetUpdateData,
        // UpdateTodo
    }
}

export default TodoHook
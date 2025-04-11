import React , {useEffect} from "react";
import TodoHook from '../customHook/TodoHook'
import ToRegister from "./ToRegister"
import LimitMessage from "./LimitMessage"
import RunningTodos from "./RunningTodos";

const TodoList: React.FC = () => {
    const runningTodosLimit = 5

    const {
        content,
        SetContent,
        due_date,
        SetDueDate,
        CreateTodo,
        todos,
        SelectAndSetTodos,
        // SetUpdateData,
        // UpdateTodo
    } = TodoHook()

    useEffect(() => {
        SelectAndSetTodos()
    }, []) //TodoListの初回描画時のみSelectAndSetTodos()→todos=running一覧

    return (
        <>
        <RunningTodos
            todos={todos}
            // SetUpdateData={SetUpdateData}
            // UpdateTodo={UpdateTodo}
        />
        {
            (runningTodosLimit > todos.length)
            ?
            <ToRegister
                content={content}
                SetContent={SetContent}
                due_date={due_date}
                SetDueDate={SetDueDate}
                CreateTodo={CreateTodo}
            />
            : //ここでelse
            <LimitMessage />
        }
        </>
    )
}

export default TodoList
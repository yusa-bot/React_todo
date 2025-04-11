import React from "react";
import Todo from "../general/Todo";

interface RunningTodosProp {
    todos: Todo[];
    // SetUpdateData: (data:string) => void;
    // UpdateTodo: (id:string, column:"content"|"due_date") => void;
}

const RunningTodos: React.FC<RunningTodosProp> = ({todos, SetUpdateData, UpdateTodo}) => {
    return (
        <>
        <p>進行中Todo一覧</p>
        { //RunningTodosを順にmapする
            todos.map((todo, i) => (
                //divはidによって識別(key)
                <div key={todo.getId()}>

                    <input
                        defaultValue={todo.getContent()}
                        type="text"
                        placeholder="registered-content"
                        // onChange={(e) => SetUpdateData(e.target.value)} //Hook→stateに保存
                        // onBlur={() => UpdateTodo(todo.getId(), "content")} //DBへ反映
                    >
                    </input>

                    <input
                        defaultValue={todo.getDueDate()}
                        type="text"
                        placeholder="registered-due_date"
                        // onChange={(e) => SetUpdateData(e.target.value)}
                        // onBlur={() => UpdateTodo(todo.getId(), "due_date")}
                    >
                    </input>

                </div>
            ))
        }
        </>
    )
}

export default RunningTodos
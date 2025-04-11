import React from "react";

interface ToRegisterProp {
    content:string
    SetContent:(content:string) => void
    due_date:string
    SetDueDate:(due_date:string) => void
    CreateTodo: () => void
}

const ToRegister:React.FC<ToRegisterProp> = ({content, SetContent, due_date, SetDueDate, CreateTodo}) => {
    return (
        <div>
            <p>新規Todoを入力して下さい。</p>
            <div>
                <input
                    id="textareaForContent"
                    placeholder="newContent"
                    onChange={(e) => SetContent(e.target.value)}
                ></input>
            </div>
            <div>
                <input
                    id="inputForDueDate"
                    placeholder="newDueDate"
                    onChange={(e) => SetDueDate(e.target.value)}
                ></input>
            </div>
            {
                (content !== "" && due_date !== "") && <button data-testid="register-button">登録</button>
            }
        </div>
    )
}

export default ToRegister

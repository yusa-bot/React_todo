import React from "react";
import MyTwitterAPI from "../general/MyTwitterAPI"

//propsの型
interface ButtonProp {
    Increment: () => void
    Decrement: () => void
}

//propsでIncrement, Decrementを受け取る
const Button: React.FC<ButtonProp> = ({Increment, Decrement}) => {
    return (
        <div>
            <button onClick={ () => Increment()}>increment</button>
            <button onClick={ () => Decrement()}>decrement</button>
        </div>
    )
}

export default Button

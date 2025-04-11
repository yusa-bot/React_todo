import React from "react";
import CountHook from "../customHook/CountHook";
import CountDisplay from "./CountDisplay";
import Button from "./Button";

const Count: React.FC = () => {
    //CountHook()でHookを作成し受け取る
    const {count, Increment, Decrement} = CountHook()

    return (
        <div>
            <CountDisplay count={count}/>
            <Button Increment={Increment} Decrement={Decrement}/>
        </div>
    )
}

export default Count
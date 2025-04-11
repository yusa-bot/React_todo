import { count } from "console";
import { useState } from "react";

const CountHook = () => {
    const [count, setCount] = useState<number>(0)

    const Increment = () => {
        setCount(count => count+1)
    }

    const Decrement = () => {
        setCount(count => count-1)
    }

    return {count, Increment, Decrement}
}

export default CountHook
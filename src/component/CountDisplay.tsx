import React from "react";

//オブジェクトの基礎 propsの型を定義する必要があるため
interface CountDisplayProp {
    count: number
}

//props : count(customHookのexport)
const CountDisplay: React.FC<CountDisplayProp> = ({count}) => {
    return (
        <p data-testid='test-paragraph'>Now Count is {count}</p>
    )
}

export default CountDisplay
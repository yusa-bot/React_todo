import React from "react";

//React.FC(function compornent)型=コンポーネント
const Hello: React.FC = () => {
    return (
        <div>
            <p data-testid='test-paragraph'>Hello</p>
        </div>
    )
}

export default Hello
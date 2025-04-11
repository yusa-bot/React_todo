 /**
  * @jest-environment jsdom
  */
//jsdom(仮想DOM)で動かす

import React from "react"
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import  Button from '../component/Button' //test対象
import MyTwitterAPI from '../general/MyTwitterAPI'
import Count from "../component/Count"

// test('The Hello-Component displays paragraph.', () => {
//     render(<Hello />)
//     //screen=画面全体DOM
//     expect(screen.getByTestId('test-paragraph')).toHaveTextContent('Hello')
// })

//APIを関係せずUIをテスト
test('When clicking the button, twitter trends can be got.', () => {
    //MyTwitterAPI.getTrendsのmockを生成 → トレンドではなく文字列を返す & 呼び出し回数を記録
    jest.spyOn(MyTwitterAPI.prototype, 'getTrends').mockReturnValue(["foo", "bar", "hoge"])

    const dummyInc = jest.fn();
    const dummyDec = jest.fn();
    //トレンド取得の契機
    render(<Button Increment={dummyInc} Decrement={dummyDec} />); // ← 必須のpropsを補う
  

    //click時の挙動を模倣
    fireEvent.click(screen.getByRole('button'))

    //呼び出し回数が1回か？
    expect(MyTwitterAPI.prototype.getTrends).toHaveBeenCalledTimes(1)
})
/* @jest-environment jsdom */

import React from "react";
import {render, screen, fireEvent, act, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoList from '../component/TodoList'
import MyFetch from "../general/MyFetch"
import userEvent from '@testing-library/user-event'
import Todo from "../general/Todo";

//本番環境に影響させないため雛形mockを作成
beforeAll(() => {
    jest.spyOn(MyFetch.prototype, 'createTodo').mockResolvedValue()
    jest.spyOn(MyFetch.prototype, 'selectAllRunningTodos').mockResolvedValue([])
    // jest.spyOn(MyFetch.prototype, 'updateTodo').mockResolvedValue()
})

test('When input values to both the content-state and due_date-state, a register button is displayed.', async () => {
    await act(async () => {
        render(<TodoList />);
    });//
      
    await act(() => fireEvent.change(screen.getByPlaceholderText('newContent'), {target: {value: '田中さんにメールする。'}}))
    expect(screen.queryByTestId('register-button')).toBeNull()

    await act(() => fireEvent.change(screen.getByPlaceholderText('newDueDate'), {target: {value: '20230301'}}))
    expect(screen.queryByTestId('register-button')).toBeTruthy()

    await act(() => fireEvent.change(screen.getByPlaceholderText('newContent'), {target: {value: ''}}))
    expect(screen.queryByTestId('register-button')).toBeNull()
})

test('When push a register-button, the input fields of the content and due_date are cleaned.', async () => {
    jest.spyOn(MyFetch.prototype, 'createTodo').mockResolvedValue()
    await act(async () => {
        render(<TodoList />);
    });//
      
    //値の代入。登録ボタンはまだ→値は入ったまま
    await act(() => fireEvent.change(screen.getByPlaceholderText('newContent'), {target: {value: '田中さんにメールする。'}}))
    await act(() => fireEvent.change(screen.getByPlaceholderText('newDueDate'), {target: {value: '20230301'}}))
    //呼び出されていない→値が入ったまま
    expect(MyFetch.prototype.createTodo).toHaveBeenCalledTimes(0)
    expect(screen.getAllByPlaceholderText('newContent')).toHaveValue('田中さんにメールする。')
    expect(screen.getAllByPlaceholderText('newDueDate')).toHaveValue('20230301')
    //登録ボタン押す
    await act(() => fireEvent.click(screen.queryByTestId('register-button')))
    //呼び出す→値が空→ボタン無し
    expect(MyFetch.prototype.createTodo).toHaveBeenCalledTimes(1)
    expect(screen.getAllByPlaceholderText('newContent')).toHaveValue('')
    expect(screen.getAllByPlaceholderText('newDueDate')).toHaveValue('')
    expect(screen.queryByTestId('register-button')).toBeNull()
})

test('When push a register-button, if the running todos is maximum limit, the LimitMessage Component is displayed.', async () => {
    const todos = [
        new Todo("1", "田中さんにメールする。", "20230201", "running"),
        new Todo("2", "報告書を提出する。", "20230301", "running"),
        new Todo("3", "会議を設定する。", "20230401", "running"),
        new Todo("4", "出張の準備をする。", "20230501", "running")
    ]
    //Promise
    jest.spyOn(MyFetch.prototype, 'selectAllRunningTodos').mockResolvedValue(todos)
    await act(async () => {
        render(<TodoList />);
    });//
      
    //5個目のtodo
    await act(() => fireEvent.change(screen.getByPlaceholderText('newContent'), {target: {value: '経費を精算する'}}))
    await act(() => fireEvent.change(screen.getByPlaceholderText('newDueDate'), {target: {value: '20230601'}}))
    await act(() => fireEvent.click(screen.queryByTestId('register-button')))
    //メッセージ出す
    expect(screen.queryByTestId('limit-message')).toBeTruthy()
})

test('When render the RunningTodos-Component, all running-todos is displayed.', async () => {
    const todos = [
        new Todo("1", "田中さんにメールする。", "20230201", "running"),
        new Todo("2", "報告書を提出する。", "20230301", "running"),
    ]
    jest.spyOn(MyFetch.prototype, 'selectAllRunningTodos').mockResolvedValue(todos)

    await act(async () => {
        render(<TodoList />);
    });//mockでPromiseしているからawait

    //初回描画時にrunning一覧が取得されるので、単に値を取得している
    const contentFields = screen.getAllByPlaceholderText('registered-content')
    const dueDateFields = screen.getAllByPlaceholderText('registered-due_date')

    expect(MyFetch.prototype.selectAllRunningTodos).toHaveBeenCalledTimes(1) //render<TodoList />しているので。
    
    expect(contentFields.length).toBe(2) //todosは2件
    expect(dueDateFields.length).toBe(2)
   
    expect(contentFields[0]).toHaveValue('田中さんにメールする。')
    expect(contentFields[1]).toHaveValue('報告書を提出する。')
    expect(dueDateFields[0]).toHaveValue('20230201')
    expect(dueDateFields[1]).toHaveValue('20230301')
})

// test('When unfocus a form after editing the content or due_date of a todo, it is updated.', async () => {
//     const todos = [
//         new Todo("1", "報告書を提出する。", "20230301", "running")
//     ]
//     jest.spyOn(MyFetch.prototype, 'selectAllRunningTodos').mockResolvedValue(todos)
    
//     await act(async () => {
//         render(<TodoList />);
//     });//

//     const contentElem = screen.getByPlaceholderText('registered-content')
//     const dueDateElem = screen.getByPlaceholderText('registered-due_date')

//     await act(() => contentElem.focus())
//     await act(() => dueDateElem.focus())

//     expect(MyFetch.prototype.updateTodo).toHaveBeenCalledTimes(0)
//     //状態更新の処理をact()でラップし追いかける
//     //onBlurのためuserEvent
//     await act(() => userEvent.type(contentElem, "大西課長に。"))
//     await act(() => dueDateElem.focus())

//     expect(dueDateElem).toHaveFocus()
//     expect(MyFetch.prototype.updateTodo).toHaveBeenCalledTimes(1)
// })
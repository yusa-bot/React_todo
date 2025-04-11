/**
 * @jest-environment jsdom
*/

import React from 'react';
import {render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../component/TodoList';
import MyFetch from '../general/MyFetch';

//登録ボタンの有無
test('When input values to both the content-state and due_date-state, a register button is displayed.', async () => {
  render(<TodoList />);
  //contentのみ入力→登録ボタンなし
  await act(() => fireEvent.change(screen.getByPlaceholderText('newContent'), {target: {value: '田中さんにメールする。'}}));
  expect(screen.queryByTestId('register-button')).toBeNull();
  //due_dateも入力→登録ボタン有り
  await act(() => fireEvent.change(screen.getByPlaceholderText('newDueDate'), {target: {value: '20230301'}}));
  expect(screen.queryByTestId('register-button')).toBeTruthy();
  //content空白→登録ボタンなし
  await act(() => fireEvent.change(screen.getByPlaceholderText('newContent'), {target: {value: ''}}));
  expect(screen.queryByTestId('register-button')).toBeNull();
});

//登録ボタンを押すと入力欄が空になるか
test('When push a register-button, the input fields of the content and due_date are cleared.', async () => {
   
    //createTodo()すると、mockですぐresolveして空の値を返す
    jest.spyOn(MyFetch.prototype, 'createTodo').mockResolvedValue();

    //TodoListを描画→内部を再現
    render(<TodoList />);

    //入力
    await act(() => fireEvent.change(screen.getByPlaceholderText('newContent'), {target: {value: '田中さんにメールする。'}}));
    await act(() => fireEvent.change(screen.getByPlaceholderText('newDueDate'), {target: {value: '20230301'}}));
    
    //createTodoは呼ばれていない && 値まだある
    expect(MyFetch.prototype.createTodo).toHaveBeenCalledTimes(0);
    expect(screen.getByPlaceholderText('newContent')).toHaveValue('田中さんにメールする。');
    expect(screen.getByPlaceholderText('newDueDate')).toHaveValue('20230301');
  
    //登録ボタン押す
    await act(() => fireEvent.click(screen.queryByTestId('register-button')));
  
    //登録ボタン1回呼ばれる
    expect(MyFetch.prototype.createTodo).toHaveBeenCalledTimes(1);
    //入力欄が空
    expect(screen.getByPlaceholderText('newContent')).toHaveValue('');
    expect(screen.getByPlaceholderText('newDueDate')).toHaveValue('');
    //登録ボタン消えた
    expect(screen.queryByTestId('register-button')).toBeNull();
  });

  
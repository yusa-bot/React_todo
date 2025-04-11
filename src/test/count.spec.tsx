/**
 * @jest-environment jsdom
*/

import React from "react";
import {render, screen, fireEvent, act} from '@testing-library/react'
import '@testing-library/jest-dom'
import Count from "../component/Count";
import { exec } from "child_process";

test('When clicking the buttons, value of the count changes.', async () => {
    render(<Count />)
    //actでHookの状態変更を保証
    await act(() => fireEvent.click(screen.getAllByRole('button')[0]))
    await act(() => fireEvent.click(screen.getAllByRole('button')[0]))

    expect(screen.getByTestId('test-paragraph')).toHaveTextContent("Now Count is 2")

    await act(() => fireEvent.click(screen.getAllByRole('button')[1]))

    expect(screen.getByTestId('test-paragraph')).toHaveTextContent("Now Count is 1")
})
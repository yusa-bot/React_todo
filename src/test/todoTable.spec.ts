import { v4 as uuidv4 } from 'uuid'
import Todo from "../general/Todo"
import TodoTable from '../database/TodoTable'
import { updateV7State } from 'uuid/dist/cjs/v7'

const clearDB = new TodoTable()

beforeEach(async () => {
    await clearDB.deleteAllTodos()
})

afterEach(async () => {
    await clearDB.deleteAllTodos()
})

test('Create a todo.', async () => {
    // Arrange
    const id = uuidv4()
    const db = new TodoTable() //table //dbインスタンス経由でSQL
    const todo = new Todo(id, "田中さんにメールする。", "20230301", "running") //コンストラクタまで実行

    // Act
    await db.createTodo(todo) //Todoをデータベースへ保存

    // Assert
    const selectedTodo = await db.selectTodoById(id) //idをもとにデータベースからTodoを取得する
    expect(selectedTodo).toEqual(todo)
})

test('Select all todos', async () => {
    // Arrange
    const id1 = uuidv4()
    const id2 = uuidv4()
    const db = new TodoTable()
    const todos = [
        new Todo(id1, "田中さんにメールする。", "20230201", "completed"),
        new Todo(id2, "報告書を提出する。", "20230301", "running")
    ]
    for(let i = 0; i < todos.length; i++) {
        await db.createTodo(todos[i])
    }

    //Act
    const selectedAllTodos = await db.selectAllTodos()

    //Assert
    expect(selectedAllTodos).toEqual(todos)
})

test('Select a todo specified by id.', async () => {
    // Arrange
    const id1 = uuidv4()
    const id2 = uuidv4()
    const db = new TodoTable()
    const todos = [
        new Todo(id1, "田中さんにメールする。", "20230201", "completed"),
        new Todo(id2, "報告書を提出する。", "20230301", "running")
    ]
    for(let i = 0; i < todos.length; i++) {
        await db.createTodo(todos[i])
    }

    //Act
    const selectedTodo = await db.selectTodoById(id2)

    //Assert
    expect(selectedTodo).toEqual(todos[1])
})

test('Select todos specified by status.', async () => {
    //Arrange
    const id1 = uuidv4()
    const id2 = uuidv4()
    const id3 = uuidv4()
    const id4 = uuidv4()
    const db = new TodoTable()
    const todos = [
        new Todo(id1, "田中さんにメールする。", "20230201", "completed"),
        new Todo(id2, "報告書を提出する。", "20230301", "completed"),
        new Todo(id3, "会議を設定する。", "20230401", "running"),
        new Todo(id4, "出張の準備をする。", "20230501", "running")
    ]
    for(let i = 0; i < todos.length; i++) {
        await db.createTodo(todos[i])
    }

    //Act
    const runningTodos = await db.selectTodosByStatus("running")
    const completedTodos = await db.selectTodosByStatus("completed")

    //Assert
    expect(runningTodos).toEqual([todos[2], todos[3]])
    expect(completedTodos).toEqual([todos[0], todos[1]])
})

test('Update the content of the todo specified by id.', async () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const db = new TodoTable();
    const todos = [
      new Todo(id1, "田中さんにメールする。", "20230201", "running"),
      new Todo(id2, "報告書を提出する。", "20230301", "running")
    ];
    for (let i=0; i<todos.length; i++) {
        await db.createTodo(todos[i])
    }

    await db.updateTodoById(id2, "報告書を課長に提出する。", "content")

    const updatedTodo = await db.selectTodoById(id2)
    expect(updatedTodo).toEqual(new Todo(id2, "報告書を課長に提出する。", "20230301", "running"))
})

test('Update the due_date of the todo specified by id.', async () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const db = new TodoTable();
    const todos = [
        new Todo(id1, "田中さんにメールする。", "20230201", "running"),
        new Todo(id2, "報告書を提出する。", "20230301", "running")
    ];
    for(let i = 0; i < todos.length; i++) {
        await db.createTodo(todos[i]);
    }

    await db.updateTodoById(id2, "20230401", "due_date");

    const updatedTodo = await db.selectTodoById(id2);
    expect(updatedTodo).toEqual(new Todo(id2, "報告書を提出する。", "20230401", "running"));
})

test('Delete a todo by id.', async () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const db = new TodoTable();
    const todos = [
        new Todo(id1, "田中さんにメールする。", "20230201", "running"),
        new Todo(id2, "報告書を提出する。", "20230301", "running")
    ];
    for(let i = 0; i < todos.length; i++) {
        await db.createTodo(todos[i]);
    }

    await db.deleteTodoById(id1);

    const allTodos = await db.selectAllTodos()
    expect(allTodos).toEqual([todos[1]])
})

test('Change the status of the todo by id.', async () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const db = new TodoTable();
    const todos = [
        new Todo(id1, "田中さんにメールする。", "20230201", "running"),
        new Todo(id2, "報告書を提出する。", "20230301", "running")
    ];
    for(let i = 0; i < todos.length; i++) {
        await db.createTodo(todos[i]);
    }

    await db.changeTodoById(id1);

    const completedTodo = await db.selectTodoById(id1)
    expect(completedTodo).toEqual(new Todo(id1, "田中さんにメールする。", "20230201", "completed"))
})
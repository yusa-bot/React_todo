import {v4 as uuidv4} from 'uuid'
import request from "supertest"
import app from "../server/express"
import Todo from "../general/Todo"
import TodoTable from "../database/TodoTable"
import TodoUpdateData from "../general/TodoUpdateData"
import TodoDeleteData from "../general/TodoDeleteData"
import TodoChangeData from "../general/TodoChangeData"

// test('Operation check for the supertest.', async () => {
//     const response = await request(app)
//     .get('/api/todos')
//     .set('Accept', 'application/json')

//     expect(response.status).toEqual(200)
//     expect(JSON.parse(response.text)).toEqual({name: 'john'})
// })

const clearDB = new TodoTable()

beforeEach(async () => {
    await clearDB.deleteAllTodos()
})
afterAll(async () => {
    await clearDB.deleteAllTodos()
})

test('The GET Method to the /api/todos can be got all todos.', async () => {
    const id1 = uuidv4()
    const id2 = uuidv4()
    const db = new TodoTable()
    const todos = [
        new Todo(id1, "田中さんにメールする。", "20230201", "completed"),
        new Todo(id2, "報告書を提出する。", "20230301", "running")
    ]
    for(let i=0; i<todos.length; i++) {
        await db.createTodo(todos[i])
    }

    const response = await request(app)
    .get('/api/todos')
    .set('Accept', 'application/json')

    expect(response.status).toEqual(200)
    expect(JSON.parse(response.text)).toEqual(todos)
    //todosはインスタンス、response.textはjson文字列だが、toEqualでは{プロパティ: 値}の比較をしている。
})

test('The GET Method to the /api/todos/running can be got all running-todos.', async () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const id3 = uuidv4();
    const id4 = uuidv4();
    const db = new TodoTable();
    const todos = [
      new Todo(id1, "田中さんにメールする。", "20230201", "completed"),
      new Todo(id2, "報告書を提出する。", "20230301", "completed"),
      new Todo(id3, "会議を設定する。", "20230401", "running"),
      new Todo(id4, "出張の準備をする。", "20230501", "running")
    ];
    for(let i = 0; i < todos.length; i++) {
      await db.createTodo(todos[i]);
    }
  
    const response = await request(app)
    .get('/api/todos/running')
    .set('Accept', 'application/json')

    expect(response.status).toEqual(200)
    expect(JSON.parse(response.text)).toEqual([todos[2], todos[3]])
})

test('The GET Method to the /api/todos/completed ca be got all completed-todos.', async () => {
    const id1 = uuidv4();
    const id2 = uuidv4();
    const id3 = uuidv4();
    const id4 = uuidv4();
    const db = new TodoTable();
    const todos = [
      new Todo(id1, "田中さんにメールする。", "20230201", "completed"),
      new Todo(id2, "報告書を提出する。", "20230301", "completed"),
      new Todo(id3, "会議を設定する。", "20230401", "running"),
      new Todo(id4, "出張の準備をする。", "20230501", "running")
    ];
    for(let i = 0; i < todos.length; i++) {
      await db.createTodo(todos[i]);
    }

    const response = await request(app)
    .get('/api/todos/completed')
    .set('Accept', 'application/json')

    expect(response.status).toEqual(200)
    expect(JSON.parse(response.text)).toEqual([todos[0], todos[1]])
})

test('POST Method to /api/todos can be created a todo', async () => {
    const id = uuidv4()
    const todo = new Todo(id, "会議を設定する。", "20230401", "running")
    const db = new TodoTable()

    const response = await request(app)
    .post('/api/todos')
    .send(todo)
    .set('Accept', 'application/json')
    const selectedTodo = await db.selectTodoById(id)

    expect(response.status).toEqual(200)
    expect(selectedTodo).toEqual(todo)
})

test('PUT Method to /api/todos can update the todo', async () => {
    const id1 = uuidv4()
    const id2 = uuidv4()
    const db = new TodoTable()
    const todos = [
        new Todo(id1, "田中さんにメールする。", "20230201", "running"),
        new Todo(id2, "報告書を提出する。", "20230301", "running")
    ]
    for(let i = 0; i < todos.length; i++) {
        await db.createTodo(todos[i])
    }

    const todoUpDateData1 = new TodoUpdateData(id1, "山本さんにメールする。", "content")
    const todoUpDateData2 = new TodoUpdateData(id2, "20230401", "due_date")

    const response1 = await request(app)
    .put('/api/todos')
    .send(todoUpDateData1)
    .set('Accept', 'application/json')
    const selectedTodo1 = await db.selectTodoById(id1)

    const response2 = await request(app)
    .put('/api/todos')
    .send(todoUpDateData2)
    .set('Accept', 'application/json')
    const selectedTodo2 = await db.selectTodoById(id2)

    expect(response1.status).toEqual(200)
    expect(selectedTodo1).toEqual(new Todo(id1, "山本さんにメールする。", "20230201", "running"))

    expect(response2.status).toEqual(200)
    expect(selectedTodo2).toEqual(new Todo(id2, "報告書を提出する。", "20230401", "running"))
})

test('DELETE Method to /api/todos can delete the todo.', async () => {
    const id = uuidv4()
    const db = new TodoTable()
    const todo = new Todo(id, "田中さんにメールする。", "20230201", "running")
    await db.createTodo(todo)
    const todoDeleteData = new TodoDeleteData(id)

    const response = await request(app)
    .delete('/api/todos')
    .send(todoDeleteData)
    .set('Accept', 'application/json')
    const todos = await db.selectAllTodos()

    expect(response.status).toEqual(200)
    expect(todos).toEqual([])
})

test('PATCH Method to api/todos can be changed the status of the todo.', async () => {
    const db = new TodoTable()
    const id = uuidv4()
    const todo = new Todo(id, "田中さんにメールする。", "20230201", "running")
    await db.createTodo(todo)
    const todoChangeData = new TodoChangeData(id)

    const response = await request(app)
    .patch('/api/todos')
    .send(todoChangeData)
    .set('Accept', 'application/json')
    const selectedTodo = await db.selectTodoById(id)

    expect(response.status).toEqual(200)
    expect(selectedTodo).toEqual(new Todo(id, "田中さんにメールする。", "20230201", "completed"))
})
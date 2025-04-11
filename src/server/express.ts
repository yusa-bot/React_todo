import express from 'express'
import TodoTable from '../database/TodoTable'
import Todo from '../general/Todo'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json());
//ミドルウェアとしてbodyParser.jsonを登録 → HTTPリクエストのbodyをbody-parserが解析

app.get('/api/todos', async (req, res) => {
    const db = new TodoTable()
    const result = await db.selectAllTodos()
    res.status(200).json(result)
})

app.get('/api/todos/running', async (req, res) => {
    const db = new TodoTable()
    const result = await db.selectTodosByStatus("running")
    res.status(200).json(result)
})

app.get('/api/todos/completed', async (req, res) => {
    const db = new TodoTable()
    const result = await db.selectTodosByStatus("completed")
        res.status(200).json(result)
})

//reqにHTTPリクエストが代入
app.post('/api/todos', async (req, res) => {
    //HTTPリクエストの値を取り出し、new Todo()
    console.log(req.body)
    const {id, content, due_date, status} = req.body

    const todo = new Todo(id, content, due_date, status)
    const db = new TodoTable()
    await db.createTodo(todo)

    res.status(200).json(todo)
})
//.jsonはbody
app.put("/api/todos", async (req, res) => {
    //引数のプロパティを取り出し、ById()へ渡す
    const {id, updateData, column} = req.body
    const db = new TodoTable()
    await db.updateTodoById(id, updateData, column)
    res.status(200).json({update:"complete"})
})

app.delete("/api/todos", async (req, res) => {
    const {id} = req.body
    const db = new TodoTable()
    await db.deleteTodoById(id)
    res.status(200).json({delete:"complete"})
})

app.patch("/api/todos", async (req, res) => {
    const {id} = req.body
    const db = new TodoTable()
    await db.changeTodoById(id)
    res.status(200).json({change:"complete"})
})

export default app
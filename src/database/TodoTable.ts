import Todo from "../general/Todo"
import Database from "./Database"

export default class TodoTable extends Database {
    public async deleteAllTodos() {
        await this.dbRun(`DELETE FROM todo`)
    }
    //thisはDatabaseのこと
    public async createTodo(todo: Todo) {
        await this.dbRun(`INSERT INTO todo (id, content, due_date, status)
            VALUES ("${todo.getId()}", "${todo.getContent()}", "${todo.getDueDate()}", "${todo.getStatus()}"
            )`) //引数Todo型のtodoのメゾットを使える
    }

    public async selectTodoById(id: string) {
        const data = await this.dbGet(`SELECT * FROM todo WHERE id = "${id}"`)
        return new Todo(data.id, data.content, data.due_date, data.status) //.toEqual(todo)と比較するためインスタンス化
    }

    public async selectAllTodos(): Promise<Todo[]> {
        const todos: Todo[] = []
        const result = await this.dbAll(`SELECT * FROM todo`)
        for(let i = 0; i < result.length; i++) {
            todos.push(new Todo(result[i].id, result[i].content, result[i].due_date, result[i].status))
        }
        return todos
    }

    public async selectTodosByStatus(status: "running" | "completed"): Promise<Todo[]> {
        const todos: Todo[] = []
        const result = await this.dbAll(`SELECT * FROM todo WHERE status = "${status}"`)
        for(let i=0; i < result.length; i++) {
            todos.push(new Todo(result[i].id, result[i].content, result[i].due_date, result[i].status))
        }
        return todos
    }

    public async updateTodoById(id: string, newData: string, column: "content" | "due_date") {
        await this.dbRun(`UPDATE todo SET "${column}" = "${newData}" WHERE id = "${id}"`)
    }

    public async deleteTodoById(id: string) {
        await this.dbRun(`DELETE FROM todo WHERE id = "${id}"`)
    }

    public async changeTodoById(id: string) {
        await this.dbRun(`UPDATE todo SET status = "completed" WHERE id = "${id}"`)
    }
}
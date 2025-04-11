export default class Todo {
    private id: string
    private content: string
    private due_date: string
    private status: "running" | "completed"

    constructor(id: string, content: string, due_date: string, status: "running" | "completed") {
        this.id = id
        this.content = content
        this.due_date = due_date
        this.status = status
    }

    public getId(): string {
        return this.id
    }
    public getContent(): string {
        return this.content
    }
    public getDueDate(): string {
        return this.due_date
    }
    public getStatus(): "running" | "completed" {
        return this.status
    }
}
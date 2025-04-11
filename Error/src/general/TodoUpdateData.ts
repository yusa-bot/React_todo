export default class TodoUpdateData {
    private id: string
    private updateData: string
    private column: "content" | "due_date"

    constructor(id:string, updateData:string, column:"content"|"due_date") {
        this.id = id
        this.updateData = updateData
        this.column = column
    }
}
import Todo from "./Todo";
import TodoUpdateData from "./TodoUpdateData";
import TodoDeleteData from "./TodoDeleteData";

type MyFetchBody = Todo | TodoUpdateData | TodoDeleteData | null

export default class MyFetch {
    private method: string;
    private url: string;
    private body: MyFetchBody;

    constructor(method: string, url: string, body: MyFetchBody) {
        this.method = method;
        this.url = url;
        this.body = body;
    }

    public async fetch() {
      //新規登録
      if(this.method === "POST" && this.url === "http://127.0.0.1:3000/api/todos/") {
            await this.createTodo();
        }
    }

    public async createTodo() {
        await fetch(
            this.url, {
                method: this.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.body)
            }
        );
    }
}
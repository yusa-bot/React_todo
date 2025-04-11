import { rejects } from "assert"
import { resolve } from "path"
import * as sqlite3 from "sqlite3"
import { promisify } from "util" //コールバック関数をpromise型にする

export default abstract class Database {
    protected dbGet
    protected dbAll
    protected dbRun

    constructor() {
        const db = new sqlite3.Database('db')
        this.dbGet = promisify(db.get.bind(db)) //dbにthisを固定
        this.dbAll = promisify(db.all.bind(db))

        this.dbRun = function(arg: string) {
            return new Promise<any>((resolve, reject) => {
                db.run.apply(db, [ //applyでdbにthisを固定
                    arg, //実行
                    function(this: sqlite3.Database, err: Error) {
                        err ? reject(err) : resolve(this)
                    }
                ])
            })
        }
    }
}

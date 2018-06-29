
/** Инсрукция обработки полей. */
export interface IStdioRule {
    
    test (value: string): boolean
}

/** Инструкции к полю. */
export interface IStdioField {
    
    /** Индентификатор поля для поска по ключу */
    fid: string
    
    /** Заголовок поля. */
    label: string

    /** Разрешение на пропуск. */
    skip?: boolean

    /** Исходное значение. */
    def?: string
    
    /** Входящее значение. */
    val?: string
    
    /** Правило для значения. */
    rule?: RegExp | IStdioRule
}

/** Инструкции к форме */
export interface IStdioForm {
    
    /** Этап выполнения */
    status: number
    
    /** Список полей. */
    fields: IStdioField[]

    /** Обработчик вывода. */
    render: Function
}

/** */
export class StdioField implements IStdioField {

    public fid: string
    public label: string
    public skip: boolean = true
    public def: string = ''
    public val: string = ''
    public rule: RegExp | IStdioRule = /\S{1,}/

    public constructor(fid: string, label: string) {
        this.fid = fid
        this.label = label
    }
}

/** */
export class StdioForm implements IStdioForm {
    
    private _status: number = 0
    private _fields: IStdioField[] = []
    private _render: Function = console.table

    private onListen: boolean = false

    get status(): number {
        return this._status
    }

    get fields(): IStdioField[] {
        return this._fields
    }

    get render(): Function {
        return this._render
    }

    set render (render: Function) {
        this._render = render
    }

    public createField(fid: string, label: string): IStdioField {
        let field: IStdioField = new StdioField(fid, label)
        this.addField(field)
        return field
    }

    public addField(field: IStdioField): void {
        this._fields.push(field)
    }

    public listen(): void {
        if (this.onListen) return 
        else this.onListen = true

        process.stdin.addListener('data', this.onData.bind(this))
        process.stdin.setEncoding('utf8')
        process.stdin.resume()
        this.next()
    }

    private checkValue(input: string): boolean {
        let field: IStdioField = this.fields[this.status]
        
        if ((input.length == 0 && field.skip == true) || 
            (field.rule && field.rule.test(input))) {
            return true
        }

        return false
    }

    private onData(buffer: Buffer): void {

        let input: string = buffer.toString('utf-8')
            input = input.trim()

        if (this.checkValue(input)) {
            this._fields[this._status].val = input
            this._status = this._status + 1
        }
        
        this.next()
    }

    private write(value: string): void {
        process.stdout.write(value + ' ')
    }

    private next(): void {

        if (this.status === this.fields.length) {
            process.stdin.removeAllListeners('data')
            this.render.call(this, this.fields)
        } else {
            this.write(this.fields[this.status].label)
        }
    }
}
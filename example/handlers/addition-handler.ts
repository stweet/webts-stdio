import { IStdioForm, IStdioField } from "../.."

class AdditionHandler {

    public isExit: boolean = false

    public constructor(form: IStdioForm) {
        form.handler = this.handler.bind(this)
    }

    private handler(fields: IStdioField[]): void {
        
        let variables: string[] = []
        let summa: number = 0

        fields.forEach(field => {
            summa += parseInt(field.val)
            variables.push(field.val)
        })

        let output: string = variables.join(' + ')
            output += ' = ' + summa

        console.log('Ресультат:', output)
        if (!this.isExit) return 
        process.exit(0)
    }
}

export { AdditionHandler }
import { StdioForm } from ".."
import { NumberField } from "./fields/number-field"
import { AdditionHandler } from "./handlers/addition-handler"

let form: StdioForm = new StdioForm()

form.addField(new NumberField('i1', "Введите первое число:"))
form.addField(new NumberField('i2', "Введите второе число:"))

let handler: AdditionHandler = new AdditionHandler(form)
    handler.isExit = true

form.listen()
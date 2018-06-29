# webts-stdio
Юзаем как то так:
```javascript
import { StdioForm, IStdioField, StdioField } from "./stdio"

/**
 * Обработчик входных данных.
 * 
 * @param fields 
 */
function render(fields: IStdioField[]): void {
    console.table(fields, ['label', 'val'])
    process.exit(0)
}

/** Собственно сам виновник торжества. */
let form: StdioForm = new StdioForm()

/** Определяем обработчика вывода. */
form.render = render 

/** Произвольное поле. */
let field: StdioField = new StdioField('email', "Enter your email")
    field.rule = /\w+@\w+\.\w{2,}/
    field.skip = false
form.addField(field)

/** А можно добавить поле и так. */
form.createField('login', 'Enter your login')

/** Слушаем консольку. */
form.listen()
```
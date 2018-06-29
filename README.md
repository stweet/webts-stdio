# webts-stdio
Юзаем как то так:
```javascript
import { StdioForm, IStdioField, StdioField, IStdioRule } from "."

/**
 * Обработчик входных данных.
 * 
 * @param fields 
 */
function render(fields: IStdioField[]): void {
    // "console.table" only node v10.x and ^
    console.table(fields, ['label', 'val']) 
    process.exit(0)
}

/** Передаём обработку поля. */
let rule: IStdioRule = {
    
    test: value => {
        
        if (/\w+@\w+\.\w{2,}/.test(value)) {
            return true
        }

        console.log('!Invalid email!')
        return false
    }
}

/** Собственно сам виновник торжества. */
let form: StdioForm = new StdioForm()

/** Определяем обработчика вывода. */
form.render = render 

/** Произвольное поле. */
let field: StdioField = new StdioField('email', "Enter your email")
    field.skip = false
    field.rule = rule
form.addField(field)

/** А можно добавить поле и так. */
form.createField('login', 'Enter your login')

/** Слушаем консольку. */
form.listen()
```
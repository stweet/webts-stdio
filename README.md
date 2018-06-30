# webts-stdio
Юзаем как то так:
```javascript
import { StdioForm } from "."

/** Собственно сам виновник торжества. */
let form: StdioForm = new StdioForm()

/** Добавляем поле. */
form.createField('login', 'Enter your login')

/** Ожидаем пользовательский ввод. */
form.listen()
```
Можно использовать собственные поля
```javascript
import { StdioForm, IStdioField, StdioField } from "."

let field: IStdioField = new StdioField('email', "Enter your email")
    field.rule = /\w+@\w+\.\w{2,}/
    field.skip = false

let form: StdioForm = new StdioForm()
    form.addField(field)
    form.listen()
```
Собственный обработчик вывода
```javascript
import { IStdioForm, StdioForm, IStdioField } from "."

let form: IStdioForm = new StdioForm()

/** Определяем обработчика вывода. */
form.handler = (fields: IStdioField[]) => {
    // "console.table" only node v10.x and ^
    console.table(fields, ['label', 'val'])
} 
```
А так же обрабатывать кастомные поля
```javascript
import { IStdioRule, IStdioField, StdioField } from "."

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

let field: IStdioField = new StdioField('email', "Enter your email")
    field.rule = rule
```
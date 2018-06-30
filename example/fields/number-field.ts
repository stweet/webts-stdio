import { StdioField, IStdioRule } from "../.."

/**
 * 
 */
class NumberField extends StdioField implements IStdioRule {
    
    /**
     * 
     * @param fid 
     * @param label 
     */
    public constructor(fid: string, label: string) {
        super(fid, label)

        // Берём на себя проверку данных
        this.rule = this
        this.val = "0"
    }

    /**
     * Разрешаем вводить только числа.
     * 
     * @param value 
     */
    public test(value: string): boolean {
        if (/^\d+$/.test(value)) return true

        console.log('Вы должны ввести число!')
        return false
    }
}

export { NumberField }
export class Stack {

    constructor() {
        this.array = []
        this.size //default stack size
        this.current = 0
        this.infinity = false
        this.valuesAdded = 0 //shows all values added (not including "")
    }

    empty() {
        if (this.array.length == 0) {
            return "Stack is empty"
        } else {
            return "Stack is not empty"
        }
    }

    getCurrent() {
        return this.current
    }

    getStack() {
        return this.array
    }

    insert(element) {
        if (element.length <= 2 && element.length > 0) {
            if (this.infinity) {
                this.size += 1
                this.array.push(element)
                this.current = this.array.length - 1
                this.valuesAdded += 1
            } else {
                if (this.valuesAdded == this.size) {
                    return "Stack overflow!";
                } else if (this.array.length != this.size) {
                    // adds another element if size is still not equal to the length
                    this.array.push(element)
                    this.current = this.array.length - 1
                    this.valuesAdded += 1
                } else {
                    // finds the index of the first "" and swaps it to the user's input
                    this.valuesAdded += 1
                    this.current = this.array.length - 1
                }
            }
        } else {
            return
        }
    }

    remove() {
        if (this.infinity) {
            if (this.array.length <= 0) {
                return "Stack underflow"
            } else {
                this.size -= 1
                this.array.pop()
                this.valuesAdded -= 1
                this.current = this.array.length - 1
            }
        } else {
            if (this.array.length == 0) {
                return "Stack underflow"
            } else {
                // change element to be removed to an empty string
                this.array.pop()
                this.valuesAdded -= 1
                this.current = this.array.length - 1
            }
        }
    }
}
export class Stack {

    stack = []
    size
    current = 0
    valuesAdded = 0 //shows all values added (not including "")
    hasNoSize = false

    empty() {
        if (this.stack.length == 0) {
            return true
        } else {
            return false
        }
    }

    getCurrent() {
        return this.current
    }

    getStack() {
        return this.stack
    }

    getSize() {
        return this.size
    }

    insert(element) {

        if (this.hasNoSize) {
            this.size += 1
            this.stack.push(element)
            this.current = this.stack.length - 1
            this.valuesAdded += 1
        }

        if (this.stack.length != this.size) {
            // adds another element if size is still not equal to the length
            this.stack.push(element)
            this.current = this.stack.length - 1
            this.valuesAdded += 1
        }
    }

    overflow() {

        if (this.hasNoSize) {
            return false
        }

        if (this.valuesAdded == this.size) {
            return true;
        }

        return false
    }

    playWithNoSize(approved) {
        if (approved) {
            this.hasNoSize = true
        } else {
            this.hasNoSize = false
        }
    }

    remove() {

        if (this.hasNoSize) {
            this.size -= 1
            this.stack.pop()
            this.valuesAdded -= 1
            this.current = this.stack.length - 1
        } else {
            this.stack.pop()
            this.valuesAdded -= 1
            this.current = this.stack.length - 1
        }
    }

    setSize(size) {
        this.size = size
    }

    underflow() {

        if (this.stack.length == 0) {
            return true
        }

        return false

    }
}
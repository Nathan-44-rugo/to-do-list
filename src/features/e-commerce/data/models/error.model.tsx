export class ReceivedError extends Error{
    status?: number
    constructor(message: string, status?: number){
        super(message)
        this.status = status

        Object.setPrototypeOf(this, ReceivedError.prototype);
    }
}
export class NotFoundError extends ReceivedError{
    constructor(message: string = 'Resources not found') {
        super(message, 404)

        this.name = 'Not Found'

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}

export class BadRequestError extends ReceivedError{
    constructor(message: string = 'A network error occurred. Please try again later.') {
        super(message, 400)

        this.name = 'Bad Request'

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
}
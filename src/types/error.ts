import { CODE, MESSAGE } from "utils/constants"

export class NotFoundError extends Error {
    public readonly code: number
    constructor(message?: string) {
        super(message || MESSAGE.NOT_FOUND)
        this.code = CODE.NOT_FOUND
        this.name = 'NotFoundError'
    }
}

export class ConflictError extends Error {
    public readonly code: number
    constructor(message?: string) {
        super(message || MESSAGE.CONFLICT)
        this.code = CODE.CONFLICT
        this.name = 'ConflictError'
    }
}

export class BadRequestError extends Error {
    public readonly code: number
    constructor(message?: string) {
        super(message || MESSAGE.BAD_REQUEST)
        this.code = CODE.BAD_REQUEST
        this.name = 'BadRequestError'
    }
}

export class InternalServerError extends Error {
    public readonly code: number
    constructor(message?: string) {
        super(message || MESSAGE.INTERNAL_SERVER)
        this.code = CODE.INTERNAL_SERVER
        this.name = 'InternalServerError'
    }
}

export class MethodNotAllowError extends Error {
    public readonly code: number
    constructor(message?: string) {
        super(message || MESSAGE.METHOD_NOT_ALLOW)
        this.code = CODE.METHOD_NOT_ALLOW
        this.name = 'MethodNotAllowError'
    }
}
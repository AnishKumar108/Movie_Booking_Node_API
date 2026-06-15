const USER_ROLE = {
    customer:"CUSTOMER",
    admin:"ADMIN",
    client:"CLIENT"
}

const USER_STATUS = {
    approved:"APPROVED",
    pending:"PENDING",
    rejected:"REJECTED"
}

const STATUS_CODES = {
    OK:200,
    CREATED:201,
    UNAUTHORISED:401,
    BAD_REQUEST:400,
    NOT_FOUND:404,
    INTERNAL_SERVER_ERROR:500,
    FORBIDDEN:403,
    UNPROCESSABLE_ENTITY:422
}

const BOOKING_STATUS = {
    processing:"IN_PROCESS",
    successfull:"SUCCESSFULL",
    cancelled:"CANCELLED"
}

const PAYMENT_STATUS = {
    pending:"PENDING",
    successfull:"SUCCESSFULL",
    failed:"FAILED"
}

module.exports = {
    USER_ROLE,USER_STATUS,STATUS:STATUS_CODES,BOOKING_STATUS,PAYMENT_STATUS
}
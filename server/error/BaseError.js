var HttpStatus = require('http-status-codes');

class BaseError extends Error {
    constructor(name, httpCode, description, isOperational) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
 
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
 
        Error.captureStackTrace(this);
    }
}

class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpCode, isOperational, description);
    }
}

/**
 * 
2XX Success
4.1. 200 OK
4.2. 201 Created
4.3. 202 Accepted - async processing
4.4. 204 No Content - delete

4XX Client errors
5.1. 400 Bad Request 
5.2. 401 Unauthorized - 권한 
5.3. 403 Forbidden -폴더
5.4. 404 Not Found
5.5. 405 Method Not Allowd
5.6. 409 Conflict - 게시글 혹은 잠금 데이터 삭제 시 불가
5.7. 429 Too many Requests
HTTP/1.1 429 Too Many Requests
Retry-After: 3600 < - header

 

5XX Server errors
 */

//TODO 
const HttpStatusCode = {
    OK: HttpStatus.OK,
    BAD_REQUEST_NOT_VALID: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    Unauthorized: 401
};

class HTTP400Error extends BaseError {
    constructor(description = 'bad request') {
        super('NOT FOUND', HttpStatusCode.BAD_REQUEST, true, description);
    }
}

   
module.exports = {
    HTTP400Error: HTTP400Error,
    APIError: APIError,
    BaseError: BaseError,
    HttpStatusCode: HttpStatusCode
};
  

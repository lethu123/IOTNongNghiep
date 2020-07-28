class ResourceNotFoundError extends Error {
  constructor(model) {
    super();
    this.name = "ResourceNotFoundError";
    this.message = `${model} not found`;
    this.statusCode = 404,
    this.payload = {
      message: `${model} not found`
    };
  }
}

class InternalServerError extends Error {
  constructor(status) {
    super();
    this.name = "InternalServerError";
    this.message = 'Internal Server Error';
    this.statusCode = status;
    this.payload = {
      message: 'Internal Server Error'
    };
  }
}

class UniqueFieldError extends Error {
  constructor(field) {
    super();
    this.name = "UniqueFieldError";
    this.message = 'Invalid unique field';
    this.statusCode = 400;
    this.payload = { 
      message: `"${field}" must be unique`,
      path: [ field ],
      type: 'any.unique',
      context: {
        label: field,
        key: field 
      }
    };
  }
}

class BadRequestError extends Error {
  constructor() {
    super();
    this.name = "BadRequestError";
    this.message = 'Bad Request Error';
    this.statusCode = 400;
    this.payload = { 
      message: 'Email or Password incorrect',
    };
  }
}

class BadPasswordError extends Error {
  constructor() {
    super();
    this.name = "BadPasswordError";
    this.message = 'Bad Password Error';
    this.statusCode = 400;
    this.payload = { 
      message: 'Password incorrect',
    };
  }
}

class BadReservationDateError extends Error {
  constructor(roomName, startDate, endDate) {
    super();
    this.name = "BadReservationDateError";
    this.message = 'Bad Reservation Date Error';
    this.statusCode = 400;
    this.payload = { 
      message: `"From ${startDate}" to ${endDate} room ${roomName} is reserved`,
      path: [ 'startDate', 'endDate' ],
      type: 'any.reserved',
      context: {
        label: ['startDate', 'endDate'],
        key: ['startDate', 'endDate'],
        value: [startDate, endDate]
      }
    };
  }
}

class BadTypeOrStatusError extends Error {
  constructor(tableName, field, value) {
    super();
    this.name = "BadTypeOrStatusError";
    this.message = 'Bad Type Or Status Error';
    this.statusCode = 400;
    this.payload = { 
      message: `${tableName} ${field} "${value}" does not exist`,
      path: [ field ],
      type: `any.${tableName}${field}`,
      context: {
        label: field,
        key: field 
      }
    };
  }
}

class BadStartAndEndDateError extends Error {
  constructor(nowDate) {
    super();
    this.name = "BadStartAndEndDateError";
    this.message = 'Bad Start And End Date Error';
    this.statusCode = 400;
    this.payload = { 
      message: `Start date, end date must be greater than or equal to ${nowDate} and time reservation must be greater than 23 hours`,
      path: [ 'startDate', 'endDate' ],
      type: 'any.reserved.date',
      context: {
        label: ['startDate', 'endDate'],
        key: ['startDate', 'endDate']
      }
    };
  }
}

module.exports = {
  ResourceNotFoundError,
  UniqueFieldError,
  InternalServerError,
  BadRequestError,
  BadPasswordError,
  BadReservationDateError,
  BadTypeOrStatusError,
  BadStartAndEndDateError
}
// API Answers

export const buildSuccessAnswer = function({statusCode=200, data}) {
  return {
    status : "success",
    status_code : statusCode,
    data
  }
}

export const buildErrorAnswer = function({statusCode=500, message, data}) {
  return {
    status : "error",
    status_code : statusCode,
    data,
    message
  }
}

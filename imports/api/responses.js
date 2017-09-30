// API Answers

export const buildSuccessAnswer = ({statusCode=200, data}) => ({
  statusCode,
  status : "success",
  data
})

export const buildErrorAnswer = ({statusCode=500, message, data}) => ({
  statusCode,
  body : {
    status : "error",
    data,
    message
  }
})

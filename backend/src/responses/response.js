//template response
const response = ( statusCode, massage, data,  res ) => {
    res.status(statusCode).json({
        payload: {
            status: statusCode,
            massage: massage,
            data: data,
        }
    })

    //New Template for next project
    // res.status(statusCode).json({
    //     success: statusCode < 400,
    //     message,
    //     data,
    // });
}


export default response
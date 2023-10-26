
const handleResponse = ({
    res,
    statusCode = 200,
    msg = 'Success',
    result = {}
}) => {
    res.status(statusCode).send({result, msg});
};

const handleError = ({
    res,
    statusCode = 500,
    err = 'Error',
    result = {}
}) => {
    res.status(statusCode).send({result, msg: err});
};

const handleUnAuthorized = ({
    res, 
    err = 'Unauthorized'
}) => {
    res.status(401).send({msg: err.message ? err.message : err });
};

module.exports = { handleResponse, handleError, handleUnAuthorized };
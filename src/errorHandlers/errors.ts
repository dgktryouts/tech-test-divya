import { constants } from 'http2';

export const errorHandlingMiddleware = (err, req, res, next) => {
    res.status(err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(err);
};

export function unauthorizedStatus(res) {
    res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        "message": 'Invalid Token'
    });
}
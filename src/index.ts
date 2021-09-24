import express from 'express';
import { constants } from 'http2';
import { APP_CONSTANTS } from './constants';
import { errorHandlingMiddleware, unauthorizedStatus } from './errorHandlers/errors';
import { decodeAuthenticationHeader, verifyDecodedToken } from './handlers/userHandler';
const app = express();
const port = 3000;


app.use(express.json());

app.use(errorHandlingMiddleware);

app.get('/status', (req, res) => {
    res.status(constants.HTTP_STATUS_OK).end();
});
app.head('/status', (req, res) => {
    res.status(constants.HTTP_STATUS_OK).end();
});

/**
 * @description - Get the authorization header. Validate the header and check if the header begins with 'Basic'.
 * Call functions to decode and verify if the username and password is present in the given Users list.
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {express.NextFunction}
 */

const basicAuthHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader || authHeader.indexOf('Basic ') === -1) {
            unauthorizedStatus(res);
            return;
        }
        const decodedAuthHeader = decodeAuthenticationHeader(authHeader);
        if (!decodedAuthHeader) {
            unauthorizedStatus(res);
            return;
        }
        const [userName, userPassword] = decodedAuthHeader.split(':');
        const userVerificationStatus = verifyDecodedToken(userName, userPassword);

        if (userVerificationStatus === APP_CONSTANTS.VALID_USER) {
            next();
        } else if (userVerificationStatus === APP_CONSTANTS.INVALID_USER) {
            unauthorizedStatus(res);
        } else {
            res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                "message": 'Internal server error'
            });
        }
    } catch (err) {
        return next(err);
    }
}

app.get('/basic-auth', basicAuthHandler, (req: express.Request, res: express.Response) => {
    res.status(constants.HTTP_STATUS_OK).json({
        status: 'ok',
    });
})

export const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
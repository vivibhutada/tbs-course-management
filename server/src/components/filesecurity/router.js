
const responseCode = require('../../config/responseCode');
module.exports = function (iocContainer) {
    const {
        express,
        controller,
    } = iocContainer; 

    const router = express.Router();

    router.get('/decryptfile/:folder/:file', controller.decodedFile(iocContainer));
    
    router.all('*', (req, res) => {
        return commonHelper.sendErrorResponse(res,responseCode.serverError.code,'fail',responseCode.serverError.msg,["Invalid method type"]);
    });
    return router;
}
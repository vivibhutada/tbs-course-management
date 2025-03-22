
const responseCode = require('../../../config/responseCode');
module.exports = function (iocContainer) {
    const {
        express,
        controller,
    } = iocContainer; 

    const router = express.Router();

    router.get('/list', controller.getAll(iocContainer));
    router.post('/save', controller.save(iocContainer));
    router.post('/update', controller.update(iocContainer));
    router.all('*', (req, res) => {
        return commonHelper.sendErrorResponse(res,responseCode.serverError.code,'fail',responseCode.serverError.msg,["Invalid method type"]);
    });
    return router;
}
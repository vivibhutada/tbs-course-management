
const responseCode = require('../../config/responseCode');
module.exports = function (iocContainer) {
    const {
        express,
        controller,
    } = iocContainer; 

    const router = express.Router();

    router.post('/list', controller.getAll(iocContainer));
    router.get('/get/:id', controller.getById(iocContainer));
    router.post('/save',controller.save(iocContainer));
    router.post('/update',controller.update(iocContainer));
    router.post('/delete', controller.deleteById(iocContainer));
    router.get('/test', controller.test(iocContainer));
    router.post('/import',controller.importRecord(iocContainer));
    router.get('/get-student-import-samplefile',controller.getSampleFile(iocContainer));
    router.get('/importfailedlist',controller.getImportFailedList(iocContainer));
    router.get('/export-failedlist',controller.exportFailedImportList(iocContainer));
    router.post('/column-security',controller.columnEncryptionDecryption(iocContainer));
    router.post('/updatestatus/:id', controller.updateStatus(iocContainer));
    router.post('/changeprofile',controller.changeProfile(iocContainer));
    router.all('*', (req, res) => {
        return commonHelper.sendErrorResponse(res,responseCode.serverError.code,'fail',responseCode.serverError.msg,["Invalid method type"]);
    });
    return router;
}
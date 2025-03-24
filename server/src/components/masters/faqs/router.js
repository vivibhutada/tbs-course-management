// faqs/router.js
module.exports = function (iocContainer) {
    const {
        express,
        controller,
    } = iocContainer; 

    const router = express.Router();

    router.get('/list', controller.getAll(iocContainer));
    router.get('/get/:id', controller.getById(iocContainer));
    router.post('/save', controller.save(iocContainer));
    router.post('/delete', controller.deleteById(iocContainer));

    return router;
}
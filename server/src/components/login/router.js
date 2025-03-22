module.exports = (iocContainer) => {
  const { express, controller,crypto } = iocContainer;
  const router = express.Router();
  const { authJwt } = require("../../middleware");
  router.post('/checklogin', crypto.cryptoDecrypt(), controller.checklogin(iocContainer));
  router.post('/verifylogin', crypto.cryptoDecrypt(), controller.verifylogin(iocContainer));
  return router;
}

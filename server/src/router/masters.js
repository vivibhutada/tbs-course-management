
const faqRouter = require("../components/masters/faqs");
const countriesRouter = require("../components/masters/countries");

module.exports = function (iocContainer) {
  const { express, } = iocContainer;  
  const router = express.Router();
  router.use('/faqs',faqRouter(iocContainer));
  router.use('/countries',countriesRouter(iocContainer));
  router.get('/', (_req, res) => res.json('Masters Module'));
  return router;
};

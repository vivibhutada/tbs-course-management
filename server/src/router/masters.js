const faqRouter = require("../components/masters/faqs");
const countriesRouter = require("../components/masters/countries");

const cities1Router = require("../components/masters/cities1");
const states1Router = require("../components/masters/states1");
const countries1Router = require("../components/masters/countries1");

module.exports = function (iocContainer) {
  const { express } = iocContainer;
  const router = express.Router();
  router.use("/cities1", cities1Router(iocContainer));
  router.use("/states1", states1Router(iocContainer));
  router.use("/countries1", countries1Router(iocContainer));

  router.use("/faqs", faqRouter(iocContainer));
  router.use("/countries", countriesRouter(iocContainer));
  router.get("/", (_req, res) => res.json("Masters Module"));
  return router;
};

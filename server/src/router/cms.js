// const coursesRouter = require("../components/cms/courses");
// const trainersRouter = require("../components/cms/trainers");
const studentsRouter = require("../components/cms/students");
const enrollmentsRouter = require("../components/cms/enrollments");
// const batchesRouter = require("../components/cms/batches");

const countriesRouter = require("../components/cms/countries");
// const statesRouter = require("../components/cms/states");
// const citiesRouter = require("../components/cms/cities");

module.exports = function (iocContainer) {
  const { express } = iocContainer;
  const router = express.Router();
  // router.use("/courses", coursesRouter(iocContainer));
  // router.use("/trainers", trainersRouter(iocContainer));
  router.use("/students", studentsRouter(iocContainer));
  router.use("/enrollments", enrollmentsRouter(iocContainer));
  // router.use("/batches", batchesRouter(iocContainer));

  router.use("/countries", countriesRouter(iocContainer));
  // router.use("/states", statesRouter(iocContainer));
  // router.use("/cities", citiesRouter(iocContainer));
  router.get("/", (_req, res) => res.json("Cms Module"));
  return router;
};

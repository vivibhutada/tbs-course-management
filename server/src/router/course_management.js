const coursesRouter = require("../components/course_management/courses");

module.exports = function (iocContainer) {
  const { express } = iocContainer;
  const router = express.Router();
  router.use("/courses", coursesRouter(iocContainer));
  router.get("/", (_req, res) => res.json("Course Management Module"));
  return router;
};

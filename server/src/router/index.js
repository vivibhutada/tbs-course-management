const loginRouter = require("../components/login");
const cmsRouter = require("../router/cms");
const mastersRouter = require("../router/masters");
// const studentRouter = require("../components/student");
const rolesRouter = require("../components/admin/roles");
const usersRouter = require("../components/admin/users");
const userrolepermissionRouter = require("../components/admin/userrolepermission");
const { authJwt } = require("../middleware");
// const filesecurityRouter = require("../components/filesecurity");

module.exports = function (iocContainer) {
    const { express } = iocContainer;
    const router = express.Router();
    router.use('/', loginRouter(iocContainer));
    router.use('/cms', cmsRouter(iocContainer));

    router.use('/masters', [authJwt.authenticateToken('masters')], mastersRouter(iocContainer));
    // router.use('/students', [authJwt.authenticateToken('students')], studentRouter(iocContainer));
    router.use('/roles', [authJwt.authenticateToken('roles')], rolesRouter(iocContainer));
    router.use('/users', [authJwt.authenticateToken('users')], usersRouter(iocContainer));
    router.use('/userrolepermission', [authJwt.authenticateToken('userrolepermission')], userrolepermissionRouter(iocContainer));
    // router.use('/filesecurity', [authJwt.authenticateToken('students')], filesecurityRouter(iocContainer));
    router.get('/', (_req, res) => res.json('Common Module'));
    return router;
}
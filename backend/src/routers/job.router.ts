import express from 'express';
import { JobController } from '../controllers/job.controller';

const jobRouter = express.Router();

jobRouter.route("/addJob").post(
    (req,res)=>new JobController().addJob(req,res)
)

jobRouter.route("/getAllJobs").get(
    (req,res)=>new JobController().getAllJobs(req,res)
)

jobRouter.route("/getAllMyJobs").post(
    (req,res)=>new JobController().getAllMyJobs(req,res)
)

jobRouter.route("/getAllMyJobsAsDecorator").post(
    (req,res)=>new JobController().getAllMyJobsAsDecorator(req,res)
)

jobRouter.route("/getAllUnprocessedJobs").get(
    (req,res)=>new JobController().getAllUnprocessedJobs(req,res)
)

jobRouter.route("/acceptJobByDecorator").post(
    (req,res)=>new JobController().acceptJobByDecorator(req,res)
)

jobRouter.route("/denyJobByDecorator").post(
    (req,res)=>new JobController().denyJobByDecorator(req,res)
)

jobRouter.route("/finishJobByDecorator").post(
    (req,res)=>new JobController().finishJobByDecorator(req,res)
)

//MAINTENANC
jobRouter.route("/createMaintenance").post(
    (req,res)=>new JobController().createMaintenance(req,res)
)

jobRouter.route("/getAllMaintenanceUnprocessed").get(
    (req,res)=>new JobController().getAllMaintenanceUnprocessed(req,res)
)

jobRouter.route("/getAllMaintenanceAccepted").get(
    (req,res)=>new JobController().getAllMaintenanceAccepted(req,res)
)

jobRouter.route("/acceptMaintenance").post(
    (req,res)=>new JobController().acceptMaintenance(req,res)
)

jobRouter.route("/denyMaintenance").post(
    (req,res)=>new JobController().denyMaintenance(req,res)
)

export default jobRouter;
import express from 'express';
import { UserController } from '../controllers/user.controller';
import user from '../models/user';


const userRouter = express.Router();


userRouter.route("/login").post(
    (req,res)=>new UserController().login(req,res)
)

userRouter.route("/addUser").post(
    (req,res)=>new UserController().addUser(req,res)
)

userRouter.route("/getByUsername").post(
    (req,res)=>new UserController().getByUsername(req,res)
)

userRouter.route("/getByMail").post(
    (req,res)=>new UserController().getByMail(req,res)
)

userRouter.route("/acceptUser").post(
    (req,res)=>new UserController().acceptUser(req,res)
)

userRouter.route("/denyUser").post(
    (req,res)=>new UserController().denyUser(req,res)
)

//GET ALL

userRouter.route("/getAllUnregistered").get(
    (req,res)=>new UserController().getAllUnregistered(req,res)
)

userRouter.route("/getAllDecorators").get(
    (req,res)=>new UserController().getAllDecorators(req,res)
)

userRouter.route("/getAllOwners").get(
    (req,res)=>new UserController().getAllOwners(req,res)
)

//CHANGE

userRouter.route("/changePassword").post(
    (req,res)=>new UserController().changePassword(req,res)
)

userRouter.route("/changeMail").post(
    (req,res)=>new UserController().changeMail(req,res)
)

userRouter.route("/changeCardNumber").post(
    (req,res)=>new UserController().changeCardNumber(req,res)
)

userRouter.route("/changeFirstname").post(
    (req,res)=>new UserController().changeFirstname(req,res)
)

userRouter.route("/changeLastname").post(
    (req,res)=>new UserController().changeLastname(req,res)
)

userRouter.route("/changeAdress").post(
    (req,res)=>new UserController().changeAdress(req,res)
)

userRouter.route("/changePhoneNumber").post(
    (req,res)=>new UserController().changePhoneNumber(req,res)
)

userRouter.route("/changeImage").post(
    (req,res)=>new UserController().changeImage(req,res)
)

export default userRouter;
import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.router';
import comapnyRouter from './routers/company.router';
import jobRouter from './routers/job.router';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/projekat')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("Uspesno povezivanje sa bazom!")
})

const router = express.Router()
app.use("/", router)

//other routers
router.use('/user', userRouter)
router.use('/company', comapnyRouter)
router.use('/job', jobRouter)

app.use('/profileImages', express.static('./profileImages'))

//app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
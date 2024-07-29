import express from "express"
import cors from "cors"
import jwt from 'jsonwebtoken'
import multer from 'multer'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import path from 'path'
import mongoose from "mongoose"
import { UserModel } from "./models/UserModel.js"
import { CreatePost } from "./models/PostModel.js"
const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(cors({
    origin :["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
mongoose.connect("mongodb://127.0.0.1:27017/Blog-Application")


app.use(cookieParser())

 const VerifyUser =(req,res,next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json("Token is missing")
    } else{
        jwt.verify(token,'jwt_secret_key',(err, decoded)=>{
            if(err){
                return res.json("The token is wrong")
            }else{
                req.email = decoded.email;
                req.username = decoded.username;
                next()
            }
        })
    }

}
app.get("/",VerifyUser, (req ,res )=>{
return res.json({email : req.email, username: req.username})
})
app.post("/register",(req, res)=>{
const {username, email, password} = req.body
bcrypt.hash(password ,12).then(hash =>{
    UserModel.create({username, email, password:hash}) 
    .then(user => res.json(user))
.catch(error => console.log(error))
})    
})
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.error('Error comparing passwords:', err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    if (result) {
                        // Generate JWT token
                        const token = jwt.sign(
           { email : user.email, username : user.username }, 'jwt_secret_key',  { expiresIn: '1d' }  ) 
           res.cookie("token",token);
                        return res.json("success");
                    } else {
                        return res.status(401).json({ error: 'Invalid credentials' });
                    }
                });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(err => {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        });
});

 app.get("/logout", (req , res)=>{
    res.clearCookie("token")
    return res.json("success")
 })
 
 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

app.post("/create", VerifyUser, upload.single('file'), (req, res) => {
    CreatePost.create({
        title: req.body.title,
        description: req.body.description,
        file: req.file.filename
    })
    .then(result => res.json('success'))
    .catch(err => res.json(err));
});
app.get('/getrecords' , (req,res)=>{
    CreatePost.find()
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

app.get("/getpostbyid/:id", (req,res)=>{
    const id = req.params.id
    CreatePost.findById({_id: id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

app.put("/editpost/:id",(req,res)=>{
    const id = req.params.id;
    CreatePost.findByIdAndUpdate(
        {_id: id},{
            title: req.body.title,
            description: req.body.description }
    ).then(res => res.json("success"))
    .catch(err => res.json(err))
})
app.delete('/deletepost/:id', (req, res) => {
  CreatePost.findByIdAndDelete({_id :req.params.id})
  .then(result => res.json("success"))
  .catch(err => console.log(err))
});
app.listen(3001 ,()=>{
console.log("Port is running")
})

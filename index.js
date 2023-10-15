//import env variables
require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import connection from "./database/connection";
import routeConfig from "./config/route.config";

//Import APIs
import Auth from "./api/auth";
import Posts from "./api/posts";

import passport from "passport";

//create server instance 
const app = express();
//parse only json requests
app.use(express.json());
//Parse only url-encoded bodies
app.use(express.urlencoded({extended: false}));
//Allow access to other server resources
app.use(cors());
//Additional layer of security
app.use(helmet());

app.use(passport.initialize());

routeConfig(passport);

app.use('/auth', Auth);
app.use('/posts', Posts);

app.get('/', (req,res) => {
    res.json({message: "Home page"})
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => connection().then(() => console.log(`server up and running on http://localhost:${PORT}`)).catch(() => console.log('Connection failed')));
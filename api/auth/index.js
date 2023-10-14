import express from "express";
import { UserModel } from "../../database/allModels";
import { validateSignin, validateSignup } from "../../validation/auth";


const Router = express.Router();

Router.post('/signup', async (req,res) => {
    try{
        await validateSignup(req.body.credentials);
        //Check user exists
        await UserModel.findEmail(req.body.credentials);
        //create user and generate token
        const user = await UserModel.create(req.body.credentials);
        const token = await user.generateToken();

        return res.status(200).json({user, token});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});

Router.post('/signin', async (req,res) => {
    try{
        await validateSignin(req.body.credentials);
        //authenticate credentials
        const user = await UserModel.findEmailAndPassword(req.body.credentials);
        const token = await user.generateToken();

        return res.status(200).json({user, token});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
    
});

Router.get('/logout', (req,res) => {
    req.logOut((err) => {
        if(err) return res.json({error: err.message});
        res.redirect('/');
    });
});


export default Router;

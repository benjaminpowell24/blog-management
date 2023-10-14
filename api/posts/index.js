//CRUD operations on posts
import express from "express";
import { PostModel } from "../../database/allModels";
import passport from "passport";
import { validatePost } from "../../validation/post";

const Router = express.Router();

//Create a post by user id
Router.post('/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try{
        await validatePost(req.body.post);

        const user = req.user;
        const { post } = req.body;

        const newPost = await PostModel.create({author: user._id, post: post});

        return res.status(200).json({post: newPost});
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
    
});

// View all post created by authorized user
Router.get('/', passport.authenticate('jwt', { session: false }), async (req,res)=> {
    try{
        const user = req.user;
        const posts = await PostModel.find({author: user._id});

        if(!posts){ 
            return res.status(404).json({message: `No post found`});
        }

        return res.json({post: posts});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});

//View single post created by authorized user
Router.get('/:_id', passport.authenticate('jwt', { session: false }), async (req,res)=> {
    try{
        const user = req.user;
        const {_id} = req.params;
        const post = await PostModel.findOne({_id: _id});

        if(!post){ 
            return res.status(404).json({message: `No post found`});
        }

        if(post.author.toString() !== user._id.toString()){
            return res.status(403).json({error: `Not authorized to view this post`});
        }

        return res.json({post: post});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});

//Update a post created by authorized user
Router.put('/update/:_id', passport.authenticate('jwt', { session: false }), async (req,res) => {
    try{
        await validatePost(req.body.post);

        const user = req.user;
        const {_id} = req.params;
        const update = req.body.post;
        
        const post = await PostModel.findOne({_id: _id});

        if(!post){
            return res.status(404).json({message: `No post found`});
        }

        if(post.author.toString() !== user._id.toString()){
            return res.status(403).json({error: `Not authorized to update this post`});
        }

        const updatedPost = await PostModel.findOneAndUpdate({_id: _id}, {$set: {post: update}}, {new: true});

        return res.status(200).json({post: updatedPost});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});

//Delete a post created by authorized user
Router.delete('/delete/:_id', passport.authenticate('jwt', { session: false }), async (req, res)=> {
    try{
        const {_id} = req.params;
        const user = req.user;

        const post = await PostModel.findOne({_id: _id});

        if(!post){
            return res.status(404).json({message: `No post found`});
        }

        if(post.author.toString() !== user._id.toString()){
            return res.status(403).json({error: `Not authorized to delete this post`});
        }

        const deletedPost = await PostModel.findByIdAndRemove(_id);

        return res.json({post: deletedPost});
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
});


export default Router;
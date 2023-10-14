import mongoose  from "mongoose";
//connect to mongodb database
export default async() => {
    return mongoose.connect(process.env.MONGO_URI);
}
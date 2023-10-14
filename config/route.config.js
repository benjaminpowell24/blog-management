import JwtPassport from "passport-jwt";

import { UserModel } from "../database/allModels";

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;


const options = {};
options.secretOrKey = "Blog";
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

export default (passport) => {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                const user = await UserModel.findById(jwt_payload.user);
                if (!user) return done(null, false);

                return done(null, user );
            } catch (err) {
                throw new Error(err);
            }
        })
    );
}
const express = require("express");
import {z} from "zod";
const {User} = require("../db.js);
conts {authMiddleware} = require("../middleware.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = express.Router();

const app = express();

const signupBody = z.object( {
username: z.string().min(3).max(30).trim().toLowerCase(),
firstName: z.string().max(50).trim(),
lastName: z.string().max(50).trim(),
password: z.string().min(6)
});

router.post("/signup", async(req,res)=> {
const userDetails = req.body();
const {success} = signupBody.safeParse(req.body);
if(!success) {
return res.status(411).json({
message: "Incorrect inputs"
})
}

const user = await User.findOne({username: req.body.username});
if(user) {
return res.status(411).json({
message: "User already exists"
})
}

const createdUser = await User.create(userDetails);
const userID = createdUser._id;

const token = jwt.sign({
userID
}, JWT_SECRET);

res.json({
message: "User created successfully",
token: token
})

});

const signinBody = zod.object({
username: zod.string().email(),
password: zod.string()
})

router.post("/signin", async (req, res) => {
const { success } = signinBody.safeParse(req.body)
if (!success) {
return res.status(411).json({
message: "Email already taken / Incorrect inputs"
})
}

const user = await User.findOne({
username: req.body.username,
password: req.body.password
});

if (user) {
const token = jwt.sign({
userId: user._id
}, JWT_SECRET);

res.json({
token: token
})
}


res.status(411).json({
message: "Error while logging in"
})
});

const updateBody = zod.object({
password: zod.string().optional(),
firstName: zod.string().optional(),
lastName: zod.string().optional(),
})

router.put("/user", authMiddleware, async (req,res) => {
const { success } = updateBody.safeParse(req.body)
if (!success) {
res.status(411).json({
message: "Error while updating information"
})
}
const updatedDoc = await User.findOneAndUpdate({_id:req.userId},req.body)
if(updatedDoc)
res.json({
message: "Updated successfully"
});
else
res.json({
message: "Error while updating information"
});
});

router.get("/bulk", authMiddleware, async(re, res) => {
const filter = req.query.filter || "";
const users = await User.find({
$or: [{
firstName: {
"$regex": filter
}
}, {
lastName: {
"$regex": filter
},

}]
})
res.json({
users.map(user=> ({
username: user.username,
firstName: user.firstName,
lastName: user.lastName,
_id: user.i=_id
}))
})
});







module.exports = router;

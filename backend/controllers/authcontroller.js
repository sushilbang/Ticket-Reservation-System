const User = require('../models/User');
//why do we require dotenv config here??
require('dotenv').config();

//Register User
//what is async (req,res)
exports.register = async (req,res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            //print message
            msg: 'Please enter all fields'
        });
    }

    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                //user already exists in the database
                msg: 'User already exists'
            });
        }

        user = new User({name, email, password});
        //What does this line do?
        await user.save();
        res.status(201).json({
            msg: 'User registered successfully'
        });
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//Login User
exports.login = async (req,res)=>{
    const {email,password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'Invalid Credentials'
            });
        }
        if(password !== user.password){
            return res.status(200).json({
                msg: 'Invalid Credentials'
            });
        }

        res.status(200).json({
            msg: 'Login Successful'
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
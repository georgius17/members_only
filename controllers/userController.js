const Message = require('../models/message');
const User = require('../models/user');
const async = require('async');
const mongoose = require('mongoose');
const { body,validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");

exports.sign_in_get = (req, res, next) => {
    res.render('sign-in', { title: 'Sign in' });
};   

exports.sign_up_get = (req, res, next) => {
    res.render('sign-up', { title: 'Sign up' });
};

exports.sign_up_post = [
    body('firstname', 'First name must not be empty.').trim().isLength({ min: 1 }),
    body('lastname', 'Last name must not be empty.').trim().isLength({ min: 1 }),
    body('username', 'Username must not be empty.').trim().isLength({ min: 3 }),
    body('password', 'Password must not be empty.').trim().isLength({ min: 7 }),
    body('confirmpassword', 'You must confirm the password').trim().isLength({ min: 7 }),
    body('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() || req.body.password !== req.body.confirmpassword ){
            res.render('sign-up', { title: 'Sign up', errors: errors.array() });
            return
        } else {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) return next(err);
                console.log('HASHED PW:')
                console.log(hashedPassword)
                let user = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    password: hashedPassword,
                    membership: false,
                    admin: false
                });
                user.save (err => {
                    if (err) return next(err);
                    console.log('SAVING')
                    res.redirect('/sign-in')
                })
        })}
    }
];

exports.become_member_get = (req, res, next) => {
    if (req.user.membership || req.user.admin) {
        res.redirect('/');
        return
    }
    res.render('become-member', { title: 'Become a member', user: req.user });
}

exports.become_member_post = [
    body('answer', 'Answer is 10 characters long').trim().isLength({ min: 1 }),
    body('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() || req.body.answer !== process.env.MEMBER_CODE){
            let errorsArray = errors.array();
            if(req.body.answer !== process.env.MEMBER_CODE){
                errorsArray.push({
                    value: '',
                    msg: 'You have entered wrong answer!',
                    param: 'answer',
                    location: 'body'
                });
            }
            res.render('become-member', { title: 'Become a member', user: req.user, errors: errorsArray });
            return
        } else {
            let user = new User({
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                username: req.user.username,
                password: req.user.password,
                membership: true,
                admin: false,
                _id: req.user._id
            })
            User.findByIdAndUpdate(req.user._id, user, {}, (err, theuser) => {
                if (err) return next(err);
                res.redirect('/')
            })
        }
    }
]

exports.become_admin_get = (req, res, next) => {
    if (req.user.admin) {
        res.redirect('/');
        return
    }
    res.render('become-admin', { title: 'Become an admin', user: req.user });
}

exports.become_admin_post = [
    body('answer', 'Answer is longer than one character').trim().isLength({ min: 1 }),
    body('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() || req.body.answer !== process.env.ADMIN_CODE){
            let errorsArray = errors.array();
            if(req.body.answer !== process.env.ADMIN_CODE){
                errorsArray.push({
                    value: '',
                    msg: 'You have entered wrong answer!',
                    param: 'answer',
                    location: 'body'
                });
            }
            res.render('become-admin', { title: 'Become an admin', user: req.user, errors: errorsArray });
            return
        } else {
            let user = new User({
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                username: req.user.username,
                password: req.user.password,
                membership: true,
                admin: true,
                _id: req.user._id
            })
            User.findByIdAndUpdate(req.user._id, user, {}, (err, theuser) => {
                if (err) return next(err);
                res.redirect('/')
            })
        }
    }
]

const Message = require('../models/message');
const User = require('../models/user');
const async = require('async');
const mongoose = require('mongoose');
const { body,validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const moment = require('moment');

exports.index = (req, res, next) => {
    Message.find().populate('user').exec((err, results) => {
        if (err) return next(err);
        res.render('index', { title: 'Members only', user: req.user, messages: results });
    })
}


exports.create_message_get = (req, res, next) => {
    res.render('create-message', { title: 'Create a message', user: req.user })
}

exports.create_message_post = [
    body('title', 'Titlee must not be empty.').trim().isLength({ min: 1 }),
    body('message', 'You have to type your message. ').trim().isLength({ min: 1 }),
    body('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.render('create-message', { title: 'Create a message', user: req.user, errors: errors.array() });
            return
        } else {
            let message = new Message({
                title: req.body.title,
                timestamp: moment(),
                text: req.body.message,
                user: req.user
            }).save (err => {
                if (err) return next(err);
                res.redirect('/');
            })
        }
    }
]

exports.message_delete_get = (req, res, next) => {
        if (req.user.admin){
            Message.findByIdAndRemove(req.params.id, (err) => {
                if (err) return next(err);
                res.redirect('/');
            })
        } else {
            res.redirect('/');
        }
    
}

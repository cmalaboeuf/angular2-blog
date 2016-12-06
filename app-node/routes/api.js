var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Page = require('../models/pages.js');
var adminUser = require('../models/admin-users.js');
var http = require("http");

router.get('/pages', function (req, res) {
    return Page.find(function (err, pages) {
        if (!err) {
            return res.send({ "pages": pages });
        } else {
            return res.send(500, err);
        }
    });
});
router.get('/pages/:id', function (req, res) {
    return Page.findOne(function (err, page) {
        if (!err) {
            return res.json(page);
        } else {
            return res.send(500, err);
        }
    });
});
router.post('/pages', function (req, res) {
    var page = new Page({
        title: req.body.title,
        url: req.body.url,
        content: req.body.content,
        menuIndex: req.body.menuIndex,
        date: new Date(Date.now())
    });

    page.save(function (err) {
        if (!err) {
            res.status(200);
            res.json(page)

        } else {
            res.status(500);
            res.json(err);
        }
    });
});

router.post('/pages/:id', function (req, res) {
    var id = req.params.id;
    Page.update({
        _id: id
    }, {
            $set: {
                title: req.body.title || "",
                url: req.body.url || "",
                content: req.body.content || "",
                menuIndex: req.body.menuIndex || "",
                date: new Date(Date.now())
            }
        }).exec();
    res.status(200)
    return res.send();
});
router.delete('/pages/:id', function (req, res) {
    var id = req.params.id;
    Page.remove({
        _id: id
    }, function (err) {
        return console.log(err);
    });
    res.status(200)
    return res.send();
});

module.exports = router;
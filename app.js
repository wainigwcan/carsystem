var express = require("express");
var webpack = require("webpack");
var mongoose = require("mongoose");
var url = require("url");
var app = express();
var fs = require("fs");

//数据库
mongoose.connect("mongodb://test:test1234@cluster0-shard-00-00-oagmm.mongodb.net:27017,cluster0-shard-00-01-oagmm.mongodb.net:27017,cluster0-shard-00-02-oagmm.mongodb.net:27017/carsystem?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("数据库连接成功");
    })
var Car = require("./models/Car");
//静态化
app.use(express.static("www"));
//中间件
app.get("/api", function (req, res) {
    //GET请求
    var id = url.parse(req.url, true).query.id;
    var brand = url.parse(req.url, true).query.brand;
    var engine = url.parse(req.url, true).query.engine;
    var color = url.parse(req.url, true).query.color;
    var paifang = url.parse(req.url, true).query.paifang;
    var biansuxiang = url.parse(req.url, true).query.biansuxiang;
    var series_name = url.parse(req.url, true).query.series_name;
    var type = url.parse(req.url, true).query.type;
    var seat = url.parse(req.url, true).query.seat;
    var goumaidate = url.parse(req.url, true).query.goumaidate;
    var detail = url.parse(req.url, true).query.detail;
    var km = url.parse(req.url, true).query.km;
    var price = url.parse(req.url, true).query.price;
    var page = url.parse(req.url, true).query.page;
    var pagesize = url.parse(req.url, true).query.pagesize;
    var sortby = url.parse(req.url, true).query.sortby || "id";
    var sortDirec = url.parse(req.url, true).query.sortDirec || 1;

    //最终要在数据中查找的条件
    var searchJSON = {}

    //这个查找条件存在了，我们就加上这个条件。
    if (id) {
        searchJSON["id"] = id;
    }
    if (brand) {
        searchJSON["brand"] = brand;
    }
    if (engine) {
        engine = JSON.parse(engine);
        searchJSON["engine"] = { $in: engine };
    }
    if (color) {
        searchJSON["color"] = color;
    }
    if (paifang) {
        paifang = JSON.parse(paifang);
        searchJSON["paifang"] = { $in: paifang };
    }
    if (biansuxiang) {
        searchJSON["biansuxiang"] = biansuxiang;
    }
    if (series_name) {
        searchJSON["series_name"] = series_name;
    }
    if (type) {
        type = JSON.parse(type);
        searchJSON["type"] = { $in: type };
    }
    if (seat) {
        seat = JSON.parse(seat);
        searchJSON["seat"] = { $in: seat };
    }
    if (km) {
        km = JSON.parse(km);
        searchJSON["km"] = { "$gte": km[0], "$lte": km[1] };
    }
    if (price) {
        price = JSON.parse(price);
        searchJSON["price"] = { "$gte": price[0], "$lte": price[1] };
    }


    Car.count(searchJSON, function (err, amount) {
        Car.find(searchJSON).sort({ [sortby]: sortDirec }).skip((page - 1) * pagesize).limit(Number(pagesize)).lean().exec((err, results) => {
            res.json({ "amount": amount, "results": results });
        });
    });
});
//中间件
app.get("/carimages/:chexing", function (req, res) {
    //结构
    var dajson = {};

    var chexing = req.params.chexing;

    fs.readdir("./www/carimages/" + chexing, function (err, data) {
        data.forEach((color) => {
            dajson[color] = {};

            var data2 = fs.readdirSync("./www/carimages/" + chexing + "/" + color);

            data2.forEach((album) => {
                var data3 = fs.readdirSync("./www/carimages/" + chexing + "/" + color + "/" + album);
                dajson[color][album] = data3;
            });
        });

        //输出大json
        res.json({ "results": dajson });
    });
});

app.listen(3000);
console.log("localhost:3000端口已经监听");

//引入webpack的配置文件
var webpackconfigjs = require("./webpack.config.js");
//运行webpack
webpack(webpackconfigjs, (err, stats) => {
    if (err) console.log(err);
    console.log("webpack已经运行");
});
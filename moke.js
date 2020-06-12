// 使用 Mock
var mock = require('mockjs');
var fs = require("fs");
var _ = require("underscore");
var mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/carsystem", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb://test:test1234@cluster0-shard-00-00-oagmm.mongodb.net:27017,cluster0-shard-00-01-oagmm.mongodb.net:27017,cluster0-shard-00-02-oagmm.mongodb.net:27017/carsystem?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")
    .then(() => {
        console.log("数据库连接成功成功");
    })
var Car = require("./models/Car");
//随机数
var Random = mock.Random;

var carbrandsandseries = {
    "奥迪": {
        "pinyin": "a",
        "country": "德国",
        "series": [
            {
                "series_name": "A3",
                "type": "豪华",
                "seat": 5,
                "colors": {
                    "green": "1024x0_1_q87_autohomecar__wKgFV1kTN5KAJzNxAAY3hCuCZmQ842.jpg",
                    "orange": "1024x0_1_q87_autohomecar__wKjB01kAA1KAGke3AAng7REHqAk325.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKgH0lj-w7aAKfuDAAY63i-YfBQ123.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgH5FkxLziARXeFAAqDQ2azoi0704.jpg"
                },
                "directory": "Audi_A3"
            }
        ]
    },
    "别克": {
        "pinyin": "b",
        "country": "美国",
        "series": [
            {
                "series_name": "verano",
                "type": "商务",
                "seat": 7,
                "colors": {
                    "blue": "1024x0_1_q87_autohomecar__wKgH5laBLE6Ae63GAAiigsv0FGc856.jpg",
                    "brown": "1024x0_1_q87_autohomecar__wKjBy1j55sCAMmc3AAh-lJSzVKQ772.jpg",
                    "gray": "1024x0_1_q87_autohomecar__wKjBzFZtUHmAI0DeAAhr7VyeQOI085.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFWFf8vAuARIfkAAubTezQX-I194.jpg"
                },
                "directory": "Buick_verano"
            }
        ]
    },
    "宝马": {
        "pinyin": "b",
        "country": "美国",
        "series": [
            {
                "series_name": "X3",
                "type": "豪华",
                "seat": 7,
                "colors": {
                    "blue": "800x0_1_q87_autohomecar__wKgH2ljBQpuAVD4JAAWvcYf8IGo616.jpg",
                    "red": "800x0_1_q87_autohomecar__wKjB0FlKIG2AL6YYAAghpDP2710497.jpg"
                },
                "directory": "bmw_330i"
            }
        ]
    },
    "长安": {
        "pinyin": "c",
        "country": "中国",
        "series": [
            {
                "series_name": "CS55PLUS",
                "type": "商务",
                "seat": 4,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKgH1VcODhqAKMR9AAhfRiPim1k023.jpg",
                    "gold": "1024x0_1_q87_autohomecar__wKgH0VhQoOiAHrAdAAbwvn-pLBk877.jpg",
                    "gray": "1024x0_1_q87_autohomecar__wKgHz1lKn9OAcAZbAAzxJcu0qLg675.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKjB0VhOG3iASsojAAkB83yDqZc994.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFVVlDrduALLHpAAfCqwXqhes904.jpg"
                },
                "directory": "chana"
            }
        ]
    },
    "大众": {
        "pinyin": "d",
        "country": "中国",
        "series": [
            {
                "series_name": "速腾",
                "type": "紧凑",
                "seat": 4,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKgFVVf7OwWAW9IfAAHgorzGgQY347.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKgH1VcoY6qANByLAA3IZws8RAk773.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgH3lhGTHGAVCR0AAddthhydwo244.jpg"
                },
                "directory": "volkswagen_suteng"
            }
        ]
    },
    "丰田": {
        "pinyin": "f",
        "country": "日本",
        "series": [
            {
                "series_name": "雷凌双擎E+",
                "type": "豪华",
                "seat": 4,
                "colors": {
                    "blue": "1024x0_1_q87_autohomecar__wKjB0VZO7UyAH9wgAAJAtPzKJ00853.jpg",
                    "gray": "1024x0_1_q87_autohomecar__wKgFVFgjDE-AfSa9AAdb1NMq6o0124.jpg",
                    "red": "1024x0_1_q87_201506180258543445149112.jpg",
                    "silver": "1024x0_1_q87_autohomecar__wKjBxFkUMhKAYrtbAAcUFvFJ8jU670.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKjByFkBp72AWfImAAhsZVY_3vA295.jpg"
                },
                "directory": "Corolla"
            }
        ]
    }
    ,
    "吉利": {
        "pinyin": "j",
        "country": "中国",
        "series": [
            {
                "series_name": "豪越",
                "type": "紧凑",
                "seat": 7,
                "colors": {
                    "brown": "1024x0_1_q87_autohomecar__wKgFWlfRSviAN-0CAAu42Bl1b0A158.jpg",
                    "gold": "1024x0_1_q87_autohomecar__wKgFU1bdvciAWrdWAAfCqlTGrmc071.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKgH2VcK_T-ALdMbAAebOIcc4mA331.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFVVhFJkOAP__YAAwBebTFr5k124.jpg"
                },
                "directory": "geely"
            }
        ]
    },
    "奇瑞": {
        "pinyin": "q",
        "country": "中国",
        "series": [
            {
                "series_name": "艾瑞泽",
                "type": "紧凑",
                "seat": 4,
                "colors": {
                    "blue": "1024x0_1_q87_autohomecar__wKjBzlgFfXCAblIMAAWSysHJMAg530.jpg",
                    "brown": "1024x0_1_q87_autohomecar__wKgFVlbr6ZyAbxk5AAc-lQqggaU266.jpg",
                    "gold": "1024x0_1_q87_autohomecar__wKgFW1bMLYCAH6fEAAdihpVJwu0909.jpg",
                    "orange": "1024x0_1_q87_autohomecar__wKgH5VlQ0R2ACV94AAi-KsaocXs390.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKgH01lBBqCAejcnAAgqQbgc-VM273.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKjBzFlWGaiAX0-VAAd0rpWokTE848.jpg"
                },
                "directory": "AiRuize"
            }
        ]
    }
};

var arr = [];
for (var i = 0; i < 5000; i++) {
    let brand = _.sample(Object.keys(carbrandsandseries), 1)[0];
    let serie = _.sample(carbrandsandseries[brand].series, 1)[0];
    let color = _.sample(Object.keys(serie.colors), 1)[0];
    let colorChineseEnglist = {
        "white": "白色",
        "orange": "橙色",
        "yellow": "黄色",
        "black": "黑色",
        "red": "红色",
        "silver": "银色",
        "green": "绿色",
        "blue": "蓝色",
        "brown": "棕色",
        "gold": "金色"
    }
    arr.push({
        "id": 10000 + i,
        "brand": brand,
        "series_name": serie.series_name,
        "type": serie.type,
        "seat": serie.seat,
        "color": colorChineseEnglist[color] || "其他颜色",
        "colorEnglist": color,
        "image": serie.colors[color],
        "directory": serie.directory,
        "engine": _.sample(["1.0", "1.2T", "1.8", "2.0", "3.0", "4.0"], 1)[0],
        "paifang": _.sample(["国一", "国二", "国三", "国四", "国五"], 1)[0],
        "biansuxiang": _.sample(["手动", "自动"], 1)[0],
        "price": _.random(0.2, 200),
        "km": _.random(0, 1000000),
        "goumaidate": (function () {
            var d = new Date(Random.integer(2010, 2020), Random.integer(0, 11), Random.integer(1, 31));
            return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
        })(),
        "saler": Random.cname(),
        "detail": Random.cparagraph(),
        "province": Random.city(true)
    });
}
// console.log(arr);
Car.remove({}, function (err, data) {
    console.log(`删除${data.n}所有数据`)
    Car.insertMany(arr, function (err, data) {
        console.log(`添加了${data.length}所有数据`)
    })
})

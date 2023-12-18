const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({extended: false});
const Sequelize = require('sequelize');
const TelegramBot = require('node-telegram-bot-api');

const token = '6563008788:AAEQwT6YSdAAMtUHejnObjud31L27l1w2Qc';

const bot = new TelegramBot(token, {polling: true});
const sequelize = new Sequelize("BBdd", "root", "", {
    dialect: 'mysql',
    host: 'localhost',
});
app.use(express.static('public')) 
const post = sequelize.define("post", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    tag: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
app.get('/blogs',  function(req, res) { 
    post.findAll({raw: true,  
    }).then((data)=>{ 
        console.log(data) 
        res.render('blogs.hbs', {posts: data}) 
    }) 
}); 
 
 
app.get('/works', function(req, res) { 
    res.render('works.hbs'); 
}); 
 
app.get('/work-detailed', function(req, res) { 
    res.render('work-detailed.hbs'); 
}); 
 
app.get('/', function (req, res){ 
    res.render("index.hbs") 
}); 
 
app.post('/blogs', urlencoded, function(req, res) {
    const name = req.body.title;
    const date = req.body.data;
    const teg = req.body.tag;
    const text = req.body.text;

  
    Post.create({name: name, date: date, teg: teg, text: text}).then(() => {
        bot.sendMessage(631357676,"Создано: "+name),
        res.redirect('/blogs');  
    })
});

app.get('/delete/:id', function(req, res){
    const postsId = req.params.id;
    post.destroy({
        where: {
            id: postsId
        }
    }).then(() => {
        bot.sendMessage(631357676,"Удалено: "+postsId),
        res.redirect('/blogs');
    })
});


app.post('/update',  urlencoded, function(req, res) {
    let id = req.body.id;
    let title = req.body.title;
    let data = req.body.data;
    let tag = req.body.tag;
    let text = req.body.text;

    post.update({title: title, data: data, tag: tag, text: text}, {
        where: {
            id: id
        }
    }).then(() => {
        bot.sendMessage(631357676,"Обновлено: "+title),
        res.redirect('/blogs');
    })
});

app.get('/update/:id', function(req, res) {
    post.findOne({
        where: {
            id: req.params.id
        }
    }).then((data) => {
        res.render('update.hbs', {posts: data})
    })
});





sequelize.sync().then(() => {
    app.listen(3000);
})
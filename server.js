var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('path').Pool;
var config={
    user:'johanissac',
    database:'johanisac',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:'db-johanissac-27197'
   
}
var app = express();
app.use(morgan('combined'));

var articleone = {
    title: 'Article One',
    heading: 'Article one',
    content: `<p>
            Article
            </p>`
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool=new pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
});

app.get('/jobson', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'head.html'));
});
app.get('/head.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'page.html'));
});
app.get('/article1', function (req, res) {
  res.send(createTemplate(articleone));
});

function createTemplate (data) {
    var title = data.title;
    var content = data.content;
    var htmlTemplate= `
    <html>
        <head>
            <title>
               ${title}
            </title>
        </head>
        <body>
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                ${content} 
            </h3>
        </body>
        
    </html>
    `;
    return htmlTemplate;
}

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

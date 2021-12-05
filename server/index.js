const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const profiles = require('./routes/api/profiles')

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/profiles', profiles)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/,(req,res)=>
        res.sendFile(__dirname+"/public/index.html")
    );
}

const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`server starter on port ${port}`))
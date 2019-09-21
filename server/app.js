const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./dataBase/config');
const mongoose = require('mongoose');
const conatctRouter = require('./interface/contactRouter');
const path = require('path');

/**************
 * connecting Mongo Data base recusive if not connected..
 */
mongoose.Promise = global.Promise;
const connectDB=function(){
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        DBConnected = true;
        console.log('db Connected');
    }).catch(error => {
        console.log('Error while connecting DB connecting Again')
        connectDB();
    })
}
connectDB();

const app = express();
app.use(express.static(path.join(__dirname,'../ui/build')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

conatctRouter(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , '../ui/build/index.html'));
})

app.listen(9000, () => {
    console.log('server is running at port 9000');
});
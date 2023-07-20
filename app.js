const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const bodyparser = require('body-parser');


const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contact_dance');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//make schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

// make model
const contact = mongoose.model('Contact', contactSchema);



// express specific stuff
app.use('/static', express.static('static'))  // for serving static files
app.use(express.urlencoded())

//pug stuff
app.set('view engine', 'pug') // set the tamplate engine as pug
app.set('views', path.join(__dirname, 'views'))  // set views directory


//end points 
app.get('/', (req, res) => {
    const param = {}
    res.status(200).render('Home.pug', param);
})
app.get('/contact', (req, res) => {
    const param = {}
    res.status(200).render('contact.pug', param);
})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This items has been saved in database ")
    }).catch(() => {
        res.status(400).send("Items was not saved in database")
    })
})


//start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})
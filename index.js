import express from "express";
import ejs from "ejs";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.render('index.ejs');
});

app.post('/search', async (req, res)=>{
    if(req.body.job != ""){
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
                query: req.body.job,
                page: '1',
                num_pages: '1',
                date_posted: 'week'
            },
            headers: {
                'X-RapidAPI-Key': '6bf97c7823mshddafd74fa19ebffp1c6719jsnfc0ddd4e7d1d',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            res.render("index.ejs", {data : response.data.data});
        } catch (error) {
            console.error(error);
        }
    }else{
        res.redirect("/");
    }
});

app.get("/search", (req, res)=>{
    res.redirect("/");
});

app.listen(port, ()=>{
    console.log("Running on port "+port);
});

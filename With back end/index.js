import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
const publicPath = path.resolve(path.dirname(''), 'public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/search', async (req, res) => {
    try {
        let countryName = req.query.countryName;
        let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

        const response = await fetch(finalURL);
        const data = await response.json();
        res.render('searchResult.ejs', { data: data[0] });
    } catch (error) {
        console.error(error);
        res.render('error.ejs');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

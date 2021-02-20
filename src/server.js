const express = require('express');
const ejs = require('ejs');
const path = require('path');
const puppteer = require('puppeteer');
const app = express();

const passengers = [
     {
         name: "Joyce",
         flightNumber: 7859,
         time: "18h00",
     },
     {
         name: "Brock",
         flightNumber: 7859,
         time: "18h00",
     },
     {
         name: "Eve",
         flightNumber: 7859,
         time: "18h00",
     },
 ];


app.get('/pdf', async(request, response) => {

    const browser = await puppteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/', {
        waitUntil: "networkidle0"
    });

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
    });

    await browser.close();

    response.contentType("application/pdf");

    return response.send(pdf);
})

app.get('/', (request, response) => {

    const filePafh = path.join(__dirname, "print.ejs");
    ejs.renderFile(filePafh, {passengers}, (err, html) => {
        if(err){
            return response.send('Erro na leitura do arquivo!');
        }
            // Send to browser
            return response.send(html);
        });

    });

app.listen(3000);
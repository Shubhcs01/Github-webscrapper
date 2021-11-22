const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const pdfkit = require('pdfkit');

function getIssuesPageHtml(url,topicName, repoName) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else if(response.statusCode == 404){
            console,log("Page not found");
        } else {
            getIssues(html);
        }
    }
    function getIssues(html) {
        let selTool = cheerio.load(html);
        let issues = selTool(`a[data-hovercard-type="issue"]`);
        let issueArr = [];
        for (let i = 0; i < issues.length; i++) {
            let issueLink = selTool(issues[i]).attr("href");
            if(issueLink != undefined){
                issueArr.push(issueLink);
            }
        }
        console.log(topicName + "/" + repoName);
        console.log("```````````````````````````");
        console.log(issueArr)
        console.log("```````````````````````````");

        let folderPath = path.join(__dirname,topicName);
        dirCreate(folderPath);

        let filePath = path.join(folderPath, repoName+".pdf");
        // fs.writeFileSync(filePath, JSON.stringify(issueArr));  //--> write on a JSON file after converting Array to JSON String. We can't write Array directly.
        let text = JSON.stringify(issueArr);

        //PDF create (https://stackabuse.com/generating-pdf-files-in-node-js-with-pdfkit)
        let pdfDoc = new pdfkit;
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.fillColor('blue').list(issueArr);
        pdfDoc.moveDown(0.5);  //--> Move down a bit to provide space between lists
        pdfDoc.end();
         
    }
}

function dirCreate(filepath){
    if(fs.existsSync(filepath)==false){
        fs.mkdirSync(filepath);
    }
}

module.exports = getIssuesPageHtml;
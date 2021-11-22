const request = require('request');
const cheerio = require('cheerio');
const getIssuesPageHtml = require("./issues");

function getRepoPageHtml(url, topicName) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            getRepoLink(html);
        }
    }

    function getRepoLink(html) {
        let selTool = cheerio.load(html);
        repoArr = selTool("article h3 a.text-bold");
        for (let i = 0; i < 8; i++) {
            let repoLink = selTool(repoArr[i]).attr("href");
            let fullLink = "https://github.com" + repoLink + "/issues";
            let repoName = repoLink.split("/").pop();
            
            getIssuesPageHtml(fullLink, topicName, repoName);
        }
    }
}

module.exports = getRepoPageHtml;
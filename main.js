const url = "https://github.com/topics";

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const getRepoPageHtml = require("./reposPage");

request(url, cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    } else {
        getTopicLinks(html);
    }
}

function getTopicLinks(html){
    let selTool= cheerio.load(html);
    let topicArr = selTool(".topic-box a");
    for (let i = 0; i < topicArr.length; i++) {
      let link = selTool(topicArr[i]).attr("href");
      let topicName = link.split("/")[2];
      console.log(topicName);
      console.log("```````````````````````````");
      let fullLink = "https://github.com" + link;
      getRepoPageHtml(fullLink,topicName);
    }
}


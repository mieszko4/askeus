const https = require('https');
const fetch = require('node-fetch');

const qnaMakerParams = {
    host : 'askeus.azurewebsites.net',
    endpoint_key : "0184cde1-e730-4d8b-91bf-25b31709eedb",
    kb : "cc7ea634-3238-45dc-8445-5bc35dcb59cf",
    top : 1,
    method : () => `/qnamaker/knowledgebases/${qnaMakerParams.kb}/generateAnswer`,
}

async function ask(requestQuestion){
    
    let question = {
        'question': requestQuestion,
        'top': qnaMakerParams.top
    };

    const content = JSON.stringify(question);

    const url = "https://" + qnaMakerParams.host + qnaMakerParams.method();
    console.log(url);
 
    const answer = await fetch(url, {
            method: 'post',
            body:    content,
            headers : {
                'Content-Type' : 'application/json',
                'Content-Length' : Buffer.byteLength(content),
                'Authorization' : 'EndpointKey ' + qnaMakerParams.endpoint_key,
            }
        });

    return answer;
}

module.exports = {
    ask
};
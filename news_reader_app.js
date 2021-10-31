// Use this sample to create your own voice commands
intent('What does this app do?', 'What can I do here?',
      reply('This is a news project.'));

//intent('Start a command', (p) => {
//    p.play({ command: 'testCommand'});
//})

const API_KEY = 'b99e8cf989054638a58b4262e3c0b45f';
let savedArticles = [];
//News by source
intent('Give me the news from $(source* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    if(p.source.value) {
        NEWS_API_URL = ` ${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`
    }
    api.request(NEWS_API_URL,(error,response,body) => {
        const {articles} = JSON.parse(body);
        
        if(!articles.length){
            p.play('Sorry, Please try searching for news from a different source');
            return;
        }
        savedArticles = articles;
        
        p.play({command: 'newHEadlines',articles});
        p.play('Here are the (latest|recent) ${p.source.value} news.');
    });
    
})
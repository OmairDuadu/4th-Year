async function API(){
    //fetching and stroing data then conversion to json
    const response = await fetch("http://jsonplaceholder.typicode.com/posts");
    const post = await response.json()

    //extracting titles only
    const title = post.map(post => post.title)
    
    //filter fro words with titles with more than 6 words
    const six = title.filter(checkWords)
    function checkWords(title){
        let wordCount = title.match(/(\w+)/g).length;
        return wordCount> 6;
    }
}

async function APIMAP(){
    //fetching and stroing data then conversion to json
    const response = await fetch("http://jsonplaceholder.typicode.com/posts");
    const post = await response.json()

    let Map = {};
    //mapping
    let bodies = post.map(post => post.body)

    bodies.map(bodies => bodies.split(" ").map(words => wordsreplace("\\"," ")).map(words => {
        if(Map.hasOwnProperty(words)){Map[words]++;}
        else{Map[words] = 1;}
    }));
    
    //creating frequency map
    let Frequency = Object.keys(Map);
    Frequency.forEach(freq => console.log(freq + " is appears " + Map[freq] + " times."))
}
async function query_anime_ost(name,i=0){
    anime_ost="";
    await fetch("https://www.reddit.com/r/AnimeThemes/search.json?q="+name[i]+"&restrict_sr=on&include_over_18=on&sort=relevance&t=all")
    .then(response => response.json())
    .then(response => JSON.stringify(response))
    .then(response =>  JSON.parse(response))
    .then(response => anime_ost = response)
    if(anime_ost["data"]["children"].length==0){
        if(i >= 3){
            return;
        }
        else{
            console.log("Can't find the anime ost")
            return query_anime_ost(name,i+=1);
        }
            
    }
    if(anime_ost["data"]["children"][0]["data"]["selftext"] !== ""){
        anime_ost = anime_ost["data"]["children"][0]["data"]["selftext"];
        regex = /https.*?webm/;
        anime_ost = anime_ost.match(regex);
        try{
            anime_ost = anime_ost[0];
        }
        catch{
            if(i >= 3){
                return;
            }
            else{
                console.log("Can't find anime ost link")
                return query_anime_ost(name,i+=1);
            }
        }
    }
    else{
        anime_ost = anime_ost["data"]["children"][0]["data"]["url"];
    }
    console.log(name,anime_ost);
    return anime_ost;
}
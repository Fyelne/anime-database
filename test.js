var kitsu_lib;
var user;
async function query_user(){
    await fetch("https://kitsu.io/api/edge/users?filter[name]=Fyelne")
    .then(response => response.json())
    .then(response => JSON.stringify(response))
    .then(response =>  JSON.parse(response))
    .then(response =>  user = response["data"][0]["id"])
    return user
}
async function query_all(){
    await query_user();
    await query_animelist();
    await get_all_anime();
}

var nb_anime;
async function query_animelist(){
    
    console.log("Fyelne's watched anime")
    await fetch("https://kitsu.io/api/edge/users/"+user+"/library-entries?page[limit]=1&filter[status]=completed")
    .then(response => response.json())
    .then(response => JSON.stringify(response))
    .then(response =>  JSON.parse(response))
    .then(response => nb_anime = response["meta"]["count"])
    await fetch("https://kitsu.io/api/edge/library-entries?&filter%5Buser_id%5D="+user+"&filter%5Bkind%5D=anime&filter%5Bstatus%5D=completed&include=anime&page%5Boffset%5D=0&page%5Blimit%5D="+nb_anime+"&sort=-progressed_at")
    .then(response => response.json())
    .then(response => JSON.stringify(response))
    .then(response => kitsu_lib = JSON.parse(response))
}

var all_anime_title;
function get_all_anime(){
    all_anime_title=[];
    for(var i=0; i<kitsu_lib["included"].length;i++){
        var temp = [];
        temp.push(kitsu_lib["included"][i]["attributes"]["canonicalTitle"]);
        temp.push(kitsu_lib["included"][i]["attributes"]["titles"]["en"]);
        temp.push(kitsu_lib["included"][i]["attributes"]["titles"]["en_jp"]);
        temp.push(kitsu_lib["included"][i]["attributes"]["titles"]["ja_jp"]);
        temp = temp.filter(function (el) {
            return el != null;
        })
        all_anime_title.push(temp);
    }
    console.log(all_anime_title);
}

var blind_list = [];
var blind_length = 10;
function setup_blind_list(){
    blind_list = [];
    var rand_list = [];
    while(rand_list.length < blind_length){
        var r =Math.floor(Math.random()*all_anime_title.length);
        if(rand_list.indexOf(r) === -1) rand_list.push(r);
    }
    for(var i=0; i<blind_length;i++){
        blind_list.push(all_anime_title[rand_list[i]]);
    }
}

async function blind_test(){
    video_list=[];
    await setup_blind_list();
    for(var i=0; i<blind_list.length;i++){
        anime_src = await query_anime_ost(blind_list[i]);
        video_list.push(anime_src);
    }
}
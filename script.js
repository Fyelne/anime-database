var video = document.getElementById("video");
var list = ["video1.mp4","video2.mp4"];
var video_list = [];
var overlay = document.getElementById("overlay");

function launch(){
  if(video_list.length>0){
    video.setAttribute("src", video_list[0]);
    video_list.splice(0, 1);
    video.style.display="block";
    overlay.style.display = "none";
    video.play();
  }
  else{
    console.log("fini")
    video.style.display="none";
    overlay.style.display="block";
    video_list = list;
  }
}


video.addEventListener('ended', (event) => {
  console.log(video_list);
  launch();
});



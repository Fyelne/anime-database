var r = document.querySelector(':root');
var dark_mode=true;
document.getElementById("dark-mode").addEventListener("click", function() {
  if(dark_mode == true){
    r.style.setProperty('--bg-color', '#A0A0A0');
    r.style.setProperty('--main-bg-color', '#F0F0F0');
    r.style.setProperty('--second-bg-color', '#D0D0D0');
    r.style.setProperty('--text-color', '#707070');
    r.style.setProperty('--text-hover-color', '#202020');
    dark_mode=false;
  }
  else{
    r.style.setProperty('--bg-color', '#0a0a0a');
    r.style.setProperty('--main-bg-color', '#2c2c30');
    r.style.setProperty('--second-bg-color', '#696969');
    r.style.setProperty('--text-color', '#c0c0c0');
    r.style.setProperty('--text-hover-color', '#909090');
    dark_mode=true;
  }
});

var dropdown = document.getElementsByClassName("dropdown-btn");


for (var i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      console.log(i);
      dropdown[i-1].childNodes[1].className="fa fa-caret-down";
      dropdownContent.style.display = "none";
    } else {
      console.log(i);
      dropdown[i-1].childNodes[1].className="fa fa-caret-up";
      dropdownContent.style.display = "block";
    }
  });
}

var hide_dropdown = document.getElementById("hide-sidebar-btn")
hide_dropdown.addEventListener("click", function() {
  var dropdownContent = document.getElementById("sidenav")
  if(dropdownContent.style.left == "-200px") {
    dropdownContent.style.left = "0";
    hide_dropdown.innerHTML = "<<";
  } else {
    dropdownContent.style.left = "-200px";
    hide_dropdown.innerHTML = ">>";
  }
});
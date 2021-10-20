"use strict"


function setCookie(cname, cvalue, exyears) {
  const d = new Date();
  d.setTime(d.getTime() + (exyears*365*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let username = getCookie("username");
  if (username != "") {
   alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your username:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}

//creates note div and adds it into note wrapper
function createNote() {
  let note = prompt("New Note", "");

  if (note != "" && note != null){
    //create static and uniform properties (favorite)
    let noteInfo = {
      starred: false,
      trash: false,
    };


    //create note and put contents inside (div in note wrapper)
    let newDiv = document.createElement("div");
    let content = document.createTextNode(note);
    let wrapper = document.getElementById("noteWrapper");
    let img = document.createElement("img");
    let linebreak1 = document.createElement("br");
    let linebreak2 = document.createElement("br");
    let linebreak3 = document.createElement("br");
    let edit = document.createElement("button");
    let trash = document.createElement("button");

    newDiv.id = "note";

    img.src = "resources/unstar.png";
    img.onclick = star;
    img.id = "star";

    edit.innerHTML = "Edit";
    edit.id = "noteButtons";
    edit.onclick = editNote;

    trash.innerHTML = "Delete";
    trash.id = "noteButtons";
    trash.onclick = trashNote;


    wrapper.appendChild(newDiv);

    newDiv.appendChild(img);
    newDiv.appendChild(linebreak1);

    newDiv.appendChild(content);
    newDiv.appendChild(linebreak2);
    newDiv.appendChild(linebreak3);
    
    newDiv.appendChild(edit);
    newDiv.appendChild(trash);
  
    
  }

}

/*Make notes, prompts, and divs look better
make it so you can open a note to edit it or look more closely
add  accounts so you can keep your notes after page refresh */


function star() {
  alert("star");
}

function editNote() {
  alert("edit");
}

function trashNote() {
  alert("trash");
}
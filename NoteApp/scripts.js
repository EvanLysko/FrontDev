"use strict"

document.getElementById("starred").addEventListener("click", showStarred, false);
document.getElementById("all").addEventListener("click", showAll, false);


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

let notes = [];

//creates note div and adds it into note wrapper
function createNote() {
  let note = prompt("New Note", "");

  if (note != "" && note != null){
    //create static and uniform properties (favorite)
    let noteInfo = {
      noteContent: note,
      starred: false,
      trash: false,

    };

    notes.push(noteInfo);
    console.log(notes);

    //create note and put contents inside (div in note wrapper)
    let newDiv = document.createElement("div");
    let content = document.createTextNode(note);
    let wrapper = document.getElementById("noteWrapper");
    let img = document.createElement("img");
    let p = document.createElement("p");
    let linebreak1 = document.createElement("br");
    let linebreak2 = document.createElement("br");
    //let linebreak3 = document.createElement("br");
    let edit = document.createElement("button");
    let trash = document.createElement("button");

    newDiv.className = "note";

    img.src = "resources/unstar.png";
    img.addEventListener("click", star, false);
    img.className = "star";

    edit.innerHTML = "Edit";
    edit.className = "editButton";
    edit.addEventListener("click", editNote, false);

    trash.innerHTML = "Delete";
    trash.className = "trashButton";
    trash.addEventListener("click", trashNote, false);


    wrapper.appendChild(newDiv);

    newDiv.appendChild(img);
    newDiv.appendChild(linebreak1);

    newDiv.appendChild(p);
    p.appendChild(content);
    newDiv.appendChild(linebreak2);
    //newDiv.appendChild(linebreak3);
    
    newDiv.appendChild(edit);
    newDiv.appendChild(trash);
  
  }

}

/*Make notes, prompts, and divs look better
make it so you can open a note to edit it or look more closely
add  accounts so you can keep your notes after page refresh 
compare the content of the note in div with the content of the object - note: and then modifify the all/note/starred/trash accordingly */


function star(e) {
  let star = e.currentTarget.parentNode.firstChild;
  console.log(star.src);
  if (star.src == "file:///C:/Users/Ps2pl/Desktop/FrontDev/NoteApp/resources/unstar.png") {
  star.src = "resources/star.png";
  console.log(star.src);
  }
  else {
    star.src = "resources/unstar.png";
    console.log(star.src);
  }
}

function editNote(e) {
  //get text from note 
  let text = e.currentTarget.parentNode.firstChild.nextSibling.nextSibling.textContent;
  
  let note = prompt("Edit Note", text);

  if (note != null){
    e.currentTarget.parentNode.firstChild.nextSibling.nextSibling.textContent = note;
  }
  
}

function trashNote(e) {
  let text = "Delete this note?\n"
  text += e.currentTarget.parentNode.firstChild.nextSibling.nextSibling.textContent;
  if(confirm(text)) {
    e.currentTarget.parentNode.remove();
  }
}


/*then make the navigation bar actually sort the notes using the hidden HMTL attribute and coordinating with the note obj properties */

function showStarred(e) {
  let notes = document.getElementsByClassName("note");
  for (let note in notes) {
    if (notes[note].firstChild.src == "file:///C:/Users/Ps2pl/Desktop/FrontDev/NoteApp/resources/unstar.png" || notes[note].firstChild.src == "resources/unstar") {
      notes[note].style.display = "none";
    }
  }
}

function showAll(e) {
  let notes = document.getElementsByClassName("note");
  for (let note in notes) {
    notes[note].style.display = "inline-block";

  }
}
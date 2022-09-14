"use strict"

document.getElementById("starred").addEventListener("click", showStarred, false);
document.getElementById("all").addEventListener("click", showAll, false);
document.getElementById("theme").addEventListener("click", themeDrop, false);
document.getElementById("light").addEventListener("click", lightTheme, false);
document.getElementById("dark").addEventListener("click", darkTheme, false);
// loadNotes();

function lightTheme() {
  document.getElementById("pagestyle").setAttribute("href", "styles.css");
  localStorage.setItem("stylemodifier", "styles.css");
  themeDrop();
}

function darkTheme() {
  document.getElementById("pagestyle").setAttribute("href", "darkstyles.css");
  localStorage.setItem("stylemodifier", "darkstyles.css");
  themeDrop();
}

function themeDrop(e) {
  if (document.getElementById("themedropdown").style.display == "none") {
    document.getElementById("themedropdown").style.display = "block";
  }
  else {
    document.getElementById("themedropdown").style.display = "none";
  }
}

function loadNotes() {
  //load style pref
  if(localStorage.getItem("stylemodifier") != null) {
    document.getElementById("pagestyle").setAttribute("href", localStorage.getItem("stylemodifier"));
  }
  //load notes
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) != "stylemodifier") {
      document.getElementById("noteWrapper").innerHTML += localStorage.getItem(localStorage.key(i));
    }
  }
  //add event listeners to notes
  let notess = document.getElementsByClassName("note");
  for (let i = 0; i < notess.length; i++) {
    console.log(notess[i].firstChild);
    notess[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.addEventListener("click", editNote, false);
    notess[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.addEventListener("click", trashNote, false);
    notess[i].firstChild.addEventListener("click", star, false);
  }
}



//creates note div and adds it into note wrapper
function createNote() {
  let note = prompt("New Note", "");

  if (note != "" && note != null){
    //create note and put contents inside (div in note wrapper)
    let newDiv = document.createElement("div");
    let content = document.createTextNode(note);
    let column = getShortestColumn();
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


    column.appendChild(newDiv);

    newDiv.appendChild(img);
    newDiv.appendChild(linebreak1);

    newDiv.appendChild(p);
    p.appendChild(content);
    newDiv.appendChild(linebreak2);
    //newDiv.appendChild(linebreak3);
    
    newDiv.appendChild(edit);
    newDiv.appendChild(trash);
    
    // add to local storage
    localStorage.setItem(note, newDiv.outerHTML)
  }

}

function getShortestColumn() {
  let columns = document.querySelectorAll("div.column");
  let shortestCol = columns[0];
  for (let i = 1; i < columns.length; i++) {
    let col = columns[i];
    if ( col.clientHeight < shortestCol.clientHeight) {
      shortestCol = col;
    }
  }
  return shortestCol;
}

/*Make notes, prompts, and divs look better
make it so you can open a note to edit it or look more closely
add  accounts so you can keep your notes after page refresh 
compare the content of the note in div with the content of the object - note: and then modifify the all/note/starred/trash accordingly */


function star(e) {
  let star = e.currentTarget.parentNode.firstChild;
  let text = e.currentTarget.parentNode.firstChild.nextSibling.nextSibling.textContent;
  console.log(star.src);
  if (star.src == "file:///C:/Users/Ps2pl/Desktop/FrontDev/NoteApp/resources/unstar.png") {
    star.src = "resources/star.png";
    localStorage.removeItem(text)
    localStorage.setItem(text, e.currentTarget.parentNode.outerHTML)
  }
  else {
    star.src = "resources/unstar.png";
    console.log(star.src);
    localStorage.removeItem(text)
    localStorage.setItem(text, e.currentTarget.parentNode.outerHTML)
  }
}

function editNote(e) {
  //get text from note 
  let text = e.currentTarget.parentNode.firstChild.nextSibling.nextSibling.textContent;
  
  let note = prompt("Edit Note", text);

  if (note != null){
    e.currentTarget.parentNode.firstChild.nextSibling.nextSibling.textContent = note;
    localStorage.removeItem(text)
    localStorage.setItem(note, e.currentTarget.parentNode.outerHTML)
  }
  
}

function trashNote(e) {
  let text = "Delete this note?\n"
  text += e.currentTarget.parentNode.firstChild.nextSibling.nextSibling.textContent;
  if(confirm(text)) {
    e.currentTarget.parentNode.remove();
    localStorage.removeItem(e.currentTarget.parentNode.firstChild.nextSibling.nextSibling.textContent)
  }
}

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
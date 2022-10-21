"use strict"

document.getElementById("starred").addEventListener("click", showStarred, false);
document.getElementById("all").addEventListener("click", showAll, false);
document.getElementById("theme").addEventListener("click", themeDrop, false);
document.getElementById("light").addEventListener("click", lightTheme, false);
document.getElementById("dark").addEventListener("click", darkTheme, false);
loadNotes();

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
  //get notes
  let noteKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key !== "stylemodifier") {
      noteKeys.push(Number(key));
    }
  }
  //sort the keys by recenty
  noteKeys.sort();

  for (let key of noteKeys) {
    getShortestColumn().prepend(new DOMParser().parseFromString(localStorage.getItem(key.toString()), "text/html").getElementsByClassName("note")[0]);
  }
  
  let buttons = document.getElementsByClassName("noteButton");
  for (let button of buttons) {
    button.addEventListener("click", trashNote, false);
  }

  let stars = document.getElementsByClassName("star");
  for (let star of stars) {
    star.addEventListener("click", doStar, false);
  }

  let notes = document.getElementsByClassName("noteText");
  for (let note of notes) {
    note.addEventListener("input", updateNote, false);
  }
}

function createNewNote() {
  //create note and put contents inside (div in note wrapper)
  let newNoteWrapper = document.getElementById("newNoteWrapper");
  let noteDiv = document.createElement("div");
  let noteContentDiv = document.createElement("div");
  let noteButtonDiv = document.createElement("div");
  let star = document.createElement("img");
  let p = document.createElement("p");
  let submit = document.createElement("button");
  let trash = document.createElement("button");

  noteDiv.className = "note";
  noteDiv.id = "newNote";
  noteButtonDiv.className = "noteButtonDiv";


  star.src = "resources/unstar.png";
  star.addEventListener("click", doStar, false);
  star.className = "star";

  noteContentDiv.className = "noteContentDiv";

  p.className = "noteText";
  p.contentEditable = "true";

  submit.innerHTML = "Submit";
  submit.className = "noteButton";
  submit.addEventListener("click", submitNote, false);

  trash.innerHTML = "Delete";
  trash.className = "noteButton";
  trash.addEventListener("click", trashNote, false);


  newNoteWrapper.prepend(noteDiv);

  noteDiv.appendChild(star);

  noteDiv.appendChild(noteContentDiv);
  noteContentDiv.appendChild(p);
  
  noteButtonDiv.appendChild(submit);
  noteButtonDiv.appendChild(trash);
  noteDiv.appendChild(noteButtonDiv);

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


function doStar(e) {
  let star = e.target;
  let note = e.target.parentNode;
  console.log(star.src);
  star.src = star.src.slice(-20) === "resources/unstar.png"? "resources/star.png" : "resources/unstar.png";
  localStorage.setItem(note.id, note.outerHTML);
}

function submitNote() {
  let noteDiv = document.getElementById("newNote");
  let noteText = noteDiv.getElementsByClassName("noteText")[0];
  if (noteText.innerHTML != "" && noteText.innerHTML != null){
    //modify note buttons and move down to 
    let buttons = noteDiv.getElementsByClassName("noteButton");
    buttons[0].remove();

    noteText.addEventListener("input", updateNote);

    noteDiv.id = createID();
    getShortestColumn().prepend(noteDiv);

    
    // add to local storage
    localStorage.setItem(noteDiv.id, noteDiv.outerHTML)
  }

}

function createID() {
  let len = localStorage.length;
  let maxID = -1;
  for (let i = 0; i < len; i++) {
    let ID = Number(localStorage.key(i));
    //check for a gap to end early
    // if (ID > maxID + 1) { break; }// got rid of this so that we can easily sort the notes by recency by comparing the values of the keys

    maxID = ID > maxID? ID : maxID;
  }
  maxID++;
  return maxID.toString();
}

function updateNote(e) {
  let currentNote = e.target.parentNode.parentNode;

  localStorage.setItem(currentNote.id, currentNote.outerHTML);
}

function trashNote(e) {
  let confirm = trashYesNoPopup(e.target, "Delete This Note?");
  let noteText = event.currentTarget.parentNode.getElementsByClassName("noteText")[0].innerHTML;
  
}

function trashYesNoPopup(trashButton, text) {
  let popupDiv = document.createElement("div");
  let header = document.createElement("h3");
  let buttonWrapper = document.createElement("div");
  let yes = document.createElement("button");
  let no = document.createElement("button");

  header.className = "popupHeader";
  buttonWrapper.className = "popupButtonWrapper";
  yes.className = "popupYes";
  no.className = "popupNo";

  header.innerHTML = text;
  yes.innerHTML = "Yes";
  no.innerHTML = "No";

  yes.addEventListener("click", () => {
    localStorage.removeItem(trashButton.parentNode.parentNode.id);
    trashButton.parentNode.parentNode.remove();
  });
  no.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.remove()
  });

  
  popupDiv.style.right = trashButton.style.left;


  trashButton.parentNode.prepend(popupDiv);
  popupDiv.appendChild(header);
  popupDiv.appendChild(buttonWrapper);
  buttonWrapper.appendChild(yes);
  buttonWrapper.appendChild(no);

}

function showStarred(e) {
  let notes = document.getElementsByClassName("note");
  for (let note of notes) {
    if (note.firstChild.src.slice(-20) === "resources/unstar.png") {
      note.style.display = "none";
    }
  }
}

function showAll(e) {
  let notes = document.getElementsByClassName("note");
  for (let note in notes) {
    notes[note].style.display = "block";

  }
}
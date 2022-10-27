"use strict"

let noteContentPlaceHolder = "content";
let noteTitlePlaceHolder = "Title";

//icon paths
//Light
let heartNoFillLight = "resources/favorite_FILL0_wght400_GRAD0_opsz40.svg";
let heartFillLight = "resources/favorite_FILL1_wght400_GRAD0_opsz40.svg";

let pinNoFillLight = "resources/push_pin_FILL0_wght400_GRAD0_opsz40.svg";
let pinFillLight = "resources/push_pin_FILL1_wght400_GRAD0_opsz40.svg";

let checkBoxButtonNoFillLight = "resources/check_box_FILL0_wght400_GRAD0_opsz40.svg";
let checkBoxButtonFillLight = "resources/check_box_FILL1_wght400_GRAD0_opsz40.svg";

let smallCheckBoxButtonNoFillLight = "resources/check_box_outline_blank_FILL0_wght400_GRAD0_opsz24.svg";
let smallCheckBoxButtonFillLight = "resources/check_box_FILL0_wght400_GRAD0_opsz24.svg"

let colorButtonNoFillLight = "resources/palette_FILL0_wght400_GRAD0_opsz40.svg";
let colorButtonFillLight = "resources/palette_FILL1_wght400_GRAD0_opsz40.svg";

let groupButtonNoFillLight = "resources/category_FILL0_wght400_GRAD0_opsz40.svg";
let groupButtonFillLight = "resources/category_FILL1_wght400_GRAD0_opsz40.svg";

//dark
let heartNoFillDark = "resources/favorite_FILL0_wght400_GRAD0_opsz40Dark.svg";
let heartFillDark = "resources/favorite_FILL1_wght400_GRAD0_opsz40Dark.svg";

let pinNoFillDark = "resources/push_pin_FILL0_wght400_GRAD0_opsz40Dark.svg";
let pinFillDark = "resources/push_pin_FILL1_wght400_GRAD0_opsz40Dark.svg";

let checkBoxButtonNoFillDark = "resources/check_box_FILL0_wght400_GRAD0_opsz40Dark.svg";
let checkBoxButtonFillDark = "resources/check_box_FILL1_wght400_GRAD0_opsz40Dark.svg";

let smallCheckBoxButtonNoFillDark = "resources/check_box_outline_blank_FILL0_wght400_GRAD0_opsz24Dark.svg";
let smallCheckBoxButtonFillDark = "resources/check_box_FILL0_wght400_GRAD0_opsz24Dark.svg"

let colorButtonNoFillDark = "resources/palette_FILL0_wght400_GRAD0_opsz40Dark.svg";
let colorButtonFillDark = "resources/palette_FILL1_wght400_GRAD0_opsz40Dark.svg";

let groupButtonNoFillDark = "resources/category_FILL0_wght400_GRAD0_opsz40Dark.svg";
let groupButtonFillDark = "resources/category_FILL1_wght400_GRAD0_opsz40Dark.svg";


document.getElementById("favorites").addEventListener("click", showFavorite, false);
document.getElementById("groups").addEventListener("click", showGroups);
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
  
  let titles = document.getElementsByClassName("noteTitle");
  for (let title of titles) {
    title.addEventListener("input", updateNote);
  }

  let hearts = document.getElementsByClassName("noteHeartButton");
  for (let heart of hearts) {
    heart.addEventListener("click", favorite);
  }

  let pins = document.getElementsByClassName("notePinButton");
  for (let pinButton of pins) {
    pinButton.addEventListener("click", pin);
  }

  let notes = document.getElementsByClassName("noteContent");
  for (let note of notes) {
    note.addEventListener("input", updateNote);
  }

  let checkBoxButtons = document.getElementsByClassName("noteCheckBoxButton");
  for (let checkBoxButton of checkBoxButtons) {
    checkBoxButton.addEventListener("click", checkBoxChange);
  }

  let colorButtons = document.getElementsByClassName("noteColorButton");
  for (let colorButton of colorButtons) {
    colorButton.addEventListener("click", colorChange);
  }

  let groupButtons = document.getElementsByClassName("noteGroupButton");
  for (let groupButton of groupButtons) {
    groupButton.addEventListener("click", groupSelector);
  }

  let buttons = document.getElementsByClassName("noteButton");
  for (let button of buttons) {
    button.addEventListener("click", trashNote);
  }
}

function createNewNote() {
  //create elements
  let newNoteWrapper = document.getElementById("newNoteWrapper");
  let note = document.createElement("div");


  let headerWrapper = document.createElement("div");

  let titleWrapper = document.createElement("div");
  let title = document.createElement("h2");

  let headerButtonWrapper = document.createElement("div");
  let heartButton = document.createElement("img");
  let pinButton = document.createElement("img");


  let contentWrapper = document.createElement("div");
  let content = document.createElement("p");


  let footerWrapper = document.createElement("div");

  let footerButtonWrapper = document.createElement("div");
  let checkBoxButton = document.createElement("img");
  let colorButton = document.createElement("img");
  let groupButton = document.createElement("img");

  let deleteButtonWrapper = document.createElement("div");
  let submitButton = document.createElement("button");
  let deleteButton = document.createElement("button");


  //set id of newnote
  note.id = "newNote";

  //set classes
  note.className = "note";
  headerWrapper.className = "noteHeaderWrapper";
  titleWrapper.className = "noteTitleWrapper";
  title.className = "noteTitle";
  headerButtonWrapper.className = "noteHeaderButtonWrapper";
  heartButton.className ="noteHeartButton";
  pinButton.className = "notePinButton";
  contentWrapper.className = "noteContentWrapper";
  content.className = "noteContent";
  footerWrapper.className = "noteFooterWrapper";
  footerButtonWrapper.className = "noteFooterButtonWrapper";
  checkBoxButton.className = "noteCheckBoxButton";
  colorButton.className = "noteColorButton";
  groupButton.className = "noteGroupButton";
  deleteButtonWrapper.className = "noteDeleteButtonWrapper";
  submitButton.className = "noteButton";
  deleteButton.className = "noteButton";

  //set img src's
  heartButton.src = heartNoFillDark;
  pinButton.src = pinNoFillLight;
  checkBoxButton.src = checkBoxButtonNoFillLight;
  colorButton.src = colorButtonNoFillLight;
  groupButton.src = groupButtonNoFillLight;

  //setEventListeners
  heartButton.addEventListener("click", favorite);
  pinButton.addEventListener("click", pin);
  checkBoxButton.addEventListener("click", checkBoxChange);
  colorButton.addEventListener("click", colorChange);
  groupButton.addEventListener("click", groupSelector);
  submitButton.addEventListener("click", submitNote)
  deleteButton.addEventListener("click", trashNote);

  //set innerHTML
  title.innerHTML = noteTitlePlaceHolder;
  content.innerHTML = noteContentPlaceHolder;
  submitButton.innerHTML = "Submit";
  deleteButton.innerHTML = "Delete";

  //set contenteditable
  title.contentEditable = "true";
  content.contentEditable = "true";

  //put together
  newNoteWrapper.prepend(note);
  note.appendChild(headerWrapper);

  headerWrapper.appendChild(titleWrapper)
  titleWrapper.appendChild(title);

  headerWrapper.appendChild(headerButtonWrapper);
  headerButtonWrapper.appendChild(heartButton);
  headerButtonWrapper.appendChild(pinButton);

  note.appendChild(contentWrapper);
  contentWrapper.appendChild(content);

  note.appendChild(footerWrapper);
  footerWrapper.appendChild(footerButtonWrapper);
  footerButtonWrapper.appendChild(checkBoxButton);
  footerButtonWrapper.appendChild(colorButton);
  footerButtonWrapper.appendChild(groupButton);

  footerWrapper.appendChild(deleteButtonWrapper);
  deleteButtonWrapper.appendChild(submitButton);
  deleteButtonWrapper.appendChild(deleteButton);

}

//NOTE BUTTON FUNCTIONS

function favorite(e) {
  let heart = e.target;
  let noFillHeart = "resources/favorite_FILL0_wght400_GRAD0_opsz40.svg";
  let srcLen = noFillHeart.length;
  let src = heart.src.slice(-srcLen);
  // heart.src = src === noFillHeart? 
}


function pin(e) {

}


function checkBoxChange(e) {

}


function colorChange(e) {

}


function groupSelector(e) {

}


// function doStar(e) {
//   let star = e.target;
//   let note = e.target.parentNode;
//   console.log(star.src);
//   star.src = star.src.slice(-20) === "resources/unstar.png"? "resources/star.png" : "resources/unstar.png";
//   localStorage.setItem(note.id, note.outerHTML);
// }

function submitNote() {
  let noteDiv = document.getElementById("newNote");
  let noteTitle = noteDiv.getElementsByClassName("noteTitle")[0];
  let noteContent = noteDiv.getElementsByClassName("noteContent")[0];
  if ((noteContent.innerHTML != "" && noteContent.innerHTML != null && noteContent.innerHTML != noteContentPlaceHolder) || (noteTitle.innerHTML != "" && noteTitle.innerHTML != null && noteTitle.innerHTML != noteTitlePlaceHolder)){
    //modify note buttons and move down to 
    let buttons = noteDiv.getElementsByClassName("noteButton");
    buttons[0].remove();

    noteTitle.addEventListener("input", updateNote);
    noteContent.addEventListener("input", updateNote);

    noteDiv.id = createID();
    getShortestColumn().prepend(noteDiv);

    // add to local storage
    localStorage.setItem(noteDiv.id, noteDiv.outerHTML)
  } else {
    noteDiv.remove();
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
    trashButton.parentNode.parentNode.parentNode.remove();
  });
  no.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.parentNode.remove()
  });

  
  popupDiv.style.right = trashButton.style.left;


  trashButton.parentNode.prepend(popupDiv);
  popupDiv.appendChild(header);
  popupDiv.appendChild(buttonWrapper);
  buttonWrapper.appendChild(yes);
  buttonWrapper.appendChild(no);

}


//HEADER TAB BUTTON FUNCTIONS

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


function showFavorite(e) {

}


function showGroups(e) {

}


function groupsAvailable(e) {

}


function displayGroup(e) {
  //use string of name as id
}


function loadPinnedNotes() {

}
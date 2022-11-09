"use strict"

let noteContentPlaceHolder = "content";
let noteTitlePlaceHolder = "Title";

let numColumns = 0;

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

//colors
let color0 = "#FDE4CF";
let color1 = "#F1C0E8";
let color2 = "#A3C4F3";
let color3 = "#90DBF4";
let color4 = "#B9FBC0";
let color5 = isLightTheme()? "#FFFFFF" : "#121212";

let colors = [color0, color1, color2, color3, color4, color5]


let timeout = false;

//enter inside of div creating divs fix
document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    document.execCommand('insertLineBreak')
    event.preventDefault()
  }
})


document.getElementById("favorites").addEventListener("click", showFavorite);
document.getElementById("groups").addEventListener("click", showGroups);
document.getElementById("all").addEventListener("click", showAll);
document.getElementById("theme").addEventListener("click", themeDrop);
document.getElementById("light").addEventListener("click", setLightTheme);
document.getElementById("dark").addEventListener("click", setDarkTheme);
window.addEventListener('resize', function() {
  // clear the timeout
  clearTimeout(timeout);
  // start timing for event "completion"
  timeout = setTimeout(run, 400);
});
run();


function setLightTheme() {
  document.getElementById("pagestyle").setAttribute("href", "styles.css");
  localStorage.setItem("stylemodifier", "styles.css");
  themeDrop();
}

function isLightTheme() {
  return document.getElementById("pagestyle").getAttribute("href").slice(-10) === "styles.css";
}

function setDarkTheme() {
  document.getElementById("pagestyle").setAttribute("href", "darkstyles.css");
  localStorage.setItem("stylemodifier", "darkstyles.css");
  themeDrop();
}

function isDarkTheme() {
  return document.getElementById("pagestyle").getAttribute("href").slice(-14) === "darkstyles.css";
}

function themeDrop(e) {
  if (document.getElementById("themedropdown").style.display == "none") {
    document.getElementById("themedropdown").style.display = "block";
  }
  else {
    document.getElementById("themedropdown").style.display = "none";
  }
}

function run () {
  loadStylePref();
  setAmountOfColumns();
  removeNotes();
  loadPinnedNotes();
  loadNotes();
  checkForWelcome();
}


function loadStylePref() {
  if(localStorage.getItem("stylemodifier") != null) {
    document.getElementById("pagestyle").setAttribute("href", localStorage.getItem("stylemodifier"));
  }
}


function loadPinnedNotes() {

  let notes = getNotesFromLocalStorage();
  for (let note of notes) {
    if (isPinned(note)) {
      getShortestPinnedColumn().prepend(note);
    }
  }
  addListeners();
}


function loadNotes() {

  let notes = getNotesFromLocalStorage();
  for (let note of notes) {
    if (!isPinned(note)) {
      getShortestColumn().prepend(note);
    }
  }
  addListeners();
}

function checkForWelcome() {
  if (getNotesFromLocalStorage().length > 0) {
    return;
  }
  
  let temp1 = noteTitlePlaceHolder;
  let temp2 = noteContentPlaceHolder;

  noteTitlePlaceHolder = "Welcome!";
  noteContentPlaceHolder = "Click New Note above to start creating your first note!"

  createNewNote();

  noteTitlePlaceHolder = temp1;
  noteContentPlaceHolder = temp2;
}


function addListeners() {
  let titles = document.getElementsByClassName("noteTitle");
  for (let title of titles) {
    title.addEventListener("input", updateNoteFromEvent);
  }

  let hearts = document.getElementsByClassName("noteHeartButton");
  for (let heart of hearts) {
    heart.addEventListener("click", favorite);
  }

  let pins = document.getElementsByClassName("notePinButton");
  for (let pinButton of pins) {
    pinButton.addEventListener("click", pin);
  }

  let noteContents = document.getElementsByClassName("noteContent");
  for (let noteContent of noteContents) {
    noteContent.addEventListener("input", updateNoteFromEvent);
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

  let buttons = document.querySelectorAll("button.noteButton");
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
  heartButton.src = isLightTheme()? heartNoFillLight : heartNoFillDark;
  pinButton.src = isLightTheme()? pinNoFillLight : pinNoFillDark;
  checkBoxButton.src = isLightTheme()? checkBoxButtonNoFillLight : checkBoxButtonNoFillDark;
  colorButton.src = isLightTheme()? colorButtonNoFillLight : colorButtonNoFillDark;
  groupButton.src = isLightTheme()? groupButtonNoFillLight : groupButtonNoFillDark;

  //set img titles
  heartButton.title = "favorite";
  pinButton.title = "pin";
  checkBoxButton.title = "checkboxes";
  colorButton.title = "change color";
  groupButton.title = "assign group";

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
  deleteButtonWrapper.appendChild(deleteButton);
  deleteButtonWrapper.appendChild(submitButton);

}

//NOTE BUTTON FUNCTIONS

function favorite(e) {
  let heart = e.target;
  let themedHeartNo = isLightTheme()? heartNoFillLight : heartNoFillDark;
  let themedHeart = isLightTheme()? heartFillLight : heartFillDark;
  heart.src = heart.src.slice(- themedHeartNo.length) === themedHeartNo? themedHeart : themedHeartNo;
  updateNoteFromEvent(e);
}

function isFavorited(note) {
  let themedHeart = isLightTheme()? heartFillLight : heartFillDark;
  return note.querySelectorAll("img.noteHeartButton")[0].src.slice(-themedHeart.length) === themedHeart;
}


function pin(e) {
  let pin = e.target;
  let themedPinNo = isLightTheme()? pinNoFillLight : pinNoFillDark;
  let themedPin = isLightTheme()? pinFillLight : pinFillDark;
  pin.src = pin.src.slice(- themedPinNo.length) === themedPinNo? themedPin : themedPinNo;

  let note = getNoteNodeFromChild(pin);
  if (note.id === "newNote") {
    return;
  }

  updateNoteFromEvent(e);
  removeNotes();
  loadPinnedNotes();
  loadNotes();
}

function isPinned(note) {
  let themedPin = isLightTheme()? pinFillLight : pinFillDark;
  return note.querySelectorAll("img.notePinButton")[0].src.slice(-themedPin.length) === themedPin;
}


function checkBoxChange(e) {
  let checkBox = e.target;
  let themedCheckBoxNo = isLightTheme()? checkBoxButtonNoFillLight : checkBoxButtonNoFillDark;
  let themedCheckBox = isLightTheme()? checkBoxButtonFillLight : checkBoxButtonFillDark;
  checkBox.src = checkBox.src.slice(- themedCheckBoxNo.length) === themedCheckBoxNo? themedCheckBox : themedCheckBoxNo;
}


function colorChange(e) {
  let colorButton = e.target;
  let themedColorButtonNo = isLightTheme()? colorButtonNoFillLight : colorButtonNoFillDark;
  let themedColorButton = isLightTheme()? colorButtonFillLight : colorButtonFillDark;
  let isNoFill = colorButton.src.slice(- themedColorButtonNo.length) === themedColorButtonNo;
  
  if (isNoFill) {
    console.log("nofil")
    colorOptionPopup(colorButton);
  } else {
    getNoteNodeFromChild(colorButton).querySelectorAll(".colorSwatchWrapper")[0].remove();
  }

  colorButton.src = isNoFill? themedColorButton : themedColorButtonNo;
}

function colorOptionPopup(colorButton) {
  let wrapper = document.createElement("div");
  let note = getNoteNodeFromChild(colorButton);
  wrapper.className = "colorSwatchWrapper";
  wrapper.style.backgroundColor = note.backgroundColor;
  note.appendChild(wrapper);

  //change colors of swatches
  for (let color of colors) {
    let colorSwatch = document.createElement("div");
    //change className
    colorSwatch.className = "colorSwatch";
    //change backgroundColor color
    colorSwatch.style.backgroundColor = color;
    //add event listener
    colorSwatch.addEventListener("click", changeColorOfNote);
    //add to doc
    wrapper.appendChild(colorSwatch);
  }

}

function changeColorOfNote(e) {
  let note = getNoteNodeFromChild(e.target);
  let wrapper = e.target.parentNode;
  note.style.backgroundColor = e.target.style.backgroundColor;
  note.querySelectorAll(".noteButton").forEach(element => {
    element.style.background = e.target.style.backgroundColor;
  });

  //change color of color button and get rid of swatches
  wrapper.remove();
  let colorButton = note.querySelectorAll("img.noteColorButton")[0];
  let themedColorButtonNo = isLightTheme()? colorButtonNoFillLight : colorButtonNoFillDark;
  let themedColorButton = isLightTheme()? colorButtonFillLight : colorButtonFillDark;
  colorButton.src = colorButton.src.slice(- themedColorButtonNo.length) === themedColorButtonNo? themedColorButton : themedColorButtonNo;

  updateNote(note);
}


function groupSelector(e) {
  let groupButton = e.target;
  let themedGroupButtonNo = isLightTheme()? groupButtonNoFillLight : groupButtonNoFillDark;
  let themedGroupButton = isLightTheme()? groupButtonFillLight : groupButtonFillDark;
  groupButton.src = groupButton.src.slice(- themedGroupButtonNo.length) === themedGroupButtonNo? themedGroupButton : themedGroupButtonNo;
}


function submitNote() {
  let noteDiv = document.getElementById("newNote");
  let noteTitle = noteDiv.getElementsByClassName("noteTitle")[0];
  let noteContent = noteDiv.getElementsByClassName("noteContent")[0];
  if ((noteContent.innerHTML != "" && noteContent.innerHTML != null && noteContent.innerHTML != noteContentPlaceHolder) || (noteTitle.innerHTML != "" && noteTitle.innerHTML != null && noteTitle.innerHTML != noteTitlePlaceHolder)){
    //get rid of placeholder text
    if (noteTitle.innerHTML === noteTitlePlaceHolder) {
      noteTitle.innerHTML = "";
    }
    if (noteContent.innerHTML === noteContentPlaceHolder) {
      noteContent.innerHTML = "";
    }
    
    //modify note buttons and move from newnotediv
    let buttons = noteDiv.getElementsByClassName("noteButton");
    buttons[1].remove();

    noteTitle.addEventListener("input", updateNoteFromEvent);
    noteContent.addEventListener("input", updateNoteFromEvent);

    noteDiv.id = createID();
    if (isPinned(noteDiv)) {
      getShortestPinnedColumn().prepend(noteDiv);
    } else {
      getShortestColumn().prepend(noteDiv);
    }

    // add to local storage
    localStorage.setItem(noteDiv.id, noteDiv.outerHTML)
  } else {
    noteDiv.remove();
  }
  
}

function setAmountOfColumns() {
  let newNumCol = Math.trunc(document.body.clientWidth / (250 + document.body.clientWidth / 20));
  if (newNumCol == numColumns) {
    return;
  }
  //new number of columns
  numColumns = newNumCol;

  //remove notes
  removeNotes();

  //remove existing columns
  let curColumns = document.querySelectorAll("div.column");
  for (let col of curColumns) {
    col.remove();
  }

  //add new pinned columns
  let pinnedNoteWrapper = document.getElementById("pinnedNoteWrapper");
  for (let i = 0; i < numColumns; i++) {
    let column = document.createElement("div");
    column.className = "column";
    column.style.width = (100 / numColumns - numColumns).toString() + "%";
    column.id = "pinnedColumn" + i.toString();
    pinnedNoteWrapper.appendChild(column);
  }

  //add new columns
  let noteWrapper = document.getElementById("noteWrapper");
  for (let i = 0; i < numColumns; i++) {
    let column = document.createElement("div");
    column.className = "column";
    column.style.width = (100 / numColumns - numColumns).toString() + "%";
    column.id = "column" + i.toString();
    noteWrapper.appendChild(column);
  }
}


function getShortestPinnedColumn() {
//get columns in order
let ncol = document.querySelectorAll("div.column").length / 2;
let columns = [];
for (let i = 0; i < ncol; i++) {
  let id = "pinnedColumn" + i.toString();
  columns.push(document.getElementById(id));
}

let shortestCol = columns[0];
for (let i = 1; i < columns.length; i++) {
  let col = columns[i];
  if (shortestCol.clientHeight - col.clientHeight > 8) {
    shortestCol = col;
  }
}
return shortestCol;
}


function getShortestColumn() {
  //get columns in order
  let ncol = document.querySelectorAll("div.column").length / 2;
  let columns = [];
  for (let i = 0; i < ncol; i++) {
    let id = "column" + i.toString();
    columns.push(document.getElementById(id));
  }

  let shortestCol = columns[0];
  for (let i = 1; i < columns.length; i++) {
    let col = columns[i];
    if (shortestCol.clientHeight - col.clientHeight > 8) {
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

function updateNoteFromEvent(e) {
  let currentNote = e.target;
  while (currentNote.className !== "note") {
    currentNote = currentNote.parentNode;
  }

  localStorage.setItem(currentNote.id, currentNote.outerHTML);
}

function updateNote(note) {
  localStorage.setItem(note.id, note.outerHTML);
}

function trashNote(e) {
  let confirm = trashYesNoPopup(e.target, "Delete This Note?");
  let noteText = getNoteNodeFromChild(e.target).getElementsByClassName("noteContent")[0].innerHTML;
  
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
    localStorage.removeItem(trashButton.parentNode.parentNode.parentNode.id);
    getNoteNodeFromChild(trashButton).remove();
  });
  no.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.remove()
  });

  //set classnames
  popupDiv.className = "popupWrapper";
  yes.className = "popupButton";
  no.className = "popupButton";


  trashButton.parentNode.prepend(popupDiv);
  popupDiv.appendChild(header);
  popupDiv.appendChild(buttonWrapper);
  buttonWrapper.appendChild(yes);
  buttonWrapper.appendChild(no);

}


//HEADER TAB BUTTON FUNCTIONS

function showAll(e) {
  timeout = false;
  removeNotes();
  run();
}


function showFavorite(e) {
  let notes = getNotesFromDOM();
  removeNotes();

  for (let note of notes) {
    if (isFavorited(note)) {
      getShortestColumn().prepend(note);
    } 
  }
}


function showGroups(e) {

}


function groupsAvailable(e) {

}


function displayGroup(e) {
  //use string of name as id
}



//general functions

function getNoteNodeFromChild(child) {
  while (child.className !== "note") {
    child = child.parentNode;
  }
  return child;
}

function getNoteIds() {
  let noteIds = [];
  for (let i = 0; i < localStorage.length; i++) {
    let id = localStorage.key(i);
    if (id !== "newNote" && id !== "stylemodifier") {
      noteIds.push(id);
    }
  }
  return noteIds;
}

function getNotesFromDOM() {
  return document.querySelectorAll("div.note");
}

function getNotesFromLocalStorage() {
  //get notekeys
  let noteKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key === "newNote") {
      localStorage.removeItem(key);
      continue;
    }
    if (key !== "stylemodifier") {
      noteKeys.push(Number(key));
    }
  }
  //sort the keys by recency
  noteKeys.sort();

  //get notes as dom elements
  let notes = [];
  for (let key of noteKeys) {
    notes.push(new DOMParser().parseFromString(localStorage.getItem(key.toString()), "text/html").querySelectorAll(".note")[0]);
  }
  return notes;
}

function removeNotes() {
  let notes = document.querySelectorAll(".note");
  for (let note of notes) {
    note.remove();
  }
}

function removeCertainNotes(notes) {
  for (let note of notes) {
    note.remove();
  }
}

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

let closeButton = "resources/close_FILL1_wght400_GRAD0_opsz24.svg";


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

let closeButtonDark = "resources/close_FILL0_wght400_GRAD0_opsz24Dark.svg";



//colors
let color0 = isLightTheme()? "#FDE4CF" : "#655b53";
let color1 = isLightTheme()? "#F1C0E8" : "#604d5d";
let color2 = isLightTheme()? "#A3C4F3" : "#414e61";
let color3 = isLightTheme()? "#90DBF4" : "#3a5862";
let color4 = isLightTheme()? "#B9FBC0" : "#4a644d";
let color5 = isLightTheme()? "#FFFFFF" : "#121212";

let colors = [color0, color1, color2, color3, color4, color5];
let lightColors = ["rgb(253, 228, 207)", "rgb(241, 192, 232)", "rgb(163, 196, 243)", "rgb(144, 219, 244)", "rgb(185, 251, 192)", "rgb(255, 255, 255)"];
let darkColors = ["rgb(101, 91, 83)", "rgb(96, 77, 93)", "rgb(65, 78, 97)", "rgb(58, 88, 98)", "rgb(74, 100, 77)", "rgb(18, 18, 18)"];


let timeout = false;

//TODO get rid of this and make it more specific to certain containers
//enter inside of div creating divs fix
// document.addEventListener('keydown', event => {
//   if (event.key === 'Enter') {
//     document.execCommand('insertLineBreak')
//     event.preventDefault()
//   }
// })

run();


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


function setLightTheme() {
  document.getElementById("pagestyle").setAttribute("href", "styles.css");
  localStorage.setItem("stylemodifier", "styles.css");
  refreshThemeSrc();
  themeDrop();
}

function isLightTheme() {
  return !isDarkTheme();
}

function setDarkTheme() {
  document.getElementById("pagestyle").setAttribute("href", "darkstyles.css");
  localStorage.setItem("stylemodifier", "darkstyles.css");
  refreshThemeSrc();
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
  refreshThemeSrc();
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


function refreshThemeSrc() {
  let isLight = isLightTheme();

  //logo src
  let logo = document.getElementById("logo");
  logo.src = isLight? "resources/TakeNoteblack.svg" : "resources/TakeNotewhite.svg";


  let hearts = document.getElementsByClassName("noteHeartButton");
  for (let heart of hearts) {
    let isFill = heart.src.includes("FILL1");
    heart.src = isLight? isFill? heartFillLight : heartNoFillLight : isFill? heartFillDark : heartNoFillDark;
  }

  let pins = document.getElementsByClassName("notePinButton");
  for (let pinButton of pins) {
    let isFill = pinButton.src.includes("FILL1");
    pinButton.src = isLight? isFill? pinFillLight : pinNoFillLight : isFill? pinFillDark : pinNoFillDark;
  }

  let checkBoxButtons = document.getElementsByClassName("noteCheckBoxButton");
  for (let checkBoxButton of checkBoxButtons) {
    let isFill = checkBoxButton.src.includes("FILL1");
    checkBoxButton.src = isLight? isFill? checkBoxButtonFillLight : checkBoxButtonNoFillLight : isFill? checkBoxButtonFillDark : checkBoxButtonNoFillDark;  
  }

  let smallCheckBoxes = document.getElementsByClassName("taskCheckBox");
  for (let smallCheckBox of smallCheckBoxes) {
    let isFill = smallCheckBox.src.includes("FILL1");
    smallCheckBox.src = isLight? isFill? smallCheckBoxButtonFillLight : smallCheckBoxButtonNoFillLight : isFill? smallCheckBoxButtonFillDark : smallCheckBoxButtonNoFillDark;
  }

  let taskCloseButtons = document.getElementsByClassName("taskCloseButton");
  for (let taskCloseButton of taskCloseButtons) {
    taskCloseButton.src = isLight? closeButton : closeButtonDark;  
  }


  let colorButtons = document.getElementsByClassName("noteColorButton");
  for (let colorButton of colorButtons) {
    let isFill = colorButton.src.includes("FILL1");
    colorButton.src = isLight? isFill? colorButtonFillLight : colorButtonNoFillLight : isFill? colorButtonFillDark : colorButtonNoFillDark;
  }

  let groupButtons = document.getElementsByClassName("noteGroupButton");
  for (let groupButton of groupButtons) {
    let isFill = groupButton.src.includes("FILL1");
    groupButton.src = isLight? isFill? groupButtonFillLight : groupButtonNoFillLight : isFill? groupButtonFillDark : groupButtonNoFillDark;
  }

  //note colors
  let notes = document.getElementsByClassName("note");
  for (let note of notes) {
    let color = getCorrectThemeColor(getComputedStyle(note).backgroundColor);
    note.style.backgroundColor = color ;
    let noteButtons = note.getElementsByClassName("noteButton");
    for (let noteButton of noteButtons) {
      noteButton.style.backgroundColor = color;
    }
    updateNote(note);
  }

}

function getCorrectThemeColor(oldColor) {
  //get index
  let oldColors = isLightTheme()? darkColors : lightColors;
  let newColors = isLightTheme()? lightColors : darkColors;

  // console.log(newColors[oldColors.indexOf(oldColor)]);
  // console.log(oldColor);

  return newColors[oldColors.indexOf(oldColor)];
}


function addListeners() {
  //clone notes to get rid of existing listeners
  let notes = document.getElementsByClassName("note");
  for (let oldNote of notes) {
    let note = oldNote.cloneNode(true);
    oldNote.parentNode.replaceChild(note, oldNote);
  }

  let titles = document.getElementsByClassName("noteTitle");
  for (let title of titles) {
    title.addEventListener("focusin", placeNoteInFocus);
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

  try{
    let noteContents = document.getElementsByClassName("noteContent");
    for (let noteContent of noteContents) {
      noteContent.addEventListener("focusin", placeNoteInFocus);
      noteContent.addEventListener("input", updateNoteFromEvent);
      noteContent.addEventListener("keydown", event => {
        if (event.key === 'Enter') {
          document.execCommand('insertLineBreak')
          event.preventDefault()
          console.lot("trying");
        }
      });
    }
  }catch{}

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
    if (button.innerHTML === "Delete") {
      button.addEventListener("click", trashNote);
    }
    if (button.innerHTML === "Done") {
      button.addEventListener("click", submitNote);
    }
    if (button.innerHTML === "Close") {
      button.addEventListener("click", placeNoteOutOfFocus);
    }
  }

  addTaskCheckBoxListeners();

}

function addListenersToNote(originalNote) {
  //clone node and replace to get rid of existing listeners
  let note = originalNote.cloneNode(true);
  originalNote.parentNode.replaceChild(note, originalNote);


  let title = note.getElementsByClassName("noteTitle")[0];
  title.addEventListener("input", updateNoteFromEvent);
  if (note.className !== "noteInFocus" && note.id !== "newNote") {
    title.addEventListener("focusin", placeNoteInFocus);
  }
  

  let heart = note.getElementsByClassName("noteHeartButton")[0];
  heart.addEventListener("click", favorite);
  

  let pinButton = note.getElementsByClassName("notePinButton")[0];
  pinButton.addEventListener("click", pin);
  

  try{
    let noteContent = note.getElementsByClassName("noteContent")[0];
    noteContent.addEventListener("input", updateNoteFromEvent);
    if (note.className !== "noteInFocus" && note.id !== "newNote") {
      noteContent.addEventListener("focusin", placeNoteInFocus);
    }
    noteContent.addEventListener("keydown", e => {
      if (e.key === 'Enter') {
        document.execCommand('insertLineBreak')
        e.preventDefault()
      }
    });
    }catch{}
  

  let checkBoxButton = note.getElementsByClassName("noteCheckBoxButton")[0];
  checkBoxButton.addEventListener("click", checkBoxChange);
  

  let colorButton = note.getElementsByClassName("noteColorButton")[0];
  colorButton.addEventListener("click", colorChange);
  

  let groupButton = note.getElementsByClassName("noteGroupButton")[0];
  groupButton.addEventListener("click", groupSelector);
  

  let buttons = note.getElementsByClassName("noteButton");
  for (let button of buttons) {
    if (button.innerHTML === "Delete") {
      button.addEventListener("click", trashNote);
    }
    if (button.innerHTML === "Done") {
      button.addEventListener("click", submitNote);
    }
    if (button.innerHTML === "Close") {
      button.addEventListener("click", placeNoteOutOfFocus);
    }
  }

  addTaskCheckBoxListenersToNote(note);


}

function addTaskCheckBoxListeners() {
  let taskCheckBoxes = document.getElementsByClassName("taskCheckBox");
  for (let taskCheckBox of taskCheckBoxes) {
    taskCheckBox.addEventListener("click", toggleSmallCheckBoxSrc);
  }

  let tasks = document.getElementsByClassName("taskContainer");
  for (let task of tasks) {
    task.addEventListener("input", updateNoteFromEvent);
    task.addEventListener("focusin", placeNoteInFocus);
    task.addEventListener("keydown", e => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          addTaskBelow(e)
          e.preventDefault()
        } else {
          document.execCommand('insertLineBreak')
          e.preventDefault()
        }
      }
    });
  }

  let taskCloseButtons = document.getElementsByClassName("taskCloseButton");
  for (let cb of taskCloseButtons) {
    cb.addEventListener("click", removeTask);
  }

}


function addTaskCheckBoxListenersToNote(note) {
  let taskCheckBoxes = note.getElementsByClassName("taskCheckBox");
  for (let taskCheckBox of taskCheckBoxes) {
    taskCheckBox.addEventListener("click", toggleSmallCheckBoxSrc);
  }

  let tasks = note.getElementsByClassName("taskContainer");
  for (let task of tasks) {
    task.addEventListener("input", updateNoteFromEvent);
    if (note.className !== "noteInFocus" && note.id !== "newNote") {
      task.addEventListener("focusin", placeNoteInFocus);
    }
    note.addEventListener("keydown", e => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          try{
          addTaskBelow(e);
          e.preventDefault();
          }catch{}
        } else {
          try{
          document.execCommand('insertLineBreak');
          e.preventDefault();
          }catch{}
        }
      }
    });
  }

  let taskCloseButtons = note.getElementsByClassName("taskCloseButton");
  for (let cb of taskCloseButtons) {
    cb.addEventListener("click", removeTask);
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
  

  //set innerHTML
  title.innerHTML = noteTitlePlaceHolder;
  content.innerHTML = noteContentPlaceHolder;
  submitButton.innerHTML = "Done";
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

  addListenersToNote(note);
  submitButton.addEventListener("click", submitNote);

}

//NOTE BUTTON FUNCTIONS

function favorite(e) {
  let heart = e.target;
  let themedHeartNo = isLightTheme()? heartNoFillLight : heartNoFillDark;
  let themedHeart = isLightTheme()? heartFillLight : heartFillDark;
  heart.src = heart.src.slice(- themedHeartNo.length) === themedHeartNo? themedHeart : themedHeartNo;

  let note = getNoteNodeFromChild(heart);
  if (note.className === "noteInFocus") {
    return;
  }

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
  if (note.id === "newNote" || note.className === "noteInFocus") {
    return;
  }

  updateNoteFromEvent(e);
  removeNotes();
  loadPinnedNotes();
  loadNotes();
}

function isPinned(note) {
  let themedPin = isLightTheme()? pinFillLight : pinFillDark;
  return note.getElementsByClassName("notePinButton")[0].src.slice(-themedPin.length) === themedPin;
}


function checkBoxChange(e) {
  let checkBox = e.target;
  let note = getNoteNodeFromChild(checkBox);
  let themedCheckBoxNo = isLightTheme()? checkBoxButtonNoFillLight : checkBoxButtonNoFillDark;
  let themedCheckBox = isLightTheme()? checkBoxButtonFillLight : checkBoxButtonFillDark;
  let isCheckBoxOff = checkBox.src.slice(- themedCheckBoxNo.length) === themedCheckBoxNo;
  checkBox.src = isCheckBoxOff? themedCheckBox : themedCheckBoxNo;

  if (isCheckBoxOff) {
    convertNoteToCheckBoxNote(note);
  } else {
    convertCheckBoxNoteToNote(note);
  }
  
  updateNoteFromEvent(e);
}

function toggleSmallCheckBoxSrc(e) {
  let smallCheckBox = e.target;
  let isUnchecked = smallCheckBox.src.slice(- getCheckBoxUncheckedSrc().length) === getCheckBoxUncheckedSrc();
  smallCheckBox.src = isUnchecked? getCheckBoxCheckedSrc() : getCheckBoxUncheckedSrc();
  //todo move completed tasks to bottom of the list
  if (isUnchecked) {
    smallCheckBox.nextSibling.style.textDecoration = "line-through";
    let taskContainer = smallCheckBox.parentNode;
    let noteContent = taskContainer.parentNode;
    taskContainer.remove();
    noteContent.appendChild(taskContainer);
  } else {
    smallCheckBox.nextSibling.style.textDecoration = "none";
    let taskContainer = smallCheckBox.parentNode;
    let noteContent = taskContainer.parentNode;
    taskContainer.remove();
    noteContent.prepend(taskContainer);
  }

  updateNoteFromEvent(e);
  
}

function getCheckBoxUncheckedSrc() {
  return isLightTheme()? smallCheckBoxButtonNoFillLight : smallCheckBoxButtonNoFillDark;
}
function getCheckBoxCheckedSrc() {
  return isLightTheme()? smallCheckBoxButtonFillLight : smallCheckBoxButtonFillDark;
}

function getCloseButtonSrc() {
  return isLightTheme()? closeButton : closeButtonDark;
}

function convertNoteToCheckBoxNote(note) {
  let noteContentWrapper = note.getElementsByClassName("noteContentWrapper")[0];
  let noteContent = note.getElementsByClassName("noteContent")[0];
  //get rid of <br> if <span> is after it
  let tasks = noteContent.innerHTML.replace(/<br><span><\/span>/g, "<span></span>").split("<br>");

  noteContent.remove();
  for (let task of tasks) {
    let newTask = stringToTask(task.replace(/<span><\/span>/g, "<br><span></span>"));
    noteContentWrapper.appendChild(newTask);
  }

  addTaskCheckBoxListenersToNote(note);

  updateNote(note);

}

function stringToTask(string) {
  let taskContainer = document.createElement("div");
  let taskContent = document.createElement("p");
  let taskCheckBox = document.createElement("img");
  let closeButton = document.createElement("img");

  //set classes
  taskContainer.className = "taskContainer";
  taskContent.className = "taskContent";
  taskCheckBox.className = "taskCheckBox";
  closeButton.className = "taskCloseButton";

  taskCheckBox.src = getCheckBoxUncheckedSrc();
  closeButton.src = getCloseButtonSrc();

  taskContent.innerHTML = string;
  taskContent.contentEditable = "true";

  taskContainer.appendChild(taskCheckBox);
  taskContainer.appendChild(taskContent);
  taskContainer.appendChild(closeButton);

  return taskContainer;
}


function convertCheckBoxNoteToNote(checkBoxNote) {
  let noteContentWrapper = checkBoxNote.getElementsByClassName("noteContentWrapper")[0];
  let noteContent = document.createElement("p");
  noteContent.className = "noteContent";
  noteContent.contentEditable = "true";

  let taskContainers = checkBoxNote.getElementsByClassName("taskContainer");
  let tasks = checkBoxNote.getElementsByClassName("taskContent");

  for (let i = 0; i < tasks.length; i++) {
    noteContent.innerHTML += tasks[i].innerHTML.replace(/<span><\/span>/g, "").replace(/<br>/g, "<br><span></span>") + (i + 1 < tasks.length?"<br>" : "");
  }
  let i = 0;
  while (i < taskContainers.length) {
    taskContainers[0].remove();
  }

  noteContentWrapper.appendChild(noteContent);

  addListenersToNote(checkBoxNote);

  updateNote(checkBoxNote);

}


function addTaskBelow(e) {
  let targetTaskContainer = e.target.parentNode;
  let note = getNoteNodeFromChild(targetTaskContainer);
  let newTaskContainer = stringToTask("");
  targetTaskContainer.after(newTaskContainer);
  newTaskContainer.getElementsByClassName("taskContent")[0].focus();
  addListenersToNote(note);
  updateNote(note);
}

function removeTask(e) {
  let taskContainer = e.target.parentNode;
  let note = getNoteNodeFromChild(taskContainer);
  taskContainer.remove();
  if (note.getElementsByClassName("taskContent").length < 1) {
    note.getElementsByClassName("noteContentWrapper")[0].appendChild(stringToTask(""));
  }

  updateNote(note);
}


function colorChange(e) {
  let colorButton = e.target;
  let themedColorButtonNo = isLightTheme()? colorButtonNoFillLight : colorButtonNoFillDark;
  let themedColorButton = isLightTheme()? colorButtonFillLight : colorButtonFillDark;
  let isNoFill = colorButton.src.slice(- themedColorButtonNo.length) === themedColorButtonNo;
  
  if (isNoFill) {
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
  wrapper.style.backgroundColor = getComputedStyle(note).backgroundColor;;
  note.appendChild(wrapper);

  let themedColors = isLightTheme()? colors : darkColors;

  //change colors of swatches
  for (let color of themedColors) {
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
  let note = getNoteNodeFromChild(groupButton);
  let themedGroupButtonNo = isLightTheme()? groupButtonNoFillLight : groupButtonNoFillDark;
  let themedGroupButton = isLightTheme()? groupButtonFillLight : groupButtonFillDark;

  let isSettingGroup = groupButton.src.slice(- themedGroupButtonNo.length) === themedGroupButtonNo

  groupButton.src = isSettingGroup? themedGroupButton : themedGroupButtonNo;

  if (isSettingGroup) {
    let groupOptionContainer = groupOptionPopup(groupButton);
    groupOptionContainer.focus();
    groupOptionContainer.addEventListener("unfocus", groupSelector);

  } else {
    let groupOptionContainer = note.getElementsByClassName("groupSelectorWrapper")[0];
    groupOptionContainer.remove();
  }


}

function groupOptionPopup(groupButton) {
  let wrapper = document.createElement("div");
  let note = getNoteNodeFromChild(groupButton);

  let createNewGroup = groupToGroupOption("createNewGroup");
  let createNewGroupContent = createNewGroup.getElementsByClassName("groupContent")[0];
  createNewGroupContent.contentEditable = "true";
  createNewGroupContent.addEventListener("keypress", function (e) {
    if (e.key === "Enter"){
      createNoteGroup(e);
      e.preventDefault();
    }
  });
  let createNewGroupCheckBox = createNewGroup.getElementsByClassName("groupCheckBox")[0];
  createNewGroupCheckBox.addEventListener("click", createNoteGroup);


  wrapper.className = "groupSelectorWrapper";
  wrapper.style.backgroundColor = getComputedStyle(note).backgroundColor;
  note.appendChild(wrapper);
  wrapper.appendChild(createNewGroup);

  //add groups that they are apart of
  let groupsOfNote = getGroupsofNote(note);
  for (let groupKey of groupsOfNote) {
    let groupOption = groupToGroupOption(getGroupKeyNoPrefix(groupKey), true);
    wrapper.appendChild(groupOption);
  }


  //add groups they are NOT a part of
  let groupsNotOfNote = getGroupsNotofNote(note);
  for (let groupKey of groupsNotOfNote) {
    let groupOption = groupToGroupOption(getGroupKeyNoPrefix(groupKey), false);
    wrapper.appendChild(groupOption);
  }

  return wrapper;
}


function groupToGroupOption(groupKey, inGroup) {
  let groupContainer = document.createElement("div");
  let groupContent = document.createElement("p");
  let groupCheckBox = document.createElement("img");
  let groupDelete = document.createElement("img");

  //set classes
  groupContainer.className = "groupContainer";
  groupContent.className = "groupContent";
  groupCheckBox.className = "groupCheckBox";
  groupDelete.className = "groupDelete";

  groupCheckBox.src = inGroup? getCheckBoxCheckedSrc() : getCheckBoxUncheckedSrc();
  groupDelete.src = getCloseButtonSrc();

  groupContent.innerHTML = groupKey;

  groupCheckBox.addEventListener("click", toggleGroupCheckBoxSrc);
  groupDelete.addEventListener("click", deleteNoteGroup);

  groupContainer.appendChild(groupCheckBox);
  groupContainer.appendChild(groupContent);
  groupContainer.appendChild(groupDelete);

  return groupContainer;
}

function groupToDisplayGroup(groupKey) {
  let groupContainer = document.createElement("div");
  let groupContent = document.createElement("p");
  
  //set classes
  groupContainer.className = "displayGroupContainer";
  groupContent.className = "displayGroupContent";

  groupContent.innerHTML = groupKey;

  groupContainer.addEventListener("click", displayGroup);

  groupContainer.appendChild(groupContent);

  return groupContainer;
}


function toggleGroupCheckBoxSrc(e) {
  let smallCheckBox = e.target;
  let groupOptionContainer = smallCheckBox.parentNode;
  let groupContainer = groupOptionContainer.parentNode;
  let note = getNoteNodeFromChild(smallCheckBox);
  let groupKey = "group".concat(smallCheckBox.nextSibling.innerHTML);
  let isUnchecked = smallCheckBox.src.slice(- getCheckBoxUncheckedSrc().length) === getCheckBoxUncheckedSrc();
  smallCheckBox.src = isUnchecked? getCheckBoxCheckedSrc() : getCheckBoxUncheckedSrc();
  
  if (isUnchecked) {
    addNoteToGroup(note, groupKey);
  } else {
    removeNoteFromGroup(note, groupKey);
  }

}

function toggleGroupCheckBoxSrc1(checkbox){
  let smallCheckBox = checkbox;
  let content = smallCheckBox.nextSibling;
  let groupOptionContainer = smallCheckBox.parentNode;
  let groupContainer = groupOptionContainer.parentNode;
  let note = getNoteNodeFromChild(smallCheckBox);
  let groupKey = "group".concat(smallCheckBox.nextSibling.innerHTML);

  smallCheckBox.src = getCheckBoxCheckedSrc();

  addNoteToGroup(note, groupKey);
  groupOptionContainer.remove();
  groupContainer.getElementsByClassName("groupContainer")[0].after(groupOptionContainer);
  content.contentEditable = "false";
  smallCheckBox.removeEventListener("click", createNoteGroup);
  smallCheckBox.addEventListener("click", toggleGroupCheckBoxSrc);

    
  

}


function getAllNoteGroupKeys() {
  let noteGroupKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (isNoteGroup(key)) {
      noteGroupKeys.push(key);
    }
  }
  return noteGroupKeys;
}

function getGroupsofNote(note) {
  let noteGroupKeys = getAllNoteGroupKeys();
  let groupsOfNote = [];
  for (let groupKey of noteGroupKeys){
    if (isNoteInGroup(note, groupKey)) {
      groupsOfNote.push(groupKey);
    }
  }
  return groupsOfNote;
}

function getGroupsNotofNote(note) {
  let noteGroupKeys = getAllNoteGroupKeys();
  let groupsNotOfNote = [];
  for (let groupKey of noteGroupKeys){
    if (!isNoteInGroup(note, groupKey)) {
      groupsNotOfNote.push(groupKey);
    }
  }
  return groupsNotOfNote;
}

function isNoteGroup(key) {
  return key != null && key.includes("group");
}

function isNoteInGroup(note, groupKey) {
  return localStorage.getItem(groupKey).includes(note.id);
}

function getNotesInGroup(groupKey) {
  return localStorage.getItem(groupKey).split(" ");
}

function addNoteToGroup(note, groupKey) {
  let curNotes = localStorage.getItem(groupKey);
  localStorage.setItem(groupKey, curNotes == null? note.id.concat(" ") : curNotes.concat(note.id, " "));
}

function removeNoteFromGroup(note, groupKey) {
  let curNotes = localStorage.getItem(groupKey);
  let re = new RegExp(note.id.concat(" "), "g");
  localStorage.setItem(groupKey, curNotes.replace(re, ""));
}

function createNoteGroup(e){
  // let groupKey = "group".concat(e.target.parentNode.getElementsByClassName("groupContent")[0].innerHTML);
  // let note = getNoteNodeFromChild(e.target);
  // addNoteToGroup(note, groupKey);
  let clone = e.target.parentNode.cloneNode(true);
  clone.getElementsByClassName("groupContent")[0].innerHTML = "createNewGroup";
  clone.getElementsByClassName("groupContent")[0].addEventListener("keypress", function (e) {
    if (e.key === "Enter"){
      createNoteGroup(e);
      e.preventDefault();
    }
  });
  clone.getElementsByClassName("groupCheckBox")[0].addEventListener("click", createNoteGroup);
  e.target.parentNode.before(clone);

  toggleGroupCheckBoxSrc1(e.target.parentNode.getElementsByClassName("groupCheckBox")[0]);
}

function deleteNoteGroup(e) {
  let groupContainer = e.target.parentNode;
  localStorage.removeItem("group".concat(groupContainer.getElementsByClassName("groupContent")[0].innerHTML));
  groupContainer.remove();
}

function getGroupKeyNoPrefix(groupKey) {
  let re = new RegExp("group");
  return groupKey.replace(re, "");
}


function submitNote() {
  let noteDiv = document.getElementById("newNote");
  let noteTitle = noteDiv.getElementsByClassName("noteTitle")[0];
  let noteContent = noteDiv.getElementsByClassName("noteContent")[0];
  if (noteDiv.getElementsByClassName("taskCheckBox").length > 0 || (noteContent.innerHTML != "" && noteContent.innerHTML != null && noteContent.innerHTML != noteContentPlaceHolder) || (noteTitle.innerHTML != "" && noteTitle.innerHTML != null && noteTitle.innerHTML != noteTitlePlaceHolder)){
    //get rid of placeholder text
    if (noteTitle.innerHTML === noteTitlePlaceHolder) {
      noteTitle.innerHTML = "";
    }
    try{
      if (noteContent.innerHTML === noteContentPlaceHolder) {
        noteContent.innerHTML = "";
      }
    }catch{}
    
    //modify note buttons and move from newnotediv
    let buttons = noteDiv.getElementsByClassName("noteButton");
    buttons[1].remove();

    noteTitle.addEventListener("input", updateNoteFromEvent);
    try{
      noteContent.addEventListener("input", updateNoteFromEvent);
      noteContent.addEventListener("focusin", placeNoteInFocus);
    }catch{}

    noteTitle.addEventListener("focusin", placeNoteInFocus);

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
    let key = localStorage.key(i);
    if (!isNoteID(key)) {
      continue;
    }
    let ID = getIDNumFromString(key);
    //check for a gap to end early
    // if (ID > maxID + 1) { break; }// got rid of this so that we can easily sort the notes by recency by comparing the values of the keys

    maxID = ID > maxID? ID : maxID;
  }
  maxID++;
  return "note" + maxID.toString();
}

function isNoteID(idString) {
  return idString.slice(0, 4) === "note";
}

function getIDNumFromString(idString) {
  return Number(idString.slice(4));
}

function updateNoteFromEvent(e) {
  let currentNote = e.target;
  while (currentNote.className !== "note" && currentNote.className !== "noteInFocus") {
    currentNote = currentNote.parentNode;
  }

  localStorage.setItem(currentNote.id, currentNote.outerHTML);
}

function updateNote(note) {
  removePopups(note);
  localStorage.setItem(note.id, note.outerHTML);
}


function removePopups(note) {
  let colorPopup = note.getElementsByClassName("colorSwatchWrapper");
  if (colorPopup.length > 0) {
    colorPopup[0].remove();
  }

  let groupPopup = note.getElementsByClassName("groupSelectorWrapper");
  if (groupPopup.length > 0) {
    groupPopup[0].remove();
  }

  let deletePopup = note.getElementsByClassName("popupWrapper");
  if (deletePopup.length > 0) {
    deletePopup[0].remove();
  }
}

function trashNote(e) {
  let confirm = trashYesNoPopup(e.target, "Delete This Note?");
  
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
    let note = getNoteNodeFromChild(trashButton);
    if (note.className === "noteInFocus") {
      let notes = document.querySelectorAll("[id='" + note.id.toString() + "']");
      for (let n of notes) {
        n.remove();
      }
      document.querySelectorAll("div.blur")[0].remove();
      showAll();
    } else {
      note.remove();
    }
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

function placeNoteInFocus(e) {
  let note = getNoteNodeFromChild(e.target);
  let main = document.getElementById("main");
  let blur = document.createElement("div");
  let closeButton = document.createElement("button");
  let noteCopy = note.cloneNode(true);

  blur.className = "blur";
  noteCopy.className = "noteInFocus";
  closeButton.className = "noteButton";

  closeButton.innerHTML = "Close";
  closeButton.style.backgroundColor = note.style.backgroundColor;

  blur.addEventListener("click", placeNoteOutOfFocus);
  closeButton.addEventListener("click", placeNoteOutOfFocus);

 

  main.appendChild(blur);
  main.appendChild(noteCopy);
  noteCopy.getElementsByClassName("noteDeleteButtonWrapper")[0].appendChild(closeButton);
  
  //change focus
  if (e.target.className === "noteContent") {

    noteCopy.getElementsByClassName("noteContent")[0].focus();
    
  } else {
    noteCopy.getElementsByClassName("noteTitle")[0].focus();
  }

  addListenersToNote(noteCopy);
}


function placeNoteOutOfFocus(e) {
  let note = document.getElementsByClassName("noteInFocus")[0];

  note.className = "note";
  let buttons = note.getElementsByClassName("noteButton");
  for (let button of buttons) {
    if (button.innerHTML === "Close") {
      button.remove();
    }
  }
  updateNote(note);
  note.remove();
  document.querySelectorAll("div.blur")[0].remove();
  
  showAll();
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
  let groups = e.target;
  let displayGroups = document.querySelectorAll(".displayGroupSelectorWrapper");
  if (displayGroups.length > 0) {
    for (let g of displayGroups) {
      g.remove();
    }
    return;
  }


  let wrapper = document.createElement("div");

  wrapper.className = "displayGroupSelectorWrapper";
  groups.after(wrapper);

  //add all groups
  let noteGroups = getAllNoteGroupKeys();
  for (let noteGroup of noteGroups) {
    let temp = groupToDisplayGroup(getGroupKeyNoPrefix(noteGroup));
    wrapper.appendChild(temp);
  } 

}

function displayGroup(e) {

  let group = e.target.className === "displayGroupContent"? e.target.innerHTML : e.target.firstChild.innerHTML;
  let groupKey = "group".concat(group);
  let notesInGroup = getNotesInGroup(groupKey);
  removeNotes();
  let notes = getNotesFromLocalStorage();
  
  for (let note of notes) {
    if (notesInGroup.includes(note.id)) {
      getShortestColumn().prepend(note);
    }
  }
  addListeners();

}

function groupsAvailable(e) {

}




//general functions

function getNoteNodeFromChild(child) {
  while (child.className !== "note" && child.className !== "noteInFocus") {
    child = child.parentNode;
  }
  return child;
}


function getNotesFromDOM() {
  return document.querySelectorAll("div.note");
}

function getNotesFromLocalStorage() {
  //get notekeys
  let noteKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (isNoteID(key)) {
      noteKeys.push(getIDNumFromString(key))
    } else if (key !== "stylemodifier" && !isNoteGroup(key)) {
      localStorage.removeItem(key);
    }
  }
  //sort the keys by recency
  noteKeys.sort();

  //get notes as dom elements
  let notes = [];
  for (let key of noteKeys) {
    notes.push(new DOMParser().parseFromString(localStorage.getItem("note" + key.toString()), "text/html").querySelectorAll(".note")[0]);
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

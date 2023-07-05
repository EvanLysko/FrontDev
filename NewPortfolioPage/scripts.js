let lightColors = ["rgb(253, 228, 207)", "rgb(241, 192, 232)", "rgb(163, 196, 243)", "rgb(144, 219, 244)", "rgb(185, 251, 192)", "rgb(255, 255, 255)"];
let darkColors = ["rgb(101, 91, 83)", "rgb(96, 77, 93)", "rgb(65, 78, 97)", "rgb(58, 88, 98)", "rgb(74, 100, 77)", "rgb(18, 18, 18)"];



function run() {

    let languageBox = getLanguagesElement({"Java" : 6,  "Javascript" : 5, "Python" : 3, "HTML" : 2, "CSS" : 2, "C++" : 1, "SQL" : 1, "PHP" : 1});
    languageBox.id = "languageBox";

    document.getElementById("LanguageBoxWrapper").appendChild(languageBox);

    addPosition("Software Developer - Manthe Industries LLC  (2022 - Current)", "I actively aid in the development and maintance of multiple software products. I help find and fix bugs, add new features, and improve the overall quality of the software. New Features often include functional and visual UI/UX elements. I work with a small team that facilitates dynamic development strategies.", 
    {"Java" : 3.5, "C++" : 1}, "resources/logo.webp", "https://www.vape.gg/", "Company Product Page");

    addProject("TakeNote", "A note taking website that allows you to create, edit, delete notes. Users can also add notes to custom groups and show only notes from certain groups on screen. Notes can also be pinned and or favorited. Note background colors can be changed. Notes can be turned into checklists where you can add new tasks, mark them completed, or delete them. The website also allows users to switch between simple light and dark themes.",
    {"Javascript" : 6, "CSS" : 2, "HTML" : 1}, "https://github.com/EvanLysko/TakeNote", "/TakeNote/index.html");

    addProject("Chess", "A fully functional chess game that allows a user to play a local game of chess. It includes all standard chess rules and features. It also includes the ability to look back through previous moves throughout the game sequence.",
    {"Javascript" : 6, "CSS" : 2, "HTML" : 1}, "https://github.com/EvanLysko/FrontDev/tree/main/ChessGame", "/ChessGame/index.html");

    addProject("Weather Website - revisit in progress", "A website that allows users to search by city or zip code and get a current, hourly, and daily forecast. It includes a live, interactable map as well as a table displaying the current air quality.",
    {"Javascript" : 6,"CSS" : 2, "HTML" : 1}, "https://github.com/EvanLysko/WeatherPage", "/WeatherPage/index.html");

    //python
    addProject("Python Projects", "A collection of python projects I have worked on. It is mostly comprised of data processing, analysis, and visualization projects. It also includes some web scraping and machine learning.",
    {"Python" : 2}, "https://github.com/EvanLysko/Python-Projects", "resources/pythongraphs2.png")
    
    //c++
    addProjectNoImg("C Sockets", "A very small project creating and using sockets with C. It includes a server and client program that can send and recieve messages.",
    {"C" : 2}, "resources/github-mark-white.svg", "https://github.com/EvanLysko/C-Cplusplus", "");

    //sql
    addProjectNoImg("'Client' SQL Database", "A basic database created by myself and a peer using Microsoft Access and SQL. It includes a database with multiple tables, queries, forms, and reports.",
    {"SQL" : 2}, "resources/github-mark-white.svg", "https://github.com/EvanLysko/SQL", "");

    //research
    addResearch("An Investigation of Personality Constructs as Moderators of the Relationship Between Political Affiliation and Compliance with COVID-19 Restrictions",
     "Abstract:\nAdherence to COVID-19 restrictions was necessary to prevent the spread of the virus and contain the spreading that had already occurred, potentially saving lives.  And yet, within the US specifically, there was palpable and explicit resistance to these restrictions.  It somehow became a political issue, as the resistance seemed to coincide with political affiliation.  These authors were seeking an explanation for this relationship, as this study aimed to discover whether there were shared underlying personality constructs that may have influenced both.  Participants were recruited via social media, with a shared link to the anonymous online survey.  The survey was composed of 60 items measuring Empathy, Agreeableness, Narcissism, and Psychopathy, as well as questions added by the authors which included demographic questions and questions about political affiliation and COVID-19 restriction compliance.  In support of the first hypothesis, there were significant differences between Republicans and Democrats on reported likelihood of compliance for all three COVID-19 restrictions (stay-at-home, social distancing, and mask wearing), with Republicans reporting significantly less likelihood to comply.  However, none of the constructs appeared to moderate the relationship between political affiliation and COVID-19 restriction compliance, with one exception (Psychopathy).  Other possible explanations for this relationship are discussed.",
    {}, "resources/google-drive-icon-18-48.png", "https://drive.google.com/drive/folders/1Yjb41hTcqoNLIURYGWGyOyc1O1cNzrdE?usp=sharing", "Google Drive Link");

    addResearch("The Effectiveness of Doodling as a Note-Taking Strategy",
    "Abstract:\nMeade, Wammes, and Fernandes (2019) found that structured drawing produced the best recall of target words, followed by writing the words, and lastly unstructured doodling. In the present study, we intend to define “doodling” more broadly, to include both drawing strategies, and to then attempt to reproduce these findings in a more typical classroom situation. Participants will be instructed to either take Traditional Notes, Doodle Only, or Doodle + Take Notes, and recall of lecture material will then be tested. With a broader definition, we expect to see the highest recall ability from the Doodle + Notes group as it combines both writing and drawing encoding pathways without any of the limitations induced by other group treatments and these results will likely be more generalizable to typical classroom settings.",
    {}, "resources/google-drive-icon-18-48.png", "https://drive.google.com/drive/folders/1sqPfzsshifHmj_HbngShCUMOotMSg5Wd?usp=sharing", "Google Drive Link");

}

function getLanguagesElement(languageDict) {
    let projectLanguages = document.createElement("div");

    let totalLanguageUnits = 0;
    let totalLargerLanguageUnits = 0;
    for (let language of Object.keys(languageDict)) {
        totalLanguageUnits += languageDict[language];
        if (languageDict[language] > 1) {
            totalLargerLanguageUnits += languageDict[language];
        }
    }

    let minwidth = 52;
    let minTotalWidth = minwidth * Object.keys(languageDict).length;
    let mainWidth = document.getElementById("main").offsetWidth;
    let extraWidth = Math.max(mainWidth - minTotalWidth, 0);
    let minwidthProp = minwidth / mainWidth;
    let extraWidthProp = extraWidth / mainWidth;

    let offsetFix = Math.max(16 * (Object.keys(languageDict).length -1), 0)/Object.keys(languageDict).length;
    for (let language of Object.keys(languageDict)) {
        let languageElement = document.createElement("div");
        if (language == "C++") {
            languageElement.className = "language Cplusplus";
        } else {
            languageElement.className = "language " + language;
        }
        languageElement.innerHTML = language;
        projectLanguages.appendChild(languageElement);

        let percentage = (((languageDict[language]) / totalLanguageUnits) * extraWidthProp + minwidthProp) * 100

        languageElement.style.width = "calc(" + percentage + "%" + " + " + offsetFix + "px)";
    }
    return projectLanguages;
}

function addPosition(positionTitle, positionDescription, positionDict, positionImgSrc, positionLink, positionLinkText) {
    let positionWrapper = document.createElement("div");
    positionWrapper.className = "projectWrapper itemWrapper";

    let positionTitleandLanguageWrapper = document.createElement("div");
    positionTitleandLanguageWrapper.className = "projectTitleAndLanguageWrapper";

    let positionTitleElement = document.createElement("h2");
    positionTitleElement.className = "projectTitle";
    positionTitleElement.innerHTML = positionTitle;

    
    let positionDescriptionElement = document.createElement("p");
    positionDescriptionElement.className = "positionDescription";
    positionDescriptionElement.innerHTML = positionDescription;

    let positionLanguages = getLanguagesElement(positionDict);
    positionLanguages.className = "projectLanguages";


    let positionLinkWrapper = document.createElement("div");
    positionLinkWrapper.className = "projectLinkWrapper";

    let positionLinkElement = document.createElement("a");
    positionLinkElement.href = positionLink;
    positionLinkElement.target = "_blank";
    let positionLinkImage = document.createElement("img");
    positionLinkImage.src = positionImgSrc;
    positionLinkImage.className = "PositionLinkImage";
    let positionLinkTextElement = document.createElement("p");
    positionLinkTextElement.innerHTML = positionLinkText;
    positionLinkElement.appendChild(positionLinkImage);
    positionLinkElement.appendChild(positionLinkTextElement);
    positionLinkWrapper.appendChild(positionLinkElement);

    

    positionTitleandLanguageWrapper.appendChild(positionTitleElement);
    positionTitleandLanguageWrapper.appendChild(positionLanguages);
    positionWrapper.appendChild(positionTitleandLanguageWrapper);

    positionWrapper.appendChild(positionDescriptionElement);
    positionWrapper.appendChild(positionLinkWrapper);

    document.getElementById("PositionsWrapper").appendChild(positionWrapper);
}

function addProjectNoImg(positionTitle, positionDescription, positionDict, positionImgSrc, positionLink, positionLinkText) {
    let positionWrapper = document.createElement("div");
    positionWrapper.className = "projectWrapper itemWrapper";

    let positionTitleandLanguageWrapper = document.createElement("div");
    positionTitleandLanguageWrapper.className = "projectTitleAndLanguageWrapper";

    let positionTitleElement = document.createElement("h2");
    positionTitleElement.className = "projectTitle";
    positionTitleElement.innerHTML = positionTitle;

    
    let positionDescriptionElement = document.createElement("p");
    positionDescriptionElement.className = "positionDescription";
    positionDescriptionElement.innerHTML = positionDescription;

    let positionLanguages = getLanguagesElement(positionDict);
    positionLanguages.className = "projectLanguages";


    let positionLinkWrapper = document.createElement("div");
    positionLinkWrapper.className = "projectLinkWrapper";

    let positionLinkElement = document.createElement("a");
    positionLinkElement.href = positionLink;
    positionLinkElement.target = "_blank";
    let positionLinkImage = document.createElement("img");
    positionLinkImage.src = positionImgSrc;
    positionLinkImage.className = "ProjectGithubLinkImage SocialIcon";
    positionLinkImage.title = "Github Link";
    positionLinkImage.alt = "Github Link";

    let positionLinkTextElement = document.createElement("p");
    positionLinkTextElement.innerHTML = positionLinkText;
    positionLinkElement.appendChild(positionLinkImage);
    positionLinkElement.appendChild(positionLinkTextElement);
    positionLinkWrapper.appendChild(positionLinkElement);

    

    positionTitleandLanguageWrapper.appendChild(positionTitleElement);
    positionTitleandLanguageWrapper.appendChild(positionLanguages);
    positionWrapper.appendChild(positionTitleandLanguageWrapper);

    positionWrapper.appendChild(positionDescriptionElement);
    positionWrapper.appendChild(positionLinkWrapper);

    document.getElementById("ProjectsWrapper").appendChild(positionWrapper);
}

function addResearch(positionTitle, positionDescription, positionDict, positionImgSrc, positionLink, positionLinkText) {
    let positionWrapper = document.createElement("div");
    positionWrapper.className = "projectWrapper itemWrapper";

    let positionTitleandLanguageWrapper = document.createElement("div");
    positionTitleandLanguageWrapper.className = "researTitleWrapper";

    let positionTitleElement = document.createElement("h2");
    positionTitleElement.className = "researchTitle";
    positionTitleElement.innerHTML = positionTitle;

    
    let positionDescriptionElement = document.createElement("p");
    positionDescriptionElement.className = "positionDescription";
    positionDescriptionElement.innerHTML = positionDescription;

    let positionLanguages = getLanguagesElement(positionDict);
    positionLanguages.className = "projectLanguages";


    let positionLinkWrapper = document.createElement("div");
    positionLinkWrapper.className = "projectLinkWrapper";

    let positionLinkElement = document.createElement("a");
    positionLinkElement.href = positionLink;
    positionLinkElement.target = "_blank";
    let positionLinkImage = document.createElement("img");
    positionLinkImage.src = positionImgSrc;
    positionLinkImage.className = "ProjectGithubLinkImage SocialIcon";
    let positionLinkTextElement = document.createElement("p");
    positionLinkTextElement.innerHTML = positionLinkText;
    positionLinkTextElement.className = "researchLinkText";
    positionLinkElement.appendChild(positionLinkImage);
    positionLinkElement.appendChild(positionLinkTextElement);
    positionLinkWrapper.appendChild(positionLinkElement);

    

    positionTitleandLanguageWrapper.appendChild(positionTitleElement);
    positionTitleandLanguageWrapper.appendChild(positionLanguages);
    positionWrapper.appendChild(positionTitleandLanguageWrapper);

    positionWrapper.appendChild(positionDescriptionElement);
    positionWrapper.appendChild(positionLinkWrapper);

    document.getElementById("ResearchWrapper").appendChild(positionWrapper);
}



function addProject(projectTitle, projectDescription, languageDict, githubLink, projectLink) {
    let projectWrapper = document.createElement("div");
    projectWrapper.className = "projectWrapper itemWrapper";

    let projectTitleandLanguageWrapper = document.createElement("div");
    projectTitleandLanguageWrapper.className = "projectTitleAndLanguageWrapper";

    let projectTitleElement = document.createElement("h2");
    projectTitleElement.className = "projectTitle";
    projectTitleElement.innerHTML = projectTitle;

    let projectDescriptionAndImageWrapper = document.createElement("div");
    projectDescriptionAndImageWrapper.className = "projectDescriptionAndImageWrapper";

    let projectDescriptionElement = document.createElement("p");
    projectDescriptionElement.className = "projectDescription";
    projectDescriptionElement.innerHTML = projectDescription;

    let projectLanguages = getLanguagesElement(languageDict);
    projectLanguages.className = "projectLanguages";

    let projectLiveObject;
    if (projectLink.includes("resources")) {
        projectLiveObject = document.createElement("img");
        projectLiveObject.className = "projectImage";
        projectLiveObject.src = projectLink;
    } else {
    // let projectImageWrapper = document.createElement("div");
    // let projectImageLink = document.createElement("a");
    // projectImageLink.href = projectLink;
    // projectImageLink.target = "_blank";
    // projectImageWrapper.className = "projectImageWrapper";
    // let projectImageElement = document.createElement("img");
    // projectImageElement.className = "projectImage";
    // projectImageElement.src = projectImage;
    // projectImageLink.appendChild(projectImageElement);
    // projectImageWrapper.appendChild(projectImageLink);
        projectLiveObject = document.createElement("object");
        projectLiveObject.className = "projectLiveObject";
        projectLiveObject.data = projectLink;
        projectLiveObject.type = "text/html";
    }
    // let projectImageLink = document.createElement("a");
    // projectImageLink.href = projectLink;
    // projectImageLink.target = "_blank";
    // projectImageWrapper.className = "projectImageWrapper";
    // let projectImageElement = document.createElement("img");
    // projectImageElement.className = "projectImage";
    // projectImageElement.src = projectImage;
    // projectImageLink.appendChild(projectImageElement);
    // projectImageWrapper.appendChild(projectImageLink);


    let projectLinkWrapper = document.createElement("div");
    projectLinkWrapper.className = "projectLinkWrapper";

    let githubLinkElement = document.createElement("a");
    githubLinkElement.href = githubLink;
    githubLinkElement.target = "_blank";
    let githubLinkImage = document.createElement("img");
    githubLinkImage.src = "resources/github-mark-white.svg";
    githubLinkImage.className = "ProjectGithubLinkImage SocialIcon";
    githubLinkImage.alt = "Github Link";
    githubLinkImage.title = "Github Link";
    githubLinkElement.appendChild(githubLinkImage);
    projectLinkWrapper.appendChild(githubLinkElement);

    let projectLinkElement = document.createElement("a");
    projectLinkElement.href = projectLink;
    projectLinkElement.target = "_blank";
    let projectLinkImage = document.createElement("img");
    projectLinkImage.src = "resources/fullscreen_FILL0_wght400_GRAD0_opsz48.svg";
    projectLinkImage.className = "projectLinkImage SocialIcon";
    projectLinkImage.alt = "Fullscreen Project";
    projectLinkImage.title = "Fullscreen Project";
    projectLinkElement.appendChild(projectLinkImage);
    projectLinkWrapper.appendChild(projectLinkElement);

    
    projectDescriptionAndImageWrapper.appendChild(projectLiveObject);
    projectDescriptionAndImageWrapper.appendChild(projectDescriptionElement);
    projectTitleandLanguageWrapper.appendChild(projectTitleElement);
    projectTitleandLanguageWrapper.appendChild(projectLanguages);
    projectWrapper.appendChild(projectTitleandLanguageWrapper);
    projectWrapper.appendChild(projectDescriptionAndImageWrapper);
    projectWrapper.appendChild(projectLinkWrapper);

    document.getElementById("ProjectsWrapper").appendChild(projectWrapper);
}



run();

// document.body.classList.add("js-loading");
// window.addEventListener("load", removeLoadingClass);


// function removeLoadingClass() {
//     document.body.classList.remove('js-loading');
// }

let observerOptions = {
    rootMargin: "0% -30% 0% -30%",
    threshold: 0
}

var observer = new IntersectionObserver(observerCallback, observerOptions);

function observerCallback(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("fadeInFromRightAnimation");
        }
    });
};

let target = '.itemWrapper';
document.querySelectorAll(target).forEach((i) => {
        observer.observe(i);
});

var observer1 = new IntersectionObserver(observerCallback1, observerOptions);

function observerCallback1(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("fadeInAnimation");
        }
    });
};


let target1 = '.sectionWrapper';
document.querySelectorAll(target1).forEach((i) => {
        observer1.observe(i);
});

var observer2 = new IntersectionObserver(experienceCallback, observerOptions);
function experienceCallback(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("fadeInSlowerAnimation");
        }
    });
}
observer2.observe(document.getElementById("ExperienceWrapper"));

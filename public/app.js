const questions = [
    {
        number: 1,
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hyperlink and Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Markup Language"
        ],
        correct: 0
    },
    {
        number: 2,
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
        correct: 2
    },
    {
        number: 3,
        question: "What is the correct way to write a JavaScript array?",
        options: [
            "const colors = (1:'red', 2:'green', 3:'blue')",
            "const colors = ['red', 'green', 'blue']",
            "const colors = 'red', 'green', 'blue'",
            "const colors = {1:'red', 2:'green', 3:'blue'}"
        ],
        correct: 1
    },
    {
        number: 4,
        question: "Which HTML tag is used to link an external JavaScript file?",
        options: [
            "script",
            "javascript",
            "js",
            "link"
        ],
        correct: 0
    },
    {
        number: 5,
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2
    },
    {
        number: 6,
        question: "Which method is used to select an element by its ID in JavaScript?",
        options: [
            "document.querySelector()",
            "document.getElementById()",
            "document.getElementByClass()",
            "document.findElement()"
        ],
        correct: 1
    },
    {
        number: 7,
        question: "What is the purpose of the 'alt' attribute in an HTML image tag?",
        options: [
            "To specify alternative text when the image cannot be displayed",
            "To add a caption to the image",
            "To link the image to another page",
            "To style the image"
        ],
        correct: 0
    },
    {
        number: 8,
        question: "Which of these is NOT a JavaScript framework or library?",
        options: [
            "React",
            "Angular",
            "Vue",
            "CSS"
        ],
        correct: 3
    },
    {
        number: 9,
        question: "What does the 'DOM' stand for in JavaScript?",
        options: [
            "Data Object Model",
            "Document Object Model",
            "Display Object Management",
            "Digital Object Maker"
        ],
        correct: 1
    },
    {
        number: 10,
        question: "Which HTML5 tag is used for drawing graphics via JavaScript?",
        options: [
            "graphic",
            "canvas",
            "draw",
            "svg"
        ],
        correct: 1
    }
];
// ... (your questions array remains the same)

let wholeTime = 600000; // 10 minutes in milliseconds
let timer;
let quizActive = true; // Flag to track if quiz is still active

function startTimer() {
    timer = setInterval(() => {
        let timeLeft = document.getElementById("time-left");
        wholeTime = wholeTime - 1000; 
        const getMinute = Math.floor((wholeTime/1000/60) % 60);
        const getSeconds = Math.floor((wholeTime/1000) % 60);
        timeLeft.textContent = `${getMinute}:${getSeconds < 10 ? '0' : ''}${getSeconds}`;
        
        if(wholeTime <= 0) {
            clearInterval(timer);
            quizActive = false;
            console.log("Time is up!");
            endQuiz("Time is up!");
        }
    }, 1000);
}

startTimer(); // Start the timer when the page loads

let POINT = 0;
const nextBtn = document.getElementById("nextBtn");
let indexNumber = 0;
const divParent = document.getElementById("divParent");

function endQuiz(message) {
    divParent.innerHTML= "";
    let result = POINT < 10 ? "You Failed" : POINT < 15 ? "You got the medium score" : "Excellent";
    divParent.innerHTML = `
        <h1>${message}</h1>
        <h1>You got ${POINT} /20 ${result}</h1>
    `;
}

function displayQuestion(index) {
    if (!quizActive) return; // Don't show questions if time is up
    
    const divQ = document.getElementById("divQuestion");
    const divOptions = document.getElementById("options");
    
    divQ.innerHTML = "";
    divOptions.innerHTML = "";

    const question = document.createElement("h1");
    question.textContent = questions[index].number + ". " + questions[index].question;
    divQ.append(question);
    
    for(let option of questions[index].options) {
        const Divoption = document.createElement("div");
        Divoption.innerHTML = `<h1>${option}</h1>`;
        Divoption.className = "options";
        
        Divoption.addEventListener("click", () => {
            if (!quizActive) return; // Don't process answers if time is up
            
            if(option === questions[index].options[questions[index].correct]) {
                POINT += 2;
                Divoption.classList.add("correct-answer");
            } else {
                Divoption.classList.add("wrong-answer");
            }
        });
        
        divOptions.append(Divoption);
    }
}

// Initial question display
displayQuestion(0);

nextBtn.addEventListener("click", () => {
    if (!quizActive) return; // Don't allow navigation if time is up
    
    indexNumber++;
    if(indexNumber > 9) {
        endQuiz("Quiz completed!");
    } else {
        displayQuestion(indexNumber);
    }
});
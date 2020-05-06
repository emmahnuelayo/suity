//classes
const start = document.getElementsByClassName("start");
const quiz = document.getElementsByClassName("quiz");
const question = document.getElementsByClassName("question");
const choiceA = document.getElementsByClassName("A");
const choiceB = document.getElementsByClassName("B");
const counter = document.getElementsByClassName("counter");
const timeGauge = document.getElementsByClassName("timeGauge");
const progress = document.getElementsByClassName("progress");
const scoreDiv = document.getElementsByClassName("scoreContainer");


//manual section
const mQuestion = question[0];
const mQuiz = quiz[0];
const mStart = start[0];
const mChoiceA = choiceA[0];
const mChoiceB = choiceB[0];
const mCounter = counter[0];
const mTimeGauge = timeGauge[0];
const mProgress = progress[0];
const mScoreDiv = scoreDiv[0];

//manual questions
let mQuestions = [{
        mQuestion: "Psalm 37:4 Delight yourself also in the LORD, And He shall give you the desires of your heart. Is the Memory verse for which topic and Lesson of the manual?",
        mChoiceA: "Dynamics of Prayer in the New Year",
        mChoiceB: "Dynamics of Bible Study in the New Year 1",
        correct: "mA"
    },
    {
        mQuestion: "Which is not among the three outlines of Lesson 1?",
        mChoiceA: "Prayer for Power",
        mChoiceB: "Prayer for Grace",
        correct: "mB"
    },
    {
        mQuestion: "The memory verse to Lesson on A Prayer Pattern of a Patriot is taken from where?",
        mChoiceA: "Daniel 19:9",
        mChoiceB: "Daniel 9:19",
        correct: "mB"
    },
    {
        mQuestion: "Fill in the missing text:\n Every sincere Christian wants to have a more meaningful personal ______ in order to understand the Bible better",
        mChoiceA: "Prayer Life",
        mChoiceB: "Bible Study",
        correct: "mB"
    },
    {
        mQuestion: "Where is the memory verse of Dynamics of Bible study in the New Year Part 1 taken from?",
        mChoiceA: "2nd Timothy 2:15",
        mChoiceB: "1st Timothy 2:15",
        correct: "mA"
    },
    {
        mQuestion: "Which is not part of the dynmaics taught in the Dynamics of the New Year Parts 1 & 2?",
        mChoiceA: "Use Specialized Tools",
        mChoiceB: "Get a good translation",
        correct: "mA"
    },
    {
        mQuestion: "Who developed and signed the foreword of this Year Adult Manual?",
        mChoiceA: "Rev. (Mrs) K.O. Ayanbanjo",
        mChoiceB: "Rev Sam Aboyeji",
        correct: "mB"
    },
    {
        mQuestion: "Which is not part of the five most important things to remember in Dynamics of Bible study in the New Year?",
        mChoiceA: "Who wrote it?",
        mChoiceB: "What does it say?",
        correct: "mA"
    },
    {
        mQuestion: "How many lesson outlines are in Ignoring God's plain truth?",
        mChoiceA: "Two",
        mChoiceB: "Three",
        correct: "mA"
    },
    {
        mQuestion: "Who developed and signed the Preface to this Year Adult Manual?",
        mChoiceA: "Rev. (Mrs) K.O. Ayanbanjo",
        mChoiceB: "Rev Sam Aboyeji",
        correct: "mA"
    }
];

//variables
const mLastQuestion = mQuestions.length - 1;
let mRunningQuestion = 0;
let score = 0;
let count = 0;
let questionTime = 20; //20s
let gaugeWidth = 150; //150px
let gaugeUnit = gaugeWidth / questionTime;
let TIMER;

// render a question
function renderQuestion() {
    let q = mQuestions[mRunningQuestion];

    mQuestion.innerHTML = "<p>" + q.mQuestion + "</p>";
    mChoiceA.innerHTML = q.mChoiceA;
    mChoiceB.innerHTML = q.mChoiceB;
}

//render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= mLastQuestion; qIndex++) {
        mProgress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

//counter render
function renderCounter() {

    if (count <= questionTime) {
        mCounter.innerHTML = count;
        mTimeGauge.style.width = count * gaugeUnit + "px";
        count++;
    } else {
        count = 0;
        //change progress color to red
        answerIsWrong()
        if (mRunningQuestion < mLastQuestion) {
            mRunningQuestion++;
            renderQuestion();
        }
    }
}


//checkAnswer
function checkAnswer(answer) {
    if (answer == mQuestions[mRunningQuestion].correct) {
        //answer is correct
        score++;
        //change progress color to green
        answerIsCorrect()
    } else {
        //answer is wrong
        //change progress color to red
        answerIsWrong()
    }
    count = 0;
    if (mRunningQuestion < mLastQuestion) {
        mRunningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show score
        clearInterval(TIMER);
        scoreRender();
    }
}

//answer is correct
function answerIsCorrect() {
    document.getElementById(mRunningQuestion).style.backgroundColor = "#0f0";
}

//answer is wrong
function answerIsWrong() {
    document.getElementById(mRunningQuestion).style.backgroundColor = "#f00";
}

//score render
function scoreRender() {
    mScoreDiv.style.display = "block";
    //calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / mQuestions.length);

    //choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "images/img/5.png" :
        (scorePerCent >= 60) ? "images/img/4.png" :
        (scorePerCent >= 40) ? "images/img/3.png" :
        (scorePerCent >= 20) ? "images/img/2.png" :
        "img/1.png";
    mScoreDiv.innerHTML = "<img src=" + img + ">";
    mScoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";

}

//start quiz function
function startQuiz() {
    mStart.style.display = "none";
    renderQuestion();
    mQuiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); //1000ms = 1s 
}

//event handler to start the quiz 
mStart.addEventListener("click", startQuiz);
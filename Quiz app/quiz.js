let body=document.body;
let parentt=document.getElementById("parent");
let timeover=document.getElementsByClassName("timeover")[0]
let startbtn=document.getElementById("startbtn");
let questions=document.getElementsByClassName("question")[0];
let text=document.getElementsByClassName("text")[0];//question text
let timer=document.getElementsByClassName("timer")[0];
let previou=document.getElementsByClassName("previous")[0];
let choices=document.getElementsByClassName("choicesparent")[0];//choices parent
let result=document.getElementsByClassName("result")[0];
let choice=document.getElementsByTagName("li");// choices list items
let submitbtn=document.getElementById("submitbtn");
let quiz=document.getElementsByClassName("quiz")[0];
let reviewq=document.getElementsByClassName("reviewq");
let quizq=document.getElementById("quizquestion");
let youranswer=document.getElementsByClassName("youranswer")[0]
let correctanswer=document.getElementsByClassName("correctanswer")[0]
let answertext;
let board=[
    {
        textofquestion:"What is the capital city of Canada?",
        choiceslist:["Toronto","Vancouver","Ottawa","Montreal"],
        answer:"Ottawa",
        questionnumber:1,
        answerclient:""
    },
   {
        textofquestion:"Which is the longest river in the world?",
        choiceslist:["The Nile River","The Amazon River","The Yangtze River","The Mississippi River"],
        answer:"The Nile River",
        questionnumber:2,
        answerclient:""

    },
    {
        textofquestion:"On which continent is Japan located?",
        choiceslist:["Asia","Europe","Africa","South America"],
        answer:"Asia",
        questionnumber:3,
        answerclient:""

    },
    {
        textofquestion:"What is the largest country in the world?",
        choiceslist:["Russia","Canada","China","United States"],
        answer:"Russia",
        questionnumber:4,
        answerclient:""
   
    },
]
let checkstartclick=false;
let numberofchoice;
let truthcounter=0; //number of truth answer
let checkclicked=false;
let timercounter;
let endtime=false;
let s=10;
let m=1;
let time=null;
quiz.classList.add("hidden")
window.addEventListener("load", function () {
  if (localStorage.getItem("autoStart") === "true") {
    localStorage.removeItem("autoStart");
    startbtn.click();
  }
});

function display(truthc){
    if(truthc){
                                choices.innerHTML=`
                                <h1>🏆 PERFECT SCORE!</h1>
                                <h1> ${truthcounter} / 4 </h1>
                                <p style="font-size: 25px;">you have ${truthcounter} truth answers , Fantastic job! You're doing amazing!  Keep up this incredible momentum!!  </p>
                                `
                                choices.children[1].style.cssText=`
                                    color: #267acc;
                                    font-weight: bold;
                                    margin-bottom: 25px;
                                    font-size: 42px;
                                `
                                choices.style.cssText=`
                                                text-align: center;
                                            word-wrap=break-word
                                            `
                            }
                            else{
                                choices.innerHTML=`
                                <h1>Don't Give Up!</h1>
                                <h1> ${truthcounter} / 4 </h1>
                                <p style="font-size: 25px;">You got 0 correct answers this time, but every expert was once a beginner! Don't give up, you're learning and improving with every try! </p>
                                `
                                choices.children[1].style.cssText=`
                                    color: #267acc;
                                    font-weight: bold;
                                    margin-bottom: 25px;
                                    font-size: 42px;
                                `

                                choices.style.cssText=`
                                text-align: center;
                                word-wrap:break-word;
                                `
                            }
                            
                            let btn = document.createElement("button");
                            btn.textContent = "🔄 Try Again";
                            btn.style.fontSize="20px"
                            btn.style.marginTop = "26px";

                           btn.addEventListener("click", function () {
                                localStorage.setItem("autoStart", "true");
                                location.reload();
                                });

                            choices.appendChild(btn);
                            
            }

startbtn.addEventListener("click",function(){
    result.classList.add("hidden")
    parentt.classList.remove("btn");
    questions.classList.remove("hidden");
    choices.classList.remove("hidden");
    
    text.innerHTML=` ${1}- ${board[0].textofquestion}`
    for(let i=0 ; i<choice.length ; i++){
        choice[i].textContent=`${board[0].choiceslist[i]}`
    }
    checkstartclick=true;
    startbtn.remove();
    //timer
    time=setInterval(function(){
        if(s>0 && m==1){
            if(s>10){

                timer.textContent=`0${m} ; ${--s}`
            }
            else{
                timer.textContent=`0${m} ; 0${--s}`
            }
            if(s==0){
                m=0;
                s=60;
            }
            
        }
        else{
            if(s>0){
                if(s>10){

                    timer.textContent=`0${m} ; ${--s}`
                }
                else{
                    timer.textContent=`0${m} ; 0${--s}`
                }
                    
                    timer.textContent=`0${m} ; ${--s}`
            }
            else{
                clearInterval(time);
                time=null
                timer.textContent=`00 ; 00`
                questions.classList.add("hidden");
                choices.classList.add("hidden");
                submitbtn.classList.add("hidden");
                timeover.classList.remove("hiddentimeover");
                setTimeout(() => {
                    timeover.classList.add("hiddentimeover");

                    parentt.classList.add("hiddencolor")
                    quiz.classList.remove("hidden")
                   
                    for(let i=0 ; i<4 ; i++){
                        reviewq[i].children[2].classList.remove("hidden");
                        reviewq[i].children[3].classList.remove("hidden");
                         reviewq[i].children[0].children[1].innerHTML=`${board[i].textofquestion}`
                        // choice[i].classList.add("hidden");
                        if(board[i].answer != board[i].answerclient){
                            reviewq[i].children[3].children[1].textContent=` ${board[i].answer}`

                           if(board[i].answerclient){
                               
                               reviewq[i].children[2].children[1].textContent=`${board[i].answerclient}`
                           }
                           else{
                            reviewq[i].children[2].children[1].textContent=` ⊘  you didn't answer !!!`

                           }

                        }

                        else{
                            reviewq[i].children[2].children[1].textContent=`${board[i].answerclient}`
                           reviewq[i].children[2].children[0].textContent=` ✅ your answer :`
                           reviewq[i].children[2].children[1].style.cssText=`
                            border: 2px solid green !important;
                            background-color: #D1FAE5 !important;
                           `
                           reviewq[i].children[3].classList.add("hidden");
                           
                       
                            
                        }

                    }
                    
                },4000)

                endtime=true;

                setTimeout(function(){
                    quiz.classList.add("hidden")
                    choices.classList.remove("hidden");
                    parentt.classList.remove("hiddencolor");
                    parentt.style.background="#267acc"
                    parentt.style.width="600px !important"
                    display(truthcounter);
                },10000)
        }
    }
    },1000)
})
let questioncounter=1;
submitbtn.addEventListener("click",function(){
    
            if(questioncounter==3){
                submitbtn.innerHTML="submit"
            }
                if(questioncounter==1){
                    previou.classList.remove("before");
                }
            
                    
                    
                        if(!checkclicked){
                            answertext=""

                        }
                        else{
                            answertext=choice[numberofchoice].textContent;
                        }                 
                        board[questioncounter-1].answerclient=`${answertext}`
                        if(answertext==board[questioncounter-1].answer){
                            truthcounter++
                        } 
                    // if(m==1 && d==20 ){
                    //     questioncounter=10;
                    // }                
                    if(questioncounter<4){
                                    
                        if(questioncounter<=choice.length){
                                
                                text.innerHTML=` ${questioncounter+1}- ${board[questioncounter].textofquestion}`
                                for(let i=0 ; i<choice.length ; i++){
                                    choice[i].style.backgroundColor="white";
                                    choice[i].textContent=`${board[questioncounter].choiceslist[i]}`
                                    
                                }
                                questioncounter++;
                            
                        }
                    }
                    else{
                                clearInterval(time);
                                timer.classList.add("hidden")
                                questions.classList.add("hidden");
                                choices.classList.add("hidden");
                                submitbtn.classList.add("hidden");
                                timeover.classList.remove("hiddentimeover");
                                timeover.innerHTML="Well done! You’ve completed the quiz.... "
                                setTimeout(() => {
                                        questions.classList.add("hidden");
                                        choices.classList.add("hidden");
                                        submitbtn.classList.add("hidden");
                                        timeover.classList.remove("hiddentimeover");
                                       
                                            timeover.classList.add("hiddentimeover");

                                            parentt.classList.add("hiddencolor")
                                            quiz.classList.remove("hidden")
                                        
                                            for(let i=0 ; i<4 ; i++){
                                                reviewq[i].children[2].classList.remove("hidden");
                                                reviewq[i].children[3].classList.remove("hidden");
                                                reviewq[i].children[0].children[1].innerHTML=`${board[i].textofquestion}`
                                                // choice[i].classList.add("hidden");
                                                if(board[i].answer != board[i].answerclient){
                                                        reviewq[i].children[3].children[1].textContent=` ${board[i].answer}`

                                                        if(board[i].answerclient){
                                                            
                                                            reviewq[i].children[2].children[1].textContent=`${board[i].answerclient}`
                                                        }
                                                        else{
                                                            reviewq[i].children[2].children[1].textContent=` ⊘  you didn't answer !!!`

                                                        }

                                                }

                                                else{
                                                            reviewq[i].children[2].children[1].textContent=`${board[i].answerclient}`
                                                        reviewq[i].children[2].children[0].textContent=` ✅ your answer :`
                                                        reviewq[i].children[2].children[1].style.cssText=`
                                                            border: 2px solid green !important;
                                                            background-color: #D1FAE5 !important;
                                                        `
                                                        reviewq[i].children[3].classList.add("hidden");
                                                
                                            
                                                    
                                                }

                                            }
                                                            
                                                        },3500)

                                                    
                                                        setTimeout(function(){
                                                            quiz.classList.add("hidden")
                                                            choices.classList.remove("hidden");
                                                            parentt.classList.remove("hiddencolor");
                                                            parentt.style.background="#267acc"
                                                            parentt.style.width="600px !important"
                                                            display(truthcounter);
                                                        },10000)
                                                
                                                    }       
                           
                            
})
    let j=0;
    
    for(let j=0 ; j<choice.length ; j++){
   
        
        choice[j].addEventListener("click",function(){
                
                    
                    if(checkstartclick){
                            for(let i=0 ; i<choice.length ; i++){
                            choice[i].style.backgroundColor="white";
                            
                            }
                            checkclicked=true;
                             numberofchoice=j;
                            choice[j].style.backgroundColor="#ff9966";    
                            choice[j].style.transition=".3s"
                            
                    }
                })
      
  }




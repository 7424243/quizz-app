/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: '“I\'m just one stomach flu away from my goal weight.”',
      answers: ['Mean Girls', 'The Devil Wears Prada', 'Bridesmaids', 'Ocean\'s 8'],
      correctAnswer: 'The Devil Wears Prada'
    },
    {
      question: '“Greater good? I am your wife! I\'m the greatest good you\'re ever gonna get!”',
      answers: ['Monsters, INC.', 'Meet the Robinsons', 'The Incredibles', 'Shrek'],
      correctAnswer: 'The Incredibles'
    },
    {
      question: '“I\'m a huge fan of the way you lose control and turn into an enormous green rage monster.”',
      answers: ['Marvel\'s The Avengers', 'Pirates of the Caribbean: The Curse of the Black Pearl', 'The Italian Job', 'Get Smart'],
      correctAnswer: 'Marvel\'s The Avengers'
    },
    {
      question: '“Whatever I feel like I wanna do, gosh.”',
      answers: ['Elf', 'Napoleon Dynamite', 'Nacho Libre', 'Get Smart'],
      correctAnswer: 'Napoleon Dynamite'
    },
    {
      question: '“Just smile and wave, boys. Smile and wave.”',
      answers: ['Finding Nemo', 'Cars', 'Toy Story', 'Madagascar'],
      correctAnswer: 'Madagascar'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function startPage() {
  // This function returns the initial starting page.
  // Returns a div, p, and form/input inside the <main></main>
  return `
    <div>
      <p>Instructions: Read the quote and select the movie that the quote is from.</p>
      <form>
        <button class="js-start-button" type="submit">Start Quiz</button>
      </form>
    </div>`
}

function questionPage(questionIndex) {
  // This function returns the basic HTML template of the question pages.
  // Returns 2 <h3>s in the header and a div, p, and form/inputs inside the <main></main>
  store.questionNumber = questionIndex;
  

  return `
    <div>
      <h4>Question Number: ${questionIndex + 1}/${store.questions.length}</h4>
      <h4>Score: /${store.questions.length}</h4>
      <p>Question: ${store.questions[questionIndex].question}</p>
      <form action="" method="post">
        <label><input type="radio" required="required" name="option" value="${store.questions[questionIndex].answers[0]}"/> ${store.questions[questionIndex].answers[0]}</label>
        <label><input type="radio" required="required" name="option" value="${store.questions[questionIndex].answers[1]}"/>  ${store.questions[questionIndex].answers[1]}</label>
        <label><input type="radio" required="required" name="option" value="${store.questions[questionIndex].answers[2]}"/>  ${store.questions[questionIndex].answers[2]}</label>
        <label><input type="radio" required="required" name="option" value="${store.questions[questionIndex].answers[3]}"/>  ${store.questions[questionIndex].answers[3]}</label>
        <input class="js-submit-button" type="submit"/>
     </form>  
    </div>`
    
}

function feedbackPage(questionIndex) {
  // This function returns the basic HTML template when the user submits an incorrect answer.
  // Returns a div, p (Incorrect. You should watch this movie!), an image of the movie, and a form/input button to move to the next question inside <main>
  score = store.score;
 
  html = '';
  
  if ($('input[name=option]:checked').val() === this.correctAnswer) {
    html = `
      <div>
        <h2>Correct! 🙂 </h2> 
        <form>
          <button class="js-next-button" type="submit">Next</button>
        </form>
      </div>`
      score += 1;
  } else {
    html = `
      <div>
          <h2>Incorrect. 🙁 You should watch ${store.questions[questionIndex].question}!</h2> 
          <form>
            <button class="js-next-button" type="submit">Next</button>
          </form>
        </div>`
  }

  return html; 
  
}

function completedQuizPage() {
  // This function returns the basic HTML template when the user has completed all 5 questions.
  // Returns a div, p (resulting score from corresponding <h3>, and a form/input button to Restart Quiz)
  return `
    
    <div>
      <h3>Quiz is complete!</h3>
      <p>Total Score: /${store.questions.length}</p>
      <form action="" method="POST">
        <button class="js-restart-button">Restart Quiz</button>
      </form>  
    </div>`
}


/*******HELPER FUNCTIONS*******/

function calculateTotalScore() {
  // This function will display the total correct answers out of 5 on the completedQuizPage

  
}

function calculateAnswerStatus() {
  // This function will caculate if the checked radio button is true or not and return the corresponding alert page.


}





/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function handleStartQuizButton() {
  console.log('handStartQuzButton called');
  // This button is found on the startPage. 
  // It will take you to the first questionPage().
  $('main').on('click', '.js-start-button', function(e) {
    e.preventDefault();
    store.quizStarted = true;
    renderHTML($('main'), questionPage(0));
  })
}

function handleSubmitAnswerButton() {
  console.log('handleSubmitAnswerButton called');
  // This button will take you to the correctAlertPage or incorrectAlertPage.
  $('main').on('click', '.js-submit-button', function(e) {
  e.preventDefault();
  renderHTML($('main'), feedbackPage());
  })
}

function handleNextQuestionButton() {
  console.log('handleNextQuestionButton called');
  // This button will take you to the next question object in the store array.
  $('main').on('click', '.js-next-button', function(e) {
    e.preventDefault();



    if (store.questionNumber + 1 < store.questions.length) {
      renderHTML($('main'), questionPage(store.questionNumber + 1));
    }
    else if (store.questionNumber + 1 >= store.questions.length) {
      renderHTML($('main'), completedQuizPage());
    }
    
   
  })
}

function handleRestartQuizButton() {
  console.log('handleRestartQuizButton called');
  // This button will reset the html template back to the startPage() and clear the score and question tracker.
  $('main').on('click', '.js-restart-button', function(e) {
    e.preventDefault();
    renderHTML($('main'), startPage());
    })
}




/********** RENDER FUNCTION(S) **********/

//container: jQuery object
//content: String
function renderHTML(container, content) {
  // This function conditionally replaces the contents of the <main> tag based on the state of the store
  container.html(content);
};


/******INIT FUNCTION*****/
function init() {
  console.log('init called');
  renderHTML($('main'), startPage());
  handleStartQuizButton();
  handleSubmitAnswerButton();
  handleNextQuestionButton();
  handleRestartQuizButton();
  
}


$(init);
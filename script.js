const questions = [
    { question: "What is the capital of France?", choices: ["Berlin", "Paris", "Madrid", "Rome"], correctAnswer: 1 },
    { question: "What is 2 + 2?", choices: ["3", "4", "5", "6"], correctAnswer: 1 },
    { question: "What is the largest planet in our solar system?", choices: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: 2 },
    { question: "Which ocean is the largest?", choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], correctAnswer: 2 },
    { question: "Who wrote 'Romeo and Juliet'?", choices: ["William Shakespeare", "Jane Austen", "Mark Twain", "Charles Dickens"], correctAnswer: 0 },
    { question: "What is the square root of 64?", choices: ["6", "7", "8", "9"], correctAnswer: 2 },
    { question: "What is the tallest mountain in the world?", choices: ["Mount Everest", "K2", "Kangchenjunga", "Mount Kilimanjaro"], correctAnswer: 0 },
    { question: "Which element has the chemical symbol 'O'?", choices: ["Oxygen", "Osmium", "Ozone", "Oganesson"], correctAnswer: 0 },
    { question: "In which country did the Olympic Games originate?", choices: ["USA", "France", "Greece", "Italy"], correctAnswer: 2 },
    { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Venus", "Jupiter"], correctAnswer: 1 },
    { question: "What is the chemical formula for water?", choices: ["CO2", "O2", "H2O", "H2O2"], correctAnswer: 2 },
    { question: "How many continents are there?", choices: ["5", "6", "7", "8"], correctAnswer: 2 },
    { question: "Which of these is not a primary color?", choices: ["Red", "Green", "Blue", "Yellow"], correctAnswer: 1 },
    { question: "Who was the first president of the United States?", choices: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], correctAnswer: 0 },
    { question: "Which animal is known as the 'King of the Jungle'?", choices: ["Elephant", "Tiger", "Lion", "Bear"], correctAnswer: 2 },
    { question: "What is the hardest natural substance on Earth?", choices: ["Gold", "Diamond", "Iron", "Platinum"], correctAnswer: 1 },
    { question: "Which country is known as the Land of the Rising Sun?", choices: ["China", "South Korea", "Japan", "Thailand"], correctAnswer: 2 },
    { question: "Which planet is closest to the Sun?", choices: ["Venus", "Earth", "Mercury", "Mars"], correctAnswer: 2 },
    { question: "What is the smallest bone in the human body?", choices: ["Stapes", "Femur", "Humerus", "Clavicle"], correctAnswer: 0 },
    { question: "Which bird is known for its colorful tail feathers?", choices: ["Eagle", "Peacock", "Sparrow", "Ostrich"], correctAnswer: 1 },
    { question: "Who painted the Mona Lisa?", choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correctAnswer: 2 }
  ];

  let currentQuestionIndex = localStorage.getItem('currentQuestionIndex') ? parseInt(localStorage.getItem('currentQuestionIndex')) : 0;
  let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

  function showQuestion() {
    const questionElement = document.querySelector('.question');
    const choicesElement = document.querySelector('.choices');
    const nextButton = document.getElementById('next-btn');
    const questionNumber = document.getElementById('question-number');

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    choicesElement.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.dataset.index = index;
      li.addEventListener('click', selectAnswer);
      choicesElement.appendChild(li);
    });

    questionNumber.textContent = currentQuestionIndex + 1;
    nextButton.disabled = true;
  }

  function selectAnswer(e) {
    const selectedChoice = e.target;
    const correct = selectedChoice.dataset.index == questions[currentQuestionIndex].correctAnswer;

    if (correct) {
      score++;
      selectedChoice.classList.add('selected');
    } else {
      selectedChoice.classList.add('incorrect');
      selectedChoice.classList.add('shake');
      setTimeout(() => selectedChoice.classList.remove('shake'), 500);
    }

    localStorage.setItem('score', score);
    document.getElementById('next-btn').disabled = false;
  }

  function nextQuestion() {
    currentQuestionIndex++;
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    const quizContainer = document.querySelector('.quiz');
    const resultContainer = document.querySelector('.result');
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = questions.length;
  }

  function restartQuiz() {
    localStorage.clear();
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    document.querySelector('.quiz').style.display = 'block';
    document.querySelector('.result').style.display = 'none';
  }

  // Start quiz
  showQuestion();
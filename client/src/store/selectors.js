export const isGameFinished = (quizQuestions) => {
  if (!Array.isArray(quizQuestions)) return false;

  let finished = true;

  quizQuestions.map((question) => {
    if (!Object.keys(question).includes("answer")) finished = false;
  });
  return finished;
};

export const getTotalScore = (quizQuestions) => {
  let totalScore = 0;

  quizQuestions.forEach((question) => {
    if (question.answer === question.correct) {
      totalScore += 1;
    }
  });

  return totalScore;
};

export const collectAllAnswers = (quizQuestions) => {
  const answers = quizQuestions.map((question) => question.answer);
  console.log(answers);
  return answers;
};

export const getTotalScoreOfEveryone = (quizQuestions, playerAnswers) => {
  // create an array of numbers with the correct answer's numbers
  const correctAnswers = quizQuestions.map((question) => question.correct);
  // create an object with username keys
  const players = {};
  Object.keys(playerAnswers[0]).forEach((player) => (players[player] = 0));
  // Calculate the number of correct answers of every player
  playerAnswers.forEach((question, questionNumber) => {
    Object.entries(question).forEach(([username, answer]) => {
      if (answer === correctAnswers[questionNumber]) {
        players[username] += 1;
      }
    });
  });
  return players;
};

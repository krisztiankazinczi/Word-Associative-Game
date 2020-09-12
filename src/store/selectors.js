export const isGameFinished = (quizQuestions) => {
  if (!Array.isArray(quizQuestions)) return false

  let finished = true;

  quizQuestions.map((question) => {
    if (!Object.keys(question).includes("answer")) finished = false;
  });
  return finished;
};

export const getTotalScore = (quizQuestions) => {

  let totalScore = 0;

  quizQuestions.forEach(question => {
    if (question.answer === question.correct) {
      totalScore += 1;
    }
  })

  return totalScore;
}

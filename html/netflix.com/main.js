const questions = document.querySelectorAll('.question')
const hiddenStyles = `
  max-height: 0;
  animation: shrink;
  animation-duration: 0.25s;
  animation-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
`
const rotateX = (x) => `rotate(${x}deg)`
const maxHeight = '1000px'

questions.forEach((question) =>
  question.addEventListener('click', function toggleQuestion(e) {
    const symbols = this.lastElementChild.querySelectorAll('.toggle_symbol')
    const first = symbols[0]
    const second = symbols[1]

    // shrink current questions
    if (this.nextElementSibling.offsetHeight) {
      this.nextElementSibling.style = hiddenStyles

      first.style.transform = rotateX(90)
      second.style.transform = rotateX(0)
    } else {
      const visibleStyles = `
        max-height: 1000px;
        animation: expand;
        animation-duration: 0.25s;
        animation-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
      `

      // shrink all questions
      shrinkAllQuestions()

      // expand current questions
      this.nextElementSibling.style = visibleStyles
      first.style.transform = rotateX(45)
      second.style.transform = rotateX(-45)
    }
  }),
)

function shrinkAllQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i]

    if (question.nextElementSibling.style.maxHeight === maxHeight) {
      const symbols =
        question.lastElementChild.querySelectorAll('.toggle_symbol')
      const first = symbols[0]
      const second = symbols[1]

      question.nextElementSibling.style = hiddenStyles
      first.style.transform = rotateX(90)
      second.style.transform = rotateX(0)

      break
    }
  }
}

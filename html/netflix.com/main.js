const questions = document.querySelectorAll('.question')
const hiddenStyles = `
  height: 0;
  overflow: hidden;
  padding: 0 2.5rem;
  animation: shrink;
  animation-duration: 0.25s;
  animation-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
`
const rotateX = (x) => `rotate(${x}deg)`

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
        height: auto;
        padding: 3rem 2.5rem;
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
  questions.forEach((question) => {
    const symbols = question.lastElementChild.querySelectorAll('.toggle_symbol')
    const first = symbols[0]
    const second = symbols[1]

    question.nextElementSibling.style = hiddenStyles
    first.style.transform = rotateX(90)
    second.style.transform = rotateX(0)
  })
}

const slideButtons = document.querySelectorAll('.slide-btn')
const slides = document.querySelector('#slides')

const MARGIN_DISTANCE = 48
const SLIDE_SIZE = 742
const ASIDE_SIZE = (slides.offsetWidth - SLIDE_SIZE - MARGIN_DISTANCE * 2) / 2
const INITIAL_SCROLL_LEFT = SLIDE_SIZE - ASIDE_SIZE + MARGIN_DISTANCE / 2
const SWIPE_SIZE = SLIDE_SIZE - ASIDE_SIZE - 250
const FIRST_SCROLL_LEFT =
  (SLIDE_SIZE + MARGIN_DISTANCE) * 1 + INITIAL_SCROLL_LEFT
const LAST_SCROLL_LEFT =
  (SLIDE_SIZE + MARGIN_DISTANCE) * 5 + INITIAL_SCROLL_LEFT
const NEXT_LAST_SCROLL_LEFT =
  (SLIDE_SIZE + MARGIN_DISTANCE) * 7 + INITIAL_SCROLL_LEFT
const SCROLL_BAR_SIZE = 200

let currentIndex = 0
let start

window.onload = () => {
  slides.scrollLeft = FIRST_SCROLL_LEFT
}

slideButtons.forEach((btn) => {
  btn.addEventListener('click', function () {
    currentIndex = parseInt(this.dataset.value)

    slideButtons.forEach((btn) => (btn.style.background = '#000'))
    this.style.background = 'orange'

    slides.scrollLeft =
      (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT
  })
})

slides.addEventListener('mousemove', function (e) {
  // prevent scrolll to last slide faked
  if (
    e.x < start &&
    slides.scrollLeft + (start - e.x) * SCROLL_BAR_SIZE <= NEXT_LAST_SCROLL_LEFT
  ) {
    slides.scrollLeft += (start - e.x) * SCROLL_BAR_SIZE
  } else if (e.x > start) {
    slides.scrollLeft -= (e.x - start) * SCROLL_BAR_SIZE
  }
})

slides.addEventListener('mousedown', function (e) {
  start = e.x
})

slides.addEventListener('mouseup', function (e) {
  start = undefined
})

slides.addEventListener('scroll', function (e) {})

slides.addEventListener('mouseup', function (e) {
  // last slide and swipe
  if (slides.scrollLeft >= LAST_SCROLL_LEFT) {
    if (currentIndex === 5) currentIndex = 1
    else currentIndex++

    slides.scrollLeft =
      (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT
    return
  }

  // first slide and swipe
  if (slides.scrollLeft < FIRST_SCROLL_LEFT) {
    if (currentIndex === 1) currentIndex = 5
    else currentIndex--

    slides.scrollLeft =
      (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT
    return
  }

  const previousScrollLeft =
    (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT

  // slide right
  if (slides.scrollLeft >= previousScrollLeft + SWIPE_SIZE) {
    if (currentIndex === 5) currentIndex = 1
    else currentIndex++
  }
  // slide left
  else if (slides.scrollLeft <= previousScrollLeft - SWIPE_SIZE) {
    if (currentIndex === 1) currentIndex = 5
    else currentIndex--
  }

  slides.scrollLeft =
    (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT
})

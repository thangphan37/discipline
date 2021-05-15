const slideButtons = document.querySelectorAll('.slide-btn')
const slides = document.querySelector('#slides')

const MARGIN_DISTANCE = 48
const SLIDE_SIZE = 742
const ASIDE_SIZE = (slides.offsetWidth - SLIDE_SIZE - MARGIN_DISTANCE * 2) / 2
const INITIAL_SCROLL_LEFT = SLIDE_SIZE - ASIDE_SIZE + MARGIN_DISTANCE / 2
const SWIPE_SIZE = SLIDE_SIZE - ASIDE_SIZE - 250

let currentIndex = 0
let start
let end = 0

slideButtons.forEach((btn) =>
  btn.addEventListener('click', function () {
    currentIndex = parseInt(this.dataset.value)
    slides.scrollLeft =
      (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT
  }),
)

slides.addEventListener('mousemove', function (e) {
  if (e.x <= 100 || e.x >= 1565) {
    return
  }

  if (e.x < start && slides.scrollLeft <= 5875) {
    slides.scrollLeft += (start - e.x) * 200
  } else if (e.x > start) {
    slides.scrollLeft -= (e.x - start) * 200
  }
})

slides.addEventListener('mousedown', function (e) {
  start = e.x
})

slides.addEventListener('mouseup', function (e) {
  start = undefined
})

slides.addEventListener('mouseup', function (e) {
  if (slides.scrollLeft >= 4295) {
    if (currentIndex === 3) {
      currentIndex++
    } else {
      currentIndex = 1
    }
    slides.scrollLeft =
      (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT
    return
  }

  if (e.x <= 0) {
    currentIndex++
    slides.scrollLeft =
      (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT
    return
  }

  if (e.x >= 1565) {
    currentIndex--
    slides.scrollLeft =
      (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT
    return
  }

  const previousScrollLeft =
    (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT

  // slide right
  if (slides.scrollLeft >= previousScrollLeft + SWIPE_SIZE) {
    if (currentIndex === 5) {
      currentIndex = 1
    } else {
      currentIndex++
    }
  }
  // slide left
  else if (slides.scrollLeft <= previousScrollLeft - SWIPE_SIZE) {
    if (currentIndex === 1) {
      currentIndex = 5
    } else {
      currentIndex--
    }
  }

  slides.scrollLeft =
    (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT
})

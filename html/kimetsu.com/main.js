const slideButtons = document.querySelectorAll('.slide-btn')
const slides = document.querySelector('#slides')
const tabContents = document.querySelector('#tab-contents')
const tabs = document.querySelectorAll('.tab-title')

const mediumSize = window.matchMedia(
  '(min-width: 768px) and (max-width: 768px)',
)
const smallSize = window.matchMedia('(max-width: 767px)')

const MARGIN_DISTANCE = 48

let slideSize = 722

if (smallSize.matches) {
  slideSize = document.body.offsetWidth - MARGIN_DISTANCE
}

const ASIDE_SIZE =
  (document.body.offsetWidth - slideSize - MARGIN_DISTANCE * 2) / 2

let initialX

if (mediumSize.matches || smallSize.matches) {
  initialX = slideSize + MARGIN_DISTANCE
} else {
  initialX = slideSize - ASIDE_SIZE + MARGIN_DISTANCE / 2
}

const SWIPE_SIZE = slideSize - ASIDE_SIZE - 250
const FIRST_X = (slideSize + MARGIN_DISTANCE) * 1 + initialX
const LAST_X = (slideSize + MARGIN_DISTANCE) * 5 + initialX
const NEXT_LAST_X = (slideSize + MARGIN_DISTANCE) * 7 + initialX

const TAB_CONTENTS = [
  {
    content:
      'バーサスモードに煉獄杏寿郎が参戦！キャラクター別ゲームビジュアル＆紹介映像を公開！！',
    img: 'first-tab.jpeg',
  },
  {
    content: '「鬼滅の刃 塗絵帳 -紅-」「鬼滅の刃 塗絵帳 -蒼-」2冊同時発売！',
    img: 'second-tab.jpeg',
  },
  {content: 'チャレンジ！マチ★アソビvol.2参加決定！', img: 'third-tab.jpeg'},
  {
    content: '舞台「鬼滅の刃」其ノ弐 絆　公演実施に関する重要なお知らせ',
    img: 'four-tab.png',
  },
  {
    content:
      'バーサスモードに煉獄杏寿郎が参戦！キャラクター別ゲームビジュアル＆紹介映像を公開！！',
    img: 'fifth-tab.jpeg',
  },
]

let currentIndex = 1
let start

window.onload = () => {
  slideButtons[0].style.background = 'orange'

  tabs[0].classList.add('active-tab')
}

tabs.forEach((tab) =>
  tab.addEventListener('click', function (e) {
    tabContents.innerHTML = Array(6)
      .fill(
        `<div class="infor-item">
          <div class="img-container">
            <div class="img-item" style="background-image: url('./assets/${
              TAB_CONTENTS[this.dataset.tab].img
            }')"></div>
          </div>
          <button class="type-btn">ゲーム</button>
          <p class="item-title">
            ${TAB_CONTENTS[this.dataset.tab].content}
          </p>
          <p class="item-date">2021.05.14</p>
        </div>`,
      )
      .join('')

    tabs.forEach((tab) => tab.classList.remove('active-tab'))
    this.classList.add('active-tab')
  }),
)

slideButtons.forEach((btn) => {
  btn.addEventListener('click', function () {
    currentIndex = parseInt(this.dataset.value)

    slideButtons.forEach((btn) => (btn.style.background = '#000'))
    this.style.background = 'orange'

    swipeSlide(-1 * ((slideSize + MARGIN_DISTANCE) * currentIndex + initialX))
  })
})

slides.addEventListener('mousemove', handleSwipeMove)
slides.addEventListener('touchmove', handleSwipeMove)

slides.addEventListener('touchstart', function (e) {
  start = e.changedTouches[0].clientX
})

slides.addEventListener('mousedown', function (e) {
  start = e.x
})

slides.addEventListener('mouseup', function (e) {
  start = undefined
})

slides.addEventListener('mouseleave', handleSwipeCancel)
slides.addEventListener('touchcancel', handleSwipeCancel)

slides.addEventListener('mouseup', handleSwipeEnd)
slides.addEventListener('touchend', handleSwipeEnd)

function handleSwipeMove(e) {
  if (!slides.style.transform) {
    slides.style.transform = `translate3d(-${FIRST_X}px, 0, 0)`
  }

  const currentX = composeX()
  const nowX = e.changedTouches ? e.changedTouches[0].clientX : e.x

  if (nowX < start && currentX * -1 + (start - nowX) <= NEXT_LAST_X) {
    swipeSlide(currentX - (start - nowX))
  } else if (nowX > start && currentX <= 0) {
    swipeSlide(currentX + (nowX - start))
  }
}

function handleSwipeEnd() {
  const previousX = (slideSize + MARGIN_DISTANCE) * currentIndex + initialX
  const currentX = composeX() * -1

  // slide right
  if (currentX >= previousX + SWIPE_SIZE || currentX >= LAST_X) {
    if (currentIndex === 5) currentIndex = 1
    else currentIndex++
  }
  // slide left
  else if (currentX <= previousX - SWIPE_SIZE || currentX < FIRST_X) {
    if (currentIndex === 1) currentIndex = 5
    else currentIndex--
  }

  slideButtons.forEach((btn) => (btn.style.background = '#000'))
  slideButtons[currentIndex - 1].style.background = 'orange'

  swipeSlide(-1 * ((slideSize + MARGIN_DISTANCE) * currentIndex + initialX))
}

function handleSwipeCancel() {
  start = undefined
  swipeSlide(-1 * ((slideSize + MARGIN_DISTANCE) * currentIndex + initialX))
}

function composeX() {
  const {transform} = slides.style
  const first = transform.search(/\(/g) + 1
  const second = transform.search(/px/g)
  const currentX = parseInt(slides.style.transform.slice(first, second))

  return currentX
}

function swipeSlide(x) {
  slides.style.transform = `translate3d(${x}px, 0, 0)`
}

const slideButtons = document.querySelectorAll('.slide-btn')
const slides = document.querySelector('#slides')
const tabContents = document.querySelector('#tab-contents')
const tabs = document.querySelectorAll('.tab-title')

const MARGIN_DISTANCE = 48
const SLIDE_SIZE = 742
const ASIDE_SIZE =
  (document.body.offsetWidth - SLIDE_SIZE - MARGIN_DISTANCE * 2) / 2
const INITIAL_X = SLIDE_SIZE - ASIDE_SIZE + MARGIN_DISTANCE / 2
const SWIPE_SIZE = SLIDE_SIZE - ASIDE_SIZE - 250
const FIRST_X = (SLIDE_SIZE + MARGIN_DISTANCE) * 1 + INITIAL_X
const LAST_X = (SLIDE_SIZE + MARGIN_DISTANCE) * 5 + INITIAL_X
const NEXT_LAST_X = (SLIDE_SIZE + MARGIN_DISTANCE) * 7 + INITIAL_X

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
  slides.scrollLeft = FIRST_X
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

    swipeSlide(-1 * ((SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_X))
  })
})

slides.addEventListener('mousemove', function (e) {
  //initial case
  if (!slides.style.transform) {
    slides.style.transform = 'translate3d(-1142.5px, 0, 0)'
  }

  const currentX = composeX()

  if (e.x < start && currentX * -1 + (start - e.x) <= NEXT_LAST_X) {
    swipeSlide(currentX - (start - e.x))
  } else if (e.x > start && currentX <= 0) {
    swipeSlide(currentX + (e.x - start))
  }
})

slides.addEventListener('mousedown', function (e) {
  start = e.x
})

slides.addEventListener('mouseup', function (e) {
  start = undefined
})

slides.addEventListener('mouseleave', function (e) {
  start = undefined
  swipeSlide(-1 * ((SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_X))
})

slides.addEventListener('mouseup', function (e) {
  const previousX = (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_X
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

  swipeSlide(-1 * ((SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_X))
})

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

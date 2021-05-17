const slideButtons = document.querySelectorAll('.slide-btn')
const slides = document.querySelector('#slides')

const tabContents = document.querySelector('#tab-contents')
const tabs = document.querySelectorAll('.tab-title')

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

let currentIndex = 0
let start

window.onload = () => {
  slides.scrollLeft = FIRST_SCROLL_LEFT
  slideButtons[0].style.background = 'orange'

  tabs[0].classList.add('active-tab')
}

tabs.forEach((tab) =>
  tab.addEventListener('click', function (e) {
    tabContents.innerHTML = Array(6)
      .fill(
        `<div class="infor-item">
    <img
      src="./assets/${TAB_CONTENTS[this.dataset.tab].img}"
      alt="Main Game"
      id="img-game"
    />
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
  const previousScrollLeft =
    (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT

  // slide right
  if (
    slides.scrollLeft >= previousScrollLeft + SWIPE_SIZE ||
    slides.scrollLeft >= LAST_SCROLL_LEFT
  ) {
    if (currentIndex === 5) currentIndex = 1
    else currentIndex++
  }
  // slide left
  else if (
    slides.scrollLeft <= previousScrollLeft - SWIPE_SIZE ||
    slides.scrollLeft < FIRST_SCROLL_LEFT
  ) {
    if (currentIndex === 1) currentIndex = 5
    else currentIndex--
  }

  slideButtons.forEach((btn) => (btn.style.background = '#000'))
  slideButtons[currentIndex - 1].style.background = 'orange'
  slides.scrollLeft =
    (SLIDE_SIZE + MARGIN_DISTANCE) * currentIndex + INITIAL_SCROLL_LEFT
})

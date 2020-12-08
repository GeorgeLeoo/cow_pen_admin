const easeInOutQuad = function (t: number, b: number, c: number, d: number) {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
const requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) }
})()

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move (el: HTMLElement = document.documentElement, amount: number) {
  el.scrollLeft = amount
  // document.body.parentNode.scrollLeft = amount
  // document.body.scrollLeft = amount
}

function position (el: HTMLElement = document.documentElement) {
  return el.scrollLeft
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export function scrollTo (el: HTMLElement = document.documentElement, to: number, duration: number, callback: () => void) {
  // 获取起始位置
  const start = position(el)
  // 变换的距离
  const change = to - start
  // 每次增加 20
  const increment = 20
  let currentTime = 0
  duration = (typeof (duration) === 'undefined') ? 500 : duration
  const animateScroll = function () {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    const val = easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    move(el, val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof (callback) === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }
  animateScroll()
}

(function (doc, win) {
  const docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 20 * (clientWidth / 100) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

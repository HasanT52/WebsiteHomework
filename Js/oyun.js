const X_GRUP = 'x'
const O_GRUP = 'o'
const KOMBINASYONLAR = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const hucreElement = document.querySelectorAll('[hucreler]')
const oyunalan = document.getElementById('oyunalan')
const kazananMsgElement = document.getElementById('kazanan_msg')
const tekrarOyna = document.getElementById('tekrarOyna')
const kazananMsgTextElement = document.querySelector('[kazanan_msg_text]')
let tur

oyunBaslasin()

tekrarOyna.addEventListener('click', oyunBaslasin)

function oyunBaslasin() {
  tur = false
  hucreElement.forEach(hucre => {
    hucre.classList.remove(X_GRUP)
    hucre.classList.remove(O_GRUP)
    hucre.removeEventListener('click', tikla)
    hucre.addEventListener('click', tikla, { once: true })
  })
  setOyunalanHoverClass()
  kazananMsgElement.classList.remove('show')
}

function tikla(e) {
  const hucre = e.target
  const hangiGrup = tur ? O_GRUP : X_GRUP
  neresi(hucre, hangiGrup)
  if (kazananKim(hangiGrup)) {
    oyunSonu(false)
  } else if (berabereMi()) {
    oyunSonu(true)
  } else {
    siradaKi()
    setOyunalanHoverClass()
  }
}

function oyunSonu(Berabere) {
  if (Berabere) {
    kazananMsgTextElement.innerText = 'Berabere!'
  } else {
    kazananMsgTextElement.innerText = `${tur ? "O" : "X"} Kazandıı!`
  }
  kazananMsgElement.classList.add('show')
}

function berabereMi() {
  return [...hucreElement].every(hucre => {
    return hucre.classList.contains(X_GRUP) || hucre.classList.contains(O_GRUP)
  })
}

function neresi(hucre, hangiGrup) {
    hucre.classList.add(hangiGrup)
}

function siradaKi() {
  tur = !tur
}

function setOyunalanHoverClass() {
    oyunalan.classList.remove(X_GRUP)
    oyunalan.classList.remove(O_GRUP)
  if (tur) {
    oyunalan.classList.add(O_GRUP)
  } else {
    oyunalan.classList.add(X_GRUP)
  }
}

function kazananKim(hangiGrup) {
  return KOMBINASYONLAR.some(kombinasyon => {
    return kombinasyon.every(index => {
      return hucreElement[index].classList.contains(hangiGrup)
    })
  })
}
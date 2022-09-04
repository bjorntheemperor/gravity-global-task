window.addEventListener('DOMContentLoaded', () => {

    const popup = document.querySelector('.popup')
    const openBtn = document.querySelector('.content__info-btn')
    const closeBtn = document.querySelector('.popup-close')
    const popupOverlay = document.querySelector('.popup-overlay')
    const counterItem = document.querySelector('#counter')
    const resetBtn = document.querySelector('.reset')

    let getItem = (key) => localStorage.getItem(key)
    let setItem = (key, value) => localStorage.setItem(key, value)

    if (getItem('counter') === null){
        setItem('counter', 0)
    }

    let refreshCounter = () => counterItem.innerText = getItem('counter')

    refreshCounter()

    let increaseCounter = () => {
        let counter = parseInt(getItem('counter'))
        counter += 1
        setItem('counter', counter)
        getItem('counter') > 5 && resetBtn.classList.remove('hidden')
        refreshCounter()

    }
    // OPEN POPUP
    openBtn.addEventListener('click', () => {
        popup.classList.remove('hidden')

        increaseCounter()

    })

    // CLOSE POPUP
    document.addEventListener('click', (e) => {
        if (e.target === closeBtn
            || e.target === popupOverlay) {
            popup.classList.add('hidden')
        }
    })

    // RESET COUNTER
    resetBtn.addEventListener('click', () => {
        setItem('counter', 0)
        resetBtn.classList.add('hidden')
        refreshCounter()
    })

});
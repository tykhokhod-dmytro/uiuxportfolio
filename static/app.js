const toTop = document.querySelector('.to-top')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const coverMode = new URLSearchParams(window.location.search).get('covers')

if (coverMode !== 'original') {
    document.querySelectorAll('img[data-cover-src]').forEach((image) => {
        const originalSource = image.getAttribute('src')

        image.addEventListener('error', () => {
            if (image.getAttribute('src') !== originalSource) {
                image.setAttribute('src', originalSource)
            }
        }, { once: true })

        image.setAttribute('src', image.dataset.coverSrc)
    })
}

document.querySelectorAll('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.dataset.scrollTarget)

        if (target) {
            target.scrollIntoView({
                behavior: reduceMotion.matches ? 'auto' : 'smooth',
                block: 'start'
            })
        }
    })
})

function updateBackToTop() {
    const isVisible = window.scrollY > 320
    toTop.classList.toggle('is-visible', isVisible)
    toTop.setAttribute('aria-hidden', String(!isVisible))
    toTop.tabIndex = isVisible ? 0 : -1
}

window.addEventListener('scroll', updateBackToTop, { passive: true })
updateBackToTop()

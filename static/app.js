const portfolioSection = document.querySelector('.content')
const toTop = document.querySelector('.to-top')
const logoSection = document.querySelector('.container')
const propsOverlay = document.querySelector('.props-overlay')
const portfolio = document.querySelector('.portfolio')
const closeBtn = document.querySelector('.close')

const linkedinUrl = 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFvJVOUkaRfPwAAAYvtPduA40YaHeMDNFEPDSNBvxTTu3OH43_UBsW7PgckQty5dNQIcbWbs_VYeq8eLAv8Za_TYrz2QWV4nkm3QwS4PXrQuqvaESkywZ8llFUOYvnG0fMTbJM=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fdmytro-tykhokhod-5a72621b6%2F'
const telegramUrl = 'https://t.me/dimatyk'
const cvUrl = 'https://drive.google.com/file/d/1KQ-A8HuBuYhqAQ2YOmH59eBYQNU2JqgN/view?usp=sharing'

// Portfolio cards are plain <a> links in index.html, so they need no JS:
// they survive a script error, open in a new tab on middle-click and are
// reachable by keyboard. Only the header buttons still call openUrlInNewTab.


window.addEventListener('scroll', function() {
    (window.scrollY === 0) ? (toTop.style.visibility = 'hidden') : toTop.style.visibility = 'visible'
})

function moveToPosition(element) {
    if (element) {
        element.scrollIntoView({behavior: "smooth", block: "start"})
    }
}

function openUrlInNewTab(url) {
    const currentUrl = window.open(url, 'blank')
    if (currentUrl) {
        currentUrl.focus()
    }
}


function openCard(selector) {
    selector.style.display = 'block'
    portfolio.style.pointerEvents = 'none'
    closeBtn.style.pointerEvents = 'auto'
    toTop.style.display = 'none'
}

function closeCard(selector) {
    selector.style.display = 'none'
    portfolio.style.pointerEvents = 'auto'
    toTop.style.display = 'flex'
}

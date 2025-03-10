const portfolioSection = document.querySelector('.content')
const toTop = document.querySelector('.to-top')
const logoSection = document.querySelector('.container')
const propsOverlay = document.querySelector('.props-overlay')
const portfolio = document.querySelector('.portfolio')
const closeBtn = document.querySelector('.close')

const linkedinUrl = 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFvJVOUkaRfPwAAAYvtPduA40YaHeMDNFEPDSNBvxTTu3OH43_UBsW7PgckQty5dNQIcbWbs_VYeq8eLAv8Za_TYrz2QWV4nkm3QwS4PXrQuqvaESkywZ8llFUOYvnG0fMTbJM=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fdmytro-tykhokhod-5a72621b6%2F'
const telegramUrl = 'https://t.me/dimatyk'
const cvUrl = 'https://drive.google.com/file/d/1fibPi-xqQ2MMeKi09OyDibYpF23cey8L/view?usp=sharing'
const guildManagement = 'https://www.behance.net/gallery/183406741/Guild-Management-Game-UIUX-Design'
const uiScifi = 'https://tykhokhod-dmytro.github.io/uiuxportfolio/assets/images/scifi_mobile_game.png'
const gameIcons = 'https://www.artstation.com/artwork/xJELr4'
const registrationForm = 'https://www.figma.com/file/7AlN049v7YyGA1jC8XgDGQ/Registration-Form-for-RPG-Game%2C-input-and-button-kit?type=design&node-id=0-1&mode=design&t=4PBK07kCo82uoW28-0'


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

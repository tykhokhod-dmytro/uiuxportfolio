const app = document.querySelector('#app')
const toast = document.querySelector('#success-toast')
const infoModal = document.querySelector('#info-modal')

const products = {
    cooklist: {
        rank: 1,
        medal: 'gold',
        name: 'Cooklist',
        type: 'Recipe-to-cart',
        short: 'Builds a recipe and adds every ingredient to your cart.',
        mission: 'Create one recipe and add all ingredients',
        reward: '20 loyalty points + 1 prize box',
        action: 'Add all to cart',
        demoTitle: 'Tomato pasta for two',
        demoMeta: '25 min · UAH 368',
        items: [['🍝', 'Tagliatelle'], ['🍅', 'Cherry tomatoes'], ['🧀', 'Parmesan'], ['🌿', 'Fresh basil']]
    },
    restock: {
        rank: 2,
        medal: 'silver',
        name: 'Restock',
        type: 'Routine shopper',
        short: 'Finds repeat buys and drafts your next regular cart.',
        mission: 'Create one weekly essentials cart',
        reward: 'Free delivery + 1 prize box',
        action: 'Create AutoCart',
        demoTitle: 'Weekly essentials',
        demoMeta: 'Every Saturday · UAH 475',
        items: [['🥛', 'Milk'], ['🥚', 'Free-range eggs'], ['☕', 'Coffee beans'], ['🍞', 'Sourdough bread']]
    },
    gather: {
        rank: 3,
        medal: 'bronze',
        name: 'Gather',
        type: 'Group planner',
        short: 'Builds one shared cart for your occasion and budget.',
        mission: 'Create a picnic cart for four guests',
        reward: '40 loyalty points + 1 prize box',
        action: 'Build event cart',
        demoTitle: 'Park picnic for four',
        demoMeta: '12 items · UAH 682',
        items: [['🥖', 'Baguettes'], ['🧀', 'Cheese selection'], ['🍇', 'Seedless grapes'], ['🥤', 'Craft lemonade']]
    }
}

const state = {
    screen: 'hub',
    selected: null,
    completed: new Set(),
    claimed: new Set(),
    pickedPrize: null
}

let toastTimer

function topBar(backAction = 'exit') {
    return `
        <div class="status-bar"><strong>9:41</strong><span>▮▮▮ ᯤ ▰</span></div>
        <nav class="top-bar">
            <button class="round-button" type="button" data-action="${backAction}" aria-label="Back">‹</button>
            <strong class="silpo-logo">Silpo</strong>
            <button class="round-button" type="button" data-action="show-info" aria-label="About this concept">i</button>
        </nav>`
}

function circuitMark() {
    return '<div class="circuit-mark" aria-hidden="true"><span>AI</span><i></i><i></i><i></i><i></i></div>'
}

function progressMarkup() {
    const count = state.completed.size
    return `
        <section class="progress-panel">
            <div><strong>Your progress</strong><b>${count}/3</b></div>
            <div class="checkpoint-track" aria-label="${count} of 3 missions complete">
                ${Object.keys(products).map((id, index) => `<span class="${state.completed.has(id) ? 'done' : ''}">${state.completed.has(id) ? '✓' : index + 1}</span>`).join('')}
            </div>
        </section>`
}

function winnerCard(id) {
    const product = products[id]
    const completed = state.completed.has(id)
    const claimed = state.claimed.has(id)
    const status = claimed ? 'Claimed' : completed ? 'Reward ready' : id === nextProduct() ? 'Start here' : ''
    return `
        <button class="winner-card winner-card--${product.medal} ${completed ? 'is-complete' : ''}" type="button" data-action="open-detail" data-id="${id}">
            <span class="mini-medal">${completed ? '✓' : product.rank}</span>
            <span class="winner-thumb winner-thumb--${id}"></span>
            <span class="winner-card-copy"><b>${product.name}</b><small>${product.short}</small>${status ? `<em>${status}</em>` : ''}</span>
            <span class="chevron">›</span>
        </button>`
}

function nextProduct() {
    return Object.keys(products).find((id) => !state.completed.has(id)) || Object.keys(products).find((id) => !state.claimed.has(id)) || null
}

function hubScreen() {
    const next = nextProduct()
    const allClaimed = state.claimed.size === 3
    return `
        <section class="screen screen--hub">
            ${topBar('exit')}
            <div class="screen-content hub-content">
                ${circuitMark()}
                <h1>AI Factory:<br><span>Meet the winners</span></h1>
                <p class="hero-copy">Try three MCP-powered products. Complete their missions. Claim the rewards.</p>
                <div class="chip-row"><span class="yellow-chip">● 12 days left</span><span class="dark-chip">🏆 3 winners</span></div>
                ${progressMarkup()}
                <div class="winner-cards">
                    ${winnerCard('cooklist')}${winnerCard('restock')}${winnerCard('gather')}
                </div>
                <section class="grand-card ${allClaimed ? 'is-ready' : ''}">
                    <div><small>${allClaimed ? 'Grand reward ready' : 'Complete all 3 missions'}</small><strong>100 points<br>+ 3 prize boxes</strong></div>
                    <span>${allClaimed ? '🏆' : '🎁'}</span>
                </section>
                <button class="primary-button sticky-action" type="button" data-action="${allClaimed ? 'show-final' : 'start'}">${allClaimed ? 'Open grand reward' : state.completed.size ? 'Continue' : 'Start'} ✦</button>
                <small class="next-label">${allClaimed ? 'All rewards claimed' : `Next: ${products[next].name}`}</small>
            </div>
        </section>`
}

function detailScreen(id) {
    const product = products[id]
    const completed = state.completed.has(id)
    const claimed = state.claimed.has(id)
    return `
        <section class="screen screen--detail">
            ${topBar('hub')}
            <div class="screen-content detail-content">
                ${circuitMark()}
                <header class="product-heading">
                    <span class="large-medal large-medal--${product.medal}">${product.rank}<small>${product.rank === 1 ? 'ST' : product.rank === 2 ? 'ND' : 'RD'}</small></span>
                    <div><h1>${product.name}</h1><p>${product.short}</p></div>
                </header>
                <div class="product-visual product-visual--${id}" role="img" aria-label="${product.name} product illustration"></div>
                <section class="task-panel">
                    <h2>Your mission</h2>
                    <p>${product.mission}</p>
                    <div class="mini-stepper"><span class="done">✓<small>Choose</small></span><i></i><span class="done">✓<small>Build</small></span><i></i><span class="${completed ? 'done' : ''}">${completed ? '✓' : '3'}<small>Confirm</small></span></div>
                </section>
                <section class="reward-panel"><span>🎁</span><div><small>Reward</small><strong>${product.reward}</strong></div></section>
                <div class="detail-actions">
                    <button class="primary-button" type="button" data-action="open-demo" data-id="${id}">${completed ? 'View product' : 'Open product'} ✦</button>
                    <button class="secondary-button" type="button" data-action="claim" data-id="${id}" ${!completed || claimed ? 'disabled' : ''}>${claimed ? 'Reward claimed ✓' : completed ? 'Claim reward' : 'Complete mission to claim'}</button>
                    <button class="text-button" type="button" data-action="hub">Other winners ›</button>
                </div>
            </div>
        </section>`
}

function demoScreen(id) {
    const product = products[id]
    const completed = state.completed.has(id)
    return `
        <section class="screen screen--demo">
            ${topBar('detail')}
            <div class="screen-content demo-content">
                <h1>${product.name}</h1>
                <p class="demo-subtitle">${product.short}</p>
                <div class="demo-hero product-visual--${id}"></div>
                <section class="demo-card">
                    <div class="demo-card-head"><div><small>Ready to build</small><h2>${product.demoTitle}</h2><p>${product.demoMeta}</p></div><span>${product.rank === 1 ? '🍽️' : product.rank === 2 ? '↻' : '🎉'}</span></div>
                    <div class="item-list">${product.items.map((item) => `<div><span>${item[0]}</span><b>${item[1]}</b><i>${completed ? '✓' : '+'}</i></div>`).join('')}</div>
                </section>
                <button class="primary-button" type="button" data-action="complete" data-id="${id}" ${completed ? 'disabled' : ''}>${completed ? 'Mission complete ✓' : product.action}</button>
                ${completed ? '<button class="secondary-button" type="button" data-action="detail">Back to winner</button>' : ''}
            </div>
        </section>`
}

function rewardScreen(id) {
    const product = products[id]
    const prize = state.pickedPrize
    return `
        <section class="screen screen--reward">
            ${topBar('hub')}
            <div class="screen-content reward-content">
                ${circuitMark()}
                <h1>Reward<br><span>unlocked!</span></h1>
                <p>${product.name} mission complete.</p>
                <div class="reward-summary"><span>✓ ${product.name}</span><b>🏆 ${state.claimed.size}/3</b></div>
                <section class="reward-hero"><strong>${product.reward}</strong><span>🪙 🎁 ✦</span></section>
                <section class="prize-shelf">
                    <h2>${prize ? 'Prize opened!' : 'Pick one prize box'}</h2>
                    <p>${prize || 'One extra bonus is waiting inside.'}</p>
                    <div class="gift-row">
                        ${[0,1,2,3,4].map((index) => `<button type="button" data-action="pick-prize" data-index="${index}" ${prize ? 'disabled' : ''}>${prize && index === 2 ? '✨' : '🎁'}</button>`).join('')}
                    </div>
                </section>
                <button class="primary-button" type="button" data-action="next">${state.claimed.size === 3 ? 'Open grand reward' : 'Next winner'} ✦</button>
                <button class="secondary-button" type="button" data-action="hub">Back to event</button>
            </div>
        </section>`
}

function finalScreen() {
    return `
        <section class="screen screen--final">
            ${topBar('hub')}
            <div class="screen-content final-content">
                ${circuitMark()}
                <div class="trophy">🏆</div>
                <h1>All winners<br><span>unlocked!</span></h1>
                <p>You completed every AI Factory mission.</p>
                <div class="completed-list">${Object.values(products).map((product) => `<span>✓ ${product.name}</span>`).join('')}</div>
                <section class="grand-prize"><small>Grand reward</small><strong>100 loyalty points<br>+ 3 prize boxes</strong><span>🪙 🎁 🎁 🎁</span></section>
                <button class="primary-button" type="button" data-action="play-grand">Play the prize game ✦</button>
                <button class="secondary-button" type="button" data-action="hub">Back to event</button>
            </div>
        </section>`
}

function render() {
    if (state.screen === 'hub') app.innerHTML = hubScreen()
    if (state.screen === 'detail') app.innerHTML = detailScreen(state.selected)
    if (state.screen === 'demo') app.innerHTML = demoScreen(state.selected)
    if (state.screen === 'reward') app.innerHTML = rewardScreen(state.selected)
    if (state.screen === 'final') app.innerHTML = finalScreen()
    app.scrollTop = 0
}

function showToast() {
    window.clearTimeout(toastTimer)
    toast.hidden = false
    toast.classList.remove('is-visible')
    requestAnimationFrame(() => toast.classList.add('is-visible'))
    toastTimer = window.setTimeout(() => {
        toast.classList.remove('is-visible')
        window.setTimeout(() => { toast.hidden = true }, 240)
    }, 5000)
}

function hideToast() {
    window.clearTimeout(toastTimer)
    toast.classList.remove('is-visible')
    toast.hidden = true
}

document.addEventListener('click', (event) => {
    const control = event.target.closest('[data-action]')
    if (!control) return
    const { action, id } = control.dataset

    if (action === 'exit') window.location.href = '../'
    if (action === 'hub') { state.screen = 'hub'; render() }
    if (action === 'start') { state.selected = nextProduct(); state.screen = 'detail'; render() }
    if (action === 'open-detail') { state.selected = id; state.screen = 'detail'; render() }
    if (action === 'detail') { state.screen = 'detail'; render() }
    if (action === 'open-demo') { state.selected = id; state.screen = 'demo'; render() }
    if (action === 'complete') {
        control.disabled = true
        control.textContent = 'Building…'
        window.setTimeout(() => {
            state.completed.add(id)
            state.selected = id
            state.screen = 'demo'
            render()
            showToast()
        }, 650)
    }
    if (action === 'claim') {
        if (!state.completed.has(id) || state.claimed.has(id)) return
        state.claimed.add(id)
        state.selected = id
        state.pickedPrize = null
        state.screen = 'reward'
        render()
    }
    if (action === 'pick-prize') {
        const prizes = ['+10 loyalty points', '10% off your next shop', 'Free delivery unlocked', '+1 extra prize box', '15% off fresh food']
        state.pickedPrize = prizes[Number(control.dataset.index)]
        render()
    }
    if (action === 'next') {
        if (state.claimed.size === 3) state.screen = 'final'
        else { state.screen = 'hub'; state.selected = null }
        render()
    }
    if (action === 'show-final') { state.screen = 'final'; render() }
    if (action === 'play-grand') {
        infoModal.querySelector('.modal-icon').textContent = '🎁'
        infoModal.querySelector('h2').textContent = 'Grand prize claimed!'
        infoModal.querySelector('p').textContent = '100 loyalty points and 3 prize boxes are now yours.'
        infoModal.hidden = false
    }
    if (action === 'show-info') infoModal.hidden = false
    if (action === 'close-info') infoModal.hidden = true
})

toast.addEventListener('click', () => {
    hideToast()
    state.screen = 'detail'
    render()
})

infoModal.addEventListener('click', (event) => {
    if (event.target === infoModal) infoModal.hidden = true
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        infoModal.hidden = true
        hideToast()
    }
})

render()

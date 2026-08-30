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
        mission: 'Add all 4 tomato pasta ingredients to your cart.',
        selectStep: 'Add 4 ingredients',
        points: 20,
        reward: '20 loyalty points',
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
        mission: 'Approve all 4 repeat buys for your Saturday AutoCart.',
        selectStep: 'Approve 4 repeat buys',
        points: 30,
        reward: '30 loyalty points',
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
        mission: 'Add all 4 picnic picks to one shared cart.',
        selectStep: 'Add 4 picnic picks',
        points: 40,
        reward: '40 loyalty points',
        action: 'Build event cart',
        demoTitle: 'Park picnic for four',
        demoMeta: '12 items · UAH 682',
        items: [['🥖', 'Baguettes'], ['🧀', 'Cheese selection'], ['🍇', 'Seedless grapes'], ['🥤', 'Craft lemonade']]
    }
}

const state = {
    screen: 'hub',
    selected: null,
    started: new Set(),
    selectedItems: {
        cooklist: new Set(),
        restock: new Set(),
        gather: new Set()
    },
    points: 0,
    completed: new Set(),
    claimed: new Set()
}

let toastTimer
let swipeGesture = null

function topBar(backAction = 'exit') {
    return `
        <div class="status-bar"><strong>9:41</strong><span>▮▮▮ ᯤ ▰</span></div>
        <nav class="top-bar">
            <button class="round-button" type="button" data-action="${backAction}" aria-label="Back">‹</button>
            <strong class="silpo-logo">Silpo</strong>
            <div class="points-wallet" aria-label="${state.points} loyalty points"><span class="bonus-mark" aria-hidden="true"></span><b>${state.points}</b></div>
        </nav>`
}

function circuitMark() {
    return '<div class="circuit-mark" aria-hidden="true"><span>AI</span><i></i><i></i><i></i><i></i></div>'
}

function productProgress(id) {
    if (state.completed.has(id)) return 3

    const product = products[id]
    let count = state.started.has(id) ? 1 : 0
    if (state.selectedItems[id].size === product.items.length) count += 1
    return count
}

function winnerCard(id) {
    const product = products[id]
    const completed = state.completed.has(id)
    const place = ['1st', '2nd', '3rd'][product.rank - 1]
    const progress = productProgress(id)
    return `
        <button class="winner-card winner-card--${id} ${completed ? 'is-complete' : ''}" type="button" data-action="open-detail" data-id="${id}">
            <span class="winner-thumb winner-thumb--${id}"></span>
            <span class="place-medal place-medal--${product.medal} place-medal--card" aria-label="${place} place"><b>${product.rank}</b></span>
                <span class="winner-card-copy">
                    <span class="winner-card-title"><b>${product.name}</b></span>
                    <small>${product.short}</small>
                    <span class="winner-card-progress">
                        <span class="winner-progress-count">${progress}/3</span>
                        <span class="winner-progress-track" role="progressbar" aria-label="${product.name} mission progress" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${progress}"><i style="--card-progress: ${(progress / 3) * 100}%"></i></span>
                        <span class="winner-progress-reward"><i class="bonus-mark" aria-hidden="true"></i>${product.points} points</span>
                    </span>
                </span>
        </button>`
}

function nextProduct() {
    return Object.keys(products).find((id) => !state.completed.has(id)) || Object.keys(products).find((id) => !state.claimed.has(id)) || null
}

function hubScreen() {
    const allClaimed = state.claimed.size === 3
    return `
        <section class="screen screen--hub">
            ${topBar('exit')}
            <div class="screen-content hub-content">
                ${circuitMark()}
                <h1>AI Factory:<br><span>Meet the winners</span></h1>
                <p class="hero-copy">Try three MCP-powered products. Complete their missions. Claim the rewards.</p>
                <div class="winner-cards">
                    ${winnerCard('cooklist')}${winnerCard('restock')}${winnerCard('gather')}
                </div>
                <section class="grand-card ${allClaimed ? 'is-ready' : ''}">
                    <div><small>${allClaimed ? 'Grand reward ready' : 'Complete all 3 missions'}</small><strong>100 points</strong><em class="grand-chip">+ 1 prize box</em></div>
                </section>
                ${allClaimed
                    ? '<button class="primary-button sticky-action" type="button" data-action="show-final">Open grand reward ✦</button>'
                    : `<div class="swipe-control" data-swipe>
                        <button class="swipe-thumb" type="button" data-action="swipe-start" aria-label="Swipe right to ${state.completed.size ? 'continue' : 'start'}">›</button>
                        <strong>Swipe to ${state.completed.size ? 'continue' : 'start'}</strong>
                        <span aria-hidden="true">››</span>
                    </div>`}
            </div>
        </section>`
}

function detailScreen(id) {
    const product = products[id]
    const place = ['1st', '2nd', '3rd'][product.rank - 1]
    const completed = state.completed.has(id)
    const claimed = state.claimed.has(id)
    const started = state.started.has(id) || completed
    const selectedCount = state.selectedItems[id].size
    const selectionDone = selectedCount === product.items.length || completed
    const status = completed ? 'Completed' : started ? 'In progress' : 'Not started'
    const steps = [
        { title: 'Open the product', note: 'See the generated suggestion', done: started, current: !started },
        { title: product.selectStep, note: 'Tap every item to add it', done: selectionDone, current: started && !selectionDone },
        { title: product.action, note: 'Finish and unlock the reward', done: completed, current: selectionDone && !completed }
    ]
    return `
        <section class="screen screen--detail screen--detail-${id}">
            ${topBar('hub')}
            <header class="product-heading">
                <div class="product-hero product-hero--${id}">
                    <span class="place-medal place-medal--${product.medal} place-medal--detail" aria-label="${place} place"><b>${product.rank}</b></span>
                    <div class="product-visual product-visual--${id}" role="img" aria-label="${product.name} product illustration"></div>
                </div>
                <div class="product-intro"><h1>${product.name}</h1><p>${product.short}</p></div>
            </header>
            <div class="screen-content detail-content">
                <section class="task-panel">
                    <div class="task-panel-head"><h2>Your quests</h2><span class="quest-state quest-state--${completed ? 'done' : started ? 'active' : 'idle'}">${status}</span></div>
                    <ol class="quest-steps">
                        ${steps.map((step, index) => {
                            const mode = step.done ? 'is-done' : step.current ? 'is-current' : 'is-todo'
                            return `<li class="quest-step ${mode}"><b aria-hidden="true">${step.done ? '✓' : ''}</b><span><strong>${step.title}</strong><small>${step.note}</small></span><button class="quest-go" type="button" data-action="quest-go" data-id="${id}" data-step="${index}" aria-label="Go to ${step.title}">Go</button></li>`
                        }).join('')}
                    </ol>
                </section>
                <div class="detail-actions">
                    <button class="primary-button claim-button" type="button" ${completed && !claimed ? `data-action="claim" data-id="${id}"` : 'disabled'}>
                        <span>${claimed ? 'Reward claimed' : completed ? 'Claim reward' : 'Complete quests to claim'}</span>
                        <span class="claim-button-reward"><span class="bonus-mark" aria-hidden="true"></span>${product.points} points${claimed ? ' ✓' : ''}</span>
                    </button>
                </div>
            </div>
        </section>`
}

function demoScreen(id) {
    const product = products[id]
    const completed = state.completed.has(id)
    const selectedItems = state.selectedItems[id]
    const selectedCount = selectedItems.size
    const remaining = product.items.length - selectedCount
    const ready = remaining === 0
    return `
        <section class="screen screen--demo">
            ${topBar('detail')}
            <div class="screen-content demo-content">
                <h1>${product.name}</h1>
                <p class="demo-subtitle">${product.short}</p>
                <div class="demo-hero product-visual--${id}"></div>
                <section class="demo-task">
                    <div><h2>Your task</h2><span class="quest-state quest-state--${completed ? 'done' : 'active'}">${completed ? 'Completed' : `${selectedCount}/${product.items.length} added`}</span></div>
                    <p>${product.mission}</p>
                </section>
                <section class="demo-card">
                    <div class="demo-card-head"><div><h2>${product.demoTitle}</h2><p>${product.demoMeta}</p></div><span>${product.rank === 1 ? '🍽️' : product.rank === 2 ? '↻' : '🎉'}</span></div>
                    <div class="item-list">${product.items.map((item, index) => {
                        const added = selectedItems.has(index) || completed
                        return `<button class="${added ? 'is-added' : ''}" type="button" data-action="toggle-item" data-id="${id}" data-index="${index}" aria-pressed="${added}" ${completed ? 'disabled' : ''}><span>${item[0]}</span><b>${item[1]}</b><em>${added ? 'Added' : 'Add'}</em><i>${added ? '✓' : '+'}</i></button>`
                    }).join('')}</div>
                </section>
                <button class="primary-button" type="button" data-action="complete" data-id="${id}" ${completed || !ready ? 'disabled' : ''}>${completed ? 'Mission complete ✓' : ready ? product.action : `Add ${remaining} more to continue`}</button>
                ${completed ? '<button class="secondary-button" type="button" data-action="detail">Back to winner</button>' : ''}
            </div>
        </section>`
}

function rewardScreen(id) {
    const product = products[id]
    return `
        <section class="screen screen--reward">
            ${topBar('hub')}
            <div class="screen-content reward-content">
                ${circuitMark()}
                <h1>Reward<br><span>unlocked!</span></h1>
                <p>${product.name} complete. Points added to your balance.</p>
                <div class="reward-summary"><span>✓ ${product.name}</span><b>🏆 ${state.claimed.size}/3</b></div>
                <section class="reward-hero"><strong>${product.reward}</strong><span class="reward-symbols" aria-hidden="true"><i class="bonus-mark"></i><b>✦</b></span></section>
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
                <section class="grand-prize"><small>Grand reward</small><strong>100 loyalty points<br>+ 1 prize box</strong><span class="grand-prize-symbols" aria-hidden="true"><i class="bonus-mark"></i><b>🎁</b><b>✦</b></span></section>
                <button class="primary-button" type="button" data-action="play-grand">Play the prize game ✦</button>
                <button class="secondary-button" type="button" data-action="hub">Back to event</button>
            </div>
        </section>`
}

function render(preserveScroll = false) {
    const scrollPosition = app.scrollTop
    if (state.screen === 'hub') app.innerHTML = hubScreen()
    if (state.screen === 'detail') app.innerHTML = detailScreen(state.selected)
    if (state.screen === 'demo') app.innerHTML = demoScreen(state.selected)
    if (state.screen === 'reward') app.innerHTML = rewardScreen(state.selected)
    if (state.screen === 'final') app.innerHTML = finalScreen()
    app.scrollTop = preserveScroll ? scrollPosition : 0
    updateStickyHeader()
}

function updateStickyHeader() {
    const header = app.querySelector('.top-bar')
    if (header) header.classList.toggle('is-scrolled', app.scrollTop > 8)
}

app.addEventListener('scroll', updateStickyHeader, { passive: true })

function openNextProduct() {
    state.selected = nextProduct()
    state.screen = 'detail'
    render()
}

function openQuestStep(id, step) {
    state.started.add(id)
    state.selected = id
    state.screen = 'demo'
    render()

    if (step === 0) return
    window.requestAnimationFrame(() => {
        const target = app.querySelector(step === 1 ? '.item-list' : '[data-action="complete"]')
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
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

function animateRewardClaim(control, id) {
    const product = products[id]
    const wallet = document.querySelector('.points-wallet')
    if (!wallet) return

    const start = control.getBoundingClientRect()
    const target = wallet.getBoundingClientRect()
    control.disabled = true
    control.textContent = 'Claiming…'

    for (let index = 0; index < 7; index += 1) {
        const token = document.createElement('span')
        token.className = 'reward-token bonus-mark'
        token.style.left = `${start.left + start.width / 2 - 9}px`
        token.style.top = `${start.top + start.height / 2 - 9}px`
        token.style.setProperty('--token-x', `${target.left + target.width / 2 - start.left - start.width / 2}px`)
        token.style.setProperty('--token-y', `${target.top + target.height / 2 - start.top - start.height / 2}px`)
        token.style.setProperty('--token-scatter', `${(index - 3) * 7}px`)
        token.style.setProperty('--token-delay', `${index * 55}ms`)
        document.body.appendChild(token)
        window.setTimeout(() => token.remove(), 1250)
    }

    window.setTimeout(() => {
        state.points += product.points
        wallet.querySelector('b').textContent = state.points
        wallet.setAttribute('aria-label', `${state.points} loyalty points`)
        wallet.classList.add('is-updated')
        const gain = document.createElement('span')
        gain.className = 'points-gain'
        gain.textContent = `+${product.points}`
        wallet.appendChild(gain)
        window.setTimeout(() => {
            wallet.classList.remove('is-updated')
            gain.remove()
        }, 900)
    }, 820)

    window.setTimeout(() => {
        state.claimed.add(id)
        state.selected = id
        state.screen = 'reward'
        render()
    }, 1280)
}

document.addEventListener('click', (event) => {
    const control = event.target.closest('[data-action]')
    if (!control) return
    const { action, id } = control.dataset

    if (action === 'exit') window.location.href = '../'
    if (action === 'hub') { state.screen = 'hub'; render() }
    if (action === 'start') openNextProduct()
    if (action === 'swipe-start' && event.detail === 0) openNextProduct()
    if (action === 'open-detail') { state.selected = id; state.screen = 'detail'; render() }
    if (action === 'detail') { state.screen = 'detail'; render() }
    if (action === 'quest-go') openQuestStep(id, Number(control.dataset.step))
    if (action === 'toggle-item') {
        if (state.completed.has(id)) return
        const index = Number(control.dataset.index)
        const selectedItems = state.selectedItems[id]
        if (selectedItems.has(index)) selectedItems.delete(index)
        else selectedItems.add(index)
        render(true)
    }
    if (action === 'complete') {
        if (state.selectedItems[id].size !== products[id].items.length) return
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
        animateRewardClaim(control, id)
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
        infoModal.querySelector('p').textContent = '100 loyalty points and 1 prize box are now yours.'
        infoModal.hidden = false
    }
    if (action === 'show-info') infoModal.hidden = false
    if (action === 'close-info') infoModal.hidden = true
})

document.addEventListener('pointerdown', (event) => {
    const thumb = event.target.closest('.swipe-thumb')
    if (!thumb) return
    const track = thumb.closest('.swipe-control')
    const max = Math.max(1, track.clientWidth - thumb.offsetWidth - 10)
    swipeGesture = { pointerId: event.pointerId, startX: event.clientX, max, thumb, track }
    thumb.setPointerCapture(event.pointerId)
    track.classList.add('is-dragging')
})

document.addEventListener('pointermove', (event) => {
    if (!swipeGesture || swipeGesture.pointerId !== event.pointerId) return
    event.preventDefault()
    const distance = Math.min(swipeGesture.max, Math.max(0, event.clientX - swipeGesture.startX))
    const ratio = distance / swipeGesture.max
    swipeGesture.distance = distance
    swipeGesture.thumb.style.transform = `translateX(${distance}px)`
    swipeGesture.track.style.setProperty('--swipe-progress', `${ratio * 100}%`)
    swipeGesture.track.style.setProperty('--swipe-ratio', ratio)
})

function finishSwipe(event) {
    if (!swipeGesture || swipeGesture.pointerId !== event.pointerId) return
    const { track, thumb, max, distance = 0 } = swipeGesture
    swipeGesture = null

    if (distance / max >= .72) {
        track.classList.remove('is-dragging')
        track.classList.add('is-complete')
        track.style.setProperty('--swipe-progress', '100%')
        track.style.setProperty('--swipe-ratio', '1')
        thumb.style.transform = `translateX(${max}px)`
        window.setTimeout(openNextProduct, 220)
        return
    }

    track.classList.remove('is-dragging')
    track.style.setProperty('--swipe-progress', '0%')
    track.style.setProperty('--swipe-ratio', '0')
    thumb.style.transform = ''
}

document.addEventListener('pointerup', finishSwipe)
document.addEventListener('pointercancel', finishSwipe)

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

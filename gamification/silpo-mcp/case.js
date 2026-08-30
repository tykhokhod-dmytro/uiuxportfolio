const app = document.querySelector('#app')
const toast = document.querySelector('#success-toast')
const infoModal = document.querySelector('#info-modal')

const products = {
    cooklist: {
        name: 'Cooklist',
        team: 'Kitchen Bots',
        visual: 'cooklist-square-v1.png',
        type: 'Recipe-to-cart',
        short: 'Pick a recipe and add all its ingredients to your cart in one tap.',
        mission: 'Pick a dish and get all 4 of its ingredients into your cart.',
        steps: [['Pick a dish', 'Choose one of the generated ideas'], ['Add 4 ingredients', 'One by one, or all at once'], ['Add all to cart', 'Finish and unlock the reward']],
        points: 20,
        reward: '20 loyalty points',
        action: 'Add all to cart',
        busy: 'Adding to cart…',
        verb: 'Add',
        heading: 'What are we cooking?',
        dishes: [
            { emoji: '🍝', name: 'Tomato pasta', time: '25 min', level: 'Easy', rating: 4.8, photo: 'dish-tomato-pasta.jpg', items: [
                { emoji: '🍝', name: 'Tagliatelle', photo: 'tagliatelle.jpg', qty: 250, unit: 'g', price: 3.2 },
                { emoji: '🍅', name: 'Cherry tomatoes', photo: 'cherry-tomatoes.jpg', qty: 400, unit: 'g', price: 4.9 },
                { emoji: '🧀', name: 'Parmesan', photo: 'parmesan.jpg', qty: 80, unit: 'g', price: 7.1 },
                { emoji: '🌿', name: 'Fresh basil', photo: 'basil.jpg', qty: 1, unit: 'bunch', plural: 'bunches', price: 3.2 }
            ] },
            { emoji: '🥗', name: 'Greek salad', time: '15 min', level: 'Easy', rating: 4.6, photo: 'dish-greek-salad.jpg', items: [
                { emoji: '🥒', name: 'Cucumber', photo: 'cucumber.jpg', qty: 2, unit: 'pcs', price: 1.9 },
                { emoji: '🍅', name: 'Tomatoes', photo: 'tomatoes.jpg', qty: 400, unit: 'g', price: 4.9 },
                { emoji: '🧀', name: 'Feta', photo: 'feta.jpg', qty: 200, unit: 'g', price: 5.6 },
                { emoji: '🫒', name: 'Kalamata olives', photo: 'olives.jpg', qty: 150, unit: 'g', price: 3.8 }
            ] },
            { emoji: '🍄', name: 'Mushroom risotto', time: '40 min', level: 'Medium', rating: 4.9, photo: 'dish-mushroom-risotto.jpg', items: [
                { emoji: '🍚', name: 'Arborio rice', photo: 'arborio-rice.jpg', qty: 300, unit: 'g', price: 4.4 },
                { emoji: '🍄', name: 'Mushrooms', photo: 'mushrooms.jpg', qty: 400, unit: 'g', price: 5.2 },
                { emoji: '🧀', name: 'Parmesan', photo: 'parmesan.jpg', qty: 80, unit: 'g', price: 7.1 },
                { emoji: '🍷', name: 'Dry white wine', photo: 'white-wine.jpg', qty: 1, unit: 'bottle', plural: 'bottles', price: 8.9 }
            ] }
        ]
    },
    restock: {
        name: 'Restock',
        team: 'Loop Labs',
        visual: 'restock-square-v1.png',
        type: 'Routine shopper',
        short: 'Uses your recent order history to suggest items you may need again.',
        mission: 'Add all 4 recommendations to your cart.',
        steps: [['Scan order history', 'Find patterns in recent purchases'], ['Review 4 recommendations', 'See why each item is suggested'], ['Add all to cart', 'Complete the restock']],
        points: 30,
        reward: '30 loyalty points',
        action: 'Add all to cart',
        busy: 'Adding to cart…',
        verb: 'Add',
        heading: 'Recommended restock',
        demoTitle: 'Recommended for you',
        items: [
            { emoji: '🥛', name: 'Milk 2.5%', photo: 'milk.jpg', qty: 2, unit: 'pcs', price: 4.2, every: 7, last: 6, history: [1, 1, 1, 1, 1, 1] },
            { emoji: '🥚', name: 'Free-range eggs', photo: 'eggs.jpg', qty: 10, unit: 'pcs', price: 4.45, every: 7, last: 5, history: [1, 1, 0, 1, 1, 1] },
            { emoji: '☕', name: 'Coffee beans', photo: 'coffee-beans.jpg', qty: 1, unit: 'kg', price: 12.45, every: 14, last: 13, history: [1, 0, 1, 0, 1, 0] },
            { emoji: '🍞', name: 'Sourdough bread', photo: 'sourdough-bread.jpg', qty: 1, unit: 'loaf', price: 2.65, every: 7, last: 7, history: [1, 1, 1, 0, 1, 1] }
        ]
    },
    gather: {
        name: 'Gather',
        team: 'Table for Five',
        visual: 'gather-square-v1.png',
        type: 'Group planner',
        short: 'Plans an occasion with friends and builds one shared cart within budget.',
        mission: 'Set up an occasion and add all 4 picks to the shared cart.',
        steps: [['Set up the event', 'Occasion, guests and budget'], ['Add 4 picks', 'Friends and AI suggest the items'], ['Build event cart', 'Share the cart with everyone']],
        points: 40,
        reward: '40 loyalty points',
        action: 'Build event cart',
        busy: 'Building…',
        verb: 'Add',
        heading: 'Plan an occasion',
        guests: ['You', 'Olya', 'Max', 'Ira', 'Dan', 'Kate', 'Lev', 'Ann'],
        budgets: [25, 35, 50],
        occasions: {
            picnic: { emoji: '🧺', label: 'Picnic', name: 'Park picnic', photo: 'occasion-picnic.jpg', items: [
                { emoji: '🥖', name: 'Baguettes', photo: 'baguettes.jpg', qty: 2, unit: 'pcs', price: 6.8, by: 'Olya' },
                { emoji: '🧀', name: 'Cheese selection', photo: 'cheese-board.jpg', qty: 1, unit: 'box', plural: 'boxes', price: 14.45, by: 'AI' },
                { emoji: '🍇', name: 'Seedless grapes', photo: 'grapes.jpg', qty: 1, unit: 'kg', price: 6.35, by: 'Max' },
                { emoji: '🥤', name: 'Craft lemonade', photo: 'lemonade.jpg', qty: 4, unit: 'pcs', price: 6.5, by: 'AI' }
            ] },
            birthday: { emoji: '🎂', label: 'Birthday', name: 'Birthday at home', photo: 'occasion-birthday.jpg', items: [
                { emoji: '🎂', name: 'Chocolate cake', photo: 'chocolate-cake.jpg', qty: 1, unit: 'pc', plural: 'pcs', price: 18, by: 'AI' },
                { emoji: '🕯️', name: 'Candles', photo: 'candles.jpg', qty: 1, unit: 'pack', plural: 'packs', price: 2.5, by: 'Olya' },
                { emoji: '🍾', name: 'Sparkling juice', photo: 'sparkling-juice.jpg', qty: 2, unit: 'pcs', price: 6.9, by: 'Max' },
                { emoji: '🎈', name: 'Balloons', photo: 'balloons.jpg', qty: 1, unit: 'set', plural: 'sets', price: 4.4, by: 'AI' }
            ] },
            movie: { emoji: '🍿', label: 'Movie', name: 'Movie night', photo: 'occasion-movie.jpg', items: [
                { emoji: '🍿', name: 'Popcorn kernels', photo: 'popcorn.jpg', qty: 500, unit: 'g', price: 3.6, by: 'AI' },
                { emoji: '🌮', name: 'Nachos & salsa', photo: 'nachos-salsa.jpg', qty: 1, unit: 'set', plural: 'sets', price: 6.2, by: 'Max' },
                { emoji: '🍨', name: 'Ice cream', photo: 'ice-cream.jpg', qty: 1, unit: 'L', price: 7.4, by: 'Olya' },
                { emoji: '🥤', name: 'Cola', photo: 'cola.jpg', qty: 4, unit: 'pcs', price: 5.9, by: 'AI' }
            ] }
        }
    }
}

const state = {
    screen: 'hub',
    selected: null,
    selectedItems: {
        cooklist: new Set(),
        restock: new Set(),
        gather: new Set()
    },
    points: 0,
    grand: { stage: 'idle', box: null },
    completed: new Set(),
    claimed: new Set(),
    demo: {
        cooklist: { dish: null, page: 'choose', servings: 2, carts: {} },
        restock: { scanned: false, scanning: false, found: 0 },
        gather: { brief: false, building: -1, occasion: 'picnic', guests: 4, budget: 35 }
    }
}

let toastTimer
let swipeGesture = null
let stickyAtRender = false
let freshList = false
let restoringRoute = false
const visualLoads = new Map()
const decodedVisuals = new Set()

function loadVisual(url) {
    if (!visualLoads.has(url)) {
        const image = new Image()
        image.src = url
        visualLoads.set(url, image.decode().catch(() => {}).then(() => decodedVisuals.add(url)))
    }
    return visualLoads.get(url)
}

function visualAttrs(product) {
    return `data-visual="${product.visual}" style="--visual: url(${product.visual})"`
}

function revealVisuals() {
    app.querySelectorAll('[data-visual]').forEach((element) => {
        const url = element.dataset.visual
        if (decodedVisuals.has(url)) {
            element.classList.add('is-loaded')
            return
        }
        loadVisual(url).then(() => {
            if (element.isConnected) element.classList.add('is-loaded')
        })
    })
}

function cartButton(count) {
    return `<button class="round-button cart-button" type="button" data-action="scroll-cart" aria-label="Cart, ${count} ${count === 1 ? 'item' : 'items'}">${cartIcon()}${count ? `<b class="cart-count">${count}</b>` : ''}</button>`
}

function topBar(backAction = 'exit', options = {}) {
    const { cart, logo = true } = options
    return `
        <nav class="top-bar ${stickyAtRender ? 'is-scrolled' : ''} ${cart !== undefined ? 'top-bar--app' : ''}">
            <button class="round-button" type="button" data-action="${backAction}" aria-label="Back">‹</button>
            ${logo ? '<strong class="silpo-logo">Silpo</strong>' : '<span></span>'}
            ${cart !== undefined
                ? cartButton(cart)
                : `<div class="points-wallet" aria-label="${state.points} loyalty points"><span class="bonus-mark" aria-hidden="true"></span><b>${state.points}</b></div>`}
        </nav>`
}

function circuitMark() {
    return '<div class="circuit-mark" aria-hidden="true"><span>AI</span><i></i><i></i><i></i><i></i></div>'
}

function itemsFor(id) {
    if (id === 'cooklist') return products.cooklist.dishes[state.demo.cooklist.dish ?? 0].items
    if (id === 'gather') return products.gather.occasions[state.demo.gather.occasion].items
    return products.restock.items
}

function cooklistCart(dish) {
    const { carts } = state.demo.cooklist
    if (!carts[dish]) carts[dish] = new Set()
    return carts[dish]
}

function cooklistCartCount() {
    return Object.values(state.demo.cooklist.carts).reduce((sum, cart) => sum + cart.size, 0)
}

function firstStepDone(id) {
    if (state.completed.has(id)) return true
    if (id === 'cooklist') return state.demo.cooklist.dish !== null
    if (id === 'restock') return state.demo.restock.scanned
    return state.demo.gather.brief
}

function selectionDone(id) {
    if (state.completed.has(id)) return true
    if (id === 'cooklist') return products.cooklist.dishes.some((dish, index) => cooklistCart(index).size === dish.items.length)
    return firstStepDone(id) && state.selectedItems[id].size === itemsFor(id).length
}

function productProgress(id) {
    if (state.completed.has(id)) return 3
    return (firstStepDone(id) ? 1 : 0) + (selectionDone(id) ? 1 : 0)
}

function winnerCard(id) {
    const product = products[id]
    const completed = state.completed.has(id)
    const claimed = state.claimed.has(id)
    const progress = productProgress(id)
    return `
        <button class="winner-card winner-card--${id} ${completed ? 'is-complete' : ''}" type="button" data-action="open-detail" data-id="${id}">
            <span class="winner-thumb winner-thumb--${id}" data-visual="${product.visual}" style="--visual: url(${product.visual}); view-transition-name: thumb-${id}; view-transition-class: ghost"></span>
                <span class="winner-card-copy" style="view-transition-name: copy-${id}; view-transition-class: ghost">
                    <span class="winner-card-title"><b>${product.name}</b></span>
                    <small>${product.short}</small>
                    <span class="winner-card-progress">
                        <span class="winner-progress-count">${progress}/3</span>
                        <span class="winner-progress-track" role="progressbar" aria-label="${product.name} mission progress" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${progress}"><i style="--card-progress: ${(progress / 3) * 100}%"></i></span>
                        <span class="winner-progress-reward" aria-label="${product.points} points${claimed ? ', claimed' : ''}"><i class="bonus-mark" aria-hidden="true"></i>${product.points} points${claimed ? '<i class="reward-check" aria-hidden="true">✓</i>' : ''}</span>
                    </span>
                </span>
        </button>`
}

function nextQuestId(current) {
    const ids = Object.keys(products)
    const start = ids.indexOf(current)
    for (let offset = 1; offset < ids.length; offset += 1) {
        const id = ids[(start + offset) % ids.length]
        if (!state.claimed.has(id)) return id
    }
    return null
}

function nextQuestButton(id, entering = false) {
    if (!state.claimed.has(id)) return ''
    const enterClass = entering ? ' is-entering' : ''
    if (state.claimed.size === 3) return `<button class="primary-button next-quest-button${enterClass}" type="button" data-action="show-final">Open grand reward ✦</button>`
    const next = nextQuestId(id)
    if (next) return `<button class="secondary-button next-quest-button${enterClass}" type="button" data-action="open-detail" data-id="${next}">Next quest ›</button>`
    return `<button class="secondary-button next-quest-button${enterClass}" type="button" data-action="hub">Back to event</button>`
}

function claimButtonContent(id) {
    const product = products[id]
    const completed = state.completed.has(id)
    const claimed = state.claimed.has(id)
    return `
        <span>${claimed ? 'Reward claimed' : completed ? 'Claim reward' : 'Complete quests to claim'}</span>
        <span class="claim-button-reward" aria-label="${product.points} points${claimed ? ', claimed' : ''}"><span class="bonus-mark" aria-hidden="true"></span>${product.points} points${claimed ? '<i class="reward-check" aria-hidden="true">✓</i>' : ''}</span>`
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
                <p class="hero-copy">Three winning mini apps run right inside Silpo, built on Silpo MCP. Try them, complete their missions, claim the rewards.</p>
                <div class="winner-cards">
                    ${winnerCard('cooklist')}${winnerCard('restock')}${winnerCard('gather')}
                </div>
                <section class="grand-card ${allClaimed ? 'is-ready' : ''}">
                    <div><small>${state.grand.stage === 'done' ? 'Grand reward claimed ✓' : allClaimed ? 'Grand reward ready' : 'Complete all 3 missions'}</small><strong>100 points</strong><em class="grand-chip">${state.grand.stage === 'done' ? `+ ${prizeBoxes[state.grand.box].percent}% back on ${prizeBoxes[state.grand.box].category}` : '+ 1 bonus coupon'}</em></div>
                    <span class="grand-coupons" aria-hidden="true">
                        <img class="grand-coupon grand-coupon--one" src="bonus-coupon-v1.png" alt="">
                        <img class="grand-coupon grand-coupon--two" src="bonus-coupon-v1.png" alt="">
                        <img class="grand-coupon grand-coupon--three" src="bonus-coupon-v1.png" alt="">
                    </span>
                </section>
                ${allClaimed
                    ? `<button class="primary-button sticky-action" type="button" data-action="show-final">${state.grand.stage === 'done' ? 'See your grand reward' : 'Open grand reward ✦'}</button>`
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
    const completed = state.completed.has(id)
    const claimed = state.claimed.has(id)
    const stepOne = firstStepDone(id)
    const stepTwo = selectionDone(id)
    const status = completed ? 'Completed' : stepOne ? 'In progress' : 'Not started'
    const steps = [
        { title: product.steps[0][0], note: product.steps[0][1], done: stepOne, current: !stepOne },
        { title: product.steps[1][0], note: product.steps[1][1], done: stepTwo, current: stepOne && !stepTwo },
        { title: product.steps[2][0], note: product.steps[2][1], done: completed, current: stepTwo && !completed }
    ]
    return `
        <section class="screen screen--detail screen--detail-${id}">
            ${topBar('hub')}
            <header class="product-heading">
                <div class="product-hero product-hero--${id}">
                    <div class="product-visual product-visual--${id}" ${visualAttrs(product)} role="img" aria-label="${product.name} product illustration"></div>
                </div>
                <div class="product-intro"><div class="product-title-row"><h1>${product.name}</h1><span class="byline-badge">by ${product.team}</span></div><p>${product.short}</p></div>
            </header>
            <div class="screen-content detail-content">
                <section class="task-panel">
                    <div class="task-panel-head"><h2>Your quests</h2><span class="quest-state quest-state--${completed ? 'done' : stepOne ? 'active' : 'idle'}">${status}</span></div>
                    <ol class="quest-steps">
                        ${steps.map((step, index) => {
                            const mode = step.done ? 'is-done' : step.current ? 'is-current' : 'is-todo'
                            return `<li class="quest-step ${mode}" data-action="row-quest" data-id="${id}" data-step="${index}"><b aria-hidden="true">${step.done ? '✓' : ''}</b><span><strong>${step.title}</strong><small>${step.note}</small></span><button class="quest-go" type="button" data-action="quest-go" data-id="${id}" data-step="${index}" aria-label="Go to ${step.title}">Go</button></li>`
                        }).join('')}
                    </ol>
                </section>
                <div class="detail-actions">
                    <button class="primary-button claim-button ${completed && !claimed ? 'is-ready' : ''}" type="button" ${completed && !claimed ? `data-action="claim" data-id="${id}"` : 'disabled'}>${claimButtonContent(id)}</button>
                    ${nextQuestButton(id)}
                </div>
            </div>
        </section>`
}

function money(value) {
    return `$${value.toFixed(2)}`
}

function demoRows(id) {
    const completed = state.completed.has(id)
    const selected = state.selectedItems[id]
    const factor = id === 'cooklist' ? state.demo.cooklist.servings / 2 : 1
    const rows = itemsFor(id).map((item, index) => ({
        ...item,
        index,
        qty: Math.round(item.qty * factor * 10) / 10,
        unit: item.qty * factor > 1 && item.plural ? item.plural : item.unit,
        price: item.price * factor,
        added: selected.has(index)
    }))
    const total = rows.reduce((sum, row) => sum + row.price, 0)
    const addedTotal = rows.filter((row) => row.added).reduce((sum, row) => sum + row.price, 0)
    return { rows, total, addedTotal, remaining: rows.filter((row) => !row.added).length }
}

function photoTile(photo, emoji, className) {
    return `<span class="${className}" aria-hidden="true"><i>${emoji}</i>${photo ? `<img src="photos/${photo}" alt="" loading="lazy" onerror="this.hidden = true">` : ''}</span>`
}

function cartIcon() {
    return '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M3 4h2.4l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.4-1l2.1-6.4H7.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.6" fill="currentColor"/><circle cx="17" cy="20" r="1.6" fill="currentColor"/></svg>'
}

function addPill(id, row, disabled) {
    return `<button class="add-pill" type="button" data-action="toggle-item" data-id="${id}" data-index="${row.index}" aria-pressed="${row.added}" aria-label="${row.added ? 'Remove' : 'Add'} ${row.name}" ${disabled ? 'disabled' : ''}>${row.added ? '✓ In cart' : `${cartIcon()} Add`}</button>`
}

function productRow(id, row, disabled, note = '') {
    return `
        <li class="demo-item demo-item--product ${row.added ? 'is-added' : ''}" style="--row: ${row.index}" data-action="row-toggle" data-id="${id}" data-index="${row.index}">
            ${photoTile(row.photo, row.emoji, 'demo-item-photo')}
            <span class="demo-item-copy"><b>${row.name}</b><small>${row.qty} ${row.unit}${note}</small></span>
            <b class="demo-item-price">${money(row.price)}</b>
            ${addPill(id, row, disabled)}
        </li>`
}

function cartSummary(rows, addedTotal) {
    const count = rows.filter((row) => row.added).length
    if (!count) return ''
    return `<div class="cart-summary">${cartIcon()}<b>${count} ${count === 1 ? 'item' : 'items'}</b><span>in cart</span><b class="cart-summary-total">${money(addedTotal)}</b></div>`
}

function cardPhoto(photo, emoji, alt) {
    return `<div class="card-photo" role="img" aria-label="${alt}"><i aria-hidden="true">${emoji}</i>${photo ? `<img src="photos/${photo}" alt="" onerror="this.hidden = true">` : ''}</div>`
}

function segmented(id, action, label, values, current, disabled, format = (value) => value) {
    return `<div class="segmented" role="group" aria-label="${label}">${values.map((value) => `<button type="button" data-action="${action}" data-id="${id}" data-value="${value}" aria-pressed="${current === value}" ${disabled ? 'disabled' : ''}>${format(value)}</button>`).join('')}</div>`
}

function cardHead(chip, title, meta, extra = '') {
    return `<div class="demo-card-head"><div><span class="ai-chip">${chip}</span><h2>${title}</h2><p>${meta}</p></div>${extra}</div>`
}

function cooklistCard(id) {
    const product = products[id]
    return `
        <section class="chooser">
            <div class="dish-list">${product.dishes.map((dish, index) => {
                const total = dish.items.reduce((sum, item) => sum + item.price, 0)
                const inCart = cooklistCart(index).size === dish.items.length
                return `<button class="dish-tile" type="button" data-action="pick-dish" data-id="${id}" data-value="${index}" aria-label="${dish.name}, ${dish.time}, ${money(total)}${inCart ? ', in cart' : ''}"><i aria-hidden="true">${dish.emoji}</i>${dish.photo ? `<img src="photos/${dish.photo}" alt="" onerror="this.hidden = true">` : ''}<span class="dish-tile-time">⏱ ${dish.time}</span><span class="dish-tile-copy"><b>${dish.name}</b><small>4 ingredients · ${money(total)} · ★ ${dish.rating.toFixed(1)}</small></span><span class="dish-tile-go ${inCart ? 'is-done' : ''}" aria-hidden="true">${inCart ? '✓' : '›'}</span></button>`
            }).join('')}</div>
        </section>`
}

function recipeScreen(id) {
    const product = products[id]
    const demo = state.demo.cooklist
    const dish = product.dishes[demo.dish]
    const { rows, addedTotal, remaining } = demoRows(id)
    const addedCount = rows.length - remaining
    const done = remaining === 0
    return `
        <section class="screen screen--demo screen--demo-${id} screen--recipe">
            ${topBar('change-dish', { cart: cooklistCartCount(), logo: false })}
            <div class="recipe-cover" role="img" aria-label="${dish.name}"><i aria-hidden="true">${dish.emoji}</i>${dish.photo ? `<img src="photos/${dish.photo}" alt="" onerror="this.hidden = true">` : ''}</div>
            <div class="recipe-sheet">
                <span class="sheet-handle" aria-hidden="true"></span>
                <div class="recipe-head"><h1 class="recipe-title">${dish.name}</h1><span class="quest-state quest-state--${done ? 'done' : 'active'}">${done ? '✓ In cart' : `${addedCount}/${rows.length} added`}</span></div>
                <div class="meta-chips"><span>⏱ ${dish.time}</span><span>🍳 ${dish.level}</span><span>★ ${dish.rating.toFixed(1)}</span></div>
                <section class="recipe-block recipe-block--row">
                    <div><h2>Servings</h2><p>Quantities and prices update</p></div>
                    <span class="stepper"><button type="button" data-action="set-servings" data-id="${id}" data-value="-1" aria-label="Fewer servings" ${demo.servings <= 1 ? 'disabled' : ''}>−</button><b>${demo.servings}</b><button type="button" data-action="set-servings" data-id="${id}" data-value="1" aria-label="More servings" ${demo.servings >= 6 ? 'disabled' : ''}>+</button></span>
                </section>
                <section class="recipe-block">
                    <h2>Ingredients</h2>
                    <ul class="item-list">${rows.map((row) => productRow(id, row, false)).join('')}</ul>
                    ${cartSummary(rows, addedTotal)}
                </section>
                ${done ? demoResult(id) : ''}
                ${done
                    ? '<button class="primary-button" type="button" data-action="change-dish">Back</button>'
                    : `<button class="primary-button" type="button" data-action="complete" data-id="${id}">Add all to cart · ${money(demoRows(id).total)}</button>`}
            </div>
        </section>`
}

function restockCard(id, completed) {
    const product = products[id]
    const demo = state.demo.restock
    if (!demo.scanned) {
        const notes = [
            'Reading your last 38 orders…',
            'Spotting what you buy on repeat…',
            'Checking what is running low…',
            'Almost there…',
            'Found 4 repeat buys!'
        ]
        return `
            <section class="demo-card">
                ${cardHead('↻ Order history', 'Find items to restock', 'We’ll scan your last 12 weeks of orders and suggest likely repeat buys')}
                ${demo.scanning
                    ? `<div class="scan-stage">
                        <div class="found-chips">${product.items.map((item, index) => `<span class="found-chip ${index < demo.found ? 'is-found' : ''}">${photoTile(item.photo, item.emoji, 'found-photo')}<i aria-hidden="true">✓</i></span>`).join('')}</div>
                        <div class="scan-progress" role="progressbar" aria-label="Scanning orders" aria-valuemin="0" aria-valuemax="4" aria-valuenow="${demo.found}"><i style="--scan: ${20 + demo.found * 20}%"></i></div>
                        <p class="scan-note">${notes[demo.found]}</p>
                    </div>`
                    : `<div class="stat-row"><span><b>38</b><small>orders</small></span><span><b>12</b><small>weeks</small></span><span><b>4</b><small>likely repeats</small></span></div>
                        <button class="inline-button" type="button" data-action="scan" data-id="${id}">Find recommendations</button>`}
            </section>`
    }
    const { rows, addedTotal } = demoRows(id)
    return `
        <section class="demo-card">
            ${cardHead('↻ Based on your orders', product.demoTitle, '4 suggestions based on your last 12 weeks of orders')}
            <ul class="item-list ${freshList ? 'is-fresh' : ''}">${rows.map((row) => productRow(id, row, completed, ` · every ~${row.every} days · ${row.last} d ago`)).join('')}
            </ul>
            ${cartSummary(rows, addedTotal)}
        </section>`
}

function gatherCard(id, completed) {
    const product = products[id]
    const demo = state.demo.gather
    const occasion = product.occasions[demo.occasion]
    if (demo.building >= 0) {
        const helpers = product.guests.slice(0, demo.guests)
        const notes = [
            `Asking ${helpers.slice(1, 3).join(' and ')}…`,
            `Matching the ${money(demo.budget).replace('.00', '')} budget…`,
            `Picking 4 things for ${occasion.name.toLowerCase()}…`
        ]
        return `
            <section class="demo-card">
                ${cardHead('✦ Building your cart', 'Getting everyone on board', `${occasion.emoji} ${occasion.name} · ${demo.guests} people`)}
                <div class="build-stage">
                    <span class="avatars avatars--busy" aria-hidden="true">${helpers.slice(0, 5).map((guest, index) => `<i class="${index <= demo.building + 1 ? 'is-in' : ''}">${guest[0]}</i>`).join('')}</span>
                    <div class="scan-progress" role="progressbar" aria-label="Building the cart"><i style="--scan: ${30 + demo.building * 35}%"></i></div>
                    <p class="scan-note">${notes[demo.building]}</p>
                </div>
            </section>`
    }
    if (!demo.brief) {
        return `
            <section class="demo-card">
                ${cardHead('🎉 New occasion', 'Plan it together', 'Pick the occasion, guests and budget — Gather suggests the cart')}
                <div class="field"><small>Occasion</small>${segmented(id, 'set-occasion', 'Occasion', Object.keys(product.occasions), demo.occasion, false, (key) => `${product.occasions[key].emoji} ${product.occasions[key].label}`)}</div>
                <div class="field field--row"><small>Guests</small><span class="stepper"><button type="button" data-action="set-guests" data-id="${id}" data-value="-1" aria-label="Fewer guests" ${demo.guests <= 2 ? 'disabled' : ''}>−</button><b>${demo.guests}</b><button type="button" data-action="set-guests" data-id="${id}" data-value="1" aria-label="More guests" ${demo.guests >= 8 ? 'disabled' : ''}>+</button></span></div>
                <div class="field"><small>Budget</small>${segmented(id, 'set-budget', 'Budget', product.budgets, demo.budget, false, (value) => money(value).replace('.00', ''))}</div>
                <button class="inline-button" type="button" data-action="build-brief" data-id="${id}">Suggest picks ✦</button>
            </section>`
    }
    const { rows, addedTotal } = demoRows(id)
    const guests = product.guests.slice(0, demo.guests)
    const share = Math.min(1, addedTotal / demo.budget)
    return `
        <section class="demo-card demo-card--photo">
            ${cardPhoto(occasion.photo, occasion.emoji, occasion.name)}
            ${cardHead('🎉 Shared event cart', occasion.name, `Sat 14:00 · ${demo.guests} people · budget ${money(demo.budget).replace('.00', '')}`, completed ? '' : `<button class="text-button" type="button" data-action="edit-brief" data-id="${id}">Edit</button>`)}
            <div class="budget">
                <div><small>Budget</small><b>${money(addedTotal)} <span>/ ${money(demo.budget).replace('.00', '')}</span></b></div>
                <span class="budget-track ${addedTotal > demo.budget ? 'is-over' : ''}" role="progressbar" aria-label="Budget used" aria-valuemin="0" aria-valuemax="${demo.budget}" aria-valuenow="${addedTotal.toFixed(2)}"><i style="--budget: ${share * 100}%"></i></span>
                <div><em>≈ ${money(addedTotal / demo.guests)} per person</em><span class="avatars" aria-label="${guests.join(', ')}">${guests.slice(0, 5).map((guest) => `<i>${guest[0]}</i>`).join('')}${guests.length > 5 ? `<i>+${guests.length - 5}</i>` : ''}</span></div>
            </div>
            <ul class="item-list ${freshList ? 'is-fresh' : ''}">${rows.map((row) => productRow(id, row, completed, ` · <em class="${row.by === 'AI' ? 'by-ai' : ''}">${row.by === 'AI' ? '✦ AI pick' : `by ${row.by}`}</em>`)).join('')}</ul>
        </section>`
}

function demoResult(id) {
    const product = products[id]
    const { total } = demoRows(id)
    const title = { cooklist: '4 ingredients added to your cart', restock: '4 recommendations added to your cart', gather: 'Event cart shared' }[id]
    const summary = {
        cooklist: () => '',
        restock: () => `${money(total)} · suggested from your recent orders`,
        gather: () => `${money(total)} · ≈ ${money(total / state.demo.gather.guests)} each · sent to ${state.demo.gather.guests - 1} friends`
    }[id]()
    return `<section class="demo-result"><b aria-hidden="true">✓</b><div><strong>${title}</strong>${summary ? `<small>${summary}</small>` : ''}</div></section>`
}

function demoAction(id, completed) {
    const product = products[id]
    const { total, remaining } = demoRows(id)
    if (completed) return '<button class="primary-button" type="button" data-action="detail">Back</button>'
    if (!firstStepDone(id)) return ''
    if (id === 'cooklist') return `<button class="primary-button" type="button" data-action="complete" data-id="${id}">${remaining ? `Add all to cart · ${money(total)}` : `Go to cart · ${money(total)}`}</button>`
    if (remaining) {
        const hint = id === 'restock'
            ? `Add ${remaining} ${remaining === 1 ? 'suggestion' : 'suggestions'} to finish`
            : `${product.verb} ${remaining} more to continue`
        return `<button class="primary-button" type="button" disabled>${hint}</button>`
    }
    return `<button class="primary-button" type="button" data-action="complete" data-id="${id}">${product.action} · ${money(total)}</button>`
}

function demoScreen(id) {
    if (id === 'cooklist' && state.demo.cooklist.page === 'recipe' && state.demo.cooklist.dish !== null) return recipeScreen(id)

    const product = products[id]
    const completed = state.completed.has(id)
    const card = { cooklist: cooklistCard, restock: restockCard, gather: gatherCard }[id](id, completed)
    const isChooser = id === 'cooklist'
    const appBarOptions = isChooser
        ? { cart: cooklistCartCount() }
        : { cart: state.selectedItems[id].size }
    return `
        <section class="screen screen--demo screen--demo-${id}">
            ${topBar('detail', appBarOptions)}
            <div class="screen-content demo-content">
                <span class="app-tag"><i class="app-tag-icon product-visual--${id}" ${visualAttrs(product)} aria-hidden="true"></i>${product.name}<span>by ${product.team}</span></span>
                <h1 class="app-title">${product.heading}</h1>
                <p class="app-lead">${product.short}</p>
                ${card}
                ${!isChooser && completed ? demoResult(id) : ''}
                ${isChooser ? '' : demoAction(id, completed)}
            </div>
        </section>`
}

const prizeBoxes = [
    { key: 'cheese', emoji: '🧀', photo: 'parmesan.jpg', percent: 30, category: 'cheese & dairy', from: 'You cooked with it in Cooklist' },
    { key: 'coffee', emoji: '☕', photo: 'coffee-beans.jpg', percent: 25, category: 'coffee & tea', from: 'Restock spotted it in your orders' },
    { key: 'bakery', emoji: '🥐', photo: 'sourdough-bread.jpg', percent: 20, category: 'bakery', from: 'Gather picked it for your event' }
]

function prizeTicket(prize) {
    return `
        <div class="ticket ticket--${prize.key}">
            <span class="ticket-photo"><i aria-hidden="true">${prize.emoji}</i><img src="photos/${prize.photo}" alt="" onerror="this.hidden = true"></span>
            <span class="ticket-body">
                <b class="ticket-percent">${prize.percent}%</b>
                <span class="ticket-copy"><small>back in bonuses</small><b>on ${prize.category}</b></span>
            </span>
        </div>`
}

function grandCard() {
    const { stage, box } = state.grand
    if (stage === 'done') {
        const prize = prizeBoxes[box]
        return `
            <section class="grand-prize grand-prize--won">
                <small>Grand reward claimed</small>
                <strong>100 loyalty points<br>+ ${prize.percent}% back in bonuses</strong>
                ${prizeTicket(prize)}
                <em class="ticket-note">${prize.from}</em>
            </section>`
    }
    if (stage === 'pick' || stage === 'opening') {
        return `
            <section class="grand-prize grand-prize--game">
                <small>${stage === 'opening' ? 'Opening…' : 'Pick a coupon'}</small>
                <strong>${stage === 'opening' ? 'Opening your coupon' : 'One coupon is yours'}</strong>
                <div class="prize-boxes">${prizeBoxes.map((prize, index) => {
                    const chosen = box === index
                    const mode = stage === 'opening' ? (chosen ? 'is-opening' : 'is-dimmed') : ''
                    return `<button class="prize-box prize-box--${prize.key} ${mode}" type="button" data-action="pick-box" data-value="${index}" aria-label="Coupon ${index + 1}" ${stage === 'opening' ? 'disabled' : ''}><img class="prize-coupon-art" src="bonus-coupon-v1.png" alt=""><span class="prize-face" aria-hidden="true">${chosen && stage === 'opening' ? `${prize.percent}%` : '?'}</span></button>`
                }).join('')}</div>
            </section>`
    }
    return `
        <section class="grand-prize">
            <small>Grand reward</small>
            <strong>100 loyalty points<br>+ 1 bonus coupon</strong>
            <span class="grand-prize-symbols" aria-hidden="true"><i class="bonus-mark"></i><svg class="coupon-glyph" viewBox="0 0 44 30"><path d="M3 3h38a2 2 0 0 1 2 2v4.5a5.5 5.5 0 0 0 0 11V25a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-4.5a5.5 5.5 0 0 0 0-11V5a2 2 0 0 1 2-2z" fill="currentColor"/><path d="M30 7v16" stroke="#141414" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="3 4"/></svg></span>
        </section>`
}

function finalScreen() {
    const { stage } = state.grand
    return `
        <section class="screen screen--final">
            ${topBar('hub')}
            <div class="screen-content final-content">
                ${circuitMark()}
                <div class="trophy" aria-hidden="true"><img src="winner-trophy-v1.png" alt=""></div>
                <h1>All winners<br><span>unlocked!</span></h1>
                <p>${stage === 'done' ? 'Your grand reward is in your account.' : 'You completed every AI Factory mission.'}</p>
                <div class="completed-list">${Object.values(products).map((product) => `<span>✓ ${product.name}</span>`).join('')}</div>
                ${grandCard()}
                ${stage === 'idle' ? `<button class="primary-button claim-button is-ready" type="button" data-action="play-grand"><span>Play the prize game</span><span class="claim-button-reward"><span class="bonus-mark" aria-hidden="true"></span>100 points<svg class="coupon-glyph coupon-glyph--chip" aria-hidden="true" viewBox="0 0 44 30"><path d="M3 3h38a2 2 0 0 1 2 2v4.5a5.5 5.5 0 0 0 0 11V25a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-4.5a5.5 5.5 0 0 0 0-11V5a2 2 0 0 1 2-2z" fill="currentColor"/><path d="M30 7v16" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="3 4"/></svg></span></button>` : ''}
                ${stage === 'done' ? '<button class="primary-button" type="button" data-action="hub">Back to event</button>' : ''}
                ${stage === 'idle' ? '<button class="secondary-button" type="button" data-action="hub">Back to event</button>' : ''}
            </div>
        </section>`
}

function currentRoute() {
    return {
        screen: state.screen,
        selected: state.selected,
        page: state.demo.cooklist.page
    }
}

function sameRoute(a, b) {
    return Boolean(a) && Boolean(b) && a.screen === b.screen && a.selected === b.selected && a.page === b.page
}

function syncHistory() {
    if (restoringRoute) return
    const route = currentRoute()
    if (sameRoute(history.state?.route, route)) return
    if (!history.state?.route) history.replaceState({ route }, '')
    else history.pushState({ route }, '')
}

window.addEventListener('popstate', (event) => {
    const route = event.state?.route
    if (!route) return
    restoringRoute = true
    state.screen = route.screen
    state.selected = route.selected
    state.demo.cooklist.page = route.page
    hideToast()
    render()
    restoringRoute = false
})

function render(preserveScroll = false, viaTransition = false) {
    const scrollPosition = app.scrollTop
    stickyAtRender = preserveScroll && scrollPosition > 8
    app.classList.toggle('is-vt', viaTransition)
    app.classList.toggle('is-static', preserveScroll)
    if (state.screen === 'hub') app.innerHTML = hubScreen()
    if (state.screen === 'detail') app.innerHTML = detailScreen(state.selected)
    if (state.screen === 'demo') app.innerHTML = demoScreen(state.selected)
    if (state.screen === 'final') app.innerHTML = finalScreen()
    revealVisuals()
    freshList = false
    app.scrollTop = preserveScroll ? scrollPosition : 0
    updateStickyHeader()
    syncHistory()
}

function transitionTo(cardId, mutate) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduceMotion) {
        mutate()
        render()
        return
    }

    const root = document.documentElement
    const frame = app.getBoundingClientRect()
    root.dataset.vtCard = cardId
    root.dataset.vtFrom = state.screen
    root.style.setProperty('--vt-clip', `inset(${frame.top}px ${window.innerWidth - frame.right}px ${window.innerHeight - frame.bottom}px ${frame.left}px round ${getComputedStyle(app).borderRadius})`)
    const transition = document.startViewTransition(() => {
        mutate()
        render(false, true)
    })
    transition.finished.finally(() => {
        delete root.dataset.vtCard
        delete root.dataset.vtFrom
        root.style.removeProperty('--vt-clip')
    })
}

function updateStickyHeader() {
    const header = app.querySelector('.top-bar')
    if (header) header.classList.toggle('is-scrolled', app.scrollTop > 8)
    updateCoverParallax()
}

function updateCoverParallax() {
    const cover = app.querySelector('.recipe-cover')
    if (!cover) return
    const progress = Math.min(1, Math.max(0, app.scrollTop / cover.offsetHeight))
    cover.style.transform = `translateY(${app.scrollTop * .5}px) scale(${1 + progress * .06})`
    cover.style.setProperty('--cover-dim', progress * .45)
}

app.addEventListener('scroll', updateStickyHeader, { passive: true })

function openNextProduct() {
    state.selected = nextProduct()
    state.screen = 'detail'
    render()
}

function openQuestStep(id, step) {
    state.selected = id
    state.screen = 'demo'
    if (id === 'cooklist') state.demo.cooklist.page = 'choose'
    render()

    if (step === 0) return
    window.requestAnimationFrame(() => {
        const target = app.querySelector(step === 1 ? '.item-list' : '.primary-button')
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
}

function finishDish(id) {
    if (!state.completed.has(id)) {
        completeMission(id)
        return
    }
    render(true)
    app.querySelector('.demo-result')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

function completeMission(id) {
    if (state.completed.has(id)) return
    state.completed.add(id)
    state.selected = id
    state.screen = 'demo'
    render(true)
    app.querySelector('.demo-result')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    showToast()
}

function flyToCart(control) {
    const cart = app.querySelector('.cart-button')
    const photo = control.closest('.demo-item')?.querySelector('.demo-item-photo')
    if (!cart || !photo) return

    const image = photo.querySelector('img:not([hidden])')
    const start = photo.getBoundingClientRect()
    const target = cart.getBoundingClientRect()
    const flyer = document.createElement('span')
    flyer.className = 'cart-flyer'
    flyer.style.left = `${start.left}px`
    flyer.style.top = `${start.top}px`
    flyer.style.width = `${start.width}px`
    flyer.style.height = `${start.height}px`
    if (image) flyer.style.backgroundImage = `url("${image.src}")`
    else flyer.textContent = photo.textContent
    flyer.style.setProperty('--fly-x', `${target.left + target.width / 2 - start.left - start.width / 2}px`)
    flyer.style.setProperty('--fly-y', `${target.top + target.height / 2 - start.top - start.height / 2}px`)
    document.body.appendChild(flyer)
    window.setTimeout(() => {
        flyer.remove()
        const fab = app.querySelector('.cart-button')
        if (!fab) return
        fab.classList.remove('is-bump')
        void fab.offsetWidth
        fab.classList.add('is-bump')
        haptic(10)
    }, 620)
}

function showToast() {
    window.clearTimeout(toastTimer)
    const frame = app.getBoundingClientRect()
    toast.style.top = `${frame.top + 14}px`
    toast.style.left = `${frame.left + 16}px`
    toast.style.width = `${frame.width - 32}px`
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

function haptic(pattern) {
    if (typeof navigator.vibrate === 'function') navigator.vibrate(pattern)
}

function sendPointsToWallet(origin, amount, onArrive) {
    const wallet = document.querySelector('.points-wallet')
    if (!wallet) {
        state.points += amount
        onArrive?.()
        return
    }

    const start = origin.getBoundingClientRect()
    const target = wallet.getBoundingClientRect()
    let pulseTimer = 0
    const pulseWallet = () => {
        window.clearTimeout(pulseTimer)
        haptic(8)
        wallet.classList.remove('is-updated')
        void wallet.offsetWidth
        wallet.classList.add('is-updated')
        pulseTimer = window.setTimeout(() => wallet.classList.remove('is-updated'), 360)
    }
    const flight = 900
    const arrival = 700
    const stagger = 55
    const tokens = 7

    for (let index = 0; index < tokens; index += 1) {
        const token = document.createElement('span')
        token.className = 'reward-token bonus-mark'
        token.style.left = `${start.left + start.width / 2 - 12}px`
        token.style.top = `${start.top + start.height / 2 - 12}px`
        token.style.setProperty('--token-x', `${target.left + target.width / 2 - start.left - start.width / 2}px`)
        token.style.setProperty('--token-y', `${target.top + target.height / 2 - start.top - start.height / 2}px`)
        token.style.setProperty('--token-scatter', `${(index - 3) * 7}px`)
        token.style.setProperty('--token-delay', `${index * stagger}ms`)
        document.body.appendChild(token)
        window.setTimeout(pulseWallet, arrival + index * stagger)
        window.setTimeout(() => token.remove(), flight + index * stagger)
    }

    window.setTimeout(() => {
        state.points += amount
        haptic([14, 40, 30])
        wallet.querySelector('b').textContent = state.points
        wallet.setAttribute('aria-label', `${state.points} loyalty points`)
        onArrive?.()
    }, arrival + (tokens - 1) * stagger)
}

function animateRewardClaim(control, id) {
    const product = products[id]
    control.disabled = true
    control.classList.remove('is-ready')
    control.textContent = 'Claiming…'
    haptic(20)

    sendPointsToWallet(control, product.points, () => {
        state.claimed.add(id)
        control.innerHTML = claimButtonContent(id)
        control.removeAttribute('data-action')
        control.insertAdjacentHTML('afterend', nextQuestButton(id, true))
        window.requestAnimationFrame(() => {
            app.querySelector('.next-quest-button')?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        })
    })
}

function showToast() {
    window.clearTimeout(toastTimer)
    const frame = app.getBoundingClientRect()
    toast.style.top = `${frame.top + 14}px`
    toast.style.left = `${frame.left + 16}px`
    toast.style.width = `${frame.width - 32}px`
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

function haptic(pattern) {
    if (typeof navigator.vibrate === 'function') navigator.vibrate(pattern)
}

function sendPointsToWallet(origin, amount, onArrive) {
    const wallet = document.querySelector('.points-wallet')
    if (!wallet) {
        state.points += amount
        onArrive?.()
        return
    }

    const start = origin.getBoundingClientRect()
    const target = wallet.getBoundingClientRect()
    let pulseTimer = 0
    const pulseWallet = () => {
        window.clearTimeout(pulseTimer)
        haptic(8)
        wallet.classList.remove('is-updated')
        void wallet.offsetWidth
        wallet.classList.add('is-updated')
        pulseTimer = window.setTimeout(() => wallet.classList.remove('is-updated'), 360)
    }
    const flight = 900
    const arrival = 700
    const stagger = 55
    const tokens = 7

    for (let index = 0; index < tokens; index += 1) {
        const token = document.createElement('span')
        token.className = 'reward-token bonus-mark'
        token.style.left = `${start.left + start.width / 2 - 12}px`
        token.style.top = `${start.top + start.height / 2 - 12}px`
        token.style.setProperty('--token-x', `${target.left + target.width / 2 - start.left - start.width / 2}px`)
        token.style.setProperty('--token-y', `${target.top + target.height / 2 - start.top - start.height / 2}px`)
        token.style.setProperty('--token-scatter', `${(index - 3) * 7}px`)
        token.style.setProperty('--token-delay', `${index * stagger}ms`)
        document.body.appendChild(token)
        window.setTimeout(pulseWallet, arrival + index * stagger)
        window.setTimeout(() => token.remove(), flight + index * stagger)
    }

    window.setTimeout(() => {
        state.points += amount
        haptic([14, 40, 30])
        wallet.querySelector('b').textContent = state.points
        wallet.setAttribute('aria-label', `${state.points} loyalty points`)
        onArrive?.()
    }, arrival + (tokens - 1) * stagger)
}

function animateRewardClaim(control, id) {
    const product = products[id]
    const wallet = document.querySelector('.points-wallet')
    if (!wallet) return

    const start = control.getBoundingClientRect()
    const target = wallet.getBoundingClientRect()
    let pulseTimer = 0
    const pulseWallet = () => {
        window.clearTimeout(pulseTimer)
        haptic(8)
        wallet.classList.remove('is-updated')
        void wallet.offsetWidth
        wallet.classList.add('is-updated')
        pulseTimer = window.setTimeout(() => wallet.classList.remove('is-updated'), 360)
    }
    const flight = 900
    const arrival = 700
    const stagger = 55
    const tokens = 7
    control.disabled = true
    control.classList.remove('is-ready')
    control.textContent = 'Claiming…'
    haptic(20)

    for (let index = 0; index < tokens; index += 1) {
        const token = document.createElement('span')
        token.className = 'reward-token bonus-mark'
        token.style.left = `${start.left + start.width / 2 - 12}px`
        token.style.top = `${start.top + start.height / 2 - 12}px`
        token.style.setProperty('--token-x', `${target.left + target.width / 2 - start.left - start.width / 2}px`)
        token.style.setProperty('--token-y', `${target.top + target.height / 2 - start.top - start.height / 2}px`)
        token.style.setProperty('--token-scatter', `${(index - 3) * 7}px`)
        token.style.setProperty('--token-delay', `${index * stagger}ms`)
        document.body.appendChild(token)
        window.setTimeout(pulseWallet, arrival + index * stagger)
        window.setTimeout(() => token.remove(), flight + index * stagger)
    }

    const lastArrival = arrival + (tokens - 1) * stagger
    window.setTimeout(() => {
        state.points += product.points
        state.claimed.add(id)
        haptic([14, 40, 30])
        wallet.querySelector('b').textContent = state.points
        wallet.setAttribute('aria-label', `${state.points} loyalty points`)
        control.innerHTML = claimButtonContent(id)
        control.removeAttribute('data-action')
        control.insertAdjacentHTML('afterend', nextQuestButton(id, true))
        window.requestAnimationFrame(() => {
            app.querySelector('.next-quest-button')?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        })
    }, lastArrival)
}

document.addEventListener('click', (event) => {
    const control = event.target.closest('[data-action]')
    if (!control) return
    const { action, id } = control.dataset

    if (action === 'exit') window.location.href = '../'
    if (action === 'hub') { state.screen = 'hub'; render() }
    if (action === 'start') openNextProduct()
    if (action === 'swipe-start' && event.detail === 0) openNextProduct()
    if (action === 'open-detail') transitionTo(id, () => { state.selected = id; state.screen = 'detail' })
    if (action === 'detail') { state.screen = 'detail'; render() }
    if (action === 'quest-go') openQuestStep(id, Number(control.dataset.step))
    if (action === 'row-quest') {
        if (window.innerWidth > 620) return
        openQuestStep(id, Number(control.dataset.step))
    }
    if (action === 'row-toggle') {
        if (window.innerWidth > 620) return
        const pill = control.querySelector('.add-pill:not([disabled])')
        pill?.click()
    }
    if (action === 'toggle-item') {
        if (state.completed.has(id) && id !== 'cooklist') return
        const index = Number(control.dataset.index)
        const selectedItems = state.selectedItems[id]
        if (selectedItems.has(index)) selectedItems.delete(index)
        else {
            selectedItems.add(index)
            flyToCart(control)
        }
        render(true)
        if (selectedItems.size === itemsFor(id).length && !state.completed.has(id)) {
            const button = app.querySelector('.screen .primary-button')
            if (button) {
                button.disabled = true
                button.textContent = products[id].busy
            }
            window.setTimeout(() => (id === 'cooklist' ? finishDish(id) : completeMission(id)), 800)
        }
    }
    if (action === 'scroll-cart') {
        const target = app.querySelector('.cart-summary') || app.querySelector('.demo-content .primary-button, .recipe-sheet .primary-button')
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    if (action === 'set-servings') {
        if (state.completed.has(id)) return
        state.demo.cooklist.servings = Math.min(6, Math.max(1, state.demo.cooklist.servings + Number(control.dataset.value)))
        render(true)
    }
    if (action === 'pick-dish') {
        const dish = Number(control.dataset.value)
        state.demo.cooklist.dish = dish
        state.selectedItems.cooklist = cooklistCart(dish)
        state.demo.cooklist.page = 'recipe'
        render()
    }
    if (action === 'change-dish') {
        state.demo.cooklist.page = 'choose'
        render()
    }
    if (action === 'scan') {
        const demo = state.demo.restock
        demo.scanning = true
        demo.found = 0
        render(true)
        const beats = [520, 400, 380, 400]
        let elapsed = 0
        beats.forEach((delay, index) => {
            elapsed += delay
            window.setTimeout(() => {
                demo.found = index + 1
                haptic(8)
                render(true)
            }, elapsed)
        })
        window.setTimeout(() => {
            demo.scanning = false
            demo.scanned = true
            freshList = true
            render(true)
        }, elapsed + 620)
    }
    if (action === 'set-occasion') {
        state.demo.gather.occasion = control.dataset.value
        state.selectedItems.gather.clear()
        render(true)
    }
    if (action === 'set-guests') {
        state.demo.gather.guests = Math.min(8, Math.max(2, state.demo.gather.guests + Number(control.dataset.value)))
        render(true)
    }
    if (action === 'set-budget') {
        state.demo.gather.budget = Number(control.dataset.value)
        render(true)
    }
    if (action === 'build-brief') {
        const demo = state.demo.gather
        demo.building = 0
        render(true)
        ;[560, 1060].forEach((delay, index) => {
            window.setTimeout(() => {
                demo.building = index + 1
                haptic(8)
                render(true)
            }, delay)
        })
        window.setTimeout(() => {
            demo.building = -1
            demo.brief = true
            freshList = true
            render(true)
        }, 1620)
    }
    if (action === 'edit-brief') {
        if (state.completed.has(id)) return
        state.demo.gather.brief = false
        render(true)
    }

    if (action === 'complete') {
        if (!firstStepDone(id)) return
        if (id === 'cooklist') itemsFor(id).forEach((item, index) => state.selectedItems[id].add(index))
        if (state.selectedItems[id].size !== itemsFor(id).length) return
        control.disabled = true
        control.textContent = products[id].busy
        window.setTimeout(() => (id === 'cooklist' ? finishDish(id) : completeMission(id)), 650)
    }
    if (action === 'claim') {
        if (!state.completed.has(id) || state.claimed.has(id)) return
        animateRewardClaim(control, id)
    }
    if (action === 'show-final') { state.screen = 'final'; render() }
    if (action === 'play-grand') {
        state.grand.stage = 'pick'
        render(true)
    }
    if (action === 'pick-box') {
        if (state.grand.stage !== 'pick') return
        state.grand.box = Number(control.dataset.value)
        state.grand.stage = 'opening'
        haptic(20)
        render(true)
        const chosen = app.querySelector('.prize-box.is-opening')
        window.setTimeout(() => {
            if (chosen) sendPointsToWallet(chosen, 100, () => {
                state.grand.stage = 'done'
                render(true)
            })
            else {
                state.points += 100
                state.grand.stage = 'done'
                render(true)
            }
        }, 700)
    }
    if (action === 'close-info') infoModal.hidden = true
})

document.addEventListener('pointerdown', (event) => {
    const track = event.target.closest('.swipe-control')
    if (!track) return
    const thumb = track.querySelector('.swipe-thumb')
    const max = Math.max(1, track.clientWidth - thumb.offsetWidth - 10)
    swipeGesture = { pointerId: event.pointerId, startX: event.clientX, max, thumb, track }
    track.setPointerCapture(event.pointerId)
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

    if (distance < 8 && window.innerWidth <= 620) {
        track.classList.remove('is-dragging')
        track.classList.add('is-complete')
        track.style.setProperty('--swipe-progress', '100%')
        track.style.setProperty('--swipe-ratio', '1')
        thumb.style.transform = `translateX(${max}px)`
        window.setTimeout(openNextProduct, 260)
        return
    }

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

Object.values(products).forEach((product) => loadVisual(product.visual))
render()

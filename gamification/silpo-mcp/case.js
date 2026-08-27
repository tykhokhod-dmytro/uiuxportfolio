const app = document.querySelector('#app')

const missions = {
    cooklist: {
        number: '01',
        rank: '1st place · Meal planner',
        name: 'Cooklist',
        icon: '🍝',
        color: '#ffd0b6',
        summary: 'A recipe-to-cart agent for decisions that usually start with “What should we eat?”',
        task: 'Build one complete dinner under UAH 500',
        reward: '+20 loyalty points',
        tools: ['food_restrictions', 'find_products_batch', 'cart.add'],
        question: 'What are you in the mood for?',
        choices: [
            ['🍝', 'Quick comfort', '25 min · for two'],
            ['🥗', 'Fresh & light', '20 min · for two'],
            ['🌶️', 'Something bold', '35 min · for two'],
            ['🥦', 'Plant powered', '30 min · for two']
        ],
        loadingTitle: 'Cooklist is building dinner',
        logs: ['Reading dietary preferences', 'Matching 8 ingredients in stock', 'Optimising the cart under UAH 500'],
        resultTitle: 'Creamy tomato pasta',
        resultMeta: '25 min · dinner for two',
        items: [
            ['🍝', 'Tagliatelle', '1 pack', 'UAH 79'],
            ['🍅', 'Cherry tomatoes', '300 g', 'UAH 99'],
            ['🧀', 'Parmesan', '150 g', 'UAH 145'],
            ['🌿', 'Fresh basil', '1 pack', 'UAH 45']
        ],
        total: 'UAH 368',
        resultAction: 'Add recipe to cart',
        surprise: ['10% off Italian food', 'Saved for your next shop']
    },
    restock: {
        number: '02',
        rank: '2nd place · Routine agent',
        name: 'Restock',
        icon: '🥛',
        color: '#9bd6ff',
        summary: 'A routine agent that drafts recurring essentials, then waits for human approval.',
        task: 'Save one weekly essentials cart',
        reward: 'Free delivery',
        tools: ['online_orders', 'favorites', 'promotions'],
        question: 'Which routine should Restock learn?',
        choices: [
            ['🥛', 'Breakfast basics', 'milk · eggs · bread'],
            ['☕', 'Coffee station', 'beans · milk · snacks'],
            ['🐈', 'Pet supplies', 'food · litter · treats'],
            ['🧼', 'Home basics', 'cleaning · paper goods']
        ],
        loadingTitle: 'Restock is finding your rhythm',
        logs: ['Reviewing the last 8 orders', 'Filtering unusually large purchases', 'Checking this week’s promotions'],
        resultTitle: 'Your weekly basics',
        resultMeta: 'Suggested every Saturday',
        items: [
            ['🥛', 'Milk 2.5%', '2 bottles', 'UAH 102'],
            ['🥚', 'Free-range eggs', '10 pcs', 'UAH 89'],
            ['🍞', 'Sourdough bread', '1 loaf', 'UAH 65'],
            ['☕', 'Coffee beans', '250 g', 'UAH 219']
        ],
        total: 'UAH 475',
        resultAction: 'Save this routine',
        surprise: ['Free delivery unlocked', 'Valid on your next online order']
    },
    gather: {
        number: '03',
        rank: '3rd place · Group planner',
        name: 'Gather',
        icon: '🧺',
        color: '#d4c9ff',
        summary: 'A group planner that turns different tastes and one budget into a shared cart.',
        task: 'Plan one picnic for four people',
        reward: '+40 loyalty points',
        tools: ['family', 'product_sets', 'find_products_batch'],
        question: 'What are you getting together for?',
        choices: [
            ['🧺', 'Picnic', '4 people · UAH 900'],
            ['🎂', 'Birthday', '6 people · UAH 1,500'],
            ['🍿', 'Movie night', '4 people · UAH 700'],
            ['🔥', 'Barbecue', '6 people · UAH 1,800']
        ],
        loadingTitle: 'Gather is planning for everyone',
        logs: ['Checking group preferences', 'Balancing portions and budget', 'Finding easy-to-share alternatives'],
        resultTitle: 'Park picnic for four',
        resultMeta: '12 items · vegetarian-friendly',
        items: [
            ['🥖', 'Baguettes', '2 pcs', 'UAH 78'],
            ['🧀', 'Cheese selection', '1 set', 'UAH 289'],
            ['🍇', 'Seedless grapes', '500 g', 'UAH 119'],
            ['🥤', 'Craft lemonade', '4 bottles', 'UAH 196']
        ],
        total: 'UAH 682',
        resultAction: 'Add picnic to cart',
        surprise: ['+15 extra loyalty points', 'A little bonus for the whole group']
    }
}

const state = {
    view: 'hub',
    selected: null,
    choice: 0,
    completed: new Set(),
    surpriseOpen: false
}

function progressMarkup() {
    const count = state.completed.size
    return `
        <div class="app-progress-card">
            <div class="app-progress-head"><span>Your progress</span><strong>${count}/3</strong></div>
            <div class="app-progress" aria-label="${count} of 3 missions completed">
                ${Object.keys(missions).map((key) => `<i class="${state.completed.has(key) ? 'done' : ''}"></i>`).join('')}
            </div>
        </div>`
}

function hubScreen() {
    const allDone = state.completed.size === 3
    return `
        <section class="app-screen">
            <div class="app-top"><span class="app-brand">SILPO</span><span class="app-pill">AI Factory</span></div>
            <p class="app-eyebrow">MCP Quest · Winners edition</p>
            <h2 class="app-title">Meet three agents.<br>Make shopping lighter.</h2>
            <p class="app-copy">Try each winning product in one short mission and unlock the grand prize.</p>
            ${progressMarkup()}
            <div class="mission-list">
                ${Object.entries(missions).map(([key, mission]) => `
                    <button class="mission-card ${state.completed.has(key) ? 'completed' : ''}" style="--mission-color:${mission.color}" data-action="open-mission" data-id="${key}">
                        <span class="mission-icon">${state.completed.has(key) ? '✓' : mission.icon}</span>
                        <span><b>${mission.number} · ${mission.name}</b><small>${mission.task}</small></span>
                        <span>→</span>
                    </button>`).join('')}
            </div>
            <div class="grand-card">
                <small>${allDone ? 'Grand prize unlocked' : 'Complete all three'}</small>
                <b>${allDone ? 'Your full MCP Quest reward is ready.' : '100 points + 3 surprise packs'}</b>
                ${allDone ? '<button class="app-button app-button--lime" data-action="claim-grand">Claim the grand prize →</button>' : ''}
            </div>
        </section>`
}

function detailScreen(mission) {
    return `
        <section class="app-screen" style="--mission-color:${mission.color}">
            <div class="app-top">
                <button class="app-back" data-action="go-hub" aria-label="Back to missions">←</button>
                <span class="app-pill">${state.completed.has(state.selected) ? 'Completed' : mission.reward}</span>
            </div>
            <div class="detail-hero">${mission.icon}</div>
            <p class="detail-rank">${mission.rank}</p>
            <h2 class="detail-title">${mission.name}</h2>
            <p class="detail-copy">${mission.summary}</p>
            <div class="task-card">
                <small>Your mission</small>
                <b>${mission.task}</b>
                <div class="tool-chips">${mission.tools.map((tool) => `<span>${tool}</span>`).join('')}</div>
            </div>
            <button class="app-button" data-action="configure">${state.completed.has(state.selected) ? 'Try again' : 'Start mission'} →</button>
        </section>`
}

function configureScreen(mission) {
    return `
        <section class="app-screen" style="--mission-color:${mission.color}">
            <div class="app-top">
                <button class="app-back" data-action="open-current" aria-label="Back to product">←</button>
                <span class="app-pill">${mission.name}</span>
            </div>
            <p class="app-eyebrow">Set the brief</p>
            <h2 class="app-title">${mission.question}</h2>
            <p class="app-copy">Pick one starting point. The agent will handle the product-level work.</p>
            <div class="choice-grid">
                ${mission.choices.map((choice, index) => `
                    <button class="choice ${state.choice === index ? 'selected' : ''}" data-action="choose" data-index="${index}">
                        <span>${choice[0]}</span>${choice[1]}<small>${choice[2]}</small>
                    </button>`).join('')}
            </div>
            <div class="task-card">
                <small>Safety checkpoint</small>
                <b>Nothing is ordered until you review and confirm the cart.</b>
            </div>
            <button class="app-button" data-action="run-agent">Run ${mission.name} →</button>
        </section>`
}

function loadingScreen(mission) {
    return `
        <section class="app-screen" style="--mission-color:${mission.color}">
            <div class="app-top"><span class="app-brand">SILPO</span><span class="app-pill">MCP connected</span></div>
            <div class="agent-card">
                <div class="agent-orb">✦</div>
                <h3>${mission.loadingTitle}</h3>
                <div class="agent-log">${mission.logs.map((log, index) => `<span style="opacity:${1 - index * .2}">✓ ${log}</span>`).join('')}</div>
            </div>
            <p class="app-copy" style="text-align:center;margin-top:22px">A real product would show live MCP tool calls and ask before any action that changes the cart.</p>
        </section>`
}

function resultScreen(mission) {
    return `
        <section class="app-screen" style="--mission-color:${mission.color}">
            <div class="app-top"><button class="app-back" data-action="configure" aria-label="Change brief">←</button><span class="app-pill">Draft ready</span></div>
            <p class="app-eyebrow">Agent result</p>
            <h2 class="app-title">${mission.resultTitle}</h2>
            <p class="app-copy">${mission.resultMeta}. Review every item before it reaches your cart.</p>
            <div class="basket">
                <div class="basket-head"><span>Suggested cart</span><span>${mission.items.length} items</span></div>
                ${mission.items.map((item) => `
                    <div class="basket-row"><span>${item[0]}</span><span><b>${item[1]}</b><small>${item[2]}</small></span><strong>${item[3]}</strong></div>`).join('')}
                <div class="basket-total"><span>Estimated total</span><strong>${mission.total}</strong></div>
            </div>
            <button class="app-button" data-action="complete">${mission.resultAction} →</button>
            <button class="app-button app-button--plain" data-action="configure">Change the brief</button>
        </section>`
}

function rewardScreen(mission) {
    if (!state.surpriseOpen) {
        return `
            <section class="reward-screen" style="--mission-color:${mission.color}">
                <div class="reward-burst">✓</div>
                <p class="app-eyebrow">Mission complete</p>
                <h2>First value<br>delivered.</h2>
                <p>You used ${mission.name} for a real shopping task — not just a demo tour.</p>
                <span class="reward-chip">Guaranteed: ${mission.reward}</span>
                <p><strong>One more thing:</strong> pick a surprise pack.</p>
                <div class="packs" aria-label="Choose a surprise pack">
                    <button class="pack" data-action="open-pack" aria-label="Open orange pack">?</button>
                    <button class="pack" data-action="open-pack" aria-label="Open lime pack">?</button>
                    <button class="pack" data-action="open-pack" aria-label="Open blue pack">?</button>
                </div>
            </section>`
    }

    return `
        <section class="reward-screen" style="--mission-color:${mission.color}">
            <div class="reward-burst">🎁</div>
            <p class="app-eyebrow">Surprise unlocked</p>
            <div class="surprise"><strong>${mission.surprise[0]}</strong><span>${mission.surprise[1]}</span></div>
            ${progressMarkup()}
            <button class="app-button" data-action="go-hub">Continue to the next mission →</button>
        </section>`
}

function finalScreen() {
    return `
        <section class="final-prize">
            <div>
                <div class="final-prize-visual">🏆</div>
                <p class="app-eyebrow" style="color:#e8fa54">MCP Quest · 3/3</p>
                <h2>All three winners,<br>now part of your toolkit.</h2>
                <p>You earned 100 loyalty points and three additional surprise packs.</p>
                <button class="app-button" data-action="reset">Play the prototype again</button>
            </div>
        </section>`
}

function render() {
    const mission = state.selected ? missions[state.selected] : null
    const views = {
        hub: () => hubScreen(),
        detail: () => detailScreen(mission),
        configure: () => configureScreen(mission),
        loading: () => loadingScreen(mission),
        result: () => resultScreen(mission),
        reward: () => rewardScreen(mission),
        final: () => finalScreen()
    }

    app.innerHTML = views[state.view]()
    app.scrollTop = 0
}

app.addEventListener('click', (event) => {
    const control = event.target.closest('[data-action]')
    if (!control) return

    const action = control.dataset.action

    if (action === 'open-mission') {
        state.selected = control.dataset.id
        state.choice = 0
        state.view = 'detail'
    } else if (action === 'go-hub') {
        state.view = 'hub'
        state.surpriseOpen = false
    } else if (action === 'open-current') {
        state.view = 'detail'
    } else if (action === 'configure') {
        state.view = 'configure'
    } else if (action === 'choose') {
        state.choice = Number(control.dataset.index)
    } else if (action === 'run-agent') {
        state.view = 'loading'
        render()
        window.setTimeout(() => {
            state.view = 'result'
            render()
        }, 1500)
        return
    } else if (action === 'complete') {
        state.completed.add(state.selected)
        state.surpriseOpen = false
        state.view = 'reward'
    } else if (action === 'open-pack') {
        state.surpriseOpen = true
    } else if (action === 'claim-grand') {
        state.view = 'final'
    } else if (action === 'reset') {
        state.completed.clear()
        state.selected = null
        state.surpriseOpen = false
        state.view = 'hub'
    }

    render()
})

render()

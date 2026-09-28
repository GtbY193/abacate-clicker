"use strict";

/* ==========================================
   ABACATE CLICKER
========================================== */

const SAVE_KEY = "abacateClickerSave_v1";

/* ==========================================
   CONSTRUÇÕES
========================================== */

const buildings = [
    {
        id: "semente",
        name: "Semente de Abacate",
        icon: "🌱",
        baseCost: 15,
        baseCps: 0.1,
        description: "Uma pequena semente que produz abacates."
    },
    {
        id: "vaso",
        name: "Vaso",
        icon: "🪴",
        baseCost: 100,
        baseCps: 0.7,
        description: "Cultive seu próprio abacate."
    },
    {
        id: "horta",
        name: "Horta",
        icon: "🌿",
        baseCost: 500,
        baseCps: 3,
        description: "Uma horta cheia de abacates."
    },
    {
        id: "fazenda",
        name: "Fazenda",
        icon: "🚜",
        baseCost: 2500,
        baseCps: 12,
        description: "Produção agrícola em grande escala."
    },
    {
        id: "pomar",
        name: "Pomar",
        icon: "🌳",
        baseCost: 10000,
        baseCps: 45,
        description: "Centenas de árvores produzindo."
    },
    {
        id: "estufa",
        name: "Estufa",
        icon: "🏡",
        baseCost: 50000,
        baseCps: 160,
        description: "Abacates crescendo o ano inteiro."
    },
    {
        id: "industria",
        name: "Indústria",
        icon: "🏭",
        baseCost: 250000,
        baseCps: 550,
        description: "Produção industrial de abacates."
    },
    {
        id: "laboratorio",
        name: "Laboratório",
        icon: "🧪",
        baseCost: 1200000,
        baseCps: 1800,
        description: "Pesquisas avançadas sobre abacates."
    },
    {
        id: "fazenda_robotica",
        name: "Fazenda Robótica",
        icon: "🤖",
        baseCost: 6000000,
        baseCps: 6000,
        description: "Robôs cuidam de cada árvore."
    },
    {
        id: "cidade",
        name: "Cidade do Abacate",
        icon: "🏙️",
        baseCost: 30000000,
        baseCps: 20000,
        description: "Uma cidade inteira dedicada ao abacate."
    },
    {
        id: "usina",
        name: "Usina de Abacates",
        icon: "⚡",
        baseCost: 150000000,
        baseCps: 70000,
        description: "Energia suficiente para produzir milhões."
    },
    {
        id: "colonia",
        name: "Colônia Espacial",
        icon: "🚀",
        baseCost: 750000000,
        baseCps: 250000,
        description: "Abacates cultivados no espaço."
    },
    {
        id: "planeta",
        name: "Planeta Abacate",
        icon: "🪐",
        baseCost: 4000000000,
        baseCps: 900000,
        description: "Um planeta completamente verde."
    },
    {
        id: "dimensao",
        name: "Dimensão Abacate",
        icon: "🌀",
        baseCost: 25000000000,
        baseCps: 3500000,
        description: "Uma dimensão onde tudo é abacate."
    },
    {
        id: "universo",
        name: "Universo Abacate",
        icon: "🌌",
        baseCost: 150000000000,
        baseCps: 15000000,
        description: "O poder máximo do abacate."
    }
];

/* ==========================================
   UPGRADES
========================================== */

const upgrades = [
    {
        id: "dedo_verde",
        name: "Dedo Verde",
        icon: "☝️",
        cost: 250,
        description: "+1 abacate por clique.",
        type: "click",
        value: 1
    },
    {
        id: "luvas",
        name: "Luvas de Agricultor",
        icon: "🧤",
        cost: 2500,
        description: "+5 abacates por clique.",
        type: "click",
        value: 5
    },
    {
        id: "super_clique",
        name: "Super Clique",
        icon: "💥",
        cost: 25000,
        description: "Multiplica o poder dos cliques por 2.",
        type: "clickMultiplier",
        value: 2
    },
    {
        id: "adubo",
        name: "Adubo Especial",
        icon: "💩",
        cost: 10000,
        description: "Toda produção automática recebe +20%.",
        type: "cpsMultiplier",
        value: 1.2
    },
    {
        id: "irrigacao",
        name: "Irrigação Automática",
        icon: "💧",
        cost: 100000,
        description: "Toda produção automática recebe +50%.",
        type: "cpsMultiplier",
        value: 1.5
    },
    {
        id: "genetica",
        name: "Genética Avançada",
        icon: "🧬",
        cost: 1000000,
        description: "Duplica toda produção automática.",
        type: "cpsMultiplier",
        value: 2
    },
    {
        id: "mega_clique",
        name: "Mega Clique",
        icon: "⚡",
        cost: 5000000,
        description: "Multiplica os cliques por 5.",
        type: "clickMultiplier",
        value: 5
    },
    {
        id: "abacate_dourado",
        name: "Abacate Dourado",
        icon: "✨",
        cost: 50000000,
        description: "Multiplica toda produção por 3.",
        type: "globalMultiplier",
        value: 3
    }
];

/* ==========================================
   ESTADO DO JOGO
========================================== */

let game = {
    avocados: 0,

    totalAvocados: 0,

    lifetimeAvocados: 0,

    clicks: 0,

    prestige: 0,

    level: 1,

    clickPower: 1,

    buildings: {},

    purchasedUpgrades: [],

    lastSave: Date.now()
};

/* ==========================================
   INICIALIZAÇÃO
========================================== */

function init() {
    loadGame();

    buildings.forEach(building => {
        if (game.buildings[building.id] === undefined) {
            game.buildings[building.id] = 0;
        }
    });

    renderBuildings();
    renderUpgrades();
    updateUI();

    setInterval(gameTick, 100);

    setInterval(autoSave, 10000);

    setupEvents();

    console.log("🥑 Abacate Clicker iniciado!");
}

/* ==========================================
   EVENTOS
========================================== */

function setupEvents() {
    document
        .getElementById("avocado")
        .addEventListener("click", clickAvocado);

    document
        .getElementById("saveBtn")
        .addEventListener("click", () => {
            saveGame();
            showSaveStatus("Salvo manualmente!");
        });

    document
        .getElementById("resetBtn")
        .addEventListener("click", resetGame);

    document
        .getElementById("rebirthBtn")
        .addEventListener("click", rebirth);

    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            switchTab(tab.dataset.tab);
        });
    });
}

/* ==========================================
   CLIQUE
========================================== */

function clickAvocado() {
    let amount = getClickPower();

    game.avocados += amount;
    game.totalAvocados += amount;
    game.lifetimeAvocados += amount;

    game.clicks++;

    checkLevel();

    showFloatingNumber(amount);

    updateUI();
}

/* ==========================================
   PODER DO CLIQUE
========================================== */

function getClickPower() {
    let power = game.clickPower;

    upgrades.forEach(upgrade => {
        if (!game.purchasedUpgrades.includes(upgrade.id)) {
            return;
        }

        if (upgrade.type === "click") {
            power += upgrade.value;
        }
    });

    upgrades.forEach(upgrade => {
        if (!game.purchasedUpgrades.includes(upgrade.id)) {
            return;
        }

        if (upgrade.type === "clickMultiplier") {
            power *= upgrade.value;
        }
    });

    power *= getPrestigeMultiplier();

    const global = getGlobalMultiplier();

    power *= global;

    return Math.max(1, power);
}

/* ==========================================
   CPS
========================================== */

function getBaseCps() {
    return buildings.reduce((total, building) => {
        const amount = game.buildings[building.id] || 0;

        return total + amount * building.baseCps;
    }, 0);
}

function getCps() {
    let cps = getBaseCps();

    upgrades.forEach(upgrade => {
        if (
            game.purchasedUpgrades.includes(upgrade.id) &&
            upgrade.type === "cpsMultiplier"
        ) {
            cps *= upgrade.value;
        }
    });

    cps *= getGlobalMultiplier();

    cps *= getPrestigeMultiplier();

    return cps;
}

/* ==========================================
   MULTIPLICADORES
========================================== */

function getPrestigeMultiplier() {
    return 1 + game.prestige * 0.10;
}

function getGlobalMultiplier() {
    let multiplier = 1;

    upgrades.forEach(upgrade => {
        if (
            game.purchasedUpgrades.includes(upgrade.id) &&
            upgrade.type === "globalMultiplier"
        ) {
            multiplier *= upgrade.value;
        }
    });

    return multiplier;
}

/* ==========================================
   TICK DO JOGO
========================================== */

let lastTick = Date.now();

function gameTick() {
    const now = Date.now();

    const elapsed = (now - lastTick) / 1000;

    lastTick = now;

    const cps = getCps();

    const generated = cps * elapsed;

    if (generated > 0) {
        game.avocados += generated;
        game.totalAvocados += generated;
        game.lifetimeAvocados += generated;
    }

    checkLevel();
    updateUI();
}

/* ==========================================
   NÍVEIS
========================================== */

function getLevelRequirement(level) {
    return Math.floor(
        100 * Math.pow(2.15, level - 1)
    );
}

function calculateLevel() {
    let level = 1;

    for (let i = 1; i <= 20; i++) {
        if (
            game.lifetimeAvocados >=
            getLevelRequirement(i)
        ) {
            level = i;
        }
    }

    return Math.min(20, level);
}

function checkLevel() {
    const oldLevel = game.level;

    game.level = calculateLevel();

    if (game.level > oldLevel) {
        levelUpEffect();
    }
}

function levelUpEffect() {
    const element = document.getElementById("level");

    element.animate(
        [
            {
                transform: "scale(1)",
                color: "#274e13"
            },
            {
                transform: "scale(1.6)",
                color: "#d28a00"
            },
            {
                transform: "scale(1)",
                color: "#274e13"
            }
        ],
        {
            duration: 600
        }
    );
}

/* ==========================================
   CONSTRUÇÕES
========================================== */

function getBuildingCost(building) {
    const amount = game.buildings[building.id] || 0;

    return Math.floor(
        building.baseCost *
        Math.pow(1.15, amount)
    );
}

function buyBuilding(id) {
    const building = buildings.find(
        b => b.id === id
    );

    if (!building) return;

    const cost = getBuildingCost(building);

    if (game.avocados < cost) {
        return;
    }

    game.avocados -= cost;

    game.buildings[id]++;

    renderBuildings();
    updateUI();
}

/* ==========================================
   UPGRADES
========================================== */

function buyUpgrade(id) {
    const upgrade = upgrades.find(
        u => u.id === id
    );

    if (!upgrade) return;

    if (
        game.purchasedUpgrades.includes(id)
    ) {
        return;
    }

    if (game.avocados < upgrade.cost) {
        return;
    }

    game.avocados -= upgrade.cost;

    game.purchasedUpgrades.push(id);

    renderUpgrades();
    updateUI();
}

/* ==========================================
   RENDER CONSTRUÇÕES
========================================== */

function renderBuildings() {
    const container =
        document.getElementById("buildings");

    container.innerHTML = "";

    buildings.forEach(building => {
        const amount =
            game.buildings[building.id] || 0;

        const cost =
            getBuildingCost(building);

        const div =
            document.createElement("div");

        div.className = "building";

        div.innerHTML = `
            <div class="building-icon">
                ${building.icon}
            </div>

            <div class="building-info">
                <h3>
                    ${building.name}
                    <span class="building-count">
                        x${amount}
                    </span>
                </h3>

                <p>
                    ${building.description}
                </p>

                <p>
                    +${formatNumber(building.baseCps)}
                    CPS cada
                </p>
            </div>

            <div class="building-buy">
                <span class="buy-price">
                    🥑 ${formatNumber(cost)}
                </span>

                <button class="buy-button">
                    Comprar
                </button>
            </div>
        `;

        const button =
            div.querySelector(".buy-button");

        button.addEventListener(
            "click",
            event => {
                event.stopPropagation();
                buyBuilding(building.id);
            }
        );

        div.addEventListener(
            "click",
            () => buyBuilding(building.id)
        );

        if (game.avocados < cost) {
            div.classList.add("disabled");
        }

        container.appendChild(div);
    });
}

/* ==========================================
   RENDER UPGRADES
========================================== */

function renderUpgrades() {
    const container =
        document.getElementById("upgrades");

    container.innerHTML = "";

    upgrades.forEach(upgrade => {
        const bought =
            game.purchasedUpgrades.includes(
                upgrade.id
            );

        const div =
            document.createElement("div");

        div.className = "upgrade";

        div.innerHTML = `
            <div>
                <h3>
                    ${upgrade.icon}
                    ${upgrade.name}
                </h3>

                <p>
                    ${upgrade.description}
                </p>
            </div>

            <button ${bought ? "disabled" : ""}>
                ${
                    bought
                        ? "Comprado ✓"
                        : "🥑 " +
                          formatNumber(upgrade.cost)
                }
            </button>
        `;

        if (!bought) {
            div.querySelector("button")
                .addEventListener(
                    "click",
                    () => buyUpgrade(upgrade.id)
                );
        }

        container.appendChild(div);
    });
}

/* ==========================================
   INTERFACE
========================================== */

function updateUI() {
    document.getElementById(
        "avocadoCount"
    ).textContent =
        formatNumber(game.avocados);

    document.getElementById(
        "cps"
    ).textContent =
        formatNumber(getCps());

    document.getElementById(
        "clickPower"
    ).textContent =
        formatNumber(getClickPower());

    document.getElementById(
        "level"
    ).textContent =
        game.level;

    document.getElementById(
        "prestige"
    ).textContent =
        formatNumber(game.prestige);

    document.getElementById(
        "prestigeBonus"
    ).textContent =
        "+" +
        Math.round(
            game.prestige * 10
        ) +
        "%";

    updateLevelBar();

    updateRebirthButton();
}

/* ==========================================
   BARRA DE NÍVEL
========================================== */

function updateLevelBar() {
    if (game.level >= 20) {
        document.getElementById(
            "levelProgressText"
        ).textContent =
            "NÍVEL MÁXIMO";

        document.getElementById(
            "levelProgress"
        ).style.width = "100%";

        return;
    }

    const currentRequirement =
        getLevelRequirement(game.level);

    const nextRequirement =
        getLevelRequirement(game.level + 1);

    const progress =
        Math.max(
            0,
            Math.min(
                100,
                (
                    (
                        game.lifetimeAvocados -
                        currentRequirement
                    ) /
                    (
                        nextRequirement -
                        currentRequirement
                    )
                ) * 100
            )
        );

    document.getElementById(
        "levelProgress"
    ).style.width =
        progress + "%";

    document.getElementById(
        "levelProgressText"
    ).textContent =
        `${formatNumber(
            Math.max(
                0,
                game.lifetimeAvocados -
                currentRequirement
            )
        )} / ${formatNumber(
            nextRequirement -
            currentRequirement
        )}`;
}

/* ==========================================
   REBIRTH
========================================== */

const REBIRTH_REQUIREMENT = 1000000;

function getRebirthReward() {
    return Math.floor(
        Math.sqrt(
            game.avocados /
            REBIRTH_REQUIREMENT
        )
    );
}

function updateRebirthButton() {
    const button =
        document.getElementById(
            "rebirthBtn"
        );

    const reward =
        getRebirthReward();

    button.disabled =
        reward < 1;

    document.getElementById(
        "rebirthRequirement"
    ).textContent =
        reward >= 1
            ? `Você receberá +${reward} Prestígio`
            : `Requer ${formatNumber(
                REBIRTH_REQUIREMENT
            )} abacates`;
}

function rebirth() {
    const reward =
        getRebirthReward();

    if (reward < 1) {
        return;
    }

    const confirmed =
        confirm(
            `Fazer Rebirth?\n\n` +
            `Você receberá ${reward} Prestígio.\n` +
            `Seu progresso atual será reiniciado.\n\n` +
            `O bônus de Prestígio será permanente.`
        );

    if (!confirmed) return;

    game.avocados = 0;

    game.totalAvocados = 0;

    game.clicks = 0;

    game.level = 1;

    game.clickPower = 1;

    game.buildings = {};

    game.purchasedUpgrades = [];

    game.prestige += reward;

    buildings.forEach(
        building => {
            game.buildings[
                building.id
            ] = 0;
        }
    );

    saveGame();

    renderBuildings();
    renderUpgrades();
    updateUI();

    alert(
        `🔄 Rebirth realizado!\n\n` +
        `Você ganhou ${reward} Prestígio.\n` +
        `Bônus atual: +${game.prestige * 10}%`
    );
}

/* ==========================================
   NÚMEROS FLUTUANTES
========================================== */

function showFloatingNumber(amount) {
    const container =
        document.getElementById(
            "floatingNumbers"
        );

    const number =
        document.createElement("div");

    number.className =
        "floating-number";

    number.textContent =
        "+" + formatNumber(amount);

    number.style.left =
        (45 + Math.random() * 15) + "%";

    number.style.top =
        (40 + Math.random() * 15) + "%";

    container.appendChild(number);

    setTimeout(() => {
        number.remove();
    }, 1000);
}

/* ==========================================
   ABAS
========================================== */

function switchTab(tabName) {
    document.querySelectorAll(
        ".tab"
    ).forEach(tab => {
        tab.classList.toggle(
            "active",
            tab.dataset.tab === tabName
        );
    });

    document.querySelectorAll(
        ".shop-content"
    ).forEach(content => {
        content.classList.toggle(
            "active",
            content.id === tabName
        );
    });
}

/* ==========================================
   SALVAMENTO
========================================== */

function saveGame() {
    game.lastSave = Date.now();

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(game)
    );

    showSaveStatus("Salvo agora");
}

function autoSave() {
    saveGame();
}

function loadGame() {
    try {
        const saved =
            localStorage.getItem(
                SAVE_KEY
            );

        if (!saved) return;

        const parsed =
            JSON.parse(saved);

        game = {
            ...game,
            ...parsed
        };

        if (!Array.isArray(
            game.purchasedUpgrades
        )) {
            game.purchasedUpgrades = [];
        }

        if (!game.buildings) {
            game.buildings = {};
        }

    } catch (error) {
        console.error(
            "Erro ao carregar save:",
            error
        );
    }
}

/* ==========================================
   RESET
========================================== */

function resetGame() {
    const confirmed =
        confirm(
            "Tem certeza que deseja apagar todo o progresso?\n\n" +
            "Esta ação não pode ser desfeita."
        );

    if (!confirmed) return;

    localStorage.removeItem(
        SAVE_KEY
    );

    location.reload();
}

/* ==========================================
   STATUS DO SAVE
========================================== */

function showSaveStatus(text) {
    const status =
        document.getElementById(
            "saveStatus"
        );

    status.textContent =
        text;

    setTimeout(() => {
        status.textContent =
            "Salvamento automático ativado";
    }, 2500);
}

/* ==========================================
   FORMATAÇÃO
========================================== */

function formatNumber(number) {
    if (!Number.isFinite(number)) {
        return "0";
    }

    if (number < 1000) {
        return Number(
            number.toFixed(1)
        ).toString();
    }

    const suffixes = [
        "",
        "K",
        "M",
        "B",
        "T",
        "Qa",
        "Qi",
        "Sx",
        "Sp",
        "Oc",
        "No",
        "Dc"
    ];

    const tier =
        Math.floor(
            Math.log10(number) / 3
        );

    if (tier >= suffixes.length) {
        return number.toExponential(2);
    }

    const value =
        number /
        Math.pow(1000, tier);

    return value.toFixed(
        value >= 100 ? 0 :
        value >= 10 ? 1 :
        2
    ) + suffixes[tier];
}

/* ==========================================
   VISIBILIDADE DA PÁGINA
========================================== */

document.addEventListener(
    "visibilitychange",
    () => {
        if (
            document.visibilityState ===
            "hidden"
        ) {
            saveGame();
        }
    }
);

/* ==========================================
   INICIAR
========================================== */

init();

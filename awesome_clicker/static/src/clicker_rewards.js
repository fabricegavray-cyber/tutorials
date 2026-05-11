/** @odoo-module **/

export const rewards = [
    {
        description: "Bonus 100 clics !",
        apply(clicker) {
            clicker.increment(100);
        },
        maxLevel: 1,
    },
    {
        description: "Bonus 1000 clics !",
        apply(clicker) {
            clicker.increment(1000);
        },
        minLevel: 1,
        maxLevel: 3,
    },
    {
        description: "Un ClickBot gratuit !",
        apply(clicker) {
            clicker.clickBots += 1;
        },
        minLevel: 1,
    },
];

// Choisit un élément aléatoire dans un tableau
function choose(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Retourne une récompense aléatoire qui correspond au niveau actuel
export function getReward(level) {
    const available = rewards.filter((r) => {
        const minOk = r.minLevel === undefined || level >= r.minLevel;
        const maxOk = r.maxLevel === undefined || level < r.maxLevel;
        return minOk && maxOk;
    });

    if (!available.length) return null;
    return choose(available);
}

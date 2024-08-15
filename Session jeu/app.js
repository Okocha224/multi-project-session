class Entity {
    constructor(name, hp, skills) {
        this.name = name;
        this.hp = hp;
        this.skills = skills;
    }

    chooseSkill() {
        return this.skills[Math.floor(Math.random() * this.skills.length)];
    }

    receiveDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
    }
}

const typeEffectiveness = {
    fire: { strongAgainst: 'grass', weakAgainst: 'water' },
    water: { strongAgainst: 'fire', weakAgainst: 'grass' },
    grass: { strongAgainst: 'water', weakAgainst: 'fire' }
};

class Skill {
    constructor(name, type, power) {
        this.name = name;
        this.type = type;
        this.power = power;
    }

    calculateDamage(opponentType) {
        let damage = this.power;
        if (typeEffectiveness[this.type].strongAgainst === opponentType) {
            damage *= 2;
        } else if (typeEffectiveness[this.type].weakAgainst === opponentType) {
            damage /= 2;
        }
        return damage;
    }
}

// Initialisation des entités
const player = new Entity('Player', 100, [
    new Skill('Fire Blast', 'fire', 25),
    new Skill('Water Pulse', 'water', 25),
    new Skill('Leaf Blade', 'grass', 25)
]);

const opponent = new Entity('Opponent', 100, [
    new Skill('Fire Blast', 'fire', 25),
    new Skill('Water Pulse', 'water', 25),
    new Skill('Leaf Blade', 'grass', 25)
]);

function playerAttack(skillType) {
    const playerSkill = player.skills.find(skill => skill.type === skillType);
    const opponentSkill = opponent.chooseSkill();

    const playerDamage = playerSkill.calculateDamage(opponentSkill.type);
    const opponentDamage = opponentSkill.calculateDamage(playerSkill.type);

    opponent.receiveDamage(playerDamage);
    player.receiveDamage(opponentDamage);

    updateBattleInfo(playerDamage, opponentDamage);
    checkGameOver();
}

function updateBattleInfo(playerDamage, opponentDamage) {
    document.getElementById('player-hp').innerText = player.hp;
    document.getElementById('opponent-hp').innerText = opponent.hp;

    const log = document.getElementById('log');
    log.innerHTML += `<li>${player.name} a utilisé ${playerDamage} de dégâts.</li>`;
    log.innerHTML += `<li>${opponent.name} a utilisé ${opponentDamage} de dégâts.</li>`;
}

function checkGameOver() {
    if (player.hp <= 0) {
        alert('Vous avez perdu !');
        resetGame();
    } else if (opponent.hp <= 0) {
        alert('Vous avez gagné !');
        resetGame();
    }
}

function resetGame() {
    player.hp = 100;
    opponent.hp = 100;
    document.getElementById('player-hp').innerText = player.hp;
    document.getElementById('opponent-hp').innerText = opponent.hp;
    document.getElementById('log').innerHTML = '';
}

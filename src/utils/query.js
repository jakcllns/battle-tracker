import { initializeMonster } from "./Monster/monster"

const addMonster = (monster = initializeMonster()) => {
    const query = `
        addMonster(monster: {
            id_name: "${monster.id_name}"
            name: "${monster.name}"
            size: "${monster.size}"
            race: "${monster.race}"
            alignment: "${monster.alignment}"
            armorClass: ${monster.armorClass}
            armorType: "${monster.armorType}"
            hitPoints: ${monster.hitPoints}
            hitDie: "${monster.hitDie}"
            movementSpeed: [${monster.movementSpeed.map(e => `"${e}"`).join(",")}]
            str: ${monster.str}
            dex: ${monster.dex}
            con: ${monster.con}
            int: ${monster.int}
            wis: ${monster.wis}
            cha: ${monster.cha}
            savingThrows: [${monster.savingThrows.map(e => {
                return `{savingThrowType: "${e.savingThrowType}", modifier: ${e.modifier}`
            }).join(",")}]
            skills: [${monster.skills.map(e => {
                return `{skillType: "${e.skillType}", modifier: ${e.modifier}}`
            }).join(",")}]
            damageResistances: [${monster.damageResistances.map(e => `"${e}"`).join(",")}]
            legendaryResistances: [${monster.legendaryResistances.map(e => `"${e}"`).join(",")}]
            damageImmunities: [${monster.damageImmunities.map(e => `"${e}"`).join(",")}]
            conditionImmunties: [${monster.conditionImmunities.map(e => `"${e}"`).join(",")}]
            damageVulnerabilities: [${monster.damageVulnerabilites.map(e => `"${e}"`).join(",")}]
            senses: [${monster.senses.map(e => `"${e}"`).join(",")}]
            languages: [${monster.languages.map(e => `"${e}"`).join(",")}]
            challenge: "${monster.challenge}"
            experience: ${monster.experience}
            abilities: [${monster.abilities.map(e => {
                return `{name: "${e.name}", description: "${e.description}", isAction: ${e.isAction}}`
            }).join(",")}]
            actions: [${monster.actions.map(e => {
                return `{
                    name: "${e.name}", 
                    attackType: "${e.attackType}", 
                    modifier: ${e.modifier}, 
                    reach: "${e.reach}",
                    targets: ${e.targets},
                    hits: [${e.hits.map(h => `{dieType: "${h.dieType}", damageType: "${h.damageType}"}`).join(",")}]
                    description: "${e.description}"
                    }`
            }).join(",")}]
            ${/* 
            Working on adding in legendaryDescription, legendaryActions, lairDescription, lairActions, 
            regionalDescription, regionalEffects, mythicDescription, mythicActions
            */}
        })
    `
}
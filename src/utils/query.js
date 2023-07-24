import { initializeMonster } from "./Monster/monster"

const MONSTER_API = 'https://localhost:4000/graphql'

export const addMonster = async (monster = initializeMonster()) => {
    const query = `mutation {
        addMonster(monster: {
            id_name: "${monster.name.toLocaleLowerCase().replace(/\s/g,'_')}"
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
            conditionImmunities: [${monster.conditionImmunities.map(e => `"${e}"`).join(",")}]
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
            legendaryDescription: "${monster.legendaryDescription}"
            legendaryActions: [${monster.legendaryActions.map(e => {
                return `{name: "${e.name}", description: "${e.description}}`
            }).join(",")}]
            lairDescription: "${monster.lairDescription}"
            lairActions: [${monster.lairActions.map(e => {
                return `{name: "${e.name}", description: "${e.description}}`
            }).join(",")}]
            regionalDescription: "${monster.regionalDescription}"
            regionalEffects: [${monster.regionalEffects.map(e => {
                return `{name: "${e.name}", description: "${e.description}}`
            }).join(",")}]
            mythicDescription: "${monster.mythicDescription}"
            mythicActions: [${monster.mythicActions.map(e => {
                return `{name: "${e.name}", description: "${e.description}}`
            }).join(",")}]
        }) {
            message
            data {
                _id
                id_name
                name
            }
        }}
    `
    const result = fetch('https://localhost:4000/graphql', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: query}),
        cache: 'no-cache'
    })
    .then(res => res.json())
    .then(res => {
        if(res.errors){
            console.log("error")
            throw new Error(res.errors)
        }
        return res.data
    })
    .catch(err => console.error(JSON.stringify(err)))

    return result
}
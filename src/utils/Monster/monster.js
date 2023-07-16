

export const initializeMonster = () => {
    return (
        {
            "id_name": "",
            "name": "",
            "size": "",
            "race": "",
            "alignment": "",
            "armorClass": 0,
            "armorType": "",
            "hitPoints": 0,
            "hitDie": "",
            "movementSpeed": [],
            "str": 0,
            "dex": 0,
            "con": 0,
            "int": 0,
            "wis": 0,
            "cha": 0,
            "savingThrows": [],
            "skills": [],
            "damageResistances": [],
            "legendaryResistances": [],
            "damageImmunities": [],
            "conditionImmunities": [],
            "damageVulnerabilites": [],
            "senses": [],
            "languages": [],
            "challenge": "",
            "experience": 0,
            "abilities": [],
            "actions": [],
            "legendaryDescription": "",
            "legendaryActions": [],
            "lairActions": [],
            "regionalEffects": [],
            "regionalDescription": "",
            "mythicActions": [],
            "mythicDescription": ""
        }
    )    
}

export const createSavingThrow = (savingThrowType, modifier) => {
    if (typeof savingThrowType !== 'string' || typeof modifier !== 'number') {
        const error = new Error('Invalid input')
        throw error
    }

    return {
        savingThrowType: savingThrowType,
        modifier: modifier
    }
}

/**
 * 
 * @param {string} skillType 
 * @param {number} modifier 
 * @returns 
 */
export const createSkill = (skillType, modifier) => {
    if (typeof skillType !== 'string' || typeof modifier !== 'number') {
        const error = new Error('Invalid input')
        throw error
    }

    return {
        skillType: skillType,
        modifier: modifier
    }
}

export const createLegendaryResistance = (resistanceName, description) => {
    if (typeof resistanceName !== 'string' || typeof description !== 'string') {
        const error = new Error('Action Name and Description must be a string')
        throw error
    }

    return {
        name: resistanceName,
        description: description
    }
}

export const createAbilities = (abilityName, description, isAction = false) => {
    if (typeof abilityName !== 'string' || typeof description !== 'string') {
        const error = new Error('Invalid input')
        throw error
    }

    return ({
        name: abilityName,
        description: description,
        isAction: isAction
    })
}

export const createLegendaryAction = (actionName, description) => {
    if (typeof actionName !== 'string' || typeof description !== 'string') {
        const error = new Error('Action Name and Description must be a string')
        throw error
    }

    return {
        name: actionName,
        description: description
    }
}

/**
 * 
 * @param {string} actionName 
 * @param {string} attackType 
 * @param {number} modifier 
 * @param {string} reach 
 * @param {number} targets 
 * @param {[{dieType: string, damageType: string}]} hits 
 * @returns 
 */
export const createAction = (actionName, attackType, modifier, reach, targets, hits)  => {
    if(typeof actionName !== 'string' || typeof attackType !== 'string' || typeof reach !== 'string') {
        const error = new Error('Invalid input provided')
        throw error
    }

    if(!Array.isArray(hits)){
        const error = new Error('Invalid input provided')
        throw error
    }

    if(typeof modifier !== 'number' || typeof targets !== 'number') {
        const error = new Error('Invalid input provided')
        throw error
    }

    return ({
        "name": actionName,
        "attackType": attackType,
        "modifier": modifier,
        "reach": reach,
        "targets": targets,
        "hits": hits
    });
}


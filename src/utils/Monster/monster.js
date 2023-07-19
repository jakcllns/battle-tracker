export const ALIGNMENTS = [
    'Unaligned',
    'Lawful Good',
    'Lawful Neutral',
    'Lawful Evil',
    'Neutral Good',
    'True Neutral',
    'Neutral Evil',
    'Chaotic Good',
    'Chaotic Neutral',
    'Chaotic Evil'
]

export const DAMAGE_TYPES = [
    'acid',
    'bludgeoning',
    'cold',
    'fire',
    'force',
    'lightning',
    'necrotic',
    'piercing',
    'poison',
    'psychic',
    'radiant',
    'slashing',
    'thunder'
]

export const DAMAGE_RESISTANCES = [
    'acid',
    'cold',
    'fire',
    'force',
    'lightning',
    'necrotic',
    'poison',
    'psychic',
    'radiant',
    'thunder',
    '(bludgeoning, piercing, and slashing from nonmagical sources)'
]

export const CONDITIONS = [
    'blinded',
    'charmed',
    'deafened',
    'frightened',
    'grappled',
    'incapacitated',
    'invisible',
    'paralyzed',
    'petrified',
    'poisoned',
    'prone',
    'restrained',
    'stunned',
    'unconscious'
]

export const SAVING_THROWS = [
    'str',
    'dex',
    'con',
    'int',
    'wis',
    'cha'
]

export const LANGUAGES = [
    '-',
    'Common',
    'Dwarvish',
    'Elvish',
    'Giant',
    'Gnomish',
    'Goblin',
    'Hafling',
    'Orc',
    'Abyssal',
    'Celestial',
    'Draconic',
    'Deep Speech',
    'Infernal',
    'Primordial',
    'Sylvan',
    'Undercommon',
    'Telepathy'
]

export const SKILLS = [
    {
        skill: 'Athletics',
        ability: 'str'
    },
    {
        skill: 'Acrobatics',
        ability: 'dex'
    },
    {
        skill: 'Sleight of Hand',
        ability: 'dex'
    },
    {
        skill: 'Stealth',
        ability: 'dex'
    },
    {
        skill: 'Arcana',
        ability: 'int'
    },
    {
        skill: 'Histroy',
        ability: 'int'
    },
    {
        skill: 'Investigation',
        ability: 'int'
    },
    {
        skill: 'Nature',
        ability: 'int'
    },
    {
        skill: 'Religion',
        ability: 'int'
    },
    {
        skill: 'Animal Handling',
        ability: 'wis'
    },
    {
        skill: 'Insight',
        ability: 'wis'
    },
    {
        skill: 'Medicine',
        ability: 'wis'
    },
    {
        skill: 'Perception',
        ability: 'wis'
    },
    {
        skill: 'Survival',
        ability: 'wis'
    },
    {
        skill: 'Deception',
        ability: 'cha'
    },
    {
        skill: 'Intimidation',
        ability: 'cha'
    },
    {
        skill: 'Performance',
        ability: 'cha'
    },
    {
        skill: 'Persuasion',
        ability: 'cha'
    }
]

export const CREATURE_TYPES = [
    'Abberation',
    'Beast',
    'Celestial',
    'Construct',
    'Dragon',
    'Elemental',
    'Fey',
    'Fiend',
    'Giant',
    'Humanoid',
    'Monstrosity',
    'Ooze',
    'Plant',
    'Undead'
]

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
            "lairDescription": '',
            "lairActions": [],
            "regionalEffects": [],
            "regionalDescription": "",
            "mythicActions": [],
            "mythicDescription": ""
        }
    )    
}

/**
 * 
 * @param {string} savingThrowType 
 * @param {number} modifier 
 * @returns 
 */
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

/**
 * 
 * @param {string} resistanceName 
 * @param {string} description 
 * @returns 
 */
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

/**
 * 
 * @param {string} abilityName 
 * @param {string} description 
 * @param {boolean} isAction 
 * @returns 
 */
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

/**
 * 
 * @param {string} actionName 
 * @param {string} description 
 * @returns 
 */
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
 * @param {string} actionDescription
 * @returns 
 */
export const createAction = (actionName, attackType, modifier, reach, targets, hits, actionDescription)  => {
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
        "hits": hits,
        "description": actionDescription
    });
}

export const getModifier =  stat => {
    if(typeof stat !== 'number') {
        const error = new Error('argument provided is not a number')
        throw error
    }
    return Math.floor((stat-10)/2)
}
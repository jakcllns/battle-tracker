export const ALIGNMENTS = [
    'unaligned',
    'lawful good',
    'lawful neutral',
    'lawful evil',
    'neural good',
    'true neutral',
    'neutral evil',
    'chaotic good',
    'chaotic neutral',
    'chaotic evil'
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
    'common',
    'dwarvish',
    'elvish',
    'giant',
    'gnomish',
    'goblin',
    'hafling',
    'orc',
    'abyssal',
    'celestial',
    'draconic',
    'deep speech',
    'infernal',
    'primordial',
    'sylvan',
    'undercommon'
]

export const SKILLS = [
    {
        skill: 'athletics',
        ability: 'str'
    },
    {
        skill: 'acrobatics',
        ability: 'dex'
    },
    {
        skill: 'sleight of hand',
        ability: 'dex'
    },
    {
        skill: 'stealth',
        ability: 'dex'
    },
    {
        skill: 'arcana',
        ability: 'int'
    },
    {
        skill: 'histroy',
        ability: 'int'
    },
    {
        skill: 'investigation',
        ability: 'int'
    },
    {
        skill: 'nature',
        ability: 'int'
    },
    {
        skill: 'religion',
        ability: 'int'
    },
    {
        skill: 'animal handling',
        ability: 'wis'
    },
    {
        skill: 'insight',
        ability: 'wis'
    },
    {
        skill: 'medicine',
        ability: 'wis'
    },
    {
        skill: 'perception',
        ability: 'wis'
    },
    {
        skill: 'survival',
        ability: 'wis'
    },
    {
        skill: 'deception',
        ability: 'cha'
    },
    {
        skill: 'intimidation',
        ability: 'cha'
    },
    {
        skill: 'performance',
        ability: 'cha'
    },
    {
        skill: 'persuasion',
        ability: 'cha'
    }
]

export const CREATURE_TYPES = [
    'abberation',
    'beast',
    'celestial',
    'construct',
    'dragon',
    'elemental',
    'fey',
    'fiend',
    'giant',
    'humanoid',
    'monstrosity',
    'ooze',
    'plant',
    'undead'
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

export const Tarrasque = {
    "id_name": "tarrasque",
    "name": "Tarrasque",
    "size": "Gargantuan",
    "race": "Monstrosity (titan)",
    "alignment": "unaligned",
    "armorClass": "25",
    "armorType": "natural armor",
    "hitPoints": 677,
    "hitDie": "33d20+330",
    "movementSpeed": [
        "40 ft."
    ],
    "str": "30",
    "dex": "11",
    "con": "30",
    "int": "3",
    "wis": "11",
    "cha": "11",
    "savingThrows": [
        {
            "savingThrowType": "INT",
            "modifier": 5
        },
        {
            "savingThrowType": "WIS",
            "modifier": 9
        },
        {
            "savingThrowType": "CHA",
            "modifier": 9
        }
    ],
    "skills": [],
    "damageResistances": [],
    "legendaryResistances": [],
    "damageImmunities": [
        "Fire",
        "Poison",
        "(Bludgeoning, Piercing, and Slashing from Nonmagical Attacks)"
    ],
    "conditionImmunities": [
        "Charmed",
        "Frightened",
        "Paralyzed",
        "Poisoned"
    ],
    "damageVulnerabilites": [],
    "senses": [
        "Blindsight 120 ft.",
        "Passive Perception 10"
    ],
    "languages": [
        "--"
    ],
    "challenge": "30",
    "experience": 155000,
    "abilities": [
        {
            "name": "Legendary Resistance (3/Day)",
            "description": "If the tarrasque fails a saving throw, it can choose to succeed instead.",
            "isAction": false
        },
        {
            "name": "Magic Resistance",
            "description": "The tarrasque has advantage on saving throws against spells and other magical effects.",
            "isAction": false
        },
        {
            "name": "Reflective Carapace",
            "description": "Any time the tarrasque is targeted by a magic missile spell, a line spell, or a spell that requires a ranged attack roll, roll a d6. On a 1 to 5, the tarrasque is unaffected. On a 6, the tarrasque is unaffected, and the effect is reflected back at the caster as though it originated from the tarrasque, turning the caster into the target.",
            "isAction": false
        },
        {
            "name": "Siege Monster",
            "description": "The tarrasque deals double damage to objects and structures.",
            "isAction": false
        },
        {
            "name": "Multiattack",
            "description": "The tarrasque can use its Frightful Presence. It then makes five attacks: one with its bite, two with its claws, one with its horns, and one with its tail. It can use its Swallow instead of its bite.",
            "isAction": true
        },
        {
            "name": "Frightful Presence",
            "description": "Each creature of the tarrasque’s choice within 120 feet of it and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, with disadvantage if the tarrasque is within line of sight, ending the effect on itself on a success. If a creature’s saving throw is successful or the effect ends for it, the creature is immune to the tarrasque’s Frightful Presence for the next 24 hours.",
            "isAction": true
        },
        {
            "name": "Swallow",
            "description": "The tarrasque makes one bite attack against a Large or smaller creature it is grappling. If the attack hits, the target takes the bite’s damage, the target is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained, it has total cover against attacks and other effects outside the tarrasque, and it takes 56 (16d6) acid damage at the start of each of the tarrasque’s turns.\n\nIf the tarrasque takes 60 damage or more on a single turn from a creature inside it, the tarrasque must succeed on a DC 20 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the tarrasque. If the tarrasque dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 30 feet of movement, exiting prone.",
            "isAction": true
        }
    ],
    "actions": [
        {
            "name": "Bite",
            "attackType": "Melee Weapon Attack",
            "modifier": 19,
            "reach": "10 ft.",
            "targets": 1,
            "hits": [
                {
                    "dieType": "4d12+10",
                    "damageType": "piercing"
                }
            ],
            "description": "If the target is a creature, it is grappled (escape DC 20). Until this grapple ends, the target is restrained, and the tarrasque can’t bite another target."
        },
        {
            "name": "Claw",
            "attackType": "Melee Weapon Attack",
            "modifier": 19,
            "reach": "15 ft.",
            "targets": 1,
            "hits": [
                {
                    "dieType": "4d8+10",
                    "damageType": "slashing"
                }
            ],
            "description": ""
        },
        {
            "name": "Horns",
            "attackType": "Melee Weapon Attack",
            "modifier": 19,
            "reach": "10 ft.",
            "targets": 1,
            "hits": [
                {
                    "dieType": "4d10+10",
                    "damageType": "piercing"
                }
            ],
            "description": ""
        },
        {
            "name": "Tail",
            "attackType": "Melee Weapon Attack",
            "modifier": 19,
            "reach": "20 ft.",
            "targets": 1,
            "hits": [
                {
                    "dieType": "4d6+10",
                    "damageType": "bludgeoning"
                }
            ],
            "description": "If the target is a creature, it must succeed on a DC 20 Strength saving throw or be knocked prone."
        }
    ],
    "legendaryDescription": "The tarrasque can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature’s turn. The tarrasque regains spent legendary actions at the start of its turn.",
    "legendaryActions": [
        {
            "name": "Attack",
            "description": "The tarrasque makes one claw attack or tail attack."
        },
        {
            "name": "Move",
            "description": "The tarrasque moves up to half its speed."
        },
        {
            "name": "Chomp (Costs 2 Actions)",
            "description": "The tarrasque makes one bite attack or uses its Swallow."
        }
    ],
    "lairDescription": '',
    "lairActions": [],
    "regionalEffects": [],
    "regionalDescription": "",
    "mythicActions": [],
    "mythicDescription": ""
}


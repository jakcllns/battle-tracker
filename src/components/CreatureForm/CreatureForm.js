'use client'
import AddButton from "@/components/AddButton/AddButton";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import ListBox from "@/components/ListBox/ListBox";
import ListInput from "@/components/ListInput/ListInput";
import Selector from "@/components/Selector/Selector";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import TextArea from "@/components/TextArea/TextArea";
import { ChallengeRatings } from "@/utils/challengeRatingLookup";
import { isDiceNotation, averageRoll } from "@/utils/DiceParser/DiceParser";
import { ALIGNMENTS, CONDITIONS, createAbilities, createAction, createLegendaryAction, createSavingThrow, createSkill, CREATURE_TYPES, DAMAGE_TYPES, initializeMonster, LANGUAGES, SAVING_THROWS, SKILLS, DAMAGE_RESISTANCES } from "@/utils/Monster/monster";
import { addMonster } from "@/utils/query";
import { useEffect, useState } from "react";

const refreshOptions = () => {
    return {
        hasResistance: false,
        hasDamageImmunities: false,
        hasDamageVulnerabilities: false,
        hasConditionImmunities: false,
        hasAbilities: false,
        hasRegionEffects: false,
        isLegendary: false,
        isMythic: false,
        hasLair: false
    }
}

const CreaturForm = ({monster, setMonster, mode}) => {
    const [validHitDie, setValidHitDie] = useState(false);
    const [movementSpeed, setMovementSpeed] = useState('');
    const [validStats, setValidStats] = useState({
        str: true,
        dex: true,
        con: true,
        int: true,
        wis: true,
        cha: true
    })
    const [options, setOptions] = useState(refreshOptions())

    const [savingThrow, setSavingThrow] = useState(createSavingThrow('', 0))
    const [skill, setSkill] = useState(createSkill('', 0))
    const [sense, setSense] = useState('')
    const [language, setLanguage] = useState('')
    const [action, setAction] = useState(createAction('','Melee Weapon Attack',0,'',1, [], ''))
    const [legendaryAction, setLegendaryAction] = useState(createLegendaryAction('',''))
    const [regionalEffect, setRegionalEffect] = useState({name: '', description: ''})
    const [ability, setAbility] = useState(createAbilities('',''))
    const [hit, setHit] = useState({dieType: '', damageType: ''})
    const [mythicAction, setMythicAction] = useState({name: '', description: ''})
    const [lairAction, setLairAction] = useState({name: '', description: ''})

    // useEffect(() => console.log(action), [action])

    useEffect(()=> {
        
        // const updatedOptions = {...options}
        // updatedOptions.hasAbilities = monster.abilities.length > 0
        // updatedOptions.hasConditionImmunities = monster.conditionImmunities.length > 0
        // updatedOptions.hasDamageImmunities = monster.damageImmunities.length > 0
        // updatedOptions.hasDamageVulnerabilities = monster.damageVulnerabilites.length > 0
        // updatedOptions.hasRegionEffects = monster.regionalDescription !== ''
        // updatedOptions.hasResistance = monster.damageResistances.length > 0
        // updatedOptions.isLegendary = monster.legendaryDescription !== ''
        // updatedOptions.isMythic = monster.mythicDescription !== ''
        // updatedOptions.hasLair = monster.lairDescription !== ''

        // setOptions(updatedOptions)

        if(validHitDie === isDiceNotation(monster.hitDie)){return}
        setValidHitDie(isDiceNotation(monster.hitDie))

        
        
    },[monster])

    const handleOptionChange = (checked, option, monsterProperty) => {
        if(!checked) {
            const newMonster = {...monster}
            newMonster[monsterProperty] = []
            setMonster(newMonster)
        }
        const updatedOptions = {...options}
        updatedOptions[option] = checked
        setOptions(updatedOptions)
    }

    const handleGeneralChange = event => {
        const newMonster = {...monster};
        if(['str','dex','con','int','wis','cha'].some(ele => ele === event.target.id)) {
            const newValidation = {...validStats}
            
            newValidation[event.target.id] = event.target.value !== '';
            setValidStats(newValidation)
        }
        newMonster[event.target.id] = event.target.value
        setMonster(newMonster);
    }

    const handleHitDieChange = event => {
        const newMonster = {...monster}
        newMonster.hitDie = event.target.value
        if(isDiceNotation(newMonster.hitDie)){
            newMonster.hitPoints = averageRoll(newMonster.hitDie)
        } else {
            newMonster.hitPoints = 0
        }
        setMonster(newMonster)
    }

    const handleAddMovementSpeed = event => {
        event.preventDefault()
        if(monster.movementSpeed.some(ele => ele === movementSpeed) || movementSpeed === '') {
            return
        }
        const newMonster = {...monster}
        newMonster.movementSpeed.push(movementSpeed)
        setMovementSpeed('')
        setMonster(newMonster)
    }

    const handleRemoveMovementSpeed = (index) => {
        const newMonster = {...monster, movementSpeed: monster.movementSpeed.filter((e,i) => i !== index)}
        setMonster(newMonster)
    }

    const handleAddSense = event => {
        event.preventDefault()
        if(monster.senses.some(ele => ele === sense) || sense === ''){
            return
        }   
        const newMonster = {...monster}
        monster.senses.push(sense)
        setSense('')
        setMonster(newMonster)
    }

    const handleAddSkill = (event) => {
        event.preventDefault()
        if(skill.skillType === '' || skill.modifier === NaN || monster.skills.some(e => e.skillType === skill.skillType)) { return }
        const newMonster = {...monster}
        newMonster.skills.push({...skill})
        setSkill(createSkill('', 0))
        setMonster(newMonster)
    }

    const handleAddSavingThrow = (event) => {
        event.preventDefault()
        const newMonster = {...monster}
        newMonster.savingThrows.push({...savingThrow})
        setSavingThrow(createSavingThrow('', 0))
        setMonster(newMonster)
    }

    const handleAddLanguage = (event) => {
        event.preventDefault()
        const newMonster = {...monster}
        newMonster.languages.push(language)
        setLanguage('')
        setMonster(newMonster)
    }

    const handleAddHit = () => {
        if(hit.dieType === '' || hit.damageType === ''){
            return
        }
        const newAction = {...action}
        newAction.hits.push(hit)
        setAction(newAction)
        setHit({dieType: '', damageType: ''})
    }

    const handleChallengeChange = event => {
        const newMonster = {...monster}
        newMonster.challenge = event.target.value
        newMonster.experience =  ChallengeRatings.hasOwnProperty(newMonster.challenge) ? ChallengeRatings[newMonster.challenge].exp : 0
        setMonster(newMonster)
    }

    const handleAddResistance = (resistance) => {
        const newMonster = {...monster}
        newMonster.damageResistances.push(resistance)
        setMonster(newMonster)
    }

    const handleAddDamageImmunity = (immunity) => {
        const newMonster = {...monster}
        newMonster.damageImmunities.push(immunity)
        setMonster(newMonster)
    }

    const handleAddDamageVulnerability = (vulnerability) => {
        const newMonster = {...monster}
        newMonster.damageVulnerabilites.push(vulnerability)
        setMonster(newMonster)
    }

    const handleAddConditionImmunities = (immunity) => {
        const newMonster = {...monster}
        newMonster.conditionImmunities.push(immunity)
        setMonster(newMonster)
    }

    const handleAddAbility = event => {
        event.preventDefault()

        if(ability.description === '' || ability.name === '' || monster.abilities.some(ele => ele.name === ability.name)) { return }

        const newMonster = {...monster}
        newMonster.abilities.push(ability)
        setAbility(createAbilities('',''))
        setMonster(newMonster)
    }

    const handleAddLegendaryAction = event => {
        event.preventDefault()
        const newMonster = {...monster}
        newMonster.legendaryActions.push(legendaryAction)
        setLegendaryAction(createLegendaryAction('',''))
        setMonster(newMonster)
    }

    const handleIsLegendary = event => {
        const checked = event.target.checked

        if(!checked) {
            const newMonster = {...monster}
            newMonster.legendaryDescription = ''
            newMonster.legendaryActions = []
            setMonster(newMonster)
        }

        setOptions({...options, isLegendary: checked})
    }

    const handleHasLair = event => {
        const checked = event.target.checked
        if(!checked) {
            setMonster({...monster, lairDescription: '', lairActions: []})
        }

        setOptions({...options, hasLair: checked})
    }

    const handleHasRegionalEffect = event => {
        const checked = event.target.checked
        if(!checked) {
            setMonster({...monster, regionalDescription: '', regionalEffects: []})
        }

        setOptions({...options, hasRegionEffects:  checked})
    }

    const handleIsMythic = event => {
        const checked = event.target.checked
        if(!checked) {
            setMonster({...monster, mythicDescription: '' , mythicActions: []})
        }

        setOptions({...options, isMythic: checked})
    }

    const handleAddRegionalEffect = event => {
        event.preventDefault()
        const newMonster = {...monster}
        newMonster.regionalEffects.push(regionalEffect)
        setRegionalEffect({name: '', description: ''})
        setMonster(newMonster)
    }

    const handleAddMythicAction = event => {
        event.preventDefault()
        const newMonster = {...monster}
        newMonster.mythicActions.push(mythicAction)
        setMythicAction({name: '', description: ''})
        setMonster(newMonster)
    }

    const handleAddLairAction = event => {
        event.preventDefault()
        const newMonster = {...monster}
        newMonster.lairActions.push(lairAction)
        setLairAction({name: '', description: ''})
        setMonster(newMonster)
    }

    const handleCreateCreature = event => {
        event.preventDefault()
        // console.log(JSON.stringify({...monster, id_name: monster.name.toLowerCase().replace(/\s/g, '_')}))
        addMonster(monster).then(res => {
            console.log(res)
            // setMonster(initializeMonster())
        })
        // fetch('api/new-monsters', {
        //     method: 'POST',
        //     body: JSON.stringify({...monster, id_name: monster.name.toLocaleLowerCase().replace(/\s/g,'_')})
        // })
        // .then( res => res.json())
        // .then( data => {
        //     console.log(data)
        //     setMonster(initializeMonster())
        //     setOptions(refreshOptions())
        // })

    }

    const renderResitanceControl = (hasResistance) => {
        if(!hasResistance) {
            return
        }

        return (
            <>
                <div className="flex-row">
                    <label>Damage Resistances:</label>
                </div>
                <div className="flex-row">
                    
                    
                    <ListInput
                    items={DAMAGE_RESISTANCES}
                    handleAdd={handleAddResistance}
                    type={'text'}
                    />
                </div>
                {
                    monster.damageResistances.length > 0 ?
                    (
                        <ListBox
                        items={monster.damageResistances}
                        handleDelete={index => {
                            const newMonster = {...monster, damageResistances: monster.damageResistances.filter((e,i) => i !== index)}
                            setMonster(newMonster)
                        }}/>
                    ): undefined
                }
            </>
        )
    }

    const renderDamageImmunitiesControl = hasDamageImmunities => {
        if(!hasDamageImmunities){ return }

        return (
            <>
                <div className="flex-row">
                    <label>Damage Immunites</label>
                </div>
                <div className="flex-row">
                    <ListInput
                    items={DAMAGE_RESISTANCES}
                    handleAdd={handleAddDamageImmunity}
                    type={'text'}
                    />
                </div>
                {
                    monster.damageImmunities.length > 0 ?
                    (<ListBox
                    items={monster.damageImmunities}
                    handleDelete={index => {
                        const newMonster = {...monster, damageImmunities: monster.damageImmunities.filter((e,i) => i !== index)}
                        setMonster(newMonster)
                    }}/>) : undefined
                }
            </>
        )
    }

    const renderDamageVulnerabilitesControl = hasDamageVulnerabilites => {
        if(!hasDamageVulnerabilites){ return }

        return (
            <>
                <div className="flex-row">
                    <label>Damage Vulnerabilities</label>
                </div>
                <div className="flex-row">
                    <ListInput
                    items={DAMAGE_TYPES}
                    handleAdd={handleAddDamageVulnerability}
                    type={'text'}
                    />
                </div>
                {
                    monster.damageVulnerabilites.length > 0 ?
                    (
                        <ListBox
                        items={monster.damageVulnerabilites}
                        handleDelete={index => {
                            const newMonster = {...monster, damageVulnerabilites: monster.damageVulnerabilites.filter((e,i) => i !== index)}
                            setMonster(newMonster)
                        }}
                        />
                    ) : undefined
                }
            </>
        )
    }

    const renderConditionImmunitiesControl = hasConditionImmunities => {
        if(!hasConditionImmunities) { return }

        return (
            <>
                <div className="flex-row">
                    <label>Condition Immunites</label>
                </div>
                <div className="flex-row">
                    <ListInput
                    items={CONDITIONS}
                    handleAdd={handleAddConditionImmunities}
                    type={'text'}
                    />
                </div>
                {
                    monster.conditionImmunities.length > 0 ?
                    (
                        <ListBox
                        items={monster.conditionImmunities}
                        handleDelete = {index => {
                            const newMonster = {...monster, conditionImmunities: monster.conditionImmunities.filter((e,i) => i !== index)}
                            setMonster(newMonster)
                        }}
                        />
                    ): undefined
                }
            </>
        )
    }

    const renderAbilitiesControl = hasAbilities => {
        if(!hasAbilities) { return }

        return (
            <>
                <div className="flex-row text-xl">
                    <label>Abilities</label>
                </div>
                {
                    monster.abilities.length > 0 ?
                    (
                        <div className="flex-row py-1 whitespace-pre-line">
                            <hr className="bg-slate-50" />
                            <ul className="overflow-y-auto max-h-64">
                                {monster.abilities.map((ability, index) => {
                                    return (
                                        <li key={index}>
                                            <DeleteButton 
                                            onClick={e => {
                                                e.preventDefault()
                                                const newMonster = {...monster, abilities: monster.abilities.filter((e,i) => i !== index)}
                                                setMonster(newMonster)
                                            }}/>
                                            <strong>{ability.name}.</strong> {ability.description}
                                        </li>
                                    )
                                })}
                            </ul>
                            <hr className="bg-slate-50" />
                        </div>
                    ): undefined
                }
                <div className="flex-row py-1">
                    <label>Name</label>
                    <input
                    className="text-slate-950 m-1"
                    type={'text'}
                    value={ability.name}
                    onChange={e => setAbility({...ability, name: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' ? e.preventDefault() : e}
                    />
                    <label>Is Action?</label>
                    <input
                    className="mx-2"
                    type={'checkbox'}
                    checked={ability.isAction}
                    onChange={e => setAbility({...ability, isAction: e.target.checked})}
                    onKeyDown={e => e.key === 'Enter' ? setAbility({...ability, isAction: !ability.isAction}): e}
                    />
                </div>
                <div className="flex-row">
                    <label>Description</label>
                </div>
                <div className="flex-row ">
                    <TextArea
                    className="text-slate-950 w-full h-32 p-2"
                    buttonName={'Add Ability'}
                    onChange={e => setAbility({...ability, description: e.target.value})}
                    handleSubmit={handleAddAbility}
                    />
                </div>
            </>
        )
    }

    const renderLegendaryActionsControl = isLegendary => {
        if(!isLegendary) { return }

        return (
            <>
                <div className="flex-row w-full text-xl pb-2">
                    <label>Legendary Description</label>
                </div>
                <div className="flex-row w-full text-slate-950">
                    <textarea
                    className="p-1 w-full h-24"
                    value={monster.legendaryDescription}
                    onChange={e => setMonster({...monster, legendaryDescription: e.target.value})}
                    />
                </div>
                <div className="flex-row w-full text-xl">
                    <label>Legendary Actions</label>
                </div>
                {
                    monster.legendaryActions.length > 0 ?
                    (
                        <div className="flex-row w-full py-1">
                            <hr className="bg-slate-50" />
                            <ul className="overflow-y-auto max-h-64">
                                {
                                    monster.legendaryActions.map((ele,index) => {
                                       return( 
                                            <li key={index}>
                                                <DeleteButton onClick={e => {
                                                    e.preventDefault()
                                                    setMonster({...monster, legendaryActions: monster.legendaryActions.filter((e,i) => i !== index)})
                                                }} />
                                                <strong>{ele.name}</strong> {ele.description}
                                            </li>
                                    )})
                                }
                            </ul>
                            <hr className="bg-slate-50" />
                        </div>
                    ): undefined
                }
                <div className="flex-row w-full">
                    <label>Name</label>
                </div>
                <div className="flex-row text-slate-950 w-full">
                    <input
                    type={'text'}
                    className="pl-1"
                    value={legendaryAction.name}
                    onChange={e => setLegendaryAction({...legendaryAction, name: e.target.value})}
                    />
                </div>

                <div className="flex-row w-full">
                    <label>Description</label>
                </div>

                <div className="flex-row w-full">
                    <textarea
                    className="text-slate-950 w-full h-32 p-1"
                    value={legendaryAction.description}
                    onChange={e => setLegendaryAction({...legendaryAction, description: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && e.ctrlKey ? handleAddLegendaryAction(e) : e}
                    />
                </div>
                <div className="flex-row w-fit mx-auto">
                    <button 
                    className="px-4 rounded border border-solid bg-slate-950 hover:bg-slate-400 hover:text-slate-950 hover:font-extrabold hover: border-slate-950 hover:border-l-2 hover:border-t-2" 
                    onClick={handleAddLegendaryAction}>Add Legendary Action</button>
                </div>
            </>
        )
    }

    const renderRegionalEffectsControl = hasRegionEffects => {
        if(!hasRegionEffects) { return }

        return (
            <>
                <div className="flex-row w-full text-xl">
                    <label>Regional Effect Description</label>
                </div>
                <div className="flex-row w-full text-slate-950">
                    <textarea
                    className="p-1 h-24 w-full"
                    value={monster.regionalDescription}
                    onChange={e => setMonster({...monster, regionalDescription: e.target.value})}
                    />
                </div>
                <div className="flex-row w-full text-xl">
                    <label>Regional Effects</label>
                </div>
                {
                    monster.regionalEffects.length > 0 ?
                    (
                        <div className="flex-row w-full py-1">
                            <hr className="bg-slate-50" />
                            <ul className="overflow-y-auto">
                                {
                                    monster.regionalEffects.map((ele,index) => {
                                        <li key={index}>
                                            <DeleteButton onClick={e => {
                                                e.preventDefault()
                                                setMonster({...monster, regionalEffects: monster.regionalEffects.filter((e,i) => i !== index)})
                                            }} />
                                            <strong>{ele.name}</strong> {ele.description}
                                        </li>
                                    })
                                }
                            </ul>
                            <hr className="bg-slate-50" />
                        </div>
                    ): undefined
                }
                <div className="flex-row w-full">
                    <label>Name</label>
                </div>
                <div className="flex-row w-full">
                    <input
                    type={'text'}
                    className="px-1"
                    value={regionalEffect.name}
                    onChange={e => setRegionalEffect({...regionalEffect, name: e.target.value})}
                    />
                </div>
                <div className="flex-row w-full">
                    <label>Description</label>
                </div>
                <div className="flex-row w-full">
                    <textarea
                    className="p-1 w-full h-36"
                    value={regionalEffect.description}
                    onChange={e => setRegionalEffect({...regionalEffect, description: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && e.ctrlKey ? handleAddRegionalEffect(e) : e}
                    />
                </div>
                <div className="flex-row w-fit mx-auto">
                    <button 
                    className="px-4 rounded border border-solid bg-slate-950 hover:bg-slate-400 hover:text-slate-950 hover:font-extrabold hover: border-slate-950 hover:border-l-2 hover:border-t-2" 
                    onClick={handleAddRegionalEffect}>Add Regional Effect</button>
                </div>
            </>
        )
    }

    const renderMythicActionsControl = isMythic => {
        if(!isMythic) { return }

        return (
            <>
                <div className="flex-row w-full text-xl">
                    <label>Mythic Description</label>
                </div>
                <div className="flex-row w-full text-slate-950">
                    <textarea
                    className="p-1 h-24 w-full"
                    value={monster.mythicDescription}
                    onChange={e => setMonster({...monster, mythicDescription: e.target.value})}
                    />
                </div>
                <div className="flex-row w-full text-xl">
                    <label>Mythic Actions</label>
                </div>
                {
                    monster.mythicActions.length > 0 ?
                    (
                        <div className="flex-row w-full py-1">
                            <hr className="bg-slate-50" />
                            <ul className="overflow-y-auto">
                                {
                                    monster.mythicActions.map((ele,index) => {
                                        <li key={index}>
                                            <DeleteButton onClick={e => {
                                                e.preventDefault()
                                                setMonster({...monster, mythicActions: monster.mythicActions.filter((e,i) => i !== index)})
                                            }} />
                                            <strong>{ele.name}</strong> {ele.description}
                                        </li>
                                    })
                                }
                            </ul>
                            <hr className="bg-slate-50" />
                        </div>
                    ): undefined
                }
                <div className="flex-row w-full">
                    <label>Name</label>
                </div>
                <div className="flex-row w-full">
                    <input
                    type={'text'}
                    className="px-1"
                    value={mythicAction.name}
                    onChange={e => setMythicAction({...mythicAction, name: e.target.value})}
                    />
                </div>
                <div className="flex-row w-full">
                    <label>Description</label>
                </div>
                <div className="flex-row w-full">
                    <textarea
                    className="p-1 w-full h-36"
                    value={mythicAction.description}
                    onChange={e => setMythicAction({...mythicAction, description: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && e.ctrlKey ? handleAddMythicAction(e) : e}
                    />
                </div>
                <div className="flex-row w-fit mx-auto">
                    <button 
                    className="px-4 rounded border border-solid bg-slate-950 hover:bg-slate-400 hover:text-slate-950 hover:font-extrabold hover: border-slate-950 hover:border-l-2 hover:border-t-2" 
                    onClick={handleAddMythicAction}>Add Mythic Action</button>
                </div>
            </>
        )
    }

    const renderLairActionsControl = hasLair => {
        if(!hasLair) { return }

        return (
            <>
                <div className="flex-row w-full text-xl">
                    <label>Lair Description</label>
                </div>
                <div className="flex-row w-full text-slate-950">
                    <textarea
                    className="p-1 h-24 w-full"
                    value={monster.lairDescription}
                    onChange={e => setMonster({...monster, lairDescription: e.target.value})}
                    />
                </div>
                <div className="flex-row w-full text-xl">
                    <label>Lair Actions</label>
                </div>
                {
                    monster.lairActions.length > 0 ?
                    (
                        <div className="flex-row w-full py-1">
                            <hr className="bg-slate-50" />
                            <ul className="overflow-y-auto">
                                {
                                    monster.lairActions.map((ele,index) => {
                                        <li key={index}>
                                            <DeleteButton onClick={e => {
                                                e.preventDefault()
                                                setMonster({...monster, lairActions: monster.lairActions.filter((e,i) => i !== index)})
                                            }} />
                                            <strong>{ele.name}</strong> {ele.description}
                                        </li>
                                    })
                                }
                            </ul>
                            <hr className="bg-slate-50" />
                        </div>
                    ): undefined
                }
                <div className="flex-row w-full">
                    <label>Name</label>
                </div>
                <div className="flex-row w-full">
                    <input
                    type={'text'}
                    className="px-1"
                    value={lairAction.name}
                    onChange={e => setLairAction({...lairAction, name: e.target.value})}
                    />
                </div>
                <div className="flex-row w-full">
                    <label>Description</label>
                </div>
                <div className="flex-row w-full">
                    <textarea
                    className="p-1 w-full h-36"
                    value={lairAction.description}
                    onChange={e => setLairAction({...lairAction, description: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && e.ctrlKey ? handleAddLairAction(e) : e}
                    />
                </div>
                <div className="flex-row w-fit mx-auto">
                    <button 
                    className="px-4 rounded border border-solid bg-slate-950 hover:bg-slate-400 hover:text-slate-950 hover:font-extrabold hover: border-slate-950 hover:border-l-2 hover:border-t-2" 
                    onClick={handleAddLairAction}>Add Lair Action</button>
                </div>
            </>
        )
    }

    return (
        <form className="container px-8 py-1 mx-auto flex flex-wrap gap-x-3 gap-y-2 text-sm" onKeyDown={e => e.key === 'Enter' ? e.preventDefault() : e}>
                <div className="flex-row w-full text-center p-2">
                    <h1 className="text-xl mx-auto">Create Creature Form</h1>
                </div>
                
                <div className=" flex gap-2 flex-row flex-wrap">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label htmlFor="name">Name:</label>
                        <input className="text-slate-950" id="name" type={'text'} value={monster.name} onChange={handleGeneralChange}></input>
                    </div>

                    {/* Size */}
                    <div className="flex flex-col">
                        <label htmlFor="size">Size:</label>
                        <select id='size' className="w-fit text-slate-950" value={monster.size} onChange={handleGeneralChange}>
                            <option></option>
                            <option>Tiny</option>
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            <option>Huge</option>
                            <option>Gargantuan</option>
                        </select>
                    </div>
                    
                    {/* Race */}
                    <div className="flex-col flex">
                        <label htmlFor="race">Race</label>
                        <Selector items={CREATURE_TYPES} value={monster.race} onChange={handleGeneralChange} id="race" />
                        {/* <input className="text-slate-950" id="race" type="text" value={monster.race} onChange={handleGeneralChange}></input> */}
                    </div>

                    {/* Alignment */}
                    <div className="flex-col flex">
                        <label htmlFor="alignment">Alignment</label>
                        <Selector
                        items={ALIGNMENTS}
                        value={monster.alignment}
                        id='alignment'
                        onChange={handleGeneralChange}/>
                    </div>

                    {/* Armor Class */}
                    <div className="flex-col flex w-fit">
                        <label htmlFor="armorClass">AC</label>
                        <input className="text-slate-950 w-fit" id="armorClass" max={99} type={'number'} min={1} value={monster.armorClass} onChange={handleGeneralChange}></input>
                    </div>

                    {/* Armor Type */}
                    <div className="flex-col flex">
                        <label htmlFor="armorType">Armor Type</label>
                        <input className="text-slate-950" id="armorType" type={'text'} value={monster.armorType} onChange={handleGeneralChange}></input>
                    </div>
                    
                    {/* Hit Die */}
                    <div className="flex-col flex">
                        <div className="flex-row">
                            <label htmlFor="hitDie">Hit Die:</label>
                            <label className="pl-3">Hit Points: {monster.hitPoints}</label>
                        </div>
                        <div className="flex-row">
                            <input className={`text-slate-950 ${validHitDie ? '' :'border-2 border-solid border-red-600'}`} id="hitDie" type={'text'} value={monster.hitDie} onChange={handleHitDieChange}></input>
                        </div>
                    </div>
                </div>

                <div className="flex-row flex gap-2 flex-wrap">
                    {/* Movement Speed */}
                    <div className="flex-col flex">
                        <label htmlFor="movementSpeed">Movement Speed(s)</label>
                        <div className="flex-row">
                            <input 
                            className="text-slate-950" id="movementSpeed" 
                            type={'text'} 
                            value={movementSpeed} 
                            onChange={e=>setMovementSpeed(e.target.value)} 
                            onKeyDown={e => e.key === 'Enter' ? handleAddMovementSpeed(e) : e.key}></input>
                            <AddButton 
                            onClick={handleAddMovementSpeed} 
                            disabled={movementSpeed !== '' || monster.movementSpeed.some(e => e !== movementSpeed)} />
                        </div>
                        <ListBox
                        items={monster.movementSpeed}
                        handleDelete={handleRemoveMovementSpeed}/>
                    </div>
                    
                    {/* Stats */}
                    <div className=" flex flex-col">
                        <div className="flex-row">
                            <label htmlFor="str">STR: </label>
                            <input id="str" type={'number'} min={0} className="text-slate-950 m-1 w-12" value={validStats.str ? monster.str: ''} onChange={handleGeneralChange}></input>
                        </div>
                        <div className="flex-row">
                            <label htmlFor="dex">DEX: </label>
                            <input id="dex" type={'number'} min={0} className="text-slate-950 m-1 w-12" value={validStats.dex ? monster.dex: ''} onChange={handleGeneralChange}></input>
                        </div>
                        <div className="flex-row">
                            <label htmlFor="dex">CON:</label>
                            <input id="con" type={'number'} min={0} className="text-slate-950 m-1 w-12" value={validStats.con ? monster.con: ''} onChange={handleGeneralChange}></input>
                        </div>
                    </div>
                    
                    {/* Stats */}
                    <div className=" flex flex-col">
                        <div className="flex-row">
                            <label className="pr-2" htmlFor="str">INT:</label>
                            <input id="int" type={'number'} min={0} className="text-slate-950 m-1 w-12" value={validStats.int ? monster.int: ''} onChange={handleGeneralChange}></input>
                        </div>
                        <div className="flex-row">
                            <label htmlFor="dex">WIS: </label>
                            <input id="wis" type={'number'} min={0} className="text-slate-950 m-1 w-12" value={validStats.wis ? monster.wis: ''} onChange={handleGeneralChange}></input>
                        </div>
                        <div className="flex-row">
                            <label htmlFor="dex">CHA:</label>
                            <input id="cha" type={'number'} min={0} className="text-slate-950 m-1 w-12" value={validStats.cha ? monster.cha: ''} onChange={handleGeneralChange}></input>
                        </div>
                    </div>
                    
                    {/* Saving Throws */}
                    <div className="flex flex-col">    
                        <div className="flex-row py-2">
                            <label>Saving Throw Type:</label>
                            <Selector 
                            items={SAVING_THROWS.map(ele => ele.toLocaleUpperCase())} 
                            value={savingThrow.savingThrowType}
                            onChange={e => setSavingThrow({...savingThrow, savingThrowType: e.target.value})} />
                            <label>Modifier:</label>
                            <input 
                            className="text-slate-950 ml-2 w-12" 
                            step={1} type={'number'} 
                            value={isNaN(savingThrow.modifier) ? '' : savingThrow.modifier} 
                            onChange={e => setSavingThrow({...savingThrow, modifier: e.target.value === ''? NaN : Number(e.target.value) })}
                            onKeyDown={e => e.key === 'Enter'? handleAddSavingThrow(e) : e}
                            ></input>
                            <button 
                                className="px-2"
                                onClick={handleAddSavingThrow}
                                disabled={savingThrow.savingThrowType === '' || isNaN(savingThrow.modifier) || savingThrow.modifier === 0}
                            >+</button>
                        </div>
                        <ListBox
                        items={monster.savingThrows.map((ele, index) => {
                            return `${ele.savingThrowType} ${ele.modifier >= 0 ? '+' : ''}${ele.modifier}`
                        })}
                        handleDelete={index => {
                            setMonster({...monster, savingThrows: monster.savingThrows.filter((e,i) => i !== index)})

                        }}/>
                    </div>
                    
                    {/* Skills */}
                    <div className="flex flex-col">
                        <div className="flex-row py-2">
                            <label>Skill Type:</label>
                            <Selector
                            items={SKILLS.map(ele => ele.skill)}
                            value={skill.skillType}
                            onChange={e => setSkill({...skill, skillType: e.target.value})}/>
                            <label>Modifier:</label>
                            <input 
                            className="text-slate-950 ml-2 w-12"
                            step={1}
                            type={'number'}
                            value={isNaN(skill.modifier) ? '' : skill.modifier}
                            onChange={e => setSkill({...skill, modifier: e.target.value === ''? NaN : Number(e.target.value) })}
                            onKeyDown={e => e.key === 'Enter' ? handleAddSkill(e) : e}
                            ></input>
                            <AddButton
                            onClick={handleAddSkill}
                            disabled={skill.skillType === '' || isNaN(skill.modifier) || skill.modifier === 0}/>
                            
                        </div>
                        <ListBox
                        handleDelete={index => {
                            setMonster({...monster, skills: monster.skills.filter((e,i) => i !== index)})
                        }}
                        items={monster.skills.map(ele => `${ele.skillType} ${ele.modifier >= 0 ? '+' : '-'}${ele.modifier}`)}
                        />
                    </div>
                    
                    {/* Senses */}
                    <div className="flex flex-col max-h-36">
                        <div className="flex-row py-2">
                            <label>Senses</label>
                            <input 
                            className="text-slate-950 mx-2 w-52 pl-2"
                            type={'text'}
                            value={sense}
                            onChange={e => setSense(e.target.value)}
                            onKeyDown= { e => e.key === "Enter" ? handleAddSense(e) : e.key }
                            ></input>
                            <button
                            className="px-2" 
                            onClick={handleAddSense}
                            disabled={sense === '' || monster.senses.some(ele => ele === sense)}
                            >+</button>
                        </div>
                        {/* Senses List */}
                        <ListBox
                        items={monster.senses}
                        handleDelete={index => {
                            setMonster({...monster, senses: monster.senses.filter((e,i) => i !== index)})
                        }} />
                    </div>

                    <div className="flex flex-col max-h-36">
                        <div className="flex-row py-2">
                            <label className="mr-1">Languages</label>
                            <Selector
                            items={LANGUAGES}
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                            onKeyDown={e =>  e.key === 'Enter' ? handleAddLanguage(e) : e.key}/>
                            <AddButton
                            onClick={handleAddLanguage}
                            disabled={language === '' || monster.languages.some(ele => ele === language)}/>
                            
                        </div>
                        <ListBox
                        items={monster.languages}
                        handleDelete={index => {
                            setMonster({...monster, languages: monster.languages.filter((e,i) => i !== index)})
                        }}/>
                        
                    </div>

                    {/* Challenge /  Experience */}
                    <div className="flex flex-col">
                        <div className="flex-row py-2">
                            <label>Challenge</label>
                            <Selector
                            items={Object.keys(ChallengeRatings)}
                            value={monster.challenge}
                            onChange={handleChallengeChange}/>
                            <label>{monster.experience.toLocaleString()} XP</label>
                        </div>
                    </div>
                </div>

                <div className="flex-row flex gap-2 flex-wrap w-full">
                    <div className="flex-col justify-items-end">
                        <div className="flex-row flex-grow text-right">
                            <label>Damage Resistances?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            checked={options.hasResistance} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasResistance', 'damageResistances')} />
                        </div>
                        <div className="flex-row text-right">
                            <label>Damage Immunities?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            checked={options.hasDamageImmunities} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasDamageImmunities', 'damageImmunities')}/>
                        </div>
                        <div className="flex-row text-right">
                            <label>Damage Vulnerabilities?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            checked={options.hasDamageVulnerabilities} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasDamageVulnerabilities','damageVulnerabilites')}/>
                        </div>
                        <div className="flex-row text-right">
                            <label>Condition Immunities?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            checked={options.hasConditionImmunities} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasConditionImmunities', 'conditionImmunities')}></input>
                        </div>
                    </div>
                    <div className="flex-col flex">
                        {renderResitanceControl(options.hasResistance)}
                    </div>
                    <div className="flex-col flex">
                        {renderDamageImmunitiesControl(options.hasDamageImmunities)}
                    </div>
                    <div className="flex-col flex">
                        {renderDamageVulnerabilitesControl(options.hasDamageVulnerabilities)}
                    </div>
                    <div className="flex-col flex">
                        {renderConditionImmunitiesControl(options.hasConditionImmunities)}
                    </div>
                </div>

                <div className="flex-row flex gap-2 flex-wrap w-full ">
                    <div className="flex-col justify-items-end">
                        <div className="flex-row text-right">
                            <label>Abilities?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            checked={options.hasAbilities} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasAbilities', 'abilities')}
                            onKeyDown={e => e.key === 'Enter' ? handleOptionChange(!e.target.checked, 'hasAbilities', 'abilities') : e}/>
                        </div>
                    </div>
                    <div className="flex-col flex w-full ">
                        {renderAbilitiesControl(options.hasAbilities)}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex-row flex gap-2 flex-wrap w-full">
                    <div className="w-full">
                        <h2 className="text-lg">Actions</h2>
                        <svg className="h-2 w-full  fill-slate-50 m-0">
                            <polyline className="xl:scale-[1.85] lg:scale-[1.25] md:scale-100 sm:scale-75" points="0,0 800,2.5 0,5"></polyline>
                        </svg>
                        {
                            monster.actions.length !== 0 ?(
                                <div className="w-full flex flex-wrap">
                                    <ul>
                                        {
                                            monster.actions.map((ele, index) => {
                                                return (
                                                    <li key={index}>
                                                        <DeleteButton onClick={e => setMonster({...monster, actions: monster.actions.filter((e,i) => i !== index)})}/>
                                                        <strong>{ele.name}.</strong> <em>{ele.attackType}</em>: {ele.modifier >= 0 ? '+' : '-'}{ele.modifier} to hit, {ele.reach}, {ele.targets} target{ele.targets > 1 ? 's' : ''}, <em>Hit:</em> {ele.hits.map(e => `${averageRoll(e.dieType)} (${e.dieType}) ${e.damageType} damage`).join('and')}. {ele.description}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            ) : undefined
                        }
                        {
                            monster.actions.length !== 0 ? <hr className="bg-slate-50"/> : undefined
                        }
                        <div className="flex-row flex flex-wrap">
                            <div className="flex-row my-1">
                                <label>Action Name:</label>
                                <input className="text-slate-950 mx-1" type={'text'} value={action.name} onChange={e => setAction({...action, name: e.target.value})}></input>
                            </div>
                            <div className="flex-row my-1">
                                <label>Attack Type:</label>
                                <select className="text-slate-950 mx-1 w-fit" value={action.attackType} onChange={e => setAction({...action, attackType: e.target.value})}>
                                    <option>Melee Weapon Attack</option>
                                    <option>Ranged Weapon Attack</option>
                                    <option>Melee and Ranged Weapon Attack</option>
                                </select>
                            </div>
                            <div className="flex-row my-1">
                                <label>Modifier:</label>
                                <input 
                                className="text-slate-950 mx-1 w-12" 
                                type={'number'} 
                                maxLength={2} 
                                min={0} 
                                step={1} 
                                value={isNaN(action.modifier) ? '' : action.modifier} 
                                onChange={e => setAction({...action, modifier: e.target.value === '' ? NaN : Number(e.target.value)})}></input>
                            </div>
                            <div className="flex-row my-1">
                                <label>Reach:</label>
                                <input
                                className="text-slate-950 mx-1"
                                type={'text'}
                                value={action.reach}
                                onChange={e => setAction({...action, reach: e.target.value})}></input>
                            </div>

                            <div className="flex-row my-1">
                                <label>Targets:</label>
                                <input
                                className="text-slate-950 mx-1 w-12"
                                type={'number'}
                                maxLength={2}
                                min={0}
                                step={1}
                                value={isNaN(action.targets)? '' : action.targets}
                                onChange={e => setAction({...action, targets: e.target.value === '' ? NaN : Number(e.target.value)})}></input>
                            </div>
                        </div>

                        {/* Overall Hits components */}
                        <div 
                        onKeyDown= { e => {
                                            
                            if(e.ctrlKey && e.key === 'Enter') {
                                e.preventDefault()
                                if(action.name === '' || action.attackType === '' || action.reach === '' || action.hits.length === 0 ) { return e}
                                setMonster({...monster, actions: [...monster.actions, action]})
                                setAction(createAction('','Melee Weapon Attack',0,'',1,[],''))
                                return e
                            }
                            return e
                        }}
                        className="flex-row">
                            <h3>Hits</h3>
                            <hr className="bg-slate-50" />
                            {/* Hits list */}
                            <div className="flex-row py-2 max-h-32 overflow-y-auto w-full">
                                <ul>
                                    {
                                        action.hits.map((ele, index) => {
                                            return (
                                                <li key={index}>
                                                    <DeleteButton
                                                    onClick={e => setAction({...action, hits: action.hits.filter((e, i) => i !== index)})} />
                                                    {ele.dieType} {ele.damageType}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <hr className="bg-slate-50"/>
                            </div>

                             {/* Die Type and Damage Type */}
                            <div className="my-2 flex flex-wrap">
                                <div className="flex-row my-1">
                                    <label htmlFor="dieType">Die Type</label>
                                    <input
                                    id="dieType"
                                    className="text-slate-950 mx-1"
                                    type={'text'}
                                    value={hit.dieType}
                                    onChange={e => {setHit({...hit, dieType: e.target.value})}}></input>
                                </div>
                                <div className="flex-row my-1">
                                    <label htmlFor="damageType">Damage Type:</label>
                                    <Selector
                                    items={DAMAGE_TYPES}
                                    value={hit.damageType}
                                    onChange={e => setHit({...hit, damageType: e.target.value})}
                                    onKeyDown={e => e.key === 'Enter' ? handleAddHit(e) : e} />
                                    <AddButton 
                                    disabled={hit.damageType === '' || hit.dieType === '' || !isDiceNotation(hit.dieType)}
                                    onClick={handleAddHit}
                                    />
                                </div>
                                <div className="flex-row flex flex-wrap w-full">
                                    <div className="flex-row">
                                        <label>Description</label>
                                    </div>
                                    <div className="flex-row w-full">
                                        <textarea
                                        className="p-1 w-full h-28 text-slate-950"
                                        value={action.description}
                                        onChange={e => setAction({...action, description: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        {/* Add Action Button */}
                        <div className="w-full">
                            <div className="mx-auto w-fit">
                                <button
                                className="w-full text-center rounded border border-solid bg-slate-950 hover:bg-slate-400 hover:text-slate-950 hover:font-extrabold hover: border-slate-950 hover:border-l-2 hover:border-t-2 px-2"
                                onClick={e => {
                                    e.preventDefault()
                                    let newMonster = {...monster}
                                    newMonster.actions.push(action)
                                    setMonster(newMonster)
                                    setAction(createAction('','Melee Weapon Attack',0,'',0,[],''))
                                }}
                                >
                                    Add Action
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex-row flex gap-2 flex-wrap w-full">
                    <div className="flex-col text-right">
                        <label>Legendary?</label>
                        <input 
                        className="ml-2" 
                        type={'checkbox'} 
                        checked={options.isLegendary} 
                        onChange={handleIsLegendary}/>
                    </div>
                    <div className="flex-col text-right">
                        <label>Mythic?</label>
                        <input 
                        className="ml-2" 
                        type={'checkbox'} 
                        checked={options.isMythic} 
                        onChange={handleIsMythic}></input>
                    </div>
                    <div className="flex-col text-right">
                        <label>Has Lair?</label>
                        <input
                        className="ml-2"
                        type={'checkbox'}
                        checked={options.hasLair}
                        onChange={handleHasLair} />
                    </div>
                    <div className="flex-col text-right">
                        <label>Regional Effects?</label>
                        <input 
                        className="ml-2" 
                        type={'checkbox'} 
                        checked={options.hasRegionEffects} 
                        onChange={handleHasRegionalEffect}/>
                    </div>
                </div>
                <div className="flex-row flex w-full flex-wrap ">
                    {renderLegendaryActionsControl(options.isLegendary)}
                </div>
                <div className="flex-row flex w-full flex-wrap">
                    {renderMythicActionsControl(options.isMythic)}
                </div>
                <div className="flex-row flex w-full flex-wrap">
                    {renderLairActionsControl(options.hasLair)}
                </div>
                <div className="flex-row flex w-full flex-wrap">
                    {renderRegionalEffectsControl(options.hasRegionEffects)}
                </div>
                <div className="flex-row w-full">
                    <SubmitButton buttonName="Create Creature" onClick={handleCreateCreature} />
                </div>
            </form>
    )
}

export default CreaturForm
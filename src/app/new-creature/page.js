'use client'
import AddButton from "@/components/AddButton/AddButton";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import ListBox from "@/components/ListBox/ListBox";
import ListInput from "@/components/ListInput/ListInput";
import { ChallengeRatings } from "@/utils/challengeRatingLookup";
import { isDiceNotation, averageRoll } from "@/utils/DiceParser/DiceParser";
import { createAbilities, createAction, createLegendaryAction, createSavingThrow, createSkill, initializeMonster } from "@/utils/Monster/monster";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page(props) {
    const [monster, setMonster] = useState(initializeMonster);
    const [validHitDie, setValidHitDie] = useState(false);
    const [validMovement, setValidMovement] = useState(true);
    const [movementSpeed, setMovementSpeed] = useState('');
    const [validStats, setValidStats] = useState({
        str: true,
        dex: true,
        con: true,
        int: true,
        wis: true,
        cha: true
    })
    const [options, setOptions] = useState({
        hasResistance: false,
        hasDamageImmunities: false,
        hasDamageVulnerabilities: false,
        hasConditionImmunities: false,
        hasAbilities: false,
        hasRegionEffects: false,
        isLegendary: false,
        isMythic: false
    })

    const [savingThrow, setSavingThrow] = useState(createSavingThrow('', 0))
    const [skill, setSkill] = useState(createSkill('', 0))
    const [sense, setSense] = useState('')
    const [language, setLanguage] = useState('')
    const [action, setAction] = useState(createAction('','Melee Weapon Attack',0,'',1, []))
    const [legendaryAction, setLegendaryAction] = useState(createLegendaryAction('',''))
    const [ability, setAbility] = useState(createAbilities('',''))
    const [hit, setHit] = useState({dieType: '', damageType: ''})

    useEffect(() => console.log(action), [action])

    useEffect(()=> {
        console.log(monster)

        
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
            
            validStats[event.target.id] = event.target.value !== '';
            setValidStats(validStats)
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
        if(monster.movementSpeed.some(ele => ele === movementSpeed)) {
            setValidMovement(false)
            return
        }

        const newMonster = {...monster}
        newMonster.movementSpeed.push(movementSpeed)
        setMovementSpeed('')
        setMonster(newMonster)
    }

    const handleRemoveMovementSpeed = (event, index) => {
        event.preventDefault()
        const newMonster = {...monster, movementSpeed: monster.movementSpeed.filter((ele, i) => i !== index)}
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
                    handleAdd={handleAddResistance}
                    type={'text'}
                    />
                </div>
                {
                    monster.damageResistances.length > 0 ?
                    (
                        <ListBox
                        items={monster.damageResistances}
                        handleDelete={items => {
                            const newMonster = {...monster, damageResistances: items}
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
                    handleAdd={handleAddDamageImmunity}
                    type={'text'}
                    />
                </div>
                {
                    monster.damageImmunities.length > 0 ?
                    (<ListBox
                    items={monster.damageImmunities}
                    handleDelete={items => {
                        const newMonster = {...monster, damageImmunities: items}
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
                    handleAdd={handleAddDamageVulnerability}
                    type={'text'}
                    />
                </div>
                {
                    monster.damageVulnerabilites.length > 0 ?
                    (
                        <ListBox
                        items={monster.damageVulnerabilites}
                        handleDelete={items => {
                            const newMonster = {...monster, damageVulnerabilites: items}
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
                    handleAdd={handleAddConditionImmunities}
                    type={'text'}
                    />
                </div>
                {
                    monster.conditionImmunities.length > 0 ?
                    (
                        <ListBox
                        items={monster.conditionImmunities}
                        handleDelete = {items => {
                            const newMonster = {...monster, conditionImmunities: items}
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
                        <div className="flex-row py-1">
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
                    onChange={e => setAbility({...ability, isAction: e.target.checked})}
                    />
                </div>
                <div className="flex-row">
                    <label>Description</label>
                </div>
                <div className="flex-row min-h-36">
                    <textarea
                    className="text-slate-950 w-full h-32"
                    value={ability.description}
                    onChange={e => setAbility({...ability, description: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && e.ctrlKey ? handleAddAbility(e) : e}
                    />
                </div>
                <div className="flex-row pb-2">
                    <button 
                    className="w-full text-center rounded border border-solid bg-slate-950 hover:bg-slate-400 hover:text-slate-950 hover:font-extrabold hover: border-slate-950 hover:border-l-2 hover:border-t-2" 
                    onClick={handleAddAbility}>Add Ability</button>
                </div>
            </>
        )
    }

    const renderLegendaryActionsControl = isLegendary => {
        if(!isLegendary) { return }

        return (
            <>
                <div className="flex-row text-xl">
                    <label>Legendary Actions</label>
                </div>
                {
                    monster.legendaryActions.length > 0 ?
                    (
                        <div className="flex-row py-1">
                            <hr className="bg-slate-50" />
                            <ul className="overflow-y-auto">
                                {
                                    monster.legendaryActions.map((ele,index) => {
                                        <li key={index}>
                                            <DeleteButton onClick={e => {
                                                e.preventDefault()
                                                setMonster({...monster, legendaryActions: monster.legendaryActions.filter((e,i) => i !== index)})
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
                <div className="flex-row">
                    <label>Name</label>
                    <input
                    type={'text'}
                    className="ml-1 w-full"
                    value={legendaryAction}
                    onChange={e => setLegendaryAction({...legendaryAction, name: e.target.value})}
                    />
                </div>

                <div className="flex-row">
                    <label>Description</label>
                </div>

                <div className="flex-row">
                    <textarea
                    className="text-slate-950 w-full h-32"
                    value={legendaryAction.description}
                    onChange={e => setLegendaryAction({...legendaryAction, description: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && e.ctrlKey ? handleAddLegendaryAction(e) : e}
                    />
                </div>
                <div className="flex-row pb-2">
                    <button 
                    className="w-full text-center rounded border border-solid bg-slate-950 hover:bg-slate-400 hover:text-slate-950 hover:font-extrabold hover: border-slate-950 hover:border-l-2 hover:border-t-2" 
                    onClick={handleAddLegendaryAction}>Add Legendary Action</button>
                </div>
            </>
        )
    }

    return (
        <div className="container py-3 mx-auto bg-slate-800 text-slate-50 rounded-xl">
            <Link className="px-8" href={'/'}>Home</Link>
            <form className="container p-8 mx-auto flex flex-wrap gap-x-3 gap-y-2 " onKeyDown={e => e.key === 'Enter' ? e.preventDefault() : e}>
                <div className="flex-row w-full text-center py-3 -mt-3">
                    <h1 className="text-xl mx-auto ">Create New Creature Statblock</h1>
                    
                    <hr className="bg-slate-50 h-1"/>
                    {/* Stat Block */}
                    <div className="w-[1000px] flex bg-[#FDF1DC] mx-auto flex-wrap text-red-900 text-left">
                        <div className="w-full flex-row self-start">
                            <hr className="bg-[#E69A28] h-2"/>
                        </div>

                        <div className="px-1 flex-col w-[50%] flex flex-wrap">
                            <div className="flex-row text-2xl">
                                <h2 ><strong>{monster.name}</strong></h2>
                            </div>
                            <div className="flex-row">
                                <h4><em>{`${monster.size} ${monster.race}, ${monster.alignment}`}</em></h4>
                            </div>
                            <div className="flex-row">
                                <hr className="bg-red-700 h-[3px]" />
                            </div>
                            <div className="flex-row">
                                <h4><strong>Armor Class</strong> {monster.armorClass} {monster.armorType !== '' ? `(${monster.armorType})`: ''}</h4>
                            </div>
                            <div>
                                <h4><strong>Hit Points</strong> {`${monster.hitPoints} (${monster.hitDie})`}</h4>
                            </div>
                            <div className="flex-row">
                                <h4><strong>Speed</strong> {monster.movementSpeed.join(', ')}</h4>
                            </div>
                            <div className="flex-row">
                                <hr className="bg-red-700 h-[3px]"/>
                            </div>
                            <div className="flex-row flex w-full text-center">
                                <div className="flex-col w-1/6">
                                    <h4><strong>STR</strong></h4>
                                    <h4>{monster.str} ({monster.str > 10 ? '+' : ''}{Math.floor((monster.str-10)/2)})</h4>
                                </div>
                                <div className="flex-col w-16">
                                    <h4><strong>DEX</strong></h4>
                                    <h4>{monster.dex} ({monster.dex > 10 ? '+' : ''}{Math.floor((monster.dex-10)/2)})</h4>
                                </div>
                                <div className="flex-col w-1/6">
                                    <h4><strong>CON</strong></h4>
                                    <h4>{monster.con} ({monster.con > 10 ? '+' : ''}{Math.floor((monster.con-10)/2)})</h4>
                                </div>
                                <div className="flex-col w-1/6">
                                    <h4><strong>INT</strong></h4>
                                    <h4>{monster.int} ({monster.int > 10 ? '+' : ''}{Math.floor((monster.int-10)/2)})</h4>
                                </div>
                                <div className="flex-col w-1/6">
                                    <h4><strong>WIS</strong></h4>
                                    <h4>{monster.wis} ({monster.wis > 10 ? '+' : ''}{Math.floor((monster.wis-10)/2)})</h4>
                                </div>
                                <div className="flex-col w-1/6">
                                    <h4><strong>CHA</strong></h4>
                                    <h4>{monster.cha} ({monster.cha > 10 ? '+' : ''}{Math.floor((monster.cha-10)/2)})</h4>
                                </div>
                            </div>
                            <div className="flex-row">
                                <hr className="bg-red-700 h-[3px]"/>
                            </div>
                            {
                                monster.savingThrows.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Saving Throws</strong> {monster.savingThrows.map(ele => `${ele.savingThrowType} ${ele.modifier > 0 ? "+" : ''} ${ele.modifier}`).join(", ")}</h4>
                                </div>
                                : undefined
                            }

                            {
                                monster.skills.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Skills</strong> {monster.skills.map(ele => `${ele.skillType} ${ele.modifier > 0 ? '+' : ''} ${ele.modifier}`).join(', ')}</h4>
                                </div>
                                : undefined
                            }

                            {
                                monster.damageImmunities.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Damage Immunities</strong> {monster.damageImmunities.join(', ')}</h4>
                                </div>
                                : undefined
                            }

                            {
                                monster.conditionImmunities.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Condition Immunities</strong> {monster.conditionImmunities.join(', ')}</h4>
                                </div>
                                : undefined
                            }

                            {
                                monster.senses.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Senses</strong> {monster.senses.join(', ')}</h4>
                                </div>
                                : undefined
                            }

                            {
                                monster.languages.length > 0 ?
                                <div className="flex-row">
                                    <h4><strong>Languages</strong> {monster.languages.join(', ')}</h4>
                                </div>
                                : undefined
                            }

                            <div className="flex-row">
                                <h4><strong>Challenge</strong> {monster.challenge} ({monster.experience.toLocaleString()} XP)</h4>
                            </div>
                            {/* work on adding skills, damage immunities, condition immunities, senses, languages, challenge */}
                        </div>

                        <div className="flex-col flex flex-wrap  w-[50%]">
                            <div className="flex-row">

                            </div>
                        </div>
                        
                        <div className="w-full flex-row self-end">
                            <hr className="bg-[#E69A28] h-2"/>
                        </div>
                    </div>
                    <hr className="bg-slate-50 h-1"/>
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
                        <input className="text-slate-950" id="race" type="text" value={monster.race} onChange={handleGeneralChange}></input>
                    </div>

                    {/* Alignment */}
                    <div className="flex-col flex">
                        <label htmlFor="alignment">Alignment</label>
                        <input className="text-slate-950" id="alignment" type="text" value={monster.alignment} onChange={handleGeneralChange}></input>
                    </div>

                    {/* Armor Class */}
                    <div className="flex-col flex">
                        <label htmlFor="armorClass">Armor Class</label>
                        <input className="text-slate-950" id="armorClass" type={'number'} min={1} value={monster.armorClass} onChange={handleGeneralChange}></input>
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
                            <input className="text-slate-950" id="movementSpeed" type={'text'} value={movementSpeed} onChange={e=>setMovementSpeed(e.target.value)} onKeyDown={e => e.key === 'Enter' ? handleAddMovementSpeed : e.key}></input>
                            <button className="px-2" onClick={handleAddMovementSpeed}>+</button>
                        </div>
                    </div>
                    
                    {/* Movement Speed */}
                    <div className="flex-col max-h-24 content-center">
                        <ul className="overflow-y-auto max-h-full">
                            {
                                monster.movementSpeed.map((ele, index) => {
                                    return(
                                        <li key={index}>
                                            {ele} 
                                            <button onClick={event => handleRemoveMovementSpeed(event, index)}>
                                                <svg 
                                                className="fill-slate-50 h-4 w-auto px-2"
                                                viewBox="0 0 122.88 122.88" 
                                                version="1.1" 
                                                id="Layer_1" 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                xmlnsXlink="http://www.w3.org/1999/xlink"  
                                                xmlSpace="preserve">
                                                    <g>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
                                                    </g>
                                                </svg>
                                            </button></li>
                                    )
                                })
                            }
                        </ul>
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
                            <input 
                            className="text-slate-950 mx-2 w-28 pl-2" 
                            type={'text'} value={savingThrow.savingThrowType} 
                            onChange={e => setSavingThrow({...savingThrow, savingThrowType: e.target.value})}
                            onKeyDown={e => e.key === 'Enter' ? e.preventDefault() : e}
                            ></input>
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
                        <div className="flex-row text-center overflow-y-auto max-h-14 ">
                            <ul>
                                {
                                    monster.savingThrows.map((ele, index) => {
                                        return (
                                            <li key={index}>
                                                {ele.savingThrowType} {ele.modifier > 0 ? '+' : ''}{ele.modifier}
                                                <button 
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        const newMonster = {...monster, savingThrows: monster.savingThrows.filter((ele,i) => i !== index)}
                                                        setMonster(newMonster)
                                                    }}
                                                >
                                                    <svg 
                                                    className="fill-slate-50 h-4 w-auto px-2"
                                                    viewBox="0 0 122.88 122.88" 
                                                    version="1.1" 
                                                    id="Layer_1" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"  
                                                    xmlSpace="preserve">
                                                        <g>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    
                    {/* Skills */}
                    <div className="flex flex-col">
                        <div className="flex-row py-2">
                            <label>Skill Type:</label>
                            <input 
                            className="text-slate-950 mx-2 w-28 pl-2"
                            type={'text'}
                            value={skill.skillType}
                            onChange={e => setSkill({...skill, skillType: e.target.value})}
                            onKeyDown={ e => e.key === 'Enter' ? e.preventDefault() : e}
                            ></input>
                            <label>Modifier:</label>
                            <input 
                            className="text-slate-950 ml-2 w-12"
                            step={1}
                            type={'number'}
                            value={isNaN(skill.modifier) ? '' : skill.modifier}
                            onChange={e => setSkill({...skill, modifier: e.target.value === ''? NaN : Number(e.target.value) })}
                            onKeyDown={e => e.key === 'Enter' ? handleAddSkill(e) : e}
                            ></input>
                            <button
                                className="px-2" 
                                onClick={handleAddSkill}
                                disabled={skill.skillType === '' || isNaN(skill.modifier) || skill.modifier === 0}
                            >+</button>
                        </div>
                        <div className="flex-row text-center overflow-y-auto max-h-14">
                            <ul>
                                {
                                    monster.skills.map((ele, index) => {
                                        return (
                                            <li key={index}>
                                                {ele.skillType} {ele.modifier >= 0 ? '+' : '-'}{ele.modifier}
                                                <button 
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        const newMonster = {...monster, skills: monster.skills.filter((e,i) => i !== index)}
                                                        setMonster(newMonster)
                                                    }}
                                                >
                                                    <svg 
                                                    className="fill-slate-50 h-4 w-auto px-2"
                                                    viewBox="0 0 122.88 122.88" 
                                                    version="1.1" 
                                                    id="Layer_1" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"  
                                                    xmlSpace="preserve">
                                                        <g>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
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
                        <div className="flex-row overflow-y-auto">
                            <ul>
                                {
                                    monster.senses.map((ele) => {
                                        return (
                                            <li key={ele}>
                                                {ele} 
                                                <button 
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    const newMonster = {...monster, senses: monster.senses.filter((el) => el !== ele)}
                                                    setMonster(newMonster)
                                                }}
                                                >
                                                    <svg 
                                                    className="fill-slate-50 h-4 w-auto px-2"
                                                    viewBox="0 0 122.88 122.88" 
                                                    version="1.1" 
                                                    id="Layer_1" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"  
                                                    xmlSpace="preserve">
                                                        <g>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col max-h-36">
                        <div className="flex-row py-2">
                            <label>Languages</label>
                            <input
                            className="text-slate-950 mx-2 w-52 pl-2"
                            type={'text'}
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                            onKeyDown={e => e.key === "Enter" ? handleAddLanguage(e) : e.key}
                            ></input>
                            <button
                            className="px-2"
                            onClick={handleAddLanguage}
                            disabled={language === '' || monster.languages.some(ele => ele === language)}
                            >+</button>
                        </div>
                        {/* Language List */}
                        <div className="flex-row overflow-y-auto">
                            <ul>
                                {
                                    monster.languages.map((ele) => {
                                        return (
                                            <li key={ele}>
                                                {ele} 
                                                <button 
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    const newMonster = {...monster, languages: monster.languages.filter((el) => el !== ele)}
                                                    setMonster(newMonster)
                                                }}
                                                >
                                                    <svg 
                                                    className="fill-slate-50 h-4 w-auto px-2"
                                                    viewBox="0 0 122.88 122.88" 
                                                    version="1.1" 
                                                    id="Layer_1" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"  
                                                    xmlSpace="preserve">
                                                        <g>
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    {/* Challenge /  Experience */}
                    <div className="flex flex-col">
                        <div className="flex-row py-2">
                            <label>Challenge</label>
                            <select
                            className="text-slate-950 mx-2 w-fit pl-2"
                            type={'text'}
                            value={monster.challenge}
                            onChange={handleChallengeChange}
                            >
                                {Object.keys(ChallengeRatings).map(ele => <option key={ele}>{ele}</option>)}
                            </select>
                            <label>{monster.experience.toLocaleString()} XP</label>
                        </div>
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
                                                        <strong>{ele.name}.</strong> <em>{ele.attackType}</em>: {ele.modifier >= 0 ? '+' : '-'}{ele.modifier} to hit, {ele.reach}., {ele.targets} target{ele.targets > 1 ? 's' : ''}, <em>Hit:</em> {ele.hits.map(e => `${averageRoll(e.dieType)} (${e.dieType}) ${e.damageType} damage`).join('and')}
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
                        <div className="flex-row">
                            <h3>Hits</h3>
                            <hr className="bg-slate-50" />
                            {/* Hits list */}
                            <div className="flex-row py-2 max-h-32 overflow-y-auto w-full">
                                <ul>
                                    {
                                        action.hits.map((ele, index) => {
                                            return (
                                                <li key={index}>
                                                    {ele.dieType} {ele.damageType}
                                                    <button
                                                    onClick={e => setAction({...action, hits: action.hits.filter((e, i) => i !== index)})}>
                                                        <svg 
                                                        className="fill-slate-50 h-4 w-auto px-2"
                                                        viewBox="0 0 122.88 122.88" 
                                                        version="1.1" 
                                                        id="Layer_1" 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"  
                                                        xmlSpace="preserve">
                                                            <g>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
                                                            </g>
                                                        </svg>
                                                    </button>
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
                                    <input
                                    id="damageType"
                                    className="text-slate-950 mx-1"
                                    type={'text'}
                                    value={hit.damageType}
                                    onChange={e => setHit({...hit, damageType: e.target.value})}
                                    onKeyDown={e => e.key === 'Enter' ? handleAddHit : e}
                                    ></input>

                                    <button
                                    disabled={hit.damageType === '' || hit.dieType === '' || !isDiceNotation(hit.dieType)}
                                    onClick={handleAddHit}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                        </div>
                        
                        {/* Add Action Button */}
                        <div className="w-full">
                            <div className="mx-auto w-fit">
                                <button
                                className="bg-slate-400 border border-solid border-slate-900 rounded p-2 mx-auto text-slate-950 hover:bg-slate-300"
                                onClick={e => {
                                    e.preventDefault()
                                    let newMonster = {...monster}
                                    newMonster.actions.push(action)
                                    setMonster(newMonster)
                                    setAction(createAction('','',0,'',0,[]))
                                }}
                                >
                                    Add Action
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Optionals */}
                {/* Lets have this section create new sections above when checked */}
                {/* Need to refactor to take some of the copied code and convert into reusable component */}
                {/* 
                    May need to clean up some of the states that are being stored and even move them to their child components 
                    as code is refactored to help reduce the amount of copied code. This will make it easier to update the UI
                    as it progresses
                */}
                <div className="flex-row flex gap-2 flex-wrap w-full border border-solid">
                    <div className="flex-col border border-solid justify-items-end">
                        <div className="flex-row flex-grow text-right">
                            <label>Damage Resistances?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            value={options.hasResistance} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasResistance', 'damageResistances')} />
                        </div>
                        <div className="flex-row text-right">
                            <label>Damage Immunities?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            value={options.hasDamageImmunities} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasDamageImmunities', 'damageImmunities')}/>
                        </div>
                        <div className="flex-row text-right">
                            <label>Damage Vulnerabilities?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            value={options.hasDamageVulnerabilities} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasDamageVulnerabilities','damageVulnerabilites')}/>
                        </div>
                        <div className="flex-row text-right">
                            <label>Condition Immunities?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            value={options.hasConditionImmunities} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasConditionImmunities', 'conditionImmunities')}></input>
                        </div>
                    </div>
                    <div className="flex-col">
                        {renderResitanceControl(options.hasResistance)}
                    </div>
                    <div className="flex-col">
                        {renderDamageImmunitiesControl(options.hasDamageImmunities)}
                    </div>
                    <div className="flex-col">
                        {renderDamageVulnerabilitesControl(options.hasDamageVulnerabilities)}
                    </div>
                    <div className="flex-col">
                        {renderConditionImmunitiesControl(options.hasConditionImmunities)}
                    </div>
                </div>
                <div className="flex-row flex gap-2 flex-wrap w-full border border-solid">
                    <div className="flex-col border border-solid justify-items-end">
                        <div className="flex-row text-right">
                            <label>Abilities?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            value={options.hasAbilities} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasAbilities', 'abilities')}/>
                        </div>
                        <div className="flex-row text-right">
                            <label>Regional Effects?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            value={options.hasRegionEffects} 
                            onChange={e => handleOptionChange(e.target.checked, 'hasRegionEffects', 'regionalEffects')}/>
                        </div>
                        <div className="flex-row text-right">
                            <label>Legendary?</label>
                            <input 
                            className="ml-2" 
                            type={'checkbox'} 
                            value={options.isLegendary} 
                            onChange={e => handleOptionChange(e.target.checked, 'isLegendary', 'legendaryActions')}/>
                        </div>
                        <div className="flex-row text-right">
                            <label>Mythic?</label>
                            <input className="ml-2" type={'checkbox'} value={options.isMythic} onChange={e => setOptions({...options, isMythic: e.target.value})}></input>
                        </div>
                    </div>

                    <div className="flex-col w-96 mx-2">
                        {renderAbilitiesControl(options.hasAbilities)}
                    </div>

                    <div className="flex-col w-96 mx-2">
                        {renderLegendaryActionsControl(options.isLegendary)}
                    </div>
                </div>
            </form>
        </div>
    )
}

// Work on finishing legendary actions
// Add legendary description textarea
// Move abilities section above Actions
// Move Resistances, Immunities, and Vulnerabilities section to below Senses scection
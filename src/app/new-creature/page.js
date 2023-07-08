'use client'
import { isDiceNotation, averageRoll } from "@/utils/DiceParser/DiceParser";
import { createAction, createSavingThrow, createSkill, initializeMonster } from "@/utils/Monster/monster";
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
    const [action, setAction] = useState(createAction('','Melee Weapon Attack',0,'',1, []))
    const [hit, setHit] = useState({dieType: '', damageType: ''})

    useEffect(() => console.log(action), [action])

    useEffect(()=> {
        console.log(monster)

        
        if(validHitDie === isDiceNotation(monster.hitDie)){return}
        setValidHitDie(isDiceNotation(monster.hitDie))

        
        
    },[monster])

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

    return (
        <div className="container py-3 mx-auto bg-slate-800 text-slate-50 rounded-xl">
            <Link className="px-8" href={'/'}>Home</Link>
            <form className="container p-8 mx-auto flex flex-wrap gap-x-3 gap-y-2 ">
                <div className="flex-row w-full text-center py-3 -mt-3">
                    <h1 className="text-xl mx-auto ">Create New Creature Statblock</h1>
                    <hr className="bg-slate-50 h-1"/>
                </div>
                
                <div className=" flex gap-2 flex-row flex-wrap">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label htmlFor="name">Name:</label>
                        <input className="text-slate-950" id="name" type={'text'} value={monster.name} onChange={handleGeneralChange}></input>
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
                            <input className="text-slate-950" id="movementSpeed" type={'text'} value={movementSpeed} onChange={e=>setMovementSpeed(e.target.value)}></input>
                            <button className="px-2" onClick={handleAddMovementSpeed}>+</button>
                        </div>
                    </div>
                    
                    {/* Movement Speed */}
                    <div className="flex-col max-h-16 content-center">
                        <ul className="overflow-y-auto  max-h-full">
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
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
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
                            <input className="text-slate-950 mx-2 w-28 pl-2" type={'text'} value={savingThrow.savingThrowType} onChange={e => setSavingThrow({...savingThrow, savingThrowType: e.target.value})}></input>
                            <label>Modifier:</label>
                            <input className="text-slate-950 ml-2 w-12" step={1} type={'number'} value={isNaN(savingThrow.modifier) ? '' : savingThrow.modifier} onChange={e => setSavingThrow({...savingThrow, modifier: e.target.value === ''? NaN : Number(e.target.value) })}></input>
                            <button 
                                onClick={() => {
                                    const newMonster = {...monster}
                                    newMonster.savingThrows.push({...savingThrow})
                                    setSavingThrow(createSavingThrow('', 0))
                                    setMonster(newMonster)
                                }}
                                disabled={savingThrow.savingThrowType === '' || isNaN(savingThrow.modifier) || savingThrow.modifier === 0}
                            >+</button>
                        </div>
                        <div className="flex-row text-center overflow-y-auto max-h-14 ">
                            <ul>
                                {
                                    monster.savingThrows.map((ele, index) => {
                                        return (
                                            <li key={index}>
                                                {ele.savingThrowType} {ele.modifier < 0 ? '-' : '+'}{ele.modifier}
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
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
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
                            ></input>
                            <label>Modifier:</label>
                            <input 
                            className="text-slate-950 ml-2 w-12"
                            step={1}
                            type={'number'}
                            value={isNaN(skill.modifier) ? '' : skill.modifier}
                            onChange={e => setSkill({...skill, modifier: e.target.value === ''? NaN : Number(e.target.value) })}

                            ></input>
                            <button 
                                onClick={() => {
                                    const newMonster = {...monster}
                                    newMonster.skills.push({...skill})
                                    setSkill(createSkill('', 0))
                                    setMonster(newMonster)
                                }}
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
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
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
                </div>
                {/* Actions */}
                <div className="flex-row flex gap-2 flex-wrap w-full">
                    <div className="w-full">
                        <h2 className="text-lg">Actions</h2>
                        <svg className="h-2 w-full  fill-slate-50 m-0">
                            <polyline className="xl:scale-[1.85] lg:scale-[1.25] md:scale-100 sm:scale-75" points="0,0 800,2.5 0,5"></polyline>
                        </svg>
                        <div className="py-2 flex-row">
                            <label>Action Name:</label>
                            <input className="text-slate-950 mx-1" type={'text'} value={action.name} onChange={e => setAction({...action, name: e.target.value})}></input>
                            
                            <label>Attack Type:</label>
                            <select className="text-slate-950 mx-1 w-fit" value={action.attackType} onChange={e => setAction({...action, attackType: e.target.value})}>
                                <option>Melee Weapon Attack</option>
                                <option>Ranged Weapon Attack</option>
                                <option>Melee and Ranged Weapon Attack</option>
                            </select>
                            <label>Modifier:</label>
                            <input 
                            className="text-slate-950 mx-1 w-12" 
                            type={'number'} 
                            maxLength={2} 
                            min={0} 
                            step={1} 
                            value={isNaN(action.modifier) ? '' : action.modifier} 
                            onChange={e => setAction({...action, modifier: e.target.value === '' ? NaN : Number(e.target.value)})}></input>
                            <label>Reach:</label>
                            <input
                            className="text-slate-950 mx-1"
                            type={'text'}
                            value={action.reach}
                            onChange={e => setAction({...action, reach: e.target.value})}></input>
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
                        <div className="flex-row py-2">
                            <h3>Hits</h3>
                            <hr className="bg-slate-50" />
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
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
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
                            <div className="my-2">
                                <label>Die Type</label>
                                <input
                                className="text-slate-950 mx-1"
                                type={'text'}
                                value={hit.dieType}
                                onChange={e => {setHit({...hit, dieType: e.target.value})}}></input>
                                <label>Damage Types:</label>
                                <input
                                className="text-slate-950 mx-1"
                                type={'text'}
                                value={hit.damageType}
                                onChange={e => setHit({...hit, damageType: e.target.value})}></input>

                                <button
                                disabled={hit.damageType === '' || hit.dieType === '' || !isDiceNotation(hit.dieType)}
                                onClick={e => {
                                    e.preventDefault()
                                    const newAction = {...action}
                                    newAction.hits.push(hit)
                                    setAction(newAction)
                                    setHit({dieType: '', damageType: ''})
                                }}
                                >
                                    +
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
                    <div className="flex-col border border-solid justify-items-end just">
                        <div className="flex-row flex-grow text-right">
                            <label>Damage Resistances?</label>
                            <input className="ml-2" type={'checkbox'} value={options.hasResistance} onChange={e => setOptions({...options, hasResistance: e.target.value})}></input>
                        </div>
                        <div className="flex-row text-right">
                            <label>Damage Immunities?</label>
                            <input className="ml-2" type={'checkbox'} value={options.hasDamageImmunities} onChange={e => setOptions({...options, hasDamageImmunities: e.target.value})}></input>
                        </div>
                        <div className="flex-row text-right">
                            <label>Damage Vulnerabilities?</label>
                            <input className="ml-2" type={'checkbox'} value={options.hasDamageVulnerabilities} onChange={e => setOptions({...options, hasDamageVulnerabilities: e.target.value})}></input>
                        </div>
                        <div className="flex-row text-right">
                            <label>Condition Immunities?</label>
                            <input className="ml-2" type={'checkbox'} value={options.hasConditionImmunities} onChange={e => setOptions({...options, hasConditionImmunities: e.target.value})}></input>
                        </div>
                        <div className="flex-row text-right">
                            <label>Abilities?</label>
                            <input className="ml-2" type={'checkbox'} value={options.hasAbilities} onChange={e => setOptions({...options, hasAbilities: e.target.value})}></input>
                        </div>
                        <div className="flex-row text-right">
                            <label>Regional Effects?</label>
                            <input className="ml-2" type={'checkbox'} value={options.hasRegionEffects} onChange={e => setOptions({...options, hasRegionEffects: e.target.value})}></input>
                        </div>
                        <div className="flex-row text-right">
                            <label>Legendary?</label>
                            <input className="ml-2" type={'checkbox'} value={options.isLegendary} onChange={e => setOptions({...options, isLegendary: e.target.value})}></input>
                        </div>
                        <div className="flex-row text-right">
                            <label>Mythic?</label>
                            <input className="ml-2" type={'checkbox'} value={options.isMythic} onChange={e => setOptions({...options, isMythic: e.target.value})}></input>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
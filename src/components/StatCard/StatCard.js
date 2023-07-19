'use client'

import DeleteButton from "../DeleteButton/DeleteButton"
import StatBlockButton from "../StatBlockButton/StatBlockButton"

// Fix damange and heal functions of the Statblock so that it works with changing the creature provided by the page element

const StatCard = ({creature, index, onCreatureUpdate, handleDelete, showStatBlock}) => {

    const handleDamageClick = () => {
        const newMonster = {...creature}

        newMonster.currentHitPoints -= newMonster.damage
        newMonster.currentHitPoints = Math.max(newMonster.currentHitPoints, 0)
        newMonster.damage = 0

        onCreatureUpdate(index, newMonster)
    }

    const handleDamageInput = event => {
        const newMonster = {...creature}

        newMonster.damage = Number(event.target.value)

        onCreatureUpdate(index, newMonster)
    }

    const handleHealClick = () => {
        const newMonster = {...creature}

        newMonster.currentHitPoints = Math.min(newMonster.currentHitPoints + newMonster.heal, newMonster.maxHitPoints)
        newMonster.heal = 0

        onCreatureUpdate(index, newMonster)

    }

    const handleHealInput = event => {
        const newMonster = {...creature}

        newMonster.heal = Number(event.target.value)

        onCreatureUpdate(index, newMonster)
    }

    return (
        creature ? (
            <div className="pb-3 pt-1 px-2 border rounded-xl w-full my-2 bg-slate-300">
                <div className="flex">
                    <h1 className="text-3xl py-2">{`${creature.name}`}</h1>
                    {
                        creature.id_name !== '' ? <StatBlockButton onClick={()=>showStatBlock(creature.id_name)} /> : undefined
                    }
                    <DeleteButton onClick={() => handleDelete(index)} className={'fill-slate-900 h-5 w-auto px-2'}/>
                </div>
                <hr className="border-none bg-gradient-to-r from-slate-950 h-2 after:h-0" content=""/>
                <p><strong>Max Hit Points:</strong> {creature.maxHitPoints}</p>
                <p><strong>Current Hit Points:</strong> {creature.currentHitPoints}</p>
                <p><strong>AC:</strong> {creature.armorClass}</p>
                <p><strong>Initiative:</strong> {creature.initiative}</p>

                <div className="flex">
                    <div className="flex-row">
                            <button onClick={handleDamageClick} >
                                <svg 
                                className="fill-red-600 h-6 w-auto -mb-2" 
                                viewBox="0 0 32 32" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <g id="Group_9" data-name="Group 9" transform="translate(-309.999 -468.195)">
                                        <path id="Path_379" data-name="Path 379" d="M341.292,473.692A8.99,8.99,0,0,0,333,468.2a7.682,7.682,0,0,0-3.5.864,9.591,9.591,0,0,0-2.861,2.272c-.225.26-.435.534-.636.816-.2-.282-.411-.556-.636-.816a9.6,9.6,0,0,0-2.861-2.272,7.687,7.687,0,0,0-3.5-.864,9,9,0,0,0-6.364,15.365c.815.813,12.288,11.179,13.364,11.635,1.077-.456,12.55-10.822,13.365-11.635a9.014,9.014,0,0,0,1.928-9.868ZM328,478.7h4v4H320v-4h8Z"/>
                                    </g>
                                </svg>
                            </button>
                            <input onKeyDown={event => event.key === 'Enter' && handleDamageClick()} className="px-0 mx-2 border-slate-900 border-solid border rounded w-14" type="number" onChange={handleDamageInput} value={creature.damage || ''} />
                            <button onClick={handleHealClick}>
                                <svg
                                className="fill-red-600 h-6 w-auto -mb-2"
                                viewBox="0 0 32 32"                               
                                xmlns="http://www.w3.org/2000/svg">
                                    <g id="Group_10" data-name="Group 10" transform="translate(-238.002 -468.195)">
                                        <path id="Path_378" data-name="Path 378" d="M269.3,473.692A8.99,8.99,0,0,0,261,468.2a7.686,7.686,0,0,0-3.5.864,9.587,9.587,0,0,0-2.86,2.272c-.226.26-.436.534-.637.816-.2-.282-.41-.556-.636-.816a9.6,9.6,0,0,0-2.86-2.272,7.69,7.69,0,0,0-3.5-.864,9,9,0,0,0-6.364,15.365c.814.813,12.288,11.179,13.364,11.635,1.076-.456,12.55-10.822,13.364-11.635a9.012,9.012,0,0,0,1.929-9.868ZM260,483.7h-4v4h-4v-4h-4v-4h4v-4h4v4h4Z"/>
                                    </g>
                                </svg>
                            </button>
                            <input onKeyDown={event => event.key === 'Enter' && handleHealClick()} className="px-0 mx-2 border-slate-900 border-solid border rounded w-14" type="number" value={creature.heal || ''} onChange={handleHealInput}/>
                    </div>
                </div>
                
            </div>
        ) : undefined
    )
}

export default StatCard
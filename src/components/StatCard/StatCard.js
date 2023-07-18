'use client'

// Fix damange and heal functions of the Statblock so that it works with changing the creature provided by the page element

const StatCard = (props) => {

    const handleDamageClick = () => {
        const newMonster = {...props.creature}

        newMonster.currentHitPoints -= newMonster.damage
        newMonster.currentHitPoints = Math.max(newMonster.currentHitPoints, 0)
        newMonster.damage = 0

        props.onCreatureUpdate(props.index, newMonster)
    }

    const handleDamageInput = event => {
        const newMonster = {...props.creature}

        newMonster.damage = Number(event.target.value)

        props.onCreatureUpdate(props.index, newMonster)
    }

    const handleHealClick = () => {
        const newMonster = {...props.creature}

        newMonster.currentHitPoints = Math.min(newMonster.currentHitPoints + newMonster.heal, newMonster.maxHitPoints)
        newMonster.heal = 0

        props.onCreatureUpdate(props.index, newMonster)

    }

    const handleHealInput = event => {
        const newMonster = {...props.creature}

        newMonster.heal = Number(event.target.value)

        props.onCreatureUpdate(props.index, newMonster)
    }

    return (
        props.creature ? (
            <div className="pb-3 pt-1 px-2 border rounded-xl w-full my-2 bg-slate-300">
                <div className="flex">
                    <h1 className="text-3xl py-2">{`${props.creature.name}`}</h1>
                    <button title="Add creature" aria-label="Add creature" aria-required="true" onClick={() => props.handleDelete(props.index)}>
                        <svg 
                            className="fill-slate-950 h-6 w-auto px-2"
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
                </div>
                <hr className="border-none bg-gradient-to-r from-slate-950 h-2 after:h-0" content=""/>
                <p><strong>Max Hit Points:</strong> {props.creature.maxHitPoints}</p>
                <p><strong>Current Hit Points:</strong> {props.creature.currentHitPoints}</p>
                <p><strong>AC:</strong> {props.creature.armorClass}</p>
                <p><strong>Initiative:</strong> {props.creature.initiative}</p>

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
                            <input onKeyDown={event => event.key === 'Enter' && handleDamageClick()} className="px-0 mx-2 border-slate-900 border-solid border rounded w-14" type="number" onChange={handleDamageInput} value={props.creature.damage || ''} />
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
                            <input onKeyDown={event => event.key === 'Enter' && handleHealClick()} className="px-0 mx-2 border-slate-900 border-solid border rounded w-14" type="number" value={props.creature.heal || ''} onChange={handleHealInput}/>
                    </div>
                </div>
                
            </div>
        ) : undefined
    )
}

export default StatCard
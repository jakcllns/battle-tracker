'use client'

// Fix damange and heal functions of the Statblock so that it works with changing the creature provided by the page element

const Statblock = (props) => {

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
        <>
            {props.creature ? (
                <div key={props.index}>
                    <h1 className="text-3xl">{`${props.creature.name}`}</h1>
                    <p><strong>Max Hit Points:</strong> {props.creature.maxHitPoints}</p>
                    <p><strong>Current Hit Points:</strong> {props.creature.currentHitPoints}</p>
                    <p><strong>AC:</strong> {props.creature.armorClass}</p>
                    <p><strong>Initiative:</strong> {props.creature.initiative}</p>

                    <button onClick={handleDamageClick}>Damage</button>
                    <input onKeyDown={event => event.key === 'Enter' && handleDamageClick()} className="px-0 mx-2 border-slate-900 border-solid border rounded" type="number" onChange={handleDamageInput} value={props.creature.damage || ''} />
                    <br/>
                    <button onClick={handleHealClick}>Heal</button>
                    <input onKeyDown={event => event.key === 'Enter' && handleHealClick()} className="px-0 mx-2 border-slate-900 border-solid border rounded" type="number" value={props.creature.heal || ''} onChange={handleHealInput}/>
                </div>
            ) : undefined}
        </>
    )
}

export default Statblock
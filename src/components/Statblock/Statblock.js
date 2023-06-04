'use client'

import { useEffect, useState } from "react"
import Dice from "@/utils/DiceParser/DiceParser"

const Statblock = (props) => {
    const [monster, setMonster] = useState(undefined)

    useEffect(() => {
        fetch(`api/monsters/${props.monsterid}`, {cache: 'no-store'})
            .then(res => {
                return res.json()
            })
            .then(data => {
                const hitPoints = new Dice(data.HitDie).roll().result
                const fetchedMonster =  {
                    name: data.Name,
                    maxHitPoints: hitPoints,
                    currentHitPoints: hitPoints,
                    armorClass: data.ArmorClass,
                    initiative: Math.floor((data.DEX-10)/2) + new Dice('1d20').roll().result,
                    damage: 0,
                    heal: 0,
                    condition: []
                }
 
                setMonster(fetchedMonster)
            })

    },[])

    const handleDamageClick = () => {
        const newMonster = {...monster}

        newMonster.currentHitPoints -= newMonster.damage
        newMonster.currentHitPoints = Math.max(newMonster.currentHitPoints, 0)
        newMonster.damage = 0

        setMonster(newMonster)
    }

    const handleDamageInput = event => {
        const newMonster = {...monster}

        newMonster.damage = Number(event.target.value)

        setMonster(newMonster)
    }

    const handleHealClick = () => {
        const newMonster = {...monster}

        newMonster.currentHitPoints = Math.min(newMonster.currentHitPoints + newMonster.heal, newMonster.maxHitPoints)
        newMonster.heal = 0

        setMonster(newMonster)

    }

    const handleHealInput = event => {
        const newMonster = {...monster}

        newMonster.heal = Number(event.target.value)

        setMonster(newMonster)
    }

    return (
        <>
            {monster ? (
                <div>
                    <h1 className="text-3xl">{monster.name}</h1>
                    <p><strong>Max Hit Points:</strong> {monster.maxHitPoints}</p>
                    <p><strong>Current Hit Points:</strong> {monster.currentHitPoints}</p>
                    <p><strong>AC:</strong> {monster.armorClass}</p>
                    <p><strong>Initiative:</strong> {monster.initiative}</p>

                    <button onClick={handleDamageClick}>Damage</button>
                    <input className="px-0 mx-2 border-slate-900 border-solid border rounded" type="number" onChange={handleDamageInput} value={monster.damage || ''} />
                    <br/>
                    <button onClick={handleHealClick}>Heal</button>
                    <input className="px-0 mx-2 border-slate-900 border-solid border rounded" type="number" value={monster.heal || ''} onChange={handleHealInput}/>
                </div>
            ) : undefined}
        </>
    )
}

export default Statblock
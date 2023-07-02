'use client'
import AddCreature from "@/components/AddCreature/AddCreature";
import Statblock from "@/components/Statblock/Statblock";
import Dice from "@/utils/DiceParser/DiceParser";
import { useState, useEffect, useCallback } from "react";


export default function Page(props){
    const [data, setData] = useState([])
    const [creatures, setCreatures] = useState([]);

    useEffect(() => {
        fetch(`api/monsters`, {cache: 'no-store'})
            .then(res => {
                return res.json()
            })
            .then(data => {                
                setData(data)
            })

    },[])

    const handleCreatureSubmit = creature => {
        const newCreatures = [...creatures]
        let hitPoints = 0

        console.log(`Current creature: ${creature.Name}`);

        if(creature.HitPoints > 0) {
            hitPoints = creature.HitPoints
        } else {
            console.log()
            hitPoints = new Dice(creature.HitDie).roll().result
        }
        
        for(let i = 0; i < creature.multiply; i++) {            
            const fullCreature = {
                name: `${creature.Name} ` + (creature.multiply !== 1 ? i+1 : ''),
                maxHitPoints: hitPoints,
                currentHitPoints: hitPoints,
                initiative: typeof creature.initiative === 'number' ? creature.initiative : new Dice(creature.initiative).roll().result,
                armorClass: creature.ArmorClass,
                id_name: creature.id_name,
                damage: 0, 
                heal: 0, 
                conditions: []
            }
            console.log(`Current creature: ${fullCreature.name}`)
            newCreatures.push(fullCreature)
        }

        newCreatures.sort((a, b) => {
            return a.initiative - b.initiative
        }).reverse()
        
        console.log(...newCreatures)
        setCreatures([...newCreatures])
    }

    const onCreatureUpdate = (index, creature) => {
        const newCreatures = [...creatures]
        newCreatures[index] =  creature
        setCreatures(newCreatures);
    }

    const creaturesList = useCallback(() =>{
       return creatures.length > 0 ? creatures.map(
            (creature, index) => {
                return (
                    <Statblock
                        creature={creature}
                        index={index}
                        onCreatureUpdate={onCreatureUpdate}
                    />
                )
            }
        ) : undefined
    },[creatures])
    return(
        <>
        <h1>Battle Tracker</h1>
            <AddCreature data={data} handleCreatureSubmit={handleCreatureSubmit}/>
            {
                creaturesList()
            }
        </>
    )
} 
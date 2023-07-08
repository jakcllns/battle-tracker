'use client'
import AddCreature from "@/components/AddCreature/AddCreature";
import Statblock from "@/components/Statblock/Statblock";
import Dice from "@/utils/DiceParser/DiceParser";
import Link from "next/link";
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

    const onCreatureDelete = (index) => {
      const newCreatures = creatures.filter((ele, i) => i !== index);
      setCreatures(newCreatures);
    }

    const creaturesList = useCallback(() =>{
       return creatures.length > 0 ? creatures.map(
            (creature, index) => {
                return (
                    <Statblock
                        key={index}
                        creature={creature}
                        index={index}
                        onCreatureUpdate={onCreatureUpdate}
                        handleDelete={onCreatureDelete}
                    />
                )
            }
        ) : undefined
    },[creatures])
    return(
      <>
        <div className="container w-auto mx-auto p-4 bg-slate-800 text-slate-50 rounded-t-2xl">
          <Link href={'/new-creature'}>Create New Creature</Link>
          <h1 className="text-xl xl:mx-3 md:mx-auto w-fit">Battle Tracker</h1>
          <AddCreature data={data} handleCreatureSubmit={handleCreatureSubmit}/>
        </div>
        <div className="container w-auto mx-auto  text-slate-950 rounded-b-2xl">
          {  
            creaturesList()
          }
        </div>
        </>
    )
} 
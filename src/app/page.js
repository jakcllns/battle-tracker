'use client'
import AddCreature from "@/components/AddCreature/AddCreature";
import StatBlock from "@/components/StatBlock/StatBlock";
import StatCard from "@/components/StatCard/StatCard";
import Dice from "@/utils/DiceParser/DiceParser";
import { useState, useEffect, useCallback } from "react";

const fetchMonster = async id_name => {
    const result = fetch('https://localhost:4000/graphql',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `{
                monster(id_name: "${id_name}") {
                    _id
                    id_name
                    name
                    size
                    race
                    alignment
                    armorClass
                    armorType
                    hitPoints
                    hitDie
                    movementSpeed
                    str
                    dex
                    con
                    int
                    wis
                    cha
                    savingThrows {
                        savingThrowType
                        modifier
                    }
                    skills {
                        skillType
                        modifier
                    }
                    damageResistances
                    legendaryResistances
                    damageImmunities
                    conditionImmunities
                    damageVulnerabilities
                    senses
                    languages
                    challenge
                    experience
                    abilities {
                        name
                        description
                        isAction
                    }
                    actions {
                        name
                        attackType
                        modifier
                        reach
                        targets
                        hits {
                        dieType
                        damageType
                        }
                        description
                    }
                    legendaryDescription
                    legendaryActions {
                        name
                        description
                    }
                    lairDescription
                    lairActions {
                        name
                        description
                    }
                    regionalDescription
                    regionalEffects {
                        name
                        description
                    }
                        mythicDescription
                    mythicActions {
                        name
                        description
                    }
                    }
                }`
            }),
            cache: "no-cache"
    }).then(res => res.json())
    .then(res => {
        if(res.errors){
            console.log("error")
            throw new Error(res.errors)
        }

        return res.data.monster
    })
    .catch(err => console.log(err))
    return result
}


export default function Page(props){
    const [data, setData] = useState([])
    const [creatures, setCreatures] = useState([]);
    const [creature, setCreature] = useState(undefined);

    useEffect(() => {
        fetch('https://localhost:4000/graphql',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{
                    monsters {
                        id_name
                        name
                        hitPoints
                        hitDie
                        dex
                        armorClass
                      }
                  }`
              })
        }).then(res => res.json())
        .then(({data}) => setData(data.monsters))
        .catch(err => console.log(err))

    },[])

    const handleCreatureSubmit = creature => {
        const newCreatures = [...creatures]
        let hitPoints = 0

        console.log(`Current creature: ${creature}`);

        if(creature.HitPoints > 0) {
            hitPoints = creature.hitPoints
        } else {
            console.log()
            hitPoints = new Dice(creature.hitDie).roll().result
        }
        
        for(let i = 0; i < creature.multiply; i++) {            
            const fullCreature = {
                name: `${creature.name} ` + (creature.multiply !== 1 ? i+1 : ''),
                maxHitPoints: hitPoints,
                currentHitPoints: hitPoints,
                initiative: typeof creature.initiative === 'number' ? creature.initiative : new Dice(creature.initiative).roll().result,
                armorClass: creature.armorClass,
                id_name: creature.id_name,
                damage: 0, 
                heal: 0, 
                conditions: [],
                id_name: creature.id_name
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
                    <StatCard
                        key={index}
                        creature={creature}
                        index={index}
                        onCreatureUpdate={onCreatureUpdate}
                        handleDelete={onCreatureDelete}
                        showStatBlock={showStatBlock}
                    />
                )
            }
        ) : undefined
    },[creatures])

    const showStatBlock = id_name => {
        const m = fetchMonster(id_name).then(res => setCreature(res))
        
        // console.log(id_name)
        // fetch(`api/new-monsters/${id_name}`, {method: 'GET'})
        // .then( res => res.json())
        // .then(m => {
        //     console.log(m)
        //     setCreature(m)
        // })
    }
    return(
      <>
        {
            creature !== undefined ? (
                <>
                <div className="bg-slate-950 opacity-20 w-[100vw] h-[100vh] z-0 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 absolute" onClick={() => setCreature(undefined)}>
                    
                </div>
                <div className="opacity-100 z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-h-[50vh] lg:max-h-[100vh] max-w-[100vw] overflow-auto text-xs">
                    <button 
                    className="fixed left-[100%] -translate-x-[17px] font-bold  px-1 rounded-b bg-gray-400 "
                    onClick={e => {
                        e.preventDefault()
                        setCreature(undefined)
                    }}
                    >X</button>
                    <StatBlock monster={creature} />
                </div>
                </>
            ): undefined
        }
        <div className="container w-auto mx-auto p-4 bg-slate-800 text-slate-50 rounded-t-2xl">
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
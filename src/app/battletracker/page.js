'use client'
import AddCreature from "@/components/AddCreature/AddCreature";
import Statblock from "@/components/Statblock/Statblock";
import { useState, useEffect } from "react";

export default function Page(props){
    const [data, setData] = useState([])
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
        console.log(creature)
    }
    return(
        <>
        <h1>Battle Tracker</h1>
            <AddCreature data={data} handleCreatureSubmit={handleCreatureSubmit}/>
            <Statblock 
                monsterid="greenhag"
            />  
        </>
    )
} 
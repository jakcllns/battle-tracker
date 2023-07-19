'use client'
// import { isDiceNotation } from "@/utils/DiceParser/DiceParser"
import { useState } from "react"
import Search from "../search/search"

const GetNewCreature = () => {
    return {
        name: '',
        armorClass:  10,
        hitDie: '',
        dex: 10,
        id_name: '',
        multiply: 1,
        initiative: '1d20',
        hitPoints: 0,
        id_name: ''
    }
}

const createInitiativeDiceNotation = dex => {
    const modifier = !dex ? 0 : Math.floor((dex-10)/2)
    return `1d20${modifier > 0 ? `+${modifier}`: modifier < 0 ? `${modifier}`: ''}`
}

const AddCreature = ({data, handleCreatureSubmit}) => {
    const [searchValue, setSearchValue] = useState('')
    const [searchedCreature, setSearchedCreature] = useState(GetNewCreature())

    const handleSetSearchedCreature = creature => {
        if(!creature){
            const currentCreature = {...GetNewCreature(), name: searchValue, multiply: searchedCreature.multiply, initiative: createInitiativeDiceNotation()}
            setSearchedCreature(currentCreature)
            return
        }
        setSearchedCreature({...creature, multiply: searchedCreature.multiply, initiative: createInitiativeDiceNotation(creature.dex)})
        
    }

    const handleInitiativeChange = event => {

        if(Number(event.target.value) && Number.isInteger(Number(event.target.value))){
            setSearchedCreature({...searchedCreature, initiative: Number(event.target.value)})
            return
         }
        
        setSearchedCreature({...searchedCreature, initiative: event.target.value})
    }

    const handleHitPointChange = event => {
        const val = event.target.value

        if(Number(val) && Number.isInteger(Number(val))) {
            setSearchedCreature({...searchedCreature, hitPoints: Number(val), hitDie: undefined})
            return
        }

        setSearchedCreature({...searchedCreature, hitPoints: 0, hitDie: val})

    }

    const handleArmorClassChange = event => {
        const armorClass = Number(event.target.value)
        setSearchedCreature({...searchedCreature, armorClass: armorClass === 0 ? undefined : armorClass})
    }

    const handleMultiplyChange = event => {
        const multiply = Number(event.target.value)
        setSearchedCreature({...searchedCreature, multiply: multiply === 0 ? undefined : multiply})
    }
    return (
        <div className="container w-auto  p-4 bg-slate-800 text-slate-50 rounded-2xl">
            <div className="flex flex-row gap-x-5 flex-wrap w-fit sm:mx-auto xl:mx-0">
                <Search

                    label="Creature Name"
                    searchedCreature={searchedCreature}
                    setSearchValue={setSearchValue}
                    setSearchedCreature={handleSetSearchedCreature}
                    data={data}
                    
                />
                {/* <div className="flex flex-col gap-y-2">
                    <label>Creature Name</label>
                    <div className="w-fit">
                        <input type="text" value={searchValue} onChange={onSearchChange} className="text-slate-950 px-2 rounded-sm"/>
                        { displayDropDown ?
                            <div className="fixed bg-black text-white min-w-max w-60 max-h-96 overflow-auto rounded-md">
                                {data.filter(item => {
                                    const re = new RegExp(`${searchValue}`,'i')
                                    return re.test(item.Name)
                                }).map(item => <p className="hover:bg-slate-400 hover:text-slate-950 w-full px-2 cursor-pointer" onClick={() => onDropdownClick(item.Name)} key={item.id_name}>{item.Name}</p>)}
                            </div>
                            : undefined
                        }
                    </div>
                </div> */}
                <div className="flex flex-col gap-y-2">
                    <label>Initiative</label>
                    <input 
                        type="text" 
                        className="rounded-sm text-slate-950 w-20" 
                        value={searchedCreature.initiative}
                        onChange={handleInitiativeChange}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label>Hit Points</label>
                    <input 
                        type="text" 
                        className="rounded-sm text-slate-950 w-24" 
                        value={searchedCreature.hitDie ? searchedCreature.hitDie : searchedCreature.hitPoints === 0 ? '' : searchedCreature.hitPoints} 
                        onChange={handleHitPointChange}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label>Armor Class</label>
                    <input type="number" min={1} className="rounded-sm text-slate-950 w-10 mx-auto" value={searchedCreature.armorClass} onChange={handleArmorClassChange} />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label>Multiply</label>
                    <div className="-mt-1">
                        <input type="number" min={1} className="rounded-sm text-slate-950 w-10" value={searchedCreature.multiply} onChange={handleMultiplyChange}/>
                        <button 
                            className="mx-3 px-2 text-lg font-bold  rounded border-2 border-white hover:bg-slate-600 w-10" 
                            onClick={() =>{
                                setSearchedCreature(GetNewCreature())
                                handleCreatureSubmit(searchedCreature)
                            }}
                        >+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCreature
'use client'
import { useState, useEffect } from "react"
import Search from "../search/search"

const newCreature = {
    Name: '',
    ArmorClass: 0,
    HitDie: '',
    DEX: 10,
    id_name: '',
    multiply: 1
}

const AddCreature = props => {
    const [searchValue, setSearchValue] = useState('')
    const [data, setData] = useState([])
    const [searchedCreature, setSearchedCreature] = useState({...newCreature})

    useEffect(() => {
        fetch(`api/monsters`, {cache: 'no-store'})
            .then(res => {
                return res.json()
            })
            .then(data => {                
                setData(data)
            })

    },[])

    // const onSearchChange = event => {
    //     const newSearchValue = event.target.value
    //     setSearchValue(newSearchValue);
    // }

    // const onItemClick = item => {
    //     setSearchValue(item)
    // }
    const handleSetSearchedCreature = creature => {
        if(!creature){
            const currentCreature = {...newCreature, Name: searchValue}
            console.log(`Current Creature: ${JSON.stringify(currentCreature)}`)
            setSearchedCreature(currentCreature)
            return
        }
        console.log(`Creature: ${JSON.stringify(creature)}`)
        setSearchedCreature({...creature, multiply: searchedCreature.multiply})
    }
    return (
        <div className="container w-auto mx-auto p-4 bg-slate-800 text-slate-50 rounded-2xl">
            <div className="flex flex-row mex-auto gap-x-5">
                <Search
                    label="Creature Name"
                    searchValue={searchValue}
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
                    <input type="text" className="rounded-sm text-slate-950" value={
                        `1d20${searchedCreature.DEX > 11 ? `+${Math.floor((searchedCreature.DEX - 10)/2)}` : searchedCreature.DEX < 9 ? `${Math.floor((searchedCreature.DEX - 10)/2)}` : ''}`
                    } />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label>Hit Points</label>
                    <input type="text" className="rounded-sm text-slate-950" value={searchedCreature.HitDie} />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label>Armor Class</label>
                    <input type="text" className="rounded-sm text-slate-950" value={searchedCreature.ArmorClass} />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label>Multiply</label>
                    <input type="text" className="rounded-sm text-slate-950" value={searchedCreature.multiply} />
                </div>
            </div>
            {/* <form className="max-w-4xl mx-auto p-4 flex justify-between items-center">
                <div className="">
                    <div className="flex-row">
                        <div className="flex-col">
                            <label>Creature Name</label>
                            <select>
                                <option value='GreenHag'>Green Hag</option>
                            </select>
                        </div>
                        <div className="flex-col">
                            <label>Initiative</label>
                            <input type='text' />
                        </div>
                    </div>
                    
                </div>
            </form> */}
        </div>
    )
}

export default AddCreature
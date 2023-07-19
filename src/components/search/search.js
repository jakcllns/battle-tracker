'use client'
import { useEffect, useRef, useState } from "react"

const escapeRegExp = text => {
    return  text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const checkSearchValue = (searchValue, data) => {
    const re = new RegExp(`${escapeRegExp(searchValue)}`, 'i')
    return data.some(
        item => {
            return re.test(item.name)
        }
    )
}

const GetNewCreature = (name, armorClass, hitDie, dex, id_name, multiply, initiative, hitPoints) => {
    return {
        name: name,
        armorClass:  armorClass,
        hitDie: hitDie,
        dex: dex,
        id_name: id_name,
        multiply: multiply,
        initiative: initiative,
        hitPoints: hitPoints,
    }
}

const Search = ({searchedCreature, data, setSearchedCreature, label }) => {
    const [displayDropDown, setDisplayDropDown] = useState(false);
    const [focus, setFocus] = useState(true)
    const dataRef = useRef(null);

    const filterData = (searchValue, data) => {
        const re = new RegExp(`${escapeRegExp(searchValue)}`, 'i')
        console.log('Filtering')
        return data.filter(item => re.test(item.name))
    }

    useEffect(() => {
        document.body.addEventListener('click', onClickOutside);
        return () => document.removeEventListener("click", onClickOutside)
    },[])

    const onClickOutside = e => {
        const element = e.target

        if(dataRef.current && !dataRef.current.contains(element)){
            setFocus(false)
        }
    }

    const handleSearchChange = event => {
        console.log('handleSearchChange')
        const searchValue = event.target.value
        setSearchedCreature({...searchedCreature , name: searchValue, id_name: ''})
        if(searchValue !== '' && checkSearchValue(searchValue, data)){
            setDisplayDropDown(true)
            return
        }
        setDisplayDropDown(false)
        
    }

    const handleItemClick = item => {
        console.log(item)
        const newCreature = GetNewCreature(
            item.name,
            item.armorClass,
            item.hitDie,
            item.dex,
            item.id_name,
            item.multiply,
            item.initiative,
            item.hitPoints
        )
        setSearchedCreature(newCreature)
        setDisplayDropDown(false)
    }

    return (
        <div className="flex flex-col gap-y-2" ref={dataRef}>
            <label>{label}</label>
            <div className="w-fit">
                <input type="text" value={searchedCreature.name} onFocus={()=>setFocus(true)} onChange={handleSearchChange} className="text-slate-950 px-2 rounded-sm"/>
                { focus && displayDropDown && checkSearchValue(searchedCreature.name, data) ?
                    <div className="fixed bg-black text-white min-w-max w-60 max-h-96 overflow-auto rounded-md">
                        <button className="float-right font-bold border-slate-50 border-solid border px-2 bg-slate-900 hover:bg-slate-600 hover:border-2" onClick={() => setDisplayDropDown(false)}>X</button>
                        {filterData(searchedCreature.name, data).map(item => <p className="hover:bg-slate-300 hover:text-slate-950 hover:font-bold  w-full px-2 cursor-pointer" onClick={() => handleItemClick(item)} key={item.id_name}>{item.name}</p>)}
                    </div>
                    : <div></div>
                }
            </div>
        </div>
    )
}

export default Search
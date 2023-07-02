'use client'
import { useEffect, useRef, useState } from "react"

const escapeRegExp = text => {
    return  text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const checkSearchValue = (searchValue, data) => {
    const re = new RegExp(`${escapeRegExp(searchValue)}`, 'i')
    return data.some(
        item => {
            return re.test(item.Name)
        }
    )
}

const filterData = (searchValue, data) => {
    const re = new RegExp(`${escapeRegExp(searchValue)}`, 'i')
    return data.filter(item => re.test(item.Name))
}

const Search = props => {
    const [displayDropDown, setDisplayDropDown] = useState(false);
    const [focus, setFocus] = useState(true)
    const dataRef = useRef(null);

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
        props.setSearchedCreature({...props.searchedCreature ,Name: searchValue})
        if(searchValue !== '' && checkSearchValue(searchValue, props.data)){
            setDisplayDropDown(true)
            return
        }
        setDisplayDropDown(false)

        // if(searchValue === ''){ 
        //     setDisplayDropDown(false)
        //     props.setSearchedCreature(undefined)
        // }

        // if(!props.data.some(item => item.Name === searchValue)) {
        //     props.setSearchedCreature(undefined)
        // }
        
    }

    const handleItemClick = item => {
        console.log('handleItemClick')
        props.setSearchedCreature({...item})
        setDisplayDropDown(false)
    }

    return (
        <div className="flex flex-col gap-y-2" ref={dataRef}>
            <label>{props.label}</label>
            <div className="w-fit">
                <input type="text" value={props.searchedCreature.Name} onFocus={()=>setFocus(true)} onChange={handleSearchChange} className="text-slate-950 px-2 rounded-sm"/>
                { focus && displayDropDown && checkSearchValue(props.searchedCreature.Name, props.data) ?
                    <div className="fixed bg-black text-white min-w-max w-60 max-h-96 overflow-auto rounded-md">
                        <button className="float-right font-bold border-slate-50 border-solid border px-2 bg-slate-900 hover:bg-slate-600 hover:border-2" onClick={() => setDisplayDropDown(false)}>X</button>
                        {filterData(props.searchedCreature.Name, props.data).map(item => <p className="hover:bg-slate-300 hover:text-slate-950 hover:font-bold  w-full px-2 cursor-pointer" onClick={() => handleItemClick(item)} key={item.id_name}>{item.Name}</p>)}
                    </div>
                    : <div></div>
                }
            </div>
        </div>
    )
}

export default Search
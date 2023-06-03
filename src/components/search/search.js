'use client'
import { useState } from "react"

const Search = props => {
    const [displayDropDown, setDisplayDropDown] = useState(false);

    const handleSearchChange = event => {
        console.log('handleSearchChange')
        const searchValue = event.target.value
        props.setSearchValue(searchValue)
        if(searchValue !== '' && props.data.some(item => item.Name === searchValue) === false) {
            setDisplayDropDown(true)
        }

        if(searchValue === ''){ 
            setDisplayDropDown(false)
            props.setSearchedCreature(undefined)
        }

        if(!props.data.some(item => item.Name === searchValue)) {
            props.setSearchedCreature(undefined)
        }
        
    }

    const handleItemClick = item => {
        console.log('handleItemClick')
        props.setSearchValue(item.Name)
        props.setSearchedCreature({...item})
        setDisplayDropDown(false)
    }

    return (
        <div className="flex flex-col gap-y-2">
            <label>{props.label}</label>
            <div className="w-fit">
                <input type="text" value={props.searchValue} onChange={handleSearchChange} className="text-slate-950 px-2 rounded-sm"/>
                { displayDropDown ?
                    <div className="fixed bg-black text-white min-w-max w-60 max-h-96 overflow-auto rounded-md">
                        {props.data.filter(item => {
                            const re = new RegExp(`${props.searchValue}`,'i')
                            return re.test(item.Name)
                        }).map(item => <p className="hover:bg-slate-400 hover:text-slate-950 w-full px-2 cursor-pointer" onClick={() => handleItemClick(item)} key={item.id_name}>{item.Name}</p>)}
                    </div>
                    : <div></div>
                }
            </div>
        </div>
    )
}

export default Search
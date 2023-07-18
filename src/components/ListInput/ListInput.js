import AddButton from "../AddButton/AddButton"
import Selector from "../Selector/Selector"

const { useState } = require("react")

const ListInput = ({type, handleAdd, items = undefined}) => {
    const [inputVal, setInputVal] = useState('')

    const addHandler = event => {
        event.preventDefault()
        handleAdd(inputVal)
        setInputVal('')
    }
    return (
        <>  
            {Array.isArray(items) ? (
                <Selector
                items={items}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? addHandler(e) : e}
                />
            ) :(
                <input
                className="text-slate-950"
                type={type}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? addHandler(e) : e}
                ></input>
            )}
            <AddButton onClick={addHandler} />
        </>
    )
}

export default ListInput
import AddButton from "../AddButton/AddButton"

const { useState } = require("react")

const ListInput = ({type, handleAdd}) => {
    const [inputVal, setInputVal] = useState('')

    const addHandler = event => {
        event.preventDefault()
        handleAdd(inputVal)
        setInputVal('')
    }
    return (
        <>
            <input
            className="text-slate-950"
            type={type}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' ? addHandler(e) : e}
            ></input>
            <AddButton onClick={addHandler} />
        </>
    )
}

export default ListInput
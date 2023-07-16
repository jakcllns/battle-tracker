import AddButton from "../AddButton/AddButton"

const { useState } = require("react")

const ListInput = props => {
    const [inputVal, setInputVal] = useState('')

    const handleAdd = event => {
        event.preventDefault()
        props.handleAdd(inputVal)
        setInputVal('')
    }
    return (
        <>
            <input
            className="text-slate-950"
            type={props.type}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' ? handleAdd(e) : e}
            ></input>
            <AddButton onClick={handleAdd} />
        </>
    )
}

export default ListInput
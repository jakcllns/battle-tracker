const Selector = ({items, onChange, value, id = '', onKeyDown = e => e}) => {
    return (
        <select 
        id={id} 
        value={value} 
        onChange={onChange} 
        onKeyDown={onKeyDown}
        className='w-fit text-slate-950' >
            <option key={-1}></option>
            {items.map((ele, index) => <option key={index}>{ele}</option>)}
        </select>
    )
}

export default Selector
const AddButton = ({onClick, disabled = false}) => {

    return (
        <button
        disabled={disabled}
        className="px-2"
        onClick={onClick}
        onKeyDown={e => e.key === 'Enter' ? onClick(e) : e}
        tabIndex={-1}
        >+</button>
    )
}

export default AddButton
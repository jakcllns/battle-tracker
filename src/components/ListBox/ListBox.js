import DeleteButton from "../DeleteButton/DeleteButton"

const ListBox = props => {
    const handleDelete = (event, index) => {
        event.preventDefault()
        props.handleDelete(props.items.filter((e, i) => i !== index))
    }
    return (
        <div className="flex-row max-h-36 my-1 px-1  overflow-y-auto ">
            <ul>
                {props.items.map((ele, index) => {
                    return (
                        <li key={index}>
                            {ele} 
                            <DeleteButton
                            onClick={event => handleDelete(event, index)}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ListBox
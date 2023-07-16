import DeleteButton from "../DeleteButton/DeleteButton"

const ListBox = ({handleDelete, items}) => {
    const deleteHandler = (event, index) => {
        event.preventDefault()
        handleDelete(items.filter((e, i) => i !== index))
    }
    return (
        <div className="flex-row max-h-36 my-1 px-1  overflow-y-auto ">
            <ul>
                {items.map((ele, index) => {
                    return (
                        <li key={index}>
                            {ele} 
                            <DeleteButton
                            onClick={event => deleteHandler(event, index)}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ListBox
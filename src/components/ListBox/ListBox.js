import DeleteButton from "../DeleteButton/DeleteButton"

const ListBox = ({handleDelete, items}) => {
    const deleteHandler = (event, index) => {
        event.preventDefault()
        handleDelete(index)
    }
    return (
        <div className="flex-row max-h-36 my-1 px-1  overflow-y-auto ">
            <ul>
                {items.map((ele, index) => {
                    return (
                        <li key={index}>
                            <DeleteButton
                            onClick={event => deleteHandler(event, index)}
                            />
                            {ele} 
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ListBox
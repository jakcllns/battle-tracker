import SubmitButton from "../SubmitButton/SubmitButton"

const { useState } = require("react")

const TextArea = ({handleSubmit, className, buttonName, onChange}) => {
    const [input, setInput] = useState('')

    const submitHandler = event => {
        handleSubmit(event)
        setInput('')
    }

    const handleKeyDown = event => {
        
        switch (event.key) {
            case 'Enter':
                if(event.ctrlKey) {
                    submitHandler(event)
                    break
                }
                setInput(input + '\r\n')
                break
        }
    }

    const handleChange = event => {
        setInput(event.target.value)
        onChange(event)
    }

    return (
        <div>
            <textarea
            className={className}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            />
            <SubmitButton onClick={submitHandler} buttonName={buttonName} />
        </div>
    )
}

export default TextArea
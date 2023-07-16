const SubmitButton = ({onClick, buttonName}) => {

    return (
        <div className="pb-2 w-fit mx-auto">
            <button
            className="text-slate-50 rounded px-8 align-self-center bg-slate-950 hover:bg-slate-400 hover:text-slate-950 hover:font-extrabold hover:border-slate-950 hover:border-l-2 hover:border-t-2"
            onClick={onClick}
            onKeyDown={e => e.key === 'Enter' ? onClick(e) : e}
            >{buttonName}</button>
        </div>
    )
}

export default SubmitButton
const StatBlockButton = ({onClick}) => {
    return(
        <button onClick={onClick}>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"
            className="h-[28px] w-[32px] fill-slate-900 opacity-100" 
            >
                <g transform="translate(0,0)">
                    <path d="M50 96c-9.972 0-18 8.028-18 18v300c0 9.972 8.028 18 18 18h412c9.972 0 18-8.028 18-18V114c0-9.972-8.028-18-18-18H50zm5 23h402v18H55v-18zm0 32h210v258H55V151zm18 18v222h7.03c.47-24.342 18.315-74.172 47.093-97.889C136.331 300.56 147.615 305 160 305c12.385 0 23.669-4.44 32.877-11.889C221.655 316.828 239.5 366.658 239.97 391H247V169H73zm222 14h146v18H295v-18zm-135 10c20.835 0 39 20.241 39 47s-18.165 47-39 47-39-20.241-39-47 18.165-47 39-47zm135 22h114v18H295v-18zm0 32h50v18h-50v-18zm80 0h66v18h-66v-18zm-16 96h98v18h-98v-18zm-32 32h130v18H327v-18z"/>
                </g>
            </svg>
        </button>
    )
}

export default StatBlockButton
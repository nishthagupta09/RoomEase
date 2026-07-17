function Button({
    text,
    onClick,
    type = "button",
    disabled = false,
    className = ""
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                px-4
                py-2
                rounded-lg
                border
                border-green-600
                text-green-600
                font-medium
                hover:bg-green-50
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}
        >
            {text}
            
        </button>
    );
}

export default Button;
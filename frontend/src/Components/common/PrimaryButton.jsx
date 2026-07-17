function PrimaryButton({ children, onClick, type = "button",className="" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 ${className}`}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;
const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    required = false
}) => {

    return (
        <div className="flex flex-col gap-2">

            <label className="font-medium text-gray-700">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
                <option value="">
                    {placeholder}
                </option>

                {options.map((option) => (

                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>

                ))}

            </select>

        </div>
    );
};

export default SelectField;
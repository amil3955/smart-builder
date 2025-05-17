import HelpIcon from "./HelpIcon";
// Text input component with help icon
const TextInput = (
    {
        value = "",
        onChange,
        placeholder = "",
        hasHelp = false,
        suffix = null
    }
) => {
    return (
        <div className="relative w-full">
            <input
                type="text"
                className={suffix ? "w-4/5 px-2 py-1 text-xs border border-gray-300 rounded" : "w-full px-2 py-1 text-xs border border-gray-300 rounded"}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            />

            {suffix && (
                <div className="absolute text-sm right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                    {suffix}
                </div>
            )}

            {hasHelp && (
                <div className="absolute text-sm right-[-24px] top-1/2 transform -translate-y-1/2">
                    <HelpIcon />
                </div>
            )}
        </div>
    );
}

export default TextInput;

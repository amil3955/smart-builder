import HelpIcon from "./HelpIcon";

const TextareaInput = ({
    value = "",
    onChange,
    placeholder = "",
    hasHelp = false,
    multiline = false,
    rows = 2
}) => {
    if (multiline) {
        return (
            <div className="relative w-full">
                <textarea
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={rows}
                />
                {hasHelp && (
                    <div className="absolute right-[-24px] top-1/2 transform -translate-y-1/2">
                        <HelpIcon />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="relative w-full">
            <input
                type="text"
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                placeholder={placeholder}
            />
            {hasHelp && (
                <div className="absolute right-[-24px] top-1/2 transform -translate-y-1/2">
                    <HelpIcon />
                </div>
            )}
        </div>
    );
};

export default TextareaInput;

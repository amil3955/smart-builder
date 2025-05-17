const FormField = (
    {
        label,
        required = false,
        children,
    }
) => {
    return (
        <div className="grid grid-cols-3 items-center py-1 w-[90%]">
            <div className="text-right pr-2 text-xs font-bold text-gray-600">{label}</div>
            <div className="col-span-2 relative">{children}</div>
        </div>
    );
}

export default FormField;
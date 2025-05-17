import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useUIStore } from '../../store';

// Form field configurations


const FormField = ({ field, value, onChange }) => {
    switch (field.type) {
        case 'select':
            return (
                <SelectField
                    value={value}
                    options={field.options}
                    onChange={onChange}
                />
            );
        case 'checkbox':
            return (
                <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 rounded"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                />
            );
        default:
            return (
                <div className="flex items-center">
                    <input
                        type="text"
                        className={`border border-gray-300 text-sm rounded px-2 py-1 ${field.className || 'w-full'}`}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    {field.suffix && <span className="mx-2 text-gray-600">{field.suffix}</span>}
                </div>
            );
    }
};

const SelectField = ({ label, value, options, onChange }) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none w-full border border-gray-300 text-sm rounded px-2 py-1 pr-8 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
    );
};

const DraggableModal = ({ }) => {

    const { isOpenModal, position, formData, setFormField, updatePosition, closeModal, AWINING_FORM_FIELDS } = useUIStore();
    const modalRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Handle drag start
    const handleMouseDown = (e) => {
        if (e.target.closest('.modal-header')) {
            setIsDragging(true);
            const modalRect = modalRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - modalRect.left,
                y: e.clientY - modalRect.top
            });
        }
    };

    // Handle drag move
    const handleMouseMove = (e) => {
        if (isDragging) {
            updatePosition(
                e.clientX - dragOffset.x,
                e.clientY - dragOffset.y
            );
        }
    };

    // Handle drag end
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Add and remove event listeners
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    if (!isOpenModal) return null;
    return (
        <div ref={modalRef} className="absolute z-50 bg-white rounded-lg shadow-xl w-96 select-none"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'default'
            }}
            onMouseDown={handleMouseDown}
        >
            {/* Modal Header */}
            <div className="modal-header bg-blue-500 text-white px-4 py-2 rounded-t-lg fcursor-grab">
                <h3 className="font-medium text-center">Create Front Left Awning</h3>
            </div>

            {/* Modal Body */}
            <div className="p-4">
                <div className="space-y-4">
                    <div className="grid grid-cols-3 items-center gap-2">
                        {AWINING_FORM_FIELDS.map(field => (
                            <React.Fragment key={field.id}>
                                <div className="text-right text-sm text-gray-600">{field.label}</div>
                                <div className="col-span-2">
                                    <FormField
                                        field={field}
                                        value={formData[field.id]}
                                        onChange={(value) => setFormField(field.id, value)}
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            className="px-4 py-1 bg-blue-500 text-sm text-white rounded hover:bg-blue-600"
                            onClick={() => console.log('Create with options:', formData)}
                        >
                            Apply
                        </button>
                        <button
                            className="px-4 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DraggableModal;
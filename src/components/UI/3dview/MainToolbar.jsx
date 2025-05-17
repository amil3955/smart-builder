import React, { useState } from 'react';
import { ChevronDown, X, Edit3, Edit2, Menu } from 'lucide-react';
import { useUIStore } from '../../../store';
import Dropdown from './DropdownMenu';

const MainToolbar = () => {
    const { activeTab, setActiveTab } = useUIStore();

    const handleDropdownSelect = (selectedItem) => {
        console.log('Selected:', selectedItem);
        setActiveTab(`${activeTab} - ${selectedItem}`);
    };

    const toolbarItems = [
        {
            id: 'openings',
            label: 'Openings',
            dropdown: true,
            onSelect: handleDropdownSelect
        },
        { id: 'porch', label: 'Porch', dropdown: true },
        { id: 'lean-to', label: 'Lean-to', dropdown: true, initialSelected: null, onSelect: handleDropdownSelect },
        { id: 'awning', label: 'Awning', dropdown: true, initialSelected: null, onSelect: handleDropdownSelect},
        { id: 'attached-building', label: 'Attached Building' },
        { id: 'cart-porch', label: 'Cart Porch' },
        { id: 'divider-wall', label: 'Divider Wall' },
        { id: 'clear-panels', label: 'Clear Panels', dropdown: true, onSelect: handleDropdownSelect },
        { id: 'cupola', label: 'Cupola' },
        { id: 'dormer', label: 'Dormer' },
        { id: 'open-wall', label: 'Open Wall' },
    ];

    return (
        <div className="w-full bg-gray-200 p-1">
            <div className='flex justify-between items-center bg-white '>
                <div className="flex items-center text-xs">
                    {toolbarItems.map((item) => (
                        item.dropdown ? (
                            <Dropdown
                                key={item.id}
                                id={item.id}
                                label={item.label}
                                onSelect={item.onSelect}
                            />
                        ) : (
                            <button
                                key={item.id}
                                className="px-4 py-1.5 bg-white text-xs font-semibo text-gray-700 hover:bg-gray-200"
                                onClick={() => setActiveTab(item.label)}
                                // onClick = {() => toggleModal}
                            >
                                {item.label}
                            </button>
                        )
                    ))}
                </div>
                <div className="items-center bg-white border-l border-gray-200 py-1 px-2 w-96">
                    Post Frame
                </div>
            </div>
            {/* <DraggableModal /> */}
        </div>
    );
};

export default MainToolbar;
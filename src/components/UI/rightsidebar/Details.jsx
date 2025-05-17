import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { useUIStore } from '../../../store';
import TextInput from '../common/TextInput';
import Dropdown from '../common/Dropdwon';
import FormField from '../common/FormField';

// Building Size Form component
const BuildingSizeForm = () => {
    // State for text input fields
    const [formValues, setFormValues] = useState({
        width: '20\'',
        length: '20\'',
        ceilingHeight: '12\'',
        exteriorMetalHeight: '12\' 6"',
        roofPitch: '4.0',
    });

    // Update form value
    const updateFormValue = (field, value) => {
        setFormValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Dropdown options
    const measureFromOptions = ['Outside Of Girt', 'Inside Of Girt', 'Outside Of Post'];
    const roofHeightStyleOptions = ['Ceiling Height', 'Peak Height'];
    const roofStyleOptions = ['Gable', 'Single Slope', 'Gambrel'];
    const overhangsOptions = ['None', '1\'', '2\''];

    return (
        <div className="p-1 bg-white">
            <FormField label="Measure From">
                <Dropdown
                    id="measureFrom"
                    options={measureFromOptions}
                    hasHelp
                />
            </FormField>

            <FormField label="Width">
                <TextInput
                    value={formValues.width}
                    onChange={(value) => updateFormValue('width', value)}
                    hasHelp
                />
            </FormField>

            <FormField label="Length">
                <TextInput
                    value={formValues.length}
                    onChange={(value) => updateFormValue('length', value)}
                    hasHelp
                />
            </FormField>

            <FormField label="Roof Height Style">
                <Dropdown
                    id="roofHeightStyle"
                    options={roofHeightStyleOptions}
                    hasHelp
                />
            </FormField>

            <FormField label="Ceiling Height">
                <TextInput
                    value={formValues.ceilingHeight}
                    onChange={(value) => updateFormValue('ceilingHeight', value)}
                    hasHelp
                />
            </FormField>

            <FormField label="Exterior Metal Height">
                <TextInput
                    value={formValues.exteriorMetalHeight}
                    onChange={(value) => updateFormValue('exteriorMetalHeight', value)}
                    hasHelp
                />
            </FormField>

            <FormField label="Roof Style">
                <Dropdown
                    id="roofStyle"
                    options={roofStyleOptions}
                    hasHelp
                />
            </FormField>

            <FormField label="Roof Pitch">
                <TextInput
                    value={formValues.roofPitch}
                    onChange={(value) => updateFormValue('roofPitch', value)}
                    suffix="/ 12"
                    hasHelp
                />
            </FormField>

            <FormField label="Overhangs">
                <Dropdown
                    id="overhangs"
                    options={overhangsOptions}
                    hasHelp
                />
            </FormField>
        </div>
    );
};
//Roof Peak
const RoofPeakForm = () => {
    // State for text input fields
    const [formValues, setFormValues] = useState({
        frontPeakExtension: '3\'',
        frontPeakOffset: '3\'',
        backPeakExtension: '3\'',
        backPeakOffset: '3\'',
    });

    // Update form value
    const updateFormValue = (field, value) => {
        setFormValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Dropdown options
    const frontPeak = ['Nomal', 'Peak Out', 'Flying Gable'];
    const backPeak = ['Nomal', 'Peak Out', 'Flying Gable'];

    return (
        <div className="p-1 bg-white">
            <FormField label="Front Peak">
                <Dropdown
                    id="frontPeak"
                    options={frontPeak}
                    hasHelp
                />
            </FormField>

            <FormField label="Front Peak Extensinon">
                <TextInput
                    value={formValues.frontPeakExtension}
                    onChange={(value) => updateFormValue('frontPeakExtension', value)}
                    hasHelp
                />
            </FormField>

            <FormField label="Front Peak Offset">
                <TextInput
                    value={formValues.frontPeakOffset}
                    onChange={(value) => updateFormValue('frontPeakOffset', value)}
                    hasHelp
                />
            </FormField>

            <FormField label="Back Peak">
                <Dropdown
                    id="backPeak"
                    options={backPeak}
                    hasHelp
                />
            </FormField>

             <FormField label="Back Peak Extensinon">
                <TextInput
                    value={formValues.backPeakExtension}
                    onChange={(value) => updateFormValue('backPeakExtension', value)}
                    hasHelp
                />
            </FormField>

            <FormField label="Back Peak Offset">
                <TextInput
                    value={formValues.backPeakOffset}
                    onChange={(value) => updateFormValue('backPeakOffset', value)}
                    hasHelp
                />
            </FormField>

        </div>
    );
};
// Product System
const ProductSystemsForm = () => {
    // Dropdown options
    const roofProductSystem = ['AG Panel', 'Conkin Roll', 'Asphalt Shingle Roof', 'None', 'Commercial Rib', 'Ag Panel', 'Shingles'];
    const backPeak = ['Nomal', 'Peak Out', 'Flying Gable'];

    return (
        <div className="p-1 bg-white">
            <FormField label="Roof Product System">
                <Dropdown
                    id="roofProductSystem"
                    options={roofProductSystem}
                    hasHelp
                />
            </FormField>

        </div>
    );
};

// Building Configuration Panel
const Details = () => {
    const [expandedSection, setExpandedSection] = useState('Building Size');

    // Section data
   const sections = [
        { id: 'bays', title: 'Bays' },
        { id: 'foundation', title: 'Foundation' },
        { id: 'slab', title: 'Slab' },
        { id: 'wallFraming', title: 'Wall Framing', status: 'Framing' },
        { id: 'trussCarrier', title: 'Truss Carrier' },
        { id: 'openWebTrussCarrier', title: 'Open Web Truss Carrier' },
        { id: 'wallGirtFraming', title: 'Wall Girt Framing' },
        { id: 'skirtBoards', title: 'Skirt Boards' },
        { id: 'gableEndFraming', title: 'Gable End Framing' },
        { id: 'interiorWallFraming', title: 'Interior Wall Framing' },
        { id: 'roofFraming', title: 'Roof Framing' },
        { id: 'purlinFraming', title: 'Purlin Framing' },
        { id: 'rafterFraming', title: 'Rafter Framing' },
        { id: 'ceilingFraming', title: 'Ceiling Framing' },
        { id: 'floorFraming', title: 'Floor Framing' },
        { id: 'headerGirdFraming', title: 'Header Gird Framing' },
        { id: 'roofSheathing', title: 'Roof Sheathing', status: 'Sheathing' },
        { id: 'wallSheathing', title: 'Wall Sheathing' },
        { id: 'wallLiner', title: 'Wall Liner' },
        { id: 'interiorWalls', title: 'Interior Walls' },
        { id: 'ceilingLiner', title: 'Ceiling Liner' },
        { id: 'floorSheathing', title: 'Floor Sheathing' },
        { id: 'roofTrim', title: 'Roof Trim', status: 'Trim' },
        { id: 'fasciaAndSoffit', title: 'Fascia and Soffit' },
        { id: 'wallTrim', title: 'Wall Trim' },
        { id: 'exteriorCornerTrim', title: 'Exterior Corner Trim' },
        { id: 'openWebTrim', title: 'Open Web Trim' },
        { id: 'linerTrim', title: 'Liner Trim' },
        { id: 'interiorCornerTrim', title: 'Interior Corner Trim' },
        { id: 'ceilingTrim', title: 'Ceiling Trim' },
        { id: 'trimMargins', title: 'Trim Margins' },
        { id: 'extraFramingParts', title: 'Extra Framing Parts' },
        { id: 'extraTrimParts', title: 'Extra Trim Parts' },
    ];

    // Toggle section
    const toggleSection = (sectionID) => {
        setExpandedSection(expandedSection === sectionID ? null : sectionID);
    };

    // Close all dropdowns when changing sections
    const { closeAllDropdowns } = useUIStore();

    // Handle section toggle with dropdown cleanup
    const handleSectionToggle = (sectionID) => {
        closeAllDropdowns();
        toggleSection(sectionID);
    };

    const renderSectionContent = (sectionId, title) => {
        switch (sectionId) {
            case 'buildingSize':
                return <BuildingSizeForm />;
            case 'roofPeak':
                return <RoofPeakForm />;
            case 'productSystems':
                return <ProductSystemsForm />;
            case 'colors':
                return <ColorsForm />;
            default:
                return (
                    <div className="p-2 bg-white text-gray-500 text-center">
                        Content for {title} section would go here
                    </div>
                );
        }
    };

    return (
        <div className="w-full p-2 rounded overflow-hidden">
            {sections.map((section) => (
                <div key={section.id} className="m-1 bg-gray-200 border-gray-200 last:border-b-0">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleSectionToggle(section.id)}
                    >
                        <div className="font-medium py-1 px-2 text-sm">
                            {section.title}
                        </div>
                        <div className={`w-9 h-9 flex items-center justify-center bg-blue-500 text-white`}>
                            <ChevronDown
                                className={`w-6 h-6 transition-transform duration-200 ${expandedSection === section.title ? 'rotate-180' : ''
                                    }`}
                            />
                        </div>
                    </div>
                    {expandedSection === section.id && renderSectionContent(section.id, section.title)}
                </div>
            ))}
        </div>
    );
};

export default Details;
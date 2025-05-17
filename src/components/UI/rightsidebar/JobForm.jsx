import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../../store';
import TextInput from '../common/TextInput';
import TextareaInput from '../common/TextareaInput';
import Dropdown from '../common/Dropdwon';
import FormField from '../common/FormField';


// Job Info Form component - matching the screenshot
const JobForm = () => {
    // State for form values
    const [formValues, setFormValues] = useState({
        projectName: "",
        companyName: "",
        contact: "",
        email: "",
        phone: "",
        deliveryAddress: "",
        zipCode: "",
        desiredDate: "",
        comments: "",
        user: ""
    });

    // Update form value
    const updateFormValue = (field, value) => {
        setFormValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Loading options
    const loadingOptions = ['Standard', 'Express', 'Priority', 'Custom'];

    return (
        <div className="w-full mx-auto bg-white p-2 ">
            {/* Project Information */}
            <FormField label="Project Name" required={true}>
                <TextInput
                    value={formValues.projectName}
                    onChange={(value) => updateFormValue('projectName', value)}
                    hasHelp
                />
            </FormField>

            <FormField label="Company Name">
                <TextInput
                    value={formValues.companyName}
                    onChange={(value) => updateFormValue('companyName', value)}
                />
            </FormField>

            <FormField label="Contact">
                <TextInput
                    value={formValues.contact}
                    onChange={(value) => updateFormValue('contact', value)}
                />
            </FormField>

            <FormField label="Email">
                <TextInput
                    value={formValues.email}
                    onChange={(value) => updateFormValue('email', value)}
                    hasHelp
                />
            </FormField>

            <FormField label="Phone">
                <TextInput
                    value={formValues.phone}
                    onChange={(value) => updateFormValue('phone', value)}
                />
            </FormField>

            <FormField label="Delivery Address">
                <TextareaInput
                    value={formValues.deliveryAddress}
                    onChange={(value) => updateFormValue('deliveryAddress', value)}
                    multiline={true}
                    hasHelp
                />
            </FormField>

            <FormField label="Zip Code">
                <TextInput
                    value={formValues.zipCode}
                    onChange={(value) => updateFormValue('zipCode', value)}
                    hasHelp
                />
            </FormField>

            <FormField label="Desired Date">
                <TextInput
                    value={formValues.desiredDate}
                    onChange={(value) => updateFormValue('desiredDate', value)}
                    placeholder="m/d/yyyy"
                    hasHelp
                />
            </FormField>

            <FormField label="Comments">
                <TextareaInput
                    value={formValues.comments}
                    onChange={(value) => updateFormValue('comments', value)}
                    multiline={true}
                />
            </FormField>

            <FormField label="Loading">
                <div className="relative">
                    <Dropdown
                        id="loading"
                        options={loadingOptions}
                        hasHelp
                    />
                </div>
            </FormField>

            <FormField label="User">
                <TextInput
                    value={formValues.user}
                    onChange={(value) => updateFormValue('user', value)}
                />
            </FormField>
        </div>
    );
};

export default JobForm;
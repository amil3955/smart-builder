// This store manages UI state like active tabs, modals, and view modes.
import React, { useState } from 'react';
import { create } from 'zustand';

const useUIStore = create((set) => ({
    activeTab: 'Openings',
    setActiveTab: (tab) => set({ activeTab: tab }),

    isConfigPanelOpen: true,
    toggleConfigPanel: () => set((state) => ({ isConfigPanelOpen: !state.isConfigPanelOpen })),

    // Other state properties can be added here
    selectedElement: null,
    setSelectedElement: (element) => set({ selectedElement: element }),

    // Zustand store for bottom toolbar state
    activeOption: null,
    changeViewExpanded: false,

    setActiveOption: (option) => set({ activeOption: option }),
    toggleChangeView: () => set((state) => ({ changeViewExpanded: !state.changeViewExpanded })),
    // Create Front Left Awning
    AWINING_FORM_FIELDS: [
        { id: 'start', label: 'Start', type: 'text' },
        { id: 'length', label: 'Length', type: 'text' },
        { id: 'width', label: 'Width', type: 'text' },
        {
            id: 'height',
            label: 'Height',
            type: 'select',
            options: ['Ceiling Height', 'Custom Height']
        },
        { id: 'heightValue', label: '', type: 'text' },
        {
            id: 'roofPitch',
            label: 'Roof Pitch',
            type: 'text',
            suffix: '/ 12',
            className: 'w-20'
        },
        {
            id: 'overhangs',
            label: 'Overhangs',
            type: 'select',
            options: ['None', '1\'', '2\'']
        },
        {
            id: 'walls',
            label: 'Walls',
            type: 'select',
            options: ['Cantilever', 'Standard', 'None']
        },
        {
            id: 'roofFraming',
            label: 'Roof Framing',
            type: 'select',
            options: ['Trusses', 'Rafters', 'Custom']
        },
        {
            id: 'hipCornerStyle',
            label: 'Hip Corner Style',
            type: 'select',
            options: ['None', 'Square', 'Diagonal']
        },
        {
            id: 'roofOrientation',
            label: 'Roof Orientation',
            type: 'select',
            options: ['Standard', 'Reversed']
        },
        {
            id: 'advanced',
            label: 'Advanced',
            type: 'checkbox'
        }
    ],
    isOpenModal: false,
    position: { x: 900, y: 150 },
    formData: {
        start: '8\'',
        length: '8\'',
        width: '8\'',
        height: 'Ceiling Height',
        heightValue: '8\'',
        roofPitch: '4',
        overhangs: 'None',
        walls: 'Cantilever',
        roofFraming: 'Trusses',
        hipCornerStyle: 'None',
        roofOrientation: 'Standard',
        advanced: false
    },
    setFormField: (field, value) => set(state => ({
        formData: {
            ...state.formData,
            [field]: value
        }
    })),

    updatePosition: (x, y) => set(state => ({
        position: { x, y }
    })),

    closeModal: () => set({ isOpenModal: false }),
    openModal: () => set({ isOpenModal: true }),

    //3dview right sidebar state
    //Main Building Form
    // Track open/closed state for each dropdown
    openDropdowns: {},
    // Store selected values for each dropdown
    selectedValues: {
        measureFrom: 'Outside Of Girt',
        roofHeightStyle: 'Ceiling Height',
        roofStyle: 'Gable',
        overhangs: 'None'
    },

    // Toggle dropdown open/closed state
    toggleDropdown: (id) => set((state) => ({
        openDropdowns: {
            ...state.openDropdowns,
            [id]: !state.openDropdowns[id]
        }
    })),

    // Close a specific dropdown
    closeDropdown: (id) => set((state) => ({
        openDropdowns: {
            ...state.openDropdowns,
            [id]: false
        }
    })),

    // Close all dropdowns
    closeAllDropdowns: () => set({ openDropdowns: {} }),

    // Update the selected value
    setSelectedValue: (id, value) => set((state) => ({
        selectedValues: {
            ...state.selectedValues,
            [id]: value
        }
    })),

    // Packages

    selectionsPackages: {
        // Bundles
        labor: true,
        concrete: true,
        foundation: true,
        concretePump: true,
        liftSkytracCrane: true,
        permitsDrawings: true,
        miscFees: true,
        freight: true,
        electrical: true,
        hvacRadiantHeating: true,
        plumbing: true,
        interiorTrimAndDoors: true,
        floorCoverings: true,
        drywallPainting: true,
        cabinetsCountertops: true,
        gutters: true,
        manual: true,

        // Add-ons
        trussConnectionFasteners: true,
        kneeBracing: true,
        cornerBracing: true,
        xBracing: true,
        bottomChordBracing: true,
        bracingMisc: true,
        testOverhangLabor: true,
    },

    // Track dropdown values
    dropdownValues: {
        labor: 'Enter Amount...',
        concrete: 'Enter Amount...',
        foundation: 'Foundation Cost...',
        concretePump: 'Per Day Charge...',
        liftSkytracCrane: 'Custom...',
        permitsDrawings: 'Enter Amount...',
        miscFees: 'Enter Amount...',
        freight: 'Custom...',
        electrical: 'Custom...',
        hvacRadiantHeating: 'Enter Amount...',
        plumbing: 'Enter Amount...',
        interiorTrimAndDoors: 'Enter Amount...',
        floorCoverings: 'Enter Amount...',
        drywallPainting: 'Enter Amount...',
        cabinetsCountertops: 'Enter Amount...',
        gutters: '6"...',
        trussConnectionFasteners: 'Star Con 4" Lags',
        kneeBracing: 'Untreated',
    },

    // Toggle selection state
    toggleSelection: (id) => set((state) => ({
        selectionsPackages: {
            ...state.selectionsPackages,
            [id]: !state.selectionsPackages[id]
        }
    })),

    // Update dropdown value
    setDropdownValue: (id, value) => set((state) => ({
        dropdownValues: {
            ...state.dropdownValues,
            [id]: value
        }
    })),

    // Jobinfo
    formDataJob: {
        projectName: '',
        companyName: '',
        contact: '',
        email: '',
        phone: '',
        deliveryAddress: '',
        zipCode: '',
        desiredDate: '',
        comments: '',
        loading: 'Standard',
        user: ''
    },

    // Update a specific field
    updateField: (field, value) => set((state) => ({
        formDataJob: {
            ...state.formDataJob,
            [field]: value
        }
    })),

    // Submit form data
    submitFormJob: () => {
        set((state) => {
            console.log('Submitting form data:', state.formDataJob);
            return state; // Don't modify state on submit, just log
        });
    }

}))

export default useUIStore;
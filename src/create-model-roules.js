import { updateEnvUrl } from 'platform-core/auth/service';

export default {
    name: 'Customer',
    isLocalized: false,
    groups: [
        {
            title: 'Basic Information',
            id: 'basic',
            class: '',
            field_container_class: '',
            input_container_class: '',
        },
        {
            title: 'Route',
            id: 'route',
            class: '',
            field_container_class: '',
            input_container_class: '',
        },
        {
            title: '',
            id: 'route2',
            class: '',
            field_container_class: '',
            input_container_class: '',
        },
        {
            title: 'Change',
            id: 'change',
            class: '',
            field_container_class: '',
            input_container_class: '',
        },
        {
            title: 'Cancellation',
            id: 'cancellation',
            class: '',
            field_container_class: '',
            input_container_class: '',
        },
        {
            title: '',
            id: 'enabled',
            class: '',
            field_container_class: '',
            input_container_class: '',
        },
    ],
    attributes: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            validation: 'required|max:25',
            group: 'basic',
        },
        {
            name: 'carrierCodeString',
            label: 'Plating Carrier Code',
            type: 'text',
            validation: 'required',
            group: 'basic',
        },
        {
            name: 'storeId',
            label: 'Store',
            type: 'select',
            validation: 'required',
            source: {
                requestPath: `${updateEnvUrl(process.env.VUE_APP_API_CONFIG_URL) }/store`,
                keyAttribute: 'storeId',
                valueAttribute: 'storeId'
            },
            group: 'basic',
        },

        {
            name: 'bookingCodeString',
            label: 'Booking Code',
            type: 'text',
            validation: 'required',
            group: 'basic',

        },
        {
            name: 'departureType',
            label: 'Departure Type',
            type: 'select',
            validation: 'required',
            group: 'route',
            source: {
                type: 'array',
                options: [
                    {
                        label: 'airport',
                        value: 'airport',
                    },
                    {
                        label: 'country',
                        value: 'country',
                    }

                ]
            },

        }, {
            name: 'departureCodeString',
            label: 'Departure Code',
            type: 'text',
            validation: 'required',
            group: 'route',

        }, {
            name: 'destinationType',
            label: 'Destination Type',
            type: 'select',
            validation: 'required',
            group: 'route2',
            source: {
                type: 'array',
                options: [
                    {
                        label: 'airport',
                        value: 'airport',
                    },
                    {
                        label: 'country',
                        value: 'country',
                    },
                ]
            },
        }, {
            name: 'destinationCodeString',
            label: 'Destination Code',
            type: 'text',
            validation: 'required',
            group: 'route2',
        },
        {
            name: 'airlineChangeFees',
            label: 'Airline Fees Per Passenger',
            type: 'number',
            validation: 'required|max_value:10000000|decimal:2|min:0',
            group: 'change',

        },
        {
            name: 'fly365ChangeFees',
            label: 'Fly365 Fees Per Passenger',
            type: 'number',
            validation: 'required|max_value:10000000|decimal:2|min:0',
            group: 'change',

        },
        {
            name: 'cancellationOption',
            label: 'Cancellation Option',
            type: 'select',
            validation: 'required',
            group: 'cancellation',
            source: {
                type: 'array',
                options: [
                    {
                        label: 'Refundable',
                        value: 1,
                    },
                    {
                        label: 'Non Refundable with Airline Credit',
                        value: 2,
                    }

                ]
            },

        },
        {
            name: 'airlineCancelFees',
            label: 'Airline Fees Per Passenger',
            type: 'number',
            validation: 'required|max_value:10000000|decimal:2|min:0',
            group: 'cancellation',
            hide: true

        },
        {
            name: 'fly365CancelFees',
            label: 'Fly365 Fees Per Passenger',
            type: 'number',
            validation: 'required|max_value:10000000|decimal:2|min:0',
            group: 'cancellation',
            hide: true

        },
        {
            name: 'isActive',
            label: 'Status',
            type: 'select',
            validation: 'required',
            group: 'enabled',
            source: {
                type: 'array',
                options: [
                    {
                        label: 'Active',
                        value: true,
                    },
                    {
                        label: 'Disabled',
                        value: false,
                    },
                ]
            },
        },
    ]
};

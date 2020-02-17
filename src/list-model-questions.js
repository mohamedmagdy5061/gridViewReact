import { DOMAINS } from './components/gridTable/domain.constants';
import { DateFormatter } from './components/gridTable/helperMethods';

export default {
    title: 'Questionss',
    baseUrl:'https://internal.fly365dev.com/cms/faq/question/home?page=1&orderBy=createdAt&order=desc&pageSize=50',
    attributes: [
        {
            name: 'categoryId',
            label: 'Category',
            type: 'select',
            source: {
                requestPath: 'https://internal.fly365dev.com/cms/faq/category/home?pageSize=1000',
                keyAttribute: 'id',
                valueAttribute: 'name'
            }
        },
        {
            name: 'question',
            label: 'question',
            type: 'text'
        },
        {
            name: 'storeId',
            label: 'Store',
            type: 'text',
            source: {
                requestPath:`https://internal.fly365dev.com/config/store`,
                keyAttribute: 'storeId',
                valueAttribute: 'storeName'
            },
            value(row) {
                if (row.storesIds && row.storesIds.length) {
                    const stores = row.storesIds.map(storeId => DOMAINS[storeId].name);
                    return stores.join(', ');
                }
                return 'All Stores';
            }
        },
        {
            name: 'isFaq',
            label: 'isFaq',
            type: 'text'
        },
        {
            name: 'isActive',
            label: 'Is Active',
            type: 'text',
            value(row) {
                return row.isActive === true ? 'Active' : 'Disabled';
            }
        },
        {
            name: 'createdAt',
            label: 'Created At',
            type: 'text',
            value(row) {
                return DateFormatter(row.createdAt);
            }
        },
        {
            name: 'updatedAt',
            label: 'UpdatedAt At',
            type: 'text',
            value(row) {
                return DateFormatter(row.updatedAt);
            }
        },
    ],
    actions: {
        isCreate: true,
        isView: false,
        isDelete: true,
        isUpdate: true,
        isSelect: false,
        isPagination: true
      },
    permissions:
        {
            update: [],
            create: []
        },

};

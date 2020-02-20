import { DateFormatter } from './components/gridTable/helperMethods';

export default {
  title: 'Airlines',
  baseUrl:'https://internal.fly365dev.com/cms/airline/home',
  baseRoute:'/air-data/airline',
  // baseRoute:'airline/home',
  attributes: [
    {
      name: 'name',
      label: 'Name',
      type: 'text'
    },
    {
      name: 'code',
      label: 'iataCode',
      type: 'text'
    },
    {
      name: 'countryId',
      label: 'Country',
      type: 'select',
      source: {
        requestPath: 'https://internal.fly365dev.com/cms/country/home',
        keyAttribute: 'id',
        valueAttribute: 'name'
      }
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
    }
  ],
  actions: {
    isCreate: true,
    isView: true,
    isDelete: true,
    isUpdate: true,
    isSelect: true,
    isPagination: true
  },
  permissions: {
    update: [],
    create: []
  }
};

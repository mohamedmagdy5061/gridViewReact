import { DOMAINS } from './components/gridTable/domain.constants';
import { DateFormatter } from './components/gridTable/helperMethods';


export default {
    title: 'Rules',
    baseUrl: 'https://internal.fly365dev.com/rules/rule?page=1&orderBy=createdAt&order=desc&pageSize=50',
    attributes: [
      {
        name: 'name',
        label: 'Rule',
        type: 'text'
      },
      {
        name: 'carrierCodeString',
        label: 'Carrier',
        type: 'text',
        isHtml: true,
        value(row) {
          const value = row.carrierCodeString;
          if (value === 'gj') {
            return 'All Carriers';
            // return '<div className="badge font-weight-normal badge-pill badge-success text-white">All Carriers</div> ';
          }
          return value;
        }
      },
      {
        name: 'storeId',
        label: 'store',
        type: 'text',
        value(row) {
          return row.storeId && DOMAINS[row.storeId].name;
        }
      },
      {
        name: 'bookingCodeString',
        label: 'Booking Class',
        type: 'text'
      },
      {
        name: 'isActive',
        label: 'Status',
        type: 'text',
        value(row) {
          return row.isActive === true ? 'Active' : 'Disabled';
        },
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
      isView: false,
      isDelete: true,
      isUpdate: true,
      isSelect: true,
      isPagination: true
    },
    permissions: {
      update: ['PERMISSIONS.system_platform_rule'],
      create: ['PERMISSIONS.system_platform_rule']
    }
  };
  
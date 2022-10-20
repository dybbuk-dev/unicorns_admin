import Roles from './roles';
import Storage from './storage';

const storage = Storage.values;
const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.admin],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.admin],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.admin],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.admin],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.admin],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin],
      },
      bundleImport: {
        id: 'bundleImport',
        allowedRoles: [roles.admin],
      },
      bundleCreate: {
        id: 'bundleCreate',
        allowedRoles: [roles.admin],
      },
      bundleEdit: {
        id: 'bundleEdit',
        allowedRoles: [roles.admin],
      },
      bundleDestroy: {
        id: 'bundleDestroy',
        allowedRoles: [roles.admin],
      },
      bundleRead: {
        id: 'bundleRead',
        allowedRoles: [roles.admin, roles.custom],
      },
      bundleAutocomplete: {
        id: 'bundleAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;

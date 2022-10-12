import Roles from 'src/security/roles';
import Storage from 'src/security/storage';

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
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.admin],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      bundleImport: {
        id: 'bundleImport',
        allowedRoles: [roles.admin, roles.custom],
      },
      bundleCreate: {
        id: 'bundleCreate',
        allowedRoles: [roles.admin, roles.custom],
      },
      bundleEdit: {
        id: 'bundleEdit',
        allowedRoles: [roles.admin, roles.custom],
      },
      bundleDestroy: {
        id: 'bundleDestroy',
        allowedRoles: [roles.admin, roles.custom],
      },
      bundleRead: {
        id: 'bundleRead',
        allowedRoles: [roles.admin, roles.custom],
      },
      bundleAutocomplete: {
        id: 'bundleAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
      },
      segmentRead: {
        id: 'segmentRead',
        allowedRoles: [roles.admin, roles.custom],
      },
      rebateRead: {
        id: 'rebateRead',
        allowedRoles: [roles.admin, roles.custom],
      },
      experimentRead: {
        id: 'experimentRead',
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

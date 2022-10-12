import assert from 'assert';
import Error403 from '../../errors/Error403';
import Permissions from '../../security/permissions';
import EmailSender from '../emailSender';

/**
 * Checks the Permission of the User on a Tenant.
 */
export default class PermissionChecker {
  currentTenant;
  language;
  currentUser;

  constructor({ currentTenant, language, currentUser }) {
    this.currentTenant = currentTenant;
    this.language = language;
    this.currentUser = currentUser;
  }

  /**
   * Validates if the user has a specific permission
   * and throws a Error403 if it doesn't.
   */
  validateHas(permission) {
    if (!this.has(permission)) {
      throw new Error403(this.language);
    }
  }

  /**
   * Checks if the user has a specific permission.
   */
  has(permission) {
    assert(permission, 'permission is required');

    if (!this.isEmailVerified) {
      return false;
    }

    return this.hasRolePermission(permission);
  }

  /**
   * Validates if the user has access to a storage
   * and throws a Error403 if it doesn't.
   */
  validateHasStorage(storageId) {
    if (!this.hasStorage(storageId)) {
      throw new Error403(this.language);
    }
  }

  /**
   * Validates if the user has access to a storage.
   */
  hasStorage(storageId: string) {
    assert(storageId, 'storageId is required');
    return this.allowedStorageIds().includes(storageId);
  }

  /**
   * Checks if the current user roles allows the permission.
   */
  hasRolePermission(permission) {
    return this.currentUserRolesIds.some((role) =>
      permission.allowedRoles.some(
        (allowedRole) => allowedRole === role,
      ),
    );
  }

  get isEmailVerified() {
    // Only checks if the email is verified
    // if the email system is on
    if (!EmailSender.isConfigured) {
      return true;
    }

    return this.currentUser.emailVerified;
  }

  /**
   * Returns the Current User Roles.
   */
  get currentUserRolesIds() {
    if (!this.currentUser || !this.currentUser.tenants) {
      return [];
    }

    const tenant = this.currentUser.tenants
      .filter(
        (tenantUser) => tenantUser.status === 'active',
      )
      .find((tenantUser) => {
        return (
          tenantUser.tenant.id === this.currentTenant.id
        );
      });

    if (!tenant) {
      return [];
    }

    return tenant.roles;
  }

  /**
   * Returns the allowed storage ids for the user.
   */
  allowedStorageIds() {
    let allowedStorageIds: Array<string> = [];

    Permissions.asArray.forEach((permission) => {
      if (this.has(permission)) {
        allowedStorageIds = allowedStorageIds.concat(
          (permission.allowedStorage || []).map(
            (storage) => storage.id,
          ),
        );
      }
    });

    return [...new Set(allowedStorageIds)];
  }
}

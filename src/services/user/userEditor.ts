import Roles from '../../security/roles';
import assert from 'assert';
import Error400 from '../../errors/Error400';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import UserRepository from '../../database/repositories/userRepository';
import TenantUserRepository from '../../database/repositories/tenantUserRepository';
import { IServiceOptions } from '../IServiceOptions';

export default class UserEditor {
  options: IServiceOptions;
  data;
  session;
  user;

  constructor(options) {
    this.options = options;
  }

  async update(data) {
    this.data = data;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      await this._loadUser();
      await this._updateAtDatabase();

      await MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );

      throw error;
    }
  }

  get _roles() {
    if (
      this.data.roles &&
      !Array.isArray(this.data.roles)
    ) {
      return [this.data.roles];
    } else {
      const uniqueRoles = [...new Set(this.data.roles)];
      return uniqueRoles;
    }
  }

  async _loadUser() {
    this.user = await UserRepository.findById(
      this.data.id,
      this.options,
    );

    if (!this.user) {
      throw new Error400(
        this.options.language,
        'user.errors.userNotFound',
      );
    }
  }

  async _updateAtDatabase() {
    await TenantUserRepository.updateRoles(
      this.options.currentTenant.id,
      this.data.id,
      this.data.roles,
      this.options,
    );
  }

  /**
   * Checks if the user is removing it's own admin role
   */
  async _isRemovingOwnAdminRole() {
    if (this._roles.includes(Roles.values.admin)) {
      return false;
    }

    if (
      String(this.data.id) !==
      String(this.options.currentUser.id)
    ) {
      return false;
    }

    const tenantUser =
      this.options.currentUser.tenants.find(
        (userTenant) =>
          userTenant.tenant.id ===
          this.options.currentTenant.id,
      );

    return tenantUser.roles.includes(Roles.values.admin);
  }

  async _validate() {
    assert(
      this.options.currentTenant.id,
      'tenantId is required',
    );

    assert(
      this.options.currentUser,
      'currentUser is required',
    );
    assert(
      this.options.currentUser.id,
      'currentUser.id is required',
    );
    assert(
      this.options.currentUser.email,
      'currentUser.email is required',
    );

    assert(this.data.id, 'id is required');
    assert(this._roles, 'roles is required (can be empty)');

    if (await this._isRemovingOwnAdminRole()) {
      throw new Error400(
        this.options.language,
        'user.errors.revokingOwnPermission',
      );
    }
  }
}

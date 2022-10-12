import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import ShopRepository from '../database/repositories/shopRepository';
import UserRepository from '../database/repositories/userRepository';

export default class ShopService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.manager = await UserRepository.filterIdInTenant(
        data.manager,
        { ...this.options, session },
      );

      const record = await ShopRepository.create(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'entities.shop.errors.unique.name',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.manager = await UserRepository.filterIdInTenant(
        data.manager,
        { ...this.options, session },
      );

      const record = await ShopRepository.update(id, data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'entities.shop.errors.unique.name',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await ShopRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return ShopRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return ShopRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ShopRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await ShopRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}

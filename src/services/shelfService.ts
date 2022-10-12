import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import ShopRepository from '../database/repositories/shopRepository';
import DepartmentRepository from '../database/repositories/departmentRepository';
import SectionRepository from '../database/repositories/sectionRepository';
import ShelfRepository from '../database/repositories/shelfRepository';

export default class ShelfService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.shop = await ShopRepository.filterIdInTenant(
        data.shop,
        { ...this.options, session },
      );

      data.department =
        await DepartmentRepository.filterIdInTenant(
          data.department,
          { ...this.options, session },
        );

      data.section =
        await SectionRepository.filterIdInTenant(
          data.section,
          { ...this.options, session },
        );

      const record = await ShelfRepository.create(data, {
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
        'entities.shelf.errors.unique.name',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.shop = await ShopRepository.filterIdInTenant(
        data.shop,
        { ...this.options, session },
      );

      data.department =
        await DepartmentRepository.filterIdInTenant(
          data.department,
          { ...this.options, session },
        );

      data.section =
        await SectionRepository.filterIdInTenant(
          data.section,
          { ...this.options, session },
        );

      const record = await ShelfRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'entities.shelf.errors.unique.name',
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
        await ShelfRepository.destroy(id, {
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
    return ShelfRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return ShelfRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ShelfRepository.findAndCountAll(
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
    const count = await ShelfRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}

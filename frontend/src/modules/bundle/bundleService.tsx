import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import { Alchemy, Network } from 'alchemy-sdk';

export default class BundleService {
  static async update(id, data) {
    const body = {
      id,
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/bundle/${id}`,
      body,
    );

    return response.data;
  }

  static async destroyAll(ids) {
    const params = {
      ids,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.delete(
      `/tenant/${tenantId}/bundle`,
      {
        params,
      },
    );

    return response.data;
  }

  static async create(data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/bundle`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/bundle/${id}`,
    );

    return response.data;
  }

  static async list(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/bundle`,
      {
        params,
      },
    );

    return response.data;
  }

  static async listNFT() {
    const config = {
      apiKey: '9Ngi3iug8k2n7YN8NFccK7Slovnzdkzz',
      network: Network.MATIC_MAINNET,
    };
    const alchemy = new Alchemy(config);

    const address =
      '0x477F1EEe3CD57571f77b61B99D9526a37533C53d';

    const response = await alchemy.nft.getNftsForOwner(
      address,
    );

    let unicorns = [];
    let lands = [];

    for (
      let index = 0;
      index < response.ownedNfts.length;
      index++
    ) {
      if (
        response.ownedNfts[index].contract.symbol ===
        'UNICORNS'
      ) {
        unicorns.push({
          tokenId: response.ownedNfts[index].tokenId,
          image:
            response.ownedNfts[index].rawMetadata.image,
          title: response.ownedNfts[index].title,
        });
      } else if (
        response.ownedNfts[index].contract.symbol === 'UNIF'
      ) {
        lands.push({
          tokenId: response.ownedNfts[index].tokenId,
          image:
            response.ownedNfts[index].rawMetadata.image,
          title: response.ownedNfts[index].title,
        });
      }
    }

    const nfts = {
      unicorns: unicorns,
      lands: lands,
    };

    return nfts;
  }
}

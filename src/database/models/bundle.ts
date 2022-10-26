import mongoose from 'mongoose';
import NftSchema from './schemas/nftSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('bundle');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const BundleSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
      expirationDate: {
        type: Date,
      },
      UNIM: {
        type: Number,
        required: true,
      },
      RBW: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      unicorns: [NftSchema],
      lands: [NftSchema],
      importHash: { type: String },
    },
    { timestamps: true },
  );

  BundleSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  BundleSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  BundleSchema.set('toJSON', {
    getters: true,
  });

  BundleSchema.set('toObject', {
    getters: true,
  });

  return database.model('bundle', BundleSchema);
};

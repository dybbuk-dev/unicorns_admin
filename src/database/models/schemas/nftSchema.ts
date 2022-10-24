import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NftSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

NftSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

NftSchema.set('toJSON', {
  getters: true,
});

NftSchema.set('toObject', {
  getters: true,
});

export default NftSchema;

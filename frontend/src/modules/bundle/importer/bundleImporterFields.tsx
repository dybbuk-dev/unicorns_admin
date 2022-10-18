import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('bundle.fields.name'),
    schema: schemas.string(i18n('bundle.fields.name'), {
      required: true,
      max: 200,
      min: 1,
    }),
  },
  {
    name: 'manager',
    label: i18n('bundle.fields.manager'),
    schema: schemas.relationToOne(
      i18n('bundle.fields.manager'),
      {},
    ),
  },
];

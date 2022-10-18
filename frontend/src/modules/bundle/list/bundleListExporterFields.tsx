import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('bundle.fields.id'),
  },
  {
    name: 'name',
    label: i18n('bundle.fields.name'),
  },
  {
    name: 'manager',
    label: i18n('bundle.fields.manager'),
    render: exporterRenders.relationToOneUser(),
  },
  {
    name: 'createdAt',
    label: i18n('bundle.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('bundle.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];

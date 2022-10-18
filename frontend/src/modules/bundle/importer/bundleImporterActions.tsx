import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/bundle/importer/bundleImporterSelectors';
import BundleService from 'src/modules/bundle/bundleService';
import fields from 'src/modules/bundle/importer/bundleImporterFields';
import { i18n } from 'src/i18n';

const bundleImporterActions = importerActions(
  'BUNDLE_IMPORTER',
  selectors,
  BundleService.import,
  fields,
  i18n('bundle.importer.fileName'),
);

export default bundleImporterActions;

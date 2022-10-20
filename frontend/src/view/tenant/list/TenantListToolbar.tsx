import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import MDButton from 'src/mui/components/MDButton';

function TenantToolbar(props) {
  return (
    <ToolbarWrapper>
      <MDButton
        variant="gradient"
        color="purple"
        component={Link}
        to="/tenant/new"
        startIcon={<AddIcon />}
        size="small"
        circular
      >
        {i18n('common.new')}
      </MDButton>
    </ToolbarWrapper>
  );
}

export default TenantToolbar;

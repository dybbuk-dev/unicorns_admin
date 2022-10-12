import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import actions from 'src/modules/tenant/invitation/tenantInvitationActions';
import selectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import authSelectors from 'src/modules/auth/authSelectors';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';

const schema = yup.object().shape({
  id: yupFormSchemas.string(i18n('tenant.fields.tenantId')),
});

function TenantSelectForm(props) {
  const dispatch = useDispatch();
  const { sidenavColor } = selectMuiSettings();

  const loading = useSelector(selectors.selectLoading);

  const invitedTenants = useSelector(
    authSelectors.selectInvitedTenants,
  );

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const [initialValues] = useState({
    id: invitedTenants[0].id,
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = ({ id }) => {
    const tenantUserInvitation = currentUser.tenants.find(
      (tenantUser) => tenantUser.tenant.id === id,
    );

    dispatch(
      actions.doAccept(
        tenantUserInvitation.invitationToken,
      ),
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SelectFormItem
          name="id"
          label={i18n('tenant.fields.tenantId')}
          options={invitedTenants.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />

        <MDButton
          style={{ marginTop: '16px' }}
          variant="gradient"
          color={sidenavColor}
          type="submit"
          fullWidth
          disabled={loading}
        >
          {i18n('tenant.invitation.accept')}
        </MDButton>
        <MDButton
          style={{ marginTop: '16px' }}
          variant="gradient"
          color={sidenavColor}
          type="button"
          fullWidth
          onClick={props.onViewToggle}
        >
          {i18n('tenant.new.title')}
        </MDButton>
      </form>
    </FormProvider>
  );
}

export default TenantSelectForm;

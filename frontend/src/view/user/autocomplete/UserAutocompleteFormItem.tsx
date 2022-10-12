import React, { useState } from 'react';
import UserService from 'src/modules/user/userService';
import UserNewFormModal from 'src/view/user/new/UserNewFormModal';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/user/userSelectors';
import MDBox from 'src/mui/components/MDBox';
import { Avatar, Box } from '@mui/material';
import { getUserAvatar } from 'src/modules/utils';

function UserAutocompleteFormItem(props) {
  const { setValue, getValues } = useFormContext();
  const [modalVisible, setModalVisible] = useState(false);

  const { name, mode } = props;
  const isMultiple = mode && mode === 'multiple';

  const [avatar, setAvatar] = useState(null);

  const hasPermissionToCreate = useSelector(
    selectors.selectPermissionToCreate,
  );

  const onChangeUserAutocomplete = (value) => {
    setAvatar((value && value.avatar) ?? null);
  };

  const doCreateSuccess = (record) => {
    if (isMultiple) {
      setValue(
        name,
        [...(getValues()[name] || []), record],
        { shouldValidate: true, shouldDirty: true },
      );
    } else {
      setValue(name, record, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    setModalVisible(false);
  };

  const fetchFn = (value, limit) => {
    return UserService.fetchUserAutocomplete(value, limit);
  };

  const mapper = {
    toAutocomplete(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        value: originalValue.id,
        avatar: originalValue.avatar,
        label: originalValue.label,
      };
    },

    toValue(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        id: originalValue.value,
        avatar: originalValue.avatar,
        label: originalValue.label,
      };
    },
  };

  return (
    <>
      <MDBox sx={{ position: 'relative' }} pl={6}>
        <Avatar
          src={avatar}
          sx={{
            display: 'flex',
            position: 'absolute',
            flexShrink: 0,
            bottom: 4,
            left: 0,
          }}
        />
        <AutocompleteInMemoryFormItem
          {...props}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Avatar
                src={option.avatar}
                alt={option.label}
                sx={{
                  width: 32,
                  height: 32,
                  mr: 1,
                }}
              />
              {option.label}
            </Box>
          )}
          fetchFn={fetchFn}
          mapper={mapper}
          onOpenModal={() => setModalVisible(true)}
          hasPermissionToCreate={hasPermissionToCreate}
          onChange={onChangeUserAutocomplete}
        />
      </MDBox>

      {modalVisible && (
        <UserNewFormModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSuccess={doCreateSuccess}
        />
      )}
    </>
  );
}

export default UserAutocompleteFormItem;

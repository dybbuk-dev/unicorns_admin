import React, { useState } from 'react';
import BundleService from 'src/modules/bundle/bundleService';
import BundleFormModal from 'src/view/bundle/form/BundleFormModal';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/bundle/bundleSelectors';

function BundleAutocompleteFormItem(props) {
  const { setValue, getValues } = useFormContext();
  const [rerender, setRerender] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const hasPermissionToCreate = useSelector(
    selectors.selectPermissionToCreate,
  );

  const doCloseModal = () => {
    setModalVisible(false);
  };

  const doOpenModal = () => {
    setModalVisible(true);
  };

  const doCreateSuccess = (record) => {
    const { name, mode } = props;

    if (mode && mode === 'multiple') {
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

    setRerender(!rerender);
    doCloseModal();
  };

  const onChange = (value) => {
    props.onChange && props.onChange(value);
  };

  const fetchFn = (value, limit) => {
    return BundleService.listAutocomplete(value, limit);
  };

  const mapper = {
    toAutocomplete(originalValue) {
      if (!originalValue) {
        return null;
      }

      const value = originalValue.id;
      let label = originalValue.label;

      if (originalValue.title) {
        label = originalValue.title;
      }

      return {
        key: value,
        value,
        label,
      };
    },

    toValue(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        id: originalValue.value,
        label: originalValue.label,
      };
    },
  };

  return (
    <>
      <AutocompleteInMemoryFormItem
        {...props}
        fetchFn={fetchFn}
        onChange={onChange}
        mapper={mapper}
        onOpenModal={doOpenModal}
        hasPermissionToCreate={hasPermissionToCreate}
        rerender={rerender}
      />

      {modalVisible && (
        <BundleFormModal
          onClose={doCloseModal}
          onSuccess={doCreateSuccess}
        />
      )}
    </>
  );
}

export default BundleAutocompleteFormItem;

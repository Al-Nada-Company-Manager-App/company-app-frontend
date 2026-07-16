import { Modal } from 'antd';
import type { FormInstance } from 'antd';
import { useCallback } from 'react';

export const useDirtyForm = (form?: FormInstance) => {
  const isDirty = form ? form.isFieldsTouched() : false;

  const confirmDiscard = useCallback(
    (onConfirm: () => void) => {
      if (!form || !form.isFieldsTouched()) {
        onConfirm();
        return;
      }

      Modal.confirm({
        title: 'Discard unsaved changes?',
        content: 'You have unsaved changes. Are you sure you want to discard them?',
        okText: 'Discard',
        okType: 'danger',
        cancelText: 'Keep Editing',
        className: 'custom-modal', // Use custom modal styling
        onOk: () => {
          form.resetFields();
          onConfirm();
        },
      });
    },
    [form]
  );

  return { isDirty, confirmDiscard };
};

import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Modal, Upload } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { editFormLayout } from '../../constants';
import { apiRequest } from '../../helpers/apiRequest';
import { updateParrot } from '../../features/parrots/parrotsSlice';

const EditForm = ({ data, isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id, name } = data;

  useEffect(() => {
    /**
     * Как только получили новый item
     * стираем предыдущие значения
     */
    form.resetFields();
  }, [data]);

  const handleSubmit = async (data) => {
    const formData = new FormData();

    if (data.image.file) {
      /**
       * Если загружаем новую картинку
       * добавляем ее в formData
       */
      formData.append('image', data.image.file.originFileObj);
    }
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('flying', data.flying);

    const result = await apiRequest('PUT', `/parrots/update/${id}`, formData);

    if (result.data.status === 'ok') {
      dispatch(updateParrot(result.data.parrot));
      handleClose();
    }
  };

  const onFail = () => {};
  const changeValues = (values) => {};

  return (
    <Modal
      title={`Редактирование ${name}`}
      visible={isOpen}
      onOk={form.submit}
      onCancel={() => handleClose()}
      icon={<EditOutlined />}
      forceRender
    >
      <Form
        {...editFormLayout}
        initialValues={data}
        onFinish={handleSubmit}
        onFinishFailed={onFail}
        onValuesChange={changeValues}
        form={form}
      >
        <Form.Item
          label="Название"
          name="name"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, заполните название',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Описание"
          name="description"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, заполните описание.',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Картинка"
          name="image"
          valuePropName="file"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, загрузите картинку.',
            },
          ]}
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Летающий"
          name="flying"
          initialValue={!!data.flying}
          valuePropName="checked"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;

import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Upload, Select } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { editFormLayout } from '../../constants';
import { apiRequest } from '../../helpers/apiRequest';
import { updateParrot } from '../../features/parrots/parrotsSlice';
import ColorItem from './ColorItem';
import SelectColor from './SelectColor';

const { Option } = Select;

const EditForm = ({ data, isOpen, handleClose, countries }) => {
  const dispatch = useDispatch();
  const [colorModal, setColorModal] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [form] = Form.useForm();
  const { id, name, image, colors } = data;

  useEffect(() => {
    /**
     * Как только получили новый item
     * стираем предыдущие значения
     */
    form.resetFields();
  }, [data]);

  useEffect(() => {
    setSelectedColors(colors || []);
  }, [colors]);

  const handleSubmit = async (data) => {
    const formData = new FormData();

    if (data.image.file) {
      /**
       * Если загружаем новую картинку
       * добавляем ее в formData
       */
      formData.append('image', data.image.file.originFileObj);
    }

    const prepareColors = selectedColors.map((color) => ({
      // without active flag
      name: color.name,
      hex: color.hex,
    }));

    formData.append('name', data.name);
    formData.append('latin', data.latin);
    formData.append('habitat', JSON.stringify(data.habitat));
    formData.append('colors', JSON.stringify(prepareColors));
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
          label="По латыни"
          name="latin"
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
          label="Ареал обитания"
          name="habitat"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, заполните название',
            },
          ]}
        >
          <Select placeholder="Select habitat" mode="multiple" allowClear>
            {!!countries &&
              countries.length &&
              countries.map((country, index) => {
                return (
                  <Option
                    className="parrots__edit-form-habitat-option"
                    key={index}
                    value={country.name}
                  >
                    <img
                      className="parrots__edit-form-habitat-flag"
                      src={country.flag}
                      alt=""
                    />
                    {country.name}
                  </Option>
                );
              })}
          </Select>
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
        <Form.Item label="Цвет" name="selectedColors">
          <Button onClick={() => setColorModal(true)}>Выбрать цвет</Button>
          {!!selectedColors.length && (
            <div className="parrots__add-form-color-wrapper">
              {selectedColors.map((color) => {
                return <ColorItem color={color} />;
              })}
            </div>
          )}
          <Modal
            visible={colorModal}
            onCancel={() => setColorModal(false)}
            onOk={() => setColorModal(false)}
            closable
            width={1600}
          >
            <SelectColor
              getSelectColors={(colors) => setSelectedColors(colors)}
              previewImage={image}
            />
          </Modal>
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

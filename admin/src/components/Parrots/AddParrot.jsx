import React, { useState } from 'react';
import {
  Upload,
  Button,
  Form,
  Input,
  Alert,
  Checkbox,
  Select,
  Modal,
} from 'antd';
import { UploadOutlined, CheckOutlined } from '@ant-design/icons';
import { formLayout, formTailLayout } from '../../constants';
import { apiRequest } from '../../helpers/apiRequest';
import { useDispatch } from 'react-redux';
import { addParrot } from '../../features/parrots/parrotsSlice';
import SelectColor from './SelectColor';
import ColorItem from './ColorItem';

const { Option } = Select;

const AddParrot = ({ countries }) => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [colorModal, setColorModal] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    const prepareColors = selectedColors.map((color) => ({
      // without active flag
      name: color.name,
      hex: color.hex,
    }));

    // TODO добавить все в цикл
    formData.append('name', data.name);
    formData.append('latin', data.latin);
    formData.append('habitat', JSON.stringify(data.habitat));
    formData.append('colors', JSON.stringify(prepareColors));
    formData.append('description', data.description);
    formData.append('flying', data.flying);
    formData.append('image', data.image.file.originFileObj);

    try {
      const result = await apiRequest('POST', '/parrots/add', formData);
      if (result.data.status === 'ok') {
        dispatch(addParrot(result.data.parrot));
        setSuccess(true);
        form.resetFields();
      }
    } catch (e) {
      setError(true);
      setErrorMessage('Такой попугай существует');
    }
  };

  const onFail = () => {};

  const changeValues = (values) => {
    if (error) {
      setError(false);
    }
  };

  const uploadImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result);
        resolve();
      };
    });
  };

  return (
    <Form
      {...formLayout}
      onFinish={onSubmit}
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
            message: 'Пожалуйста, заполните ареал обитания',
            type: 'array',
          },
        ]}
      >
        <Select placeholder="Select habitat" mode="multiple" allowClear>
          {!!countries &&
            countries.length &&
            countries.map((country, index) => {
              return (
                <Option
                  style={{ display: 'flex', alignItems: 'center' }}
                  key={index}
                  value={country.name}
                >
                  <img
                    style={{
                      width: '20px',
                      height: 'auto',
                      marginRight: '10px',
                    }}
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
        <Upload name="image" beforeUpload={uploadImage}>
          <Button
            icon={previewImage ? <CheckOutlined /> : <UploadOutlined />}
            type={previewImage ? 'primary' : 'default'}
          >
            {previewImage ? 'Теперь можно выбрать цвет' : 'Загрузить'}
          </Button>
        </Upload>
      </Form.Item>

      {!!previewImage && (
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
              previewImage={previewImage}
            />
          </Modal>
        </Form.Item>
      )}

      <Form.Item
        label="Летающий"
        name="flying"
        valuePropName="checked"
        initialValue={false}
        rules={[
          {
            required: false,
            message: 'Пожалуйста, загрузите картинку.',
          },
        ]}
      >
        <Checkbox />
      </Form.Item>

      {/* END OF FORM */}

      {error && (
        <Form.Item {...formTailLayout}>
          <Alert
            type="error"
            message={errorMessage}
            banner
            closable
            onClose={() => setError(false)}
          />
        </Form.Item>
      )}

      {success && (
        <Form.Item {...formTailLayout}>
          <Alert
            type="success"
            message={'Успешно добавлен попугай'}
            banner
            closable
            onClose={() => setSuccess(false)}
          />
        </Form.Item>
      )}

      <Form.Item {...formTailLayout}>
        <Button type="primary" htmlType="submit">
          Принять
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddParrot;

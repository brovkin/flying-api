import React, { useState } from 'react';
import { Button, Image, Space, Table, Modal, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { green, red } from '@ant-design/colors';
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { parrotsSelector } from '../../selectors/parrots';
import { apiRequest } from '../../helpers/apiRequest';
import { deleteParrot } from '../../features/parrots/parrotsSlice';
import EditForm from './EditForm';
import ColorItem from './ColorItem';

const { confirm } = Modal;

const ParrotsTable = ({ countries }) => {
  const { items, loading } = useSelector(parrotsSelector);
  const [editForm, setEditForm] = useState(false);
  const [currentParrot, setCurrentParrot] = useState({});
  const dispatch = useDispatch();

  const deleteParrotFromTable = async (id) => {
    const result = await apiRequest('DELETE', `/parrots/${id}`);

    if (result.data.status === 'ok') {
      dispatch(deleteParrot(id));
    }
  };

  const showEditForm = (item) => {
    setCurrentParrot(item);
    setEditForm(true);
  };

  const showDeleteConfirm = (item) =>
    confirm({
      title: `Вы уверены, что хотите удалить ${item.name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk: () => deleteParrotFromTable(item.id),
    });

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'По латыни',
      dataIndex: 'latin',
      key: 'latin',
    },
    {
      title: 'Ареал обитания',
      dataIndex: 'habitat',
      key: 'habitat',
      render: (habitat) => {
        let newValues = [];

        habitat.forEach((country) => {
          newValues.push(...countries.filter((item) => item.name === country));
        });

        return (
          <List
            dataSource={newValues}
            renderItem={(item) => (
              <List.Item className="parrots__table-habitat-list">
                <b>{item.name}</b>
                <img
                  className="parrots__table-habitat-list-img"
                  src={item.flag}
                  alt=""
                />
              </List.Item>
            )}
          />
        );
      },
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      title: 'Цвет',
      dataIndex: 'colors',
      key: 'colors',
      width: 200,
      render: (colors) => {
        return (
          <div className="parrots__table-colors-list">
            {colors.map((color) => (
              <ColorItem color={color} />
            ))}
          </div>
        );
      },
    },
    {
      title: 'Картинка',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image width={100} src={image} />,
    },
    {
      title: 'Летающий',
      dataIndex: 'flying',
      key: 'flying',
      render: (value) =>
        value ? (
          <CheckCircleOutlined style={{ color: green.primary }} />
        ) : (
          <MinusCircleOutlined style={{ color: red.primary }} />
        ),
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      render: (empty, item) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => showEditForm(item)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            size="small"
            onClick={() => showDeleteConfirm(item)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey={(obj) => obj.id}
        dataSource={items}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
      <EditForm
        data={currentParrot}
        isOpen={editForm}
        handleClose={() => setEditForm(false)}
        countries={countries}
      />
    </>
  );
};

export default ParrotsTable;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from 'components/shared-components/Table';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Select, message } from 'antd';
import RoomService from 'services/RoomsService';
import {
  startLoading,
  getRoomsSuccess,
  hasError,
  deleteRoomSuccess,
  updateRoomSuccess,
  createRoomSuccess,
} from 'store/slices/roomsSlice';

const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

export const Rooms = () => {
  const dispatch = useDispatch();
  const { rooms, loading } = useSelector((state) => state.rooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [viewingRow, setViewingRow] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: '',
    code: '',
    description: '',
    capacity: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchRooms();
    fetchCategories();
  }, []);

  const fetchRooms = async () => {
    dispatch(startLoading());
    try {
      const data = await RoomService.getRooms();
      dispatch(getRoomsSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      dispatch(hasError(errorMessage));
      message.error(errorMessage);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await RoomService.getCategories();
      setCategories(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      message.error(errorMessage);
    }
  };

  const showModal = () => {
    setEditingRow(null);
    setForm({
      name: '',
      category: '',
      code: '',
      description: '',
      capacity: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRow(record);
    setForm({
      name: record.name,
      category: record.category?.name || '',
      code: record.code,
      description: record.description,
      capacity: record.capacity,
    });
    setIsModalOpen(true);
  };

  const handleView = async (id) => {
    try {
      const room = await RoomService.getRoom(id);
      setViewingRow(room);
      setIsViewModalOpen(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      message.error(errorMessage);
    }
  };

  const handleOk = async () => {
    if (editingRow) {
      try {
        const updatedRoom = {
          ...form,
        };
        const response = await RoomService.updateRoom(editingRow._id, updatedRoom);
        dispatch(updateRoomSuccess(response));
        message.success('Room updated successfully');
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        dispatch(hasError(errorMessage));
        message.error(errorMessage);
      }
    } else {
      try {
        const newRoom = {
          ...form,
        };
        const createdRoom = await RoomService.createRoom(newRoom);
        dispatch(createRoomSuccess(createdRoom));
        message.success('Room created successfully');

        fetchRooms();
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        dispatch(hasError(errorMessage));
        message.error(errorMessage);
      }
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleViewCancel = () => {
    setIsViewModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Êtes-vous sûr de supprimer ces informations ?',
      content: 'Cette action est irréversible.',
      okText: 'Oui', 
      cancelText: 'Non', 
      onOk: async () => {
        try {
          await RoomService.deleteRoom(id);
          dispatch(deleteRoomSuccess(id));
          message.success('Room deleted successfully');
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
          dispatch(hasError(errorMessage));
          message.error(errorMessage);
        }
      },
      onCancel() {},
    });
  };
  

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      searchable: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => category?.name || 'No Category',
      searchable: true,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      searchable: true,
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      searchable: true,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
      searchable: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      searchable: false,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button icon={<EyeOutlined />} onClick={() => handleView(record._id)} />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
        </div>
      ),
    },
  ];

  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '16px',
  };

  const labelStyle = {
    marginBottom: '8px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ marginBottom: 16, float: 'right' }}>
        New Room
      </Button>
      <Modal
        title={editingRow ? "Edit Room" : "New Room"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingRow ? "Update" : "Validate"}
      >
        <div style={modalStyle}>
          <div>
            <label style={labelStyle}>Name:</label>
            <Input name="name" value={form.name} onChange={handleInputChange} placeholder="Enter name" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Category:</label>
            <Select name="category" value={form.category} onChange={(value) => setForm({ ...form, category: value })} placeholder="Select a category" style={inputStyle}>
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>{category.name}</Option>
              ))}
            </Select>
          </div>
          <div>
            <label style={labelStyle}>Code:</label>
            <Input name="code" value={form.code} onChange={handleInputChange} placeholder="Enter code" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Capacity:</label>
            <Input name="capacity" value={form.capacity} onChange={handleInputChange} placeholder="Enter capacity" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Description:</label>
            <TextArea name="description" value={form.description} onChange={handleInputChange} rows={4} placeholder="Enter description" style={inputStyle} />
          </div>
        </div>
      </Modal>
      <Modal
        title="View Room"
        open={isViewModalOpen}
        onCancel={handleViewCancel}
        footer={null}
      >
        {viewingRow && (
          <div style={modalStyle}>
            <div>
              <label style={labelStyle}>Name:</label>
              <p>{viewingRow.name}</p>
            </div>
            <div>
              <label style={labelStyle}>Category:</label>
              <p>{viewingRow.category || 'No Category'}</p>
            </div>
            <div>
              <label style={labelStyle}>Code:</label>
              <p>{viewingRow.code}</p>
            </div>
            <div>
              <label style={labelStyle}>Capacity:</label>
              <p>{viewingRow.capacity}</p>
            </div>
            <div>
              <label style={labelStyle}>Created At:</label>
              <p>{viewingRow.createdAt}</p>
            </div>
            <div>
              <label style={labelStyle}>Description:</label>
              <p>{viewingRow.description}</p>
            </div>
          </div>
        )}
      </Modal>
      <CustomTable data={rooms} columns={columns} loading={loading} />
    </>
  );
};

export default Rooms;




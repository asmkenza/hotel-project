import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from 'components/shared-components/Table';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Input, message } from 'antd';
import {
  startLoading,
  getCategoriesSuccess,
  hasError,
  deleteCategorySuccess,
  updateCategorySuccess,
  createCategorySuccess,
} from 'store/slices/roomCategoriesSlice';
import RoomCategoryService from 'services/RoomCategoriesService';

export const RoomsCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.roomCategory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [form, setForm] = useState({
    name: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    dispatch(startLoading());
    try {
      const data = await RoomCategoryService.getCategories();
      dispatch(getCategoriesSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      dispatch(hasError(errorMessage));
      message.error(errorMessage);
    }
  };

  const showModal = () => {
    setEditingRow(null);
    setForm({
      name: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRow(record);
    setForm({
      name: record.name,
    });
    setIsModalOpen(true);
    console.log('Editing category with ID:', record._id);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Êtes-vous sûr de supprimer ces informations ?',
      content: 'Cette action est irréversible.',
      okText: 'Oui',
      okButtonProps: {
        style: { backgroundColor: 'blue', color: 'white', borderColor: 'blue' },
      },
      cancelText: 'Non',
      onOk: async () => {
        dispatch(startLoading());
        try {
          console.log('Deleting category with ID:', id);
          await RoomCategoryService.deleteCategory(id);
          dispatch(deleteCategorySuccess(id));
          message.success('Category deleted successfully');
          fetchCategories(); // Refresh the list after deletion
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
          dispatch(hasError(errorMessage));
          message.error(errorMessage);
        }
      },
    });
  };

  const handleOk = async () => {
    dispatch(startLoading());
    try {
      console.log('Form data:', form);

      if (editingRow) {
        await RoomCategoryService.updateCategory(editingRow._id, form);
        dispatch(updateCategorySuccess({ ...editingRow, ...form }));
        message.success('Category updated successfully');
      } else {
        await RoomCategoryService.createCategory(form);
        message.success('Category created successfully');
      }
      setIsModalOpen(false);
      fetchCategories(); // Refresh the list after creation or update
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      console.error('Error:', errorMessage);
      dispatch(hasError(errorMessage));
      message.error(errorMessage);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      searchable: true,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      searchable: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'created_at',
      searchable: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      searchable: false,
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} style={{ marginRight: 8 }} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ marginBottom: 16, float: 'right' }}>
        New Room Category
      </Button>
      <Modal
        title={editingRow ? "Edit Category" : "Add Category"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingRow ? "Update" : "Create"}
      >
        <div style={{ marginBottom: 16 }}>
          <label>Category Name:</label>
          <Input name="name" value={form.name} onChange={handleInputChange} placeholder="Enter category name" />
        </div>
      </Modal>

      <CustomTable loading={loading} data={categories} columns={columns} />
    </>
  );
};

export default RoomsCategories;


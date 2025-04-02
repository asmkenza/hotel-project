// import React from 'react';
// import { Form, Input, Upload, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';


// const RegisterHotelPage = () => {
//   const [form] = Form.useForm();

//   const onFinish = (values) => {
//     console.log('Received values:', values);
//   };

//   const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#f0f2f5',
//     margin: 0,
//     fontFamily: 'Arial, sans-serif',
//   };

//   const formStyle = {
//     backgroundColor: 'white',
//     padding: '24px',
//     borderRadius: '16px', 
//     boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)', 
//     width: '100%',
//     maxWidth: '600px',
//   };

//   const headerStyle = {
//     textAlign: 'center',
//     marginBottom: '24px',
//   };

//   const formItemStyle = {
//     marginBottom: '16px',
//   };

//   const labelStyle = {
//     textAlign: 'right',
//     width: '100%',
//   };

//   const inputStyle = {
//     width: '100%',
//   };

//   const buttonStyle = {
//     width: '100%',
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={formStyle}>
//         <h1 style={headerStyle}>Register Hotel Page</h1>
//         <Form
//           form={form}
//           name="register-hotel"
//           onFinish={onFinish}
//           labelCol={{ span: 24 }}
//           wrapperCol={{ span: 24 }}
//         >
//           <Form.Item
//             name="hotelName"
//             label="Nom de l’hôtel"
//             rules={[{ required: true, message: 'Veuillez entrer le nom de l’hôtel' }]}
//             style={formItemStyle}
//           >
//             <Input style={inputStyle} />
//           </Form.Item>

//           <Form.Item
//             name="logo"
//             label="Logo"
//             rules={[{ required: true, message: 'Veuillez télécharger le logo de l’hôtel' }]}
//             valuePropName="fileList"
//             getValueFromEvent={(e) => e.fileList}
//             style={formItemStyle}
//           >
//             <Upload beforeUpload={() => false}>
//               <Button icon={<UploadOutlined />} style={inputStyle}>
//                 Télécharger le logo
//               </Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item
//             name="photo"
//             label="Photo descriptive"
//             valuePropName="fileList"
//             getValueFromEvent={(e) => e.fileList}
//             style={formItemStyle}
//           >
//             <Upload beforeUpload={() => false}>
//               <Button icon={<UploadOutlined />} style={inputStyle}>
//                 Télécharger la photo
//               </Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item
//             name="location"
//             label="Emplacement"
//             rules={[{ required: true, message: 'Veuillez entrer l’emplacement de l’hôtel' }]}
//             style={formItemStyle}
//           >
//             <Input style={inputStyle} />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" style={buttonStyle}>
//               Enregistrer
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default RegisterHotelPage;













import React, { useEffect } from 'react';
import { Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createHotel, reset } from 'store/slices/registerHotelPageSlice'; // Assurez-vous que le chemin est correct


const RegisterHotelPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.registerHotelPage);

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('nom', values.hotelName);
    formData.append('emplacement', values.location);
    if (values.logo && values.logo.length > 0) {
      formData.append('logo', values.logo[0].originFileObj);
    }
    if (values.photo && values.photo.length > 0) {
      formData.append('photo', values.photo[0].originFileObj);
    }

    dispatch(createHotel(formData));
  };

  useEffect(() => {
    if (message) {
      message.success(message);
      dispatch(reset());
    }
    if (error) {
      message.error(error.message || 'Failed to create hotel');
      dispatch(reset());
    }
  }, [message, error, dispatch]);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '600px',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '24px',
  };

  const formItemStyle = {
    marginBottom: '16px',
  };

  const inputStyle = {
    width: '100%',
  };

  const buttonStyle = {
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={headerStyle}>Register Hotel Page</h1>
        <Form
          form={form}
          name="register-hotel"
          onFinish={onFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            name="hotelName"
            label="Nom de l’hôtel"
            rules={[{ required: true, message: 'Veuillez entrer le nom de l’hôtel' }]}
            style={formItemStyle}
          >
            <Input style={inputStyle} />
          </Form.Item>

          <Form.Item
            name="logo"
            label="Logo"
            rules={[{ required: true, message: 'Veuillez télécharger le logo de l’hôtel' }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            style={formItemStyle}
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />} style={inputStyle}>
                Télécharger le logo
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="photo"
            label="Photo descriptive"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            style={formItemStyle}
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />} style={inputStyle}>
                Télécharger la photo
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="location"
            label="Emplacement"
            rules={[{ required: true, message: 'Veuillez entrer l’emplacement de l’hôtel' }]}
            style={formItemStyle}
          >
            <Input style={inputStyle} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={buttonStyle} loading={loading}>
              Enregistrer
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterHotelPage;


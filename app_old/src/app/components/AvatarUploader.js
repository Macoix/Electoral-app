import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const AvatarUploader = ({ url, clase, imgUrl, imgLoad, onChange, advertencia }) => {
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Solo puede subir archivos JPG/PNG', 5);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('La imagen debe ser menor a 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {imgLoad ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className={clase}
        showUploadList={false}
        action={url}
        beforeUpload={beforeUpload}
        onChange={onChange}
      >
        {imgUrl != '' ? (
          <img src={imgUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <div className="mb-7 text-center">{advertencia}</div>
    </>
  );
};

AvatarUploader.propTypes = {
  url: PropTypes.string,
  clase: PropTypes.string,
  imgUrl: PropTypes.string,
  imgLoad: PropTypes.bool,
  advertencia: PropTypes.string,
  onChange: PropTypes.func
};

export default AvatarUploader;

import React from 'react';
import { Descriptions } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

const Expandible = ({
  documento,
  primerNombre,
  segundoNombre,
  primerApellido,
  segundoApellido,
  email,
  telefono,
  pais,
  departamento,
  municipio,
  comuna,
  barrio,
  direccion,
  genero,
  fechaNacimiento,
  profesion,
  estudios,
  ocupacion,
  puesto,
  mesa
}) => {
  const age = moment().diff(fechaNacimiento, 'years', false);
  return (
    <Descriptions
      title={`${primerNombre} ${primerApellido}`}
      bordered
      labelStyle={{
        backgroundColor: '#e2dcdc',
        fontWeight: '600',
        borderBottom: '1px solid #f0f0f0'
      }}
      contentStyle={{ borderBottom: '1px solid #f0f0f0' }}
    >
      <Descriptions.Item label="Documento" span={2}>
        {documento}
      </Descriptions.Item>
      <Descriptions.Item label="Primer Nombre">{primerNombre}</Descriptions.Item>
      <Descriptions.Item label="Segundo Nombre" span={2}>
        {segundoNombre}
      </Descriptions.Item>
      <Descriptions.Item label="Primer Apellido">{primerApellido}</Descriptions.Item>
      <Descriptions.Item label="Segundo Apellido" span={2}>
        {segundoApellido}
      </Descriptions.Item>
      <Descriptions.Item label="Fecha Nacimiento">
        {moment(fechaNacimiento).format('DD-MM-YYYY')}
      </Descriptions.Item>
      <Descriptions.Item label="Edad" span={2}>
        {age}
      </Descriptions.Item>
      <Descriptions.Item label="Email">{email}</Descriptions.Item>
      <Descriptions.Item label="Educacion" span={2}>
        {estudios}
      </Descriptions.Item>
      <Descriptions.Item label="Profesion">{profesion}</Descriptions.Item>
      <Descriptions.Item label="Ocupacion" span={2}>
        {ocupacion}
      </Descriptions.Item>
      <Descriptions.Item label="Telefono">{telefono}</Descriptions.Item>
      <Descriptions.Item label="Pais" span={2}>
        {pais}
      </Descriptions.Item>
      <Descriptions.Item label="Departamento">{departamento}</Descriptions.Item>
      <Descriptions.Item label="Municipio" span={2}>
        {municipio}
      </Descriptions.Item>
      <Descriptions.Item label="Comuna">{comuna}</Descriptions.Item>
      <Descriptions.Item label="Barrio" span={2}>
        {barrio}
      </Descriptions.Item>
      <Descriptions.Item label="Direccion">{direccion}</Descriptions.Item>
      <Descriptions.Item label="genero" span={2}>
        {genero}
      </Descriptions.Item>
      <Descriptions.Item label="Puesto de votacion">{puesto}</Descriptions.Item>
      <Descriptions.Item label="Mesa de votacion">{mesa}</Descriptions.Item>
    </Descriptions>
  );
};

Expandible.propTypes = {
  documento: PropTypes.string,
  primerNombre: PropTypes.string,
  segundoNombre: PropTypes.string,
  primerApellido: PropTypes.string,
  segundoApellido: PropTypes.string,
  email: PropTypes.string,
  telefono: PropTypes.string,
  pais: PropTypes.string,
  departamento: PropTypes.string,
  municipio: PropTypes.string,
  comuna: PropTypes.string,
  barrio: PropTypes.string,
  direccion: PropTypes.string,
  genero: PropTypes.string,
  fechaNacimiento: PropTypes.string,
  profesion: PropTypes.string,
  estudios: PropTypes.string,
  ocupacion: PropTypes.string,
  puesto: PropTypes.string,
  mesa: PropTypes.string
};

export default Expandible;

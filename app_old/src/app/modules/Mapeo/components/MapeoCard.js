/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Form, Row, Col, Select, Button, notification, Statistic, message } from 'antd';
import {
  DownOutlined,
  UpOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import L from 'leaflet';
import http from '../../../../utils/axios';
import { NumberCard } from '../../../components/NumberCard';


const { Option } = Select;

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapeoCard = ({ className, title, subtitle }) => {
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [profesiones, setProfesiones] = useState([]);
  const [estudios, setEstudios] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [center, setCenter] = useState([4.570868, -74.297333]);
  const [zoom, setZoom] = useState(6);

  const [showResultados, setShowResultados] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPais, setTotalPais] = useState(0);
  const [totalDepartamento, setTotalDepartamento] = useState(0);
  const [totalMunicipio, setTotalMunicipio] = useState(0);
  const [totalComuna, setTotalComuna] = useState(0);
  const [totalBarrio, setTotalBarrio] = useState(0);
  const [totalGenero, setTotalGenero] = useState(0);
  const [totalPuesto, setTotalPuesto] = useState(0);
  const [totalMesa, setTotalMesa] = useState(0);
  const [totalPosiblesVotantesPuesto, setPosiblesVotantesPuesto] = useState(0);
  const [totalRol, setTotalRol] = useState(0);
  const [totalOcupacion, setTotalOcupacion] = useState(0);

  useEffect(() => {
    paisesFetch();
    departamentosFetch();
    municipiosFetch();
    comunasFetch();
    barriosFetch();
    generosFetch();
    profesionesFetch();
    estudiosFetch();
    puestosFetch();
    mesasFetch();
    rolesFetch();
  }, []);

  const paisesFetch = async () => {
    const response = await http.get('/api/v1/paises/');
    setPaises(response.data);
  };

  const departamentosFetch = async () => {
    const response = await http.get('/api/v1/departamentos/');
    setDepartamentos(response.data);
  };
  const municipiosFetch = async () => {
    const response = await http.get('/api/v1/municipios/');
    setMunicipios(response.data);
  };
  const comunasFetch = async () => {
    const response = await http.get('/api/v1/comunas/');
    setComunas(response.data);
  };
  const barriosFetch = async () => {
    const response = await http.get('/api/v1/barrios/');
    setBarrios(response.data);
  };
  const generosFetch = async () => {
    const response = await http.get('/api/v1/generos/');
    setGeneros(response.data);
  };
  const profesionesFetch = async () => {
    const response = await http.get('/api/v1/profesiones/');
    setProfesiones(response.data);
  };
  const estudiosFetch = async () => {
    const response = await http.get('/api/v1/estudios/');
    setEstudios(response.data);
  };
  const puestosFetch = async () => {
    const response = await http.get('/api/v1/votaciones/puestos');
    setPuestos(response.data);
  };
  const mesasFetch = async () => {
    const response = await http.get('/api/v1/votaciones/mesas');
    setMesas(response.data);
  };
  const rolesFetch = async () => {
    const response = await http.get('/api/v1/roles');
    setRoles(response.data);
  };

  const onFinish = async (values) => {
    setShowResultados(false);
    await http
      .get('/api/v1/personas/search', {
        params: values
      })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          setPersonas(response.data.votantes.personas);
          setTotal(response.data.votantes.total_votantes);
          response.data.votantes.total_votantes_pais
            ? setTotalPais(response.data.votantes.total_votantes_pais)
            : setTotalPais(0);
          response.data.votantes.total_votantes_departamento
            ? setTotalDepartamento(response.data.votantes.total_votantes_departamento)
            : setTotalDepartamento(0);
          response.data.votantes.total_votantes_municipio
            ? setTotalMunicipio(response.data.votantes.total_votantes_municipio)
            : setTotalMunicipio(0);
          response.data.votantes.total_votantes_comuna
            ? setTotalComuna(response.data.votantes.total_votantes_comuna)
            : setTotalComuna(0);
          response.data.votantes.total_votantes_barrio
            ? setTotalBarrio(response.data.votantes.total_votantes_barrio)
            : setTotalBarrio(0);
          response.data.votantes.total_votantes_puesto
            ? setTotalPuesto(response.data.votantes.total_votantes_puesto)
            : setTotalPuesto(0);
          response.data.votantes.total_votantes_rol
            ? setTotalRol(response.data.votantes.total_votantes_rol)
            : setTotalRol(0);
          response.data.votantes.total_posibles_votantes_puesto
            ? setPosiblesVotantesPuesto(
                response.data.votantes.total_posibles_votantes_puesto
              )
            : setPosiblesVotantesPuesto(0);
          response.data.votantes.total_votantes_genero
            ? setTotalGenero(response.data.votantes.total_votantes_genero)
            : setTotalGenero(0);

          setShowResultados(true);
          notification.open({
            message: 'Exito en la busqueda',
            description: response.data.message,
            // icon: <CheckCircleOutlined style={{ color: '#5cb85c' }} />
          });
        } else {
          notification.open({
            message: 'Exito en la busqueda',
            description: 'No se encontraron resultados',
            // icon: <CheckCircleOutlined style={{ color: '#5cb85c' }} />
          });
        }
      })
      .catch((error) => {
        setShowResultados(false);
        notification.open({
          message: 'Error',
          description: error.response.data.message,
          // icon: <CloseCircleOutlined style={{ color: 'red' }} />
        });
      });
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const calculatePorcent = (total, totalbuscado) => {
    const porcentaje = Math.round((totalbuscado * 100) / total);
    return `Equivale al ${porcentaje}% del total`;
  };

  function ChangeView({ personas }) {
    const bounds = [];
    const map = useMap();
    // eslint-disable-next-line react/prop-types
    // personas.map(() => {
    //   if (persona.latitude != null && persona.longitude !== null) {
    //     bounds.push([persona.latitude, persona.longitude]);
    //   }
    // });
    // console.log(bounds);
    map.setView(center, zoom);
    return null;
  }

  const handleFormValuesChange = (changedValues) => {
    const formFieldNamed = Object.keys(changedValues)[0];
    if (formFieldNamed === 'idPais') {
      if (changedValues[formFieldNamed] !== undefined) {
      }
    }
    // if (formFieldNamed == 'idMunicipio') {
    //   setTexto('el municipio');
    // }
  };

  return (
    <div>
       <div className={`card card-custom shadow ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
            <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
                {title}
            </span>
            {subtitle && (
                <span className="text-muted mt-3 font-weight-bold font-size-sm">
                    {subtitle}
                </span>
            )}
            </h3>
            <div className="card-toolbar">
            </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className="card-body">
          <Form
            form={form}
            layout="vertical"
            name="advanced_search"
            className="w-full"
            onValuesChange={handleFormValuesChange}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ marginBottom: '2.5rem' }}
          >
            <Row>
              <Col span={4} className="mr-5">
                <Form.Item name="idPais" label="Pais">
                  <Select
                    placeholder="Seleccione un Pais"
                    allowClear
                  >
                    {paises.map((pais) => (
                      <Option key={pais.id} value={pais.id}>
                        {pais.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} className="mr-5">
                <Form.Item name="idDepartamento" label="Departamento">
                  <Select placeholder="Seleccione un departamento" allowClear>
                    {departamentos.map((departamento) => (
                      <Option key={departamento.id} value={departamento.id}>
                        {departamento.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} className="mr-5">
                <Form.Item name="idMunicipio" label="Municipio">
                  <Select placeholder="Seleccione un municipio" allowClear>
                    {municipios.map((municipio) => (
                      <Option key={municipio.id} value={municipio.id}>
                        {municipio.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} className="mr-5">
                <Form.Item name="idComuna" label="Comuna">
                  <Select placeholder="Seleccione una comuna" allowClear>
                    {comunas.map((comuna) => (
                      <Option key={comuna.id} value={comuna.id}>
                        {comuna.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} className="mr-5">
                <Form.Item name="idBarrio" label="Barrio">
                  <Select placeholder="Seleccione un barrio" allowClear>
                    {barrios.map((barrio) => (
                      <Option key={barrio.id} value={barrio.id}>
                        {barrio.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} className="mr-5">
                <Form.Item name="idGenero" label="Genero">
                  <Select placeholder="Seleccione un genero" allowClear>
                    {generos.map((genero) => (
                      <Option key={genero.id} value={genero.id}>
                        {genero.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} className="mr-5">
                <Form.Item name="profesion_id" label="Profesion">
                  <Select placeholder="Seleccione una profesión" allowClear>
                    {profesiones.map((profesion) => (
                      <Option key={profesion.id} value={profesion.id}>
                        {profesion.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} className="mr-5">
                <Form.Item name="estudios_id" label="Nivel Académico">
                  <Select placeholder="Seleccione un nivel" allowClear>
                    {estudios.map((estudio) => (
                      <Option key={estudio.id} value={estudio.id}>
                        {estudio.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} className="mr-5">
                <Form.Item name="puesto" label="Puesto de Votación">
                  <Select placeholder="Seleccione un puesto" allowClear>
                    {puestos.map((puesto, index) => (
                      <Option key={index} value={puesto.name}>
                        {puesto.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} className="mr-5">
                <Form.Item name="mesa" label="Mesa de votación">
                  <Select placeholder="Seleccione una mesa" allowClear>
                    {mesas.map((mesa, index) => (
                      <Option key={index} value={mesa.name}>
                        {mesa.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4} className="mr-5">
                <Form.Item name="idRol" label="Rol">
                  <Select placeholder="Seleccione un rol" allowClear>
                    {roles.map((rol, index) => (
                      <Option key={index} value={rol.id}>
                        {rol.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col
                span={24}
                style={{
                  textAlign: 'right'
                }}
              >
                <Button type="primary" htmlType="submit">
                  Buscar
                </Button>
                <Button
                  style={{
                    margin: '0 8px'
                  }}
                  onClick={() => {
                    setPersonas([]);
                    form.resetFields();
                    setExpand(!expand);
                    setZoom(6);
                    setShowResultados(false);
                  }}
                >
                  Limpiar
                </Button>
                {/* <a
                style={{
                  fontSize: 12
                }}
              >
                {expand ? <UpOutlined /> : <DownOutlined />} Collapse
              </a> */}
              </Col>
            </Row>
          </Form>
          {showResultados && (
          <Row gutter={16} className="mt-10 mb-10">
            <Col span={5}>
              <NumberCard
                className="shadow"
                title="Total de Votantes"
                value={total}
              />
            </Col>
            {/* <Col span={4}>
              <Statistic title={`Total de Votantes en ${variable}`} value={total} />
            </Col> */}
            {totalPais > 0 && (
              <Col span={5}>
                <NumberCard
                  className="shadow"
                  title="Total de votantes en el pais"
                  value={totalPais}
                  suffix={calculatePorcent(total, totalPais)}
                />
              </Col>
            )}
            {totalDepartamento > 0 && (
              <Col span={5}>
                <NumberCard
                  className="shadow"
                  title={`Total de votantes en el departamento`}
                  value={totalDepartamento}
                  groupSeparator="."
                  suffix={calculatePorcent(total, totalDepartamento)}
                />
              </Col>
            )}
            {totalMunicipio > 0 && (
              <Col span={5}>
                <NumberCard
                  className="shadow"
                  title={`Total de votantes en el municipio`}
                  value={totalMunicipio}
                  groupSeparator="."
                  suffix={calculatePorcent(total, totalMunicipio)}
                />
              </Col>
            )}
            {totalComuna > 0 && (
              <Col span={5}>
                <NumberCard
                  className="shadow"
                  title={`Total de votantes en la comuna`}
                  value={totalComuna}
                  groupSeparator="."
                  suffix={calculatePorcent(total, totalComuna)}
                />
              </Col>
            )}
            {totalBarrio > 0 && (
              <Col span={5}>
                <NumberCard
                  className="shadow"
                  title={`Total de votantes en el barrio`}
                  value={totalBarrio}
                  groupSeparator="."
                  suffix={calculatePorcent(total, totalBarrio)}
                />
              </Col>
            )}
            {totalGenero > 0 && (
              <Col span={5}>
                <NumberCard
                  className="shadow"
                  title={`Votantes por genero seleccionado`}
                  value={totalGenero}
                  groupSeparator="."
                  suffix={calculatePorcent(total, totalGenero)}
                />
              </Col>
            )}
            {totalPuesto > 0 && (
              <Col span={5}>
                <NumberCard
                  className="shadow"
                  title={`Votantes en el puesto de votacion`}
                  value={totalPuesto}
                  groupSeparator="."
                  suffix={calculatePorcent(total, totalPuesto)}
                />
              </Col>
            )}
            {totalRol > 0 && (
              <Col span={5}>
                <NumberCard
                  className="shadow"
                  title={`Total de votantes con este Rol`}
                  value={totalRol}
                  groupSeparator="."
                  suffix={calculatePorcent(total, totalRol)}
                />
              </Col>
            )}
            {totalPosiblesVotantesPuesto > 0 && (
              <Col span={5}>
                <NumberCard
                  className="shadow"
                  title={`Total de posibles votantes`}
                  value={totalPosiblesVotantesPuesto}
                  groupSeparator="."
                  // suffix={calculatePorcent(total, totalPosiblesVotantesPuesto)}
                />
              </Col>
            )}
          </Row>
        )}

          <MapContainer
            style={{ height: '85vh', zIndex: '1' }}
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
          >
            <ChangeView personas={personas} />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {personas.length === 0
              ? ''
              : personas.map((persona, index) => {
                  return (
                    <Marker
                      key={index}
                      position={[
                        persona.latitude != null ? persona.latitude : 4.570868,
                        persona.longitude != null ? persona.longitude : -74.297333
                      ]}
                    >
                      <Popup>
                        <div>
                          <b>Nombres: </b>
                          {`${persona.primerNombre} ${persona.segundoNombre}`}
                        </div>
                        <div>
                          <b>Apellidos: </b>
                          {`${persona.primerApellido} ${persona.segundoApellido}`}
                        </div>
                        <div>{persona.direccion}</div>
                      </Popup>
                    </Marker>
                  );
                })}
          </MapContainer>
        </div>
        {/* end::Body */}
      </div>
    </div>
  )
}

export default MapeoCard

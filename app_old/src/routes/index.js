// import React from 'react';
// import {
//   faUser,
//   faCog,
//   faBriefcase,
//   faBook,
//   faMapMarkedAlt,
//   faMapMarkerAlt,
//   faUserTag,
//   faHome,
//   faToolbox,
//   faUserCog,
//   faQuoteLeft,
//   faBuilding,
//   faEdit,
//   faVenusMars,
//   faSearch
// } from '@fortawesome/free-solid-svg-icons';

const Routes = [
  {
    // icon: faHome,
    title: 'Dasboard',
    key: '/dasboard',
    path: '/dashboard'
  },
  {
    // icon: faMapMarkerAlt,
    title: 'Mapeo territorial',
    key: '',
    path: '/mapeo-territorial',
    children: [
      {
        title: 'Busqueda por criterios',
        key: '/busqueda-criterios',
        path: '/mapeo-territorial/busqueda-criterios'
      },
      {
        title: 'Votantes',
        key: '/votantes',
        path: '/mapeo-territorial/votantes'
      }
    ]
  },
  {
    // icon: faUserCog,
    title: 'Administración',
    key: '/administracion',
    path: '/administracion',
    children: [
      {
        // icon: faUser,
        title: 'Usuarios',
        key: '/users',
        path: '/administracion/usuarios'
      },
      {
        // icon: faUserTag,
        title: 'Roles',
        key: '/Roles',
        path: '/administracion/roles'
      },
      {
        // icon: faQuoteLeft,
        title: 'Terminos y Condiciones',
        key: '/terminos-condiciones',
        path: '/administracion/terminos-condiciones'
      }
    ]
  },
  {
    // icon: faCog,
    title: 'Configuración',
    key: '/config',
    path: '/configuracion',
    children: [
      {
        // icon: faToolbox,
        title: 'Básica de la campaña',
        key: '/configuracion',
        path: '/configuracion/basica'
      },
      {
        // icon: faMapMarkerAlt,
        title: 'Ubicación',
        key: '/ubicacion',
        path: '/configuracion/ubicacion',
        children: [
          {
            // icon: faMapMarkedAlt,
            title: 'Paises',
            key: '/pais',
            path: '/configuracion/ubicacion/paises'
          },
          {
            // icon: faMapMarkedAlt,
            title: 'Departamentos',
            key: '/departamentos',
            path: '/configuracion/ubicacion/departamentos'
          },
          {
            // icon: faMapMarkedAlt,
            title: 'Municipios',
            key: '/municipios',
            path: '/configuracion/ubicacion/municipios'
          },
          {
            // icon: faMapMarkedAlt,
            title: 'Comunas/Corrregimientos',
            key: '/comunas',
            path: '/configuracion/ubicacion/comunas'
          },
          {
            // icon: faMapMarkedAlt,
            title: 'Barrios/Veredas',
            key: '/barrios',
            path: '/configuracion/ubicacion/barrios-corregimientos'
          },
          {
            // icon: faMapMarkerAlt,
            title: 'Puestos de Votacion',
            key: '/puestos',
            path: '/configuracion/ubicacion/puestos-votacion'
          }
        ]
      },
      {
        // icon: faUser,
        title: 'Votantes',
        key: '/votantesMenu',
        path: '/configuracion/votantes',
        children: [
          {
            // icon: faVenusMars,
            title: 'Generos',
            key: '/generos',
            path: '/configuracion/votantes/generos'
          },
          {
            // icon: faBriefcase,
            title: 'Profesiones',
            key: '/profesiones',
            path: '/configuracion/votantes/profesiones'
          },
          {
            // icon: faBook,
            title: 'Nivel Academico',
            key: '/nivel-academico',
            path: '/configuracion/votantes/nivel-academico'
          },
          {
            // icon: faBook,
            title: 'Ocupaciones',
            key: '/ocupaciones',
            path: '/configuracion/votantes/ocupaciones'
          }
        ]
      }
    ]
  },
  {
    // icon: faEdit,
    title: 'PQRDS',
    key: '/PQRDS',
    path: '/PQRDS',
    children: [
      {
        // icon: faEdit,
        title: 'Tipo',
        key: '/asd',
        path: '/asd'
      },
      {
        // icon: faEdit,
        title: 'Peticiones',
        key: '/asdasd',
        path: '/asdasd'
      }
    ]
  }
];

export default Routes;

import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import Votantes from '../app/modules/Votantes'
import Mapeo from '../app/modules/Mapeo'
import Paises from '../app/modules/Pais';
import Departamento from '../app/modules/Departamento';
import Municipio from '../app/modules/Municipio';
import Comuna from '../app/modules/Comunas';
import Barrio from '../app/modules/Barrio';
import Puesto from '../app/modules/Puestos-Votacion';
import Genero from '../app/modules/Genero';
import Profesion from '../app/modules/Profesion';
import NivelAcademico from '../app/modules/Nivel-Academico';
import Ocupacion from '../app/modules/Ocupacion';
import Usuario from '../app/modules/Usuario';
import Roles from '../app/modules/Roles';
import Terminos from '../app/modules/Terminos-Condiciones';

const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />

        <ContentRoute path="/mapeo-territorial/busqueda-criterios" component={Mapeo} />
        <ContentRoute path="/mapeo-territorial/votantes" component={Votantes} />

        <ContentRoute path="/configuracion/ubicacion/paises" component={Paises} />
        <ContentRoute path="/configuracion/ubicacion/departamentos" component={Departamento} />
        <ContentRoute path="/configuracion/ubicacion/municipios" component={Municipio} />
        <ContentRoute path="/configuracion/ubicacion/comunas" component={Comuna} />
        <ContentRoute path="/configuracion/ubicacion/barrios-corregimientos" component={Barrio} />
        <ContentRoute path="/configuracion/ubicacion/puestos-votacion" component={Puesto} />
        <ContentRoute path="/configuracion/votantes/generos" component={Genero} />
        <ContentRoute path="/configuracion/votantes/profesiones" component={Profesion} />
        <ContentRoute path="/configuracion/votantes/nivel-academico" component={NivelAcademico} />
        <ContentRoute path="/configuracion/votantes/ocupaciones" component={Ocupacion} />

        <ContentRoute path="/administracion/usuarios" component={Usuario} />
        <ContentRoute path="/administracion/roles" component={Roles} />
        <ContentRoute path="/administracion/terminos-condiciones" component={Terminos} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/user-profile" component={UserProfilepage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}

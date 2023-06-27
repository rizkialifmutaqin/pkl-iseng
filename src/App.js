import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./admin/Login";

import DataLogin from "./admin/DataLogin";
import TambahLogin from "./admin/TambahLogin";
import EditLogin from "./admin/EditLogin";

import DataSiswa from "./admin/DataSiswa";
import TambahSiswa from "./admin/TambahSiswa";
import EditSiswa from "./admin/EditSiswa";
import UbahPassword from "./admin/UbahPassword";

import Template from "./template/Template";
import MainPage from "./user/MainPage";


function App() {
  return (
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/dataLogin" exact>
          <DataLogin />
        </Route>
        <Route path="/dataLogin/tambahLogin" exact>
          <TambahLogin />
        </Route>
        <Route path="/dataLogin/editLogin/:id" exact>
          <EditLogin />
        </Route>

        <Route path="/dataSiswa" exact>
          <DataSiswa />
        </Route>
        <Route path="/dataSiswa/tambahSiswa" exact>
          <TambahSiswa />
        </Route>
        <Route path="/dataSiswa/editSiswa/:id" exact>
          <EditSiswa />
        </Route>

        <Route>
          <Template>
            <Switch>
              <Route path="/mainPage">
                <MainPage />
              </Route>
              <Route path="/ubahPassword/:id" exact>
                <UbahPassword />
              </Route>
            </Switch>
          </Template>
        </Route>
     </Switch>
  );
}

export default App;

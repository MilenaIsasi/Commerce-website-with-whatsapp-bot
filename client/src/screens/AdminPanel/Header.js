import React from "react";
import SalirBtn from "../../components/SalirBtn";
import useGetUsuarios from "./customHooks/useGetUsuarios";
export default function Header() {
  const autorizacion = useGetUsuarios();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/cpanel/adm">
          Panel de Admin
        </a>
        <SalirBtn />
      </div>
    </nav>
  );
}

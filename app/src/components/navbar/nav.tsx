"use client";
import { useAuth } from "../../context/authContext/Auth.Context";
import "./nav.css";

interface Props {
  onLogout?: () => void;
}

export const Navbar = ({ onLogout }: Props) => {
  const { Logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Incus Products IAAS</h2>
        </div>
        <div className="navbar-actions">
          <button className="logout-button" onClick={Logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

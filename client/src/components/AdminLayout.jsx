import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background ">
      <AdminNavbar />
        <Outlet />
    </div>
  );
}

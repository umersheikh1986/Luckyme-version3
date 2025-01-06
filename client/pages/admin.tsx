import type { NextPage } from "next";
import AdminCards from "../components/AdminCards";
import AdminC from "../components/admin/admin";

const Admin: NextPage = () => {
  return (
    <main className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
      <AdminCards />
      <br />
      <AdminC />
    </main>
  );
};

export default Admin;

import type { NextPage } from "next";
import { useRouter } from "next/router";
import Register from "../../components/register";

const RegisterId: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Register id={id} />;
};

export default RegisterId;

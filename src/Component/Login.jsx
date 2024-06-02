import { useState } from "react";
import { NavLink } from "react-router-dom";
const Login = () => {
  const [etat, setEtat] = useState("Admin");

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center gap-2  h-screen  w-screen ">
        <div className="bg-gray-200 flex flex-col  mt-2 w-[450px] px-11 py-12  ">
          <div className="flex flex-col gap-2 mb-5">
            <ul className="flex justify-center gap-4">
              <li
                className="bg-gray-300 rounded-xl px-3 py-1 cursor-pointer"
                onClick={() => setEtat("Admin")}
              >
                Admin
              </li>
              <li
                className="bg-gray-300 rounded-xl px-3 py-1 cursor-pointer"
                onClick={() => setEtat("Magasinier")}
              >
                Magasinier
              </li>
            </ul>
          </div>
          <form className="flex flex-col gap-6">
            <div>
              <h1 className="font-bold text-xl">
                Sign in to your acount : <span className="text-gray-500">{etat}</span>
              </h1>
            </div>
            <div>
              <div className="flex flex-col my-3">
                <label className="font-semibold ">Email</label>
                <input
                  type="email"
                  className="py-2 px-3 rounded-sm border-none outline-none"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold ">Password</label>
                <input
                  type="password"
                  className="py-2 px-3 rounded-sm border-none outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
            <NavLink to="Dashboard" ><button className="bg-black text-white w-64    py-2 font-semibold hover:text-gray-300 px-3 rounded-md ">
              Login In
            </button></NavLink> 
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

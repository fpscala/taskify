import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { login } from "../../apollo/mutations";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  ${login}
`;
const Login = () => {
  const [isVisible, setVisiblity] = useState(false);
  const [loginRequest] = useMutation(LOGIN);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const handleLoginRequest = (form: FieldValues) => {
    loginRequest({
      variables: { ...form },
      onCompleted: (data) => {
        const { accessToken, refreshToken } = data.login;
        window.localStorage.setItem("accessToken", accessToken);
        window.localStorage.setItem("refreshToken", refreshToken);
        return navigate("/");
      },
    });
  };
  return (
    <>
      <main className="flex h-screen items-center overflow-hidden bg-gray-50 dark:bg-[#0D1117]">
        <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
          <Link to="/">
            <div className="flex items-center justify-center space-x-2">
              <img src="/it-forelead.png" alt="logo" className="w-12" />
              <div className="whitespace-nowrap text-2xl font-bold leading-none text-gray-900 dark:text-white">
                IT Forelead
              </div>
            </div>
          </Link>
          <div className="relative z-[1] mt-5 sm:mt-5">
            <svg
              viewBox="0 0 1090 1090"
              aria-hidden="true"
              fill="none"
              preserveAspectRatio="none"
              width="1090"
              height="1090"
              className="absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] dark:stroke-gray-600/30 sm:-top-9 sm:h-auto"
            >
              <circle cx="545" cy="545" r="544.5"></circle>
              <circle cx="545" cy="545" r="480.5"></circle>
              <circle cx="545" cy="545" r="416.5"></circle>
              <circle cx="545" cy="545" r="352.5"></circle>
            </svg>
            <h1 className="text-center text-2xl font-medium tracking-tight text-gray-900 dark:text-[#e6edf3]">
              Log in
            </h1>
            <p className="mt-3 text-center text-lg text-gray-600 dark:text-[#e6edf3]">
              Don’t have an account?
              <Link to="/sign-up" className="mx-1 text-blue-500">
                Sign up
              </Link>
              for a free trial.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleLoginRequest)}
            className="sm:rounded-5xl z-[2] -mx-4 mt-10 flex-auto rounded-3xl bg-white px-4 py-10 shadow-2xl shadow-gray-900/10 dark:bg-[#161B22] dark:shadow-gray-500/10 sm:mx-0 sm:flex-none sm:p-24"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="login"
                  className="mb-2 block text-base font-semibold text-gray-900 dark:text-[#e6edf3]"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Please enter your email!",
                    },
                  })}
                  id="email"
                  className="block w-full appearance-none rounded-lg border border-gray-200 bg-white  p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-[#30363D]  dark:bg-[#0D1117] dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-base font-semibold text-gray-900 dark:text-[#e6edf3]"
                >
                  Parol
                </label>
                <div className="relative">
                  <input
                    id="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Please enter your password!",
                      },
                    })}
                    type={isVisible ? "text" : "password"}
                    className="block w-full appearance-none rounded-lg border border-gray-200 bg-white p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-[#30363D]  dark:bg-[#0D1117] dark:text-white"
                    placeholder="Enter your password"
                  />
                  {isVisible ? (
                    <BsEyeSlash
                      onClick={() => setVisiblity(!isVisible)}
                      className="absolute top-1/2 right-3 z-10 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-500"
                    />
                  ) : (
                    <BsEye
                      onClick={() => setVisiblity(!isVisible)}
                      className="absolute top-1/2 right-3 z-10 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-500"
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 p-2.5 text-base font-semibold text-white hover:bg-blue-600"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;

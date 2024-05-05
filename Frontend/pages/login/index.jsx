import { useState } from "react";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { BrcHubApi } from "../../api/brcHubApi";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await BrcHubApi.signIn(formData, (response) => {

      localStorage.setItem("token", response.headers.token);

      console.log(response.data);

    });

    setIsLoading(false);

  }

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full">
        {/* text & form */}
        <div className="flex flex-col w-full max-w-[700px] lg:flex-row lg:items-center lg:justify-end lg:space-x-8">
          {/* image */}
          <div className="hidden lg:block w-1/2">
            {/* Add your image component here */}
            <img src="path_to_your_image" alt="Login Image" className="w-full h-auto" />
          </div>

          {/* text & form container */}
          <div className="flex-1 max-w-[500px]">
            {/* text */}
            <motion.h2 className="h2 text-center mb-12">Welcome Back!</motion.h2>

            {/* form */}
            <motion.form
              className="flex flex-col gap-6 w-full mx-auto"
              onSubmit={handleSubmit}
              autoComplete="off"
              autoCapitalize="off"
            >
              {/* input group */}
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="input"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
                aria-required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                aria-required
              />
              <button
                type="submit"
                className="btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group"
                disabled={isLoading}
                aria-disabled={isLoading}
              >
                <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                  {isLoading ? "Logging in..." : "Log in"}
                </span>
                <BsArrowRight
                  className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]"
                  aria-hidden
                />
              </button>
            </motion.form>

            <motion.div className="flex items-center justify-center mt-4">
              <span className="mr-2">Not Registered?</span>
              <motion.a
                className="text-accent underline"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle Click here link click action here
                  console.log("Click here clicked!");
                }}
              >
                <Link href="/signup">Click here</Link> {/* Link to Signup page */}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
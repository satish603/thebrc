import { useState } from "react";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate signup process (replace with actual signup logic)
    setTimeout(() => {
      console.log("Signing up with:", formData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full">
        {/* text & form */}
        <div className="flex flex-col w-full max-w-[700px]">
          {/* text */}
          <motion.h2
            className="h2 text-center mb-12"
          >
            Create an Account
          </motion.h2>

          {/* form */}
          <motion.form
            className="flex-1 flex flex-col gap-6 w-full mx-auto"
            onSubmit={handleSubmit}
            autoComplete="off"
            autoCapitalize="off"
          >
            {/* input group */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required
              aria-required
            />
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input"
              value={formData.confirmPassword}
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
                {isLoading ? "Signing up..." : "Sign up"}
              </span>
              <BsArrowRight
                className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]"
                aria-hidden
              />
            </button>
          </motion.form>
          <motion.div className="flex items-center justify-center mt-4">
  <span className="mr-2">Registered?</span>
  <motion.a
    className="text-accent underline"
    onClick={(e) => {
      e.preventDefault();
      // Handle Click here link click action here
      console.log("Click here clicked!");
    }}
  >
    <Link href="/login">Click here</Link> {/* Link to Login page */}
  </motion.a>
</motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

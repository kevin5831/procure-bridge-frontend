import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel with auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-10">
            <Link to="/" className="text-brand-600 text-2xl font-bold">
              Asseter
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground mb-8">{subtitle}</p>

          {children}
        </motion.div>
      </div>

      {/* Right panel with image/design */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Dashboard visualization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-600/40 backdrop-blur-sm"></div>
        </motion.div>

        <div className="relative z-10 flex flex-col justify-between w-full h-full p-12">
          <div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link to="/" className="text-white text-3xl font-bold">
                Asseter
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Asset management made simple
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Track, manage, and optimize your assets with our comprehensive
              dashboard.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="font-bold text-3xl">98%</div>
                <div className="text-white/70">Approval Rate</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="font-bold text-3xl">2.4d</div>
                <div className="text-white/70">Response Time</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-white/60 text-sm"
          >
            © 2023 Asseter. All rights reserved.
          </motion.div>
        </div>
      </div>
    </div>
  );
}

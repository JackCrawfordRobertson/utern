import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/page.module.css";

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

// Optional: metadata can be moved to a separate file if needed, and used in pages or components
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// This is the custom App component
export default function MyApp({ Component, pageProps }) {
  return (
    // Wrap the entire application with the Inter font class
    <div className={inter.className}>
      {/* This will render the page content */}
      <Component {...pageProps} />
    </div>
  );
}

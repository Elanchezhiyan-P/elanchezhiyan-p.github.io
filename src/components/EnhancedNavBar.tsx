
import NavBar from "./NavBar";
import { ThemeToggle } from "./ThemeToggle";

const EnhancedNavBar = () => {
  return (
    <div className="relative">
      <NavBar />
      <div className="absolute top-4 right-8 md:right-16 lg:right-24">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default EnhancedNavBar;

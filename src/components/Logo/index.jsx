import { LinearGradient } from "react-text-gradients";

const Logo = () => {
  return (
    <a href="/" className="font-black text-xl transition-all hover:scale-110">
      <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
        BAN CORP.
      </LinearGradient>
    </a>
  );
};

export default Logo;

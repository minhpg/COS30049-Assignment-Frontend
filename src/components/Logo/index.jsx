import { LinearGradient } from "react-text-gradients";

const Logo = () => {
  return (
    <p className="font-black text-xl">
      <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
        BAN CORP.
      </LinearGradient>
    </p>
  );
};

export default Logo;

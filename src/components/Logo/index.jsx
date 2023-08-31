import { LinearGradient } from "react-text-gradients";
import { Link } from '@nextui-org/react'
const Logo = () => {
  return (
    <Link to={"/"} className="font-black text-xl">
      <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
        BAN CORP.
      </LinearGradient>
    </Link>
  );
};

export default Logo;

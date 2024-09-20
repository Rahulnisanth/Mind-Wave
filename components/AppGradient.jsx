import { LinearGradient } from "expo-linear-gradient";

const AppGradient = ({ children, colors }) => {
  return (
    <LinearGradient className="flex-1" colors={colors}>
      {children}
    </LinearGradient>
  );
};

export default AppGradient;

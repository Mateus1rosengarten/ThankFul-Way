import "../pages/authentication.css";
import { ClipLoader } from "react-spinners";

const LoaderComponent = () => {
  return (
    <div className="loader-container">
      <ClipLoader color="#87CEEB" size={50} />
    </div>
  );
};

export default LoaderComponent;

import ReactDOM from "react-dom";

import { Overlay } from "./styles";
import Spinner from "../Spinner";

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Spinner size={80} />
    </Overlay>,
    document.getElementById("loader-root")
  );
}

import { ContainerLoading } from "./styles";
import "./index.css";

export default function LoadingPage() {
  return (
    <ContainerLoading>
      <section className="container">
        <div>
          <div>
            <span className="one h6"></span>
            <span className="two h3"></span>
          </div>
        </div>

        <div>
          <div>
            <span className="one h1"></span>
            <span className="two h4"></span>
          </div>
        </div>

        <div>
          <div>
            <span className="one h5"></span>
            <span className="two h2"></span>
          </div>
        </div>
      </section>

      <div
        className="spinnerContainer"
        style={{ marginTop: 120, marginLeft: 50 }}
      >
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">Sustainable</span>
            <span className="word">Traceable</span>
            <span className="word">Reliable</span>
            <span className="word">Safe</span>
            <span className="word">Low Cost</span>
          </div>
        </div>
      </div>
    </ContainerLoading>
  );
}

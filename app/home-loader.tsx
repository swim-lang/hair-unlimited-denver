import { sitePath } from "./site-path";

export default function HomeLoader() {
  return (
    <div className="home-loader" aria-hidden="true">
      <div className="home-loader-rule" />
      <div className="home-loader-lockup">
        <img src={sitePath("/hu-lettermark-gothic-final.svg")} alt="" />
        <span>Hair Unlimited</span>
      </div>
    </div>
  );
}

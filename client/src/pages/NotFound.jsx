import { Link } from "react-router-dom";

import notFoundImage from "/errors/not-found.jpeg"

export default function NotFound() {
  return (
    <div
        className={`section flex-col items-center w-full justify-start gap-10`}
    >
        <div className={`title flex flex-col items-center`}>
            <h1 >404</h1>
            <h2>Page Not Found</h2>
        </div>

        <img src={notFoundImage} alt=""/>
      <Link
        to="/"
        className={`btn bg-dark text-neutral text-md px-10 py-3 border-3 border-dark hover:bg-neutral hover:text-dark`}
      >
        Back to Home
      </Link>
    </div>
  );
}

import Link from "next/link";
import Cta from "./components/Cta";

function Complete({ data }) {
  const {
    frontmatter: { title, subtitle, link, rel, label, call_to_action },
  } = data;

  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <h1 className="text-center font-normal">{title}</h1>
          <div className="section row -mt-10 justify-center md:mt-0">
          <div
              >
                <div className="card text-center">
                  <h4>{title}</h4>
                  <h5 className="mt-2 font-normal text-text">
                    {subtitle}
                  </h5>
                  <Link
                    className={`btn mt-5 btn-primary`}
                    href={link}
                    rel={rel}
                  >
                    {label}
                  </Link>
                </div>                
              </div>
          </div>
        </div>
      </section>
      <Cta cta={call_to_action} />
    </>
  );
}

export default Complete;

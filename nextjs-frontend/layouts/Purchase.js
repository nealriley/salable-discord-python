
import Link from "next/link";
import Cta from "./components/Cta";
import {useRouter} from "next/router";


const getResponse = async (user_id) => {
  console.log("Getting response for user: "+user_id)
  const responseBody = await fetch("/api/purchase?user_id="+user_id)
  return await responseBody.json()
}

function Purchase({ data }) {
  const router = useRouter()
  const {user_id} = router.query
  const {
    frontmatter: { title, subtitle, call_to_action },
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
                  <h4>{subtitle}</h4>
                  <h5 className="mt-2 font-normal text-text">
                    Please click the button below to purchase your license for guild+.
                  </h5>
                  <Link
                    className={"btn mt-5 btn-primary"}
                    href={"#"}
                    onClick={async () => {
                        const response = await getResponse(user_id)
                        console.log(response)
                        if (response.error) {
                        alert("There was an error processing your purchase. Please try again later.")
                        } else {
                        window.location.href = "/complete"
                        }
                    }}
                    >
                    Buy Now
                </Link>
                </div>                
              </div>
          </div>
        </div>
      </section>
      <Cta cta={call_to_action} />
    </>
  );
  // return(
  //   <Link
  //     className={"btn mt-5 btn-primary"}
  //     href={"#"}
  //     onClick={async () => {
  //       const response = await getResponse(user_id)
  //       console.log(response)
  //       if (response.error) {
  //         alert("There was an error processing your purchase. Please try again later.")
  //       } else {
  //         window.location.href = "/success"
  //       }
  //     }}
  //     >
  //     Buy Now
  //   </Link>
  // )
};

export default Purchase;



import { SignUp } from "@clerk/nextjs";

function SignUpComponent() {

  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <h1 className="text-center font-normal">Welcome to guild.ist</h1>
          <div className="section row -mt-10 justify-center md:mt-0">
            <div className="card text-center">
                <h5 className="mt-2 font-normal text-text">
                    In order to continue you will need to make a guild.ist account.
                </h5>          
                <center><SignUp path="/sign-up" routing="path" signInUrl="/sign-in" /></center>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpComponent;

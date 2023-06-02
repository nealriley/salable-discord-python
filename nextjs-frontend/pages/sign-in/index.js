import { SignIn } from "@clerk/nextjs";


function SignInComponent({ data }) {

  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <h1 className="text-center font-normal">Please Sign In</h1>
          <div className="section row -mt-10 justify-center md:mt-0">
            <div className="card text-center">
                <h5 className="mt-2 font-normal text-text">
                    Please sign in to your guild.ist account to continue.
                </h5>          
                <center><SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /></center>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInComponent;



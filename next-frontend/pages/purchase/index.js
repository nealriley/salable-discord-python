import styles from "/styles/Shared.module.css";
import { SignedIn, useUser } from "@clerk/nextjs";
import React from 'react';
import {SalablePricingTableReact} from "@salable/react-sdk";
import {  useSalable, IsLicensed, IsNotLicensed } from "/components/salable";
import { SalableStatus } from "/components/SalableStatus"
import { useRouter } from 'next/router'

const Main = () => {
  const {userId, licenses, capabilities} = useSalable()
  const { user, isLoaded } = useUser()
  console.dir(userId)
  console.dir(licenses)
  const router = useRouter()
  const { query } = router
  const grantee_id = query.grantee_id ? query.grantee_id : ''
  if (!grantee_id) {
    return null
  } else {
    console.log(grantee_id)
    console.log(process.env["NEXT_PUBLIC_SALABLE_PRODUCT_ID"])
    return isLoaded && grantee_id ? (
      <main className={styles.main}>
          <IsLicensed check="free">
            <h1>Buy now!</h1>
            <SalablePricingTableReact 
            envConfig={{
                productUuid: process.env["NEXT_PUBLIC_SALABLE_PRODUCT_ID"],
                apiKey: process.env["NEXT_PUBLIC_SALABLE_API_KEY"],
                globalPlanOptions: {
                granteeId: grantee_id,
                cancelUrl: '/',
                successUrl: '/?success=true&discord_user_id='+grantee_id
                },
                theme: "light"
            }}
            checkoutConfig={{
                member: user.emailAddresses[0].emailAddress,
                customer: {
                email: user.emailAddresses[0].emailAddress
                }
            }}  
            />
          </IsLicensed>                      
      </main>
    ) : (<></>);
  }
  
} 

// Home component
// Render with the SalableProvider to make the SalableContext available
const Home = () => (
    <Main />
);

export default Home;

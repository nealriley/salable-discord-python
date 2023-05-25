import styles from "/styles/Header.module.css";

const RenderUserObjectAsDiv = ({user}) => {
    return user ? 
    <>
        <h3>Clerk.dev - User Info</h3>
        <div>
            fullName: {user.fullName}
        </div>
        <div>
            id: {user.id}
        </div>
        <div>
            primaryEmailAddress: {user.primaryEmailAddress.emailAddress}
        </div>
        <hr/>
    </>
    : 
    <></>

}

const ClerkStatus = ({user}) => (
    <div className={styles.div}>
      <RenderUserObjectAsDiv user={user} />
    </div>
);

export default ClerkStatus
import {useAuthenticator} from "@aws-amplify/ui-react";

export default function Post() {
    const {user, signOut} = useAuthenticator();
    return(
        <>
            <h1>{user?.signInDetails?.loginId} todos</h1>
            <h1>Posty the post</h1>
        </>)
}
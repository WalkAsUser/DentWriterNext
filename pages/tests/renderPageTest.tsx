import CustomerCreationForm from "@/components/CustomerCreationForm";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ReactQueryPage from "@/pages/tests/reactquerypage";


export default function TestPage() {
    return(
        <>
            <ReactQueryPage outComponent={"Play Dirty"} />
        </>

    )
}
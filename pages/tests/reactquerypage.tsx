import type {Schema} from "@/amplify/data/resource";
import { generateClient } from 'aws-amplify/data'
import { useQuery } from '@tanstack/react-query'


const client = generateClient<Schema>();


export default function ReactQueryPage() {

    const {
        data: customers,
        isLoading,
        isSuccess,
        isError: isErrorQuery,
    } = useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            const response = await client.models.Customer.list();

            const allCustomers = response.data;

            if (!allCustomers) return null;
            return allCustomers;

        },
    });
    return(
        <><p>{customers.toString()}</p></>
    )
}
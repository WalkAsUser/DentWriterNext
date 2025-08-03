import type {Schema} from "@/amplify/data/resource";
import { generateClient } from 'aws-amplify/data'
import { useQuery } from '@tanstack/react-query'


const client = generateClient<Schema>();


export default function ReactQueryPage() {

    const {
        isPending,
        isError,
        data: customers,
        error

    } = useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            const response = await client.models.Customer.list();

            const allCustomers = response.data;


            if (!allCustomers) return null;
            console.log("is this doing anything at all")
            return allCustomers;

        },
    });
    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
    console.log(customers);
    return (
        <>
        <ul>
            {customers?.map((customer) => (
                <li key={customer.id}>{customer.customerName}</li>
            ))}
        </ul>
        <p>Outside the box</p>
        </>);
}


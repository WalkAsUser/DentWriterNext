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
            //if (isLoading) return <div>Loading data...</div>;
            //if (isError) return <div>Error: {error.message}</div>;
            return (
                <ul>
                    {allCustomers.items?.map((customer) => (
                        <li key={customer.id}>{customer.customerName}</li>
                    ))}
                </ul>
            )



        },
    });
}
import type {Schema} from "@/amplify/data/resource";
import { generateClient } from 'aws-amplify/data'
import { useQuery } from '@tanstack/react-query'


const client = generateClient<Schema>();


// @ts-ignore
export default function ReactQueryPage({outComponent}) {
    var keyName = "customers";
    const {
        isPending,
        isError,
        data,
        //data: customers,
        error

    } = useQuery({
        queryKey: [keyName],
        queryFn: async () => {
            const response = await client.models.Customer.list();
            const allCustomers = response.data;


            if (!allCustomers) return null;
            console.log("is this doing anything at all")
          //  return allCustomers;  //
            return response.data;  //works
        },
    });
    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
    console.log(data);
    return (
        <>
        {outComponent}
        <ul>
            {data?.map((customer) => (
                <li key={customer.id}>{customer.customerName}</li>
            ))}
        </ul>
        <p>Outside the box</p>
        </>);
}


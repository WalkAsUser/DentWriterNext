import type { Schema } from '../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

//may need to change the import to include an at symbol
const client = generateClient<Schema>()


const createCustomerIO= async (
    formData: {
        customerName: string;
        customerPhone: string;
        customerEmail: string;
        customerAddress1: string;
        customerAddress2: string;
        customerCity: string;
        customerState: string;
        customerZip: string; }) =>{
    await client.models.Customer.create({
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        customerAddress1: formData.customerAddress1,
        customerAddress2: formData.customerAddress2,
        customerCity: formData.customerCity,
        customerState: formData.customerState,
        customerZip: formData.customerZip,
    })
    console.log("!!!create customer!!!");
    console.log(formData.customerName);

}
export default createCustomerIO;
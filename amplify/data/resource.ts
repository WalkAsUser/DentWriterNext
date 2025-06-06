import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
      .model({
        content: a.string(),
        isDone: a.boolean(),
        group: a.string(),
        // This is built in lastUpdate: a.datetime()
      }).authorization(allow => [
        allow.owner(),
        allow.groupDefinedIn('group'),
      ]),

  ///USERS TABLE- No Edit from USER ///
  DWUser: a.model({
    firstName: a.string(),
    lastName: a.string(),
    email: a.string(),
    enabled: a.boolean(),
    lastLogin: a.datetime(),
    dateCreated: a.datetime(),
    expires: a.datetime(),
    groupName: a.string(),
    /// RELATIONSHIPS ///
    customers: a.hasMany('Customer','customerId'),
    invoices: a.hasMany('Invoice', 'invoiceId'),
  }).authorization(allow => [
    allow.owner().to(['read']),
  ]),

  ///CUSTOMERS TABLE///
  Customer: a.model({
    customerId: a.id(),
    customerName: a.string(),
    customerPhone: a.string(),
    customerEmail: a.string(),
    customerAddress1: a.string(),
    customerAddress2: a.string(),
    customerCity: a.string(),
    customerState: a.string(),
    customerZip: a.string(),
    //RELATIONSHIPS//
    dwUser: a.belongsTo('DWUser','customerId'),
    invoices : a.hasMany('Invoice','invoiceId'),
  }).authorization(allow => [
    allow.owner(),
    //allow.groupDefinedIn('group'),
  ]),

  ///INVOICE TABLE///
  Invoice: a.model({
    invoiceId: a.id(),
    invoiceNumber: a.integer().required(),
    invoiceStatus: a.enum(["Estimate","Paid","Outstanding"]),
    group: a.string(),
    //RELATIONSHIPS//
    customer: a.belongsTo('Customer', 'invoiceId'),
    dwUser: a.belongsTo('DWUser','invoiceId'),
    vehicles: a.hasMany('Vehicle','vehicleId'),
  }).authorization(allow => [
    allow.owner(),
    allow.groupDefinedIn('group'),
  ]),

  Vehicle: a.model({
    vehicleId: a.id(),
    group: a.string(),
    //RELATIONSHIPS//
    invoice: a.belongsTo('Invoice', 'vehicleId'),
    dents: a.hasMany('Dent','dentId'),
  }).authorization(allow => [
    allow.owner(),
    allow.groupDefinedIn('group'),
  ]),
  Dent: a.model({
    dentId: a.id(),
    group: a.string(),
    //RELATIONSHIPS//
    vehicle: a.belongsTo('Vehicle', 'dentId'),

  }).authorization(allow => [
    allow.owner(),
    allow.groupDefinedIn('group'),
  ]),
  Member: a.model({
    name: a.string().required(),
    // 1. Create a reference field
    teamId: a.id(),
    // 2. Create a belongsTo relationship with the reference field
    team: a.belongsTo('Team', 'teamId'),
  }),

  Team: a.model({
    teamName: a.string().required(),
    mantra: a.string().required(),
    // 3. Create a hasMany relationship with the reference field
    //    from the `Member`s model.
    members: a.hasMany('Member', 'teamId'),
  }),

///***///

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Survey: a
    .model({
      title: a.string().required(),
      type: a.string(),
      shortCode: a.string().required(),
      status: a.enum(['sent', 'started', 'completed']),
      createdBy: a.email().required(),
      createdFor: a.email().required(),
      companyName: a.string().required(),
      responses: a.hasOne('SurveyResponse', 'surveyId'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
    
  SurveyResponse: a
    .model({
      surveyId: a.id().required(),
      responses: a.json().required(),
      submittedAt: a.datetime(),
      ipAddress: a.string(),
      survey: a.belongsTo('Survey', 'surveyId'),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['create', 'read']),
      allow.authenticated().to(['read', 'update', 'delete'])
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
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

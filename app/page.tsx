import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource'; 

async function fetchTodos() {
  Amplify.configure(outputs);
  const client = generateClient<Schema>({ authMode: 'apiKey' });
  
  const { data: items, errors } = await client.models.Todo.list();
  if (errors) {
    console.error('Error fetching todos:', errors);
    return [];
  }
  return items;
}

export default async function Home() {
  const todos = await fetchTodos();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Test Amplify Conenction</h1>
        <ul>
                  {todos.map(({ id, content }) => (
          <li key={id}>{content}</li>
        ))}
        </ul>
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}

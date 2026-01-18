import {useState, useEffect} from "react";
import {generateClient} from "aws-amplify/data";
import type {Schema} from "@/amplify/data/resource";
import {useAuthenticator} from "@aws-amplify/ui-react";
import Link from "next/link";

const client = generateClient<Schema>();

export default function App() {

    const {user, signOut} = useAuthenticator();

    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    async function customerExists(){
        const { data: existence} = await client.models.Enabled.list();
        if(existence.length === 0){
            console.log("Customer does not exist")
        }else {
            console.log("Customer DOES exist")
        }
    }

    function listTodos() {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }

    useEffect(() => {
        listTodos();
    }, []);

    function createTodo() {
        client.models.Todo.create({
            content: window.prompt("Todo content"),
        });
    }

    function deleteTodo(id: string) {
        console.log(id);
        console.log("goodbye this one")
        client.models.Todo.delete({id})
    }

    return (
        <main>
            <h1>{user?.userId} userId</h1>
            <h1>{user?.signInDetails?.loginId} user.signInDetails</h1>
            <h1>My todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map((todo) => (
                    <li
                        onClick={() => deleteTodo(todo.id)}
                        key={todo.id}>
                        {todo.content}
                    </li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br/>
                <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
                    Review next steps of this tutorial.
                </a>
            </div>
            <div>
                <button onClick={customerExists}>Check if customer exists</button>
            </div>

            <Link href="/reports/post">Reports</Link>
            <p>
            <Link href="tests/testpage">TestPage</Link>
            </p>
            <p>
            <Link href="tests/reactquerypage">ReactQuery Page</Link>
            </p>
            <p>
                <Link href="tests/renderPageTest.tsx">Render Page Test</Link>
            </p>
            <br />
            <button onClick={signOut}>Sign out</button>
        </main>
    )
}

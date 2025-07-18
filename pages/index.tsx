import {useState, useEffect} from "react";
import {generateClient} from "aws-amplify/data";
import type {Schema} from "@/amplify/data/resource";
import {useAuthenticator} from "@aws-amplify/ui-react";
import Link from "next/link";

const client = generateClient<Schema>();

export default function App() {

    const {user, signOut} = useAuthenticator();

    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

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
            <h1>{user?.userId} and such</h1>
            <h1>{user?.signInDetails?.loginId} todos</h1>
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
            <button onClick={signOut}>Sign out</button>
            <Link href="/reports/post">Reports</Link>
            <Link href="tests/testpage">TestPage</Link>
        </main>
    )
}

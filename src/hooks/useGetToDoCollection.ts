import { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase-config";

interface IToDo {
    id: string
    title: string
    complited: boolean
    timestamp: number
}

export const useGetToDoCollection = () => {

    const usersCollection = collection(db, "todos")
    const[todos, setTodos] = useState<IToDo[] | []>([])

    useEffect(() => {
        const getTodosCollection = async () => {
            const data = await getDocs(usersCollection);
            const raw: Array<any> = [];
            data.docs.map((document) => {
                raw.push({
                    id: document.id, // because id field in separate function in firestore
                    ...document.data(), // the remaining fields
                });
            });
            setTodos(raw);
            console.log(`render`);
        }
        getTodosCollection()
    }, [])

    return todos
};
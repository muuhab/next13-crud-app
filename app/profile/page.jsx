"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"


const MyProfile = () => {

    const { data: session } = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()
            setPosts(data)
        }
        if (session?.user.id) fetchPosts()
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post}`)
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
        if (!hasConfirmed) return
        try {
            const res = await fetch(`/api/prompt/${post}`, {
                method: 'DELETE'
            })
            setPosts(posts.filter(p => p._id !== post))
        } catch (error) {

        }


    }

    return (
        <Profile
            name="My"
            desc="Welcome to your persolidated feed!"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
export default MyProfile
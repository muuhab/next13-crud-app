"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
    return <div className="mt-16 prompt_layout">
        {data.map((post) => (
            <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
            />
        ))}
    </div>
}

const Feed = () => {

    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                setSearchedResults(e.target.value);
            }, 500)
        );
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/prompt?search=${searchedResults}`)
            const data = await res.json()
            setPosts(data)
        }
        fetchPosts()
    }, [searchedResults])

    return (
        <section className="feed">
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />

            </form>
            <PromptCardList
                data={posts}
                handleTagCLick={() => { }}
            />
        </section>
    )
}
export default Feed
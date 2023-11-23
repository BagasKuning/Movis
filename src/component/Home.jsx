import axios from 'axios';
import fetch from 'node-fetch';
import React from 'react'

export default function Home() {
    const url = 'https://api.themoviedb.org/3/movie/20982/images';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjFhYzQ0ZTU3MjMyNjk0OGZkNzVlZWYxOGYyZTU5ZSIsInN1YiI6IjY1NWVlZDRmMmIxMTNkMDE0ZWFkMzJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3t11kV5FJeA8AkviCTAb9XfT_GijZq_RlJQYtixAUa0'
    }
    };

    return (
        <div className='w-screen bg-slate-400'>
            {
                
            }
        </div>
    )
}

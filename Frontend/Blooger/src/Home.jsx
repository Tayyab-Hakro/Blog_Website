import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/getrecords")
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {
        posts.map(post => (
          <Link to={`/post/${post._id}`} key={post._id} className="block mb-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img className="w-full h-48 object-cover" src={`http://localhost:3001/Images/${post.file}`} alt={post.title} />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.description}</p>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default Home;

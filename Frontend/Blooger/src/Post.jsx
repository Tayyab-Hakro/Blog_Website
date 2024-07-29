import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
const Navigate = useNavigate()
  useEffect(() => {
    axios.get(`http://localhost:3001/getpostbyid/${id}`)
      .then(result => setPost(result.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleDelete =(id)=>{
    axios.delete(`http://localhost:3001/deletepost/${id}`)
      .then(result => {
Navigate("/")
      })
      .catch(err => console.log(err));

  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {post.file && <img className="w-full h-64 object-cover" src={`http://localhost:3001/Images/${post.file}`} alt={post.title} />}
        <div className="p-4">
          <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700 mb-4">{post.description}</p>
          <div className="flex space-x-4">
     <Link to={`/editpost/${post._id}`}>       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
              Edit
            </button>
            </Link>
             <button onClick={e => handleDelete (post._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
               Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

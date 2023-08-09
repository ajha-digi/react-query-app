import React from 'react';
import {useQuery} from "@tanstack/react-query";
import { fetchPost } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';

function Post() {
  const {id} = useParams();
  const navigate = useNavigate();
  
  const {
    isLoading,
    data:post
  } = useQuery({
    queryKey:["posts",id],
    queryFn: ()=>fetchPost(id)
  })

  if(isLoading) {
    return <h1>Loading !!</h1>
  }
  console.log(post);
  return (
    <div>
      <h3>Post - {id}</h3>
      <button onClick={()=>navigate('/')}>Go back</button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  )
}

export default Post
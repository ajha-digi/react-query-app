import React from 'react'
import PostForm from './PostForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../api/posts'
import { v4 as uuidv4 } from 'uuid';

function Addpost() {

  const queryClient =  useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["posts"]});
      console.log("success");
    },
    onError: ()=>{}
  })

  const handleAddPost = post => {
    createPostMutation.mutate({
      id: uuidv4(),
      ...post
    })
  }
  return (
    <div>
        <h2>Add new post</h2>
        <PostForm  onSubmit={handleAddPost} initialValue={{}}/>
    </div>
  )
}

export default Addpost
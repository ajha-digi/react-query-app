import React from 'react'
import PostForm from '../components/PostForm'
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPost, updatePost } from '../api/posts';

function EditPost() {

  const {id} = useParams();
  const navigate = useNavigate();
  const queryClient =  useQueryClient();

  const {
    isLoading,
    data:post
  } = useQuery({
    queryKey:["posts",id],
    queryFn: ()=>fetchPost(id)
  })


  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["posts"]});
      console.log("success");
      navigate("/")
    },
    onError: ()=>{}
  })

  const handleSubmit = (updatedPost) => {
    updateMutation.mutate({
      id,
      ...updatedPost
    })
  }

  if(isLoading){
    return(<h1>Loading !!!</h1>)
  }

  return (
    <div>
      <PostForm onSubmit={handleSubmit} initialValue={post}/>
    </div>
  )
}

export default EditPost
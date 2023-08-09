import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Addpost from "../components/Addpost";
import { deletePost, fetchPosts } from "../api/posts";
import { useNavigate } from "react-router-dom";

function PostLists() {
  const navigate = useNavigate();
  const queryClient =  useQueryClient();

  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["posts"]});
      console.log("success");
    },
    onError: ()=>{}

  })

  const handleDelete = id => {
    deletePostMutation.mutate(id)
  }

  if (isLoading) {
    return <h1> Loading !!</h1>;
  }

  return (
    <div>
      <Addpost />
      {posts.map(({ id, title }) => (
        <div key={id}>
          <h4
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/post/${id}`)}
          >
            {title}
          </h4>
          <button onClick={() => navigate(`/post/${id}/edit`)}>Edit</button>
          <button onClick={()=>handleDelete(id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PostLists;

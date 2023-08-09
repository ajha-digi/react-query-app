import React, {useState} from 'react'

function PostForm({onSubmit, initialValue}) {

    const [post, setPost] = useState({
        title: initialValue.title || "",
        body: initialValue.body || ""
    })

    const handleChange= (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    const renderField = (label) => (
        <div>
            <label>{label}</label>
            <input 
                type="text" 
                name={label.toLowerCase()} 
                onChange={handleChange} 
                value={post[label.toLowerCase()]}
            />
        </div>
    )

    const handleSubmit= (e) => {
        e.preventDefault();
        onSubmit(post);
        setPost({
            title:"",
            body:"" 
        })
    }

  return (
    <form onSubmit={handleSubmit}>
        {renderField('Title')}
        {renderField('Body')}
        <button type='submit'>Submit</button>
    </form>
  )
}

export default PostForm
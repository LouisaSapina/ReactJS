import React, {useState} from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostFrom = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})


    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
    }

    return (
        <form>
        <MyInput
          value={post.title}
          type="text" 
          onChange={e => setPost({...post, title: e.target.value})}
          placeholder='Post title'>
        </MyInput>
        
        <MyInput
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})}
          type="text" 
          placeholder='Post description'>
        </MyInput>

        <MyButton onClick={addNewPost}>Create post</MyButton>
      </form>
    );
};

export default PostFrom;
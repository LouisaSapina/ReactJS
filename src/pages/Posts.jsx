import React, {useState, useEffect, useRef} from 'react';
import '../styles/app.css';
import '../components/PostItem';
import PostList from '../components/Postlist';
import PostFrom from '../components/PostFrom';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import {useObserver} from "../hooks/useObserver";
import MySelect from '../components/UI/select/MySelect';


 
function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
  console.log(lastElement);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })


  useEffect(() => {
    fetchPosts(limit, page) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{marginTop: 30}}
        onClick={() => setModal(true)}>
          Create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostFrom create={createPost}></PostFrom>
      </MyModal>
      
      <hr style={{margin: "15px 0"}}></hr>
      <PostFilter 
        filter={filter}
        setFilter={setFilter}>
      </PostFilter>
      <MySelect value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Elements on this page"
        options={[{value: 5, name: '5'},
        {value: 5, name: '10'},
        {value: 5, name: '25'},
        {value: -1, name: 'Show everything'},]}>

      </MySelect>
      {postError &&
        <h1>An error has occurred $(postError)</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchPosts} title="Posts about JS"></PostList>
      <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
      {isPostsLoading &&
         <div style={{display: 'flex', justifyContent: 'center', marginTop: '50'}}><Loader/></div>
      }
         
    
      
      <Pagination page={page} changePage={changePage} totalPages={totalPages}></Pagination>
    </div>
  );
}

export default Posts;

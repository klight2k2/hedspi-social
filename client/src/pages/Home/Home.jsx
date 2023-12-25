import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Post from '../../components/Post/Post';

import AddPost from '../../components/AddPost/AddPost';
import { Outlet, useSearchParams } from 'react-router-dom';
import './home.scss';

import { Breadcrumb, Layout, Menu, theme, Empty } from 'antd';
import PostService from '../../service/PostService';
import { useCallback } from 'react';

const { Header, Content, Footer } = Layout;
export default function Home() {
    const [posts, setPosts] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams();

    const handleGetPost = async () => {
      
      console.log("[searchParams]",searchParams.get("search"))
      const  searchText=searchParams.get("search")
      let posts
      if(searchText){
          posts= await PostService.searchPost(searchText)
        }else{

          posts = await PostService.getAllPost();
        }
        console.log('[Home]', posts);
        setPosts(posts);
    };
    const handleDeletePost = useCallback(
        async (postId) => {
            const result = await PostService.deletePost(postId);
            if (result) {
                setPosts((oldPost) => oldPost.filter((post) => post._id !== postId));
            }
        },
        [posts]
    );
    useEffect(() => {
        handleGetPost();
    }, [searchParams]);

    return (
        <div className='home-container'>
            {posts?.map((post) => (
                <Post  post={post} handleDeletePost={handleDeletePost}></Post>
            ))}
            {
                posts.length <=0 && <Empty description="結果がありません。" />
            }
        </div>
    );
}

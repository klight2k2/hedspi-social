import { useState, useContext, useEffect } from 'react';
import { Button, Dropdown, Space, Avatar, Tag,Divider } from 'antd';
import moment from 'moment';
import { MoreOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { doc, collection, onSnapshot, addDoc, serverTimestamp, setDoc, query, Timestamp } from 'firebase/firestore';

import './post.scss';
import { UserContext } from '../../context/UserContext';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import PostService from '../../service/PostService';
import { NavLink, createSearchParams, useNavigate } from 'react-router-dom';

const convertTimeStamp=(time)=>{
  const date=new Timestamp(time?.seconds, time?.nanoseconds).toDate()
    return date
}

const convertToTimeAgo = (time) => {
    const datetime = new Date(time);

    return moment(datetime).fromNow();
};

export default function Post({ post ,handleDeletePost}) {
  const items = [
      {
          label: (
              <NavLink href="/post/:id/edit">
                  Edit
              </NavLink>
          ),
          key: '0',
      },
      {
          label: (
              <p target='_blank' rel='noopener noreferrer' href='#' onClick={()=>handleDeletePost(post._id)}>
                  Delete
              </p>
          ),
          key: '1',
      },
  ];
    const [isChildFocused, setChildFocused] = useState(false);
    const { listUser } = useContext(UserContext);
    const { currentUser } = useContext(AuthContext);
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [listComment, setListComment] = useState([]);
    const postUser = listUser[post.uid];
    const handleChildFocus = () => {
        setChildFocused(true);
    };


     
    

    const handleChildBlur = () => {
        setChildFocused(false);
    };

    const handleLike = async () => {
        const { liked } = await PostService.likePost(post._id);
        setLike(like + liked);
        setIsLiked(liked == 1);
    };

    const handleComment = async () => {
        if (comment) {
            console.log('comment', comment);
            const docRef = await addDoc(collection(db, 'posts', post._id, 'comments'), {
                uid: currentUser.uid,
                content: comment,
                timeStamp: serverTimestamp(),
            });
            console.log('Document written with ID: ', docRef.id);
            setComment('');
        }
    };
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser.uid));
    }, [currentUser.uid, post.likes]);

    useEffect(() => {
        const q = query(collection(db, 'posts', post._id, 'comments'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let comments = [];
            querySnapshot.forEach((doc) => {
                comments.push(doc.data());
            });

            setListComment(comments);
            console.log('[list comments]', comments);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div className='post mt-16'>
            <div className='post-header'>
                <Space>
                    <Avatar src={postUser?.photoURL}></Avatar>
                    <Space direction='vertical' size={4}>
                        <div className='post-username'>{postUser?.displayName}</div>
                        <div className='post-timestamp'>{convertToTimeAgo(post?.createdAt)}</div>
                    </Space>
                </Space>
                {
                  currentUser.uid===post.uid? <Dropdown
                  className='avatar'
                  placement='bottomRight'
                  menu={{
                      items,
                  }}
              >
                  <MoreOutlined style={{ fontSize: 24 }} />
              </Dropdown>:""
                }
               
            </div>
           
            <div className='post-content' dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <input type="checkbox" name="readmore" id="readmore">
              
            </input>
         
            <div className='post-tag mt-16'>
                {
                  post.tags?.map(tag=>{
                    return <Tag>#{tag}</Tag>
                  })
                }
            </div>
            <Divider style={{margin:'8px 0'}}></Divider>

            <div className='post-action'>
                <Space className='post-like'>
                    {isLiked ? (
                        <HeartFilled onClick={handleLike} style={{ fontSize: 24, color: 'red' }} />
                    ) : (
                        <HeartOutlined onClick={handleLike} style={{ fontSize: 24 }} />
                    )}
                    {like}
                </Space>
                <div className='post-comment'>{listComment.length} comments</div>
            </div>
            <Divider style={{margin:'8px 0'}}></Divider>
            <Space direction='vertical'>
                {listComment.map((comment,id) => {
                  const commentUser=listUser[comment.uid]

                  return   <div className='post-comment-container' key={id}>
                        <Avatar src={commentUser?.photoURL}></Avatar>
                        <Space  direction='vertical' size={4} className='ml-16'>

                        <Space className='post-comments' size={4}>
                            <div className='post-username'>{commentUser?.displayName}</div>
                          <p>{comment.content}</p>
                        </Space>
                            <div className='post-timestamp'>{convertToTimeAgo(convertTimeStamp(comment?.timeStamp))}</div>
                        </Space>
                    </div>;
                })}
            </Space>
            <Space className={`post-add `}>
            <Avatar className='add-cmt' src={currentUser?.photoURL}></Avatar>
                <input
                    type='text'
                    value={comment}
                    className={`post-input ${isChildFocused ? 'active':''}`}
                    onFocus={handleChildFocus}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                    onBlur={handleChildBlur}
                    placeholder='Add your comment...'
                />
                <Button type='link' onClick={handleComment}>
                    Post
                </Button>
            </Space>
        </div>
    );
}

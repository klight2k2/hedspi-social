import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Card, Avatar, Space, Button ,Modal,Form,Input} from 'antd';
import { EditOutlined,CameraOutlined } from '@ant-design/icons';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Post from '../../components/Post/Post';
import ReactQuill from 'react-quill';
import './profile.scss';
import PostService from '../../service/PostService';
import { storage } from '../../firebase';
import { UserContext } from '../../context/UserContext';
import { updateProfile } from 'firebase/auth';
export default function Profile() {
    const { currentUser } = useContext(AuthContext);
    const {listUser}= useContext(UserContext)
    const [selectedFile, setSelectedFile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [totalLike, setTotalLike] = useState(0);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(currentUser?.photoURL);
    const handleGetPost = async () => {
        let posts = await PostService.getAllPost();
        console.log('[Profile]', posts);
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
    const handleUpload = async ({displayName,story}) => {
        let url = currentUser?.photoURL
        if (selectedFile) {
            console.log(selectedFile);
            const storageRef = ref(storage, `${currentUser?.email}`);
            await uploadBytesResumable(storageRef, selectedFile).then(async () => {
                await getDownloadURL(storageRef).then(async (downloadURL) => {
                    setPreviewUrl(downloadURL);
                    await updateProfile(currentUser, {
                        displayName,
                        photoURL: downloadURL,
                      });
                      //create user on firestore
                      await setDoc(doc(db, "users", currentUser.uid), {
                        uid: res.user.uid,
                        email,
                        photoURL: downloadURL,
                        displayName,story
                      }).catch(err => console.log(err));
          
                })
            })
        }
       
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };
    const onFinishEdit = async (values) => {
        await handleUpload(values);
        console.log('Success:', { ...values, previewUrl });
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModal=()=>{
        setPreviewUrl(currentUser?.photoURL)
        setIsModalOpen(true);
        form.setFieldsValue({
            displayName:currentUser.displayName,
            story:listUser[currentUser.uid].story
        })
    }
    useEffect(() => {
        const totalLike = posts.reduce((total, post) => {
            return total + post.likes.length;
        }, 0);
        setTotalLike(totalLike);
    }, [posts]);
    useEffect(() => {
        handleGetPost();
    }, []);
    return (
        <div className='profile-container'>
            <Card hoverable={true} className='profile mt-16 mr-16'>
                <Space direction='vertical'>
                    <Space direction='vertical'>
                        <Avatar src={currentUser.photoURL} size={100}></Avatar>
                        <Space direction='vertical'>
                            <h3 className='profile-name'>{currentUser.displayName} dsdfsadfas</h3>

                            <p>{currentUser.email}</p>
                        </Space>
                    </Space>
                    <Button onClick={showModal} className='edit-btn' type='text' icon={<EditOutlined style={{ fontSize: 24 }} />}></Button>
                    <div className='post-info'>
                        <span className='mr-16'>
                            <b> {posts.length}</b> posts
                        </span>
                        <span>
                            <b>{totalLike}</b> likes
                        </span>
                    </div>
                    <div>
                        <b>Story:</b>
                        <br />
                        - 👋 Hi, I’m @klight2k2
                        <br />
                        - 💬 Ask me about every thing <br />
                        - 🌱 I’m currently learning in HUST <br />- 📫 How to reach me: daominh@gmail.com
                    </div>
                </Space>
            </Card>
            {posts?.map((post) => (
                <Post post={post} handleDeletePost={handleDeletePost}></Post>
            ))}

            <Modal   width={700} title='Chỉnh sửa thông tin cá nhân' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} name='project-create' labelCol={{ span: 6 }} autoComplete='off' onFinish={onFinishEdit} onFinishFailed={onFinishFailed}>
                    <Form.Item label='Avatar'>
                    <input type='file' onChange={handleFileChange} id='file' style={{ display: 'none' }} />
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <Avatar size={148} src={previewUrl} className='preview-avt'></Avatar>
                        <label htmlFor='file' className='upload-icon'>
                            <CameraOutlined style={{ fontSize: '20px' ,cursor:'pointer'}} />
                        </label>
                    </div>
                    </Form.Item>
                    <Form.Item label='Tên hiển thị' name='displayName' rules={[{ required: true, message: 'Hãy nhập tên hiển thị' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Story' name='story'>
                       <ReactQuill></ReactQuill>
                    </Form.Item>
                   
                </Form>
            </Modal>
        </div>
    );
}

import {useState} from 'react'
import {Button, Dropdown, Space, Avatar } from 'antd';
import moment from 'moment';
import {MoreOutlined,HeartOutlined} from '@ant-design/icons';
import './post.scss'

const convertToTimeAgo=(time)=>{
  const datetime= new Date(time)

  return  moment(datetime)
  .fromNow();
}
const items = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
       Edit
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
       Delete
      </a>
    ),
    key: '1',
  },
  
  
];

export default function Post() {
  const [isChildFocused, setChildFocused] = useState(false);

  const handleChildFocus = () => {
    setChildFocused(true);
  };

  const handleChildBlur = () => {
    setChildFocused(false);
  };
  return (
    <div className='post'> 
    <div className="post-header">
      <Space >
        <Avatar src=""></Avatar>
        <Space direction="vertical" size={4}>
          <div className="post-username">
          Minh Quang Phạm
          </div>
          <div className="post-timestamp">
            {convertToTimeAgo('2022-02-02')}
          </div>

        </Space>
      </Space>
      <Dropdown className='avatar' placement="bottomRight"  menu={{
      items,
    }}>

      <MoreOutlined  style={{fontSize:24}}/>
    </Dropdown>
      </div> 
    <div className="post-content">
      
     </div>
    <div className="post-action">
      <Space className="post-like">

    <HeartOutlined style={{fontSize:24}} />
    24
      </Space>
      <div className="post-comment">
        22 comments
      </div>
    </div>
      <div className={`post-add ${isChildFocused? 'active': ''}`}>
        <input type="text" className='post-input'  onFocus={handleChildFocus}
        onBlur={handleChildBlur} placeholder='Add your comment...' />
        <Button type="link">Post</Button>
      </div>
    </div>
  )
}

import Http from './api'
const BaseUrl=`http://localhost:8000/api/`
class PostService{
    
    getAllPost=async ()=>{
        try{
            const url=`${BaseUrl}post`
            return await Http.get(url);
        }catch(err){
            console.log("[get all post]",err)
            return null;
        }
        
    }
}

export default  new PostService()
import Api from '@/services/Api'

export default {
    getUsers(){
        return Api().get('users');
    },
    deleteUser(id){
        return Api().delete(`users/${id}`);
    },
    addUser(payload){
        if(payload._id){
            return Api().put(`auth/profile/${payload._id}`, payload);
        }else{
            return Api().post('auth/profile', payload);
        }
    }
}
import Api from '@/services/Api'

export default {
    login(payload){
        return Api().post("", payload);
    }
}
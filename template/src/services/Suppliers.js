import Api from '@/services/Api'

export default {
    getSuppliers(){
        return Api().get(`suppliers`);
    }
}
import Api from '@/services/Api'

export default {
    getSuppliers(){
        return Api().get(`suppliers`);
    },
    deleteSupplier(id){
        return Api().delete(`suppliers/${id}`);
    },
    addSupplier(payload){
        let formData = new FormData();
        formData.append("name", payload.name);
        formData.append("legal_address", payload.legal_address);
        formData.append("manager_name", payload.manager_name);
        formData.append("manager_phone", payload.manager_phone);
        formData.append("file", payload.file_data);
        if(payload._id){
            return Api().put(`suppliers/upload/${payload._id}`, formData);
        }else{
            return Api().post(`suppliers/upload`, formData);
        }
    },
}
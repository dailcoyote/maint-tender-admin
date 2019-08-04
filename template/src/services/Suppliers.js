import Api from '@/services/Api'

export default {
    getSuppliers() {
        return Api().get(`suppliers`);
    },
    deleteSupplier(id) {
        return Api().delete(`suppliers/${id}`);
    },
    addSupplier(payload, config) {
        return Api().post(`suppliers/upload`, payload, config);
    },
    updateSupplier(payload) {
        return Api().put(`suppliers/upload/${payload._id}`, payload);
    }
}
import Api from '@/services/Api'

export default {
    getOneSupplier(id) {
        return Api().get(`suppliers/${id}`);
    },
    getSuppliersShortList() {
        return Api().get(`suppliers/short/list`);
    },
    getSuppliers() {
        return Api().get(`suppliers`);
    },
    deleteSupplier(id) {
        return Api().delete(`suppliers/${id}`);
    },
    addSupplier(payload, config) {
        return Api().post(`suppliers/upload`, payload, config);
    },
    updateSupplier(id, payload, config) {
        return Api().put(`suppliers/upload/${id}`, payload, config);
    }
}
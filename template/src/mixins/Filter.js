import FilterServices from "@/services/Filter"
import SuppliersServices from "@/services/Suppliers"

export default {
    data(){
        return {
            filter_supplier: null,
            filter_category: null,
            search_text: null,
            suppliers: [],
            categories: [],
        }
    },
    computed: {
        filterData(){
            let filter_data = this.data;
            if(!this.filter_supplier && !this.filter_category && !this.search_text){
                return filter_data;
            }else{
                if(this.search_text){
                    filter_data = filter_data.filter(el => {
                        return el.name.toLowerCase().indexOf(this.search_text.toLowerCase()) !== -1;
                    });
                }
                if(this.filter_supplier && this.filter_category){
                    filter_data = filter_data.filter(el => {
                        return el.supplierID == this.filter_supplier && el.categoryID == this.filter_category;
                    });
                }else if(this.filter_supplier && !this.filter_category){
                    filter_data = filter_data.filter(el => {
                        return el.supplierID == this.filter_supplier;
                    });
                }else if(this.filter_category && !this.filter_supplier){
                    filter_data = filter_data.filter(el => {
                        return el.categoryID == this.filter_category;
                    });
                }
                return filter_data;
            }
        },
    },
    created(){
        this.getFilterCategories();
        this.getFilterSuppliers();
    },
    methods: {
        search(search_text){
            this.search_text = search_text;
        },
        getDataBySupplier(supplier){
            this.filter_supplier = supplier;
        },
        getDataByCategory(id){
            this.filter_category = id;
        },
        async getFilterCategories(){
            try{
                let response = await FilterServices.getCategories();
                this.categories = response.data;
            }catch(err){
                console.log(err);
            }
        },
        async getFilterSuppliers(){
            try{
                this.suppliers = [];
                let response = await SuppliersServices.getSuppliers();
                this.suppliers = response.data;
            }catch(err){
                console.log(err);
            }
        },
    }
}
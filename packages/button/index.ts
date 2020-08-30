import { TcuiComponent } from '../common/component';

TcuiComponent({
    data: {
        baseStyle: '',
    },

    props: {

    },

    methods: {
        onClick(){
            if (!this.data.loading) {
                this.$emit('click'); 
            }
        }
    }

})
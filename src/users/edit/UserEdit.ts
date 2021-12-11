import { Options, Vue } from 'vue-class-component';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { User } from '../User';
import useVuelidate from '@vuelidate/core';
import UsersService from '../UsersService';

@Options({
    components: {
        Card,
        InputText,
        Password,
        Checkbox,
        Button
    },    
    validations: {
        form: {
            name: {
            },
            password: {
            },
        },
    },
})
export default class UserEdit extends Vue {
    v$ = useVuelidate();
    
    public form: User = {};
    public isLoading = false;

    public mounted(): void {
        this.isLoading = true;
        const id = this.$route.params['id'];
        UsersService.User(parseInt(id.toString()))
            .then(r => this.form = r.data)
            .finally(() => this.isLoading = false);
    }

    public sendForm(): void {
        this.isLoading = true;
        UsersService.Edit(this.form)
            .then(() => this.$router.push({ name: 'Users' }))
            .finally(() => this.isLoading = false);
    }

    public cancel(): void {
        this.$router.push({ name: 'Users' });
    }
}
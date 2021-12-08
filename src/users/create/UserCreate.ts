import { Options, Vue } from 'vue-class-component';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { User } from '../User';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
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
                required,
                min: minLength(3)
            },
            password: {
                required,
                min: minLength(3)
            },
        },
    }
})
export default class UserCreate extends Vue {
    v$ = useVuelidate();
    public form: User = {};
    public isLoading = false;

    public sendForm(): void {
        this.isLoading = true;
        UsersService.Create(this.form)
            .then(() => this.$router.push({ name: 'Users' }))
            .finally(() => this.isLoading = false);
    }

    public cancel(): void {
        this.$router.push({ name: 'Users' });
    }
}
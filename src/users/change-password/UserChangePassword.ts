import { Options, Vue } from 'vue-class-component';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { ChangePassword } from '../ChangePassword';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import UsersService from '../UsersService';
import store from '@/store';

@Options({
    components: {
        Card,
        InputText,
        Password,
        Button
    },
    validations: {
        form: {
            name: {
                required
            },
            newPassword: {
                required,
                min: minLength(3)
            },
            previousPassword: {
                required
            },
        },
    }
})
export default class UserCreate extends Vue {
    v$ = useVuelidate();
    public form: ChangePassword = {};
    public isLoading = false;

    public mounted(): void {
        const currentUser = store.getters['login/getCurrentUser'];
        this.form.name = currentUser.name;
    }

    public sendForm(): void {
        this.isLoading = true;
        UsersService.ChangePassword(this.form)
            .then(() => this.$router.push({ name: 'Users' }))
            .finally(() => this.isLoading = false);
    }

    public cancel(): void {
        this.$router.push({ name: 'Users' });
    }
}
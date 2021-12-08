import { Options, Vue } from 'vue-class-component';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { required, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import LoginService from './LoginService';
import { LoginModel } from '../models/Login';
import store from '../store';
import Image from 'primevue/image';

@Options({
   components: {
      InputText,
      Password,
      Button,
      Image
   },
   validations: {
      form: {
         username: {
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
export default class Login extends Vue {

   public form: LoginModel = {}
   public isLoading = false;

   v$ = useVuelidate();

   public mounted(): void {
      store.dispatch('login/removeToken');
   }

   public sendForm(): void {

      this.isLoading = true;

      LoginService.Login(this.form)
         .then(r => {
            store.dispatch('login/setToken', r.data);
         }).finally(() => {
            this.isLoading = false;
            this.$router.push({ name: 'Users' });
         });
   }
}
import { Options, Vue } from 'vue-class-component';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { required, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import LoginService from './LoginService';
import UsersService from '../users/UsersService';
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

   v$ = useVuelidate();

   public mounted(): void {
      store.dispatch('login/removeToken');
   }

   public sendForm(): void {
      const loader = this.$loading.show();
      store.dispatch('login/removeToken');
      LoginService.Login(this.form)
         .then(r => {
            store.dispatch('login/setToken', r.data);
         }, e => {
            console.log('asd1');
            throw(e);
         })
         .then(() => {
            return UsersService.Current();
         }, e => {
            console.log('asd2');
            throw(e);
         })
         .then(r => {
            store.dispatch('login/setCurrentUser', r.data);
            this.$router.push({ name: 'Users' });
         }, e => {
            console.log('asd3');
            throw(e);
         }).finally(() => loader.hide());
   }
}
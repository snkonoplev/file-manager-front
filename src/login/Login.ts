import { Options, Vue } from 'vue-class-component';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { required, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import LoginService from '../services/LoginService';
import { LoginModel } from '../models/login';
import store from '../store';

@Options({
   components: {
      InputText,
      Password,
      Button
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

   public sendForm(): void {
      LoginService.Login(this.form).then(r => {
         store.dispatch('login/setToken', r.data);        
         this.$router.push({ name: 'Home' });
      });
   }
}
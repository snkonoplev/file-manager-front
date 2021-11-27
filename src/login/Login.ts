import { Options, Vue } from 'vue-class-component';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

@Options({
   components: {
      InputText,
      Password,
      Button
   }
})
export default class Login extends Vue {
   login = "";
   password = "";

   checkForm(e: Event): void {
      e.preventDefault();
      console.log(this.login);
      console.log(this.password);
   }
}
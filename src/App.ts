import { Options, Vue } from 'vue-class-component';
import Menubar from 'primevue/menubar';
import store from './store';
import { User } from './services/User';
import Chip from 'primevue/chip';

@Options({
   components: {
      Menubar,
      Chip
   },
   computed: {
      auth: {
         get(): string {
            return store.getters['login/isAuthenticated'];
         }
      },
      currentUser: {
         get(): User {
            const user = store.getters['login/getCurrentUser'];
            if (user) {
               return user;
            }
            return {};
         }
      }
   }
})
export default class App extends Vue {

   public items = [
      {
         label: 'Quit',
         icon: 'pi pi-fw pi-power-off',
         to: '/login',
         command: (): void => {
            this.clearToken();
         },
      }
   ]


   public clearToken(): void {
      store.dispatch('login/removeToken');
   }
}
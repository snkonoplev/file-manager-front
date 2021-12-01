import { Options, Vue } from 'vue-class-component';
import Menubar from 'primevue/menubar';
import store from './store';
import { User } from './users/User';
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
   },
   watch: {
      $route(to): void {
         if (to?.name) {
            this.currentRote = to.name;
         }
      }
   }
})
export default class App extends Vue {

   public currentRote = '';

   public items = [
      {
         label: 'Users',
         icon: 'pi pi-fw pi-users',
         to: '/users',
         disabled: (): boolean => this.currentRote === 'Users'
      },
      {
         label: 'Quit',
         icon: 'pi pi-fw pi-power-off',
         to: '/login',
         command: (): void => {
            this.clearToken();
         },
      }
   ];

   public clearToken(): void {
      store.dispatch('login/removeToken');
   }
}
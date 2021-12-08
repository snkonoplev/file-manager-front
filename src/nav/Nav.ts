import { Options, Vue } from 'vue-class-component';
import Menubar from 'primevue/menubar';
import store from '../store';
import { User } from '../users/User';
import Chip from 'primevue/chip';
import UsersService from '../users/UsersService';

@Options({
   components: {
      Menubar,
      Chip
   },
   watch: {
      $route(to): void {
         if (to?.name) {
            this.currentRote = to.name;
         }
      }
   }
})
export default class Nav extends Vue {

   public currentUser: User = {};
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

   public mounted(): void {
      UsersService.Current().then(r => {
         this.currentUser = r.data;
         store.dispatch('login/setCurrentUser', r.data);
      });
   }
}
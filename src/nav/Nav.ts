import { Options, Vue } from 'vue-class-component';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import store from '../store';
import { User } from '../users/User';
import UsersService from '../users/UsersService';
import { useCookies } from "vue3-cookies";

@Options({
   components: {
      Menubar,
      Button
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
   public cookies = useCookies();

   public items = [
      {
         label: 'Users',
         icon: 'pi pi-fw pi-users',
         to: '/users',
         disabled: (): boolean => this.currentRote === 'Users'
      },
      {
         label: 'Transmission',
         icon: 'pi pi-cloud-download',
         command: (): void => {
            this.openTransmission();
         },
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

      const currentUser = store.getters['login/getCurrentUser'];

      if (currentUser) {
         this.currentUser = currentUser;
         return;
      }

      UsersService.Current().then(r => {
         this.currentUser = r.data;
         store.dispatch('login/setCurrentUser', r.data);
      });
   }

   public changePassword(): void {
      this.$router.push({ name: 'ChangePassword' });
   }

   public openTransmission(): void {
      const token = store.getters['login/getToken'] as string | undefined;
      const expires = store.getters['login/getExpire'] as number | undefined;
      const url = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/transmission/web/' : '/transmission/web/';

      if (token && expires && expires > new Date().valueOf()) {
         this.cookies.cookies.set('jwt', token, new Date(expires), '/transmission');
         window.open(url, '_blank');
      } else {
         window.location.reload();
      }
   }
}
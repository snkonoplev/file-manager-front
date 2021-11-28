import { Options, Vue } from 'vue-class-component';
import Menubar from 'primevue/menubar';
import store from './store';

@Options({
   components: {
      Menubar
   },
   computed: {
      auth: {
         get(){
            return store.getters['login/isAuthenticated'];
         }
      }
   }
})
export default class App extends Vue {

   items = [     
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
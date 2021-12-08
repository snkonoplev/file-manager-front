import { Options, Vue } from 'vue-class-component';
import store from './store';
import Nav from './nav/Nav.vue';

@Options({
   components: {
      Nav
   },
   computed: {
      auth: {
         get(): string {
            return store.getters['login/isAuthenticated'];
         }
      },
   },
})
export default class App extends Vue {
}
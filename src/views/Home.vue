<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import LoginService from '../services/LoginService';
import { User } from '../services/User';

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
 display = true;
 asd: User = {};
public mounted(): void {
  const loader = this.$loading.show();
LoginService.Current().then(r => {
this.asd = r.data;
}).finally(() => loader.hide());
 }
}
</script>

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

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
 display = true;
 asd = {};
public mounted(): void {
LoginService.Current().then(r => {
this.asd = r.data;
});
 }
}
</script>

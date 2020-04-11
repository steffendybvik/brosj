<template>
  <v-app-bar app dense>
    <v-btn rounded text :to="{name: 'home'}">home</v-btn>
    <v-spacer></v-spacer>
    <v-btn rounded text :to="{name: 'login'}" v-show="!user">login</v-btn>
    <v-btn rounded text :to="{name: 'register'}" v-show="!user">register</v-btn>
    <v-btn rounded text :to="{name: 'profile'}" v-show="user" color="black" icon small>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn rounded text @click="signout" v-show="user">signout</v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({ logout: "user/logout" }),
    signout() {
      this.logout().then(() => {
        this.$router.go({ path: this.$router.path });
      });
    }
  },
  computed: {
    ...mapGetters({ user: "user/getUser" })
  }
};
</script>
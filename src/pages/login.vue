<template>
  <v-container class="mt-10" @keydown.enter="log">
    <v-row justify="center">
      <v-col cols="12" md="7">
        <v-form>
          <v-card class="pa-10">
            <p class="display-2 mb-10">Login</p>
            <v-text-field label="email" prepend-icon="mdi-account-circle" v-model="email"></v-text-field>
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = ! showPassword"
              v-model="password"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="info" @click="log">login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col cols="12" md="7" class="mt-10">
        <p>Don't yet have an account?</p>
        <v-btn text :to="{name: 'register'}">Register</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showPassword: false,
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions({ login: "user/login" }),
    log() {
      let payload = {
        email: this.email,
        password: this.password
      };
      this.login(payload).then(() => {
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>
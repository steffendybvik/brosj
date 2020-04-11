<template>
  <v-container class="mt-10">
    <v-row justify="center">
      <v-col cols="12" md="7">
        <v-form>
          <v-card class="pa-10">
            <p class="display-2 mb-10">Register</p>
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
              <v-btn color="info" @click="reg">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col cols="12" md="7" class="mt-10">
        <p>Already have an account?</p>
        <v-btn text :to="{name: 'login'}">Login</v-btn>
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
    ...mapActions({ register: "user/register" }),
    reg() {
      let payload = {
        email: this.email,
        password: this.password
      };
      this.register(payload).then(() => {
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>
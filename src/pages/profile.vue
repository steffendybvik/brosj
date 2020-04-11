<template>
  <div>
    <v-container class="mt-10">
      <v-row justify="center">
        <v-col cols="7">
          <p class="display-2">Profile</p>
        </v-col>
        <v-col cols="7">
          <v-card elevation="1" class="px-10 py-2">
            <v-card-text v-if="user">
              <table>
                <tr>
                  <td style="min-width: 80px">uid:</td>
                  <td>{{ user.uid }}</td>
                </tr>
                <tr>
                  <td class>email:</td>
                  <td>{{ user.email }}</td>
                </tr>
              </table>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red lighten-2 white--text" @click="dialog = true">Delete account</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="pa-5 text-center">
        <p class="headline">This action can not be undone</p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-2 white--text" @click="del">Permanently Delete</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    ...mapActions({ deleteAccount: "user/deleteAccount" }),
    toggle() {},
    del() {
      this.deleteAccount();
    }
  },
  computed: {
    ...mapGetters({ user: "user/getUser" })
  }
};
</script>
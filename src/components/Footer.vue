<template>
  <v-footer padless>
    <v-col class="text-center" cols="12">
      <p class="ma-0">
        ©2019 —
        <strong>bauta studio</strong>
        <br />Steffen Dybvik
      </p>
    </v-col>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ user: "user/getUser" })
  }
};
</script>
<template>
  <div>
    <v-container>
      <v-row v-if="user">
        <v-col cols="12" class="text-center mt-5">
          <p class="display-2">Taskboards</p>
        </v-col>
      </v-row>
      <v-row v-if="user">
        <v-col cols="12" md="6" lg="4" xl="3" v-for="board in boards" :key="board.id">
          <v-card class="text-center py-5" :color="board.color">
            <v-toolbar flat color="transparent">
              <v-btn
                text
                x-large
                class="ml-5 display-1 white--text float-left"
                :to="{name: 'board', params: { boardId: board.id }}"
              >{{ board.title }}</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                class="mr-2"
                icon
                @click.stop.prevent="edit(board)"
                @click.stop="dialog = true"
              >
                <v-icon color="white">mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="user">
        <v-col>
          <v-btn text class="text--disabled ma-5 text-capitalize" @click="add">+ add board</v-btn>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="600px" @keydown.enter="save">
        <v-card class="px-5 py-2">
          <v-card-title>
            <span class="headline">Edit Board</span>
          </v-card-title>

          <v-card-text>
            <v-text-field label="Name" v-model="tempObject.title"></v-text-field>
            <v-text-field label="Color" v-model="tempObject.color"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn
              nuxt
              color="red lighten-2 white--text"
              @click="del(tempObject),dialog = false"
            >Delete</v-btn>
            <v-spacer></v-spacer>
            <v-btn nuxt color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn nuxt color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <BrosjSkeleton v-if="!user" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      tempObject: {},
      selected: null
    };
  },
  methods: {
    ...mapActions({
      setboards: "board/setBoards",
      deleteboard: "board/deleteBoard",
      editboard: "board/editBoard",
      cleanboard: "board/cleanBoard"
    }),
    add() {
      this.$store.dispatch("board/addBoard");
    },
    del(object) {
      this.deleteboard(object.id);
    },
    edit(object) {
      this.tempObject = JSON.parse(JSON.stringify(object));
      this.selected = object;
    },
    save() {
      let temp = JSON.parse(JSON.stringify(this.selected));
      temp.title = this.tempObject.title;
      temp.color = this.tempObject.color.toLowerCase();
      let payload = { id: temp.id, object: temp };
      this.editboard(payload);
      this.setboards();
      this.dialog = false;
      this.selected = null;
    }
  },
  computed: {
    ...mapGetters({ user: "user/getUser", boards: "board/getBoards" })
  },
  created() {
    if (this.user) {
      this.setboards();
    }
  }
};
</script>
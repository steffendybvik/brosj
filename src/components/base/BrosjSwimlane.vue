<template>
  <div class="swimlane" style="user-select: none;">
    <v-toolbar dense flat :color="swimlane.color" @click="collapsed = !collapsed">
      <v-icon class="ml-5 white--text" v-show="!collapsed">mdi-menu-down</v-icon>
      <v-icon class="ml-5 white--text" v-show="collapsed">mdi-menu-right</v-icon>
      <v-toolbar-title class="ml-5 white--text">{{ swimlane.title || 'Title not found' }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small class="mr-5" icon @click="edit" @click.stop="dialog = true">
        <v-icon color="white">mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row class="ml-1" v-show="!collapsed">
      <slot></slot>
      <v-col>
        <v-btn text class="text--disabled ma-5 text-capitalize" @click="addColumn">+ Add Column</v-btn>
      </v-col>
    </v-row>
    <!-- Modal -->
    <v-dialog v-model="dialog" max-width="600px" @keydown.enter="save">
      <v-card class="px-5 py-2">
        <v-card-title>
          <span class="headline">Edit Swimlane</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Swimlane name" v-model="tempObject.title"></v-text-field>
          <v-text-field label="Color" v-model="tempObject.color"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red lighten-2 white--text" @click="del">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Column } from "@/plugins/board-classes";
import { mapActions } from "vuex";
export default {
  props: ["board", "swimlane", "swimIndex"],
  data() {
    return {
      dialog: false,
      tempObject: {},
      collapsed: false
    };
  },
  methods: {
    ...mapActions({
      editBoard: "board/editBoard"
    }),
    edit() {
      this.tempObject = JSON.parse(JSON.stringify(this.swimlane));
    },
    save() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      let tempSwim = tempBoard.swimlanes[this.swimIndex];
      tempSwim.title = this.tempObject.title;
      tempSwim.color = this.tempObject.color.toLowerCase();
      let payload = { id: tempBoard.id, object: tempBoard };
      this.editBoard(payload);
      this.dialog = false;
    },
    del() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      tempBoard.swimlanes.splice(this.swimIndex, 1);
      if (tempBoard.swimlanes == 0) {
        delete tempBoard.swimlanes;
      }
      let payload = { id: tempBoard.id, object: tempBoard };
      this.editBoard(payload);
      this.dialog = false;
    },
    addColumn() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      if (!tempBoard.swimlanes[this.swimIndex].columns) {
        tempBoard.swimlanes[this.swimIndex].columns = [];
      }
      tempBoard.swimlanes[this.swimIndex].columns.push(
        JSON.parse(JSON.stringify(new Column()))
      );
      let payload = { id: this.$route.params.boardId, object: tempBoard };
      this.editBoard(payload);
    }
  }
};
</script>

<style lang="sass" scoped>
.swimlane
    border-bottom: 1px solid rgba(0,0,0,.1)
</style>
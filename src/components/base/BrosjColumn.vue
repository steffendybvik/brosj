<template>
  <v-col
    cols="2"
    class="column pa-2"
    @dragover="allowDrop"
    @dragenter="dragenter"
    @dragleave="dragleave"
    @drop="drop"
  >
    <v-toolbar flat dense class="ma-0 pa-0" color="transparent">
      <v-toolbar-title class="ml-5 text-center text--disabled">{{ column.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small class="ml-3 text--disabled" icon @click="edit" @click.stop="dialog = true">
        <v-icon color>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <slot></slot>
    <v-btn text class="text--disabled ml-5 text-capitalize" @click="addTask">+ Add Task</v-btn>
    <!-- Edit Modal -->
    <v-dialog v-model="dialog" max-width="600px" @keydown.enter="save">
      <v-card class="px-5 py-2">
        <v-card-title>
          <span class="headline">Edit Column</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="tempObject.title"></v-text-field>
          <v-btn color="red lighten-2 white--text" @click="deleteAllTasks">Empty column</v-btn>
        </v-card-text>
        <v-card-actions class="mt-10">
          <v-btn color="red lighten-2 white--text" @click="del">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { Task } from "@/plugins/board-classes";
import { mapActions } from "vuex";
export default {
  props: ["board", "column", "swimIndex", "colIndex"],
  data() {
    return {
      dialog: false,
      tempObject: {}
    };
  },
  methods: {
    ...mapActions({
      editBoard: "board/editBoard"
    }),
    edit() {
      this.tempObject = JSON.parse(JSON.stringify(this.column));
    },
    save() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      let tempCol = tempBoard.swimlanes[this.swimIndex].columns[this.colIndex];
      tempCol.title = this.tempObject.title;
      let payload = { id: tempBoard.id, object: tempBoard };
      this.editBoard(payload);
      this.dialog = false;
    },
    del() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      tempBoard.swimlanes[this.swimIndex].columns.splice(this.colIndex, 1);
      if (tempBoard.swimlanes[this.swimIndex].columns == 0) {
        delete tempBoard.swimlanes[this.swimIndex].columns;
      }
      let payload = { id: tempBoard.id, object: tempBoard };
      this.editBoard(payload);
      this.dialog = false;
    },
    addTask() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      if (!tempBoard.swimlanes[this.swimIndex].columns[this.colIndex].tasks) {
        tempBoard.swimlanes[this.swimIndex].columns[this.colIndex].tasks = [];
      }
      tempBoard.swimlanes[this.swimIndex].columns[this.colIndex].tasks.push(
        JSON.parse(JSON.stringify(new Task()))
      );
      let payload = { id: this.$route.params.boardId, object: tempBoard };
      this.editBoard(payload);
    },
    deleteAllTasks() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      delete tempBoard.swimlanes[this.swimIndex].columns[this.colIndex].tasks;
      let payload = { id: this.$route.params.boardId, object: tempBoard };
      this.editBoard(payload);
      this.dialog = false;
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    dragenter(ev) {
      ev.srcElement.classList.add("column-highlight");
    },
    dragleave(ev) {
      ev.srcElement.classList.remove("column-highlight");
    },
    drop(ev) {
      ev.srcElement.classList.remove("column-highlight");
      let from = ev.dataTransfer.getData("text").split(",");
      let to = [this.swimIndex, this.colIndex];
      if (from[0] == to[0] && from[1] == to[1]) {
        return;
      } else {
        this.dropSave(from, to);
      }
    },
    dropSave(from, to) {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      let tempTask =
        tempBoard.swimlanes[from[0]].columns[from[1]].tasks[from[2]];
      tempBoard.swimlanes[from[0]].columns[from[1]].tasks.splice(from[2], 1);
      if (!tempBoard.swimlanes[to[0]].columns[to[1]].tasks) {
        tempBoard.swimlanes[to[0]].columns[to[1]].tasks = [];
      }
      tempBoard.swimlanes[to[0]].columns[to[1]].tasks.push(tempTask);
      let payload = { id: tempBoard.id, object: tempBoard };
      this.editBoard(payload);
    }
  }
};
</script>

<style lang="sass" scoped>
.column
    border-right: 1px solid rgba(0,0,0,.1)
.column-highlight
    background: rgba(0,0,0,.05)
</style>
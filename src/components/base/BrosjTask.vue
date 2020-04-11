<template>
  <div>
    <v-card
      elevation="3"
      class="mb-3"
      :class="task.priority"
      draggable="true"
      @dragstart="drag($event, taskIndex)"
      @mouseover="showSettings = true"
      @mouseleave="showSettings = false"
    >
      <v-toolbar flat dense class="ma-0 pa-0">
        <v-toolbar-title>{{task.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          class="text--disabled"
          icon
          @click="edit"
          @click.stop="dialog = true"
          v-show="showSettings"
          small
        >
          <v-icon color>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="py-0" v-if="task.description">
        <p style="white-space:pre-line">{{ task.description }}</p>
      </v-card-text>
      <v-card-actions></v-card-actions>
    </v-card>
    <!-- Edit Modal -->
    <v-dialog v-model="dialog" max-width="600px" @keydown.enter="save">
      <v-card class="px-5 py-2">
        <v-card-title>
          <span class="headline">Edit Task</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="tempObject.title"></v-text-field>
          <v-textarea label="Description" v-model="tempObject.description"></v-textarea>
          <v-row>
            <v-col cols="6">
              <v-select
                :items="['normal', 'medium', 'high']"
                label="Priority"
                v-model="tempObject.priority"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red lighten-2 white--text" @click="del">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- View Task -->
    <v-dialog v-model="view" max-width="600px">
      <v-card class="px-5 py-2">
        <v-card-title>{{ task.title }}</v-card-title>
        <v-card-text>
          <p>{{}}</p>
          <p>{{ task.description }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["board", "task", "swimIndex", "colIndex", "taskIndex", "hoverObject"],
  data() {
    return {
      dialog: false,
      view: false,
      tempObject: {},
      showSettings: false
    };
  },
  methods: {
    ...mapActions({
      editBoard: "board/editBoard"
    }),
    edit() {
      this.tempObject = JSON.parse(JSON.stringify(this.task));
    },
    save() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      let tempTask =
        tempBoard.swimlanes[this.swimIndex].columns[this.colIndex].tasks[
          this.taskIndex
        ];
      tempTask.title = this.tempObject.title;
      if (this.tempObject.description != null) {
        tempTask.description = this.tempObject.description;
      }
      tempTask.priority = this.tempObject.priority;
      let payload = { id: tempBoard.id, object: tempBoard };
      this.editBoard(payload);
      this.dialog = false;
    },
    del() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      tempBoard.swimlanes[this.swimIndex].columns[this.colIndex].tasks.splice(
        this.taskIndex,
        1
      );
      if (
        tempBoard.swimlanes[this.swimIndex].columns[this.colIndex].tasks == 0
      ) {
        delete tempBoard.swimlanes[this.swimIndex].columns[this.colIndex].tasks;
      }
      let payload = { id: tempBoard.id, object: tempBoard };
      this.editBoard(payload);
      this.dialog = false;
    },
    drag(ev) {
      ev.dataTransfer.setData("text/plain", [
        this.swimIndex,
        this.colIndex,
        this.taskIndex
      ]);
    },
    test() {
      console.log("test");
    }
  }
};
</script>

<style lang="sass" scoped>
.medium
    border-left: 10px solid yellow
.high
    border-left: 10px solid red

.card:hover .settings
    display: block
</style>
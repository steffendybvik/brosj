<template>
  <div class="board" v-if="board != null">
    <v-toolbar dense flat :color="board.color">
      <v-btn class="white--text" rounded text to="/">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <v-toolbar-title class="white--text">{{ board.title || 'Title not found'}}</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn small class="mr-5 white--text" icon @click="edit()" @click.stop="dialog = true">
        <v-icon color>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <BrosjSwimlane
      v-for="(swimlane, swimIndex) in board.swimlanes"
      :key="swimIndex"
      :board="board"
      :swimlane="swimlane"
      :swimIndex="swimIndex"
    >
      <BrosjColumn
        v-for="(column, colIndex) in swimlane.columns"
        :key="colIndex"
        :board="board"
        :column="column"
        :swimIndex="swimIndex"
        :colIndex="colIndex"
      >
        <BrosjTask
          v-for="(task, taskIndex) in column.tasks"
          :key="taskIndex"
          :board="board"
          :task="task"
          :swimIndex="swimIndex"
          :colIndex="colIndex"
          :taskIndex="taskIndex"
        />
      </BrosjColumn>
    </BrosjSwimlane>
    <v-btn text class="text--disabled ma-5 text-capitalize" @click="addSwimlane">+ Add Swimlane</v-btn>
    <!-- Modal -->
    <v-dialog v-model="dialog" max-width="600px" @keydown.enter="save">
      <v-card class="px-5 py-2">
        <v-card-title>
          <span class="headline">Edit Board</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="tempObject.title"></v-text-field>
          <p>Author: {{ tempObject.author }}</p>
          <v-row>
            <v-col cols="6">
              <v-text-field label="Color" v-model="tempObject.color"></v-text-field>
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
  </div>
</template>

<script>
import { Swimlane } from "@/plugins/board-classes";
/* import swimlane from "@/components/swimlane.vue";
import column from "@/components/column.vue";
import task from "@/components/task.vue"; */
import { mapGetters, mapActions } from "vuex";
export default {
  /*   components: { swimlane, column, task }, */
  data() {
    return {
      dialog: false,
      tempObject: {}
    };
  },
  methods: {
    ...mapActions({
      setboard: "board/setBoardWithID",
      deleteboard: "board/deleteBoard",
      editboard: "board/editBoard"
    }),
    edit() {
      this.tempObject = JSON.parse(JSON.stringify(this.board));
    },
    save() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      tempBoard.title = this.tempObject.title;
      tempBoard.color = this.tempObject.color.toLowerCase();
      let payload = { id: tempBoard.id, object: tempBoard };
      this.editboard(payload);
      this.dialog = false;
    },
    del() {
      this.deleteboard(this.board.id).then(() => {
        this.$router.push({ name: "home" });
      });
    },
    addSwimlane() {
      let tempBoard = JSON.parse(JSON.stringify(this.board));
      if (!tempBoard.swimlanes) {
        tempBoard.swimlanes = [];
      }
      tempBoard.swimlanes.push(JSON.parse(JSON.stringify(new Swimlane())));
      let payload = { id: this.$route.params.boardId, object: tempBoard };
      console.log(payload);
      this.editboard(payload);
    }
  },
  computed: {
    ...mapGetters({ board: "board/getBoard" })
  },
  created() {
    this.setboard(this.$route.params.boardId);
  }
};
</script>

<style lang="sass" scoped>
.board
    background: rgba(0,0,0,.05)

.drag-over
    background: rgba(0,0,0, .05)
</style>
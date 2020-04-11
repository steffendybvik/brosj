<template>
  <v-container fluid>
    <!-- Text -->
    <v-row justify="center">
      <v-col cols="12" md="7">
        <v-card elevation="0" class="pa-10">
          <v-card-title class="display-2">Keeping it simple</v-card-title>
          <v-card-text>
            <p
              class="subtitle-1"
            >Brosj is a simplified kanban inspired taskboard-manager made for developers.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Boards -->
    <v-row justify="center">
      <v-col cols="12" class="board px-10">
        <v-row>
          <v-col cols="12" class="text-center">
            <p class="display-1">Taskboards</p>
          </v-col>
          <v-col cols="4">
            <v-card class="pa-10" color="teal">
              <v-toolbar flat color="transparent">
                <p class="white--text">My Webpage</p>
                <v-spacer></v-spacer>
                <v-btn nuxt class="mr-2" icon>
                  <v-icon color="white">mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="pa-10" color="orange">
              <v-toolbar flat color="transparent">
                <p class="white--text">My Shop</p>

                <v-spacer></v-spacer>
                <v-btn nuxt class="mr-2" icon>
                  <v-icon color="white">mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="pa-10" color="cyan">
              <v-toolbar flat color="transparent">
                <p class="white--text">Work</p>
                <v-spacer></v-spacer>
                <v-btn nuxt class="mr-2" icon>
                  <v-icon color="white">mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- Text -->
    <v-row justify="center" class="mt-10">
      <v-col cols="12" md="7">
        <v-card elevation="0" class="pa-10">
          <v-card-title class="display-2">Drag and drop functionality</v-card-title>
          <v-card-text>
            <p class="subtitle-1">Intuitive drag and drop tasks between swimlanes and columns</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Swimlane -->
    <v-row justify="center">
      <v-col cols="12" class="board pa-0">
        <v-toolbar dense flat color="orange">
          <v-icon class="ml-5 white--text">mdi-menu-down</v-icon>
          <v-toolbar-title class="ml-5 white--text">Swimlane</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn nuxt small class="mr-5" icon @click.stop.prevent>
            <v-icon color="white">mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- Column -->
        <v-row class="swimlane">
          <v-col class="column">
            <v-toolbar flat dense class="ma-0 pa-0" color="transparent">
              <v-toolbar-title class="ml-5 text-center text--disabled">Todo</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn nuxt small class="ml-3 text--disabled" icon>
                <v-icon color>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card elevation="3" class="mb-3">
              <v-toolbar flat dense class="ma-0 pa-0">
                <v-toolbar-title>Fix promise error</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn nuxt small class="text--disabled" icon @click.stop.prevent>
                  <v-icon color>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text class="py-0">
                <p style="white-space:pre-line">Axios fetch user rejects request</p>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
            <v-card elevation="3" class="mb-3">
              <v-toolbar flat dense class="ma-0 pa-0">
                <v-toolbar-title>Fix promise error</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn nuxt small class="text--disabled" icon @click.stop.prevent>
                  <v-icon color>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text class="py-0">
                <p style="white-space:pre-line">Axios fetch user rejects request</p>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
          </v-col>
          <v-col class="column">
            <v-toolbar flat dense class="ma-0 pa-0" color="transparent">
              <v-toolbar-title class="ml-5 text-center text--disabled">On hold</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn nuxt small class="ml-3 text--disabled" icon>
                <v-icon color>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
          </v-col>
          <v-col class="column">
            <v-toolbar flat dense class="ma-0 pa-0" color="transparent">
              <v-toolbar-title class="ml-5 text-center text--disabled">Doing</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn nuxt small class="ml-3 text--disabled" icon>
                <v-icon color>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card elevation="3" class="mb-3 high">
              <v-toolbar flat dense class="ma-0 pa-0">
                <v-toolbar-title>Fix promise error</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn nuxt small class="text--disabled" icon @click.stop.prevent>
                  <v-icon color>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text class="py-0">
                <p style="white-space:pre-line">Axios fetch user rejects request</p>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-toolbar flat dense class="ma-0 pa-0" color="transparent">
              <v-toolbar-title class="ml-5 text-center text--disabled">Complete</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn small class="ml-3 text--disabled" icon>
                <v-icon color>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card elevation="3" class="mb-3 medium">
              <v-toolbar flat dense class="ma-0 pa-0">
                <v-toolbar-title>Card css style width</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn nuxt small class="text--disabled" icon @click.stop.prevent>
                  <v-icon color>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text class="py-0">
                <p style="white-space:pre-line">Axios fetch user rejects request</p>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- Text -->
    <v-row justify="center" class="mt-10">
      <v-col cols="12" md="7">
        <v-card elevation="0" class="pa-10">
          <v-card-title class="display-2">Brosj is still being developed</v-card-title>
          <v-card-text>
            <p class="subtitle-1">
              Additional features are being developed.
              <br />Bugs and error are prone to happen.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template> 

<script>
export default {
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style lang="sass" scoped>
.board
    background: rgba(0,0,0,.05)

.swimlane
    border-bottom: 1px solid rgba(0,0,0,.1)

.column
    border-right: 1px solid rgba(0,0,0,.1)

.column-highlight
    background: rgba(0,0,0,.05)

.medium
    border-left: 10px solid yellow
.high
    border-left: 10px solid red

.card:hover .settings
    display: block
</style>
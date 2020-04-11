import { Board } from '@/plugins/board-classes'
import { db, auth } from "@/services/init-firebase";

export default {
    namespaced: true,
    state: {
        boards: null,
        board: null
    },
    getters: {
        getBoards: (state) => {
            return state.boards;
        },
        getBoard: (state) => {
            return state.board;
        }

    },
    mutations: {
        setBoards: (state, payload) => {
            state.boards = payload;
        },
        setBoardWithID: (state, object) => {
            state.board = object;
        },
        addBoard: (state, object) => {
            state.boards.push(object);
        },
        deleteBoard: (state, id) => {
            let index = state.boards.indexOf(id);
            state.boards.splice(index, 1);
        },
        cleanBoard: (state) => {
            state.board = null
        }
    },
    actions: {
        async setBoards({ commit }) {
            //.where("author", "==", this.$fireAuth.currentUser.uid)
            //.where('members', 'array-contains', this.$fireAuth.currentUser.uid)
            await db.collection("boards").where("author", "==", auth.currentUser.uid)
                .get()
                .then((querySnapshot) => {
                    let payload = [];
                    querySnapshot.forEach((doc) => {
                        let temp = doc.data();
                        temp.id = doc.id;
                        payload.push(temp);
                    });
                    commit('setBoards', payload);
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        },
        async setBoardWithID({ commit }, id) {
            await db.collection("boards").doc(id).get()
                .then((doc) => {
                    let object = doc.data();
                    object.id = doc.id;
                    commit('setBoardWithID', object);
                }).catch((error) => {
                    console.log("Error getting  with id: ", error);
                });
        },
        async addBoard({ commit }) {
            let newBoard = new Board();
            newBoard.author = auth.currentUser.uid;
            await db.collection("boards").add({ ...newBoard })
                .then((doc) => {
                    newBoard.id = doc.id;
                    console.log(newBoard);
                    commit('addBoard', newBoard);
                })
                .catch((error) => {
                    console.error("Error creating document: ", error);
                });
        },
        async deleteBoard({ commit }, id) {
            await db.collection("boards").doc(id).delete()
                .then(() => {
                    commit('deleteBoard', id)
                })
                .catch((error) => {
                    console.error("Error deleting document: ", error)
                });
        },
        async editBoard({ commit }, payload) {
            await db.collection("boards").doc(payload.id).set({ ...payload.object })
                .then(() => {
                    commit('setBoardWithID', payload.object);
                })
                .catch((error) => {
                    console.error("Error deleting document: ", error)
                });
        },
        async cleanBoard({ commit }) {
            await commit('cleanBoard');
        }
    },
}

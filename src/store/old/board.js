import { Board } from '~/plugins/board_classes'
export const state = () => ({
    boards: null,
    board: null
})

export const getters = {
    getBoards: (state) => {
        return state.boards;
    },
    getBoardWithID: (state) => {
        return state.board;
    }
}

export const mutations = {
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
}

export const actions = {
    async setBoards({ commit }) {
        //.where("author", "==", this.$fireAuth.currentUser.uid)

        //.where('members', 'array-contains', this.$fireAuth.currentUser.uid)
        await this.$fireStore.collection("boards").where("author", "==", this.$fireAuth.currentUser.uid)
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
        await this.$fireStore.collection("boards").doc(id).get()
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
        newBoard.author = this.$fireAuth.currentUser.uid;
        await this.$fireStore.collection("boards").add({ ...newBoard })
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
        await this.$fireStore.collection("boards").doc(id).delete()
            .then(() => {
                commit('deleteBoard', id)
            })
            .catch((error) => {
                console.error("Error deleting document: ", error)
            });
    },
    async editBoard({ commit }, payload) {
        await this.$fireStore.collection("boards").doc(payload.id).set({ ...payload.object })
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
}
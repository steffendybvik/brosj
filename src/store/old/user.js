export const state = () => ({
    user: null,
})

export const getters = {
    getUser: (state) => {
        return state.user;
    }
}

export const mutations = {
    setUser: (state, account) => {
        if (account != null) {
            const { uid, email, emailVerified } = account
            state.user = { uid, email, emailVerified }
        }
        else {
            state.user = null
        }
    },
}

export const actions = {
    async setUser({ commit }, account) {
        await commit('setUser', account);
    },
    async login({ }, payload) {
        await this.$fireAuth
            .signInWithEmailAndPassword(payload.email, payload.password).then(() => {
                console.log("logged in")
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    },
    async logout({ }) {
        await this.$fireAuth
            .signOut()
            .catch(error => {
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    },
    async deleteAccount() {
        let account = this.$fireAuth.currentUser;
        account.delete().then(() => {
            console.log("successfully deleted account")
        }).catch((error) => {
            let errorMessage = error.message;
        });
    },
    async register({ }, payload) {
        await this.$fireAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    },
    async onAuthStateChangedAction({ commit }) {
        await commit('setUser', this.$fireAuth.currentUser)
    }
}
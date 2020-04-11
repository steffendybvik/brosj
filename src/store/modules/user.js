import { auth } from "@/services/init-firebase";

export default {
    namespaced: true,
    state: {
        user: null
    },
    getters: {
        getUser: (state) => {
            return state.user;
        }
    },
    mutations: {
        setUser: (state, account) => {
            if (account != null) {
                const { uid, email, emailVerified } = account
                state.user = { uid, email, emailVerified }
            }
            else {
                state.user = null
            }
        },
    },
    actions: {
        async setUser({ commit }, account) {
            await commit('setUser', account);
        },
        async login({ commit }, payload) {
            await auth
                .signInWithEmailAndPassword(payload.email, payload.password).then((resp) => {
                    console.log("logged in");
                    commit('setUser', resp.user);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async logout() {
            await auth
                .signOut()
                .catch(error => {
                    console.log(error);
                });
        },
        async deleteAccount() {
            let account = auth.currentUser;
            account.delete().then(() => {
                console.log("successfully deleted account")
            }).catch((error) => {
                console.log(error);
            });
        },
        async register(payload) {
            await auth.createUserWithEmailAndPassword(payload.email, payload.password)
                .catch((error) => {
                    console.log(error);
                });
        },
    },
}

import { stat } from "fs-extra-p";

const state = {
    UserName: "",
    currency: {
        curr: "USD",
        symbol: "$"
    },
    currencyOptions: [{
            curr: "USD",
            symbol: "$"
        },
        {
            curr: "GBP",
            symbol: "£"
        },
        {
            curr: "EUR",
            symbol: "€"
        }
    ],
    auth: false,
    name: "",
    email: "",
    user: null
}

const mutations = {
    changeName(state, name) {
        state.UserName = name
    },

    changeCurrency(state, curr) {
        state.currency.curr = curr;
        state.currency.symbol = state.currencyOptions.find(a => a.curr === curr).symbol

    },

    setAuth(state) {
        state.auth = !state.auth
    },
    setName(state, name) {
        state.name = name
    },
    setEmail(state, email) {
        state.email = email
    },

    setUser(state, user) {
        state.user = user
    },

    destroyUser(state) {
        state.user = null
    }
}

const actions = {

}

const getters = {
    getName(state) {
        return state.name
    },
    getCurrencyOptions(state) {
        return state.currencyOptions.map(curr => curr.curr)
    },
    getCurrency(state) {
        return state.currency
    },
    getCurrencySymbol(state, currency) {
        return state.currencyOptions.find(a => a.curr === currency)
    },
    getAuth(state) {
        return state.auth
    },
    getUser(state) {
        return state.user
    }

}

export default {
    state,
    mutations,
    getters,
    actions
}
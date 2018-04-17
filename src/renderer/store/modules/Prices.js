import { ipcRenderer } from 'electron'


const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



const state = {
    Coins: [],
    load: true,

}

const mutations = {
    setData: (state, data) => {
        state.Coins = data
    }
}

const actions = {
    getData: () => {
        ipcRenderer.send("get-coins-main")
    }


}

const getters = {
    getCoin(state) {
        return state.Coins
    }
}



export default {
    state,
    mutations,
    getters,
    actions
}
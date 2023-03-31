import { defineStore } from 'pinia'

export const useNavStore = defineStore('counter', {
  state: () => ({
    pageIndex: ref(0),
    navState: ref(false),
    navNames: ref([
      "home",
      "works",
      "about",
      "contact"
    ])
  }),
  actions: {
    increaseIndex() {
      if (this.pageIndex < this.navNames.length - 1) {
        this.pageIndex++
      }
    },
    decreseIndex() {
      if (this.pageIndex > 0) {
        this.pageIndex--
      }
    },
    setPageIndex(index:number) {
      this.pageIndex = index;
    },
    showNav() {
      this.navState = true;
    },
    hideNav() {
      this.navState = false;
    }
  },
})
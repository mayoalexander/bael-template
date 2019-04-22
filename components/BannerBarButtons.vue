<template>
  <div :class="{'margin-right-zero': $vuetify.breakpoint.name === 'xs','margin-right-eightpx': this.$vuetify.breakpoint.name !== 'xs'}">
    <v-speed-dial
      v-if="areAccountLinks"
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
      class="inline-box"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        :class="{'btn--small': isMobile, 'travis-btn-extra-small': $vuetify.breakpoint.xsOnly}"
        color="copper900 info--text"
      >
        <span :class="{'body-2': !isMobile,'caption': isMobile}">
          New Account
        </span>
        <v-icon
          v-if="fab"
          :small="isMobile"
          dark
        >
          arrow_drop_up
        </v-icon>
        <v-icon
          v-else
          :small="isMobile"
          dark
        >
          arrow_drop_down
        </v-icon>
      </v-btn>
      <v-btn
        v-if="getCurrentBranch.bectran_credit"
        :class="{'btn--small': isMobile, 'travis-btn-extra-small': $vuetify.breakpoint.xsOnly}"
        color="copper900 info--text"
        @click="applyForCredit"
      >
        <!-- @click="applyForCredit" @click="$router.push({ name: 'Credit' })"-->
        <span :class="{'body-2': !isMobile,'caption': isMobile}">
          Apply For Credit
        </span>
      </v-btn>
      <v-btn
        v-if="getCurrentBranch.bectran_cash"
        :class="{'btn--small': isMobile, 'travis-btn-extra-small': $vuetify.breakpoint.xsOnly}"
        color="copper900 info--text"
        @click="applyCashAccount"
      >
        <span :class="{'body-2': !isMobile,'caption': isMobile}">
          Set Up Cash Account
        </span>
      </v-btn>
    </v-speed-dial>
    <v-btn
      :class="{'btn--small': isMobile, 'travis-btn-extra-small': $vuetify.breakpoint.xsOnly}"
      color="copper900 info--text"
      @click="payOnline"
    >
      <span :class="{'body-2': !isMobile,'caption': isMobile}">
        Pay Online
      </span>
    </v-btn>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'BannerBarButtons',
  data () {
    return {
      direction: 'bottom',
      fab: false,
      fling: false,
      tabs: null,
      right: false,
      top: false,
      bottom: false,
      left: false,
      transition: 'scale-transition'
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentBranch'
    ]),
    areAccountLinks () {
      if (this.getCurrentBranch.bectran_credit) {
        return true
      } else if (this.getCurrentBranch.bectran_cash) {
        return true
      } else {
        return false
      }
    },
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        case 'md':
          return false
        case 'lg':
          return false
        case 'xl':
          return false
      }
      return false
    },
    hover () {
      if (this.isMobile) {
        return false
      } else {
        return true
      }
    },
    activeFab () { /* boilerplate */
      switch (this.tabs) {
        case 'one': return { 'class': 'purple', icon: 'account_circle' }
        case 'two': return { 'class': 'red', icon: 'edit' }
        case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
        default: return {}
      }
    }
  },
  watch: {
    top (val) {
      this.bottom = !val
    },
    right (val) {
      this.left = !val
    },
    bottom (val) {
      this.top = !val
    },
    left (val) {
      this.right = !val
    }
  },
  methods: {
    applyForCredit () {
      let tab = window.open(this.getCurrentBranch.bectran_credit, '_blank')
      tab.focus()
      console.log('Applying for Credit')
      this.$ga.event('Button', 'click', 'Apply for Credit')
    },
    payOnline () {
      let tab = window.open(process.env.TRAVIS_PAYMENT_PORTAL, '_blank')
      tab.focus()
      this.$ga.event('Button', 'click', 'Pay Online')
    },
    applyCashAccount () {
      let tab = window.open(this.getCurrentBranch.bectran_cash, '_blank')
      tab.focus()
      console.log('Applying for Cash Account')
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 0 4px 8px 4px !important;
}

.margin-right-eightpx {
  margin-right: 8px !important;
}

.caption {
  font-weight: 500;
}

.margin-right-zero {
  margin-right: 0 !important;
  margin-left: auto !important;
  /* margin: auto !important; */
}

a {
  text-decoration: none;
}

.travis-btn-extra-small {
  height: 21px !important;
  font-size: 10px !important;
}

.inline-box {
  display: inline-block;
}
</style>

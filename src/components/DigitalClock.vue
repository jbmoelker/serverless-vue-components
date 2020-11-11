<template>
  <div class="clock" v-if="hourtime != ''">
    <div class="clock__hours">
      <span class="clock__hourtime" v-text="hourtime"></span>
      <span v-text="hours"></span>
    </div>
    <div class="clock__minutes" v-text="minutes"></div>
    <div class="clock__seconds" v-text="seconds"></div>
  </div>
</template>

<script>
/**
 * borrowed from https://github.com/dangvanthanh/vue-clock/blob/master/src/VueClock.vue
 */

const SECOND = 1000;
// const HOUR = 12;
const getHourTime = (h) => h >= 12 ? 'PM' : 'AM'
const getZeroPad = (n) => (parseInt(n, 10) >= 10 ? '' : '0') + n

export default {
  data() {
    return {
      now: new Date(),
    };
  },
  computed: {
    hours() { return this.now.getHours() },
    minutes() { return getZeroPad(this.now.getMinutes()) },
    seconds() { return getZeroPad(this.now.getSeconds()) },
    hourtime() { return getHourTime(this.hours) },
    // hours = this.hours % HOUR || HOUR;
  },
  mounted() {
    this.$options.timer = window.setTimeout(this.updateDateTime, SECOND);
  },
  beforeDestroy() {
    window.clearTimeout(this.$options.timer);
  },
  methods: {
    updateDateTime() {
      this.now = new Date();
      this.$options.timer = window.setTimeout(this.updateDateTime, SECOND);
    },
  },
};
</script>

<style scoped>
.clock {
  background: #fff;
  border: 0.3rem solid #fff;
  border-radius: 0.5rem;
  display: inline-block;
  margin-bottom: 1em;
}
.clock__hours,
.clock__minutes,
.clock__seconds {
  background: linear-gradient(to bottom, #26303b 50%, #2c3540 50%);
  display: inline-block;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 3rem;
  font-weight: 300;
  padding: 0.5rem 1rem;
  text-align: center;
  position: relative;
}
.clock__hours {
  border-right: 0.15rem solid #fff;
  border-radius: 0.5rem 0 0 0.5rem;
}
.clock__minutes {
  border-right: 0.15rem solid #fff;
}
.clock__seconds {
  border-radius: 0 0.5rem 0.5rem 0;
}
.clock__hourtime {
  font-size: 1rem;
  position: absolute;
  top: 2px;
  left: 8px;
}
</style>
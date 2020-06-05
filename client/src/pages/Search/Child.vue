<template>
  <div>
    <slot  :list='list[0]'>123</slot>
    <div>content</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      list:['我是子组件的Header','我是子组件的Footer']
    };
  },
  created() {},
  mounted() {},
  update() {},
  methods: {},
  computed: {}
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" ></style>

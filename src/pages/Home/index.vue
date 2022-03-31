<template>
  <div>
    <!-- 三级联动全局组件(全局组件不需要再次引入) -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from './ListContainer';
import Recommend from './Recommend';
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor';
import Brand from './Brand';
import { mapState } from 'vuex';
export default {
  name: 'Home',
  components: {
    ListContainer, Recommend, Rank, Like, Floor, Brand
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList,
    })
  },
  mounted() {
    this.$store.dispatch('getFoolList')
  },
}
</script>

<style>
</style>
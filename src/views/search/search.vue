<template>
  <div>
<!--利用.native 修饰符去监听组件的 鼠标事件，    -->
    <index @mouseenter.native="searchShowList" ref="child" @mouseleave.native="hideList"/>
    <ul>
      <li>1列表1</li>
      <li>2列表1</li>
      <li>3列表1</li>
      <li>4列表1</li>
      <li>5列表1</li>
      <li>6列表1</li>
      <li>7列表1</li>
      <li>8列表1</li>
      <li>9列表1</li>
      <li>10列表1</li>
      <li>11列表1</li>
      <li>12列表1</li>
      <li>13列表1</li>
      <li>14列表1</li>
      <li>15列表1</li>
      <li>16列表1</li>
      <li>17列表1</li>
      <li>18列表1</li>
      <li>19列表1</li>
      <li>20列表1</li>
      <li>21列表1</li>
      <li>22列表1</li>
      <li>23列表1</li>
      <li>24列表1</li>
      <li>25列表1</li>
      <li>26列表1</li>
      <li>27列表1</li>
      <li>28列表1</li>
      <li>29列表1</li>
      <li>30列表1</li>
      <li>31列表1</li>
      <li>32列表1</li>
      <li>33列表1</li>
      <li>34列表1</li>
      <li>35列表1</li>
      <li>36列表1</li>
      <li>37列表1</li>
      <li>38列表1</li>
      <li>39列表1</li>
      <li>40列表1</li>
      <li>41列表1</li>
      <li>42列表1</li>
      <li>43列表1</li>
      <li>44列表1</li>
      <li>45列表1</li>
      <li>46列表1</li>
      <li>47列表1</li>
      <li>48列表1</li>
      <li>49列表1</li>
      <li>50列表1</li>
      <li>51列表1</li>
      <li>52列表1</li>
      <li>53列表1</li>
      <li>54列表1</li>
      <li>55列表1</li>
      <li>56列表1</li>
      <li>57列表1</li>
      <li>58列表1</li>
      <li>59列表1</li>
      <li>60列表1</li>
      <li>61列表1</li>
      <li>62列表1</li>
      <li>63列表1</li>
      <li>64列表1</li>
      <li>65列表1</li>
      <li>66列表1</li>
      <li>67列表1</li>
      <li>68列表1</li>
      <li>69列表1</li>
      <li>70列表1</li>
      <li>71列表1</li>
      <li>72列表1</li>
      <li>73列表1</li>
      <li>74列表1</li>
      <li>75列表1</li>
      <li>76列表1</li>
      <li>77列表1</li>
      <li>78列表1</li>
      <li>79列表1</li>
      <li>80列表1</li>
      <li>81列表1</li>
      <li>82列表1</li>
      <li>83列表1</li>
      <li>84列表1</li>
      <li>85列表1</li>
      <li>86列表1</li>
      <li>87列表1</li>
      <li>88列表1</li>
      <li>89列表1</li>
      <li>90列表1</li>
      <li>91列表1</li>
      <li>92列表1</li>
      <li>93列表1</li>
      <li>94列表1</li>
      <li>95列表1</li>
      <li>96列表1</li>
      <li>97列表1</li>
      <li>98列表1</li>
      <li>99列表1</li>
      <li>100列表1</li>
    </ul>
  </div>
</template>

<script>
import index from "@/components/content/TypeNav/index";//搜索模块的 导航栏引入
export default {
  name: "search",
  components: {
    index
  },
  methods: {
    searchShowList() {
      this.$refs.child.showList = true;
    },
    hideList() {
      this.$refs.child.showList = false
    }
  }
}
</script>

<style scoped>

</style>

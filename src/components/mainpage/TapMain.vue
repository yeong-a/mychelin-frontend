<template>
  <div class="wrap-tap">
      <button class="tap-list">
          <i class="far fa-newspaper tap-icon"></i>
      </button>
      <button class="tap-list">
          <i class="fas fa-map-marker-alt tap-icon"></i>
      </button>
      <button class="tap-list">
          <i class="fas fa-th-large tap-icon"></i>
      </button>
      <button class="tap-list">
        <i class="fas fa-comments tap-icon"></i>
      </button>
  </div>
</template>

<script>
export default {

}
</script>

<style>
* { font-family: 'Spoqa Han Sans Neo', 'sans-serif'; }

.wrap-tap{
    width: 100px;
    height: 240px;
}

.tap-list{
    width: 100px;
    height: 60px;
    border-bottom:solid 1px #ACACAC;
    border-left:solid 1px #dad8d8;
    box-shadow: #dad8d8 0px 2px;
    font-size:36px;
}

.tap-list:focus{
    background-color: #FF993C;
    color: white;
}

.tap-icon{
}

</style>
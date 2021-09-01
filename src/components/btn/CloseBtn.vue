<template>
  <div>
      <a class="button-close"><i class="fas fa-times-circle"></i></a>
  </div>
</template>

<script>
export default {
  name: 'PlusBtn',
  props: {
    data: String
  },
}
</script>

<style scoped>
a.button-close {
    display:inline-block;
    padding:0.2em 0.2em 0em;
    font-size: 30px;
    color:#F2F2F2;
    text-align:center;
}

</style>
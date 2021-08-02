<template>
  <div>
      <a class="button-o"><i class="fas fa-plus-circle"></i>&nbsp;{{ data }}</a>
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

<style>
a.button-o {
    display:inline-block;
    padding:0.5em 1em;
    border:0.1em solid #FF742E;
    /* margin: 0 0 0 0; */
    border-radius:2em;
    box-sizing: border-box;
    text-decoration:none;
    font-weight:500;
    color:#FFF;
    background-color:#FF742E;
    text-align:center;
    transition: all 0.2s;
}

a.button-o:hover{
    color:#FF742E;
    background-color:#FFF;
}
</style>
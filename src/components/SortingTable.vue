<template>
  <div class="ss__table">
    <h5 class="sst_head_title">{{items.length}} people in the list</h5>
    <table id="table" class="table" style="">
      <thead>
      <tr>
        <th>Email</th>
        <th class="__potatoes">Potatoes</th>
        <th class="__full_name">Full name</th>
      </tr>
      </thead>
      <draggable :list="items" tag="tbody" @end="onEndMove" class="dragArea">
        <tr class="draggable" v-for="item in items" :key="item.id">
          <td scope="row">
            <label class="c_check">
              <input type="checkbox">
              <span class="c_mark"></span>
            </label>
            <span class="__email"> {{ item.email }} </span>
            <span class="__arrow_right">
              <img alt="Close" src="../assets/arrow-right.svg">
            </span>
          </td>
          <td class="__potatoes">{{ item.potatoes }}</td>
          <td class="__full_name">{{ item.name }}</td>
        </tr>
      </draggable>
    </table>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: 'SortingTable',
  props:{
    items: Array,
    potatoesArr: Array
  },
  components: {
    draggable
  },
  data() {
    return {
      potatoesMaxToMin : this.potatoesArr.sort((a, b) => b - a),
      successMessage: false,
    }
  },
  methods: {
    onEndMove: function (){
      this.checkMaxToMin();
    },
    checkMaxToMin: function(){
      let matchedNames = [];
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].potatoes === this.potatoesMaxToMin[i]){
          matchedNames.push(this.items[i].name);
        }
      }
      if(matchedNames.length === this.items.length){
        this.successMessage = true;
        this.$emit('sortingDone')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.sorting__system{
  .ss__table{
    display: block;
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.101972);
    border-radius: 5px;
    width: 1138px;
    max-width: 100%;
    margin: 36px auto 0;
    .sst_head_title{
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #000000;
      float: right;
      margin-right: 30px;
    }
    table{
      clear: both;
      border-collapse: collapse;
      width: 100%;
      th,td{
        font-family: 'Roboto', sans-serif;
        background: #FFFFFF;
        border: 1px solid #DDDDDD;
        text-align: left;
        padding: 15px 20px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #000000;
        user-select: none;
      }
      td{
        .c_check {
          display: block;
          position: relative;
          padding-left: 35px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
          }
          input:checked ~ .c_mark {
            background-color: #FF8D00;
            border-radius: 5px;
            &:after {
              display: block;
            }
          }
          .c_mark:after {
            left: 6px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }
        .c_mark {
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          width: 20px;
          background: #FFFFFF;
          border: 1px solid #DDDDDD;
          box-sizing: border-box;
          border-radius: 5px;
          &:after {
            content: "";
            position: absolute;
            display: none;
          }
        }
        span.__email {
          margin-left: 37px;
        }
        span.__arrow_right {
          display: inline-block;
          float: right;
        }
        &.__potatoes{
          border-right: none;
          cursor: move;
        }
        &.__full_name{
          border-left: none;
        }
      }
      th{
        &.__potatoes {
          border-right: none;
        }
        &.__full_name{
          border-left: none;
        }
      }
    }
    @media (min-width: 100px) and (max-width: 650px) {
      td{
        padding-left: 5px !important;
        padding-right: 5px !important;
        span.__email {
          margin-left: 30px !important;
        }
      }
    }
  }
}
</style>

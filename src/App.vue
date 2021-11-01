<template>
  <div id="app">
    <div class="container sorting__system">
      <div class="heading__top">
        <h2 class="s__title">Sorting Training System</h2>
        <div class="time__count__up" v-if="timerStarted">
          <span class="time">Total Time: {{ timerTime }}</span>
        </div>
        <div class="btn__sorting" @click="showModal = true">Start sorting!</div>
        <modal v-if="showModal" @close="showModal = false">
          <h3 slot="header__title">How many people?</h3>
          <div slot="body" class="__m_body">
            <p>
              Enter a number of how many people you want to add to the list.
            </p>
            <input type="number" v-model="sortCount" min="20" max="100" class="__m_input_number" />
          </div>
          <div slot="footer">
            <button class="m__btn_cancel" @click="showModal = false">
              Cancel
            </button>
            <button class="m__btn_start" v-on:click="startSorting">
              Start
            </button>
          </div>
        </modal>
      </div>
      <SortingTable v-bind:items="items" v-bind:potatoesArr="potatoesArr" v-if="items.length" @sortingDone="afterSortingDone" />
      <modal v-if="showMessage" @close="showMessage = false">
        <h3 slot="header__title">Done!</h3>
        <div slot="body" class="__m_body __m__t">
          <p>You have done your task!</p>
          <p>Total time: {{ timerTime }}</p>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import SortingTable from './components/SortingTable.vue'
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    SortingTable,
    Modal
  },
  data(){
    return {
      showMessage: false,
      showModal: false,
      sortCount: 20,
      items: [],
      potatoesArr: [],
      timerTime: '00:00:00',
      timerStoppedDuration: '0',
      timerTimeBegan: null,
      timerTimeStopped: null,
      timerStarted: null,
      timerRunning: false,
    }
  },
  methods: {
    startSorting: function (){
      this.timerReset();

      if(this.sortCount >= 5 && this.sortCount <= 100){
        this.items = [];
        this.potatoesArr = [];

        while(this.potatoesArr.length < this.sortCount){
          const r = Math.floor(Math.random() * 150) + 1;
          if(this.potatoesArr.indexOf(r) === -1) this.potatoesArr.push(r);
        }

        for( let i = 0; i < this.sortCount; i++ ){
          const firstName = this.$faker().fake("{{name.firstName}}");
          const lastName = this.$faker().fake("{{name.lastName}}");
          const email = this.$faker().internet.email(firstName, lastName);
          this.items.push(
              {
                id: i,
                name: firstName + ' ' + lastName,
                potatoes: this.potatoesArr[i],
                email: email
              }
          );
        }

        this.showModal = false;

        this.countUpTimer();

      }else{
        alert('The total number of the sorting item should be within 20 and 100.');
      }
    },
    countUpTimer: function() {
      if (this.timerTimeBegan === null) {
        this.timerTimeBegan = new Date();
      }

      if (this.timerTimeStopped !== null) {
        this.timerStoppedDuration += (new Date() - this.timerTimeStopped);
      }

      this.timerStarted = setInterval(this.timerClockRunning, 10);
      this.timerRunning = true;
    },
    timerClockRunning: function (){
      var currentTime = new Date()
          , timeElapsed = new Date(currentTime - this.timerTimeBegan - this.timerStoppedDuration)
          , hour = timeElapsed.getUTCHours()
          , min = timeElapsed.getUTCMinutes()
          , sec = timeElapsed.getUTCSeconds();

      this.timerTime =
          this.timerZeroPrefix(hour, 2) + ":" +
          this.timerZeroPrefix(min, 2) + ":" +
          this.timerZeroPrefix(sec, 2);
    },
    timerZeroPrefix: function (num, digit){
      var zero = '';
      for(var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
    timerStop: function (){
      this.timerRunning = false;
      clearInterval(this.timerStarted);
      this.timerStoppedDuration = 0;
      this.timerTimeBegan = null;
      this.timerTimeStopped = null;
    },
    timerReset: function (){
      this.timerRunning = false;
      clearInterval(this.timerStarted);
      this.timerStoppedDuration = 0;
      this.timerTimeBegan = null;
      this.timerTimeStopped = null;
      this.timerTime = "00:00:00";
    },
    afterSortingDone: function(){
      this.timerStop();
      this.showMessage = true;
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .container{
    width: 1138px;
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }
  .sorting__system{
    .heading__top{
      display: flex;
      justify-content: space-between;
      max-width: 100%;
      margin: 58px auto 0;
      .s__title{
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 37px;
        display: block;
        margin-top: 5px;
        margin-bottom: 0;
      }
      .btn__sorting{
        background: #FF8D00;
        border-radius: 5px;
        text-align: center;
        display: inline-block;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        color: #FFFFFF;
        width: 161px;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        user-select: none;
      }
    }
    .time__count__up{
      padding-top: 10px;
      .time{
        align-self: center;
        color: #555555;
        font-size: 22px;
        font-family: 'Roboto', sans-serif;
      }
    }
    @media (min-width: 100px) and (max-width: 650px) {
      .heading__top{
        flex-flow: column;
        align-items: center;
        margin: 15px;
        .btn__sorting{
          margin-top: 12px;
        }
      }
      .ss__table table{
        td{
          padding-left: 5px;
          padding-right: 5px;
        }
      }
    }
  }
}
</style>

<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header__title">Header</slot>
            <span class="m__close_btn" @click="$emit('close')">
              <img alt="Close" src="../assets/close.svg">
            </span>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <div class="m__f__buttons">
              <slot name="footer">
                <button class="m__btn_cancel" @click="$emit('close')">
                  Close
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
}
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    .modal-container {
      width: 437px;
      margin: 0px auto;
      background: #FFFFFF;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      font-family: Helvetica, Arial, sans-serif;
      .modal-header{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #CCCCCC;
        padding: 20px 30px;
        h3 {
          margin: 0;
          font-family: 'Roboto', sans-serif;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 21px;
          color: #000000;
        }
      }
      .m__close_btn{
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
      .modal-body {
        padding: 20px;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 18px;
        color: #555555;
        .__m__t{
          font-size: 18px;
        }
        input.__m_input_number{
          background: #FFFFFF;
          border: 1px solid #CCCCCC;
          box-sizing: border-box;
          border-radius: 5px;
          width: 100%;
          height: 40px;
          padding-left: 15px;
          margin-bottom: 29px;
        }
      }
      .modal-default-button {
        float: right;
      }
      .modal-footer{
        border-top: 1px solid #CCCCCC;
        padding: 20px;
        display: flex;
        justify-content: flex-end;
        .m__f__buttons{
          display: flex;
          .m__btn_cancel, .m__btn_start{
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 16px;
            border: none;
            margin: 0 5px;
            cursor: pointer;
          }
          .m__btn_cancel{
            background: #EEEEEE;
            border-radius: 5px;
            width: 88px;
            height: 40px;
            color: #555555;
          }
          .m__btn_start{
            background: #FF8D00;
            border-radius: 5px;
            width: 78px;
            height: 40px;
            color: #FFFFFF;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="calculator">
    <h3 class="calculator__title">
      {{ title }}
    </h3>

    <BasePreloader v-if="formSendingInProgress" style="height: 320px" />
    <form action="#" class="calculator__form" @submit.prevent="sendForm" v-else>

      <CalculatorInput
        title="Сумма инвестиции"
        icon="$"
        :max-length="6"
        v-model="sumInvestmentCompute"
        :error="errorsData.sumInv"
      />

      <CalculatorInput
        title="Мультипликатор"
        icon="&#215;"
        :max-length="2"
        :range="true"
        :result="sumInvestment * multiplicator"
        v-model="multyplicatorCompute"
        :error="errorsData.mult"
      />

      <DropdownBlock class="calculator__dropdown" title="Ограничить прибыль и убыток">

        <CalculatorRadio
          class="calculator__item_middle-bottom-indent"
          :radio-buttons="radioButtons"
          title="Ограничения в"
        />

        <CalculatorActivatedInput
          title="Прибыль"
          :icon="restrictionsKind"
          :sum-investment="sumInvestment"
          :counter="true"
          v-model="takeProfit"
          :error="errorsData.takeProfit"
        />

        <CalculatorActivatedInput
          title="Убыток"
          :icon="restrictionsKind"
          :sum-investment="sumInvestment"
          :counter="true"
          v-model="stopLoss"
          :error="errorsData.stopLoss"
        />

      </DropdownBlock>

      <CalculatorButtons :transaction.sync="transactionDirection" />
      <transition name="fade">
        <div v-if="formSendingStatus" class="calculator__form-status">Отправлено</div>
      </transition>
    </form>
  </div>
</template>

<script>
import CalculatorRadio from '@/components/calculator/CalculatorRadio.vue';
import CalculatorInput from '@/components/calculator/CalculatorInput.vue';
import CalculatorActivatedInput from '@/components/calculator/CalculatorActivatedInput.vue';
import CalculatorButtons from '@/components/calculator/CalculatorButtons.vue';
import DropdownBlock from '@/components/common/DropdownBlock.vue';
import BasePreloader from '@/components/common/BasePreloader.vue';
import eventBus from '@/eventBus';
import { mapActions, mapMutations } from 'vuex';

export default {
  components: {
    CalculatorRadio,
    CalculatorInput,
    CalculatorActivatedInput,
    CalculatorButtons,
    BasePreloader,
    DropdownBlock,
  },
  props: {
    title: String,
  },
  data() {
    return {
      errorsData: {},
      formData: {},

      radioButtons: [
        { id: 1, name: 'format', value: '%', isChecked: false },
        { id: 2, name: 'format', value: '$', isChecked: true },
      ],

      sumInvestment: 5000,
      sumInvestmentMaxValue: 200000,

      multiplicator: 40,

      restrictionsKind: '$',

      transactionDirection: '',

      takeProfit: 0,
      stopLoss: 0,

      formSendingInProgress: false,
      formSendingStatus: false,
    };
  },
  computed: {

    sumInvestmentCompute: {
      get() {
        return this.sumInvestment;
      },
      set(value) {
        if (value >= this.sumInvestmentMaxValue) {
          this.sumInvestment = this.sumInvestmentMaxValue;
        } else {
          this.sumInvestment = value;
        }
      },
    },

    multyplicatorCompute: {
      get() {
        return this.multiplicator;
      },
      set(value) {
        this.multiplicator = value;
      },
    },

  },
  methods: {
    ...mapActions(['formSending']),
    ...mapMutations(['formSendingStatusMutation']),

    sendForm() {
      this.formData.sumInv = this.sumInvestment;
      this.formData.mult = this.multiplicator;
      this.formData.direction = this.transactionDirection;

      if (this.takeProfit) {
        if (this.restrictionsKind === '$') {
          this.formData.takeProfit = this.takeProfit;
        } else {
          this.formData.takeProfit = (this.formData.sumInv / 100) * this.takeProfit;
        }
      }

      if (this.stopLoss) {
        if (this.restrictionsKind === '$') {
          this.formData.stopLoss = this.stopLoss;
        } else {
          this.formData.stopLoss = (this.formData.sumInv / 100) * this.stopLoss;
        }
      }

      this.formSending({
        data: this.formData,
        restrictions: this.restrictionsKind,
      });
    },
  },
  watch: {
    sumInvestment() {
      this.errorsData = {};
    },
    multiplicator() {
      this.errorsData = {};
    },
    takeProfit() {
      this.errorsData = {};
    },
    stopLoss() {
      this.errorsData = {};
    },
    '$store.state.errorsData': {
      handler() {
        this.errorsData = this.$store.state.errorsData;
      },
    },
    '$store.state.formSendingInProgress': {
      handler() {
        this.formSendingInProgress = this.$store.state.formSendingInProgress;
      },
    },
    '$store.state.formSendingStatus': {
      handler() {
        this.formSendingStatus = this.$store.state.formSendingStatus;
        setTimeout(() => {
          this.formSendingStatus = false;
          this.formSendingStatusMutation(false);
        }, 1000);
      },
    },
  },
  created() {
    eventBus.$on('change', (value) => { this.restrictionsKind = value; });
  },
};
</script>

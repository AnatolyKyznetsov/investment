import Vue from 'vue';
import Vuex from 'vuex';
import errors from '@/data/errors';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errorsData: {},
    formData: {},
    formSendingInProgress: false,
    formSendingStatus: false,
  },
  mutations: {
    errorsDataMutation(state, error) {
      state.errorsData = error;
    },
    formDataMutation(state, data) {
      state.formData = data;
    },
    formSendingInProgressMutation(state, value) {
      state.formSendingInProgress = value;
    },
    formSendingStatusMutation(state, value) {
      state.formSendingStatus = value;
    },
  },
  actions: {
    formValidation(context, { data, restrictions }) {
      const errorsData = {};
      const restrictionsKind = restrictions === '$' ? 'dollars' : 'persent';

      if (data.sumInv < 100) {
        errorsData.sumInv = errors.sumInv;
        context.commit('errorsDataMutation', errorsData);

        return false;
      }

      if (data.mult > 40 || data.mult < 1) {
        errorsData.mult = errors.mult;
        context.commit('errorsDataMutation', errorsData);

        return false;
      }

      if (data.takeProfit < data.sumInv * 0.1) {
        errorsData.takeProfit = errors.less[restrictionsKind] + (data.sumInv * 0.1);
        context.commit('errorsDataMutation', errorsData);

        return false;
      }

      if (data.stopLoss < data.sumInv * 0.1) {
        errorsData.stopLoss = errors.less[restrictionsKind] + (data.sumInv * 0.1);
        context.commit('errorsDataMutation', errorsData);

        return false;
      }

      if (data.stopLoss > data.sumInv) {
        errorsData.stopLoss = errors.more[restrictionsKind] + data.sumInv;
        context.commit('errorsDataMutation', errorsData);

        return false;
      }

      return true;
    },
    formSending(context, { data, restrictions }) {
      context.dispatch('formValidation', { data, restrictions })
        .then((response) => {
          if (!response) {
            return;
          }
          context.commit('formSendingInProgressMutation', true);

          // fetch('URL', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json;charset=UTF-8',
          //   },
          //   body: JSON.stringify(data),
          // })
          //   .then((response) => response.json())
          //   .then((r) => {
          //      context.commit('formSendingInProgressMutation', false);
          //      console.log(r)
          //    });

          setTimeout(() => {
            context.commit('formSendingInProgressMutation', false);
            context.commit('formSendingStatusMutation', true);
            console.log(data);
            console.log('sending');
          }, 1000);
        });
    },
  },
});

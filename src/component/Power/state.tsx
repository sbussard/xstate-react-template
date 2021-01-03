import { Machine } from 'xstate';
import makeStateHook from 'src/utility/makeStateHook';

const machine = Machine({
  id: 'authentication',
  initial: 'POWERED_OFF',
  states: {
    POWERED_OFF: {
      on: { turnOn: 'POWERED_ON' },
    },
    POWERED_ON: {
      on: { turnOff: 'POWERED_OFF' },
    },
  },
});

export default makeStateHook(
  machine,
  ({ state }: any) => ({
    isOn: state.matches('POWERED_ON'),
  }),
  () => ({
    fries: 4,
  })
);

import { Machine } from 'xstate';
import makeStateHook from 'src/utility/makeStateHook';

const machine = Machine({
  id: 'Power',
  initial: 'OFF',
  states: {
    OFF: {
      on: { turnOn: 'ON' },
    },
    ON: {
      on: { turnOff: 'OFF' },
    },
  },
});

export default makeStateHook(machine, ({ state, instance, App }: any) => ({
  isOn: state.matches('ON'),
  logInstance: () => console.log(instance),
  signOut: App.Authentication.signOut,
}));

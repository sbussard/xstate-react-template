import { Machine } from 'xstate';
import { makeStateHook, connectView } from 'src/utility/xStateBinding';
import View from './view';

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

export default connectView(
  View,
  makeStateHook(machine, ({ state, instance, App }: any) => ({
    isOn: state.matches('ON'),
    logInstance: () => console.log(instance),
    signOut: App.Authentication.signOut,
  }))
);

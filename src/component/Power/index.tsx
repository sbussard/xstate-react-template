import { EventObject, MachineConfig } from 'xstate';
import bind from 'src/utility/xStateBinding';
import View from './view';

interface IContext {}

interface ISchema {
  states: {
    OFF: {};
    ON: {};
  };
}

interface IEvent extends EventObject {
  data: any;
  type: 'turnOn' | 'turnOff';
}

const configuration: MachineConfig<IContext, ISchema, IEvent> = {
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
};

export default bind(configuration, View, ({ state, instance, App }: any) => ({
  isOn: state.matches('ON'),
  logInstance: () => console.log(instance),
  signOut: App.Authentication.signOut,
}));

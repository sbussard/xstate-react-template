import { EventObject, MachineConfig } from 'xstate';
import bind from 'src/utility/xStateBinding';
import View from './view';

interface IContext {
  username: string;
}

interface ISchema {
  states: {
    INITIAL: {};
    AUTHENTICATED: {};
  };
}

interface IEvent extends EventObject {
  data: any;
  type: 'signIn' | 'signOut';
}

const configuration: MachineConfig<IContext, ISchema, IEvent> = {
  id: 'Authentication',
  initial: 'INITIAL',
  context: {
    username: '',
  },
  states: {
    INITIAL: {
      on: { signIn: 'AUTHENTICATED' },
    },
    AUTHENTICATED: {
      on: { signOut: 'INITIAL' },
    },
  },
};

export default bind(configuration, View, ({ state, instance }: any) => ({
  isAuthenticated: state.matches('AUTHENTICATED'),
  logInstance: () => console.log(instance),
}));

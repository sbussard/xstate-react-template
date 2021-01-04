import { Machine } from 'xstate';
import { makeStateHook, connectView } from 'src/utility/xStateBinding';
import View from './view';

const machine = Machine({
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
});

export default connectView(
  View,
  makeStateHook(machine, ({ state, instance }: any) => ({
    isAuthenticated: state.matches('AUTHENTICATED'),
    logInstance: () => console.log(instance),
  }))
);

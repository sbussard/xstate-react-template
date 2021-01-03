import { Machine } from 'xstate';
import makeStateHook from 'src/utility/makeStateHook';

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

export default makeStateHook(machine, ({ state, instance }: any) => ({
  isAuthenticated: state.matches('AUTHENTICATED'),
  logInstance: () => console.log(instance),
}));

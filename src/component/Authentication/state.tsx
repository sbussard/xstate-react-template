import { Machine } from 'xstate';
import makeStateHook from 'src/utility/makeStateHook';

const machine = Machine({
  id: 'authentication',
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

export default makeStateHook(
  machine,
  ({ state }: any) => ({
    isAuthenticated: state.matches('AUTHENTICATED'),
  }),
  ({ state }) => ({
    username: state.context.username,
  })
);

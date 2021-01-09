import { Machine } from 'xstate';
import bind from 'src/utility/xStateBinding';
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

export default bind(machine, View, ({ state, instance }: any) => ({
  isAuthenticated: state.matches('AUTHENTICATED'),
  logInstance: () => console.log(instance),
}));

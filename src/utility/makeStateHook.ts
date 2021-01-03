import { useMachine } from '@xstate/react';

const getMethods = ([state, send]: any) => {
  const methods: any = {};
  for (let type of state.nextEvents) {
    methods[type] = (data: any) => send({ type, data });
  }
  return methods;
};

export default (
  machine: any,
  extension = (_: any) => ({}),
  globalExtension = (_: any) => ({})
) => (parent = { global: {} }) => {
  const [state, send] = useMachine(machine);
  const methods = getMethods([state, send]);
  const instance: any = { parent, methods, state, global: parent.global };
  instance.instance = instance;
  instance.global = { ...parent.global, ...globalExtension(instance) };
  const result = Object.assign({}, instance, extension(instance));
  return result;
};

import { useMachine } from '@xstate/react';
import { EventObject, Machine } from 'xstate';

export default (machine: any, View: any, extension: any) => ({
  parent,
}: {
  parent?: any;
}) => {
  const [state, send] = useMachine(Machine(machine));
  const methods: any = {};
  for (let type of state.nextEvents) {
    methods[type] = (data: any) => send({ type, data } as EventObject);
  }

  const { id } = machine;
  const path = parent?.path.concat('.' + id) ?? `App.${id}`;
  const instance: any = {
    parent,
    methods,
    state,
    id,
    path,
    App: parent?.App ?? {},
  };
  instance.instance = instance;

  let node = instance;
  const split = path.split('.');
  while (split.length - 1) {
    let location = split.shift();
    if (!location) break;
    if (!(location in node)) node[location] = {};
    node = node[location];
  }
  node[split[0]] = { state, ...methods };

  return <View {...Object.assign(extension(instance), instance)} />;
};

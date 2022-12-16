import * as _zag_js_core from '@zag-js/core';
import { StateMachine, Machine, MachineSrc } from '@zag-js/core';
export { ContextFrom, EventFrom, StateFrom, mergeProps } from '@zag-js/core';
import * as _zag_js_types from '@zag-js/types';
import { HTMLAttributes } from 'react';

declare function useActor<TContext extends Record<string, any>, TState extends StateMachine.StateSchema, TEvent extends StateMachine.EventObject = StateMachine.AnyEventObject>(service: Machine<TContext, TState, TEvent>): readonly [StateMachine.State<TContext, TState, TEvent>, (evt: StateMachine.Event<TEvent>) => void];

declare function useService<TContext extends Record<string, any>, TState extends StateMachine.StateSchema, TEvent extends StateMachine.EventObject = StateMachine.AnyEventObject>(machine: MachineSrc<TContext, TState, TEvent>, options?: StateMachine.HookOptions<TContext, TState, TEvent>): _zag_js_core.Machine<TContext, TState, TEvent>;
declare function useMachine<TContext extends Record<string, any>, TState extends StateMachine.StateSchema, TEvent extends StateMachine.EventObject = StateMachine.AnyEventObject>(machine: MachineSrc<TContext, TState, TEvent>, options?: StateMachine.HookOptions<TContext, TState, TEvent>): readonly [StateMachine.State<TContext, TState, TEvent>, (evt: StateMachine.Event<TEvent>) => void, _zag_js_core.Machine<TContext, TState, TEvent>];

declare type PropTypes = JSX.IntrinsicElements & {
    element: HTMLAttributes<HTMLElement>;
};
declare const normalizeProps: _zag_js_types.NormalizeProps<PropTypes>;

export { normalizeProps, useActor, useMachine, useService };

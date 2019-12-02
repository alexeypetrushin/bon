import { something } from './base';
import { h, Component as PreactComponent, ComponentConstructor, render } from 'preact';
export { h, render, ComponentConstructor };
export interface Component<P = {}, S = {}> {
    component_will_mount?(): void;
    component_did_mount?(): void;
    component_will_unmount?(): void;
    component_will_receive_props?(next_props: Readonly<P>, next_context: something): void;
}
export declare abstract class Component<P = {}, S = {}> extends PreactComponent<P, S> {
    componentWillMount(): void;
    componentDidMount?(): void;
    componentWillUnmount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: something): void;
    set_state<K extends keyof S>(state: ((prev_state: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null), callback?: () => void): void;
}

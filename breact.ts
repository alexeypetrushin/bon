import { something } from './base'
import { h, Component as PreactComponent, ComponentConstructor, render } from 'preact'

export { h, render, ComponentConstructor }

export interface Component<P = {}, S = {}> {
  component_will_mount?(): void
  component_did_mount?(): void
  component_will_unmount?(): void
  component_will_receive_props?(next_props: Readonly<P>, next_context: something): void
}

export abstract class Component<P = {}, S = {}> extends PreactComponent<P, S> {
  componentWillMount() { if (this.component_will_mount) this.component_will_mount() }
  componentDidMount?() { if (this.component_did_mount) this.component_did_mount() }
  componentWillUnmount?() { if (this.component_will_unmount) this.component_will_unmount() }
  componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: something): void {
    if (this.component_will_receive_props) this.component_will_receive_props(nextProps, nextContext)
  }

  set_state<K extends keyof S>(
    state: ((prev_state: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
  ): void { this.setState(state, callback) }


  // shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
  // componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
  // componentDidUpdate?(previousProps: Readonly<P>, previousState: Readonly<S>, previousContext: any): void;
}
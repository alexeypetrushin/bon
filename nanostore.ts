import { something } from './base'
import { h, Component, ComponentConstructor } from './breact'

export type Listener = () => void

// Store --------------------------------------------------------------------------
export class Nanostore<State> {
  protected listeners: Listener[] = []
  constructor(
    protected state: State
  ){}

  get = () => this.state

  set = (state: Partial<State>) => {
    this.state = { ...this.state, ...(state as something) }
    for (const listener of this.listeners) listener()
  }

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.push(listener)
    return () => this.listeners = this.listeners.filter((l) => l != listener)
  }
}


// build_connect ------------------------------------------------------------------
export function build_connect<State>(
  get_state: () => State,
  subscribe: (listener: Listener) => (() => void)
) {
  const _get_state = get_state;
  return function connect<StateProps, OwnProps>(
    map_state_props:  StateProps | ((state: State) => StateProps),
    Element:          ComponentConstructor<StateProps & OwnProps, any>
  ): ComponentConstructor<OwnProps, {}> {
    class ConnectedWrapper extends Component<OwnProps, StateProps> {
      private unsubscribe?: () => void
      private current_state_size = 0

      constructor(props: OwnProps) {
        super(props)
        this.state = map_state_props instanceof Function ? map_state_props(get_state()) : map_state_props
        this.current_state_size = Object.keys(this.state).length
      }

      component_did_mount() {
        this.unsubscribe = subscribe(() => {
          const new_props = map_state_props instanceof Function ? map_state_props(get_state()) : map_state_props
          const current_state = this.state

          // Checking for changes
          let changed = false, newSize = 0
          for (const k in new_props) {
            if (new_props[k] !== current_state[k]) changed = true
            newSize += 1
          }
          changed = changed || (newSize != this.current_state_size)
          this.current_state_size = newSize

          if (changed) this.setState(new_props)
        })
      }

      component_will_unmount() { if (this.unsubscribe) this.unsubscribe() }

      render() {
        return h(Element, { ...this.props, ...this.state })
      }
    }
    return ConnectedWrapper
  }
}
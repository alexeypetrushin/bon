import { something } from './base'
import { h, Component, AnyComponent } from 'preact'

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


// buildConnect -------------------------------------------------------------------
export function buildConnect<State>(
  getState:  () => State,
  subscribe: (listener: Listener) => (() => void)
) {
  const _getState = getState;
  return function connect<StateProps, OwnProps>(
    mapStateProps:  StateProps | ((state: State) => StateProps),
    Element:        AnyComponent<StateProps & OwnProps, any>
  ): AnyComponent<OwnProps, {}> {
    class ConnectedWrapper extends Component<OwnProps, StateProps> {
      private unsubscribe?: () => void
      private currentStateSize = 0

      constructor(props: OwnProps) {
        super(props)
        this.state = mapStateProps instanceof Function ? mapStateProps(getState()) : mapStateProps
        this.currentStateSize = Object.keys(this.state).length
      }

      componentDidMount() {
        this.unsubscribe = subscribe(() => {
          const newProps = mapStateProps instanceof Function ? mapStateProps(getState()) : mapStateProps
          const currentState = this.state

          // Checking for changes
          let changed = false, newSize = 0
          for (const k in newProps) {
            if (newProps[k] !== currentState[k]) changed = true
            newSize += 1
          }
          changed = changed || (newSize != this.currentStateSize)
          this.currentStateSize = newSize

          if (changed) this.setState(newProps)
        })
      }

      componentWillUnmount() { if (this.unsubscribe) this.unsubscribe() }

      render() {
        const props = this.props
        return h(Element, { ...this.props, ...this.state })
      }
    }
    return ConnectedWrapper
  }
}
import { ComponentConstructor } from './breact';
export declare type Listener = () => void;
export declare class Nanostore<State> {
    protected state: State;
    protected listeners: Listener[];
    constructor(state: State);
    get: () => State;
    set: (state: Partial<State>) => void;
    subscribe: (listener: Listener) => () => void;
}
export declare function build_connect<State>(get_state: () => State, subscribe: (listener: Listener) => (() => void)): <StateProps, OwnProps>(map_state_props: StateProps | ((state: State) => StateProps), Element: ComponentConstructor<StateProps & OwnProps, any>) => ComponentConstructor<OwnProps, {}>;

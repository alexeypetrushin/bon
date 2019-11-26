import { AnyComponent } from 'preact';
export declare type Listener = () => void;
export declare class Nanostore<State> {
    protected state: State;
    protected listeners: Listener[];
    constructor(state: State);
    get: () => State;
    set: (state: Partial<State>) => void;
    subscribe: (listener: Listener) => () => void;
}
export declare function buildConnect<State>(getState: () => State, subscribe: (listener: Listener) => (() => void)): <StateProps, OwnProps>(mapStateProps: StateProps | ((state: State) => StateProps), Element: AnyComponent<StateProps & OwnProps, any>) => AnyComponent<OwnProps, {}>;

import { User, UserCredential } from 'firebase/auth';
import { NavigateActionsType, UserActionsType } from './Actions';
import { AppDispatcher, Action } from './Dispatcher';
import { auth } from '../Firebase/FirebaseConfig';

export type State = {
    currentPath: string;
    isAuthenticated: boolean;
    userAuthenticated: UserCredential | User | null;
};

type Listener = (state: State) => void;


class Store {
    private _myState: State = {
        currentPath: '',
        isAuthenticated: false,
        userAuthenticated: null
    }
    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this));
    }

    getState() {
        return this._myState;
    }

    _handleActions(action: Action): void {
        switch (action.type) {
            case NavigateActionsType.NAVIGATE:
                if (action.payload && 'path' in action.payload) {
                    this._myState = {
                        ...this._myState,
                        currentPath: action.payload.path 
                    }
                    this._emitChange();
                }
                break;
            case UserActionsType.SAVE_USER:
                this._myState = {
                    ...this._myState,
                    isAuthenticated: true,
                    userAuthenticated: action.payload as UserCredential
                }
                this._emitChange();

                break;
            case UserActionsType.CHECK_AUTH:
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        this._myState = {
                            ...this._myState,
                            isAuthenticated: true,
                            userAuthenticated: user,
                        }
                    } else {
                        this._myState = {
                            ...this._myState,
                            isAuthenticated: false,
                            userAuthenticated: null
                        }
                    }
                    this._emitChange();
                });
                break;
            case UserActionsType.LOGOUT:
                auth.signOut().then(() => {
                    this._myState = {
                        currentPath: '/',
                        isAuthenticated: false,
                        userAuthenticated: null
                    }
                    this._emitChange();
                }).catch((error) => {
                    console.error('Error al cerrar sesión:', error);
                });
                break;
        }

    }

    private _emitChange(): void {
        const state = this.getState();
        for (const listener of this._listeners) {
            listener(state);
        }
    }

    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this.getState()); 
    }

    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }


}

export const store = new Store();
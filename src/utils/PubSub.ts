import { isNumber } from "lodash-es";

export class PubSub {
  static _instance: PubSub;
  private constructor() {}
  private _event: Map<string, Function[]> = new Map();

  static getInstance() {
    if (!PubSub._instance) {
      PubSub._instance = new PubSub();
    }

    return PubSub._instance;
  }

  subscribe(name: string, listener: Function) {
    let regListeners = this._event.get(name);
    if (!regListeners) {
      const listeners: Function[] = [];
      this._event.set(name, listeners);
      regListeners = this._event.get(name);
    }

    regListeners?.push(listener);

    return () => {
      const listenerIndex = regListeners?.findIndex((l) => l === listener);
      if (isNumber(listenerIndex)) {
        regListeners?.splice(listenerIndex, 1);
      }
    };
  }

  publish(name: string, data: any) {
    const regListeners = this._event.get(name) || [];

    for (let i = 0; i < regListeners.length; i++) {
      const listener = regListeners[i];
      listener?.(data);
    }
  }
}

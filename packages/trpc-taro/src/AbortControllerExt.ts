import { EventEmitter } from "events";

export class AbortSignalExt {
  public eventEmitter: EventEmitter;
  onabort: any;
  aborted: any;
  reason?: any;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.onabort = null;
    this.aborted = false;
    this.reason = undefined;
  }
  toString() {
    return "[object AbortSignal]";
  }
  get [Symbol.toStringTag]() {
    return "AbortSignal";
  }
  removeEventListener(name: any, handler: any) {
    this.eventEmitter.removeListener(name, handler);
  }
  addEventListener(name: any, handler: any) {
    this.eventEmitter.on(name, handler);
  }
  dispatchEvent(type: any) {
    const event = { type, target: this };
    const handlerName = `on${type}`;

    if (typeof this[handlerName] === "function") this[handlerName](event);

    this.eventEmitter.emit(type, event);
  }
  throwIfAborted() {
    if (this.aborted) {
      throw this.reason;
    }
  }
  static abort(reason?: any) {
    const controller = new AbortControllerExt();
    controller.abort();
    return controller.signal;
  }
  static timeout(time: number) {
    const controller = new AbortControllerExt();
    setTimeout(() => controller.abort(new Error("TimeoutError")), time);
    return controller.signal;
  }
}

export class AbortControllerExt {
  public signal: AbortSignalExt;

  constructor() {
    this.signal = new AbortSignalExt();
  }

  abort(reason?: any) {
    if (this.signal.aborted) return;

    this.signal.aborted = true;

    if (reason) this.signal.reason = reason;
    else this.signal.reason = new Error("AbortError");

    this.signal.dispatchEvent("abort");
  }
  toString() {
    return "[object AbortController]";
  }
  get [Symbol.toStringTag]() {
    return "AbortController";
  }
}

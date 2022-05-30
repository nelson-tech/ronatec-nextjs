interface Navigator
  extends Object,
    NavigatorID,
    NavigatorOnLine,
    NavigatorContentUtils,
    NavigatorStorageUtils,
    NavigatorGeolocation,
    MSNavigatorDoNotTrack,
    MSFileSaver,
    NavigatorUserMedia {
  readonly appCodeName: string
  readonly cookieEnabled: boolean
  readonly language: string
  readonly maxTouchPoints: number
  readonly mimeTypes: MimeTypeArray
  readonly msManipulationViewsEnabled: boolean
  readonly msMaxTouchPoints: number
  readonly msPointerEnabled: boolean
  readonly plugins: PluginArray
  readonly pointerEnabled: boolean
  readonly webdriver: boolean
  getGamepads(): Gamepad[]
  javaEnabled(): boolean
  msLaunchUri(
    uri: string,
    successCallback?: MSLaunchUriCallback,
    noHandlerCallback?: MSLaunchUriCallback,
  ): void
  requestMediaKeySystemAccess(
    keySystem: string,
    supportedConfigurations: MediaKeySystemConfiguration[],
  ): PromiseLike<MediaKeySystemAccess>
  vibrate(pattern: number | number[]): boolean
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    useCapture?: boolean,
  ): void
}

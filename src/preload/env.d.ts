export interface ICMSBridge {
  platform: string
}

declare global {
  interface Window {
    icms: ICMSBridge
  }
}

export {}

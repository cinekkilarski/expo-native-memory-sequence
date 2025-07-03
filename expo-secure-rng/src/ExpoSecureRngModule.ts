import { NativeModule, requireNativeModule } from "expo";

import { ExpoSecureRngModuleEvents } from "./ExpoSecureRng.types";

declare class ExpoSecureRngModule extends NativeModule<ExpoSecureRngModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSecureRngModule>("ExpoSecureRng");

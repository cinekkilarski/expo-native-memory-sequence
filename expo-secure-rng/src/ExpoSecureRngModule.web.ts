import { registerWebModule, NativeModule } from "expo";

import { ExpoSecureRngModuleEvents } from "./ExpoSecureRng.types";

class ExpoSecureRngModule extends NativeModule<ExpoSecureRngModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit("onChange", { value });
  }
  hello() {
    return "Hello world! 👋";
  }
}

export default registerWebModule(ExpoSecureRngModule, "ExpoSecureRngModule");

import { requireNativeView } from "expo";
import * as React from "react";

import { ExpoSecureRngViewProps } from "./ExpoSecureRng.types";

const NativeView: React.ComponentType<ExpoSecureRngViewProps> =
  requireNativeView("ExpoSecureRng");

export default function ExpoSecureRngView(props: ExpoSecureRngViewProps) {
  return <NativeView {...props} />;
}

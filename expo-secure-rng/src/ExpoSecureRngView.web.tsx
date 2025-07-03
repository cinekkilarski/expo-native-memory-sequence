import * as React from "react";

import { ExpoSecureRngViewProps } from "./ExpoSecureRng.types";

export default function ExpoSecureRngView(props: ExpoSecureRngViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}

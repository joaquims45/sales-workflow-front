import type { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { styles } from "./styles";

export function SplitPane({
  left,
  right,
  defaultRightSize = 38,
}: {
  left: ReactNode;
  right: ReactNode;
  defaultRightSize?: number;
}) {
  return (
    <PanelGroup direction="horizontal" style={styles.group}>
      <Panel defaultSize={100 - defaultRightSize} minSize={40}>
        <div style={styles.pane}>{left}</div>
      </Panel>
      <PanelResizeHandle style={styles.handle} />
      <Panel defaultSize={defaultRightSize} minSize={24} collapsible collapsedSize={0}>
        <div style={styles.pane}>{right}</div>
      </Panel>
    </PanelGroup>
  );
}

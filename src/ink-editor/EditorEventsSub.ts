import { PubSub } from "@/utils/PubSub";
import type { IEditorProps } from "./types";

const noOp = () => {};

export const _EDITOR_EVENTS_ = {
  update: "editor/update",
  change: "editor/change",
};

export class EditorEventsSub {
  static update(listener: IEditorProps["onUpdate"]) {
    if (listener) {
      return PubSub.getInstance().subscribe(_EDITOR_EVENTS_.update, listener);
    }
    return noOp;
  }

  static change(listener: IEditorProps["onChange"]) {
    if (listener) {
      return PubSub.getInstance().subscribe(_EDITOR_EVENTS_.change, listener);
    }
    return noOp;
  }
}

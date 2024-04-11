import { EditorOptions } from "@tiptap/react";

export interface IEditorProps
  extends Partial<
    Pick<
      EditorOptions,
      | "extensions"
      | "autofocus"
      | "onBeforeCreate"
      | "onCreate"
      | "onUpdate"
      | "onSelectionUpdate"
      | "onFocus"
      | "onBlur"
      | "onDestroy"
    >
  > {
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  onChange?: EditorOptions["onUpdate"];
}

export const dummy = "";

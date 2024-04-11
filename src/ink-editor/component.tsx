"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import type { IEditorProps } from "./types";
import { PubSub } from "@/utils/PubSub";
import { _EDITOR_EVENTS_ } from "./EditorEventsSub";

function Editor(props: IEditorProps) {
  const {
    extensions = [],
    className = "ink-editor",
    wrapperClassName = "ink-editor-wrapper",
    onBeforeCreate,
    onCreate,
    onKeyDown,
    onKeyPress,
    onBlur,
    onUpdate,
    onDestroy,
    onFocus,
    onSelectionUpdate,
    onChange,
    placeholder = "",
  } = props;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      ...extensions,
    ],
    editorProps: {
      handleKeyDown(v, ev) {
        onKeyDown?.(ev);
      },
      handleKeyPress(v, ev) {
        onKeyPress?.(ev);
      },
      attributes: {
        class: className,
      },
    },
    onBeforeCreate(props) {
      onBeforeCreate?.(props);
    },
    onCreate(props) {
      onCreate?.(props);
    },
    onUpdate(props) {
      onUpdate?.(props);
      PubSub.getInstance().publish(_EDITOR_EVENTS_.update, props);
      if (props.transaction.docChanged) {
        onChange?.(props);
        PubSub.getInstance().publish(_EDITOR_EVENTS_.change, props);
      }
    },
    onBlur(props) {
      onBlur?.(props);
    },
    onFocus(props) {
      onFocus?.(props);
    },
    onDestroy(props) {
      onDestroy?.(props);
    },
    onSelectionUpdate(props) {
      onSelectionUpdate?.(props);
    },
  });

  return <EditorContent editor={editor} className={wrapperClassName} />;
}

export default Editor;

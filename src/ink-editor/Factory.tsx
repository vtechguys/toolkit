import { getWordCount } from "@/utils/statistics";
import type { Editor } from "@tiptap/core";

export class InkEditor {
  static _instance: InkEditor;
  private __editor: Editor | null = null;
  private constructor() {}

  static getInstance() {
    if (!InkEditor._instance) {
      InkEditor._instance = new InkEditor();
    }

    return InkEditor._instance;
  }

  $initEditor(editor: Editor) {
    this.__editor = editor;
  }

  $destroyEditor() {
    this.__editor = null;
  }

  private getEditor() {
    const valid = Boolean(this.__editor);
    if (!valid) {
      throw new Error("Editor Error: The instance may be deleted.");
    }

    return this.__editor as Editor;
  }

  docSize() {
    let position = 0;
    const editor = this.getEditor();

    position = editor.state.doc.content.size;
    return position;
  }

  private _getText(blockSeparator?: string) {
    let text = "";
    const editor = this.getEditor();
    text = editor.state.doc.textBetween(0, this.docSize(), blockSeparator, " ");
    return text;
  }

  getEditorText() {
    return this._getText("\n");
  }

  getWordAndCharCount() {
    const charCountText = this._getText();
    const wordCountText = this.getEditorText();

    return {
      word: getWordCount(wordCountText),
      char: charCountText.length,
    };
  }
}

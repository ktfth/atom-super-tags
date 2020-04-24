'use babel';

import { CompositeDisposable } from 'atom';

import { highLevelExpansion } from 'super-tags';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-super-tags:expand': () => this.expand()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },

  expand() {
    console.log('Expand tags');
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      editor.selectToFirstCharacterOfLine();
      const indentation = editor.getTabText();
      const selection = editor.getSelectedText();
      let expansion = highLevelExpansion(selection, '', indentation);
      editor.insertText(expansion);
    }
  }

};

'use babel';

import { CompositeDisposable } from 'atom';

import { highLevelExpansion } from 'super-tags';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'super-tags:expand': () => this.expand()
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
      const selection = editor.getSelectedText();
      editor.insertText(highLevelExpansion(selection));
    }
  }

};

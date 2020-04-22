'use babel';

import { CompositeDisposable } from 'atom';

import { highLevelExpansion, tabsToSpace } from 'super-tags';

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
      const indentation = editor.getTabText();
      editor.selectToBeginningOfLine();
      const selection = editor.getSelectedText().trim();
      let expansion = highLevelExpansion(selection, indentation);
      if (selection !== 'html:5') {
        let indent = tabsToSpace(indentation)
        expansion = indent + 
                    expansion
                      .split('\n')
                      .join('\n' + indentation);
      }
      editor.insertText(expansion);
    }
  }

};

import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import './code-editor.css';
import './syntax.css';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const options = {
  wordWrap: 'on',
  minimap: { enabled: false },
  showUnused: false,
  folding: false,
  lineNumbersMinChars: 3,
  fontSize: 16,
  scrollBeyondLastLine: false,
  automaticLayout: true,
};

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    //@ts-ignore
    monacoEditor.getModel().updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    const unformated = editorRef.current.getModel().getValue();
    const formated = prettier
      .format(unformated, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    editorRef.current.setValue(formated);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}>
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height='100%'
        language='javascript'
        theme='dark'
        //@ts-ignore
        options={options}
      />
    </div>
  );
};

export default CodeEditor;

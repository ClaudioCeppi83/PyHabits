"use client";

import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-dark.css"; // Using dark theme for code by default

// Basic style for the editor container
// Basic style for the editor container not used but kept for reference if needed
// const styles = ... removed 

interface CodeEditorProps {
    initialCode: string;
    onChange: (code: string) => void;
}

export function CodeEditor({ initialCode, onChange }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  const handleChange = (newCode: string) => {
    setCode(newCode);
    onChange(newCode);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden relative">
      <Editor
        value={code}
        onValueChange={handleChange}
        highlight={(code) => highlight(code, languages.python, "python")}
        padding={20}
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 16,
          backgroundColor: "var(--background)", 
          color: "var(--foreground)",
          minHeight: "400px"
        }}
        className="min-h-[400px]"
        textareaClassName="focus:outline-none"
      />
    </div>
  );
}

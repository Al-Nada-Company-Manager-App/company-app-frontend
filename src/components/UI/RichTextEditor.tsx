import React, { useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

// Register font sizes
const Size = Quill.import("attributors/style/size") as any;
Size.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
];
Quill.register(Size, true);

interface RichTextEditorProps {
  value?: string;
  onChange?: (val: string) => void;
  height?: number;
  isDark?: boolean;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  height = 150,
  isDark = false,
  placeholder = "Enter description...",
}) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        [{ size: Size.whitelist }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <div
      className="rich-text-editor-wrapper"
      style={{
        background: isDark ? "#1e1e1e" : "#fff",
        borderRadius: 6,
        border: `1px solid ${isDark ? "#434343" : "#d9d9d9"}`,
        overflow: "hidden",
      }}
    >
      <style>{`
        .rich-text-editor-wrapper .ql-toolbar {
          border: none;
          border-bottom: 1px solid ${isDark ? "#434343" : "#d9d9d9"};
          background: ${isDark ? "#2a2a2a" : "#fafafa"};
          flex-wrap: wrap;
          padding: 6px 8px;
        }
        .rich-text-editor-wrapper .ql-container {
          border: none;
          font-size: 14px;
        }
        .rich-text-editor-wrapper .ql-editor {
          min-height: ${height}px;
          color: ${isDark ? "#e0e0e0" : "#333"};
          background: ${isDark ? "#1e1e1e" : "#fff"};
        }
        .rich-text-editor-wrapper .ql-editor.ql-blank::before {
          color: ${isDark ? "#666" : "#bbb"};
          font-style: italic;
        }
        .rich-text-editor-wrapper .ql-snow .ql-stroke {
          stroke: ${isDark ? "#ccc" : "#444"};
        }
        .rich-text-editor-wrapper .ql-snow .ql-fill {
          fill: ${isDark ? "#ccc" : "#444"};
        }
        .rich-text-editor-wrapper .ql-snow .ql-picker {
          color: ${isDark ? "#ccc" : "#444"};
        }
        .rich-text-editor-wrapper .ql-snow .ql-picker-options {
          background: ${isDark ? "#2a2a2a" : "#fff"};
          border-color: ${isDark ? "#434343" : "#d9d9d9"};
          color: ${isDark ? "#e0e0e0" : "#333"};
        }
        .rich-text-editor-wrapper .ql-snow button:hover .ql-stroke,
        .rich-text-editor-wrapper .ql-snow .ql-active .ql-stroke {
          stroke: #1677ff;
        }
        .rich-text-editor-wrapper .ql-snow button:hover .ql-fill,
        .rich-text-editor-wrapper .ql-snow .ql-active .ql-fill {
          fill: #1677ff;
        }
        .rich-text-editor-wrapper .ql-snow .ql-picker-label:hover,
        .rich-text-editor-wrapper .ql-snow .ql-picker-label.ql-active {
          color: #1677ff;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={(val: string) => {
          if (onChange) {
            const sanitized = DOMPurify.sanitize(val, {
              ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'span', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'],
              ALLOWED_ATTR: ['href', 'target', 'style', 'class']
            });
            onChange(sanitized);
          }
        }}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ fontFamily: "inherit" }}
      />
    </div>
  );
};

export default RichTextEditor;

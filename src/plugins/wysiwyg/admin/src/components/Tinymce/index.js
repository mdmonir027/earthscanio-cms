import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import React, { useRef } from "react";
const TinyEditor = ({ onChange, name, value, disabled }) => {
  const onChangeRef = useRef(onChange);
  function onBlur(ev, editor) {
    const content = editor.getContent();
    onChangeRef.current({ target: { name, value: content, type: "wysiwyg" } });
  }
  return (
    <>
      <Editor
        apiKey={process.env.STRAPI_ADMIN_TINY_API}
        value={value}
        tagName={name}
        onEditorChange={(editorContent) => {
          onChange({ target: { name, value: editorContent } });
        }}
        outputFormat="html"
        init={{
          selector: "textarea",
          plugins:
            "advlist autolink lists link image charmap preview anchor \
                  searchreplace visualblocks code fullscreen table emoticons nonbreaking \
                  insertdatetime table code help wordcount",
          toolbar:
            "undo redo | styles | bold italic forecolor backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  table emoticons visualblocks code|\
                  nonbreaking bullist numlist outdent indent | removeformat",
          menubar: true,
        }}
      />
    </>
  );
};
TinyEditor.defaultProps = {
  value: "",
};
TinyEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
export default TinyEditor;

module.exports = () => ({
  wysiwyg: {
    enabled: true,
    resolve: "./src/plugins/wysiwyg",
  },
  tinymce: {
    enabled: false,
    config: {
      editor: {
        outputFormat: "html",
        editorConfig: {
          menubar: true,
          plugins:
            "advlist autolink lists link image charmap preview anchor \
                    searchreplace visualblocks code fullscreen table emoticons nonbreaking \
                    insertdatetime table code help wordcount",
          toolbar:
            "undo redo | styles | bold italic forecolor backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    table emoticons visualblocks code|\
                    nonbreaking bullist numlist outdent indent | removeformat",
        },
      },
    },
  },
});

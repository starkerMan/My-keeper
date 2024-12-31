export const blockStyleFn = (block) => {
  switch (block.getType()) {
    case "header-one":
      return "draft-editor-h1";
    case "header-two":
      return "draft-editor-h2";
    case "unordered-list-item":
      return "draft-editor-unordered-list-item";
    case "blockquote":
      return "draft-editor-blockquote";
    default:
      return null;
  }
};

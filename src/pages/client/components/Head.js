const Head = {
  async render(){
    return `
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Asbab – Furniture HTML Template</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <!-- Place favicon.ico in the root directory -->
      <link rel="shortcut icon" type="image/x-icon" href="./lib/images/favicon.ico">
      <link rel="apple-touch-icon" href="apple-touch-icon.png">


      <!-- All ./lib/css files are included here. -->
      <!-- Bootstrap fremwork main ./lib/css -->
      <link rel="stylesheet" href="./lib/css/bootstrap.min.css">
      <!-- Owl Carousel min ./lib/css -->
      <link rel="stylesheet" href="./lib/css/owl.carousel.min.css">
      <link rel="stylesheet" href="./lib/css/owl.theme.default.min.css">
      <!-- This core.css file contents all plugings ./lib/css file. -->
      <link rel="stylesheet" href="./lib/css/core.css">
      <!-- Theme shortcodes/elements style -->
      <link rel="stylesheet" href="./lib/css/shortcode/shortcodes.css">
      <!-- Theme main style -->
      <link rel="stylesheet" href="./lib/style.css">
      <!-- Responsive ./lib/css -->
      <link rel="stylesheet" href="./lib/css/responsive.css">
      <!-- User style -->
      <link rel="stylesheet" href="./lib/css/custom.css">


      <!-- Modernizr ./lib/js -->
      <script src="./lib/js/vendor/modernizr-3.5.0.min.js"></script>
    </head>
    `;
  }
}
export default Head;
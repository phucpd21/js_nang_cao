const JsFile = {
  async render(){
    return `
      <!-- jquery latest version -->
      <script src="./lib/js/vendor/jquery-3.2.1.min.js"></script>
      <!-- Popper ./lib/js -->
      <script src="./lib/js/popper.min.js"></script>
      <!-- Bootstrap framework ./lib/js -->
      <script src="./lib/js/bootstrap.min.js"></script>
      <!-- All ./lib/js plugins included in this file. -->
      <script src="./lib/js/plugins.js"></script>
      <script src="./lib/js/slick.min.js"></script>
      <script src="./lib/js/owl.carousel.min.js"></script>
      <!-- Waypoints.min.js. -->
      <script src="./lib/js/waypoints.min.js"></script>
      <!-- Main ./lib/js file that contents all jQuery plugins activation. -->
      <script src="./lib/js/main1.js"></script>
      <!-- Modernizr ./lib/js -->
      <script src="./lib/js/vendor/modernizr-3.5.0.min.js"></script>
    `;
  }
}
export default JsFile;
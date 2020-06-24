<script>
import helpers from "@/plugins/helpers.js";

export default {
  mounted() {
    if (helpers.getCookie("Authorization")) {
      helpers.deleteCookie("Authorization");
      window.location.href = "/login";
    }
  }
};
</script>

<script>
export default {
  mounted() {
    if (localStorage.getItem("authorization")) {
      localStorage.removeItem("authorization");
      window.location.href = "/login";
    }
  }
};
</script>

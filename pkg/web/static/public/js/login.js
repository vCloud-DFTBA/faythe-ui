var vue = new Vue({
    el: "#login",
    data: {
        alert: {
            message: ""
        },
        login: {
            username: "",
            password: ""
        },
        good: "",
    },
    methods: {
        onSubmit: function (event) {
            event.preventDefault();
            axios({
                method: "post",
                url: "/public/auth",
                data: {
                    username: this.login.username,
                    password: hex_md5(this.login.password)
                },
            })
                .then(function (response) {
                    window.location.href = "/home"
                })
                .catch(function (error) {
                    this.alert.message = error.response.status
                })
        }
    }
});

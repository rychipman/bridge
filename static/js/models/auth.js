
(function() {

    Auth = {

        isAuthenticated: function() {
            return false;
        },

        login: function() {
            m.request({
                url: 'http://localhost:8080/api/auth/login',
                method: 'POST',
            }).then(function(res) {
                m.route.set('/');
            });
        },

    }

})()


window.onload = function() {

    m.route(document.body, '/', {
        '/': {
            render: function() {
                return m(Layout,
                    m('h1', 'This is the home page')
                );
            },
        },
        '/sets/mine': {
            render: function() {
                return m(Layout, m(Grid));
            },
        },
    });

}

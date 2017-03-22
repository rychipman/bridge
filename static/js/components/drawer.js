
(function() {

    Drawer = {
        links: [
            ['home', 'Home'],
            ['inbox', 'Inbox'],
            ['delete', 'Trash'],
            ['refresh', 'Refresh',
                function() {
                    console.log('click');
                    m.request({
                        url: 'http://localhost:8080/api',
                        method: 'GET',
                    }).then(function(res) {
                        console.log(res);
                        vnode.state.sets = res;
                    });
                },
            ],
        ],

        view: function(vnode) {

            var drawerClasses = classNames(
                'drawer',
                'mdl-layout__drawer',
                'mdl-color--blue-grey-900', 'mdl-color-text--blue-grey-50',
            );
            var navClasses = classNames(
                'drawer-nav',
                'mdl-navigation',
                'mdl-color--blue-grey-800',
            );
            var linkClasses = classNames(
                'drawer-nav-link',
                'mdl-navigation__link',
            );
            var iconClasses = classNames(
                'drawer-nav-icon',
                'material-icons',
            );

            return m('div', {class: drawerClasses}, [
                m('header.drawer-header', [
                    m('span.mdl-layout-title', 'Bridge Bidding'),
                ]),
                m('nav', {class: navClasses},
                    vnode.state.links.map(function(row) {
                        return m('a', { class: linkClasses, onclick: row[2] },
                            m('i', {class: iconClasses}, row[0]),
                            row[1],
                        );
                    }),
                    m('.mdl-layout-spacer'),
                    m('a', { class: linkClasses },
                        m('i', {class: iconClasses}, 'info'),
                        'Info',
                    ),
                ),
            ]);

        },
    };

})()

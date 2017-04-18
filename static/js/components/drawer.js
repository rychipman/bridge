
(function() {

    Drawer = {
        links: [
            ['home', 'Home', '#!/'],
            ['list', 'My Sets', '#!/sets/mine'],
            ['play_arrow', 'Bid My Sets', '#!/sets/mine/active'],
            ['schedule', 'Sets in Flight', '#!/sets/mine/waiting'],
            ['refresh', 'Refresh', '',
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
                    m('span.mdl-layout-title', 'rchipman'),
                    m('.user-dropdown',
                        m('span', 'username@example.com'),
                        m('span.mdl-layout-spacer'),
                        m('button#accbtn.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--icon',
                            m('i.material-icons', 'arrow_drop_down'),
                            m('span.visuallyhidden', 'Dropdown content')
                        ),
                        m('ul.mdl-menu.mdl-menu--bottom-right.mdl-js-menu[for=accbtn]',
                            m('li.mdl-menu__item', 'me@example.com'),
                            m('li.mdl-menu__item', 'someone_else@example.com'),
                            m('li.mdl-menu__item',
                                m('i.material-icons', 'add'),
                                'Add another account...',
                            ),
                        ),
                    ),
                ]),
                m('nav', {class: navClasses},
                    vnode.state.links.map(function(row) {
                        return m('a',
                            {
                                class: linkClasses,
                                href: row[2],
                                onclick: row[3],
                            },
                            m('i', {class: iconClasses}, row[0]),
                            row[1],
                        );
                    }),
                    m('.mdl-layout-spacer'),
                    m('a', { class: linkClasses },
                        m('i', {class: iconClasses}, 'help'),
                        'Help',
                    ),
                ),
            ]);

        },
    };

})()

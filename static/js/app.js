
window.onload = function() {

    var SetCard = {
        view: function(vnode) {
            set = vnode.attrs.set;
            cardClasses = classNames(
                'set-tile', 'animate',
                'mdl-card',
                'mdl-cell', 'mdl-cell--4-col',
                'mdl-color--white', 'mdl-color-text--grey-600',
                'mdl-shadow--4dp',
                {'disabled': set.disabled},
            );
            return m('div', {
                key: set.id,
                class: cardClasses,
            }, [
                m('h2.mdl-card__title.mdl-card--expand.mdl-color-text--grey-700',
                    set.name + set.id
                ),
                m('.mdl-card__actions', [
                    m('.mdl-button.mdl-button--icon',
                        m('i.material-icons', 'share')
                    ),
                    m('.mdl-button.mdl-button--icon',
                        m('i.material-icons', 'delete')
                    ),
                ]),
            ]);
        }
    }

    var NewSetCard = {
        view: function(vnode) {
            cardClasses = classNames(
                'set-tile', 'animate',
                'mdl-card',
                'mdl-cell', 'mdl-cell--4-col',
                'mdl-color--teal', 'mdl-color-text--white',
                'mdl-shadow--4dp',
            );
            return m('div', {
                class: cardClasses,
            }, [
                m('h2.mdl-card__title.mdl-card--expand.mdl-color-text--grey-700',
                    'Add New Set',
                ),
                m('.mdl-card__actions', [
                    m('.mdl-button.mdl-button--icon',
                        m('i.material-icons', 'more')
                    ),
                    m('.mdl-button.mdl-button--icon',
                        m('i.material-icons', 'add')
                    ),
                ]),
            ]);
        },
    }

    var Header = {
        view: function(vnode) {
            return m('header.mdl-layout__header.mdl-color--grey-100.mdl-color-text--grey-600',
                m('.mdl-layout__header-row',
                    m('.mdl-layout-spacer')
                )
            );
        },
    };

    var Drawer = {
        view: function(vnode) {
            return m('.mdl-layout__drawer.mdl-color--blue-grey-900.mdl-color-text--blue-grey-50', [
                m('header.drawer-header', [
                    m('span.mdl-layout-title', 'Title'),
                ]),
                m('nav.mdl-navigation.mdl-color--blue-grey-800', [
                    m('a.mdl-navigation__link', 'a link'),
                    m('a.mdl-navigation__link', 'a link'),
                ]),
            ]);


        },
    };

    var Grid = {

        sets: [
            {id: 1, name: 'two', disabled: true},
            {id: 2, name: 'four', disabled: true},
        ],

        data: function() {
            return this.sets;
        },

        view: function(vnode) {
            return m('main.mdl-layout__content.mdl-color--grey-100', [
                m('button.poll.mdl-button.mdl-button--raised', {
                    disabled: false,
                    onclick: function() {
                        m.request({
                            url: 'http://localhost:8080/api',
                            method: 'GET',
                        }).then(function(res) {
                            console.log(res);
                            vnode.state.sets = res;
                        });
                    },
                }, 'Poll'),
                m('.set-grid.mdl-grid',
                    vnode.state.data().map(function(set) {
                        return m(SetCard, {set: set});
                    }),
                    m(NewSetCard),
                ),
            ]);

        },
    };

    var Layout = {
        view: function(vnode) {
            var layoutClasses = classNames(
                'dashboard',
                'mdl-layout', 'mdl-layout--fixed-drawer', 'mdl-layout--fixed-header',
            )
            return m('div', {
                class: layoutClasses,
            }, [
                m(Header),
                m(Drawer),
                m(Grid),
            ]);
        },
    };

    m.route(document.body, '/', {
        '/': Layout,
    });

};

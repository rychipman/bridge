
(function() {

    Card = {
        view: function(vnode) {
            cardClasses = classNames(
                'card',
                'mdl-card',
                'mdl-cell', 'mdl-cell--4-col',
                'mdl-color--white', 'mdl-color-text--grey-600',
                'mdl-shadow--4dp',
                {'disabled': vnode.attrs.disabled},
            );
            return m('div', {
                key: vnode.attrs.key,
                class: cardClasses,
            }, [
                m('h2.mdl-card__title.mdl-card--expand.mdl-color-text--grey-700',
                    vnode.attrs.title,
                ),
                m('.mdl-card__actions', vnode.attrs.icons.map(function(icon) {
                    return m('.mdl-button.mdl-button--icon',
                        m('i.material-icons', icon),
                    );
                })),
            ]);
        },
    };

    GiantCard = {
        view: function(vnode) {
            cardClasses = classNames(
                'card',
                'mdl-card',
                'mdl-cell', 'mdl-cell--5-col',
                'mdl-color--white', 'mdl-color-text--grey-600',
                'mdl-shadow--4dp',
            );
            return m('div', {
                key: vnode.attrs.key,
                class: cardClasses,
            }, [
                m('.mdl-card__title.mdl-color--primary mdl-color-text--white', [
                    m('h2.mdl-card__title-text', vnode.attrs.title),
                ]),
                m('.mdl-card__supporting-text', [
                    m('form', {action: '#'}, [
                        m('.mdl-textfield.mdl-js-textfield', [
                            m('input.mdl-textfield__input', {
                                type: 'text',
                                id: 'username',
                            }),
                            m('label.mdl-textfield__label', {for: 'username'}, 'Username'),
                        ]),
                        m('.mdl-textfield.mdl-js-textfield', [
                            m('input.mdl-textfield__input', {
                                type: 'text',
                                id: 'password',
                            }),
                            m('label.mdl-textfield__label', {for: 'password'}, 'Password'),
                        ]),
                    ]),
                ]),
                m('.mdl-card__actions.mdl-card--border', [
                    m('a',
                        {
                            class: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect',
                            onclick: Auth.login,
                        },
                        vnode.attrs.text
                    ),
                ]),
            ]);
        },
    };
})()

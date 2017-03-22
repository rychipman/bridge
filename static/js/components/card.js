
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


})()

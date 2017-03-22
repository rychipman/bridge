
(function() {

    Header = {
        view: function(vnode) {
            return m('header.mdl-layout__header.mdl-color--grey-100.mdl-color-text--grey-600',
                m('.mdl-layout__header-row',
                    m('span.mdl-layout-title', 'Home'),
                    m('.mdl-layout-spacer'),
                ),
            );
        },
    };

})()

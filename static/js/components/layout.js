
(function() {

    Layout = {

        oncreate: function(vnode) {
            componentHandler.upgradeElement(vnode.dom);
        },

        onupdate: function(vnode) {
            componentHandler.upgradeElement(vnode.dom);
        },

        view: function(vnode) {
            var layoutClasses = classNames(
                'dashboard',
                'mdl-layout', 'mdl-js-layout',
                'mdl-layout--fixed-drawer', 'mdl-layout--fixed-header',
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

})()

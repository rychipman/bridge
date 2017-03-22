
(function() {

    SetCard = {
        view: function(vnode) {
            set = vnode.attrs.set;
            return m(Card, {
                disabled: set.disabled,
                title: set.name,
                key: set.id,
                icons: ['share', 'delete'],
            });
        },
    };

    NewSetCard = {
        view: function(vnode) {
            return m(Card, {
                title: 'Add New Set',
                icons: ['more', 'add', 'star'],
            });
        },
    };

})()

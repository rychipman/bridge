
(function() {

    Sets = {

        sets: [
            {id: 1, name: 'two', disabled: true},
            {id: 2, name: 'four', disabled: true},
        ],

        data: function() {
            return this.sets;
        },

        view: function(vnode) {

            var gridClasses = classNames(
                'main-grid',
                'mdl-grid',
            );

            return m('div', {class: gridClasses}, [
                vnode.state.data().map(function(set) {
                    return m(SetCard, {set: set});
                }),
                m(NewSetCard),
            ]);

        },
    };

    Login = {

        view: function(vnode) {
            var gridClasses = classNames(
                'main-grid',
                'mdl-grid',
            );

            return m('div', {class: gridClasses}, [
                m('.mdl-layout-spacer'),
                m(GiantCard, {
                    title: 'Login',
                    text: 'Submit',
                },),
                m('.mdl-layout-spacer'),
            ]);
        },
    };

})()

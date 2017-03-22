
(function() {

    Grid = {

        sets: [
            {id: 1, name: 'two', disabled: true},
            {id: 2, name: 'four', disabled: true},
        ],

        data: function() {
            return this.sets;
        },

        view: function(vnode) {

            var mainClasses = classNames(
                'main-content',
                'mdl-layout__content',
                'mdl-color--grey-100',
            )
            var gridClasses = classNames(
                'main-grid',
                'mdl-grid',
            )

            return m('main', {class: mainClasses}, [
                m('div', {class: gridClasses},
                    vnode.state.data().map(function(set) {
                        return m(SetCard, {set: set});
                    }),
                    m(NewSetCard),
                ),
            ]);

        },
    };

})()

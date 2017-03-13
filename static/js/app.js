$(document).ready(function() {
    $('div.next-bids button.bid').on('click', function(evt){
        var bid = $(evt.target).text();
        $.post(
            '/api/bid',
            {
                bid: bid,
            },
            function() {
                window.location.replace('/next');
            },
        );
    });
});

$(document).on({
    ajaxStart: function() { $('body').addClass('loading'); },
    ajaxStop:  function() { $('body').removeClass('loading') },
})

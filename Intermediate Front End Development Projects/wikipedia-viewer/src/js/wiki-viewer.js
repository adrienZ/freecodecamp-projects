var api = {

    base: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=20&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=",

    contentType: "application/x-www-form-urlencoded; charset=utf-8",
};
api.polyfill = function() {
    if (window.XDomainRequest) //for IE8,IE9
        api.contentType = "text/plain";
};

var app = {

    $: {

        form_main: {
            submit_btn: $('#form-main-submit'),
            input: $('#form-main'),
        },

        container_result: {
            container: $('.container-result'),
            list: $('.container-result .list-group'),

        },

        errors_alert: {

            not_found: '<div class="alert alert-dismissible alert-danger">  <button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Oh snap!</strong> <a href="#" class="alert-link">There is nothing found about this subject</a> try submitting again.</div>',

            error: '<div class="alert alert-dismissible alert-danger">  <button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Oooops !</strong> <a href="#" class="alert-link">               an error occurred while processing your request</a> try submitting again later.</div>',
        },

        success_alert: function(number) {
            return '<div class="well well-sm"><span class="label label-success">' + number + '</span> result</div>';
        }


    },

    _template: function(title, content) {
        var html = [
            '<a href="https://en.wikipedia.org/wiki/' + title + '" class="list-group-item" target="_blank">',
              '<h4 class="list-group-item-heading">' + title + '</h4>',
              '<p class="list-group-item-text">' + content + '</p>',
            '</a>',
        ];
        return html.join('');
    }

};






api.polyfill();

$('form').on('submit', function(e) {
    //dont reload page
    e.preventDefault();
    //dom selectors shorteners
    var input = $(this).find('input');
    var search = input.val();
    var dom = app.$;
    var results = dom.container_result.list;

    $.ajax({
        url: api.base + search,
        type: "GET",
        dataType: "jsonp",
        contentType: api.contentType,

        success: function(data) {

            //error message if not search has no results
            if (!data.query) {
                results.html(dom.errors_alert.not_found);
                return false;
            }

            //data i need to build results items
            var pages = data.query.pages;
            var pages_count = Object.keys(pages).length;

            //empty container showing results
            results.html('');

            //build result counter alert
            results.append(
                dom.success_alert(
                    pages_count
                )
            );

            for (var _page in pages) {

                //templating item
                var content = pages[_page];
                var block = app._template(
                    content.title,
                    content.extract
                );

                //append item in container
                results.append(block);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            dom.container_result.list.html(dom.errors_alert.error);
            console.log(arguments);
        }
    });

});

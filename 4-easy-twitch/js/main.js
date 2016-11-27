var api = {
    kraken: 'https://api.twitch.tv/kraken',
};
//user setup
var user = {};
//shortener for handlebars.js
function templating(parent, source, object) {
    var template = Handlebars.compile(source.html());
    parent.append(template(object));
}
Twitch.init({
    clientId: app.clientId
}, function (error, status) {

    if (error) {
        // error encountered while loading
        console.log(error);
        document.write('error with client id');
    }
    if (status.authenticated) {
        Twitch.api({
            method: 'channel'
        }, function (error, channel) {
            // Already logged in, hide button
            app.$.main.removeClass('hide');
            app.$.connect.addClass('hide');
            user.name = channel.name;

            templating($('.top-bar .container'), $('#user-item'), channel);
            $.getJSON(api.kraken + '/users/' + user.name + '/follows/channels' + "?client_id=" + app.clientId, function (data) {
                user.follows = data.follows;
                user.list = Object.create(user.follows);
                app.$.connect.remove();

                $.each(user.list, function (index, chaine) {
                    //push dom
                    $.getJSON(api.kraken + '/streams/' + chaine.channel.name + "?client_id=" + app.clientId, function (is_streaming) {
                        app.ux.create_item(is_streaming, chaine);
                        //define onlick on list items
                        app.ux.set_items_onclick(app.$.items.parent().find('#' + chaine.channel.name));
                    });
                });
            });
        });
    };
});




$('.twitch-connect').click(function () {
    Twitch.login({
        scope: ['user_read', 'channel_read', 'user_follows_edit', 'chat_login']
    });
})

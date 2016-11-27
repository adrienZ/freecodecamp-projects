var app = {
    $: {},
    clientId : "jdwjws10jv2kyak1gh4nvyibd1t5370"
}
app.$.connect = $('.connect');
app.$.list = $('.list');
app.$.main = $('.video');
app.$.video = $('.video iframe');
app.$.follow_button = app.$.main.find('button');
app.$.import = app.$.list.find('#import');
app.ux = {};
app.ux.change_button_state = function (action, target) {
    app.$.follow_button.removeClass(action);
    if (action === 'follow') {
        app.$.follow_button.addClass('unfollow');
        app.$.follow_button.text('unfollow ' + target);
    } else {
        app.$.follow_button.addClass('follow');
        app.$.follow_button.text('follow ' + target);
    }
};
app.ux.generate_content = function (action, generator) {
    app.$.video.attr('src', 'http://player.twitch.tv/?channel=' + generator._to_find);
    app.$.main.find('.background-blur').css('background-image', 'url(' + generator._background + ')');
    generator._button_state = action;
    app.$.follow_button.attr('id', generator._to_find);
    app.$.follow_button.attr('class', generator._button_state);
    app.$.follow_button.html(generator._button_state + ' ' + generator._to_find);
};
app.ux.create_item = function (streaming, properties) {

    if (streaming.stream !== null) {
        properties.channel.state = 'online';
        properties.channel.current_game = streaming.stream.game;
    } else {
        properties.channel.state = 'offline';
        properties.channel.current_game = 'offline';

    }
    if (properties.channel.logo === null) {
        properties.channel.logo = 'https://avatars1.githubusercontent.com/u/1520320?v=3&s=96';
    }

    templating(app.$.list.find('ul.' + properties.channel.state), $('#list-item'), properties.channel);
    app.$.items = app.$.list.find('ul li', app.ux.set_delete_item($('li#' + properties.channel.name), properties));

};
app.ux.set_items_onclick = function (debug) {
    debug.on('click', function () {

        app.$.items.removeClass('active');
        $(this).parent().addClass('active');
        var content = {
            _to_find: debug.attr('id'),
            _status: debug.attr('data-status'),
            _background: debug.attr('data-bg'),
            _button_state: undefined,
        };

        user.active = content._to_find;
        console.log(user.active);

        $.each(user.follows, function (index) {
            var followed = this;
            if (content._to_find === followed.channel.name) {
                app.ux.generate_content('unfollow', content)
                return false;
            } else {
                app.ux.generate_content('follow', content)
            }
        });
        app.$.follow_button.on('click', function (e) {
            var target = app.$.follow_button.attr('id');
            if (app.$.follow_button.hasClass('unfollow')) {
                Twitch.api({
                    method: '/users/' + user.name + '/follows/channels/' + target,
                    verb: 'DELETE',
                    _method: 'DELETE',
                }, function (e, a) {
                    app.ux.change_button_state('unfollow', target);
                });
            } else {
                Twitch.api({
                    method: '/users/' + user.name + '/follows/channels/' + target,
                    verb: 'PUT',
                    _method: 'PUT',
                }, function (e, a) {
                    app.ux.change_button_state('follow', target);
                });
            }
        });
    });
};

app.$.import.on('click', function () {
    var search = window.prompt('Whom subscriptions do you import');
    if (search === null) {
        return false;
    }
    $.getJSON(api.kraken + '/users/' + search + '/follows/channels' + "?client_id=" + app.clientId, function (data2) {
        $.each(data2.follows, function (index, new_item) {
            $.getJSON(api.kraken + '/streams/' + new_item.channel.name + "?client_id=" + app.clientId, function (new_stream) {
                var block = false;
                $.each(user.list, function (index, check) {
                    if (new_item.channel.name === check.channel.name) {
                        block = true;
                    }
                });
                if (block === false) {
                    app.ux.create_item(new_stream, new_item);
                    app.$.items = app.$.list.find('ul li');
                    user.list.push(new_item);
                    app.ux.set_items_onclick(app.$.items.parent().find('#' + new_item.channel.name));
                }
            });
        });
    });
});

app.ux.set_delete_item = function (target, object_item) {
    target.find('.delete').on('click', function () {
        var delay = target.css('animation-duration');
        user.list = user.list.filter(function (obj) {
            if (object_item !== obj) {
                return obj;
            }
        });
        delay = parseFloat(delay.replace('s', ''));
        var replay = target.clone(true);
        target.after(replay);
        replay.css('animation-direction', 'reverse');
        $("#" + target.attr("id") + ":last").remove();
        window.setTimeout(function () {
            replay.remove();
        }, delay * 1000 * 2);
    })
}

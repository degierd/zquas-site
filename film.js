/* Click-to-play film facade.
 *
 * The page shows our own poster image and a play button. No YouTube code loads and no
 * YouTube cookie is set until the visitor clicks play. A click then loads the player
 * from youtube-nocookie.com. The video ID comes from config.js (YOUTUBE_FILM_ID). An ID that is not 11 valid characters leaves the poster in a
 * "Film available soon" state and loads nothing.
 */
(function () {
    var cfg = window.ZQUAS_CONFIG || {};
    var IDS = { main: cfg.YOUTUBE_FILM_ID };

    function valid(id) {
        return typeof id === 'string' && /^[A-Za-z0-9_-]{11}$/.test(id);
    }

    function setup(box) {
        var id = IDS[box.getAttribute('data-film')];
        var btn = box.querySelector('.film-play');
        var label = box.querySelector('.film-play-label');
        if (!btn) return;

        if (!valid(id)) {
            box.classList.add('film--pending');
            btn.disabled = true;
            if (label) label.textContent = 'Film available soon';
            return;
        }

        function play() {
            window.dispatchEvent(new Event('zquas:film-play'));
            var frame = box.querySelector('.film-frame');
            if (!frame || frame.querySelector('iframe')) return;
            var iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube-nocookie.com/embed/' + id +
                '?autoplay=1&rel=0&playsinline=1&cc_load_policy=1&hl=en';
            iframe.title = box.getAttribute('data-title') || 'ZQUAS film';
            iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            frame.appendChild(iframe);
            box.classList.add('film--playing');
            iframe.focus();
        }

        btn.addEventListener('click', play);
        box._filmPlay = play;
    }

    window.addEventListener('zquas:story-start', function () {
        var frames = document.querySelectorAll('[data-film] iframe');
        for (var i = 0; i < frames.length; i++) {
            var box = frames[i].closest('[data-film]');
            frames[i].remove();
            if (box) box.classList.remove('film--playing');
        }
    });

    function init() {
        var boxes = document.querySelectorAll('[data-film]');
        for (var i = 0; i < boxes.length; i++) setup(boxes[i]);

        // Links such as "Watch the film" scroll to the film and start it.
        var triggers = document.querySelectorAll('[data-film-play]');
        for (var j = 0; j < triggers.length; j++) {
            triggers[j].addEventListener('click', function (e) {
                var box = document.querySelector('[data-film="' + this.getAttribute('data-film-play') + '"]');
                if (!box) return;
                e.preventDefault();
                box.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (box._filmPlay) box._filmPlay();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

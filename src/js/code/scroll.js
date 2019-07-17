document.addEventListener("DOMContentLoaded", function() {
	var e = (function() {
			if ("scrollingElement" in document)
				return document.scrollingElement;
			var a = document.documentElement,
				b = a.scrollTop;
			a.scrollTop = b + 1;
			var c = a.scrollTop;
			a.scrollTop = b;
			return c > b ? a : document.body;
		})(),
		h = function(a) {
			var b = e.scrollTop;
			if (2 > a.length) a = -b;
			else if ((a = document.querySelector(a))) {
				a = a.getBoundingClientRect().top;
				var c = e.scrollHeight - window.innerHeight;
				a = b + a < c ? a : c - b;
			} else a = void 0;
			if (a) return new Map([["start", b], ["delta", a]]);
		},
		m = function(a) {
			var b = a.getAttribute("href"),
				c = h(b);
			if (c) {
				var d = new Map([["duration", 800]]),
					k = performance.now();
				requestAnimationFrame(function l(a) {
					d.set("elapsed", a - k);
					a = d.get("duration");
					var f = d.get("elapsed"),
						g = c.get("start"),
						h = c.get("delta");
					e.scrollTop = Math.round(
						h * (-Math.pow(2, (-10 * f) / a) + 1) + g
					);
					d.get("elapsed") < d.get("duration")
						? requestAnimationFrame(l)
						: (history.pushState(null, null, b),
						  (e.scrollTop = c.get("start") + c.get("delta")));
				});
			}
		},
		n = function b(c, d) {
			var e = c.item(d);
			e.addEventListener("click", function(b) {
				b.preventDefault();
				m(e);
			});
			if (d) return b(c, d - 1);
		},
		f = document.querySelectorAll("a.scroll"),
		g = f.length - 1;
	0 > g || n(f, g);
});

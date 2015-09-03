var u1App = angular.module("u1App", ["ngRoute", "ngRetina", "apps.services", "u1App.services", "apps.directives", "apps.filters", "u1App.controllers", "analytics", "templates", "ng-translation"]),
    u1AppServices = angular.module("u1App.services", []),
    u1AppControllers = angular.module("u1App.controllers", []),
    appsServices = angular.module("apps.services", ["ngCookies"]),
    appsFilters = angular.module("apps.filters", []),
    appsDirectives = angular.module("apps.directives", []);
u1App.config(["$locationProvider", "$routeProvider", "ngTranslationProvider", function(e, t, n) {
    n.setDirectory("lang").setFilesSuffix(".json").langsFiles({
        cn: "cn"
    }).fallbackLanguage("cn"), t.when("/overview", {
        templateUrl: "view/html/overview.html",
        controller: "OverviewCtrl"
    }), t.when("/design", {
        templateUrl: "view/html/design.html",
        controller: "OverviewCtrl"
    }), t.when("/spec", {
        templateUrl: "view/html/spec.html",
        controller: "OverviewCtrl"
    }), t.when("/features", {
        templateUrl: "view/html/features.html",
        controller: "OverviewCtrl"
    }), t.when("/os", {
        templateUrl: "view/html/os.html",
        controller: "OverviewCtrl"
    }), t.when("/os/whats-new", {
        templateUrl: "view/html/os.html",
        controller: "OverviewCtrl"
    }), t.otherwise({
        redirectTo: "/overview"
    })
}]), u1App.run(["$rootScope", "$route", "$location", "$timeout", "$window", "ngTranslation", "Utils", "$cookies", "Language", function(e, t, n, o, r, i, a, s, l) {
    l.init(), i.use(e.lang), e.$on("$routeChangeStart", function(t, n, o) {
        e.loading = !0
    }), e.$on("$routeChangeSuccess", function(t, n, o) {
        e.loading = !1, e.moduleName = "jianguo"
    })
}]), appsServices.factory("Utils", ["$rootScope", "$q", "$http", "$location", "$cookies", function(e, t, n, o, r) {
    var i = {};
    return i.truncateChars = function(e, t, n, o) {
        if (e) {
            var r = e.replace(/[\u4e00-\u9fa5\s]/g, "**").length,
                i = [],
                a = 0;
            if (o) {
                var s = $("<div></div>").html(e);
                e = s.text(), s = null
            }
            if (t >= r) return e;
            for (var l = 0; r > l; l++) {
                var c = e.charAt(l);
                if (a += /[^\x00-\xff]/.test(c) ? 2 : 1, i.push(c), a >= t) break
            }
            return n ? i.join("") + "..." : i.join("")
        }
        return ""
    }, i.encodeUriQuery = function(e, t) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
    }, i.toKeyValue = function(e) {
        var t = this,
            n = [];
        return angular.forEach(e, function(e, o) {
            angular.isArray(e) ? angular.forEach(e, function(e) {
                n.push(t.encodeUriQuery(o, !0) + (e === !0 ? "" : "=" + t.encodeUriQuery(e, !0)))
            }) : n.push(t.encodeUriQuery(o, !0) + (e === !0 ? "" : "=" + t.encodeUriQuery(e, !0)))
        }), n.length ? n.join("&") : ""
    }, i.shareWeibo = function(e, t, n, o) {
        var r = e || $(".share-btn"),
            i = encodeURIComponent(location.href),
            a = n || "",
            s = "http://service.weibo.com/share/share.php?appkey=",
            l = o || $(".share-weibo-cover").attr("src"),
            c = encodeURIComponent(this.truncateChars(a, 232, !0) + "（分享自 @锤子科技）");
        s += "&title=" + c, s += "&url=" + i, l && (s += "&pic=" + encodeURIComponent(l)), r.attr("href", s)
    }, i.setTitle = function(e, t) {
        document.title = "undefined" == typeof t ? e : e + " - " + t
    }, i.setKeywords = function(e) {
        e && "" !== e && $("meta[name='keywords']").attr({
            content: e
        })
    }, i.setDescription = function(e) {
        e && "" !== e && $("meta[name='description']").attr({
            content: e
        })
    }, i.setMobileTitle = function(e) {
        var t = "";
        "undefined" == typeof e.text ? t = '<span class="logo-pic"></span>' : t += "undefined" == typeof e.url ? e.text : '<a href="' + e.url + '">' + e.text + "</a>", $(".mobile-title").html(t)
    }, i.setCrumbs = function(e) {
        for (var t = "", n = 0; n < e.length; n++) t += "undefined" == typeof e[n].url ? e[n].title : '<a href="' + e[n].url + '">' + e[n].title + "</a>", n + 1 < e.length && (t += " &gt; ");
        $(".header-crumbs").length ? $(".header-crumbs").html(t) : $(".breadcrumb").html(t)
    }, i.setT1Crumbs = function(e, t) {
        e && $(".header-sub .breadcrumb").removeClass("hide");
        var n = "";
        t && (n += '<h2 class="phone-logo"></h2>'), n += '<ul class="t1Crumbs">';
        for (var o = e.currentPage, r = 0; r < e.list.length; r++) {
            var i = "";
            o && e.list[r].url.indexOf(o) > 0 && (i = "on"), n = n + '<li class="' + i + '"><a href="' + e.list[r].url + '">' + e.list[r].title + "</a></li>"
        }
        n += "</ul>", $(".breadcrumb").html(n)
    }, i.openServiceWindow = function() {
        var e = decodeURIComponent(arguments[0] || "http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=376704&lan=zh&configID=185120&jid=4594069570"),
            t = arguments[1] || "_blank",
            n = arguments[2] || 800,
            o = arguments[3] || 600,
            r = "directories=no, titlebar=no, toolbar=no, location=no, status=no, menubar=no, scrollbars=no, resizable=no, top=200,left=200, width= " + n + ", height=" + o,
            i = arguments[4] || !0;
        window.open(e, t, r, i)
    }, i.showMore = function(e, t) {
        var n = e.height(),
            o = e.find("h3").outerHeight() + e.find("ul").outerHeight();
        o > n && (t.css({
            display: "block"
        }), t.bind("click", function() {
            e.find(".feature-wrapper").css({
                height: "auto"
            }), t.hide()
        }))
    }, i.isMobile = function() {
        var e = navigator.userAgent.toLowerCase(),
            t = "ipad" == e.match(/ipad/i),
            n = "iphone os" == e.match(/iphone os/i),
            o = "midp" == e.match(/midp/i),
            r = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i),
            i = "ucweb" == e.match(/ucweb/i),
            a = "android" == e.match(/android/i),
            s = "windows ce" == e.match(/windows ce/i),
            l = "windows mobile" == e.match(/windows mobile/i);
        return t || n || o || r || i || a || s || l ? !0 : !1
    }, i.isWeixin = function() {
        var e = navigator.userAgent.toLowerCase();
        return "micromessenger" == e.match(/MicroMessenger/i) ? !0 : !1
    }, i.isMobileQQ = function() {
        var e = navigator.userAgent.toLowerCase();
        return "qq/" == e.match(/qq\//i) ? !0 : !1
    }, i.isIphone = function() {
        var e = navigator.userAgent.toLowerCase();
        return "iphone" == e.match(/iphone/i) ? !0 : !1
    }, i.isAndroid = function() {
        var e = navigator.userAgent.toLowerCase();
        return "android" == e.match(/android/i) ? !0 : !1
    }, i.mobileGuide = function(e) {
        function t() {
            a.show(), setTimeout(function() {
                var e = s > o.height() ? s : o.height();
                a.css({
                    height: e
                })
            }, 700), a.bind("click", function() {
                a.hide()
            })
        }
        var n = this,
            o = $(document.body),
            r = $("#download-android"),
            i = $("#download-iPhone"),
            a = $("#mobileGuide"),
            s = window.screen.availHeight;
        this.isWeixin() || this.isMobileQQ() || this.isIphone() || !i.attr("href") || !i.attr("href").match(/^http/) || $(".desc-download .for-iphone").attr("target", "_blank"), this.isWeixin() && (r.attr("href", "javascript:void(0);"), r.bind("click", function(e) {
            t(), a.find("img").hide(), n.isIphone() ? a.find(".guide-iOS-download").show() : a.find(".guide-android-download").show()
        })), location.href.match(/\QR_download/) ? this.isAndroid() ? this.isWeixin() || this.isMobileQQ() ? (t(), a.find(".guide-android-download").show()) : setTimeout(function() {
            location.href = r.attr("href")
        }, 2e3) : this.isIphone() && i.attr("href").match(/^http/) && setTimeout(function() {
            location.href = i.attr("href")
        }, 2e3) : location.href.match(/\QR_share/) && (this.isWeixin() || this.isMobileQQ()) && (t(), this.isIphone() ? a.find(".guide-iOS-share").show() : this.isAndroid() && a.find(".guide-android-share").show())
    }, i.changeLangCookies = function(e) {
        var t = e.target.href; - 1 === t.indexOf("en") ? (r.put("lang", "zh-CN", {
            path: "/",
            domain: "smartisan.com"
        }), r.put("language", "zh-CN", {
            path: "/",
            domain: "smartisan.com"
        })) : (r.put("lang", "en-US", {
            path: "/",
            domain: "smartisan.com"
        }), r.put("language", "en-US", {
            path: "/",
            domain: "smartisan.com"
        }))
    }, i
}]), appsServices.constant("Config", {
    baseUrl: "/index.php?r=",
    headconfig: {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
    },
    regExp: {
        isMobile: /^1[3|4|5|7|8]\d{9}$/,
        isMail: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
        isPassword: /^[\w\\\[\]\:\^\-~!@#$%&*()-+={}|;'",.\/<>?]{6,16}$/,
        isSafeUrl: /^(http|https)\:\/\/[a-zA-Z0-9\-\.]+\.(smartisan.com\b)(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9\-\._\?\,\'\/\\\+&amp;%\$#\=~])*$/,
        isIMEI: /^\d{15}$/,
        isMAC: /^([0-9a-fA-F]{2})(([\s:][0-9a-fA-F]{2}){5})$/
    }
}).constant("ACCESS_LEVELS", {
    pub: 1,
    user: 2,
    cloud: 3,
    alpha: 4
}), appsServices.factory("Message", ["Account", "User", "BaseInfo", function(e, t, n) {
    var o = function(o) {
        var r = o.originalEvent;
        r.origin == e.config.origin && ("isLoggedIn" == r.data && n.update(), "isRegistered" == r.data && n.update(), "isLoggedOut" == r.data && (e.close(), t.logout()), "dialogClose" == r.data && e.close())
    };
    return {
        handler: o
    }
}]), appsServices.factory("Account", ["$window", function(e) {
    var t = {},
        n = {
            wrapper: "body",
            origin: "https://account.smartisan.com",
            loginUrl: "https://account.smartisan.com/#/login/embed",
            logoutUrl: "https://account.smartisan.com/#/logout/embed",
            registerUrl: "https://account.smartisan.com/#/register/embed"
        },
        o = function() {
            if (!t.wrapper) {
                var e = [];
                e.push('<div class="iframe-dialog" id="iframe-dialog">'), e.push('<div class="mask"></div>'), e.push('<iframe allowtransparency="true" src="" frameborder="0"></iframe>'), e.push("</div>"), t.wrapper = $(n.wrapper), t.wrapper.append(e.join(""))
            }
            t.mask = $("#iframe-dialog .mask"), t.iframe = $("#iframe-dialog iframe")
        },
        r = function(n, r) {
            if ("undefined" != typeof n) {
                o();
                var i = e.location.origin || e.location.protocol + "//" + e.location.hostname;
                t.iframe.attr("src", n + "?origin=" + i), r || (t.mask.show(), t.iframe.addClass("show"))
            }
        },
        i = function() {
            t.iframe && (t.mask.hide(), t.iframe.removeClass("show"), t.iframe.attr("src", ""))
        },
        a = function() {
            r(n.loginUrl)
        },
        s = function() {
            r(n.logoutUrl, !0)
        },
        l = function() {
            r(n.registerUrl)
        };
    return {
        config: n,
        close: i,
        login: a,
        logout: s,
        register: l
    }
}]), appsServices.factory("User", ["$rootScope", "$q", "$http", "$location", "Config", "ACCESS_LEVELS", function(e, t, n, o, r, i) {
    var a = {},
        s = !1,
        l = r.baseUrl,
        c = function(t) {
            $.extend(a, t), s = !0, e.isLoggedIn = a.role > i.user ? !0 : !1
        },
        u = function() {
            var o = t.defer();
            return n.post(l + "account/user", "", null).success(function(t) {
                0 == t.code ? (c(t.data), e.isLoggedIn = !0, o.resolve(t)) : (e.isLoggedIn = !1, o.reject(t))
            }).error(function() {
                o.reject("网络异常!")
            }), o.promise
        };
    return {
        getInfo: u,
        isInitial: function() {
            return s
        },
        isAuthorized: function(e) {
            return a && a.role >= e
        },
        set: c,
        isLoggedIn: function() {
            return a.uid ? !0 : !1
        },
        getUser: function() {
            return a
        },
        getId: function() {
            return a ? a.uid : null
        },
        getName: function() {
            return a.name || ""
        },
        getRole: function() {
            return a.role || null
        },
        getAvatarUrl: function() {
            return a.avatarUrl || ""
        },
        logout: function() {
            a = {}, e.isLoggedIn = !1, e.$apply()
        }
    }
}]), appsServices.factory("BaseInfo", ["$q", "User", "Account", function(e, t, n) {
    var o = function() {
        var o = e.defer();
        return t.getInfo().then(function(e) {
            n.close(), o.resolve()
        }, function(e) {
            o.reject()
        }), o.promise
    };
    return {
        update: o
    }
}]), appsServices.factory("Language", ["$rootScope", "$cookies", "$window", "$location", function(e, t, n, o) {
    var r = function() {
        e.lang = "cn", e.langStatic = ""
    };
    return {
        init: r
    }
}]), appsDirectives.directive("changeLanguage", ["$document", function(e) {
    return {
        restrict: "A",
        link: function(t, n, o, r) {
            n && (n.on("click", function(e) {
                var t = $(e.target).closest(".language-switch");
                return t.toggleClass("active"), !1
            }), e.on("click", function(e) {
                var t = $(e.target);
                t.closest(".language-switch").is(".language-switch") || $(".language-switch").removeClass("active")
            }))
        }
    }
}]).directive("showWeixinCode", ["$document", "Utils", function(e, t) {
    return {
        restrict: "A",
        link: function(e, t, n, o) {
            t && t.find("a").on("click", function() {
                var e = $(this).parent(".weixin"),
                    t = e.find(".qrcode");
                if (t.is(":hidden")) {
                    e.addClass("hold");
                    var n = $(window).height() / 2;
                    t.css({
                        bottom: n + "px"
                    }), t.fadeIn(100), setTimeout(function() {
                        e.find(".mask").one("click", function() {
                            e.removeClass("hold"), t.fadeOut(300), e.removeClass("hold")
                        }), e.find(".close-btn").one("click", function() {
                            e.removeClass("hold"), t.fadeOut(300), e.removeClass("hold")
                        })
                    })
                }
            })
        }
    }
}]).directive("openServiceWindow", ["$document", "Utils", function(e, t) {
    return {
        restrict: "A",
        link: function(e, n, o, r) {
            n && n.on("click", function(e) {
                e.preventDefault(), t.openServiceWindow()
            })
        }
    }
}]).directive("mobileNavShow", ["$document", function(e) {
    return {
        restrict: "A",
        link: function(e, t, n, o) {
            t && (t.on("click", function(e) {
                return $(".wrapper").removeClass("moblie-quick-nav"), $(".wrapper").toggleClass("moblie-show-nav"), !1
            }), $(document).on("click", function(e) {
                $(".wrapper").removeClass("moblie-show-nav"), $(".wrapper").addClass("moblie-quick-nav")
            }))
        }
    }
}]).directive("mobileNavSticky", ["$document", function(e) {
    return {
        restrict: "A",
        link: function(e, t, n, o) {
            t && $(window).on("scroll", function() {
                $("body").scrollTop() > 45 ? (t.addClass("sticky"), $(".wrapper").removeClass("moblie-show-nav"), $(".wrapper").addClass("moblie-quick-nav")) : $("body").scrollTop() > 85 ? ($(".wrapper").removeClass("moblie-show-nav"), $(".wrapper").addClass("moblie-quick-nav"), t.addClass("sticky")) : t.removeClass("sticky")
            })
        }
    }
}]).directive("backTop", ["$document", function(e) {
    return {
        restrict: "A",
        link: function(e, t, n, o) {
            t && ($(window).on("scroll", function() {
                $(window).scrollTop() > 600 ? t.addClass("active") : t.removeClass("active")
            }), t.on("click", function() {
                $("html,body").animate({
                    scrollTop: $("body").offset().top
                }, {
                    queue: !1
                }, 500)
            }))
        }
    }
}]).directive("accountReservation", ["$document", "Utils", function(e, t) {
    return {
        restrict: "A",
        link: function(e, n, o, r) {
            n && t.isMobile() && n.on("click", function() {
                $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active")
            })
        }
    }
}]).directive("routeChangeResetHeader", [function() {
    return {
        restrict: "A",
        controller: ["$element", "$rootScope", "Utils", function(e, t, n) {
            t.$on("$routeChangeStart", function() {
                n.setMobileTitle({
                    text: '<span class="logo-pic"></span>'
                }), e.find(".nav-main li").removeClass("active"), $(".wrapper").addClass("moblie-quick-nav"), $(".wrapper").removeClass("moblie-show-nav"), e.find(".header-sub .breadcrumb").removeClass("hide"), e.find(".header-sub .language-switch").addClass("hide"), e.find(".header-sub .language-switch").removeClass("active")
            })
        }]
    }
}]).directive("routeChangeResetFooter", [function() {
    return {
        restrict: "A",
        controller: ["$element", "$rootScope", function(e, t) {
            t.$on("$routeChangeStart", function() {
                e.find(".language-switch").removeClass("active")
            })
        }]
    }
}]).directive("trackerzClick", ["$document", function(e) {
    return {
        restrict: "A",
        link: function(e, t, n, o) {
            $(t).click(function(e) {
                var t = n.trackerzClick;
                MLTrackerz.track({
                    type: "event",
                    action: t
                })
            })
        }
    }
}]), appsFilters.filter("to_HTML", ["$sce", function(e) {
    return function(t) {
        return e.trustAsHtml(t)
    }
}]), u1AppServices.factory("Overview", ["$window", function(e) {
    var t, n, o, r = !1,
        i = function() {
            if (!(r || l.isMoving || l.zoomedIn)) {
                l.off();
                var e = $(".rhythm li"),
                    t = 0,
                    n = e.length,
                    o = function(t) {
                        var n = e[t],
                            o = 60 * t;
                        $(n).css({
                            "-webkit-transform": "translate3d(0, 10%, 0)",
                            transform: "translate3d(0, 10%, 0)",
                            "-webkit-transition": "-webkit-transform .2s linear " + o + "ms",
                            transition: "transform .2s linear " + o + "ms"
                        })
                    },
                    i = function(t) {
                        var n = e[t];
                        return function() {
                            requestAnimationFrame(function() {
                                $(n).css({
                                    transform: "translate3d(0, -20%, 0)",
                                    "-webkit-transform": "translate3d(0, -20%, 0)",
                                    "-webkit-transition": "-webkit-transform .2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                    transition: "transform .2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                                })
                            })
                        }
                    },
                    a = function(t) {
                        var n = e[t],
                            o = .4 + .05 * t;
                        return function() {
                            requestAnimationFrame(function() {
                                $(n).css({
                                    "-webkit-transform": "translate3d(0, 0, 0)",
                                    transform: "translate3d(0, 0, 0)",
                                    "-webkit-transition": "-webkit-transform " + o + "s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                    transition: "transform " + o + "s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                                })
                            })
                        }
                    };
                for (t; n > t; t++) o(t), setTimeout(i(t), 200 + 60 * t), setTimeout(a(t), 400 + 60 * t);
                setTimeout(function() {
                    l.on()
                }, 1e3)
            }
        },
        a = function(e, t) {
            var n = $(e).position().top / $(e).height() * 100,
                o = (t - n) / 5;
            n += o, $(e).css({
                "-webkit-transform": "translate3d(0, " + n + "%, 0)",
                transform: "translate3d(0, " + n + "%, 0)",
                "-webkit-transition": "none",
                transition: "none"
            })
        },
        s = function() {
            var e = $(".rhythm img"),
                r = 0,
                i = e.length,
                l = 5 * $(".rhythm").width() / 7,
                c = (new Date).valueOf();
            for (r; i > r; r++) {
                var u = e[r],
                    d = $(u).offset().left + $(u).width() / 2,
                    f = Math.abs(d - t);
                f > l && (f = l);
                var m = 0;
                m = Math.cos(f / l * Math.PI) - 1.1, m = 30 * Math.abs(m), a(u, m)
            }
            console.log( 1e3 );
            //1e3 > c - o && (n = requestAnimationFrame(s))
        },
        l = {
            isMoving: !1,
            zoomedIn: !1,
            on: function() {
                $(".rhythm").on("mousemove", this.mousemoveHandler), $(".rhythm").on("mouseout", this.mouseoutHandler), $(".rhythm").on("click", this.zoomIn)
            },
            off: function() {
                $(".rhythm").off("mousemove", this.mousemoveHandler), $(".rhythm").off("mouseout", this.mouseoutHandler), $(".rhythm").off("click", this.zoomIn)
            },
            reset: function() {
                cancelAnimationFrame(n),
                 $(".rhythm .scale").removeAttr("style"), 
                 $(".rhythm img").removeAttr("style"), 
                 $(".rhythm li").removeAttr("style"),
                  $(".overview .row-1").removeClass("zoom-in"), 
                  $(".rhythm .scale img").removeClass("large"), 
                  $(".rhythm .scale li").removeClass("large-prev").removeClass("large-next"), 
                  $(".toast").removeClass("active"), $(".rhythm").addClass("animate"), 
                  setTimeout(function() {
                    $(".rhythm").removeClass("animate")
                }, 350)
            },
            mousemoveHandler: function(e) {
                o = (new Date).valueOf(), 
                $(".rhythm").removeClass("animate"), 
                t = e.clientX, 
                cancelAnimationFrame(n), 
                n = requestAnimationFrame(s),
                 l.isMoving = !0
            },
            mouseoutHandler: function(e) {
                var t = e.relatedTarget;
                null == t || $(t).parents(".rhythm").length || t == $(".rhythm")[0] || (l.reset(), l.isMoving = !1)
            },
            zoomIn: function(e) {
                cancelAnimationFrame(n);
                var t = e.target;
                if ("li" === t.tagName.toLowerCase() && (t = $(t).children("img")[0]), "img" === t.tagName.toLowerCase()) {
                    var o = $(t).offset().left + $(t).width() / 2;
                    o = $(window).width() / 2 - o, 
                    $(".overview .row-1").addClass("zoom-in"),
                     $(".rhythm .scale").css({
                        "-webkit-transform": "translate3d(" + 3 * o + "px, 0, 0) scale(3)",
                        transform: "translate3d(" + 3 * o + "px, 0, 0) scale(3)"
                    }), $(".rhythm img").css({
                        "-webkit-transition": "-webkit-transform .4s cubic-bezier(0.445, 0.05, 0.55, 0.95)",
                        transition: "transform .4s cubic-bezier(0.445, 0.05, 0.55, 0.95)"
                    }), $(t).addClass("large"), 
                    $(t).parent().prevAll("li").addClass("large-prev"), 
                    $(t).parent().nextAll("li").addClass("large-next");
                    
                    var r, i, a, s = $(t).offset().top - .22 * $(".scale").height() * 2,
                        u = 1.4 * $(".rhythm .scale").height(),
                        s = $(window).height() - u;
                    0 == c ? (r = $(".header").height(), i = -$(".row-1 .content").height() / 2, 
                        s -= r,
                         a = i - ($(".row-1 .content").position().top + $(".row-1 .content").height() / 2 - s / 2)) : (r = $(".header-sub").height(), i = $(".row-1 .content").height(), 
                         s -= r, a = i - ($(".row-1 .content").position().top + $(".row-1 .content").height() / 2 - (s / 2 + r))), 
                         s > $(".row-1 .content").height() + 10 ? ($(".row-1 .content").addClass("zoom-in"), 
                            $(".row-1 .content").css({
                        "-webkit-transform": "translate3d(0, " + a + "px, 0)",
                        transform: "translate3d(0, " + a + "px, 0)"
                    })) : $(".row-1 .content").addClass("fade-out"), l.zoomedIn = !0, e.stopPropagation(), l.off(), $(document).on("click", l.zoomOut)
                }
            },
            zoomOut: function(e) {
                l.zoomedIn && ($(".toast").removeClass("active"), $(".overview .row-1").removeClass("zoom-in"), $(".rhythm .scale").removeAttr("style"), $(".rhythm .scale img").removeClass("large"), $(".rhythm .scale li").removeClass("large-prev").removeClass("large-next"), $(document).off("click", l.zoomOut), $(".row-1 .content").removeClass("fade-out"), $(".row-1 .content").removeClass("zoom-in"), $(".row-1 .content").removeAttr("style"), setTimeout(function() {
                    l.on()
                }, 300), l.zoomedIn = !1)
            }
        },
        c = 0,
        u = function(e, t, n, o, r) {
            switch (l.zoomOut(), c = e, e) {
                case 0:
                    $(".rhythm").css({
                        "-webkit-transform": "translate3d(0, " + t + "px, 0)",
                        "-webkit-transition": "-webkit-transform " + n + "ms " + o,
                        "-moz-transform": "translate3d(0, " + t + "px, 0)",
                        "-moz-transition": "-moz-transform " + n + "ms " + o,
                        "-ms-transform": "translate3d(0, " + t + "px, 0)",
                        "-ms-transition": "-ms-transform " + n + "ms " + o,
                        transform: "translate3d(0, " + t + "px, 0)",
                        transition: "transform " + n + "ms " + o
                    });
                    break;
                case 1:
                    $(".rhythm").css({
                        "-webkit-transform": "translate3d(0, " + -t + "px, 0)",
                        "-webkit-transition": "-webkit-transform " + n + "ms " + o,
                        "-moz-transform": "translate3d(0, " + -t + "px, 0)",
                        "-moz-transition": "-moz-transform " + n + "ms " + o,
                        "-ms-transform": "translate3d(0, " + -t + "px, 0)",
                        "-ms-transition": "-ms-transform " + n + "ms " + o,
                        transform: "translate3d(0, " + -t + "px, 0)",
                        transition: "transform " + n + "ms " + o
                    }), 0 > r && i()
            }
        },
        d = $(".header").height(),
        f = function() {
            h.reset(), $("html").hasClass("csstransforms3d") && $(".rhythm").css({
                bottom: d + "px"
            })
        },
        m = function() {
            h.start(), h.responsive() && l.on()
        },
        h = $(".wrapper").pageScroll({
            sectionContainer: ".row",
            headerContainer: ".header",
            footerContainer: ".footer",
            navSlideName: "header-sub",
            beforeMove: u,
            nextScreen: !1,
            responsiveFallback: 500,
            thisInit: !1
        });
    return {
        setPaginationTip: h.setPaginationTip,
        start: m,
        reset: f
    }
}]), u1AppServices.factory("Features", ["$window", "SubNav", function(e, t) {
    var n = function() {
            $(".drop-phone").parent().removeClass("active")
        },
        o = function() {
            setTimeout(function() {
                $(".drop-phone").parent().addClass("active")
            }, 200)
        };
    return {
        reset: n,
        init: o
    }
}]), u1AppServices.factory("SubNav", ["$window", function(e) {
    var t = $(".header-main").height() + 20,
        n = $(".header-sub"),
        o = function() {
            $(window).off("scroll", r)
        },
        r = function() {
            var e = $(window).scrollTop();
            e > t ? n.addClass("active") : n.removeClass("active")
        },
        i = function() {
            o(), $(window).on("scroll", r)
        };
    return {
        reset: o,
        init: i
    }
}]), u1AppControllers.controller("MainCtrl", ["$scope", "$rootScope", "$http", "$timeout", "$location", "$window", "Account", "Message", "BaseInfo", "Utils", "Config", function(e, t, n, o, r, i, a, s, l, c, u) {
    function d(e) {
        if (e = e ? !0 : !1, t.isLoggedIn || e) {
            var o = "http://www.smartisan.com/order/info/res";
            n.post(o).success(function(e) {
                if (e && "0" == e.code && "1" == e.data.order && e.data.buytime) {
                    t.hasReservation = 1;
                    var n = f(e.data.buytime);
                    $(".header-sub .account-reservation .phone-right p").html("您已成功预约" + n + "的坚果手机开放购买")
                } else t.hasReservation = 0
            }).error(function() {})
        }
    }

    function f(e) {
        var t = new Date(1e3 * e),
            n = t.getMonth() + 1,
            o = t.getDate(),
            r = t.getHours(),
            i = t.getMinutes();
        return 0 >= r ? r = "00" : 10 > r && (r = "0" + r), 0 >= i ? i = "00" : 10 > i && (i = "0" + i), " " + n + " 月 " + o + " 日 " + r + ":" + i + " "
    }
    t.hasReservation = 0, t.isU1 = 1, $(window).on("message", s.handler), l.update().then(function(e) {
        d()
    }, function(e) {
        d()
    }), e.isActive = function(e) {
        return e === r.path()
    }, e.login = function() {
        l.update().then(function(e) {
            t.isLoggedIn = !0
        }, function(e) {
            a.login()
        })
    }, e.logout = function() {
        a.logout()
    }, e.register = function() {
        a.register()
    }, t.$watch("isLoggedIn", function(e, t, n) {
        (1 == e && 0 == t || 0 == e && 1 == t) && d(!0)
    })
}]), u1AppControllers.controller("OverviewCtrl", ["$scope", "$rootScope", "Utils", "$location", "Overview", "$anchorScroll", "Features", "SubNav", "$timeout", function(e, t, n, o, r, i, a, s, l) {
    function c() {
        return $(window).width() <= 736 && (screen.width <= 736 || f >= 2)
    }

    function u() {
        return !$("html").hasClass("csstransforms3d")
    }

    function d() {
        var e = 7e3,
            t = $(".features .sample-gallery ul.front li"),
            n = $(".features .sample-gallery ul.back li"),
            o = setInterval(function() {
                var e = $(".features .sample-gallery ul.front li.active").index(),
                    o = $(".features .sample-gallery ul.back li.active").index();
                $(t[e]).removeClass("active"), $(n[o]).removeClass("active"), e++, o++, e >= t.length && (e = 0), o >= n.length && (o = 0), $(".features .sample-gallery ul.front").addClass("normal"), $(t[e]).addClass("active"), $(n[o]).addClass("active")
            }, e);
        return o
    }
    var f = window.devicePixelRatio || 1,
        m = null,
        h = f > 1 ? "@2x" : "";
    e.ratioSuffix = h;
    var p = function(e) {
            var n = {
                title: [],
                mobileTitle: {},
                breadcrumb: [],
                paginationTip: [],
                page: "",
                scroll: !1,
                currentPage: "overview",
                pageFunction: null
            };
            switch ("cn" == t.lang ? n.breadcrumb = [{
                url: "#/overview",
                title: "概览"
            }, {
                url: "#/design",
                title: "设计"
            }, {
                url: "#/features",
                title: "功能"
            }, {
                url: "#/os",
                title: "操作系统"
            }, {
                url: "#/spec",
                title: "技术规格"
            }] : "jp" == t.lang ? n.breadcrumb = [{
                url: "#/overview",
                title: "概要"
            }, {
                url: "#/design",
                title: "デザイン"
            }, {
                url: "#/features",
                title: "特徴"
            }, {
                url: "#/os",
                title: "Smartisan OS"
            }, {
                url: "#/spec",
                title: "スペック"
            }] : "en" == t.lang && (n.breadcrumb = [{
                url: "#/overview",
                title: "Overview"
            }, {
                url: "#/design",
                title: "Design"
            }, {
                url: "#/features",
                title: "Features"
            }, {
                url: "#/os",
                title: "Smartisan OS"
            }, {
                url: "#/spec",
                title: "Tech Specs"
            }]), e) {
                case "/overview":
                    n.title = ["坚果手机 - 概览"], n.paginationTip = [], n.scroll = !0, n.currentPage = "overview";
                    break;
                case "/design":
                    n.title = ["坚果手机 - 设计"], n.scroll = !1, n.currentPage = "design", $(".wrapper .main").css({
                        overflow: "visible"
                    });
                    break;
                case "/features":
                    n.title = ["坚果手机 - 功能"], n.scroll = !1, n.currentPage = "features";
                    break;
                case "/spec":
                    n.title = ["坚果手机 - 技术规格"], n.scroll = !1, n.currentPage = "spec";
                    break;
                case "/os":
                    n.title = ["坚果手机 - 操作系统"], n.page = "os-1", n.scroll = !1, n.currentPage = "os";
                    break;
                case "/os/whats-new":
                    n.title = ["坚果手机 - 操作系统 2.0 新功能"], n.currentPage = "os", n.page = "os-2", n.scroll = !1;
                    break;
                default:
                    n.title = ["坚果手机 - 概览"], n.currentPage = "overview"
            }
            return n
        },
        v = o.path(),
        g = p(v),
        w = g.title,
        b = g.mobileTitle,
        C = g.breadcrumb,
        y = g.currentPage;
    if (t.currentPage = y, e.changeOs = function(e) {
            return o.hash(e), !1
        }, "os-2" == g.page ? $(".main .os").addClass("os-2").removeClass("os-1") : $(".main .os").addClass("os-1").removeClass("os-2"), s.init(), c() || (r.reset(), 1 == g.scroll && $("html").hasClass("csstransforms3d") && (r.setPaginationTip(g.paginationTip), r.start())), 2 === w.length ? n.setTitle(w[0], w[1]) : 1 === w.length && n.setTitle(w[0]), n.setMobileTitle(b), n.setT1Crumbs({
            currentPage: y,
            list: C
        }, !0), e.specColor = "spec-color-red", e.isFirst = "first", e.changeSpecColor = function(t) {
            e.specColor != "spec-color-" + t && (e.specColor = "spec-color-" + t, e.isFirst = "")
        }, $(".os .banner .buttons a").click(function(e) {
            var t = $(this),
                n = t.attr("href"),
                o = "whats-new";
            n.indexOf("now") >= 0 && (o = "now");
            var r = $("#" + o).position().top;
            return c() && $(window).width() <= 414 && (r -= 80), history.pushState && history.pushState(null, "", "#/os#" + o), r && r > 0 && $("html,body").animate({
                scrollTop: r
            }, {
                queue: !1
            }, 500), e.preventDefault(), !1
        }), function() {
            var e = $(".os .smart-wrapper"),
                t = function() {
                    var n = e.children(".macbook-pic.active"),
                        o = e.find(".phone-usb img.active"),
                        r = n.next(".macbook-pic"),
                        i = o.next(".phone-usb img");
                    !r.length && (r = e.children(".macbook-pic").first()), !i.length && (i = e.find(".phone-usb img").first()), n.removeClass("active"), o.removeClass("active"), r.addClass("active"), i.addClass("active"), setTimeout(t, 6e3)
                };
            setTimeout(t, 6e3)
        }(), $(".design .row-5 .btn-prev, .design .row-5 .btn-next").on("click", function() {
            var e = $(".design .row-5 ul li"),
                t = e.length,
                n = $(".design .row-5 ul li.active").index(),
                o = "f" + (n + 1) + "t";
            $(this).removeClass("disabled"), $(this).siblings("a").removeClass("disabled"), "btn-prev" == $(this).attr("class") ? (1 >= n && $(this).addClass("disabled"), n >= 1 && n--) : (n > t - 3 && $(this).addClass("disabled"), t - 2 >= n && n++);
            var r = $(e.eq(n));
            return $(e).removeClass("from"), r.siblings(".active").addClass("from"), r.addClass("active").siblings().removeClass("active"), o += n + 1, r.parent("ul").attr("class", "").addClass(o), !1
        }), $(".features .btn-switch").on("click", function() {
            "ActiveXObject" in window && $(".features .row-6 .sample-gallery .fliper").addClass("fie");
            var e = "坚果手机后置摄像头实拍样张";
            return $(".sample-gallery ul.front").removeClass("normal"), $(".features .row-6").hasClass("to-front") ? ($(this).text("切换到前置"), $(".features .row-6").removeClass("to-front").addClass("to-back")) : ($(this).text("切换到后置样张"), e = "坚果手机前置摄像头", $(".features .row-6").addClass("to-front").removeClass("to-back")), $(".features .row-6 h3 ").text(e), !1
        }), $(".sample-gallery .btn-prev, .sample-gallery .btn-next").on("click", function() {
            var e = null,
                t = null,
                n = null,
                o = !0,
                r = $(".features .row.row-6").attr("class");
            if (r.indexOf("to-back") >= 0) {
                var e = $(".sample-gallery ul.back li"),
                    t = e.length;
                n = $(".sample-gallery ul.back li.active").index()
            } else {
                o = !1;
                var e = $(".sample-gallery ul.front li"),
                    t = e.length;
                n = $(".sample-gallery ul.front li.active").index(), $(".sample-gallery ul.front").addClass("normal")
            }
            return n = "btn-prev" == $(this).attr("class") ? 0 > n - 1 ? t - 1 : n - 1 : n + 1 > t - 1 ? 0 : n + 1, e.eq(n).addClass("active").siblings().removeClass("active"), o && $(".features .row-6 .btn-full").attr("href", e.eq(n).data("url")), !1
        }), c()) {
        d()
    }
    if (e.color = "red", e.changeColor = function(t) {
            e.color = t
        }, a.reset(), v.indexOf("features") >= 0 && (c() || u() ? $(".features .row-2").addClass("active") : a.init()), v.indexOf("design") >= 0 && !n.isMobile() && ($(".design .row.row-1").addClass("unfocus"), $(".design .row.row-2").addClass("unfocus"), $(".design .row.row-3").addClass("unfocus"), e.$on("$viewContentLoaded", function(e) {
            setTimeout(function() {
                var e = $(window).height(),
                    t = $(".design .row.row-1"),
                    n = $(".design .row.row-2"),
                    o = $(".design .row.row-3"),
                    r = (t.offset().top, n.offset().top, o.offset().top),
                    i = $(".design .row.row-4").offset().top;
                setTimeout(function() {
                    t.removeClass("unfocus")
                }, 12e3);
                var a = n.find(".match-left"),
                    s = (n.find(".match-right"), a.offset().top, o.find(".simple-1")),
                    l = o.find(".simple-2"),
                    c = parseInt(s.css("top")),
                    u = c / (1.5 * e);
                $(window).scroll(function() {
                    var t = $(window).scrollTop(),
                        n = t + e;
                    if (n > r && i > t) {
                        var o = -(n - r) * u;
                        o > 1 && 0 > o + c && (s.css({
                            "-webkit-transform": "translateY(" + o + "px)",
                            "-moz-transform": "translateY(" + o + "px)",
                            transform: "translateY(" + o + "px)"
                        }), l.css({
                            "-webkit-transform": "translateY(-" + o + "px)",
                            "-moz-transform": "translateY(-" + o + "px)",
                            transform: "translateY(-" + o + "px)"
                        }))
                    }
                })
            }, 500)
        }), v.indexOf("design") >= 0)) {
        var k = $(".design .timeline ul li.active"),
            x = k.attr("data-buyurl"),
            A = $(".design .row-6 .buy");
        x && "" != x ? (A.addClass("active"), A.find("a").attr({
            href: x
        })) : (A.removeClass("active"), A.find("a").attr({
            href: ""
        }))
    }
    $(".design .timeline .buttons").delegate("div", "click", function(e) {
        var t = $(this),
            n = $(".design .timeline ul li"),
            o = $(".design .timeline ul li.active").index(),
            r = null;
        n.removeClass("toLeftHide toLeftShow toRightHide toRightShow opacityHide active"), t.hasClass("btn-next") ? (r = o + 1, r >= n.length && (r = 0), $(n[o]).addClass("toLeftHide opacityHide"), $(n[r]).addClass("toLeftShow").addClass("active")) : (r = o - 1, 0 > r && (r = n.length - 1), $(n[o]).addClass("toRightHide opacityHide"), $(n[r]).addClass("toRightShow").addClass("active"));
        var i = $(n[r]).attr("data-buyurl"),
            a = $(".design .row-6 .buy");
        i && "" != i ? (a.addClass("active"), a.find("a").attr({
            href: i
        })) : (a.removeClass("active"), a.find("a").attr({
            href: ""
        }))
    }), $(".header-sub").removeClass("fixed"), v.match(/\/os$/i) && !n.isMobile() && e.$on("$viewContentLoaded", function(e) {
        setTimeout(function() {
            var e = $(".os .buttons"),
                t = e.offset().top - 65,
                n = $("#whats-new").offset().top,
                o = $("#now").offset().top,
                r = e.find("a.button-os2"),
                i = e.find("a.button-os");
            $(window).scroll(function() {
                var a = $(window).scrollTop();
                a > t ? (e.addClass("active"), $(".header-sub").addClass("fixed")) : t > a && (e.removeClass("active"), $(".header-sub").removeClass("fixed")), a >= n - 110 && o - 110 > a ? (r.addClass("active"), i.removeClass("active")) : a >= o - 110 && (i.addClass("active"), r.removeClass("active"))
            })
        })
    }), v.match(/\/os$/i) && e.$on("$viewContentLoaded", function(e) {
        function t() {
            return !$("html").hasClass("csstransforms3d")
        }
        var o = $("#lockWallpaperVideo"),
            r = $("#screenshotsVideo"),
            i = $("#rubbingPlatesVideo"),
            a = !!document.createElement("video").canPlayType;
        return !a || n.isMobile() || t() ? (o.replaceWith(function() {
            return o.find("img")
        }), r.replaceWith(function() {
            return r.find("img")
        }), void i.replaceWith(function() {
            return i.find("img")
        })) : void setTimeout(function() {
            var e = 0,
                t = 0,
                n = $(window).height(),
                a = $(".header-main"),
                s = o.data("source"),
                l = r.data("source"),
                c = i.data("source");
            f > 1 && (s = s.replace(".mp4", "@2x.mp4"), l = l.replace(".mp4", "@2x.mp4"), c = c.replace(".mp4", "@2x.mp4")), o.append('<source src="' + s + '" type="video/mp4" />'), r.append('<source src="' + l + '" type="video/mp4" />'), i.append('<source src="' + c + '" type="video/mp4" />'), $(window).scroll(function() {
                m && clearTimeout(m), m = setTimeout(function() {
                    if (e = $(window).scrollTop(), t = e + n, o.offset()) {
                        if (Math.abs(o.offset().top - (e + a.height())) < n / 2) return void o[0].play();
                        o[0].pause(), o.empty()
                    }
                    if (r.offset()) {
                        if (Math.abs(r.offset().top - (e + a.height())) < n / 2) return void r[0].play();
                        r[0].pause(), r.empty()
                    }
                    if (i.offset()) {
                        if (Math.abs(i.offset().top - (e + a.height())) < n / 2) return void i[0].play();
                        i[0].pause(), i.empty()
                    }
                }, 100)
            })
        }, 500)
    })
}]);

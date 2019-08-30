window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  DylAd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8c18Hs2QVNoY2ruupVy940", "DylAd");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        isDebug: false
      },
      onLoad: function onLoad() {
        var __isDebug = this.isDebug;
        var __debugShowad = false;
        var agent = null;
        var ads_plugin = null;
        if (__isDebug) setTimeout(function() {
          __debugShowad = true;
        }, 1e4); else {
          agent = anysdk.agentManager;
          ads_plugin = agent.getAdsPlugin();
          ads_plugin.callFuncWithParam("preloadAd");
        }
        dyl.__adFun = function() {};
        dyl.__isLoading = false;
        var show = function show() {
          if (__isDebug) cc.log("\u5047\u5e7f\u544a\u51fa\u6765\u4e86\uff0c\u54c8\u54c8\u54c8\u54c8\u54c8"); else {
            var param = anysdk.PluginParam.create("gq4XnooZ4zAyQJPiva3");
            ads_plugin.callFuncWithParam("showAd", param);
          }
        };
        dyl.addAd = function(fun) {
          fun && (dyl.__adFun = fun);
          var showad = null;
          if (__isDebug) showad = __debugShowad; else {
            var param0 = anysdk.PluginParam.create("gq4XnooZ4zAyQJPiva3");
            showad = ads_plugin.callBoolFuncWithParam("couldShowAd", param0);
          }
          if (showad) {
            show();
            dyl.__adFun();
            return true;
          }
          if (dyl.__isLoading) return false;
          dyl.__isLoading = true;
          cc.loader.loadRes("dylLoadingAd", function(err, prefab) {
            var newNode = cc.instantiate(prefab);
            var canvas = cc.director.getScene().getChildren()[0];
            canvas.addChild(newNode);
          });
          return false;
        };
      }
    });
    cc._RF.pop();
  }, {} ],
  DylBar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "627c13XFIpEA5JjMypfts2c", "DylBar");
    "use strict";
    cc.Class({
      extends: cc.Component,
      editor: {
        menu: "dyl/\u2665 \u8840\u6761",
        executeInEditMode: true
      },
      properties: {
        _isNew: true,
        _maxHp: 1,
        _hp: 1,
        _barMaxLen: 0,
        progress: {
          default: 1,
          min: 0,
          max: 1,
          slide: true,
          notify: function notify(old) {
            return this.resetProgress(old);
          }
        }
      },
      __preload: function __preload() {
        var _this = this;
        cc.bar = this;
        this.delActFun = function() {
          return null;
        };
        this.checkIsNew();
        this._bar = this.node.getChildByName("bar");
        false;
        this.node.set = function(value) {
          return _this.setFun(value);
        };
        this.node.change = function(newValue, oldValue) {
          return _this.changeFun(newValue, oldValue);
        };
        if (0 === this._barMaxLen) {
          var width = this.getSize(this._bar).x;
          if (width < 1) return cc.warn("\u8840\u6761\u603b\u957f\u5ea6\u4e3a0", width);
          this._barMaxLen = width / this.progress;
        }
      },
      getSize: function getSize(node) {
        node = node.node ? node.node : node;
        var size = node.getContentSize();
        var w = size.width;
        var h = size.height;
        return cc.v2(w, h);
      },
      resetProgress: function resetProgress(old) {
        old > 0 && (this._barMaxLen = this.getSize(this._bar).x / old);
        this._bar.width = this._barMaxLen * this.progress;
      },
      resetSpr: function resetSpr() {
        this.node.getComponent(cc.Sprite).spriteFrame = this.backSpr;
        this._bar.getComponent(cc.Sprite).spriteFrame = this.barSpr;
        var size = this.getSize(this.node);
        this._maxX = size.x * this.scaleX;
        this._maxY = size.y * this.scaleY;
        this._bar.height = this._maxY;
        this._bar.setAnchorPoint(0, .5);
        this._bar.setPosition(-.5 * this._maxX, 0);
        this.resetData();
      },
      resetData: function resetData() {
        this._maxHp <= 0 ? this._bar.width = 0 : this._bar.width = this._barMaxLen * this._hp / this._maxHp;
      },
      checkIsNew: function checkIsNew() {
        false;
        if (!this._isNew) return;
        this._isNew = false;
        this.node.getComponent(cc.Sprite) || this.node.addComponent(cc.Sprite);
        if (!this.node.getChildByName("bar")) {
          var node = new cc.Node("bar");
          this.node.addChild(node);
          node.addComponent(cc.Sprite);
          node.setAnchorPoint(0, .5);
          node.x = -.5 * this.getSize(this.node).x;
        }
        this.node.getChildByName("bar").getComponent(cc.Sprite) || cc.warn("\u5b50\u8282\u70b9\u7684bar, \u6ca1\u6709sprite\u7ec4\u4ef6");
        return;
      },
      setFun: function setFun(value) {
        if ("string" !== typeof value && "number" !== typeof value) {
          cc.warn("label \u7684string \u7684data\u7c7b\u578b\u53ea\u80fd\u662f\u5b57\u7b26\u4e32\u6216\u6570\u5b57", value);
          return;
        }
        if ("string" === typeof value) {
          this._maxHp = Number(value);
          this._maxHp < 0 && (this._maxHp = 0);
          "0" === value[0] ? this._hp = this._maxHp : this._hp > this._maxHp && (this._hp = this._maxHp);
          return this._hp;
        }
        if (value > this._maxHp) {
          this._hp = this._maxHp;
          return this._hp;
        }
        if (value < 0) {
          this._hp = 0;
          return this._hp;
        }
        this._hp = value;
      },
      changeFun: function changeFun(newValue, oldValue) {
        var _this2 = this;
        this.delActFun();
        if (this._maxHp <= 0) {
          cc.log("\u6700\u5927\u8840\u91cf\u90fd\u662f 0");
          return this._bar.width = 0;
        }
        oldValue > this._maxHp && (oldValue = this._maxHp);
        oldValue === newValue && (this._bar.width = this._barMaxLen * this._hp / this._maxHp);
        this._bar.width = this._barMaxLen * oldValue / this._maxHp;
        var v = 300;
        var flag = newValue > oldValue ? 1 : -1;
        v *= flag;
        var t = (newValue - oldValue) * this._barMaxLen / (v * this._maxHp);
        var update = function update(dt) {
          _this2._bar.width = _this2._bar.width + v * dt;
          t -= dt;
          if (t <= 0) {
            _this2._bar.width = _this2._barMaxLen * newValue / _this2._maxHp;
            return false;
          }
          return true;
        };
        this.delActFun = dyl.update(update);
      }
    });
    cc._RF.pop();
  }, {} ],
  DylButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd72cG+IilO6qAadQpr/XqC", "DylButton");
    "use strict";
    var _slicedToArray = function() {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            !_n && _i["return"] && _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i) {
        if (Array.isArray(arr)) return arr;
        if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }();
    var SceneEnum = cc.Enum({
      Null: 0,
      NextScene: 1,
      NextLevel: 2,
      Restart: 3,
      ExitGame: 4,
      Popup: 5,
      Popdown: 6,
      Buy: 7
    });
    cc.Class({
      extends: cc.Component,
      editor: {
        menu: "dyl/\u264e \u6309\u94ae",
        executeInEditMode: true,
        inspector: "packages://dyl-button/DylButton.js"
      },
      properties: {
        touchFun: {
          default: function _default() {
            return new cc.Component.EventHandler();
          },
          type: cc.Component.EventHandler,
          displayName: "\u89e6\u53d1\u4e8b\u4ef6"
        },
        nodeName: "",
        jsName: "",
        funName: "",
        popupNode: cc.Node,
        popdownNode: cc.Node,
        sceneType: {
          default: "NextLevel",
          notify: function notify() {
            "Buy" === this.sceneType && this.setBuy();
          }
        },
        nextScene: "",
        coin: {
          default: 0,
          displayName: "\u4ef7\u683c"
        },
        coinName: {
          default: "coin",
          displayName: "\u8d27\u5e01\u5355\u4f4d"
        },
        toolName: {
          default: "",
          displayName: "\u7269\u54c1\u8def\u5f84\uff08.\u9694\u5f00\uff09"
        },
        hasSetBuy: false,
        isAutoSave: {
          default: false,
          displayName: "\u662f\u5426\u8981\u81ea\u52a8\u4fdd\u5b58"
        }
      },
      __preload: function __preload() {
        false;
        this.myInit();
      },
      setBuy: function setBuy() {
        if (this.hasSetBuy) return;
        this.hasSetBuy = true;
        var node = new cc.Node("noMoney");
        this.node.addChild(node);
        node.addComponent(cc.Sprite);
        node.width = this.node.width;
        node.height = this.node.height;
        node = new cc.Node("coinNum");
        this.node.addChild(node);
        node.addComponent(cc.Label);
        node.lineHeight = this.node.height;
        node.fontSize = .8 * this.node.height;
        node = new cc.Node("hasBuy");
        this.node.addChild(node);
        node.addComponent(cc.Sprite);
        node.width = this.node.width;
        node.height = this.node.height;
      },
      getTopNode: function getTopNode() {
        return cc.director.getScene().getChildren()[0];
      },
      getSceneArr: function getSceneArr() {
        return [ "aa", "bb" ];
        var ansArr;
        var sceneInfoArr;
        var i;
        var url;
        var arr;
        var name;
      },
      myInit: function myInit() {
        var changeSpr = null;
        if (this.node.getChildByName("topSpr")) {
          changeSpr = this.node.getChildByName("topSpr");
          changeSpr.active = false;
        }
        var self = this;
        var _color = null;
        var _scale = null;
        this.node.on("touchstart", function(event) {
          if ("Buy" === self.sceneType) return;
          if (changeSpr) {
            changeSpr.active = true;
            return;
          }
          _scale = self.node.getScale();
          _color = self.node.color;
          self.node.setScale(.92 * _scale);
        });
        this.node.on("touchend", function(event) {
          if ("Buy" === self.sceneType) {
            self.onClick();
            return;
          }
          if (changeSpr) {
            changeSpr.active = false;
            self.onClick();
            return;
          }
          self.node.setScale(_scale);
          self.onClick();
        });
        this.node.on("touchcancel", function(event) {
          if ("Buy" === self.sceneType) return;
          if (changeSpr) {
            changeSpr.active = false;
            return;
          }
          self.node.setScale(_scale);
        });
        "Buy" === this.sceneType && this.initBuy();
      },
      initBuy: function initBuy() {
        var _this = this;
        this.node.add = function() {
          for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) arr[_key] = arguments[_key];
          for (var i = arr.length - 1; i >= 0; i--) {
            var val = arr[i];
            "number" === typeof val ? _this.coin = val : "string" === typeof val ? _this.toolName = val : "function" === typeof val && (_this.endCheckBuyFun = val);
          }
          _this.initBuy1();
        };
        if ("" !== this.toolName) {
          this.initBuy1();
          return;
        }
      },
      initBuy1: function initBuy1() {
        var _this2 = this;
        this.dyl_noMoneyNode = this.node.getChildByName("noMoney");
        var labNode = this.node.getChildByName("coinNum");
        if (labNode) {
          this.dyl_coinNumLab = labNode.getComponent(cc.Label);
          this.dyl_coinNumLab.string = String(this.coin);
        }
        this.dyl_hasBuyNode = this.node.getChildByName("hasBuy");
        var arr = this.toolName.split(".");
        if (1 === arr.length) {
          var id = arr[0];
          if ("number" === typeof hjm[id]) {
            this.dyl_isCanBuy = function() {
              return true;
            };
            this.dyl_buy = function() {
              hjm[id]++;
              hjm[this.coinName] -= this.coin;
            };
          } else {
            this.dyl_isCanBuy = function() {
              return !hjm[id];
            };
            this.dyl_buy = function() {
              hjm[id] = true;
              hjm[this.coinName] -= this.coin;
            };
          }
        } else {
          if (2 !== arr.length) return cc.error("\u53c2\u6570\u5e94\u8be5\u662fstr\u6216\u8005str.str", this.toolName);
          var _arr = _slicedToArray(arr, 2), name = _arr[0], _id = _arr[1];
          if (Array.isArray(hjm[name])) {
            this.dyl_isCanBuy = function() {
              return hjm[name].indexOf(_id) < 0;
            };
            this.dyl_buy = function() {
              hjm[name].push(_id);
              hjm[this.coinName] -= this.coin;
              hjm[name] = hjm[name];
            };
          } else {
            var isOnly = null;
            var toolPool = hjm[name];
            for (var i in toolPool) {
              isOnly = "number" !== typeof toolPool[i];
              break;
            }
            if (null === isOnly) return cc.warn("DylButton", this.toolName, "\u8fd9\u662f\u4e00\u4e2a\u7a7a\u5bf9\u8c61\uff0c\u4e0d\u77e5\u9053\u5230\u5e95\u662f\u4e0d\u662f\u552f\u4e00\u7269\u54c1");
            if (isOnly) {
              this.dyl_isCanBuy = function() {
                return !toolPool[_id];
              };
              this.dyl_buy = function() {
                toolPool[_id] = true;
                hjm[this.coinName] -= this.coin;
              };
            } else {
              this.dyl_isCanBuy = function() {
                return true;
              };
              _hjmIsObjTabFun(name) ? this.dyl_buy = function() {
                toolPool[_id] ? toolPool[_id]++ : toolPool[_id] = 1;
                hjm[name] = hjm[name];
                hjm[this.coinName] -= this.coin;
              } : this.dyl_buy = function() {
                toolPool[_id] ? toolPool[_id]++ : toolPool[_id] = 1;
                hjm[this.coinName] -= this.coin;
              };
            }
          }
        }
        this.dyl_updateBuy && _hjmDelArrFun(this.coinName, this.dyl_updateBuy);
        this.dyl_updateBuy = function() {
          _this2.dyl_isCanBuy() ? dyl.set(_this2.dyl_hasBuyNode, "active", false) : dyl.set(_this2.dyl_hasBuyNode, "active", true);
          hjm[_this2.coinName] < _this2.coin ? dyl.set(_this2.dyl_noMoneyNode, "active", true) : dyl.set(_this2.dyl_noMoneyNode, "active", false);
        };
        _hjmAddArrFun(this.coinName, this.dyl_updateBuy);
        this.dyl_updateBuy();
      },
      buy: function buy() {
        this.dyl_isCanBuy() && hjm[this.coinName] >= this.coin && (this.endCheckBuyFun ? this.endCheckBuyFun() && this.dyl_buy() : this.dyl_buy());
        return;
      },
      onDestroy: function onDestroy() {
        this.dyl_updateBuy && _hjmDelArrFun(this.coinName, this.dyl_updateBuy);
      },
      clickFun: function clickFun() {
        "" !== this.funName && hjm[this.nodeName].getComponent(this.jsName)[this.funName]();
      },
      onClick: function onClick() {
        var _this3 = this;
        cc.loader.load(cc.url.raw("resources/dyl/button.mp3"), function(err, sound) {
          err && cc.error(err);
          cc.audioEngine.play(sound, false, 1);
        });
        if ("NextScene" === this.sceneType) {
          this.clickFun();
          return cc.director.loadScene(this.nextScene);
        }
        if ("NextLevel" === this.sceneType) {
          this.clickFun();
          var name = cc.director.getScene().name;
          var num = name.replace(/[^0-9]/gi, "");
          var arr = name.split(num);
          if (1 === arr.length) return cc.error("\u8fd9\u4e2a\u5173\u5361\u547d\u540d\u6709\u95ee\u9898\uff0c\u4e0d\u662f\u53ea\u6709\u4e00\u4e2a\u6570\u5b57");
          num = Number(num) + 1;
          var nextName = arr[0] + String(num) + arr[1];
          return cc.director.loadScene(nextName);
        }
        if ("ExitGame" === this.sceneType) {
          this.clickFun();
          if (cc.sys.isMobile) return cc.director.end();
          if (cc.sys.isBrowser) {
            window.opener = null;
            window.open("", "_self");
            window.close();
            return;
          }
          cc.sys.isNative;
        } else {
          if ("Restart" === this.sceneType) {
            this.clickFun();
            cc.director.loadScene(cc.director.getScene().name);
            return;
          }
          if ("Popup" === this.sceneType) {
            this.clickFun();
            this.popupNode.add();
          } else "Popdown" === this.sceneType ? this.popdownNode.del(function() {
            return _this3.clickFun();
          }) : "Buy" === this.sceneType ? this.buy() : this.clickFun();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  DylLab: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1eaa+MGhdOJKV/CWWREtED", "DylLab");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    cc.Class({
      extends: cc.Component,
      editor: {
        menu: "dyl/\u32a3 \u6587\u5b57",
        inspector: "packages://dyl-nowshow/DylNotshow.js"
      },
      properties: {},
      __preload: function __preload() {
        this.dylPreload();
      },
      dylPreload: function dylPreload() {
        var _this = this;
        if (this.node._hasDylLabInit) return;
        this.node._hasDylLabInit = true;
        this._data = {};
        this.initLab();
        this.node.say = function(name, str) {
          var nodeArr = _this._data[name];
          if (!nodeArr) return cc.error("\u6ca1\u6709\u8fd9\u79cdlabel\u7684\u8282\u70b9", name);
          var labArr = [];
          for (var i = 0; i < nodeArr.length; i++) {
            var _lab = nodeArr[i].getComponent(cc.Label);
            if (_lab) {
              _lab.string = "";
              labArr.push(_lab);
            }
          }
          if (0 === labArr.length) return cc.warn("say\u6ca1\u6709label\u76f8\u5173\u7684\u8282\u70b9", name, str);
          _this._data[name].value = str;
          var _loop = function _loop(_i) {
            var id = ++labArr[_i]._dylSayId;
            var len = str.length;
            var t = .1;
            var allTime = 0;
            var fun = function fun(dt) {
              if (id !== labArr[_i]._dylSayId) return false;
              allTime += dt;
              var num = allTime / t + 1 >> 0;
              num >= len && (num = len);
              lab.string = str.slice(0, num);
              return num < len;
            };
            dyl.update(fun);
          };
          for (var _i = 0; _i < labArr.length; _i++) _loop(_i);
        };
      },
      addDataNode: function addDataNode(name, node) {
        this._data[name] ? this._data[name].push(node) : this._data[name] = [ node ];
      },
      setProgressBar: function setProgressBar(node) {
        node._dylProgressBar = node.getComponent(cc.ProgressBar);
        node.set = function(value) {
          if ("number" !== typeof value) {
            cc.warn("progressBar \u7684data\u7c7b\u578b\u53ea\u80fd\u662f\u5b57\u7b26\u4e32\u6216\u6570\u5b57", value);
            return;
          }
          value > 1 && (value = 1);
          value < 0 && (value = 0);
          this._dylProgressBar.progress = value;
          return value;
        };
        var arr = node.name.split("_");
        for (var i = 0; i < arr.length; i++) {
          var name = arr[i];
          if ("" === name) continue;
          this.addDataNode(name, node);
        }
      },
      setSameNode: function setSameNode(node) {
        var arr = node.name.split("_");
        for (var i = 0; i < arr.length; i++) {
          var name = arr[i];
          if ("" === name) continue;
          this.addDataNode(name, node);
          this._data[name].value = node;
        }
      },
      setLabel: function setLabel(node) {
        node._dylLabel = node.getComponent(cc.Label);
        node.set = function(value) {
          if ("string" !== typeof value && "number" !== typeof value) {
            cc.warn("label \u7684string \u7684data\u7c7b\u578b\u53ea\u80fd\u662f\u5b57\u7b26\u4e32\u6216\u6570\u5b57", value);
            return;
          }
          var str = String(value);
          this._dylLabel.string = str;
          this._dylLabel._dylSayId++;
        };
        node.change = function(newData, oldData) {};
        node._dylLabel._dylSayId = 0;
        var arr = node.name.split("_");
        for (var i = 0; i < arr.length; i++) {
          var name = arr[i];
          if ("" === name) continue;
          this.addDataNode(name, node);
        }
      },
      setDylNode: function setDylNode(node) {
        var arr = node.name.split("_");
        for (var i = 0; i < arr.length; i++) {
          var name = arr[i];
          if ("" === name) continue;
          this.addDataNode(name, node);
        }
      },
      setData: function setData(name, value) {
        var dataArr = this._data[name];
        Object.defineProperty(this.node, name, {
          get: function get() {
            if (void 0 === dataArr.value) return cc.error("\u6ca1\u6709\u8fd9\u4e2a\u6570\u636e", name);
            return dataArr.value;
          },
          set: function set(data) {
            if ("boolean" === typeof data) {
              for (var i = 0; i < dataArr.length; i++) {
                var node = dataArr[i];
                node.active = data;
              }
              return;
            }
            if (data && "object" === ("undefined" === typeof data ? "undefined" : _typeof(data)) && "function" !== typeof data.getChildren && void 0 !== data.x && void 0 !== data.y) {
              true === data.x && (data.x = dataArr[0].x);
              true === data.y && (data.y = dataArr[0].y);
              var p = data.sub(dataArr[0]);
              for (var _i2 = 0; _i2 < dataArr.length; _i2++) {
                var _node = dataArr[_i2];
                _node.setPosition(p.add(_node));
              }
              return;
            }
            if ("cc.Color" === cc.js.getClassName(data)) {
              for (var _i3 = 0; _i3 < dataArr.length; _i3++) {
                var _node2 = dataArr[_i3];
                _node2.color = data;
              }
              return;
            }
            if (cc.Action.prototype.isPrototypeOf(data)) {
              for (var _i4 = 0; _i4 < dataArr.length; _i4++) {
                var _node3 = dataArr[_i4];
                var tmpAct = data.clone();
                _node3.runAction(tmpAct);
              }
              return;
            }
            if (Array.isArray(data)) {
              var tmpArr = data;
              if (1 === tmpArr.length) {
                var rotation = tmpArr[0];
                for (var _i5 = 0; _i5 < dataArr.length; _i5++) {
                  var _node4 = dataArr[_i5];
                  _node4.rotation = rotation;
                }
              } else if (2 === tmpArr.length) {
                var scaleX = tmpArr[0];
                var scaleY = tmpArr[1];
                for (var _i6 = 0; _i6 < dataArr.length; _i6++) {
                  var _node5 = dataArr[_i6];
                  _node5.setScale(scaleX, scaleY);
                }
              }
            } else if ("cc.Node" === cc.js.getClassName(data) && !data.getComponent(cc.Sprite)) return cc.error("\u5982\u679c\u63a5\u53d7\u8282\u70b9\uff0c\u90a3\u5c31\u4ee3\u8868\u590d\u5236\u8fd9\u4e2a\u8282\u70b9\u7684\u7eb9\u7406\uff0c\u4f46\u4f60\u8fdecc.Sprite\u7ec4\u4ef6\u90fd\u6ca1\u6709");
            if ("function" === typeof data) {
              dataArr.notify = data;
              return;
            }
            var oldData = dataArr.value;
            while (true) {
              var isReset = false;
              for (var _i7 = 0; _i7 < dataArr.length; _i7++) {
                var _node6 = dataArr[_i7];
                if (!_node6.set) continue;
                var newData = _node6.set(data);
                if (void 0 !== newData) {
                  data = newData;
                  isReset = true;
                  break;
                }
              }
              if (!isReset) break;
            }
            dataArr.value = data;
            void 0 === oldData ? oldData = data : "function" === typeof oldData.getChildren && (oldData = data);
            for (var _i8 = 0; _i8 < dataArr.length; _i8++) {
              var _node7 = dataArr[_i8];
              "function" === typeof _node7.change && _node7.change(data, oldData);
            }
            "function" === typeof dataArr.notify && dataArr.notify(data, oldData);
          }
        });
        void 0 !== value && (this.node[name] = value);
      },
      initLab: function initLab() {
        var arr = this.node.getChildren();
        for (var i = 0; i < arr.length; i++) {
          var node = arr[i];
          var name = node.name;
          if ("say" === name) return cc.error("say \u662fapi\u7684\u540d\u5b57\uff0c\u4e0d\u80fd\u7528");
          node.getComponent("DylBar") ? this.setDylNode(node) : node.getComponent(cc.Label) || node.getComponent(cc.ProgressBar) ? node.getComponent(cc.ProgressBar) ? this.setProgressBar(node) : node.getComponent(cc.Label) ? this.setLabel(node) : cc.error("\u6211\u4e5f\u4e0d\u77e5\u9053\u6709\u4ec0\u4e48\u9519") : this.setSameNode(node);
        }
        for (var _i9 in this._data) {
          this.setData(_i9, this.node[_i9]);
          if (1 === this._data[_i9].length) {
            var spriteNode = this._data[_i9][0];
            spriteNode.getComponent(cc.Sprite) && (spriteNode.dylSpriteNodeName = _i9);
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  DylList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "578a4sw++tE7JtsD2057jFj", "DylList");
    "use strict";
    var Dir = cc.Enum({
      up: 0,
      down: 1,
      left: 2,
      right: 3
    });
    cc.Class({
      extends: cc.Component,
      editor: {
        menu: "dyl/\u5217\u8868"
      },
      properties: {
        dir: {
          default: Dir.up,
          type: Dir
        },
        d: 8,
        startP: 5,
        maxId: 0,
        isTouch: true
      },
      update: function update(dt) {},
      __preload: function __preload() {
        var _this = this;
        if (this.maxId < 0) return cc.error("\u6700\u5927\u6570\u91cf\u4e0d\u80fd\u4e3a\u8d1f\u6570");
        this.oriStartP = this.startP;
        this.isVertical = this.dir === Dir.up || this.dir === Dir.down;
        this.t = 0;
        this.addFun = null;
        this.buttonFun = null;
        this.runFun = null;
        this.nodeArr = [];
        this.poolArr = [];
        this.nodeLen = 0;
        this.startId = 0;
        this.endId = 0;
        this.len = this.isVertical ? dyl.getSize(this.node).y : dyl.getSize(this.node).x;
        if (this.len < 1) return cc.warn("DylList \u5f53\u524d\u8282\u70b9\u7684\u957f\u5ea6\u5c0f\u4e8e1", this.len);
        var nodeArr = this.node.getChildren();
        for (var i = 0; i < nodeArr.length; i++) {
          var d = this.isVertical ? dyl.getSize(nodeArr[i]).y : dyl.getSize(nodeArr[i]).x;
          if (d < 1) return cc.warn("DylList \u8fd9\u4e2a\u8282\u70b9\u7684\u957f\u5ea6\u5c0f\u4e8e1", nodeArr[i].name);
          this.poolArr.push(this.addPool(nodeArr[i], d));
          this.poolArr[i].d = d;
          this.nodeLen += d + this.d;
        }
        this.minP = this.startP;
        this.getMaxP();
        this.poolArr.add = function(id) {
          var mod = id % this.length;
          mod < 0 && (mod += this.length);
          return this[mod].add();
        };
        this.add(this.startP);
        this.node.add = function() {
          for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) arr[_key] = arguments[_key];
          if ("number" !== typeof arr[0]) {
            _this.addFun = null;
            _this.buttonFun = null;
            for (var i = 0; i < arr.length; i++) if ("function" === typeof arr[i]) _this.addFun ? _this.buttonFun = arr[i] : _this.addFun = arr[i]; else if ("number" === typeof arr[i]) {
              _this.maxId = arr[i];
              _this.getMaxP();
            }
            _this.resetArr(_this.startId, _this.endId, 0, 0);
            _this.resetPos({
              p: 0,
              sId: 0,
              eId: 0
            });
            _this.add(_this.oriStartP);
            return _this.nodeArr;
          }
          _this.add(arr[0]);
          return _this.nodeArr;
        };
        this.isTouch ? this.setTouch() : this.setButton();
      },
      getMaxP: function getMaxP() {
        if (this.maxId <= 0) {
          this.maxP = 0;
          return;
        }
        var nodeNum = this.poolArr.length;
        var n = Math.floor(this.maxId / nodeNum);
        var len = n * this.nodeLen;
        n = this.maxId - n * nodeNum;
        for (var i = 0; i < n; i++) len += this.poolArr[i].d + this.d;
        len -= this.oriStartP;
        len = len - this.d - this.len;
        this.maxP = len;
      },
      setTouch: function setTouch() {
        var self = this;
        var isMove = false;
        var touchOnP = 0;
        var preP = 0;
        var nextP = 0;
        this.node.on("touchstart", function(event) {
          var p = event.getLocation();
          if (self.runFun) {
            self.runFun();
            self.runFun = null;
          }
          isMove = false;
          touchOnP = self.isVertical ? p.y : p.x;
          preP = touchOnP;
          nextP = touchOnP;
        });
        this.node.on("touchmove", function(event) {
          var p = event.getLocation();
          isMove = true;
          preP = nextP;
          nextP = self.isVertical ? p.y : p.x;
          self.dir === Dir.right || self.dir === Dir.up ? self.add(preP - nextP + self.startP) : self.add(nextP - preP + self.startP);
        });
        var pIsInNode = function pIsInNode(p, node) {
          p = node.convertToNodeSpace(p);
          return p.x >= 0 && p.x <= node.width && p.y >= 0 && p.y <= node.height;
        };
        var touchEndFun = function touchEndFun(event) {
          var p = event.getLocation();
          if (!isMove) {
            if (self.buttonFun) for (var i = self.nodeArr.length - 1; i >= 0; i--) if (pIsInNode(p, self.nodeArr[i])) {
              var node = self.nodeArr[i];
              self.buttonFun(node.dylListId, node);
              return;
            }
            return;
          }
          if (self.startP <= self.minP || self.startP >= self.maxP) {
            self.checkOut();
            return;
          }
          if (preP + 4 < nextP) {
            self.dir === Dir.down || self.dir === Dir.left ? self.quickMove(1) : self.quickMove(-1);
            return;
          }
          if (nextP + 4 < preP) {
            self.dir === Dir.down || self.dir === Dir.left ? self.quickMove(-1) : self.quickMove(1);
            return;
          }
          self.checkOut();
        };
        this.node.on("touchend", touchEndFun);
        this.node.on("touchcancel", touchEndFun);
      },
      setButton: function setButton() {
        var _this2 = this;
        var fun = function fun(event) {
          if (!_this2.buttonFun) return;
          var p = event.getLocation();
          for (var i = _this2.nodeArr.length - 1; i >= 0; i--) {
            var rect = _this2.nodeArr[i].getBoundingBoxToWorld();
            if (rect.contains(p)) {
              var node = _this2.nodeArr[i];
              _this2.buttonFun(node.dylListId, node);
              return;
            }
          }
        };
        this.node.on("touchend", fun);
      },
      quickMove: function quickMove(dir) {
        var _this3 = this;
        var a = -300 * dir;
        var v = 600 * dir;
        var f = -16e3 * dir;
        var p = this.startP;
        var outP = dir > 0 ? this.maxP : this.minP;
        var fun = function fun(dt) {
          if ((p - outP) * dir > 0) {
            a += f * dt;
            v += a * dt;
          } else v += a * dt;
          if (v * dir <= 0) {
            _this3.runFun = null;
            _this3.checkOut();
            return false;
          }
          p += v * dt;
          _this3.add(p);
          return true;
        };
        this.runFun = dyl.update(fun);
      },
      quickOut: function quickOut(dir) {
        var _this4 = this;
        var oriPos = this.startP;
        var endPos = null;
        var len = null;
        var t = 0;
        var fun = function fun(dt) {
          t += dt;
          var r = t / time;
          if (r >= 1) {
            _this4.add(endPos);
            _this4.runFun = null;
            return false;
          }
          r = Math.sqrt(r);
          _this4.add(r * len * dir + oriPos);
          return true;
        };
        var out = function out(dt) {};
        if (endPos > this.maxP) {
          var _endPos = this.maxP;
          var _len2 = this.maxP - oriPos;
          var _time = .002 * _len2;
        } else if (endPos < this.minP) {
          var _endPos2 = this.minP;
          var _len3 = oriPos - this.minP;
          var _time2 = .002 * _len3;
        }
        this.runFun = dyl.update(fun);
      },
      checkOut: function checkOut() {
        var _this5 = this;
        if (0 === this.maxId) return;
        var oriP = this.startP;
        var endP = null;
        var time = .1;
        var t = 0;
        if (this.startP < this.minP) endP = this.minP; else if (this.minP > this.maxP) endP = this.minP; else {
          if (!(this.startP > this.maxP)) return;
          endP = this.maxP;
        }
        var fun = function fun(dt) {
          t += dt;
          _this5.add((endP - oriP) * t / time + oriP);
          if (t > time) {
            _this5.add(endP);
            _this5.runFun = null;
            return false;
          }
          return true;
        };
        this.runFun = dyl.update(fun);
      },
      getStartData: function getStartData(x) {
        var kk = x;
        var p = 0;
        var sId = 0;
        var eId = 0;
        var n = Math.floor(x / this.nodeLen);
        var mod = x - n * this.nodeLen;
        x = mod;
        n *= this.poolArr.length;
        var i = 0;
        for (i = 0; i < this.poolArr.length; i++) {
          var pool = this.poolArr[i];
          if (!(x > pool.d)) break;
          x -= pool.d + this.d;
          n++;
        }
        p = x;
        sId = n;
        x = this.poolArr[i % this.poolArr.length].d - x;
        var poolLen = this.poolArr.length;
        var len = this.len - this.d;
        while (x <= len) {
          i = (i + 1) % poolLen;
          x += this.poolArr[i].d + this.d;
          n++;
        }
        eId = n + 1;
        if (this.maxId) {
          eId > this.maxId && (eId = this.maxId);
          var _poolLen = this.poolArr.length;
          for (i = sId; i < eId && i < 0; i++) {
            var _mod = i % _poolLen;
            _mod += _poolLen;
            _mod %= _poolLen;
            var _pool = this.poolArr[_mod];
            p -= _pool.d + this.d;
            sId++;
          }
        }
        var data = {
          p: p,
          sId: sId,
          eId: eId
        };
        return data;
      },
      add: function add(x) {
        cc.log("x", x);
        this.startP = x;
        var data = this.getStartData(x);
        this.resetArr(this.startId, this.endId, data.sId, data.eId);
        this.resetPos(data);
      },
      resetPos: function resetPos(data) {
        var p = -data.p;
        for (var i = 0; i < this.nodeArr.length; i++) {
          var node = this.nodeArr[i];
          var pos = .5 * node.d + p;
          this.dir === Dir.up ? node.y = pos - .5 * this.len : this.dir === Dir.down ? node.y = .5 * this.len - pos : this.dir === Dir.right ? node.x = pos - .5 * this.len : node.x = .5 * this.len - pos;
          p += node.d + this.d;
        }
      },
      resetArr: function resetArr(s1, e1, s2, e2) {
        var _this6 = this;
        var oriArr = this.nodeArr;
        this.nodeArr = [];
        var delFun = function delFun(start, end) {
          for (var i = start; i < end; i++) oriArr[i - s1].dylDel();
        };
        var keepFun = function keepFun(start, end) {
          for (var i = start; i < end; i++) _this6.nodeArr.push(oriArr[i - s1]);
        };
        var addFun = function addFun(start, end) {
          for (var i = start; i < end; i++) {
            var node = _this6.poolArr.add(i);
            _this6.nodeArr.push(node);
            node.dylListId = i;
            _this6.addFun && _this6.addFun(i, node);
          }
        };
        if (e2 <= s1 || e1 <= s2) {
          delFun(s1, e1);
          addFun(s2, e2);
        } else {
          delFun(s1, s2);
          delFun(e2, e1);
          addFun(s2, s1);
          keepFun(Math.max(s1, s2), Math.min(e1, e2));
          addFun(e1, e2);
        }
        for (var i = this.poolArr.length - 1; i >= 0; i--) this.poolArr[i].dylReset();
        this.startId = s2;
        this.endId = e2;
      },
      addPool: function addPool(node, d) {
        var arr1 = [];
        var arr2 = [];
        arr1.push(node);
        node.dylDel = function() {
          arr1.push(this);
        };
        node.d = d;
        node.active = true;
        var pool = {};
        var topNode = this.node;
        pool.add = function() {
          if (arr1.length > 0) return arr1.pop();
          if (arr2.length > 0) {
            var _tmpNode = arr2.pop();
            _tmpNode.active = true;
            return _tmpNode;
          }
          var tmpNode = cc.instantiate(node);
          tmpNode.active = true;
          topNode.addChild(tmpNode);
          tmpNode.d = d;
          tmpNode.dylDel = function() {
            arr1.push(this);
          };
          return tmpNode;
        };
        pool.dylReset = function() {
          for (var i = arr1.length - 1; i >= 0; i--) {
            arr1[i].active = false;
            arr2.push(arr1[i]);
          }
          arr1.length = 0;
        };
        return pool;
      }
    });
    cc._RF.pop();
  }, {} ],
  DylMain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16386x0i1VC7q9eDPwQmRQm", "DylMain");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    function _toArray(arr) {
      return Array.isArray(arr) ? arr : Array.from(arr);
    }
    var Effect = cc.Enum({
      Null: 0,
      SmallBig: 1,
      Red: 2,
      Shake: 3
    });
    cc.Class({
      extends: cc.Component,
      editor: {
        menu: "dyl/\u2622 \u4e3b\u903b\u8f91",
        executeInEditMode: true,
        inspector: "packages://dyl-main/DylMain.js"
      },
      properties: {
        touch: "",
        isPhysics: {
          default: false,
          displayName: "\u7269\u7406"
        },
        isShowDebug: {
          default: false,
          displayName: "\u8c03\u8bd5"
        },
        gravity: {
          default: cc.v2(0, -320),
          displayName: "\u91cd\u529b"
        }
      },
      _refresh: function _refresh() {
        return;
      },
      __preload: function __preload() {
        false;
        this.myInit();
      },
      onEnable: function onEnable() {},
      initPhysics: function initPhysics() {
        if (!this.isPhysics) return;
        cc.director.getPhysicsManager().enabled = true;
        this.isShowDebug ? cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit : cc.director.getPhysicsManager().debugDrawFlags = 0;
        cc.director.getPhysicsManager().gravity = this.gravity;
      },
      myInit: function myInit() {
        this.initPhysics();
        "" !== this.touch && this.setTouch();
      },
      onDestroy: function onDestroy() {
        var data = this.__loadData;
        for (var i in data) cc.loader.releaseRes(i);
      },
      setTouch: function setTouch() {
        var node = this.node;
        var dylButtonNode = null;
        node.button = node.button ? node.button : [];
        var findButtonFun = function findButtonFun(worldPos, nodeArr) {
          for (var i = 0; i < nodeArr.length; i++) {
            if (!nodeArr[i].active) continue;
            var rect = nodeArr[i].getBoundingBoxToWorld();
            if (rect.contains(worldPos)) return nodeArr[i];
          }
          return null;
        };
        var dylTouchState = this.node.touch;
        var dylTouchArgArr = [];
        Object.defineProperty(this.node, "touch", {
          get: function get() {
            return dylTouchState;
          },
          set: function set(data) {
            if (Array.isArray(data)) {
              var _data = _toArray(data);
              dylTouchState = _data[0];
              dylTouchArgArr = _data.slice(1);
            } else {
              dylTouchState = data;
              dylTouchArgArr = [];
            }
            "string" !== typeof dylTouchState && cc.warn("touch\u7684\u72b6\u6001\u5e94\u8be5\u662f\u5b57\u7b26\u4e32\uff0c\u8fd9\u91cc\u5374\u4e0d\u662f", "undefined" === typeof dylTouchState ? "undefined" : _typeof(dylTouchState), dylTouchState);
          }
        });
        this.node.touch || (this.node.touch = "touch");
        var js = this.node.getComponent(this.touch);
        var nowTouchState = this.node.touch;
        var fun = function fun(event) {
          var eventPos = event.getLocation();
          var pos = cc.v2(node.convertToNodeSpace(eventPos));
          var size = node.getContentSize();
          var _ref = [ size.width, size.height ], w = _ref[0], h = _ref[1];
          var _ref2 = [ w / 2, h / 2 ];
          w = _ref2[0];
          h = _ref2[1];
          pos.subSelf(cc.v2(w, h));
          pos.in = function() {
            for (var _len = arguments.length, nodeArr = Array(_len), _key = 0; _key < _len; _key++) nodeArr[_key] = arguments[_key];
            return findButtonFun(eventPos, nodeArr);
          };
          return pos;
        };
        var data = true;
        var checkData = function checkData(tmpName, tmpData) {
          if (tmpData && true !== tmpData && !Array.isArray(tmpData)) return cc.warn("touch" + tmpName + "return data \u4e0d\u662ftrue\uff0c\u4e0d\u662f\u5426\uff0c\u4e5f\u4e0d\u662f\u6570\u7ec4", dylTouchState, tmpData);
          Array.isArray(tmpData) && (dylTouchArgArr = tmpData);
        };
        var lastPos_1 = null;
        var isHasLong = false;
        var longId = 0;
        var isOnLong = false;
        this.node.on("touchstart", function(event) {
          dylButtonNode = findButtonFun(event.getLocation(), node.button);
          if (dylButtonNode) {
            js.buttonOn && js.buttonOn(dylButtonNode);
            return true;
          }
          if (!node.touch) {
            data = null;
            return null;
          }
          nowTouchState = node.touch;
          var pos = fun(event);
          longId++;
          lastPos_1 = pos;
          isOnLong = false;
          isHasLong = js[node.touch + "LongOn"] || js[node.touch + "LongUp"] || js[node.touch + "LongOut"] || js[node.touch + "LongEnd"];
          if (isHasLong) {
            var tmpLongId = longId;
            setTimeout(function() {
              if (tmpLongId !== longId) return;
              if (nowTouchState !== node.touch) return null;
              isOnLong = true;
              data = !js[node.touch + "LongOn"] || js[node.touch + "LongOn"].apply(js, [ lastPos_1 ].concat(_toConsumableArray(dylTouchArgArr)));
              checkData("on", data);
            }, 500);
          }
          data = !js[node.touch + "On"] || js[node.touch + "On"].apply(js, [ pos ].concat(_toConsumableArray(dylTouchArgArr)));
          checkData("on", data);
        });
        this.node.on("touchmove", function(event) {
          if (dylButtonNode) return true;
          if (!data) return null;
          if (nowTouchState !== node.touch) return null;
          var pos = fun(event);
          lastPos_1 = pos;
          data = !js[node.touch + "Move"] || js[node.touch + "Move"].apply(js, [ pos ].concat(_toConsumableArray(dylTouchArgArr)));
          checkData("move", data);
        }, this);
        this.node.on("touchend", function(event) {
          if (dylButtonNode) {
            js.buttonEnd ? js.buttonEnd(dylButtonNode) : js.buttonUp && js.buttonUp(dylButtonNode);
            return true;
          }
          longId++;
          if (!data) return null;
          if (nowTouchState !== node.touch) return null;
          var pos = fun(event);
          if (js[node.touch + "LongEnd"] && isOnLong) {
            data = js[node.touch + "LongEnd"].apply(js, [ pos ].concat(_toConsumableArray(dylTouchArgArr)));
            checkData("longEnd", data);
            return;
          }
          if (js[node.touch + "LongUp"] && isOnLong) {
            data = js[node.touch + "LongUp"].apply(js, [ pos ].concat(_toConsumableArray(dylTouchArgArr)));
            checkData("longUp", data);
            return;
          }
          if (js[node.touch + "End"]) {
            data = js[node.touch + "End"].apply(js, [ pos ].concat(_toConsumableArray(dylTouchArgArr)));
            checkData("end", data);
            return;
          }
          if (js[node.touch + "Up"]) {
            data = js[node.touch + "Up"].apply(js, [ pos ].concat(_toConsumableArray(dylTouchArgArr)));
            checkData("up", data);
          } else data = true;
        }, this);
        this.node.on("touchcancel", function(event) {
          if (dylButtonNode) {
            js.buttonEnd ? js.buttonEnd(dylButtonNode) : js.buttonOut && js.buttonOut(dylButtonNode);
            return true;
          }
          longId++;
          if (!data) return null;
          if (nowTouchState !== node.touch) return null;
          var pos = fun(event);
          if (js[node.touch + "LongEnd"] && isOnLong) {
            data = js[node.touch + "LongEnd"].apply(js, [ pos ].concat(_toConsumableArray(dylTouchArgArr)));
            checkData("longEnd", data);
            return;
          }
          if (js[node.touch + "LongOut"] && isOnLong) {
            data = js[node.touch + "LongOut"].apply(js, [ pos ].concat(_toConsumableArray(dylTouchArgArr)));
            checkData("longOut", data);
            return;
          }
          if (js[node.touch + "End"]) {
            data = js[node.touch + "End"](pos, data);
            checkData("end", data);
            return;
          }
          if (js[node.touch + "Out"]) {
            data = js[node.touch + "Out"](pos, data);
            checkData("out", data);
          } else data = true;
        }, this);
      },
      setRun: function setRun() {
        var self = this;
        this.node.run = function() {
          var root = function root() {};
          var node0 = arguments[0];
          var createFun = function createFun(act, endFun) {
            var fun = function fun() {
              act();
              endFun();
            };
            return fun;
          };
          var createJsFun = function createJsFun(act, endFun) {
            var fun = function fun() {
              self.node.js[act]();
              endFun();
            };
            return fun;
          };
          var createArr = function createArr(act, endFun) {
            var fun = function fun() {
              var arr = act;
              arr.push(function() {
                return null;
              });
              var counterNum = arr.length;
              var delFun = function delFun() {
                counterNum--;
                counterNum <= 0 && endFun();
              };
              for (var i = 0; i < arr.length; i++) create(arr[i], function() {
                delFun();
              })();
            };
            return fun;
          };
          var createOther = function createOther(act, endFun) {
            var fun = function fun() {
              var node = act.node;
              node.node && (node = node.node);
              if (act.add && act.add > 0) act.easing(cc.easeIn(act.add)); else if (act.add && act.add < 0) {
                var inout = cc.easeInOut(-act.add);
                act.easing(cc.easeInOut(-act.add));
              }
              var cfun = cc.callFunc(function() {
                endFun();
              });
              var seq = cc.sequence(act, cfun);
              node.runAction(seq);
            };
            return fun;
          };
          var createMove = function createMove(act, endFun) {
            var fun = function fun() {
              var node = node0;
              node.node && (node = node.node);
              if (act.add && act.add > 0) act.easing(cc.easeIn(act.add)); else if (act.add && act.add < 0) {
                var inout = cc.easeInOut(-act.add);
                act.easing(cc.easeInOut(-act.add));
              }
              var cfun = cc.callFunc(endFun);
              var seq = cc.sequence(act, cfun);
              node.runAction(seq);
            };
            return fun;
          };
          var createDelay = function createDelay(act, endFun) {
            var fun = function fun() {
              var node = node0;
              node.node && (node = node.node);
              var delay = cc.delayTime(act);
              var cfun = cc.callFunc(endFun);
              var seq = cc.sequence(delay, cfun);
              node.runAction(seq);
            };
            return fun;
          };
          var create = function create(act, endFun) {
            return "function" === typeof act ? createFun(act, endFun) : "number" === typeof act ? createDelay(act, endFun) : "string" === typeof act ? createJsFun(act, endFun) : Array.isArray(act) ? createArr(act, endFun) : act.node ? createOther(act, endFun) : createMove(act, endFun);
          };
          for (var i = arguments.length - 1; i > 0; i--) {
            var act = arguments[i];
            root = create(act, root);
          }
          root();
        };
      },
      setRand: function setRand() {
        var __randNum = this.rand;
        var maxNum = 4671341;
        this.node.rand = function(n) {
          __randNum = (30853 * __randNum + 253) % maxNum;
          var r = __randNum / maxNum;
          return n ? Math.floor(r * n) : r;
        };
        this.node.rand.set = function(num) {
          __randNum = num;
        };
      }
    });
    cc._RF.pop();
  }, {} ],
  DylPool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34f084lYpFNQo1fsLe3Vr4s", "DylPool");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    cc.Class({
      extends: cc.Component,
      editor: {
        menu: "dyl/\u2668 \u5bf9\u8c61\u6c60"
      },
      properties: {
        isEffect: false
      },
      logPath: function logPath(node) {
        var str = "";
        var fun = function fun(node) {
          if (!node) return;
          str = node.name + " " + str;
          fun(node.parent);
        };
        fun(this.node);
        cc.log(str);
      },
      __preload: function __preload() {
        var arr = this.node._components;
        for (var i = 0; i < arr.length; i++) if (arr[i] === this) {
          arr.splice(i, 1);
          break;
        }
        this.preInit();
        this.initPool();
      },
      preInit: function preInit() {
        var nodeArr = [].concat(_toConsumableArray(this.node.getChildren()));
        for (var i = 0; i < nodeArr.length; i++) nodeArr[i].parent = this.node.parent;
        var nowNodePos = cc.v2(this.node);
        this.node.setPosition(cc.v2(0, 0));
        var newNode = cc.instantiate(this.node);
        newNode.dylSpriteNodeName = newNode.name;
        newNode.name = "tmp";
        var components = [].concat(_toConsumableArray(this.node._components));
        for (var _i = components.length - 1; _i >= 0; _i--) components[_i].destroy();
        for (var _i2 = 0; _i2 < nodeArr.length; _i2++) nodeArr[_i2].parent = newNode;
        newNode.setPosition(this.node);
        this.node.setPosition(nowNodePos);
        newNode.parent = this.node;
      },
      myPlay: function myPlay(node, str) {
        var nodeArr = [ node ].concat(_toConsumableArray(node.getChildren()));
        var counter = dyl.counter(function() {
          return node.del();
        }, nodeArr.length);
        for (var i = 0; i < nodeArr.length; i++) this.playNode(nodeArr[i], str, counter);
      },
      setColor: function setColor(node, color) {
        if (null === color) return;
        var nodeArr = [ node ].concat(_toConsumableArray(node.getChildren()));
        for (var i = nodeArr.length - 1; i >= 0; i--) nodeArr[i].color = color;
      },
      playNode: function playNode(node, str, counter) {
        if (node.getComponent(cc.ParticleSystem)) return this.playParticleSystem(node, counter);
        if (node.getComponent(cc.Animation)) return this.playAnimation(node, counter);
        if (node.getComponent(cc.Label)) return this.playLabel(node, str, counter);
        counter();
      },
      playAnimation: function playAnimation(node, counter) {
        var animation = node.getComponent(cc.Animation);
        var endFun = function endFun() {
          animation.off("finished", endFun);
          counter();
        };
        animation.on("finished", endFun);
        animation.play();
      },
      playLabel: function playLabel(node, str, counter) {
        var lab = node.getComponent(cc.Label);
        lab.string = String(str);
        var num = Number(str);
        node.color = num < 0 ? cc.color(255, 10, 10) : num > 0 ? cc.color(10, 255, 10) : cc.color(255, 255, 255);
        node.setPosition(cc.v2(0, 0));
        node.opacity = 255;
        var time = .5;
        tz(node)("1_pool")._moveBy(time, cc.v2(0, 200))._fadeTo(time, 0)(counter)();
      },
      playParticleSystem: function playParticleSystem(node, counter) {
        var particleSystem = node.getComponent(cc.ParticleSystem);
        particleSystem.resetSystem();
        var time = particleSystem.duration + particleSystem.life + particleSystem.lifeVar;
        tz("2_pool")(time)(counter)();
      },
      resetDylNode: function resetDylNode(node, componentName) {
        var js = node.getComponent(componentName);
        if (!js) return;
        js.__preload();
      },
      initPool: function initPool() {
        var testThis = this;
        var node = this.node.getChildren()[0];
        this.resetDylNode(node, "DylLab");
        node.active = false;
        var pool = [];
        var delPool = [];
        delPool.push(node);
        this.isEffect ? node.del = function() {
          this.active = false;
          delPool.push(this);
          var id = this.__poolId;
          pool[id] = pool[pool.length - 1];
          pool[id].__poolId = id;
          pool.length = pool.length - 1;
          this.__poolId = null;
        } : node.del = function() {
          this.active = false;
          delPool.push(this);
          var id = pool.indexOf(this);
          if (-1 === id) return cc.error("\u8fd9\u4e2a\u8282\u70b9\u5df2\u7ecf\u88ab\u5220\u9664\u4e86\uff0c\u4e0d\u80fd\u518d\u5220\u9664", this.name, id, pool, this);
          pool.splice(id, 1);
          pool[this.name] === this && (pool[this.name] = null);
        };
        var self = this;
        this.isEffect ? this.node.add = function() {
          cc.log("isEffect");
          var pos = null;
          var str = null;
          var color = null;
          for (var _len = arguments.length, argArr = Array(_len), _key = 0; _key < _len; _key++) argArr[_key] = arguments[_key];
          for (var i = argArr.length - 1; i >= 0; i--) {
            var data = argArr[i];
            var type = "undefined" === typeof data ? "undefined" : _typeof(data);
            if ("string" === type || "number" === type) {
              str = data;
              continue;
            }
            type = cc.js.getClassName(data);
            if ("cc.Vec2" === type || "cc.Node" === type) {
              pos = data;
              continue;
            }
            if ("cc.Color" === type) {
              color = data;
              continue;
            }
          }
          var node = null;
          if (delPool.length < 1) {
            node = cc.instantiate(pool[0]);
            node.parent = this;
            node.del = function() {
              this.active = false;
              delPool.push(this);
              var id = this.__poolId;
              pool[id] = pool[pool.length - 1];
              pool[id].__poolId = id;
              pool.length = pool.length - 1;
              this.__poolId = null;
            };
          } else {
            node = delPool[delPool.length - 1];
            delPool.length = delPool.length - 1;
            node.active = true;
          }
          node.__poolId = pool.length;
          pool.push(node);
          if (null === pos) return cc.warn("\u4f4d\u7f6e\u6ca1\u6709\u8bbe\u7f6e");
          node.setPosition(pos);
          self.setColor(node, color);
          self.myPlay(node, str);
          return node;
        } : this.node.add = function(nodeName) {
          var node = null;
          if (delPool.length < 1) {
            node = cc.instantiate(pool[0]);
            node.parent = this;
            node.del = function() {
              this.active = false;
              delPool.push(this);
              var id = pool.indexOf(this);
              if (-1 === id) return cc.error("\u8fd9\u4e2a\u8282\u70b9\u5df2\u7ecf\u88ab\u5220\u9664\u4e86\uff0c\u4e0d\u80fd\u518d\u5220\u9664", this.name, id, pool, this);
              pool.splice(id, 1);
              pool[this.name] === this && (pool[this.name] = null);
            };
          } else {
            node = delPool[delPool.length - 1];
            delPool.length = delPool.length - 1;
            node.active = true;
          }
          pool.push(node);
          if (void 0 !== nodeName) {
            node.name = nodeName;
            pool[nodeName] = node;
          }
          return node;
        };
        this.node.pool = pool;
      }
    });
    cc._RF.pop();
  }, {} ],
  DylTileMap: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b877KCI9xM9Iv8hDcLvFg0", "DylTileMap");
    "use strict";
    cc.Class({
      extends: cc.Component,
      editor: {
        menu: "dyl/\u25a6 \u74e6\u5757\u5730\u56fe",
        inspector: "packages://dyl-nowshow/DylNotshow.js"
      },
      properties: {},
      __preload: function __preload() {
        this.initTileMap();
      },
      initTileMap: function initTileMap() {
        var tmx = this.node.getComponent(cc.TiledMap);
        var mapSize = tmx.getMapSize();
        var tileD = tmx.getTileSize().width;
        this.node.map = dyl.addMap(mapSize.width, mapSize.height);
        this.node.posMap = dyl.addMapLayer(mapSize.width, mapSize.height, tileD);
        this.node.add = function(layerName, fun) {
          var layer = node.getChildByName(layerName).getComponent(cc.TiledLayer);
          if (layer) {
            var size = layer.getLayerSize();
            var d = layer.getMapTileSize().width;
            for (var x = size.width - 1; x >= 0; x--) for (var y = size.height - 1; y >= 0; y--) {
              var gid = layer.getTileGIDAt(x, size.height - y - 1);
              fun(cc.v2(x, y), gid);
            }
            map.d = d;
            return map;
          }
          layer = tmx.getObjectGroup(layerName);
          var arr = layer.getObjects();
          for (var i = arr.length - 1; i >= 0; i--) {
            var _x = arr[i].x / tileD;
            var _y = arr[i].y / tileD;
            fun(cc.v2(_x, mapSize.height - _y - 1), arr[i].name);
          }
        };
      }
    });
    cc._RF.pop();
  }, {} ],
  DylWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f1099pPj+FP3oIXYJMx8XLx", "DylWindow");
    "use strict";
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    var NodeData = cc.Class({
      name: "NodeData",
      properties: {
        id: "",
        node: cc.Node,
        p: cc.v2(0, 0),
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        anchorX: .5,
        anchorY: .5,
        height: 0,
        width: 0,
        color: cc.color(255, 255, 255),
        opacity: 255,
        skewX: 0,
        skewY: 0,
        active: true,
        lab: ""
      }
    });
    var NodeDataArr = cc.Class({
      name: "NodeDataArr",
      properties: {
        arr: [ NodeData ]
      }
    });
    cc.Class({
      extends: cc.Component,
      editor: {
        menu: "dyl/\u2603 \u5f39\u7a97",
        executeInEditMode: true,
        inspector: "packages://dyl-window/DylWindow.js"
      },
      ctor: function ctor() {
        Object.defineProperty(this, "node", {
          get: function get() {
            return;
          },
          set: function set(node) {
            delete this.node;
            this.node = node;
            this._myInit();
          },
          configurable: true
        });
      },
      properties: {
        defaultData: {
          default: null,
          type: NodeDataArr
        },
        data: {
          default: [],
          type: NodeDataArr,
          visible: false
        },
        showData: "default",
        _stateArr: {
          default: [],
          type: cc.String
        },
        stateArr: {
          default: [],
          type: cc.String
        }
      },
      _myInit: function _myInit() {
        var _this = this;
        this.node.add = function(state) {
          var fun = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
          return _this.addFun(state, fun);
        };
        this.node.del = function() {
          var fun = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
          return _this.delFun(fun);
        };
      },
      getAction: function getAction(seq, from, to) {
        if (!to.node.active) return [];
        var time = 0;
        var fun = function fun(t) {
          time = time > t ? time : t;
        };
        var getTime = function getTime(name, r) {
          fun(.4 * Math.abs(to[name] - from[name]) / r);
        };
        fun(.4 * to.p.sub(from.p).mag() / 540);
        getTime("rotation", 60);
        getTime("scaleX", .7);
        getTime("scaleY", .7);
        getTime("opacity", 150);
        if (time < 1e-4) return [];
        seq.moveTo(to.node, time, to.p).rotateTo(to.node, time, to.rotation).scaleTo(to.node, time, to.scaleX, to.scaleY).fadeTo(to.node, time, to.opacity);
      },
      notActChange: function notActChange(dataArr) {
        for (var i = dataArr.length - 1; i >= 0; i--) {
          var _dataArr$i = dataArr[i], node = _dataArr$i.node, anchorX = _dataArr$i.anchorX, anchorY = _dataArr$i.anchorY, height = _dataArr$i.height, width = _dataArr$i.width, color = _dataArr$i.color, skewX = _dataArr$i.skewX, skewY = _dataArr$i.skewY, active = _dataArr$i.active, lab = _dataArr$i.lab;
          node.active = active;
          node.anchorX = anchorX;
          node.anchorY = anchorY;
          node.height = height;
          node.width = width;
          node.color = color;
          node.skewX = skewX;
          node.skewY = skewY;
          node.getComponent(cc.Label) && (node.getComponent(cc.Label).string = lab);
        }
      },
      addFun: function addFun(state, fun) {
        state ? this.showData = state : state = this.showData;
        if ("default" === state) return this._read("default");
        this._read("default");
        var dataArr = this.data[this.stateArr.indexOf(state)].arr;
        this.notActChange(dataArr);
        var seq = tz();
        seq._();
        for (var i = dataArr.length - 1; i >= 0; i--) this.getAction(seq, this.defaultData.arr[i], dataArr[i]);
        seq._()();
      },
      delFun: function delFun(fun) {
        var _this2 = this;
        if (!this.node.active) {
          fun();
          return;
        }
        if ("default" === this.showData) return this.node.active = false;
        var dataArr = this.data[this.stateArr.indexOf(this.showData)].arr;
        var seq = tz();
        seq._();
        for (var i = dataArr.length - 1; i >= 0; i--) this.getAction(seq, dataArr[i], this.defaultData.arr[i]);
        seq._()(function() {
          _this2.node.active = false;
          fun();
        })();
      },
      myAct: function myAct(time) {
        var _this3 = this;
        if (!time) return;
        this.node.active = true;
        var oriScale = this.node.scale;
        var oriOpacity = this.node.opacity;
        var scaleR = time > 0 ? 2 : 1;
        var opacityR = time > 0 ? 0 : 1;
        var node = this.node;
        node.stopAllActions();
        node.setScale(oriScale * scaleR);
        node.opacity = oriOpacity * opacityR;
        var fade = cc.fadeTo(Math.abs(time), oriOpacity * (1 - opacityR));
        var scale = cc.scaleTo(Math.abs(time), oriScale * (3 - scaleR));
        var cfun = cc.callFunc(function() {
          _this3.node.opacity = oriOpacity;
          _this3.node.setScale(oriScale);
          _this3.node.active = time > 0;
        });
        var seq = cc.sequence(cc.spawn(fade, scale), cfun);
        node.runAction(seq);
      },
      _getString: function _getString(str) {
        return str.replace(/\s+/g, "");
      },
      _read: function _read(name) {
        var dataArr = null;
        if ("default" === name) dataArr = this.defaultData.arr; else for (var i = this.stateArr.length - 1; i >= 0; i--) this.stateArr[i] === name && (dataArr = this.data[i].arr);
        for (var _i = dataArr.length - 1; _i >= 0; _i--) {
          if (!dataArr[_i].node) continue;
          var node = dataArr[_i].node;
          var data = dataArr[_i];
          node.setPosition(data.p);
          node.rotation = data.rotation;
          node.scaleX = data.scaleX;
          node.scaleY = data.scaleY;
          node.anchorX = data.anchorX;
          node.anchorY = data.anchorY;
          node.color = data.color;
          node.opacity = data.opacity;
          node.skewX = data.skewX;
          node.skewY = data.skewY;
          var lab = node.getComponent(cc.Label);
          lab && (lab.string = data.lab);
          if ("Canvas" === node.name) {
            var canvas = this.node.getComponent(cc.Canvas);
            canvas.designResolution = cc.size(data.width, data.height);
          } else {
            node.height = data.height;
            node.width = data.width;
          }
          node.active = data.active;
        }
      },
      buttonSave: function buttonSave(name) {
        if ("default" === name) {
          this.defaultData = this._getSaveData();
          return;
        }
        for (var i = this.stateArr.length - 1; i >= 0; i--) this.stateArr[i] === name && (this.data[i] = this._getSaveData());
      },
      _save: function _save(id, value, oldValue) {
        this.stateArr[id] = value;
        if ("default" === value) {
          this.defaultData = this._getSaveData();
          this.stateArr[id] = "";
          return;
        }
        this.data[id] = this._getSaveData();
        "" === value && (this.stateArr[id] = oldValue);
        for (var i = this.stateArr.length - 1; i >= 0; i--) if (this.stateArr[i] === this.stateArr[id] && i !== id) {
          this.stateArr[id] = "";
          return;
        }
      },
      _getSaveData: function _getSaveData() {
        var saveData = new NodeDataArr();
        saveData.arr = this._getSaveNodeArr(this.node);
        return saveData;
      },
      _getSaveNodeArr: function _getSaveNodeArr(node) {
        var arr = [ this._addNodeData(node) ];
        var nodeArr = node.getChildren();
        for (var i = nodeArr.length - 1; i >= 0; i--) arr.push.apply(arr, _toConsumableArray(this._getSaveNodeArr(nodeArr[i])));
        return arr;
      },
      _addNodeData: function _addNodeData(node) {
        var nodeData = new NodeData();
        nodeData.id = node.name;
        nodeData.node = node;
        nodeData.p = cc.v2(node);
        nodeData.rotation = node.rotation;
        nodeData.scaleX = node.scaleX;
        nodeData.scaleY = node.scaleY;
        nodeData.anchorX = node.anchorX;
        nodeData.anchorY = node.anchorY;
        nodeData.height = node.height;
        nodeData.width = node.width;
        nodeData.color = node.color;
        nodeData.opacity = node.opacity;
        nodeData.skewX = node.skewX;
        nodeData.skewY = node.skewY;
        nodeData.active = node.active;
        var lab = node.getComponent(cc.Label);
        lab && (nodeData.lab = lab.string);
        return nodeData;
      },
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          return null;
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  DylWuli: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "74127pcqJhKea7hsJnefXpC", "DylWuli");
    "use strict";
    cc.Class({
      extends: cc.Component,
      editor: {
        menu: "dyl/\u2604 \u7269\u7406",
        executeInEditMode: true,
        inspector: "packages://dyl-nowshow/DylNotshow.js"
      },
      properties: {
        collisionFun: {
          default: function _default() {
            return new cc.Component.EventHandler();
          },
          type: cc.Component.EventHandler
        }
      },
      __preload: function __preload() {
        var rigidbody = this.node.getComponent(cc.RigidBody);
        Object.defineProperty(this.node, "v", {
          get: function get() {
            return rigidbody.linearVelocity;
          },
          set: function set(velocity) {
            rigidbody.linearVelocity = velocity;
          }
        });
        Object.defineProperty(this.node, "f", {
          get: function get() {
            return rigidbody.linearDamping;
          },
          set: function set(damping) {
            rigidbody.linearDamping = damping;
          }
        });
        Object.defineProperty(this.node, "a", {
          set: function set(force) {
            rigidbody.applyForceToCenter(force);
          }
        });
        rigidbody.fixedRotation = true;
        rigidbody.enabledContactListener = true;
        "" !== this.collisionFun.handler && (this.collisionComponent = this.collisionFun.target.getComponent(this.collisionFun.component));
      },
      onEnable: function onEnable() {
        false;
      },
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        if (!this.collisionComponent) return;
        contact.disabled = this.collisionComponent[this.collisionFun.handler](otherCollider.node);
      }
    });
    cc._RF.pop();
  }, {} ],
  GameMain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8d46e23seZI9rvlxOKOILa7", "GameMain");
    "use strict";
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.initVar();
        this.initRole();
        this.initBuff();
      },
      start: function start() {
        this.node.touch = "stand";
        this.showHero();
      },
      initBuff: function initBuff() {
        var arr = hjm._buffLayer.getChildren();
        for (var i = 0; i < arr.length; i++) {
          var buff = arr[i];
          buff.type = "buff";
        }
      },
      endGame: function endGame(isWin) {
        this.ballStop();
        hjm._endLab = [ true ];
        if (isWin) {
          if (!ai.isWin) {
            hjm.levelArr = [].concat(_toConsumableArray(hjm.levelArr), [ 2 ]);
            ai.isWin = true;
          }
          hjm._endLab.str = "\u80dc \u5229";
        } else hjm._endLab.str = "\u5931 \u8d25";
      },
      initRole: function initRole() {
        var self = this;
        var copyData = function copyData(role, tab) {
          role.hp = "0" + tab.hp;
          role.oriData = tab;
          role.resetData = function() {
            this.atk = this.oriData.atk;
            this.def = this.oriData.def;
            this.buff = this.oriData.buff;
          };
          "en" === role.type && (role.def = function(oldVale, newValue) {
            if (role.def < 0) {
              role.hp += role.def;
              role.def = 0;
              if (role.hp <= 0) {
                hjm._buffLayer[role.name] = true;
                role.active = false;
                0 === --self._enNum && self.endGame(true);
              }
            }
          });
          var updateFun = dyl.update();
          updateFun.\u66fe\u68e0 = self.\u66fe\u68e0++;
          var ii = 0;
          var color = role.color;
          var hurtNode = "en" === role.type ? role : hjm._heroDataLab;
          role.hurtAct = function(v) {
            var _this = this;
            var t = .2;
            this.en = v.mul(10 / v.mag());
            this.spr = cc.color(255, 255, 255);
            var vv = ii++;
            cc.log("\u66fe\u68e0", updateFun.\u66fe\u68e0, "start", vv);
            updateFun(function(dt) {
              t -= dt;
              if (t >= 0) return true;
              _this.en = cc.v2(0, 0);
              _this.spr = color;
              cc.log("\u66fe\u68e0", updateFun.\u66fe\u68e0, "end", vv);
              return false;
            });
          };
          role.resetData();
          tab.showStr && (role.showStr = tab.showStr);
        };
        var heroTab = {
          hp: 20,
          atk: 1,
          def: 0,
          buff: []
        };
        copyData(hjm._hero, heroTab);
        hjm._hero.atk = function(value) {
          hjm._heroDataLab.atk = value;
        };
        hjm._hero.hp = function(value) {
          hjm._heroDataLab.hp = value;
        };
        hjm._hero.def = function(value) {
          hjm._heroDataLab.def = value;
          var role = hjm._hero;
          if (role.def < 0) {
            role.hp += role.def;
            role.def = 0;
            if (role.hp <= 0) {
              cc.log(role.name, "\u5df2\u7ecf\u9635\u4ea1\u4e86");
              self.endGame(false);
            }
          }
        };
        var enArr = hjm._enLayer.getChildren();
        var en1Tab = {
          hp: 5,
          atk: 1,
          def: 5,
          showStr: "\u4e00\u4e2a\u6709\u62a4\u7532\u7684\u5c0f\u602a\u800c\u5df2",
          buff: []
        };
        enArr[0].name = "en1";
        enArr[0].type = "en";
        copyData(enArr[0], en1Tab);
        var en2Tab = {
          hp: 20,
          atk: 3,
          def: 0,
          showStr: "\u653b\u51fb\u529b\u6bd4\u8f83\u9ad8\uff0c\u6709\u70b9\u4f24",
          buff: []
        };
        enArr[1].name = "en2";
        enArr[1].type = "en";
        copyData(enArr[1], en2Tab);
      },
      showRoleData: function showRoleData(role, showLab) {
        hjm._heroDataLab = [ false ];
        hjm._enDataLab = [ false ];
        hjm._buffDataLab = [ false ];
        showLab.active = true;
        showLab.hp = role.hp;
        showLab.atk = role.atk;
        showLab.def = role.def;
        showLab.showStr = role.showStr;
      },
      showHero: function showHero() {
        this.showRoleData(hjm._hero, hjm._heroDataLab);
      },
      showEn: function showEn(en) {
        this.showRoleData(en, hjm._enDataLab);
        hjm._enDataLab.en = en.en;
      },
      showBuff: function showBuff(buff) {},
      initVar: function initVar() {
        this._enNum = 2;
      },
      standOn: function standOn(p) {
        if (p.in(hjm._skillButtonLayer)) return;
        hjm._moveLab = [ true ];
        hjm._moveLab.arrow = false;
        hjm._moveLab.spr1 = p;
        hjm._moveLab.spr2 = p;
        return [ p ];
      },
      standMove: function standMove(pos, oriP) {
        hjm._moveLab.spr2 = pos;
        var p = pos.sub(oriP);
        if (p.magSqr() < 2) {
          hjm._moveLab.arrow = false;
          return [ oriP ];
        }
        hjm._moveLab.arrow = true;
        hjm._moveLab.arrow = cc.v2(hjm._hero);
        hjm._moveLab.arrow = [ this.pToAngle(p.mul(-1)) ];
        return [ oriP, p ];
      },
      standEnd: function standEnd(pos, oriP, p) {
        hjm._moveLab = [ false ];
        p && this.ballMove(p.mul(-1));
      },
      pToAngle: function pToAngle(p) {
        var x = p.x;
        var y = p.y;
        var minNum = .001;
        if (-minNum <= x && x <= minNum) return p.y > 0 ? -90 : 90;
        if (-minNum <= y && y <= minNum) return p.x > 0 ? 0 : 180;
        var tan = y / x;
        var angle = 180 * Math.atan(tan) / Math.PI;
        x < 0 && (angle += 180);
        return -angle;
      },
      ballMove: function ballMove(p) {
        hjm._hero.back = true;
        var len = p.mag();
        p = p.mul(1 / len);
        var speed = 2e3;
        this.moveData = hjm._hero.add(p.mul(speed));
        this.node.touch = "move";
        this.showHero();
      },
      ballStop: function ballStop() {
        this.node.touch = "stand";
        var roleArr = [ hjm._hero ].concat(_toConsumableArray(hjm._enLayer.getChildren()));
        for (var i = 0; i < roleArr.length; i++) roleArr[i].resetData();
        hjm._hero.back = false;
        this.showHero();
      },
      moveOn: function moveOn(p) {
        this.ballStop();
      },
      ballXBox: function ballXBox(op, r, v, box) {
        var bp = cc.v2(box);
        var p = bp.sub(op);
        if (p.x * v.x + p.y * v.y <= 0) return false;
        var a = v.y;
        var b = -v.x;
        var c = v.x * op.y - op.x * v.y;
      },
      onBeginContact: function onBeginContact(box) {
        if (!box) return;
        var type = box.type;
        if ("en" === type) {
          var hero = hjm._hero;
          var en = box;
          hero.def -= en.atk;
          en.def -= hero.atk;
          hjm._hpPool.add(cc.v2(en), -hero.atk);
          hjm._hpPool.add(cc.v2(-480, -890), -en.atk);
        } else "buff" === type && hjm._hero.atk++;
      },
      update: function update(dt) {
        if ("move" !== this.node.touch) return;
        var data = this.moveData;
        data.t += dt;
        var ball = hjm._hero;
        if (data.t >= data.maxT) {
          ball.setPosition(data.maxT * data.v.x + data.ox, data.maxT * data.v.y + data.oy);
          this.onBeginContact(data.box);
          cc.log("...........");
          cc.log(data.box);
          if (data.box) {
            hjm._hurt.add(cc.v2(ball).add(data.box).mul(.5));
            cc.log(data.box);
            cc.log(data.box.type);
            if ("en" === data.box.type) {
              cc.log("eeeeeeeeeeee");
              ball.hurtAct(cc.v2(data.v.mul(-1)));
              data.box.hurtAct(cc.v2(data.v));
            }
          }
          this.moveData = hjm._hero.add(cc.v2(data.vx, data.vy), data.t - data.maxT);
        } else ball.setPosition(data.t * data.v.x + data.ox, data.t * data.v.y + data.oy);
        var angle = this.pToAngle(this.moveData.v.mul(-1));
        ball.tail = [ angle ];
        var len = 12 * data.t;
        len > 4 && (len = 4);
        ball.tail = [ len, true ];
      }
    });
    cc._RF.pop();
  }, {} ],
  LevelScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b5deenHs1lAzqaF6+xAWmLr", "LevelScene");
    "use strict";
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        ai.isWin = false;
      },
      buttonAdd: function buttonAdd() {
        hjm._buttonTop = [ cc.v2(hjm._buttonLayer.buttonAdd) ];
        this.node.touch = "add";
      },
      buttonSub: function buttonSub() {
        hjm._buttonTop = [ cc.v2(hjm._buttonLayer.buttonSub) ];
        this.node.touch = "sub";
      },
      buttonMove: function buttonMove() {
        hjm._buttonTop = [ cc.v2(hjm._buttonLayer.buttonMove) ];
        this.node.touch = "move";
      },
      buttonFlag: function buttonFlag() {
        hjm._buttonTop = [ cc.v2(hjm._buttonLayer.buttonFlag) ];
        this.node.touch = "flag";
      },
      buttonPlay: function buttonPlay() {
        hjm._buttonTop = [ cc.v2(hjm._buttonLayer.buttonPlay) ];
        this.node.touch = "play";
      },
      addOn: function addOn(p) {
        var node = hjm._yDotPool.add();
        p.x = Math.floor(p.x);
        p.y = Math.floor(p.y);
        node.setPosition(p);
        var dataArr = this.dataArr;
        var data = {
          node: node,
          type: 0,
          pos: cc.v2(p),
          levelId: null
        };
        dataArr.push(data);
      },
      getDataId: function getDataId(p) {
        var arr = [].concat(_toConsumableArray(this.dataArr));
        dyl.arr(arr, function(id, node) {
          if (node.pos) return [ node.node ];
        });
        var node = p.in.apply(p, _toConsumableArray(arr));
        if (!node) return null;
        return dyl.get(arr, node);
      },
      subOn: function subOn(p) {
        var id = this.getDataId(p);
        if (null === id) return;
        this.dataArr[id].node.del();
        dyl.set(this.dataArr, id, 1);
      },
      flagOn: function flagOn(p) {
        var id = this.getDataId(p);
        if (null === id) return;
        var data = this.dataArr[id];
        if (0 === data.type) {
          cc.log("\u53d8\u7ea2");
          var node = hjm._rDotPool.add();
          data.node.del();
          data.node = node;
          node.setPosition(data.pos);
          data.type = 1;
        } else {
          cc.log("\u53d8\u9ec4");
          var _node = hjm._yDotPool.add();
          data.node.del();
          data.node = _node;
          _node.setPosition(data.pos);
          data.type = 0;
        }
      },
      moveOn: function moveOn(p) {
        var id = this.getDataId(p);
        if (null === id) return;
        return [ this.dataArr[id] ];
      },
      moveMove: function moveMove(p, data) {
        p.x = Math.floor(p.x);
        p.y = Math.floor(p.y);
        data.node.setPosition(p);
        data.pos = p;
        return [ data ];
      },
      playOn: function playOn(p) {
        var id = this.getDataId(p);
        if (null === id) return;
        var data = this.dataArr[id];
        null !== data.levelId && cc.director.loadScene("play");
      },
      start: function start() {
        this.dataArr = [];
        this.initData([ 0, -179, 321, 0, -190, 380, 1, -146, -350, 0, -104, -347, 0, -78, -338, 1, -42, -321, 0, 6, -291, 0, 22, -249, 0, -30, -214, 0, -65, -170, 1, -53, -142, 0, 13, -95, 0, 13, -11, 1, -67, 50, 0, -96, 83, 0, -96, 133, 0, -91, 139, 0, -45, 176, 0, -12, 202, 1, 26, 228, 0, -186, 325 ]);
        this.initLevel();
        this.node.touch = "play";
        dyl.button(this, hjm._buttonLayer);
        cc.hh = this;
      },
      initLevel: function initLevel() {
        var arr = hjm.levelArr;
        var dataId = 0;
        for (var i = 0; i < arr.length; i++) {
          var num = arr[i];
          if (!num) break;
          for (var j = dataId; j < this.dataArr.length; j++) {
            var data = this.dataArr[j];
            if (1 === data.type) {
              dataId = j + 1;
              data.node.num = num;
              data.levelId = i;
              break;
            }
          }
        }
        for (var _i = dataId; _i < this.dataArr.length; _i++) {
          var _data = this.dataArr[_i];
          if (1 === _data.type) {
            _data.node.num = 0;
            _data.levelId = 0;
            break;
          }
        }
      },
      initData: function initData(arr) {
        for (var i = 0; i < arr.length; i += 3) {
          var data = {};
          data.type = arr[i];
          var x = arr[i + 1];
          var y = arr[i + 2];
          var pos = cc.v2(x, y);
          data.pos = pos;
          data.levelId = null;
          if (0 === data.type) {
            var node = hjm._yDotPool.add();
            node.setPosition(pos);
            data.node = node;
          } else {
            var _node2 = hjm._rDotPool.add();
            _node2.setPosition(pos);
            data.node = _node2;
          }
          this.dataArr.push(data);
        }
      },
      showData: function showData() {
        var arr = [];
        for (var i = 0; i < this.dataArr.length; i++) {
          var data = this.dataArr[i];
          arr.push(data.type, data.pos.x, data.pos.y);
        }
        cc.log("[" + String(arr) + "]");
      }
    });
    cc._RF.pop();
  }, {} ],
  StartScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7281voIRBJU4VfSUNPDU4F", "StartScene");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.t = 0;
      },
      update: function update(dt) {
        this.t += dt;
        hjm._top.add(10 * this.t);
        var y = 10 * this.t;
        var r = 20;
        y -= Math.floor(y / r) * r;
        hjm._logo.y = 130 + Math.abs(y - .5 * r);
      }
    });
    cc._RF.pop();
  }, {} ],
  Zxp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6142dAbdApGX5eT/1TU7etj", "Zxp");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      getCollisionData: function getCollisionData(op, r, v, boxArr) {
        var up = 960;
        var down = -810;
        var left = -540;
        var right = 540;
        this.minT = 1e5;
        this.collisionData = {
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0
        };
        var vx = v.x;
        var vy = v.y;
        var a = vy;
        var b = -vx;
        var c = vx * op.y - op.x * vy;
        var ox = op.x;
        var oy = op.y;
        for (var i = boxArr.length - 1; i >= 0; i--) {
          var _boxArr$i = boxArr[i], x = _boxArr$i.x, y = _boxArr$i.y, w = _boxArr$i.w, h = _boxArr$i.h;
          var sx = x - op.x;
          var sy = y - op.y;
          if (sx * vx + sy * vy <= 0) continue;
          var dx = 0;
          var dy = 0;
          var _minNum = 1e-4;
          if (vx < -_minNum) {
            var checkData = this.checkXLine(x + w, y - h, y + h, a, b, c, ox - r, oy, ox, oy, vx, vy, r);
            if (checkData) continue;
            dx = 1;
          } else if (vx > _minNum) {
            var _checkData = this.checkXLine(x - w, y - h, y + h, a, b, c, ox + r, oy, ox, oy, vx, vy, r);
            if (_checkData) continue;
            dx = -1;
          }
          if (vy < -_minNum) {
            var _checkData2 = this.checkYLine(y + h, x - h, x + h, a, b, c, ox, oy - r, ox, oy, vx, vy, r);
            if (_checkData2) continue;
            dy = 1;
          } else if (vy > _minNum) {
            var _checkData3 = this.checkYLine(y - h, x - h, x + h, a, b, c, ox, oy + r, ox, oy, vx, vy, r);
            if (_checkData3) continue;
            dy = -1;
          }
          if (0 === dx) {
            this.checkDot(x - w, dy * h + y, vx, vy, ox, oy, r);
            this.checkDot(x + w, dy * h + y, vx, vy, ox, oy, r);
          } else if (0 === dy) {
            this.checkDot(dx * w + x, y - h, vx, vy, ox, oy, r);
            this.checkDot(dx * w + x, y + h, vx, vy, ox, oy, r);
          } else {
            this.checkDot(dx * w + x, dy * h + y, vx, vy, ox, oy, r);
            this.checkDot(-dx * w + x, dy * h + y, vx, vy, ox, oy, r);
            this.checkDot(dx * w + x, -dy * h + y, vx, vy, ox, oy, r);
          }
        }
        vx > minNum ? this.checkXLine(right, up, down, a, b, c, ox + r, oy, ox, oy, vx, vy, r) : vx < -minNum && this.checkXLine(left, up, down, a, b, c, ox - r, oy, ox, oy, vx, vy, r);
        vy > minNum ? this.checkYLine(up, left, right, a, b, c, ox, oy + r, ox, oy, vx, vy, r) : vy < -minNum && this.checkYLine(down, left, right, a, b, c, ox, oy - r, ox, oy, vx, vy, r);
      },
      checkDot: function checkDot(x, y, vx, vy, ox, oy, r) {
        var kx = ox - x;
        var ky = oy - y;
        var a = vx * vx + vy * vy;
        var b = 2 * (vx * kx + vy * ky);
        var c = kx * kx + ky * ky - r * r;
        var k = b * b - 4 * a * c;
        if (k < 0) return false;
        var t = .5 * (-b - k) / a;
        if (t >= this.minT) return false;
        var collisionData = {
          ox: ox + vx * t,
          oy: oy + vy * t,
          vx: -vx,
          vy: vy
        };
        this.collisionData = collisionData;
        this.minT = t;
        return true;
      },
      checkXLine: function checkXLine(x, y1, y2, a, b, c, x0, y0, ox, oy, vx, vy, r) {
        var k = a * (x - x0) - b * y0;
        if ((k + b * y1) * (k + b * y2) <= 0) {
          var t = (x - x0) / vx;
          if (t >= this.minT) return true;
          var collisionData = {
            ox: ox + vx * t,
            oy: oy + vy * t,
            vx: -vx,
            vy: vy
          };
          this.collisionData = collisionData;
          this.minT = t;
          return true;
        }
        return false;
      },
      checkYLine: function checkYLine(y, x1, x2, a, b, c, x0, y0, ox, oy, vx, vy, r) {
        var k = b * (y - y0) - a * x0;
        if ((k + a * x1) * (k + a * x2) <= 0) {
          var t = (y - y0) / vy;
          if (t >= this.minT) return true;
          var collisionData = {
            ox: ox + vx * t,
            oy: oy + vy * t,
            vx: vx,
            vy: -vy
          };
          this.collisionData = collisionData;
          this.minT = t;
          return true;
        }
        return false;
      }
    });
    cc._RF.pop();
  }, {} ],
  ball: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36092/sn3pKx6eAqy1a5l9t", "ball");
    "use strict";
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        var _this = this;
        var r = .5 * this.node.width;
        var arr = [].concat(_toConsumableArray(hjm._enLayer.getChildren()), _toConsumableArray(hjm._buffLayer.getChildren()));
        dyl.arr(arr, function(id, node) {
          node.w = .5 * node.width;
          node.h = .5 * node.height;
        });
        this.boxArr = arr;
        this.node.add = function(v, t) {
          _this.getCollisionData(cc.v2(_this.node), r, v, arr);
          _this.collisionData.maxT = _this.minT;
          _this.collisionData.t = t || 0;
          _this.collisionData.v = v;
          return _this.collisionData;
        };
      },
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        var type = otherCollider.type;
        if ("en" === type) {
          var hero = hjm._hero;
          var en = otherCollider;
          hero.def -= en.atk;
          en.def -= hero.atk;
          hjm._hpPool.add(cc.v2(en), -hero.atk);
          hjm._hpPool.add(cc.v2(-480, -890), -en.atk);
        } else "buff" === type && hjm._hero.atk++;
      },
      getCollisionData: function getCollisionData(op, r, v, boxArr) {
        var up = 960;
        var down = -810;
        var left = -540;
        var right = 540;
        this.minT = 1e5;
        this.collisionData = {
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
          box: null
        };
        var vx = v.x;
        var vy = v.y;
        var a = vy;
        var b = -vx;
        var c = vx * op.y - op.x * vy;
        var ox = op.x;
        var oy = op.y;
        var minNum = 1e-4;
        for (var i = boxArr.length - 1; i >= 0; i--) {
          if (!boxArr[i].active) continue;
          var _boxArr$i = boxArr[i], x = _boxArr$i.x, y = _boxArr$i.y, w = _boxArr$i.w, h = _boxArr$i.h;
          var sx = x - op.x;
          var sy = y - op.y;
          if (sx * vx + sy * vy <= 0) continue;
          var dx = 0;
          var dy = 0;
          if (vx < -minNum) {
            var checkData = this.checkXLine(x + w, y - h, y + h, a, b, c, ox - r, oy, ox, oy, vx, vy, r, boxArr[i]);
            if (checkData) continue;
            dx = 1;
          } else if (vx > minNum) {
            var _checkData = this.checkXLine(x - w, y - h, y + h, a, b, c, ox + r, oy, ox, oy, vx, vy, r, boxArr[i]);
            if (_checkData) continue;
            dx = -1;
          }
          if (vy < -minNum) {
            var _checkData2 = this.checkYLine(y + h, x - w, x + w, a, b, c, ox, oy - r, ox, oy, vx, vy, r, boxArr[i]);
            if (_checkData2) continue;
            dy = 1;
          } else if (vy > minNum) {
            var _checkData3 = this.checkYLine(y - h, x - w, x + w, a, b, c, ox, oy + r, ox, oy, vx, vy, r, boxArr[i]);
            if (_checkData3) continue;
            dy = -1;
          }
          if (0 === dx) {
            this.checkDot(x - w, dy * h + y, vx, vy, ox, oy, r, boxArr[i]);
            this.checkDot(x + w, dy * h + y, vx, vy, ox, oy, r, boxArr[i]);
          } else if (0 === dy) {
            this.checkDot(dx * w + x, y - h, vx, vy, ox, oy, r, boxArr[i]);
            this.checkDot(dx * w + x, y + h, vx, vy, ox, oy, r, boxArr[i]);
          } else {
            this.checkDot(dx * w + x, dy * h + y, vx, vy, ox, oy, r, boxArr[i]);
            this.checkDot(-dx * w + x, dy * h + y, vx, vy, ox, oy, r, boxArr[i]);
            this.checkDot(dx * w + x, -dy * h + y, vx, vy, ox, oy, r, boxArr[i]);
          }
        }
        vx > minNum ? this.checkXLine(right, up, down, a, b, c, ox + r, oy, ox, oy, vx, vy, r, null) : vx < -minNum && this.checkXLine(left, up, down, a, b, c, ox - r, oy, ox, oy, vx, vy, r, null);
        vy > minNum ? this.checkYLine(up, left, right, a, b, c, ox, oy + r, ox, oy, vx, vy, r, null) : vy < -minNum && this.checkYLine(down, left, right, a, b, c, ox, oy - r, ox, oy, vx, vy, r, null);
      },
      checkDot: function checkDot(x, y, vx, vy, ox, oy, r, box) {
        var kx = ox - x;
        var ky = oy - y;
        var a = vx * vx + vy * vy;
        var b = 2 * (vx * kx + vy * ky);
        var c = kx * kx + ky * ky - r * r;
        var k = b * b - 4 * a * c;
        if (k <= 0) return false;
        k = Math.sqrt(k);
        var t = .5 * (-b - k) / a;
        if (t >= this.minT) return false;
        var px = x - (ox + vx * t);
        var py = y - (oy + vy * t);
        var tmp = Math.sqrt(px * px + py * py);
        px /= tmp;
        py /= tmp;
        var len = px * vx + py * vy;
        px = -2 * px * len;
        py = -2 * py * len;
        var collisionData = {
          ox: ox,
          oy: oy,
          vx: vx + px,
          vy: vy + py,
          box: box
        };
        this.collisionData = collisionData;
        this.minT = t;
        return true;
      },
      checkXLine: function checkXLine(x, y1, y2, a, b, c, x0, y0, ox, oy, vx, vy, r, box) {
        var k = a * (x - x0) - b * y0;
        if ((k + b * y1) * (k + b * y2) <= 0) {
          var t = (x - x0) / vx;
          if (t >= this.minT) return true;
          var collisionData = {
            ox: ox,
            oy: oy,
            vx: -vx,
            vy: vy,
            box: box
          };
          this.collisionData = collisionData;
          this.minT = t;
          return true;
        }
        return false;
      },
      checkYLine: function checkYLine(y, x1, x2, a, b, c, x0, y0, ox, oy, vx, vy, r, box) {
        var k = b * (y - y0) - a * x0;
        if ((k + a * x1) * (k + a * x2) <= 0) {
          var t = (y - y0) / vy;
          if (t >= this.minT) return true;
          var collisionData = {
            ox: ox,
            oy: oy,
            vx: vx,
            vy: -vy,
            box: box
          };
          this.collisionData = collisionData;
          this.minT = t;
          return true;
        }
        return false;
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "DylAd", "DylBar", "DylButton", "DylLab", "DylList", "DylMain", "DylPool", "DylTileMap", "DylWindow", "DylWuli", "GameMain", "LevelScene", "StartScene", "Zxp", "ball" ]);
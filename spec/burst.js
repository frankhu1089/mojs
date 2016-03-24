(function() {
  var Burst, Swirl, Transit, h, t;

  Transit = mojs.Transit;

  Swirl = mojs.Swirl;

  Burst = mojs.Burst;

  t = mojs.tweener;

  h = mojs.h;

  describe('Burst ->', function() {
    beforeEach(function() {
      return t.removeAll();
    });
    describe('extension ->', function() {
      return it('should extend Transit class', function() {
        var burst;
        burst = new Burst;
        return expect(burst instanceof Swirl).toBe(true);
      });
    });
    describe('initialization ->', function() {
      it('should have _defaults', function() {
        var b, s;
        b = new Burst;
        s = new Swirl;
        delete b._defaults.count;
        delete b._defaults.randomAngle;
        delete b._defaults.randomRadius;
        delete b._defaults.degree;
        return expect(b._defaults).toEqual(s._defaults);
      });
      it('should add Burts properties', function() {
        var b;
        b = new Burst;
        expect(b._defaults.degree).toBe(360);
        return expect(b._defaults.count).toBe(5);
      });
      it('should have _childDefaults', function() {
        var b, key, s, value, _ref, _ref1;
        b = new Burst;
        s = new Swirl;
        b._childDefaults.radius = s._defaults.radius;
        _ref = h.tweenOptionMap;
        for (key in _ref) {
          value = _ref[key];
          delete b._childDefaults[key];
        }
        _ref1 = h.callbacksMap;
        for (key in _ref1) {
          value = _ref1[key];
          delete b._childDefaults[key];
        }
        return expect(b._childDefaults).toEqual(s._defaults);
      });
      it('should modify radius on _childDefaults', function() {
        var b, s;
        b = new Burst;
        s = new Swirl;
        return expect(b._childDefaults.radius[5]).toBe(0);
      });
      it('should add tween options to _childDefaults', function() {
        var b, key, value, _ref, _ref1, _results;
        b = new Burst;
        _ref = h.tweenOptionMap;
        for (key in _ref) {
          value = _ref[key];
          expect(b._childDefaults[key]).toBe(null);
        }
        _ref1 = h.callbacksMap;
        _results = [];
        for (key in _ref1) {
          value = _ref1[key];
          _results.push(expect(b._childDefaults[key]).toBe(null));
        }
        return _results;
      });
      return it('should have _optionsIntersection', function() {
        var b, s;
        b = new Burst;
        s = new Swirl;
        expect(b._optionsIntersection['radius']).toBe(1);
        expect(b._optionsIntersection['radiusX']).toBe(1);
        expect(b._optionsIntersection['radiusY']).toBe(1);
        expect(b._optionsIntersection['angle']).toBe(1);
        expect(b._optionsIntersection['opacity']).toBe(1);
        return expect(b._optionsIntersection['scale']).toBe(1);
      });
    });
    describe('_createBit method ->', function() {
      it('should create _swirls array', function() {
        var b;
        b = new Burst;
        b._createBit();
        return expect(b._swirls.length).toBe(b._props.count);
      });
      it('should pass index to the swirls', function() {
        var b;
        b = new Burst;
        b._createBit();
        expect(b._swirls[0]._o.index).toBe(0);
        expect(b._swirls[1]._o.index).toBe(1);
        expect(b._swirls[2]._o.index).toBe(2);
        expect(b._swirls[3]._o.index).toBe(3);
        return expect(b._swirls[4]._o.index).toBe(4);
      });
      it('should pass isTimelineLess option to the swirls', function() {
        var b;
        b = new Burst;
        b._createBit();
        expect(b._swirls[0]._o.isTimelineLess).toBe(true);
        expect(b._swirls[1]._o.isTimelineLess).toBe(true);
        expect(b._swirls[2]._o.isTimelineLess).toBe(true);
        expect(b._swirls[3]._o.isTimelineLess).toBe(true);
        return expect(b._swirls[4]._o.isTimelineLess).toBe(true);
      });
      return it('should pass options to swirls', function() {
        var b, key, options0, options1, options2, _results;
        b = new Burst;
        b._createBit();
        options0 = b._getOption(0);
        delete options0.callbacksContext;
        for (key in options0) {
          expect(b._swirls[0]._o[key]).toEqual(options0[key]);
        }
        options1 = b._getOption(1);
        delete options1.callbacksContext;
        for (key in options1) {
          expect(b._swirls[1]._o[key]).toEqual(options1[key]);
        }
        options2 = b._getOption(2);
        delete options2.callbacksContext;
        _results = [];
        for (key in options2) {
          _results.push(expect(b._swirls[2]._o[key]).toEqual(options2[key]));
        }
        return _results;
      });
    });
    describe('_getPropByMod method ->', function() {
      it('should fallback to empty object', function() {
        var burst, opt0;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        opt0 = burst._getPropByMod('radius', 0);
        return expect(opt0).toBe(void 0);
      });
      it('should return the prop from passed object based on index ->', function() {
        var burst, opt0, opt1, opt2, opt8;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        opt0 = burst._getPropByMod('radius', 0, burst._o.childOptions);
        opt1 = burst._getPropByMod('radius', 1, burst._o.childOptions);
        opt2 = burst._getPropByMod('radius', 2, burst._o.childOptions);
        opt8 = burst._getPropByMod('radius', 8, burst._o.childOptions);
        expect(opt0[20]).toBe(50);
        expect(opt1).toBe(20);
        expect(opt2).toBe('500');
        return expect(opt8).toBe('500');
      });
      it('should the same prop if not an array ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          childOptions: {
            radius: 20
          }
        });
        opt0 = burst._getPropByMod('radius', 0, burst._o.childOptions);
        opt1 = burst._getPropByMod('radius', 1, burst._o.childOptions);
        opt8 = burst._getPropByMod('radius', 8, burst._o.childOptions);
        expect(opt0).toBe(20);
        expect(opt1).toBe(20);
        return expect(opt8).toBe(20);
      });
      return it('should work with another options object ->', function() {
        var burst, from, opt0, opt1, opt8;
        burst = new Burst({
          radius: 40,
          childOptions: {
            radius: 20
          }
        });
        from = burst._o;
        opt0 = burst._getPropByMod('radius', 0, from);
        opt1 = burst._getPropByMod('radius', 1, from);
        opt8 = burst._getPropByMod('radius', 8, from);
        expect(opt0).toBe(40);
        expect(opt1).toBe(40);
        return expect(opt8).toBe(40);
      });
    });
    describe('_getOption method ->', function() {
      it('should return an option obj based on i ->', function() {
        var burst, option0, option1, option7;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        option7 = burst._getOption(7);
        expect(option0.radius[20]).toBe(50);
        expect(option1.radius).toBe(20);
        return expect(option7.radius).toBe(20);
      });
      it('should try to fallback to childDefaiults first ->', function() {
        var burst, option0, option1, option7, option8;
        burst = new Burst({
          duration: 2000,
          childOptions: {
            radius: [200, null, '500']
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        option7 = burst._getOption(7);
        option8 = burst._getOption(8);
        expect(option0.radius).toBe(200);
        expect(option1.radius[5]).toBe(0);
        expect(option7.radius[5]).toBe(0);
        return expect(option8.radius).toBe('500');
      });
      it('should fallback to parent prop if defined  ->', function() {
        var burst, option0, option1, option7, option8;
        burst = new Burst({
          fill: 2000,
          childOptions: {
            fill: [200, null, '500']
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        option7 = burst._getOption(7);
        option8 = burst._getOption(8);
        expect(option0.fill).toBe(200);
        expect(option1.fill).toBe(2000);
        expect(option7.fill).toBe(2000);
        return expect(option8.fill).toBe('500');
      });
      it('should fallback to parent default ->', function() {
        var burst, option0, option1, option7, option8;
        burst = new Burst({
          childOptions: {
            fill: [200, null, '500']
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        option7 = burst._getOption(7);
        option8 = burst._getOption(8);
        expect(option0.fill).toBe(200);
        expect(option1.fill).toBe('deeppink');
        expect(option7.fill).toBe('deeppink');
        return expect(option8.fill).toBe('500');
      });
      it('should have all the props filled ->', function() {
        var burst, option0, option1, option7, option8;
        burst = new Burst({
          childOptions: {
            duration: [200, null, '500']
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        option7 = burst._getOption(7);
        option8 = burst._getOption(8);
        expect(option0.radius[5]).toBe(0);
        expect(option1.radius[5]).toBe(0);
        expect(option7.radius[5]).toBe(0);
        return expect(option8.radius[5]).toBe(0);
      });
      it('should have parent only options ->', function() {
        var burst, option0;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          },
          angle: {
            50: 0
          }
        });
        option0 = burst._getOption(0);
        expect(option0.radius[5]).toBe(0);
        return expect(option0.angle).toBe(90);
      });
      it('should parse stagger ->', function() {
        var burst, option0, option1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2,
          childOptions: {
            angle: 'stagger(20, 40)'
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        expect(option0.angle).toBe(90 + 20.);
        return expect(option1.angle).toBe(270 + (20 + 40));
      });
      return it('should parse rand ->', function() {
        var burst, option0, option1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2,
          childOptions: {
            angle: 'rand(20, 40)'
          }
        });
        option0 = burst._getOption(0);
        option1 = burst._getOption(1);
        expect(option0.angle).toBeGreaterThan(90 + 20.);
        return expect(option1.angle).not.toBeGreaterThan(270 + (20 + 40));
      });
    });
    describe('_calcSize method ->', function() {
      it('should calc set size to 2', function() {
        var bs;
        bs = new Burst;
        expect(bs._props.size).toBe(2);
        return expect(bs._props.center).toBe(1);
      });
      return it('should recieve size', function() {
        var bs;
        bs = new Burst({
          size: 40
        });
        expect(bs._props.size).toBe(40);
        return expect(bs._props.center).toBe(20);
      });
    });
    describe('_draw method ->', function() {
      return it('should call _drawEl method ->', function() {
        var bs;
        bs = new Burst;
        spyOn(bs, '_drawEl');
        bs._draw();
        return expect(bs._drawEl).toHaveBeenCalled();
      });
    });
    describe('_transformTweenOptions method', function() {
      it('should call _applyCallbackOverrides with _o.timeline', function() {
        var tr;
        tr = new Burst({
          timeline: {
            delay: 200
          }
        });
        spyOn(tr, '_applyCallbackOverrides').and.callThrough();
        tr._transformTweenOptions();
        return expect(tr._applyCallbackOverrides).toHaveBeenCalledWith(tr._o.timeline);
      });
      return it('should fallback to an empty `timeline options` object on _o', function() {
        var tr;
        tr = new Transit;
        return expect(tr._o.timeline).toBeDefined();
      });
    });
    describe('_makeTimeline method ->', function() {
      it('should call super _makeTimeline', function() {
        var bs;
        bs = new Burst;
        spyOn(Burst.prototype, '_makeTimeline');
        bs._makeTimeline();
        return expect(Burst.prototype._makeTimeline).toHaveBeenCalled();
      });
      return it('should add swirls to the timeline', function() {
        var bs;
        bs = new Burst;
        bs.timeline._timelines.length = 0;
        bs._makeTimeline();
        return expect(bs.timeline._timelines.length).toBe(bs._defaults.count);
      });
    });
    describe('_makeTween method ->', function() {
      return it('should override parent', function() {
        var bs;
        bs = new Burst;
        spyOn(mojs.Tweenable.prototype, '_makeTween');
        bs._makeTween();
        return expect(mojs.Tweenable.prototype._makeTween).not.toHaveBeenCalled();
      });
    });
    describe('_getSidePoint method ->', function() {
      return it('should return the side\'s point', function() {
        var burst, point;
        burst = new Burst({
          radius: {
            5: 25
          },
          radiusX: {
            10: 20
          },
          radiusY: {
            30: 10
          }
        });
        point = burst._getSidePoint('start', 0);
        expect(point.x).toBeDefined();
        return expect(point.y).toBeDefined();
      });
    });
    describe('_getSideRadius method ->', function() {
      return it('should return the side\'s radius, radiusX and radiusY', function() {
        var burst, sides;
        burst = new Burst({
          radius: {
            5: 25
          },
          radiusX: {
            10: 20
          },
          radiusY: {
            30: 10
          }
        });
        sides = burst._getSideRadius('start');
        expect(sides.radius).toBe(5);
        expect(sides.radiusX).toBe(10);
        return expect(sides.radiusY).toBe(30);
      });
    });
    describe('_getRadiusByKey method ->', function() {
      return it('should return the key\'s radius', function() {
        var burst, radius, radiusX, radiusY;
        burst = new Burst({
          radius: {
            5: 25
          },
          radiusX: {
            10: 20
          },
          radiusY: {
            30: 20
          }
        });
        radius = burst._getRadiusByKey('radius', 'start');
        radiusX = burst._getRadiusByKey('radiusX', 'start');
        radiusY = burst._getRadiusByKey('radiusX', 'end');
        expect(radius).toBe(5);
        expect(radiusX).toBe(10);
        return expect(radiusY).toBe(20);
      });
    });
    describe('_getDeltaFromPoints method ->', function() {
      it('should return the delta', function() {
        var burst, delta;
        burst = new Burst;
        delta = burst._getDeltaFromPoints('x', {
          x: 10,
          y: 20
        }, {
          x: 20,
          y: 40
        });
        return expect(delta[10]).toBe(20);
      });
      return it('should return one value if start and end positions are equal', function() {
        var burst, delta;
        burst = new Burst;
        delta = burst._getDeltaFromPoints('x', {
          x: 10,
          y: 20
        }, {
          x: 10,
          y: 40
        });
        return expect(delta).toBe(10);
      });
    });
    describe('_addOptionalProperties method ->', function() {
      it('should return the passed object', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProperties(obj, 0);
        return expect(result).toBe(obj);
      });
      it('should add parent, index and isTimelineLess', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProperties(obj, 0);
        expect(result.index).toBe(0);
        expect(result.parent).toBe(burst.el);
        return expect(result.isTimelineLess).toBe(true);
      });
      it('should hard rewrite `left` and `top` properties to 50%', function() {
        var burst, obj, result;
        burst = new Burst;
        obj = {};
        result = burst._addOptionalProperties(obj, 0);
        expect(result.left).toBe('50%');
        return expect(result.top).toBe('50%');
      });
      it('should add x/y ->', function() {
        var burst, obj0, obj1, result0, result1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2,
          size: 0
        });
        obj0 = {};
        obj1 = {};
        result0 = burst._addOptionalProperties(obj0, 0);
        result1 = burst._addOptionalProperties(obj1, 1);
        expect(obj0.x[0]).toBeCloseTo(0, 5);
        expect(obj0.y[0]).toBeCloseTo(-100, 5);
        expect(obj1.x[0]).toBeCloseTo(0, 5);
        return expect(obj1.y[0]).toBeCloseTo(100, 5);
      });
      it('should add x/y ->', function() {
        var burst, obj0, obj1, result0, result1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2,
          size: 0
        });
        obj0 = {};
        obj1 = {};
        result0 = burst._addOptionalProperties(obj0, 0);
        result1 = burst._addOptionalProperties(obj1, 1);
        expect(obj0.x[0]).toBeCloseTo(0, 5);
        expect(obj0.y[0]).toBeCloseTo(-100, 5);
        expect(obj1.x[0]).toBeCloseTo(0, 5);
        return expect(obj1.y[0]).toBeCloseTo(100, 5);
      });
      return it('should add angles ->', function() {
        var burst, obj0, obj1, result0, result1;
        burst = new Burst({
          radius: {
            0: 100
          },
          count: 2
        });
        obj0 = {
          angle: 0
        };
        obj1 = {
          angle: 0
        };
        result0 = burst._addOptionalProperties(obj0, 0);
        result1 = burst._addOptionalProperties(obj1, 1);
        expect(obj0.angle).toBe(90);
        return expect(obj1.angle).toBe(270);
      });
    });
    describe('_getBitAngle method ->', function() {
      it('should get angle by i', function() {
        var burst;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          }
        });
        expect(burst._getBitAngle(0, 0)).toBe(90);
        expect(burst._getBitAngle(0, 1)).toBe(162);
        expect(burst._getBitAngle(0, 2)).toBe(234);
        expect(burst._getBitAngle(90, 2)).toBe(234 + 90);
        expect(burst._getBitAngle(0, 3)).toBe(306);
        expect(burst._getBitAngle(90, 3)).toBe(306 + 90);
        expect(burst._getBitAngle(0, 4)).toBe(378);
        return expect(burst._getBitAngle(50, 4)).toBe(378 + 50);
      });
      return it('should get delta angle by i', function() {
        var burst;
        burst = new Burst({
          radius: {
            'rand(10,20)': 100
          }
        });
        expect(burst._getBitAngle({
          180: 0
        }, 0)[270]).toBe(90);
        expect(burst._getBitAngle({
          50: 20
        }, 3)[356]).toBe(326);
        return expect(burst._getBitAngle({
          50: 20
        }, 4)[428]).toBe(398);
      });
    });
    return describe('_extendDefaults method ->', function() {
      it('should call super', function() {
        var b;
        b = new Burst;
        spyOn(Swirl.prototype, '_extendDefaults');
        b._extendDefaults();
        return expect(Swirl.prototype._extendDefaults).toHaveBeenCalled();
      });
      return it('should call _calcSize', function() {
        var b;
        b = new Burst;
        spyOn(b, '_calcSize');
        b._extendDefaults();
        return expect(b._calcSize).toHaveBeenCalled();
      });
    });
  });

}).call(this);

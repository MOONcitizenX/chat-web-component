function $n(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let o = 0; o < s.length; o++)
    n[s[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const W = {}, ct = [], we = () => {
}, or = () => !1, rr = /^on[^a-z]/, Gt = (e) => rr.test(e), jn = (e) => e.startsWith("onUpdate:"), Z = Object.assign, Hn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ir = Object.prototype.hasOwnProperty, $ = (e, t) => ir.call(e, t), I = Array.isArray, ft = (e) => en(e) === "[object Map]", qs = (e) => en(e) === "[object Set]", L = (e) => typeof e == "function", G = (e) => typeof e == "string", kn = (e) => typeof e == "symbol", U = (e) => e !== null && typeof e == "object", Js = (e) => U(e) && L(e.then) && L(e.catch), Ys = Object.prototype.toString, en = (e) => Ys.call(e), lr = (e) => en(e).slice(8, -1), Xs = (e) => en(e) === "[object Object]", Dn = (e) => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ut = /* @__PURE__ */ $n(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), tn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, cr = /-(\w)/g, $e = tn((e) => e.replace(cr, (t, n) => n ? n.toUpperCase() : "")), fr = /\B([A-Z])/g, ge = tn(
  (e) => e.replace(fr, "-$1").toLowerCase()
), Zs = tn(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), hn = tn(
  (e) => e ? `on${Zs(e)}` : ""
), Et = (e, t) => !Object.is(e, t), pn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, qt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, ur = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, vn = (e) => {
  const t = G(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let as;
const wn = () => as || (as = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Be(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = G(s) ? pr(s) : Be(s);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else {
    if (G(e))
      return e;
    if (U(e))
      return e;
  }
}
const ar = /;(?![^(]*\))/g, dr = /:([^]+)/, hr = /\/\*[^]*?\*\//g;
function pr(e) {
  const t = {};
  return e.replace(hr, "").split(ar).forEach((n) => {
    if (n) {
      const s = n.split(dr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ut(e) {
  let t = "";
  if (G(e))
    t = e;
  else if (I(e))
    for (let n = 0; n < e.length; n++) {
      const s = ut(e[n]);
      s && (t += s + " ");
    }
  else if (U(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const gr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", mr = /* @__PURE__ */ $n(gr);
function Qs(e) {
  return !!e || e === "";
}
const Gs = (e) => G(e) ? e : e == null ? "" : I(e) || U(e) && (e.toString === Ys || !L(e.toString)) ? JSON.stringify(e, eo, 2) : String(e), eo = (e, t) => t && t.__v_isRef ? eo(e, t.value) : ft(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, o]) => (n[`${s} =>`] = o, n), {})
} : qs(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : U(t) && !I(t) && !Xs(t) ? String(t) : t;
let be;
class _r {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = be, !t && be && (this.index = (be.scopes || (be.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = be;
      try {
        return be = this, t();
      } finally {
        be = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    be = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    be = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function br(e, t = be) {
  t && t.active && t.effects.push(e);
}
function xr() {
  return be;
}
const Kn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, to = (e) => (e.w & ze) > 0, no = (e) => (e.n & ze) > 0, yr = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= ze;
}, Cr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const o = t[s];
      to(o) && !no(o) ? o.delete(e) : t[n++] = o, o.w &= ~ze, o.n &= ~ze;
    }
    t.length = n;
  }
}, Tn = /* @__PURE__ */ new WeakMap();
let yt = 0, ze = 1;
const En = 30;
let xe;
const nt = Symbol(""), An = Symbol("");
class Un {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, br(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = xe, n = We;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = xe, xe = this, We = !0, ze = 1 << ++yt, yt <= En ? yr(this) : ds(this), this.fn();
    } finally {
      yt <= En && Cr(this), ze = 1 << --yt, xe = this.parent, We = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    xe === this ? this.deferStop = !0 : this.active && (ds(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ds(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let We = !0;
const so = [];
function gt() {
  so.push(We), We = !1;
}
function mt() {
  const e = so.pop();
  We = e === void 0 ? !0 : e;
}
function ue(e, t, n) {
  if (We && xe) {
    let s = Tn.get(e);
    s || Tn.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || s.set(n, o = Kn()), oo(o);
  }
}
function oo(e, t) {
  let n = !1;
  yt <= En ? no(e) || (e.n |= ze, n = !to(e)) : n = !e.has(xe), n && (e.add(xe), xe.deps.push(e));
}
function je(e, t, n, s, o, r) {
  const i = Tn.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && I(e)) {
    const f = Number(s);
    i.forEach((a, d) => {
      (d === "length" || d >= f) && l.push(a);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        I(e) ? Dn(n) && l.push(i.get("length")) : (l.push(i.get(nt)), ft(e) && l.push(i.get(An)));
        break;
      case "delete":
        I(e) || (l.push(i.get(nt)), ft(e) && l.push(i.get(An)));
        break;
      case "set":
        ft(e) && l.push(i.get(nt));
        break;
    }
  if (l.length === 1)
    l[0] && Pn(l[0]);
  else {
    const f = [];
    for (const a of l)
      a && f.push(...a);
    Pn(Kn(f));
  }
}
function Pn(e, t) {
  const n = I(e) ? e : [...e];
  for (const s of n)
    s.computed && hs(s);
  for (const s of n)
    s.computed || hs(s);
}
function hs(e, t) {
  (e !== xe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const vr = /* @__PURE__ */ $n("__proto__,__v_isRef,__isVue"), ro = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(kn)
), wr = /* @__PURE__ */ Wn(), Tr = /* @__PURE__ */ Wn(!1, !0), Er = /* @__PURE__ */ Wn(!0), ps = /* @__PURE__ */ Ar();
function Ar() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = j(this);
      for (let r = 0, i = this.length; r < i; r++)
        ue(s, "get", r + "");
      const o = s[t](...n);
      return o === -1 || o === !1 ? s[t](...n.map(j)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      gt();
      const s = j(this)[t].apply(this, n);
      return mt(), s;
    };
  }), e;
}
function Pr(e) {
  const t = j(this);
  return ue(t, "has", e), t.hasOwnProperty(e);
}
function Wn(e = !1, t = !1) {
  return function(s, o, r) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && r === (e ? t ? Ur : uo : t ? fo : co).get(s))
      return s;
    const i = I(s);
    if (!e) {
      if (i && $(ps, o))
        return Reflect.get(ps, o, r);
      if (o === "hasOwnProperty")
        return Pr;
    }
    const l = Reflect.get(s, o, r);
    return (kn(o) ? ro.has(o) : vr(o)) || (e || ue(s, "get", o), t) ? l : ie(l) ? i && Dn(o) ? l : l.value : U(l) ? e ? ao(l) : sn(l) : l;
  };
}
const Or = /* @__PURE__ */ io(), Ir = /* @__PURE__ */ io(!0);
function io(e = !1) {
  return function(n, s, o, r) {
    let i = n[s];
    if (ht(i) && ie(i) && !ie(o))
      return !1;
    if (!e && (!Jt(o) && !ht(o) && (i = j(i), o = j(o)), !I(n) && ie(i) && !ie(o)))
      return i.value = o, !0;
    const l = I(n) && Dn(s) ? Number(s) < n.length : $(n, s), f = Reflect.set(n, s, o, r);
    return n === j(r) && (l ? Et(o, i) && je(n, "set", s, o) : je(n, "add", s, o)), f;
  };
}
function Mr(e, t) {
  const n = $(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && je(e, "delete", t, void 0), s;
}
function Fr(e, t) {
  const n = Reflect.has(e, t);
  return (!kn(t) || !ro.has(t)) && ue(e, "has", t), n;
}
function Nr(e) {
  return ue(e, "iterate", I(e) ? "length" : nt), Reflect.ownKeys(e);
}
const lo = {
  get: wr,
  set: Or,
  deleteProperty: Mr,
  has: Fr,
  ownKeys: Nr
}, Rr = {
  get: Er,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, Lr = /* @__PURE__ */ Z(
  {},
  lo,
  {
    get: Tr,
    set: Ir
  }
), Vn = (e) => e, nn = (e) => Reflect.getPrototypeOf(e);
function Bt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const o = j(e), r = j(t);
  n || (t !== r && ue(o, "get", t), ue(o, "get", r));
  const { has: i } = nn(o), l = s ? Vn : n ? Jn : At;
  if (i.call(o, t))
    return l(e.get(t));
  if (i.call(o, r))
    return l(e.get(r));
  e !== o && e.get(t);
}
function $t(e, t = !1) {
  const n = this.__v_raw, s = j(n), o = j(e);
  return t || (e !== o && ue(s, "has", e), ue(s, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function jt(e, t = !1) {
  return e = e.__v_raw, !t && ue(j(e), "iterate", nt), Reflect.get(e, "size", e);
}
function gs(e) {
  e = j(e);
  const t = j(this);
  return nn(t).has.call(t, e) || (t.add(e), je(t, "add", e, e)), this;
}
function ms(e, t) {
  t = j(t);
  const n = j(this), { has: s, get: o } = nn(n);
  let r = s.call(n, e);
  r || (e = j(e), r = s.call(n, e));
  const i = o.call(n, e);
  return n.set(e, t), r ? Et(t, i) && je(n, "set", e, t) : je(n, "add", e, t), this;
}
function _s(e) {
  const t = j(this), { has: n, get: s } = nn(t);
  let o = n.call(t, e);
  o || (e = j(e), o = n.call(t, e)), s && s.call(t, e);
  const r = t.delete(e);
  return o && je(t, "delete", e, void 0), r;
}
function bs() {
  const e = j(this), t = e.size !== 0, n = e.clear();
  return t && je(e, "clear", void 0, void 0), n;
}
function Ht(e, t) {
  return function(s, o) {
    const r = this, i = r.__v_raw, l = j(i), f = t ? Vn : e ? Jn : At;
    return !e && ue(l, "iterate", nt), i.forEach((a, d) => s.call(o, f(a), f(d), r));
  };
}
function kt(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, r = j(o), i = ft(r), l = e === "entries" || e === Symbol.iterator && i, f = e === "keys" && i, a = o[e](...s), d = n ? Vn : t ? Jn : At;
    return !t && ue(
      r,
      "iterate",
      f ? An : nt
    ), {
      // iterator protocol
      next() {
        const { value: _, done: b } = a.next();
        return b ? { value: _, done: b } : {
          value: l ? [d(_[0]), d(_[1])] : d(_),
          done: b
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ke(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Sr() {
  const e = {
    get(r) {
      return Bt(this, r);
    },
    get size() {
      return jt(this);
    },
    has: $t,
    add: gs,
    set: ms,
    delete: _s,
    clear: bs,
    forEach: Ht(!1, !1)
  }, t = {
    get(r) {
      return Bt(this, r, !1, !0);
    },
    get size() {
      return jt(this);
    },
    has: $t,
    add: gs,
    set: ms,
    delete: _s,
    clear: bs,
    forEach: Ht(!1, !0)
  }, n = {
    get(r) {
      return Bt(this, r, !0);
    },
    get size() {
      return jt(this, !0);
    },
    has(r) {
      return $t.call(this, r, !0);
    },
    add: ke("add"),
    set: ke("set"),
    delete: ke("delete"),
    clear: ke("clear"),
    forEach: Ht(!0, !1)
  }, s = {
    get(r) {
      return Bt(this, r, !0, !0);
    },
    get size() {
      return jt(this, !0);
    },
    has(r) {
      return $t.call(this, r, !0);
    },
    add: ke("add"),
    set: ke("set"),
    delete: ke("delete"),
    clear: ke("clear"),
    forEach: Ht(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = kt(
      r,
      !1,
      !1
    ), n[r] = kt(
      r,
      !0,
      !1
    ), t[r] = kt(
      r,
      !1,
      !0
    ), s[r] = kt(
      r,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  Br,
  $r,
  jr,
  Hr
] = /* @__PURE__ */ Sr();
function zn(e, t) {
  const n = t ? e ? Hr : jr : e ? $r : Br;
  return (s, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(
    $(n, o) && o in s ? n : s,
    o,
    r
  );
}
const kr = {
  get: /* @__PURE__ */ zn(!1, !1)
}, Dr = {
  get: /* @__PURE__ */ zn(!1, !0)
}, Kr = {
  get: /* @__PURE__ */ zn(!0, !1)
}, co = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap(), uo = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap();
function Wr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Vr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Wr(lr(e));
}
function sn(e) {
  return ht(e) ? e : qn(
    e,
    !1,
    lo,
    kr,
    co
  );
}
function zr(e) {
  return qn(
    e,
    !1,
    Lr,
    Dr,
    fo
  );
}
function ao(e) {
  return qn(
    e,
    !0,
    Rr,
    Kr,
    uo
  );
}
function qn(e, t, n, s, o) {
  if (!U(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const i = Vr(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? s : n
  );
  return o.set(e, l), l;
}
function at(e) {
  return ht(e) ? at(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ht(e) {
  return !!(e && e.__v_isReadonly);
}
function Jt(e) {
  return !!(e && e.__v_isShallow);
}
function ho(e) {
  return at(e) || ht(e);
}
function j(e) {
  const t = e && e.__v_raw;
  return t ? j(t) : e;
}
function po(e) {
  return qt(e, "__v_skip", !0), e;
}
const At = (e) => U(e) ? sn(e) : e, Jn = (e) => U(e) ? ao(e) : e;
function go(e) {
  We && xe && (e = j(e), oo(e.dep || (e.dep = Kn())));
}
function mo(e, t) {
  e = j(e);
  const n = e.dep;
  n && Pn(n);
}
function ie(e) {
  return !!(e && e.__v_isRef === !0);
}
function Dt(e) {
  return qr(e, !1);
}
function qr(e, t) {
  return ie(e) ? e : new Jr(e, t);
}
class Jr {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : j(t), this._value = n ? t : At(t);
  }
  get value() {
    return go(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Jt(t) || ht(t);
    t = n ? t : j(t), Et(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : At(t), mo(this));
  }
}
function Yr(e) {
  return ie(e) ? e.value : e;
}
const Xr = {
  get: (e, t, n) => Yr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return ie(o) && !ie(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function _o(e) {
  return at(e) ? e : new Proxy(e, Xr);
}
class Zr {
  constructor(t, n, s, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Un(t, () => {
      this._dirty || (this._dirty = !0, mo(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = s;
  }
  get value() {
    const t = j(this);
    return go(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function Qr(e, t, n = !1) {
  let s, o;
  const r = L(e);
  return r ? (s = e, o = we) : (s = e.get, o = e.set), new Zr(s, o, r || !o, n);
}
function Ve(e, t, n, s) {
  let o;
  try {
    o = s ? e(...s) : e();
  } catch (r) {
    on(r, t, n);
  }
  return o;
}
function me(e, t, n, s) {
  if (L(e)) {
    const r = Ve(e, t, n, s);
    return r && Js(r) && r.catch((i) => {
      on(i, t, n);
    }), r;
  }
  const o = [];
  for (let r = 0; r < e.length; r++)
    o.push(me(e[r], t, n, s));
  return o;
}
function on(e, t, n, s = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const i = t.proxy, l = n;
    for (; r; ) {
      const a = r.ec;
      if (a) {
        for (let d = 0; d < a.length; d++)
          if (a[d](e, i, l) === !1)
            return;
      }
      r = r.parent;
    }
    const f = t.appContext.config.errorHandler;
    if (f) {
      Ve(
        f,
        null,
        10,
        [e, i, l]
      );
      return;
    }
  }
  Gr(e, n, o, s);
}
function Gr(e, t, n, s = !0) {
  console.error(e);
}
let Pt = !1, On = !1;
const re = [];
let Ne = 0;
const dt = [];
let Se = null, Ge = 0;
const bo = /* @__PURE__ */ Promise.resolve();
let Yn = null;
function xo(e) {
  const t = Yn || bo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ei(e) {
  let t = Ne + 1, n = re.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    Ot(re[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Xn(e) {
  (!re.length || !re.includes(
    e,
    Pt && e.allowRecurse ? Ne + 1 : Ne
  )) && (e.id == null ? re.push(e) : re.splice(ei(e.id), 0, e), yo());
}
function yo() {
  !Pt && !On && (On = !0, Yn = bo.then(vo));
}
function ti(e) {
  const t = re.indexOf(e);
  t > Ne && re.splice(t, 1);
}
function ni(e) {
  I(e) ? dt.push(...e) : (!Se || !Se.includes(
    e,
    e.allowRecurse ? Ge + 1 : Ge
  )) && dt.push(e), yo();
}
function xs(e, t = Pt ? Ne + 1 : 0) {
  for (; t < re.length; t++) {
    const n = re[t];
    n && n.pre && (re.splice(t, 1), t--, n());
  }
}
function Co(e) {
  if (dt.length) {
    const t = [...new Set(dt)];
    if (dt.length = 0, Se) {
      Se.push(...t);
      return;
    }
    for (Se = t, Se.sort((n, s) => Ot(n) - Ot(s)), Ge = 0; Ge < Se.length; Ge++)
      Se[Ge]();
    Se = null, Ge = 0;
  }
}
const Ot = (e) => e.id == null ? 1 / 0 : e.id, si = (e, t) => {
  const n = Ot(e) - Ot(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function vo(e) {
  On = !1, Pt = !0, re.sort(si);
  const t = we;
  try {
    for (Ne = 0; Ne < re.length; Ne++) {
      const n = re[Ne];
      n && n.active !== !1 && Ve(n, null, 14);
    }
  } finally {
    Ne = 0, re.length = 0, Co(), Pt = !1, Yn = null, (re.length || dt.length) && vo();
  }
}
function oi(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || W;
  let o = n;
  const r = t.startsWith("update:"), i = r && t.slice(7);
  if (i && i in s) {
    const d = `${i === "modelValue" ? "model" : i}Modifiers`, { number: _, trim: b } = s[d] || W;
    b && (o = n.map((C) => G(C) ? C.trim() : C)), _ && (o = n.map(ur));
  }
  let l, f = s[l = hn(t)] || // also try camelCase event handler (#2249)
  s[l = hn($e(t))];
  !f && r && (f = s[l = hn(ge(t))]), f && me(
    f,
    e,
    6,
    o
  );
  const a = s[l + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, me(
      a,
      e,
      6,
      o
    );
  }
}
function wo(e, t, n = !1) {
  const s = t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let i = {}, l = !1;
  if (!L(e)) {
    const f = (a) => {
      const d = wo(a, t, !0);
      d && (l = !0, Z(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !r && !l ? (U(e) && s.set(e, null), null) : (I(r) ? r.forEach((f) => i[f] = null) : Z(i, r), U(e) && s.set(e, i), i);
}
function rn(e, t) {
  return !e || !Gt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), $(e, t[0].toLowerCase() + t.slice(1)) || $(e, ge(t)) || $(e, t));
}
let Ce = null, To = null;
function Yt(e) {
  const t = Ce;
  return Ce = e, To = e && e.type.__scopeId || null, t;
}
function In(e, t = Ce, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && Ms(-1);
    const r = Yt(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Yt(r), s._d && Ms(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function gn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    props: r,
    propsOptions: [i],
    slots: l,
    attrs: f,
    emit: a,
    render: d,
    renderCache: _,
    data: b,
    setupState: C,
    ctx: N,
    inheritAttrs: T
  } = e;
  let B, V;
  const z = Yt(e);
  try {
    if (n.shapeFlag & 4) {
      const M = o || s;
      B = Fe(
        d.call(
          M,
          M,
          _,
          r,
          C,
          b,
          N
        )
      ), V = f;
    } else {
      const M = t;
      B = Fe(
        M.length > 1 ? M(
          r,
          { attrs: f, slots: l, emit: a }
        ) : M(
          r,
          null
          /* we know it doesn't need it */
        )
      ), V = t.props ? f : ri(f);
    }
  } catch (M) {
    Tt.length = 0, on(M, e, 1), B = ne(Te);
  }
  let q = B;
  if (V && T !== !1) {
    const M = Object.keys(V), { shapeFlag: ee } = q;
    M.length && ee & 7 && (i && M.some(jn) && (V = ii(
      V,
      i
    )), q = qe(q, V));
  }
  return n.dirs && (q = qe(q), q.dirs = q.dirs ? q.dirs.concat(n.dirs) : n.dirs), n.transition && (q.transition = n.transition), B = q, Yt(z), B;
}
const ri = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Gt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, ii = (e, t) => {
  const n = {};
  for (const s in e)
    (!jn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function li(e, t, n) {
  const { props: s, children: o, component: r } = e, { props: i, children: l, patchFlag: f } = t, a = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return s ? ys(s, i, a) : !!i;
    if (f & 8) {
      const d = t.dynamicProps;
      for (let _ = 0; _ < d.length; _++) {
        const b = d[_];
        if (i[b] !== s[b] && !rn(a, b))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? i ? ys(s, i, a) : !0 : !!i;
  return !1;
}
function ys(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (t[r] !== e[r] && !rn(n, r))
      return !0;
  }
  return !1;
}
function ci({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const fi = (e) => e.__isSuspense;
function ui(e, t) {
  t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : ni(e);
}
const Kt = {};
function vt(e, t, n) {
  return Eo(e, t, n);
}
function Eo(e, t, { immediate: n, deep: s, flush: o, onTrack: r, onTrigger: i } = W) {
  var l;
  const f = xr() === ((l = se) == null ? void 0 : l.scope) ? se : null;
  let a, d = !1, _ = !1;
  if (ie(e) ? (a = () => e.value, d = Jt(e)) : at(e) ? (a = () => e, s = !0) : I(e) ? (_ = !0, d = e.some((M) => at(M) || Jt(M)), a = () => e.map((M) => {
    if (ie(M))
      return M.value;
    if (at(M))
      return lt(M);
    if (L(M))
      return Ve(M, f, 2);
  })) : L(e) ? t ? a = () => Ve(e, f, 2) : a = () => {
    if (!(f && f.isUnmounted))
      return b && b(), me(
        e,
        f,
        3,
        [C]
      );
  } : a = we, t && s) {
    const M = a;
    a = () => lt(M());
  }
  let b, C = (M) => {
    b = z.onStop = () => {
      Ve(M, f, 4);
    };
  }, N;
  if (Nt)
    if (C = we, t ? n && me(t, f, 3, [
      a(),
      _ ? [] : void 0,
      C
    ]) : a(), o === "sync") {
      const M = rl();
      N = M.__watcherHandles || (M.__watcherHandles = []);
    } else
      return we;
  let T = _ ? new Array(e.length).fill(Kt) : Kt;
  const B = () => {
    if (z.active)
      if (t) {
        const M = z.run();
        (s || d || (_ ? M.some(
          (ee, Ee) => Et(ee, T[Ee])
        ) : Et(M, T))) && (b && b(), me(t, f, 3, [
          M,
          // pass undefined as the old value when it's changed for the first time
          T === Kt ? void 0 : _ && T[0] === Kt ? [] : T,
          C
        ]), T = M);
      } else
        z.run();
  };
  B.allowRecurse = !!t;
  let V;
  o === "sync" ? V = B : o === "post" ? V = () => ce(B, f && f.suspense) : (B.pre = !0, f && (B.id = f.uid), V = () => Xn(B));
  const z = new Un(a, V);
  t ? n ? B() : T = z.run() : o === "post" ? ce(
    z.run.bind(z),
    f && f.suspense
  ) : z.run();
  const q = () => {
    z.stop(), f && f.scope && Hn(f.scope.effects, z);
  };
  return N && N.push(q), q;
}
function ai(e, t, n) {
  const s = this.proxy, o = G(e) ? e.includes(".") ? Ao(s, e) : () => s[e] : e.bind(s, s);
  let r;
  L(t) ? r = t : (r = t.handler, n = t);
  const i = se;
  pt(this);
  const l = Eo(o, r.bind(s), n);
  return i ? pt(i) : st(), l;
}
function Ao(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
function lt(e, t) {
  if (!U(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), ie(e))
    lt(e.value, t);
  else if (I(e))
    for (let n = 0; n < e.length; n++)
      lt(e[n], t);
  else if (qs(e) || ft(e))
    e.forEach((n) => {
      lt(n, t);
    });
  else if (Xs(e))
    for (const n in e)
      lt(e[n], t);
  return e;
}
function Xe(e, t, n, s) {
  const o = e.dirs, r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    r && (l.oldValue = r[i].value);
    let f = l.dir[s];
    f && (gt(), me(f, n, 8, [
      e.el,
      l,
      e,
      t
    ]), mt());
  }
}
function Po() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Qn(() => {
    e.isMounted = !0;
  }), No(() => {
    e.isUnmounting = !0;
  }), e;
}
const pe = [Function, Array], Oo = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: pe,
  onEnter: pe,
  onAfterEnter: pe,
  onEnterCancelled: pe,
  // leave
  onBeforeLeave: pe,
  onLeave: pe,
  onAfterLeave: pe,
  onLeaveCancelled: pe,
  // appear
  onBeforeAppear: pe,
  onAppear: pe,
  onAfterAppear: pe,
  onAppearCancelled: pe
}, di = {
  name: "BaseTransition",
  props: Oo,
  setup(e, { slots: t }) {
    const n = Vo(), s = Po();
    let o;
    return () => {
      const r = t.default && Zn(t.default(), !0);
      if (!r || !r.length)
        return;
      let i = r[0];
      if (r.length > 1) {
        for (const T of r)
          if (T.type !== Te) {
            i = T;
            break;
          }
      }
      const l = j(e), { mode: f } = l;
      if (s.isLeaving)
        return mn(i);
      const a = Cs(i);
      if (!a)
        return mn(i);
      const d = It(
        a,
        l,
        s,
        n
      );
      Mt(a, d);
      const _ = n.subTree, b = _ && Cs(_);
      let C = !1;
      const { getTransitionKey: N } = a.type;
      if (N) {
        const T = N();
        o === void 0 ? o = T : T !== o && (o = T, C = !0);
      }
      if (b && b.type !== Te && (!et(a, b) || C)) {
        const T = It(
          b,
          l,
          s,
          n
        );
        if (Mt(b, T), f === "out-in")
          return s.isLeaving = !0, T.afterLeave = () => {
            s.isLeaving = !1, n.update.active !== !1 && n.update();
          }, mn(i);
        f === "in-out" && a.type !== Te && (T.delayLeave = (B, V, z) => {
          const q = Io(
            s,
            b
          );
          q[String(b.key)] = b, B._leaveCb = () => {
            V(), B._leaveCb = void 0, delete d.delayedLeave;
          }, d.delayedLeave = z;
        });
      }
      return i;
    };
  }
}, hi = di;
function Io(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function It(e, t, n, s) {
  const {
    appear: o,
    mode: r,
    persisted: i = !1,
    onBeforeEnter: l,
    onEnter: f,
    onAfterEnter: a,
    onEnterCancelled: d,
    onBeforeLeave: _,
    onLeave: b,
    onAfterLeave: C,
    onLeaveCancelled: N,
    onBeforeAppear: T,
    onAppear: B,
    onAfterAppear: V,
    onAppearCancelled: z
  } = t, q = String(e.key), M = Io(n, e), ee = (R, Y) => {
    R && me(
      R,
      s,
      9,
      Y
    );
  }, Ee = (R, Y) => {
    const K = Y[1];
    ee(R, Y), I(R) ? R.every((oe) => oe.length <= 1) && K() : R.length <= 1 && K();
  }, Ae = {
    mode: r,
    persisted: i,
    beforeEnter(R) {
      let Y = l;
      if (!n.isMounted)
        if (o)
          Y = T || l;
        else
          return;
      R._leaveCb && R._leaveCb(
        !0
        /* cancelled */
      );
      const K = M[q];
      K && et(e, K) && K.el._leaveCb && K.el._leaveCb(), ee(Y, [R]);
    },
    enter(R) {
      let Y = f, K = a, oe = d;
      if (!n.isMounted)
        if (o)
          Y = B || f, K = V || a, oe = z || d;
        else
          return;
      let A = !1;
      const J = R._enterCb = (ae) => {
        A || (A = !0, ae ? ee(oe, [R]) : ee(K, [R]), Ae.delayedLeave && Ae.delayedLeave(), R._enterCb = void 0);
      };
      Y ? Ee(Y, [R, J]) : J();
    },
    leave(R, Y) {
      const K = String(e.key);
      if (R._enterCb && R._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return Y();
      ee(_, [R]);
      let oe = !1;
      const A = R._leaveCb = (J) => {
        oe || (oe = !0, Y(), J ? ee(N, [R]) : ee(C, [R]), R._leaveCb = void 0, M[K] === e && delete M[K]);
      };
      M[K] = e, b ? Ee(b, [R, A]) : A();
    },
    clone(R) {
      return It(R, t, n, s);
    }
  };
  return Ae;
}
function mn(e) {
  if (ln(e))
    return e = qe(e), e.children = null, e;
}
function Cs(e) {
  return ln(e) ? e.children ? e.children[0] : void 0 : e;
}
function Mt(e, t) {
  e.shapeFlag & 6 && e.component ? Mt(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Zn(e, t = !1, n) {
  let s = [], o = 0;
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : r);
    i.type === he ? (i.patchFlag & 128 && o++, s = s.concat(
      Zn(i.children, t, l)
    )) : (t || i.type !== Te) && s.push(l != null ? qe(i, { key: l }) : i);
  }
  if (o > 1)
    for (let r = 0; r < s.length; r++)
      s[r].patchFlag = -2;
  return s;
}
function Rt(e, t) {
  return L(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => Z({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const Wt = (e) => !!e.type.__asyncLoader, ln = (e) => e.type.__isKeepAlive;
function pi(e, t) {
  Mo(e, "a", t);
}
function gi(e, t) {
  Mo(e, "da", t);
}
function Mo(e, t, n = se) {
  const s = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (cn(t, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      ln(o.parent.vnode) && mi(s, t, n, o), o = o.parent;
  }
}
function mi(e, t, n, s) {
  const o = cn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Ro(() => {
    Hn(s[t], o);
  }, n);
}
function cn(e, t, n = se, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      gt(), pt(n);
      const l = me(t, n, e, i);
      return st(), mt(), l;
    });
    return s ? o.unshift(r) : o.push(r), r;
  }
}
const He = (e) => (t, n = se) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Nt || e === "sp") && cn(e, (...s) => t(...s), n)
), _i = He("bm"), Qn = He("m"), bi = He("bu"), Fo = He("u"), No = He("bum"), Ro = He("um"), xi = He("sp"), yi = He(
  "rtg"
), Ci = He(
  "rtc"
);
function vi(e, t = se) {
  cn("ec", e, t);
}
const wi = Symbol.for("v-ndc");
function Lo(e, t, n, s) {
  let o;
  const r = n && n[s];
  if (I(e) || G(e)) {
    o = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      o[i] = t(e[i], i, void 0, r && r[i]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++)
      o[i] = t(i + 1, i, void 0, r && r[i]);
  } else if (U(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (i, l) => t(i, l, void 0, r && r[l])
      );
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let l = 0, f = i.length; l < f; l++) {
        const a = i[l];
        o[l] = t(e[a], a, l, r && r[l]);
      }
    }
  else
    o = [];
  return n && (n[s] = o), o;
}
const Mn = (e) => e ? zo(e) ? ss(e) || e.proxy : Mn(e.parent) : null, wt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Z(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Mn(e.parent),
    $root: (e) => Mn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Gn(e),
    $forceUpdate: (e) => e.f || (e.f = () => Xn(e.update)),
    $nextTick: (e) => e.n || (e.n = xo.bind(e.proxy)),
    $watch: (e) => ai.bind(e)
  })
), _n = (e, t) => e !== W && !e.__isScriptSetup && $(e, t), Ti = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: o, props: r, accessCache: i, type: l, appContext: f } = e;
    let a;
    if (t[0] !== "$") {
      const C = i[t];
      if (C !== void 0)
        switch (C) {
          case 1:
            return s[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (_n(s, t))
          return i[t] = 1, s[t];
        if (o !== W && $(o, t))
          return i[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && $(a, t)
        )
          return i[t] = 3, r[t];
        if (n !== W && $(n, t))
          return i[t] = 4, n[t];
        Fn && (i[t] = 0);
      }
    }
    const d = wt[t];
    let _, b;
    if (d)
      return t === "$attrs" && ue(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (_ = l.__cssModules) && (_ = _[t])
    )
      return _;
    if (n !== W && $(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      b = f.config.globalProperties, $(b, t)
    )
      return b[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: r } = e;
    return _n(o, t) ? (o[t] = n, !0) : s !== W && $(s, t) ? (s[t] = n, !0) : $(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, propsOptions: r }
  }, i) {
    let l;
    return !!n[i] || e !== W && $(e, i) || _n(t, i) || (l = r[0]) && $(l, i) || $(s, i) || $(wt, i) || $(o.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : $(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function vs(e) {
  return I(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Fn = !0;
function Ei(e) {
  const t = Gn(e), n = e.proxy, s = e.ctx;
  Fn = !1, t.beforeCreate && ws(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: i,
    watch: l,
    provide: f,
    inject: a,
    // lifecycle
    created: d,
    beforeMount: _,
    mounted: b,
    beforeUpdate: C,
    updated: N,
    activated: T,
    deactivated: B,
    beforeDestroy: V,
    beforeUnmount: z,
    destroyed: q,
    unmounted: M,
    render: ee,
    renderTracked: Ee,
    renderTriggered: Ae,
    errorCaptured: R,
    serverPrefetch: Y,
    // public API
    expose: K,
    inheritAttrs: oe,
    // assets
    components: A,
    directives: J,
    filters: ae
  } = t;
  if (a && Ai(a, s, null), i)
    for (const X in i) {
      const k = i[X];
      L(k) && (s[X] = k.bind(n));
    }
  if (o) {
    const X = o.call(n, n);
    U(X) && (e.data = sn(X));
  }
  if (Fn = !0, r)
    for (const X in r) {
      const k = r[X], Je = L(k) ? k.bind(n, n) : L(k.get) ? k.get.bind(n, n) : we, Lt = !L(k) && L(k.set) ? k.set.bind(n) : we, Ye = nl({
        get: Je,
        set: Lt
      });
      Object.defineProperty(s, X, {
        enumerable: !0,
        configurable: !0,
        get: () => Ye.value,
        set: (Pe) => Ye.value = Pe
      });
    }
  if (l)
    for (const X in l)
      So(l[X], s, n, X);
  if (f) {
    const X = L(f) ? f.call(n) : f;
    Reflect.ownKeys(X).forEach((k) => {
      Ni(k, X[k]);
    });
  }
  d && ws(d, e, "c");
  function te(X, k) {
    I(k) ? k.forEach((Je) => X(Je.bind(n))) : k && X(k.bind(n));
  }
  if (te(_i, _), te(Qn, b), te(bi, C), te(Fo, N), te(pi, T), te(gi, B), te(vi, R), te(Ci, Ee), te(yi, Ae), te(No, z), te(Ro, M), te(xi, Y), I(K))
    if (K.length) {
      const X = e.exposed || (e.exposed = {});
      K.forEach((k) => {
        Object.defineProperty(X, k, {
          get: () => n[k],
          set: (Je) => n[k] = Je
        });
      });
    } else
      e.exposed || (e.exposed = {});
  ee && e.render === we && (e.render = ee), oe != null && (e.inheritAttrs = oe), A && (e.components = A), J && (e.directives = J);
}
function Ai(e, t, n = we) {
  I(e) && (e = Nn(e));
  for (const s in e) {
    const o = e[s];
    let r;
    U(o) ? "default" in o ? r = Vt(
      o.from || s,
      o.default,
      !0
      /* treat default function as factory */
    ) : r = Vt(o.from || s) : r = Vt(o), ie(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[s] = r;
  }
}
function ws(e, t, n) {
  me(
    I(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function So(e, t, n, s) {
  const o = s.includes(".") ? Ao(n, s) : () => n[s];
  if (G(e)) {
    const r = t[e];
    L(r) && vt(o, r);
  } else if (L(e))
    vt(o, e.bind(n));
  else if (U(e))
    if (I(e))
      e.forEach((r) => So(r, t, n, s));
    else {
      const r = L(e.handler) ? e.handler.bind(n) : t[e.handler];
      L(r) && vt(o, r, e);
    }
}
function Gn(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let f;
  return l ? f = l : !o.length && !n && !s ? f = t : (f = {}, o.length && o.forEach(
    (a) => Xt(f, a, i, !0)
  ), Xt(f, t, i)), U(t) && r.set(t, f), f;
}
function Xt(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && Xt(e, r, n, !0), o && o.forEach(
    (i) => Xt(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = Pi[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Pi = {
  data: Ts,
  props: Es,
  emits: Es,
  // objects
  methods: Ct,
  computed: Ct,
  // lifecycle
  beforeCreate: le,
  created: le,
  beforeMount: le,
  mounted: le,
  beforeUpdate: le,
  updated: le,
  beforeDestroy: le,
  beforeUnmount: le,
  destroyed: le,
  unmounted: le,
  activated: le,
  deactivated: le,
  errorCaptured: le,
  serverPrefetch: le,
  // assets
  components: Ct,
  directives: Ct,
  // watch
  watch: Ii,
  // provide / inject
  provide: Ts,
  inject: Oi
};
function Ts(e, t) {
  return t ? e ? function() {
    return Z(
      L(e) ? e.call(this, this) : e,
      L(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Oi(e, t) {
  return Ct(Nn(e), Nn(t));
}
function Nn(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ct(e, t) {
  return e ? Z(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Es(e, t) {
  return e ? I(e) && I(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Z(
    /* @__PURE__ */ Object.create(null),
    vs(e),
    vs(t ?? {})
  ) : t;
}
function Ii(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Z(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = le(e[s], t[s]);
  return n;
}
function Bo() {
  return {
    app: null,
    config: {
      isNativeTag: or,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Mi = 0;
function Fi(e, t) {
  return function(s, o = null) {
    L(s) || (s = Z({}, s)), o != null && !U(o) && (o = null);
    const r = Bo(), i = /* @__PURE__ */ new Set();
    let l = !1;
    const f = r.app = {
      _uid: Mi++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: il,
      get config() {
        return r.config;
      },
      set config(a) {
      },
      use(a, ...d) {
        return i.has(a) || (a && L(a.install) ? (i.add(a), a.install(f, ...d)) : L(a) && (i.add(a), a(f, ...d))), f;
      },
      mixin(a) {
        return r.mixins.includes(a) || r.mixins.push(a), f;
      },
      component(a, d) {
        return d ? (r.components[a] = d, f) : r.components[a];
      },
      directive(a, d) {
        return d ? (r.directives[a] = d, f) : r.directives[a];
      },
      mount(a, d, _) {
        if (!l) {
          const b = ne(
            s,
            o
          );
          return b.appContext = r, d && t ? t(b, a) : e(b, a, _), l = !0, f._container = a, a.__vue_app__ = f, ss(b.component) || b.component.proxy;
        }
      },
      unmount() {
        l && (e(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, d) {
        return r.provides[a] = d, f;
      },
      runWithContext(a) {
        Zt = f;
        try {
          return a();
        } finally {
          Zt = null;
        }
      }
    };
    return f;
  };
}
let Zt = null;
function Ni(e, t) {
  if (se) {
    let n = se.provides;
    const s = se.parent && se.parent.provides;
    s === n && (n = se.provides = Object.create(s)), n[e] = t;
  }
}
function Vt(e, t, n = !1) {
  const s = se || Ce;
  if (s || Zt) {
    const o = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Zt._context.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && L(t) ? t.call(s && s.proxy) : t;
  }
}
function Ri(e, t, n, s = !1) {
  const o = {}, r = {};
  qt(r, un, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), $o(e, t, o, r);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e.props = s ? o : zr(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function Li(e, t, n, s) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = j(o), [f] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let _ = 0; _ < d.length; _++) {
        let b = d[_];
        if (rn(e.emitsOptions, b))
          continue;
        const C = t[b];
        if (f)
          if ($(r, b))
            C !== r[b] && (r[b] = C, a = !0);
          else {
            const N = $e(b);
            o[N] = Rn(
              f,
              l,
              N,
              C,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          C !== r[b] && (r[b] = C, a = !0);
      }
    }
  } else {
    $o(e, t, o, r) && (a = !0);
    let d;
    for (const _ in l)
      (!t || // for camelCase
      !$(t, _) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = ge(_)) === _ || !$(t, d))) && (f ? n && // for camelCase
      (n[_] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[_] = Rn(
        f,
        l,
        _,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete o[_]);
    if (r !== l)
      for (const _ in r)
        (!t || !$(t, _)) && (delete r[_], a = !0);
  }
  a && je(e, "set", "$attrs");
}
function $o(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let f in t) {
      if (Ut(f))
        continue;
      const a = t[f];
      let d;
      o && $(o, d = $e(f)) ? !r || !r.includes(d) ? n[d] = a : (l || (l = {}))[d] = a : rn(e.emitsOptions, f) || (!(f in s) || a !== s[f]) && (s[f] = a, i = !0);
    }
  if (r) {
    const f = j(n), a = l || W;
    for (let d = 0; d < r.length; d++) {
      const _ = r[d];
      n[_] = Rn(
        o,
        f,
        _,
        a[_],
        e,
        !$(a, _)
      );
    }
  }
  return i;
}
function Rn(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const l = $(i, "default");
    if (l && s === void 0) {
      const f = i.default;
      if (i.type !== Function && !i.skipFactory && L(f)) {
        const { propsDefaults: a } = o;
        n in a ? s = a[n] : (pt(o), s = a[n] = f.call(
          null,
          t
        ), st());
      } else
        s = f;
    }
    i[
      0
      /* shouldCast */
    ] && (r && !l ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === ge(n)) && (s = !0));
  }
  return s;
}
function jo(e, t, n = !1) {
  const s = t.propsCache, o = s.get(e);
  if (o)
    return o;
  const r = e.props, i = {}, l = [];
  let f = !1;
  if (!L(e)) {
    const d = (_) => {
      f = !0;
      const [b, C] = jo(_, t, !0);
      Z(i, b), C && l.push(...C);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!r && !f)
    return U(e) && s.set(e, ct), ct;
  if (I(r))
    for (let d = 0; d < r.length; d++) {
      const _ = $e(r[d]);
      As(_) && (i[_] = W);
    }
  else if (r)
    for (const d in r) {
      const _ = $e(d);
      if (As(_)) {
        const b = r[d], C = i[_] = I(b) || L(b) ? { type: b } : Z({}, b);
        if (C) {
          const N = Is(Boolean, C.type), T = Is(String, C.type);
          C[
            0
            /* shouldCast */
          ] = N > -1, C[
            1
            /* shouldCastTrue */
          ] = T < 0 || N < T, (N > -1 || $(C, "default")) && l.push(_);
        }
      }
    }
  const a = [i, l];
  return U(e) && s.set(e, a), a;
}
function As(e) {
  return e[0] !== "$";
}
function Ps(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Os(e, t) {
  return Ps(e) === Ps(t);
}
function Is(e, t) {
  return I(t) ? t.findIndex((n) => Os(n, e)) : L(t) && Os(t, e) ? 0 : -1;
}
const Ho = (e) => e[0] === "_" || e === "$stable", es = (e) => I(e) ? e.map(Fe) : [Fe(e)], Si = (e, t, n) => {
  if (t._n)
    return t;
  const s = In((...o) => es(t(...o)), n);
  return s._c = !1, s;
}, ko = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (Ho(o))
      continue;
    const r = e[o];
    if (L(r))
      t[o] = Si(o, r, s);
    else if (r != null) {
      const i = es(r);
      t[o] = () => i;
    }
  }
}, Do = (e, t) => {
  const n = es(t);
  e.slots.default = () => n;
}, Bi = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = j(t), qt(t, "_", n)) : ko(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Do(e, t);
  qt(e.slots, un, 1);
}, $i = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let r = !0, i = W;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? r = !1 : (Z(o, t), !n && l === 1 && delete o._) : (r = !t.$stable, ko(t, o)), i = t;
  } else
    t && (Do(e, t), i = { default: 1 });
  if (r)
    for (const l in o)
      !Ho(l) && !(l in i) && delete o[l];
};
function Ln(e, t, n, s, o = !1) {
  if (I(e)) {
    e.forEach(
      (b, C) => Ln(
        b,
        t && (I(t) ? t[C] : t),
        n,
        s,
        o
      )
    );
    return;
  }
  if (Wt(s) && !o)
    return;
  const r = s.shapeFlag & 4 ? ss(s.component) || s.component.proxy : s.el, i = o ? null : r, { i: l, r: f } = e, a = t && t.r, d = l.refs === W ? l.refs = {} : l.refs, _ = l.setupState;
  if (a != null && a !== f && (G(a) ? (d[a] = null, $(_, a) && (_[a] = null)) : ie(a) && (a.value = null)), L(f))
    Ve(f, l, 12, [i, d]);
  else {
    const b = G(f), C = ie(f);
    if (b || C) {
      const N = () => {
        if (e.f) {
          const T = b ? $(_, f) ? _[f] : d[f] : f.value;
          o ? I(T) && Hn(T, r) : I(T) ? T.includes(r) || T.push(r) : b ? (d[f] = [r], $(_, f) && (_[f] = d[f])) : (f.value = [r], e.k && (d[e.k] = f.value));
        } else
          b ? (d[f] = i, $(_, f) && (_[f] = i)) : C && (f.value = i, e.k && (d[e.k] = i));
      };
      i ? (N.id = -1, ce(N, n)) : N();
    }
  }
}
const ce = ui;
function ji(e) {
  return Hi(e);
}
function Hi(e, t) {
  const n = wn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: o,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: f,
    setText: a,
    setElementText: d,
    parentNode: _,
    nextSibling: b,
    setScopeId: C = we,
    insertStaticContent: N
  } = e, T = (c, u, h, g = null, p = null, y = null, w = !1, x = null, v = !!u.dynamicChildren) => {
    if (c === u)
      return;
    c && !et(c, u) && (g = St(c), Pe(c, p, y, !0), c = null), u.patchFlag === -2 && (v = !1, u.dynamicChildren = null);
    const { type: m, ref: P, shapeFlag: E } = u;
    switch (m) {
      case fn:
        B(c, u, h, g);
        break;
      case Te:
        V(c, u, h, g);
        break;
      case bn:
        c == null && z(u, h, g, w);
        break;
      case he:
        A(
          c,
          u,
          h,
          g,
          p,
          y,
          w,
          x,
          v
        );
        break;
      default:
        E & 1 ? ee(
          c,
          u,
          h,
          g,
          p,
          y,
          w,
          x,
          v
        ) : E & 6 ? J(
          c,
          u,
          h,
          g,
          p,
          y,
          w,
          x,
          v
        ) : (E & 64 || E & 128) && m.process(
          c,
          u,
          h,
          g,
          p,
          y,
          w,
          x,
          v,
          ot
        );
    }
    P != null && p && Ln(P, c && c.ref, y, u || c, !u);
  }, B = (c, u, h, g) => {
    if (c == null)
      s(
        u.el = l(u.children),
        h,
        g
      );
    else {
      const p = u.el = c.el;
      u.children !== c.children && a(p, u.children);
    }
  }, V = (c, u, h, g) => {
    c == null ? s(
      u.el = f(u.children || ""),
      h,
      g
    ) : u.el = c.el;
  }, z = (c, u, h, g) => {
    [c.el, c.anchor] = N(
      c.children,
      u,
      h,
      g,
      c.el,
      c.anchor
    );
  }, q = ({ el: c, anchor: u }, h, g) => {
    let p;
    for (; c && c !== u; )
      p = b(c), s(c, h, g), c = p;
    s(u, h, g);
  }, M = ({ el: c, anchor: u }) => {
    let h;
    for (; c && c !== u; )
      h = b(c), o(c), c = h;
    o(u);
  }, ee = (c, u, h, g, p, y, w, x, v) => {
    w = w || u.type === "svg", c == null ? Ee(
      u,
      h,
      g,
      p,
      y,
      w,
      x,
      v
    ) : Y(
      c,
      u,
      p,
      y,
      w,
      x,
      v
    );
  }, Ee = (c, u, h, g, p, y, w, x) => {
    let v, m;
    const { type: P, props: E, shapeFlag: O, transition: F, dirs: S } = c;
    if (v = c.el = i(
      c.type,
      y,
      E && E.is,
      E
    ), O & 8 ? d(v, c.children) : O & 16 && R(
      c.children,
      v,
      null,
      g,
      p,
      y && P !== "foreignObject",
      w,
      x
    ), S && Xe(c, null, g, "created"), Ae(v, c, c.scopeId, w, g), E) {
      for (const H in E)
        H !== "value" && !Ut(H) && r(
          v,
          H,
          null,
          E[H],
          y,
          c.children,
          g,
          p,
          Re
        );
      "value" in E && r(v, "value", null, E.value), (m = E.onVnodeBeforeMount) && Ie(m, g, c);
    }
    S && Xe(c, null, g, "beforeMount");
    const D = (!p || p && !p.pendingBranch) && F && !F.persisted;
    D && F.beforeEnter(v), s(v, u, h), ((m = E && E.onVnodeMounted) || D || S) && ce(() => {
      m && Ie(m, g, c), D && F.enter(v), S && Xe(c, null, g, "mounted");
    }, p);
  }, Ae = (c, u, h, g, p) => {
    if (h && C(c, h), g)
      for (let y = 0; y < g.length; y++)
        C(c, g[y]);
    if (p) {
      let y = p.subTree;
      if (u === y) {
        const w = p.vnode;
        Ae(
          c,
          w,
          w.scopeId,
          w.slotScopeIds,
          p.parent
        );
      }
    }
  }, R = (c, u, h, g, p, y, w, x, v = 0) => {
    for (let m = v; m < c.length; m++) {
      const P = c[m] = x ? Ue(c[m]) : Fe(c[m]);
      T(
        null,
        P,
        u,
        h,
        g,
        p,
        y,
        w,
        x
      );
    }
  }, Y = (c, u, h, g, p, y, w) => {
    const x = u.el = c.el;
    let { patchFlag: v, dynamicChildren: m, dirs: P } = u;
    v |= c.patchFlag & 16;
    const E = c.props || W, O = u.props || W;
    let F;
    h && Ze(h, !1), (F = O.onVnodeBeforeUpdate) && Ie(F, h, u, c), P && Xe(u, c, h, "beforeUpdate"), h && Ze(h, !0);
    const S = p && u.type !== "foreignObject";
    if (m ? K(
      c.dynamicChildren,
      m,
      x,
      h,
      g,
      S,
      y
    ) : w || k(
      c,
      u,
      x,
      null,
      h,
      g,
      S,
      y,
      !1
    ), v > 0) {
      if (v & 16)
        oe(
          x,
          u,
          E,
          O,
          h,
          g,
          p
        );
      else if (v & 2 && E.class !== O.class && r(x, "class", null, O.class, p), v & 4 && r(x, "style", E.style, O.style, p), v & 8) {
        const D = u.dynamicProps;
        for (let H = 0; H < D.length; H++) {
          const Q = D[H], _e = E[Q], rt = O[Q];
          (rt !== _e || Q === "value") && r(
            x,
            Q,
            _e,
            rt,
            p,
            c.children,
            h,
            g,
            Re
          );
        }
      }
      v & 1 && c.children !== u.children && d(x, u.children);
    } else
      !w && m == null && oe(
        x,
        u,
        E,
        O,
        h,
        g,
        p
      );
    ((F = O.onVnodeUpdated) || P) && ce(() => {
      F && Ie(F, h, u, c), P && Xe(u, c, h, "updated");
    }, g);
  }, K = (c, u, h, g, p, y, w) => {
    for (let x = 0; x < u.length; x++) {
      const v = c[x], m = u[x], P = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        v.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (v.type === he || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !et(v, m) || // - In the case of a component, it could contain anything.
        v.shapeFlag & 70) ? _(v.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      T(
        v,
        m,
        P,
        null,
        g,
        p,
        y,
        w,
        !0
      );
    }
  }, oe = (c, u, h, g, p, y, w) => {
    if (h !== g) {
      if (h !== W)
        for (const x in h)
          !Ut(x) && !(x in g) && r(
            c,
            x,
            h[x],
            null,
            w,
            u.children,
            p,
            y,
            Re
          );
      for (const x in g) {
        if (Ut(x))
          continue;
        const v = g[x], m = h[x];
        v !== m && x !== "value" && r(
          c,
          x,
          m,
          v,
          w,
          u.children,
          p,
          y,
          Re
        );
      }
      "value" in g && r(c, "value", h.value, g.value);
    }
  }, A = (c, u, h, g, p, y, w, x, v) => {
    const m = u.el = c ? c.el : l(""), P = u.anchor = c ? c.anchor : l("");
    let { patchFlag: E, dynamicChildren: O, slotScopeIds: F } = u;
    F && (x = x ? x.concat(F) : F), c == null ? (s(m, h, g), s(P, h, g), R(
      u.children,
      h,
      P,
      p,
      y,
      w,
      x,
      v
    )) : E > 0 && E & 64 && O && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (K(
      c.dynamicChildren,
      O,
      h,
      p,
      y,
      w,
      x
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || p && u === p.subTree) && Ko(
      c,
      u,
      !0
      /* shallow */
    )) : k(
      c,
      u,
      h,
      P,
      p,
      y,
      w,
      x,
      v
    );
  }, J = (c, u, h, g, p, y, w, x, v) => {
    u.slotScopeIds = x, c == null ? u.shapeFlag & 512 ? p.ctx.activate(
      u,
      h,
      g,
      w,
      v
    ) : ae(
      u,
      h,
      g,
      p,
      y,
      w,
      v
    ) : _t(c, u, v);
  }, ae = (c, u, h, g, p, y, w) => {
    const x = c.component = Xi(
      c,
      g,
      p
    );
    if (ln(c) && (x.ctx.renderer = ot), Zi(x), x.asyncDep) {
      if (p && p.registerDep(x, te), !c.el) {
        const v = x.subTree = ne(Te);
        V(null, v, u, h);
      }
      return;
    }
    te(
      x,
      c,
      u,
      h,
      p,
      y,
      w
    );
  }, _t = (c, u, h) => {
    const g = u.component = c.component;
    if (li(c, u, h))
      if (g.asyncDep && !g.asyncResolved) {
        X(g, u, h);
        return;
      } else
        g.next = u, ti(g.update), g.update();
    else
      u.el = c.el, g.vnode = u;
  }, te = (c, u, h, g, p, y, w) => {
    const x = () => {
      if (c.isMounted) {
        let { next: P, bu: E, u: O, parent: F, vnode: S } = c, D = P, H;
        Ze(c, !1), P ? (P.el = S.el, X(c, P, w)) : P = S, E && pn(E), (H = P.props && P.props.onVnodeBeforeUpdate) && Ie(H, F, P, S), Ze(c, !0);
        const Q = gn(c), _e = c.subTree;
        c.subTree = Q, T(
          _e,
          Q,
          // parent may have changed if it's in a teleport
          _(_e.el),
          // anchor may have changed if it's in a fragment
          St(_e),
          c,
          p,
          y
        ), P.el = Q.el, D === null && ci(c, Q.el), O && ce(O, p), (H = P.props && P.props.onVnodeUpdated) && ce(
          () => Ie(H, F, P, S),
          p
        );
      } else {
        let P;
        const { el: E, props: O } = u, { bm: F, m: S, parent: D } = c, H = Wt(u);
        if (Ze(c, !1), F && pn(F), !H && (P = O && O.onVnodeBeforeMount) && Ie(P, D, u), Ze(c, !0), E && dn) {
          const Q = () => {
            c.subTree = gn(c), dn(
              E,
              c.subTree,
              c,
              p,
              null
            );
          };
          H ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !c.isUnmounted && Q()
          ) : Q();
        } else {
          const Q = c.subTree = gn(c);
          T(
            null,
            Q,
            h,
            g,
            c,
            p,
            y
          ), u.el = Q.el;
        }
        if (S && ce(S, p), !H && (P = O && O.onVnodeMounted)) {
          const Q = u;
          ce(
            () => Ie(P, D, Q),
            p
          );
        }
        (u.shapeFlag & 256 || D && Wt(D.vnode) && D.vnode.shapeFlag & 256) && c.a && ce(c.a, p), c.isMounted = !0, u = h = g = null;
      }
    }, v = c.effect = new Un(
      x,
      () => Xn(m),
      c.scope
      // track it in component's effect scope
    ), m = c.update = () => v.run();
    m.id = c.uid, Ze(c, !0), m();
  }, X = (c, u, h) => {
    u.component = c;
    const g = c.vnode.props;
    c.vnode = u, c.next = null, Li(c, u.props, g, h), $i(c, u.children, h), gt(), xs(), mt();
  }, k = (c, u, h, g, p, y, w, x, v = !1) => {
    const m = c && c.children, P = c ? c.shapeFlag : 0, E = u.children, { patchFlag: O, shapeFlag: F } = u;
    if (O > 0) {
      if (O & 128) {
        Lt(
          m,
          E,
          h,
          g,
          p,
          y,
          w,
          x,
          v
        );
        return;
      } else if (O & 256) {
        Je(
          m,
          E,
          h,
          g,
          p,
          y,
          w,
          x,
          v
        );
        return;
      }
    }
    F & 8 ? (P & 16 && Re(m, p, y), E !== m && d(h, E)) : P & 16 ? F & 16 ? Lt(
      m,
      E,
      h,
      g,
      p,
      y,
      w,
      x,
      v
    ) : Re(m, p, y, !0) : (P & 8 && d(h, ""), F & 16 && R(
      E,
      h,
      g,
      p,
      y,
      w,
      x,
      v
    ));
  }, Je = (c, u, h, g, p, y, w, x, v) => {
    c = c || ct, u = u || ct;
    const m = c.length, P = u.length, E = Math.min(m, P);
    let O;
    for (O = 0; O < E; O++) {
      const F = u[O] = v ? Ue(u[O]) : Fe(u[O]);
      T(
        c[O],
        F,
        h,
        null,
        p,
        y,
        w,
        x,
        v
      );
    }
    m > P ? Re(
      c,
      p,
      y,
      !0,
      !1,
      E
    ) : R(
      u,
      h,
      g,
      p,
      y,
      w,
      x,
      v,
      E
    );
  }, Lt = (c, u, h, g, p, y, w, x, v) => {
    let m = 0;
    const P = u.length;
    let E = c.length - 1, O = P - 1;
    for (; m <= E && m <= O; ) {
      const F = c[m], S = u[m] = v ? Ue(u[m]) : Fe(u[m]);
      if (et(F, S))
        T(
          F,
          S,
          h,
          null,
          p,
          y,
          w,
          x,
          v
        );
      else
        break;
      m++;
    }
    for (; m <= E && m <= O; ) {
      const F = c[E], S = u[O] = v ? Ue(u[O]) : Fe(u[O]);
      if (et(F, S))
        T(
          F,
          S,
          h,
          null,
          p,
          y,
          w,
          x,
          v
        );
      else
        break;
      E--, O--;
    }
    if (m > E) {
      if (m <= O) {
        const F = O + 1, S = F < P ? u[F].el : g;
        for (; m <= O; )
          T(
            null,
            u[m] = v ? Ue(u[m]) : Fe(u[m]),
            h,
            S,
            p,
            y,
            w,
            x,
            v
          ), m++;
      }
    } else if (m > O)
      for (; m <= E; )
        Pe(c[m], p, y, !0), m++;
    else {
      const F = m, S = m, D = /* @__PURE__ */ new Map();
      for (m = S; m <= O; m++) {
        const de = u[m] = v ? Ue(u[m]) : Fe(u[m]);
        de.key != null && D.set(de.key, m);
      }
      let H, Q = 0;
      const _e = O - S + 1;
      let rt = !1, cs = 0;
      const bt = new Array(_e);
      for (m = 0; m < _e; m++)
        bt[m] = 0;
      for (m = F; m <= E; m++) {
        const de = c[m];
        if (Q >= _e) {
          Pe(de, p, y, !0);
          continue;
        }
        let Oe;
        if (de.key != null)
          Oe = D.get(de.key);
        else
          for (H = S; H <= O; H++)
            if (bt[H - S] === 0 && et(de, u[H])) {
              Oe = H;
              break;
            }
        Oe === void 0 ? Pe(de, p, y, !0) : (bt[Oe - S] = m + 1, Oe >= cs ? cs = Oe : rt = !0, T(
          de,
          u[Oe],
          h,
          null,
          p,
          y,
          w,
          x,
          v
        ), Q++);
      }
      const fs = rt ? ki(bt) : ct;
      for (H = fs.length - 1, m = _e - 1; m >= 0; m--) {
        const de = S + m, Oe = u[de], us = de + 1 < P ? u[de + 1].el : g;
        bt[m] === 0 ? T(
          null,
          Oe,
          h,
          us,
          p,
          y,
          w,
          x,
          v
        ) : rt && (H < 0 || m !== fs[H] ? Ye(Oe, h, us, 2) : H--);
      }
    }
  }, Ye = (c, u, h, g, p = null) => {
    const { el: y, type: w, transition: x, children: v, shapeFlag: m } = c;
    if (m & 6) {
      Ye(c.component.subTree, u, h, g);
      return;
    }
    if (m & 128) {
      c.suspense.move(u, h, g);
      return;
    }
    if (m & 64) {
      w.move(c, u, h, ot);
      return;
    }
    if (w === he) {
      s(y, u, h);
      for (let E = 0; E < v.length; E++)
        Ye(v[E], u, h, g);
      s(c.anchor, u, h);
      return;
    }
    if (w === bn) {
      q(c, u, h);
      return;
    }
    if (g !== 2 && m & 1 && x)
      if (g === 0)
        x.beforeEnter(y), s(y, u, h), ce(() => x.enter(y), p);
      else {
        const { leave: E, delayLeave: O, afterLeave: F } = x, S = () => s(y, u, h), D = () => {
          E(y, () => {
            S(), F && F();
          });
        };
        O ? O(y, S, D) : D();
      }
    else
      s(y, u, h);
  }, Pe = (c, u, h, g = !1, p = !1) => {
    const {
      type: y,
      props: w,
      ref: x,
      children: v,
      dynamicChildren: m,
      shapeFlag: P,
      patchFlag: E,
      dirs: O
    } = c;
    if (x != null && Ln(x, null, h, c, !0), P & 256) {
      u.ctx.deactivate(c);
      return;
    }
    const F = P & 1 && O, S = !Wt(c);
    let D;
    if (S && (D = w && w.onVnodeBeforeUnmount) && Ie(D, u, c), P & 6)
      sr(c.component, h, g);
    else {
      if (P & 128) {
        c.suspense.unmount(h, g);
        return;
      }
      F && Xe(c, null, u, "beforeUnmount"), P & 64 ? c.type.remove(
        c,
        u,
        h,
        p,
        ot,
        g
      ) : m && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== he || E > 0 && E & 64) ? Re(
        m,
        u,
        h,
        !1,
        !0
      ) : (y === he && E & 384 || !p && P & 16) && Re(v, u, h), g && is(c);
    }
    (S && (D = w && w.onVnodeUnmounted) || F) && ce(() => {
      D && Ie(D, u, c), F && Xe(c, null, u, "unmounted");
    }, h);
  }, is = (c) => {
    const { type: u, el: h, anchor: g, transition: p } = c;
    if (u === he) {
      nr(h, g);
      return;
    }
    if (u === bn) {
      M(c);
      return;
    }
    const y = () => {
      o(h), p && !p.persisted && p.afterLeave && p.afterLeave();
    };
    if (c.shapeFlag & 1 && p && !p.persisted) {
      const { leave: w, delayLeave: x } = p, v = () => w(h, y);
      x ? x(c.el, y, v) : v();
    } else
      y();
  }, nr = (c, u) => {
    let h;
    for (; c !== u; )
      h = b(c), o(c), c = h;
    o(u);
  }, sr = (c, u, h) => {
    const { bum: g, scope: p, update: y, subTree: w, um: x } = c;
    g && pn(g), p.stop(), y && (y.active = !1, Pe(w, c, u, h)), x && ce(x, u), ce(() => {
      c.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve());
  }, Re = (c, u, h, g = !1, p = !1, y = 0) => {
    for (let w = y; w < c.length; w++)
      Pe(c[w], u, h, g, p);
  }, St = (c) => c.shapeFlag & 6 ? St(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : b(c.anchor || c.el), ls = (c, u, h) => {
    c == null ? u._vnode && Pe(u._vnode, null, null, !0) : T(u._vnode || null, c, u, null, null, null, h), xs(), Co(), u._vnode = c;
  }, ot = {
    p: T,
    um: Pe,
    m: Ye,
    r: is,
    mt: ae,
    mc: R,
    pc: k,
    pbc: K,
    n: St,
    o: e
  };
  let an, dn;
  return t && ([an, dn] = t(
    ot
  )), {
    render: ls,
    hydrate: an,
    createApp: Fi(ls, an)
  };
}
function Ze({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ko(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (I(s) && I(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let l = o[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[r] = Ue(o[r]), l.el = i.el), n || Ko(i, l)), l.type === fn && (l.el = i.el);
    }
}
function ki(e) {
  const t = e.slice(), n = [0];
  let s, o, r, i, l;
  const f = e.length;
  for (s = 0; s < f; s++) {
    const a = e[s];
    if (a !== 0) {
      if (o = n[n.length - 1], e[o] < a) {
        t[s] = o, n.push(s);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        l = r + i >> 1, e[n[l]] < a ? r = l + 1 : i = l;
      a < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
const Di = (e) => e.__isTeleport, he = Symbol.for("v-fgt"), fn = Symbol.for("v-txt"), Te = Symbol.for("v-cmt"), bn = Symbol.for("v-stc"), Tt = [];
let ve = null;
function fe(e = !1) {
  Tt.push(ve = e ? null : []);
}
function Ki() {
  Tt.pop(), ve = Tt[Tt.length - 1] || null;
}
let Ft = 1;
function Ms(e) {
  Ft += e;
}
function Uo(e) {
  return e.dynamicChildren = Ft > 0 ? ve || ct : null, Ki(), Ft > 0 && ve && ve.push(e), e;
}
function Me(e, t, n, s, o, r) {
  return Uo(
    ye(
      e,
      t,
      n,
      s,
      o,
      r,
      !0
      /* isBlock */
    )
  );
}
function Qt(e, t, n, s, o) {
  return Uo(
    ne(
      e,
      t,
      n,
      s,
      o,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Sn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const un = "__vInternal", Wo = ({ key: e }) => e ?? null, zt = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? G(e) || ie(e) || L(e) ? { i: Ce, r: e, k: t, f: !!n } : e : null);
function ye(e, t = null, n = null, s = 0, o = null, r = e === he ? 0 : 1, i = !1, l = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Wo(t),
    ref: t && zt(t),
    scopeId: To,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ce
  };
  return l ? (ts(f, n), r & 128 && e.normalize(f)) : n && (f.shapeFlag |= G(n) ? 8 : 16), Ft > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ve && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && ve.push(f), f;
}
const ne = Ui;
function Ui(e, t = null, n = null, s = 0, o = null, r = !1) {
  if ((!e || e === wi) && (e = Te), Sn(e)) {
    const l = qe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ts(l, n), Ft > 0 && !r && ve && (l.shapeFlag & 6 ? ve[ve.indexOf(e)] = l : ve.push(l)), l.patchFlag |= -2, l;
  }
  if (tl(e) && (e = e.__vccOpts), t) {
    t = Wi(t);
    let { class: l, style: f } = t;
    l && !G(l) && (t.class = ut(l)), U(f) && (ho(f) && !I(f) && (f = Z({}, f)), t.style = Be(f));
  }
  const i = G(e) ? 1 : fi(e) ? 128 : Di(e) ? 64 : U(e) ? 4 : L(e) ? 2 : 0;
  return ye(
    e,
    t,
    n,
    s,
    o,
    i,
    r,
    !0
  );
}
function Wi(e) {
  return e ? ho(e) || un in e ? Z({}, e) : e : null;
}
function qe(e, t, n = !1) {
  const { props: s, ref: o, patchFlag: r, children: i } = e, l = t ? qi(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Wo(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? I(o) ? o.concat(zt(t)) : [o, zt(t)] : zt(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== he ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && qe(e.ssContent),
    ssFallback: e.ssFallback && qe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Vi(e = " ", t = 0) {
  return ne(fn, null, e, t);
}
function zi(e = "", t = !1) {
  return t ? (fe(), Qt(Te, null, e)) : ne(Te, null, e);
}
function Fe(e) {
  return e == null || typeof e == "boolean" ? ne(Te) : I(e) ? ne(
    he,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Ue(e) : ne(fn, null, String(e));
}
function Ue(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : qe(e);
}
function ts(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (I(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), ts(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(un in t) ? t._ctx = Ce : o === 3 && Ce && (Ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    L(t) ? (t = { default: t, _ctx: Ce }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Vi(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function qi(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = ut([t.class, s.class]));
      else if (o === "style")
        t.style = Be([t.style, s.style]);
      else if (Gt(o)) {
        const r = t[o], i = s[o];
        i && r !== i && !(I(r) && r.includes(i)) && (t[o] = r ? [].concat(r, i) : i);
      } else
        o !== "" && (t[o] = s[o]);
  }
  return t;
}
function Ie(e, t, n, s = null) {
  me(e, t, 7, [
    n,
    s
  ]);
}
const Ji = Bo();
let Yi = 0;
function Xi(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || Ji, r = {
    uid: Yi++,
    vnode: e,
    type: s,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new _r(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: jo(s, o),
    emitsOptions: wo(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: W,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: W,
    data: W,
    props: W,
    attrs: W,
    slots: W,
    refs: W,
    setupState: W,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = oi.bind(null, r), e.ce && e.ce(r), r;
}
let se = null;
const Vo = () => se || Ce;
let ns, it, Fs = "__VUE_INSTANCE_SETTERS__";
(it = wn()[Fs]) || (it = wn()[Fs] = []), it.push((e) => se = e), ns = (e) => {
  it.length > 1 ? it.forEach((t) => t(e)) : it[0](e);
};
const pt = (e) => {
  ns(e), e.scope.on();
}, st = () => {
  se && se.scope.off(), ns(null);
};
function zo(e) {
  return e.vnode.shapeFlag & 4;
}
let Nt = !1;
function Zi(e, t = !1) {
  Nt = t;
  const { props: n, children: s } = e.vnode, o = zo(e);
  Ri(e, n, o, t), Bi(e, s);
  const r = o ? Qi(e, t) : void 0;
  return Nt = !1, r;
}
function Qi(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = po(new Proxy(e.ctx, Ti));
  const { setup: s } = n;
  if (s) {
    const o = e.setupContext = s.length > 1 ? el(e) : null;
    pt(e), gt();
    const r = Ve(
      s,
      e,
      0,
      [e.props, o]
    );
    if (mt(), st(), Js(r)) {
      if (r.then(st, st), t)
        return r.then((i) => {
          Ns(e, i, t);
        }).catch((i) => {
          on(i, e, 0);
        });
      e.asyncDep = r;
    } else
      Ns(e, r, t);
  } else
    qo(e, t);
}
function Ns(e, t, n) {
  L(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : U(t) && (e.setupState = _o(t)), qo(e, n);
}
let Rs;
function qo(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Rs && !s.render) {
      const o = s.template || Gn(e).template;
      if (o) {
        const { isCustomElement: r, compilerOptions: i } = e.appContext.config, { delimiters: l, compilerOptions: f } = s, a = Z(
          Z(
            {
              isCustomElement: r,
              delimiters: l
            },
            i
          ),
          f
        );
        s.render = Rs(o, a);
      }
    }
    e.render = s.render || we;
  }
  pt(e), gt(), Ei(e), mt(), st();
}
function Gi(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return ue(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function el(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Gi(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ss(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(_o(po(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in wt)
          return wt[n](e);
      },
      has(t, n) {
        return n in t || n in wt;
      }
    }));
}
function tl(e) {
  return L(e) && "__vccOpts" in e;
}
const nl = (e, t) => Qr(e, t, Nt);
function sl(e, t, n) {
  const s = arguments.length;
  return s === 2 ? U(t) && !I(t) ? Sn(t) ? ne(e, null, [t]) : ne(e, t) : ne(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Sn(n) && (n = [n]), ne(e, t, n));
}
const ol = Symbol.for("v-scx"), rl = () => Vt(ol), il = "3.3.4", ll = "http://www.w3.org/2000/svg", tt = typeof document < "u" ? document : null, Ls = tt && /* @__PURE__ */ tt.createElement("template"), cl = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t ? tt.createElementNS(ll, e) : tt.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (e) => tt.createTextNode(e),
  createComment: (e) => tt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => tt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, o, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      Ls.innerHTML = s ? `<svg>${e}</svg>` : e;
      const l = Ls.content;
      if (s) {
        const f = l.firstChild;
        for (; f.firstChild; )
          l.appendChild(f.firstChild);
        l.removeChild(f);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function fl(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function ul(e, t, n) {
  const s = e.style, o = G(n);
  if (n && !o) {
    if (t && !G(t))
      for (const r in t)
        n[r] == null && Bn(s, r, "");
    for (const r in n)
      Bn(s, r, n[r]);
  } else {
    const r = s.display;
    o ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
  }
}
const Ss = /\s*!important$/;
function Bn(e, t, n) {
  if (I(n))
    n.forEach((s) => Bn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = al(e, t);
    Ss.test(n) ? e.setProperty(
      ge(s),
      n.replace(Ss, ""),
      "important"
    ) : e[s] = n;
  }
}
const Bs = ["Webkit", "Moz", "ms"], xn = {};
function al(e, t) {
  const n = xn[t];
  if (n)
    return n;
  let s = $e(t);
  if (s !== "filter" && s in e)
    return xn[t] = s;
  s = Zs(s);
  for (let o = 0; o < Bs.length; o++) {
    const r = Bs[o] + s;
    if (r in e)
      return xn[t] = r;
  }
  return t;
}
const $s = "http://www.w3.org/1999/xlink";
function dl(e, t, n, s, o) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS($s, t.slice(6, t.length)) : e.setAttributeNS($s, t, n);
  else {
    const r = mr(t);
    n == null || r && !Qs(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function hl(e, t, n, s, o, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, o, r), e[t] = n ?? "";
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    e._value = n;
    const a = l === "OPTION" ? e.getAttribute("value") : e.value, d = n ?? "";
    a !== d && (e.value = d), n == null && e.removeAttribute(t);
    return;
  }
  let f = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Qs(n) : n == null && a === "string" ? (n = "", f = !0) : a === "number" && (n = 0, f = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  f && e.removeAttribute(t);
}
function pl(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function gl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function ml(e, t, n, s, o = null) {
  const r = e._vei || (e._vei = {}), i = r[t];
  if (s && i)
    i.value = s;
  else {
    const [l, f] = _l(t);
    if (s) {
      const a = r[t] = yl(s, o);
      pl(e, l, a, f);
    } else
      i && (gl(e, l, i, f), r[t] = void 0);
  }
}
const js = /(?:Once|Passive|Capture)$/;
function _l(e) {
  let t;
  if (js.test(e)) {
    t = {};
    let s;
    for (; s = e.match(js); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ge(e.slice(2)), t];
}
let yn = 0;
const bl = /* @__PURE__ */ Promise.resolve(), xl = () => yn || (bl.then(() => yn = 0), yn = Date.now());
function yl(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    me(
      Cl(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = xl(), n;
}
function Cl(e, t) {
  if (I(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (o) => !o._stopped && s && s(o));
  } else
    return t;
}
const Hs = /^on[a-z]/, vl = (e, t, n, s, o = !1, r, i, l, f) => {
  t === "class" ? fl(e, s, o) : t === "style" ? ul(e, n, s) : Gt(t) ? jn(t) || ml(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : wl(e, t, s, o)) ? hl(
    e,
    t,
    s,
    r,
    i,
    l,
    f
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), dl(e, t, s, o));
};
function wl(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && Hs.test(t) && L(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Hs.test(t) && G(n) ? !1 : t in e;
}
function Tl(e, t) {
  const n = Rt(e);
  class s extends os {
    constructor(r) {
      super(n, r, t);
    }
  }
  return s.def = n, s;
}
const El = typeof HTMLElement < "u" ? HTMLElement : class {
};
class os extends El {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, xo(() => {
      this._connected || (zs(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    new MutationObserver((s) => {
      for (const o of s)
        this._setAttr(o.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, o = !1) => {
      const { props: r, styles: i } = s;
      let l;
      if (r && !I(r))
        for (const f in r) {
          const a = r[f];
          (a === Number || a && a.type === Number) && (f in this._props && (this._props[f] = vn(this._props[f])), (l || (l = /* @__PURE__ */ Object.create(null)))[$e(f)] = !0);
        }
      this._numberProps = l, o && this._resolveProps(s), this._applyStyles(i), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = I(n) ? n : Object.keys(n || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && s.includes(o) && this._setProp(o, this[o], !0, !1);
    for (const o of s.map($e))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(r) {
          this._setProp(o, r);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = $e(t);
    this._numberProps && this._numberProps[s] && (n = vn(n)), this._setProp(s, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, s = !0, o = !0) {
    n !== this._props[t] && (this._props[t] = n, o && this._instance && this._update(), s && (n === !0 ? this.setAttribute(ge(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ge(t), n + "") : n || this.removeAttribute(ge(t))));
  }
  _update() {
    zs(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = ne(this._def, Z({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (r, i) => {
        this.dispatchEvent(
          new CustomEvent(r, {
            detail: i
          })
        );
      };
      n.emit = (r, ...i) => {
        s(r, i), ge(r) !== r && s(ge(r), i);
      };
      let o = this;
      for (; o = o && (o.parentNode || o.host); )
        if (o instanceof os) {
          n.parent = o._instance, n.provides = o._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const s = document.createElement("style");
      s.textContent = n, this.shadowRoot.appendChild(s);
    });
  }
}
const De = "transition", xt = "animation", rs = (e, { slots: t }) => sl(hi, Yo(e), t);
rs.displayName = "Transition";
const Jo = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, Al = rs.props = /* @__PURE__ */ Z(
  {},
  Oo,
  Jo
), Qe = (e, t = []) => {
  I(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, ks = (e) => e ? I(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Yo(e) {
  const t = {};
  for (const A in e)
    A in Jo || (t[A] = e[A]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: s,
    duration: o,
    enterFromClass: r = `${n}-enter-from`,
    enterActiveClass: i = `${n}-enter-active`,
    enterToClass: l = `${n}-enter-to`,
    appearFromClass: f = r,
    appearActiveClass: a = i,
    appearToClass: d = l,
    leaveFromClass: _ = `${n}-leave-from`,
    leaveActiveClass: b = `${n}-leave-active`,
    leaveToClass: C = `${n}-leave-to`
  } = e, N = Pl(o), T = N && N[0], B = N && N[1], {
    onBeforeEnter: V,
    onEnter: z,
    onEnterCancelled: q,
    onLeave: M,
    onLeaveCancelled: ee,
    onBeforeAppear: Ee = V,
    onAppear: Ae = z,
    onAppearCancelled: R = q
  } = t, Y = (A, J, ae) => {
    Ke(A, J ? d : l), Ke(A, J ? a : i), ae && ae();
  }, K = (A, J) => {
    A._isLeaving = !1, Ke(A, _), Ke(A, C), Ke(A, b), J && J();
  }, oe = (A) => (J, ae) => {
    const _t = A ? Ae : z, te = () => Y(J, A, ae);
    Qe(_t, [J, te]), Ds(() => {
      Ke(J, A ? f : r), Le(J, A ? d : l), ks(_t) || Ks(J, s, T, te);
    });
  };
  return Z(t, {
    onBeforeEnter(A) {
      Qe(V, [A]), Le(A, r), Le(A, i);
    },
    onBeforeAppear(A) {
      Qe(Ee, [A]), Le(A, f), Le(A, a);
    },
    onEnter: oe(!1),
    onAppear: oe(!0),
    onLeave(A, J) {
      A._isLeaving = !0;
      const ae = () => K(A, J);
      Le(A, _), Zo(), Le(A, b), Ds(() => {
        A._isLeaving && (Ke(A, _), Le(A, C), ks(M) || Ks(A, s, B, ae));
      }), Qe(M, [A, ae]);
    },
    onEnterCancelled(A) {
      Y(A, !1), Qe(q, [A]);
    },
    onAppearCancelled(A) {
      Y(A, !0), Qe(R, [A]);
    },
    onLeaveCancelled(A) {
      K(A), Qe(ee, [A]);
    }
  });
}
function Pl(e) {
  if (e == null)
    return null;
  if (U(e))
    return [Cn(e.enter), Cn(e.leave)];
  {
    const t = Cn(e);
    return [t, t];
  }
}
function Cn(e) {
  return vn(e);
}
function Le(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function Ke(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Ds(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Ol = 0;
function Ks(e, t, n, s) {
  const o = e._endId = ++Ol, r = () => {
    o === e._endId && s();
  };
  if (n)
    return setTimeout(r, n);
  const { type: i, timeout: l, propCount: f } = Xo(e, t);
  if (!i)
    return s();
  const a = i + "end";
  let d = 0;
  const _ = () => {
    e.removeEventListener(a, b), r();
  }, b = (C) => {
    C.target === e && ++d >= f && _();
  };
  setTimeout(() => {
    d < f && _();
  }, l + 1), e.addEventListener(a, b);
}
function Xo(e, t) {
  const n = window.getComputedStyle(e), s = (N) => (n[N] || "").split(", "), o = s(`${De}Delay`), r = s(`${De}Duration`), i = Us(o, r), l = s(`${xt}Delay`), f = s(`${xt}Duration`), a = Us(l, f);
  let d = null, _ = 0, b = 0;
  t === De ? i > 0 && (d = De, _ = i, b = r.length) : t === xt ? a > 0 && (d = xt, _ = a, b = f.length) : (_ = Math.max(i, a), d = _ > 0 ? i > a ? De : xt : null, b = d ? d === De ? r.length : f.length : 0);
  const C = d === De && /\b(transform|all)(,|$)/.test(
    s(`${De}Property`).toString()
  );
  return {
    type: d,
    timeout: _,
    propCount: b,
    hasTransform: C
  };
}
function Us(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => Ws(n) + Ws(e[s])));
}
function Ws(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Zo() {
  return document.body.offsetHeight;
}
const Qo = /* @__PURE__ */ new WeakMap(), Go = /* @__PURE__ */ new WeakMap(), er = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Z({}, Al, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = Vo(), s = Po();
    let o, r;
    return Fo(() => {
      if (!o.length)
        return;
      const i = e.moveClass || `${e.name || "v"}-move`;
      if (!Ll(
        o[0].el,
        n.vnode.el,
        i
      ))
        return;
      o.forEach(Fl), o.forEach(Nl);
      const l = o.filter(Rl);
      Zo(), l.forEach((f) => {
        const a = f.el, d = a.style;
        Le(a, i), d.transform = d.webkitTransform = d.transitionDuration = "";
        const _ = a._moveCb = (b) => {
          b && b.target !== a || (!b || /transform$/.test(b.propertyName)) && (a.removeEventListener("transitionend", _), a._moveCb = null, Ke(a, i));
        };
        a.addEventListener("transitionend", _);
      });
    }), () => {
      const i = j(e), l = Yo(i);
      let f = i.tag || he;
      o = r, r = t.default ? Zn(t.default()) : [];
      for (let a = 0; a < r.length; a++) {
        const d = r[a];
        d.key != null && Mt(
          d,
          It(d, l, s, n)
        );
      }
      if (o)
        for (let a = 0; a < o.length; a++) {
          const d = o[a];
          Mt(
            d,
            It(d, l, s, n)
          ), Qo.set(d, d.el.getBoundingClientRect());
        }
      return ne(f, null, r);
    };
  }
}, Il = (e) => delete e.mode;
er.props;
const Ml = er;
function Fl(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function Nl(e) {
  Go.set(e, e.el.getBoundingClientRect());
}
function Rl(e) {
  const t = Qo.get(e), n = Go.get(e), s = t.left - n.left, o = t.top - n.top;
  if (s || o) {
    const r = e.el.style;
    return r.transform = r.webkitTransform = `translate(${s}px,${o}px)`, r.transitionDuration = "0s", e;
  }
}
function Ll(e, t, n) {
  const s = e.cloneNode();
  e._vtc && e._vtc.forEach((i) => {
    i.split(/\s+/).forEach((l) => l && s.classList.remove(l));
  }), n.split(/\s+/).forEach((i) => i && s.classList.add(i)), s.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(s);
  const { hasTransform: r } = Xo(s);
  return o.removeChild(s), r;
}
const Sl = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Bl = (e, t) => (n) => {
  if (!("key" in n))
    return;
  const s = ge(n.key);
  if (t.some((o) => o === s || Sl[o] === s))
    return e(n);
}, $l = /* @__PURE__ */ Z({ patchProp: vl }, cl);
let Vs;
function jl() {
  return Vs || (Vs = ji($l));
}
const zs = (...e) => {
  jl().render(...e);
}, Hl = {
  for: "chat-bot-input",
  class: "chat-input-label"
}, kl = ["value", "onKeyup", "placeholder"], Dl = /* @__PURE__ */ Rt({
  __name: "chat-input-box",
  props: {
    inputValue: {},
    placeholder: {},
    textColor: {},
    bgColor: {}
  },
  emits: ["update:inputValue", "send:command"],
  setup(e, { emit: t }) {
    const n = e, s = (r) => {
      const i = r.target;
      i && t("update:inputValue", i.value);
    }, o = () => {
      n.inputValue.length && t("send:command", n.inputValue);
    };
    return (r, i) => (fe(), Me("label", Hl, [
      ye("input", {
        id: "chat-bot-input",
        class: "chat-input",
        type: "text",
        value: r.inputValue,
        onInput: s,
        onKeyup: Bl(o, ["enter"]),
        placeholder: r.placeholder,
        style: Be({
          border: `1px solid ${r.bgColor}`,
          backgroundColor: r.bgColor,
          color: r.textColor
        })
      }, null, 44, kl),
      ye("span", {
        class: "chat-input-chevron",
        onClick: o
      }, ">")
    ]));
  }
}), tr = /* @__PURE__ */ Rt({
  __name: "chat-message-box",
  props: {
    type: {},
    text: {},
    bgColor: {},
    textColor: {}
  },
  setup(e) {
    return (t, n) => (fe(), Me("div", {
      class: "message",
      style: Be({ color: t.textColor, backgroundColor: t.bgColor })
    }, Gs(t.text), 5));
  }
}), Kl = { class: "tasks-container" }, Ul = /* @__PURE__ */ Rt({
  __name: "chat-tasks",
  props: {
    botTasks: {},
    bgColor: {},
    textColor: {}
  },
  emits: ["trigger-command"],
  setup(e, { emit: t }) {
    const n = (s) => {
      t("trigger-command", s);
    };
    return (s, o) => (fe(), Me("ul", Kl, [
      (fe(!0), Me(he, null, Lo(s.botTasks, (r, i) => (fe(), Qt(tr, {
        key: i,
        onClick: (l) => n(r.text),
        type: "bot",
        text: r.text,
        bgColor: s.bgColor,
        textColor: s.textColor,
        class: "chat-button"
      }, null, 8, ["onClick", "text", "bgColor", "textColor"]))), 128))
    ]));
  }
}), Wl = /* @__PURE__ */ ye("div", { class: "chat-button__cross" }, null, -1), Vl = [
  Wl
], zl = {
  key: 1,
  class: "chat-bot-container"
}, ql = /* @__PURE__ */ ye("div", { class: "chat-button__cross" }, null, -1), Jl = [
  ql
], Yl = { class: "chat-messages" }, Xl = /* @__PURE__ */ Rt({
  __name: "chat-bot-widget.ce",
  props: {
    headerText: { default: "Чат" },
    placeholder: { default: "Введите команду" },
    botBgColor: { default: "#d978bd" },
    botTextColor: { default: "#1d161d" },
    clientBgColor: { default: "#e5e6c1" },
    clientTextColor: { default: "#1d161d" },
    botTasks: { default: () => [
      {
        text: "Заказать пиццу",
        response: "Хорошо, я закажу пиццу. Что еще могу сделать?",
        action: () => {
        }
      },
      {
        text: "Установить будильник",
        response: "Хорошо, я установлю будильник. Что еще могу сделать?",
        action: () => {
        }
      },
      {
        text: "Вывести погоду",
        response: "Хорошо, я выведу погоду. Что еще могу сделать?",
        action: () => {
        }
      }
    ] }
  },
  setup(e) {
    const t = e, n = sn([
      {
        type: "bot",
        text: "Привет! Что я могу для Вас сделать?"
      }
    ]), s = (C) => {
      const N = C.text.split(".");
      N.length > 1 ? N.forEach((T) => {
        const B = {
          type: C.type,
          text: T
        };
        n.push(B);
      }) : n.push(C);
    }, o = (C) => {
      const N = t.botTasks.find(
        (T) => T.text.toLowerCase() === C.toLowerCase()
      );
      if (N) {
        b(N.text), l.value = "";
        return;
      } else {
        s({
          type: "client",
          text: C
        }), l.value = "";
        const B = {
          type: "bot",
          text: "Извините, такой задачи у меня нет. Чем могу помочь?"
        };
        setTimeout(() => {
          s(B), setTimeout(() => {
            n.push(t.botTasks);
          }, 300);
        }, 500);
      }
    }, r = Dt(!1), i = () => {
      r.value = !r.value;
    }, l = Dt(""), f = (C) => {
      l.value = C;
    }, a = Dt(null), d = () => {
      setTimeout(() => {
        a.value && a.value.scrollIntoView({ behavior: "smooth" });
      });
    }, _ = Dt(!1), b = (C) => {
      if (_.value)
        return;
      const N = t.botTasks.find((T) => T.text === C);
      N && (_.value = !0, N.action(), s({
        type: "client",
        text: C
      }), setTimeout(() => {
        const B = {
          type: "bot",
          text: N.response
        };
        s(B), setTimeout(() => {
          n.push(t.botTasks);
        }, 300), setTimeout(() => {
          _.value = !1;
        }, 300);
      }, 500));
    };
    return Qn(() => {
      n.push(t.botTasks);
    }), vt(n, d), vt(r, d), (C, N) => (fe(), Me("div", {
      class: ut(["chat-bot-wrapper", {
        open: r.value
      }])
    }, [
      r.value ? (fe(), Me("div", zl, [
        ye("div", {
          class: "chat-header",
          style: Be({ backgroundColor: C.botBgColor })
        }, [
          ye("h3", {
            class: "chat-header__text",
            style: Be({ color: C.botTextColor })
          }, Gs(C.headerText), 5),
          ye("button", {
            class: ut(["toggle-chat-button close", { open: r.value }]),
            onClick: i
          }, Jl, 2)
        ], 4),
        r.value ? (fe(), Me("div", {
          key: 0,
          class: "chat-window",
          style: Be({ border: `2px solid ${C.botBgColor}` })
        }, [
          ne(rs, { name: "messages" }, {
            default: In(() => [
              ye("div", Yl, [
                ne(Ml, { name: "messages" }, {
                  default: In(() => [
                    (fe(!0), Me(he, null, Lo(n, (T, B) => (fe(), Me("li", {
                      key: B,
                      class: ut({
                        bot: !Array.isArray(T) && T.type === "bot",
                        client: !Array.isArray(T) && T.type === "client"
                      })
                    }, [
                      Array.isArray(T) ? (fe(), Qt(Ul, {
                        key: 1,
                        botTasks: T,
                        bgColor: C.botBgColor,
                        textColor: C.botTextColor,
                        onTriggerCommand: b
                      }, null, 8, ["botTasks", "bgColor", "textColor"])) : (fe(), Qt(tr, {
                        key: 0,
                        text: T.text,
                        type: T.type,
                        bgColor: T.type === "bot" ? C.botBgColor : C.clientBgColor,
                        textColor: T.type === "bot" ? C.botTextColor : C.clientTextColor
                      }, null, 8, ["text", "type", "bgColor", "textColor"]))
                    ], 2))), 128))
                  ]),
                  _: 1
                }),
                ye("div", {
                  class: "bottom-of-chat",
                  ref_key: "bottomOfChat",
                  ref: a
                }, null, 512)
              ])
            ]),
            _: 1
          }),
          ne(Dl, {
            bgColor: C.botBgColor,
            textColor: C.botTextColor,
            inputValue: l.value,
            placeholder: C.placeholder,
            "onSend:command": o,
            "onUpdate:inputValue": f
          }, null, 8, ["bgColor", "textColor", "inputValue", "placeholder"])
        ], 4)) : zi("", !0)
      ])) : (fe(), Me("button", {
        key: 0,
        class: "toggle-chat-button",
        onClick: i,
        style: Be({ backgroundColor: C.botBgColor })
      }, Vl, 4))
    ], 2));
  }
}), Zl = `*,*:before,*:after{box-sizing:border-box;margin:0;padding:0;font-weight:400}ul,ol,li{list-style:none}.chat-bot-wrapper{padding:10px;width:fit-content;height:auto}.chat-bot-wrapper.open{min-width:400px}.toggle-chat-button{width:50px;height:50px;display:flex;justify-content:center;align-items:center;border-radius:50%;border:none;position:relative;transition:transform .4s ease}.toggle-chat-button:hover{transform:rotate(180deg)}.toggle-chat-button.close{width:30px;height:30px;transform:rotate(45deg)}.toggle-chat-button.close:hover{transform:rotate(235deg)}.chat-button__cross{position:relative;width:50%;height:50%}.chat-button__cross:before,.chat-button__cross:after{content:"";position:absolute;top:50%;left:50%;width:100%;height:2px;background-color:#000;transform:translate(-50%,-50%)}.chat-button__cross:after{transform:translate(-50%,-50%) rotate(90deg)}.chat-bot-container{border-radius:10px;overflow:hidden;width:100%}.chat-header{position:relative;z-index:1;width:100%;padding:6px 12px;text-align:left;display:flex;justify-content:space-between;align-items:center}.chat-header__text{font-size:2rem}.chat-header__chevron{padding:0 6px;font-size:1.5rem;font-weight:700;cursor:pointer}.chat-window{width:100%;height:400px;padding:10px 6px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;border-bottom-left-radius:10px;border-bottom-right-radius:10px;transition:transform .3s ease-in}.chat-messages{padding-top:10px;padding-right:17px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;transition:opacity .3s ease-in-out}.chat-messages li{widows:100%}.chat-messages .bot{align-self:flex-start}.chat-messages .client{align-self:flex-end}.messages-enter-active,.messages-leave-active{transition:all .5s ease}.messages-enter-from,.messages-leave-to{opacity:0;transform:translate(-100%)}.chat-input{width:100%;padding:4px 8px;border-radius:4px}.chat-input-label{position:relative}.chat-input-chevron{text-align:center;padding-bottom:2px;position:absolute;right:6px;top:50%;transform:translateY(-50%);cursor:pointer}.tasks-container{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;gap:4px}.message{position:relative;width:fit-content;widows:100%;padding:4px 8px;border-radius:10px}.chat-button{cursor:pointer;box-shadow:2px 2px 4px #181818;border-radius:4px;transition:box-shadow .2s ease-in-out}.chat-button:hover,.chat-button:active{box-shadow:1px 1px 2px #181818}.task{width:fit-content}
`, Ql = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, Gl = /* @__PURE__ */ Ql(Xl, [["styles", [Zl]]]), ec = Tl(Gl);
function tc(e = "chat-widget") {
  customElements.get(e) || customElements.define(e, ec);
}
export {
  ec as ChatWidget,
  tc as register
};

const IVM = require("isolated-vm");
const fs = require("fs");
const path = require("path");

const jscode = fs.readFileSync(path.join(__dirname, "jscode.js"), "utf8");
const proxy = fs.readFileSync(path.join(__dirname, "proxy.js"), "utf8");
const env = fs.readFileSync(path.join(__dirname, "env.js"), "utf8");
const proxylist = fs.readFileSync(path.join(__dirname, "proxylist.js"), "utf8");
const behavior = fs.readFileSync(path.join(__dirname, "behavior.js"), "utf8");

const ivm = new IVM.Isolate({ memoryLimit: 512 });
const context = ivm.createContextSync();

// ---- bridge real async timers into the isolate (VMP needs genuine async ordering) ----
context.global.setSync("__setTimeout", new IVM.Reference((cb, delay) => {
    setTimeout(() => { try { cb.applyIgnored(undefined, []); } catch (e) {} }, delay || 0);
}));
context.global.setSync("__setInterval", new IVM.Reference((cb, delay) => {
    const id = setInterval(() => { try { cb.applyIgnored(undefined, []); } catch (e) {} }, Math.max(delay || 0, 1));
    if (id && id.unref) id.unref();
}));
context.global.setSync("__SEED_COOKIE", (process.argv[2] || ""));

const hostLogs = [];
context.global.setSync("__hostLog", new IVM.Reference((...a) => {
    const line = a.map(x => (typeof x === "string") ? x : String(x)).join(" ");
    hostLogs.push(line);
    process.stderr.write(line + "\n");
}));
context.evalSync(`globalThis.__traceLogs = [];
var _S = String, _P = Array.prototype.push, _J = Array.prototype.join;
console = (function () {
    var _h = __hostLog;
    function mk(m) { return function (...a) {
        var args = a.map(function(x){ return _S(x); });
        var line = 'console.' + m + ': ' + _J.call(args, ' ');
        try { _P.call(globalThis.__traceLogs, line); } catch (e) {}
        _h.apply(undefined, args);
    }; }
    return { log: mk('log'), info: mk('info'), warn: mk('warn'), error: mk('error'), debug: mk('debug'), trace: mk('trace') };
})();`);


// context.evalSync(proxy)
context.evalSync(env)
// context.evalSync(proxylist);
context.evalSync(behavior);
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async function main() {
    try { context.evalSync(jscode); }
    catch (e) { console.log('eval err:', e); }

    const behaviorOpts = Object.assign({ screenX: 180, screenY: 88 }, (process.env.BOPTS ? JSON.parse(process.env.BOPTS) : {}));
    const rounds = Number(process.env.BROUNDS || 2);
    const warp = Number(process.env.BWARP || 1) || 1;
    const cap = Number(process.env.BCAP || 80);

    await sleep(100);

    // ---- 按真实时间线播放行为流 (逐条 __fire, 带真实延时), 分多轮 ----
    for (let r = 0; r < rounds; r++) {
        await sleep(100);
        let seq;
        try {
            seq = JSON.parse(context.evalSync('JSON.stringify(globalThis.__buildBehavior(' + JSON.stringify(Object.assign({}, behaviorOpts, { seed: (Date.now() & 0x7fffffff) >>> 0 })) + '))'));
        } catch (e) { console.log('build behavior err:', e); break; }
        let prev = 0, fired = 0;
        for (let i = 0; i < seq.length; i++) {
            const gap = (seq[i][2] - prev) / warp;
            if (gap > 0) await sleep(Math.min(gap, cap));
            prev = seq[i][2];
            try { context.evalSync('globalThis.__fire(' + JSON.stringify(seq[i][0]) + ',' + JSON.stringify(seq[i][1] || {}) + ')'); fired++; } catch (e) {}
        }
        console.log('behavior round ' + r + ': fired ' + fired + ' events over ~' + Math.round(prev) + 'ms(virtual)');
    }

    await sleep(100);

    try {
        const out = context.evalSync(`(function(){
            try {
                if (typeof globalThis.__sensor_data !== 'undefined' && globalThis.__sensor_data) return String(globalThis.__sensor_data);
                if (globalThis.window && globalThis.window.sensor_data) return String(globalThis.window.sensor_data);
                if (globalThis.document && globalThis.document.cookie) return 'COOKIE:' + String(globalThis.document.cookie);
                return null;
            } catch (e) { return 'ERR:' + e; }
        })()`);
        console.log(out);
    } catch (e) { console.log('payload error:', e); }
    process.exit(0);
})();

/*

"3;0;1;0;4408628;A8aWSRHDQJI4WjI2AtGd7svuyfIPzhMxCLUR5f7d6II=;19,3,0,0,7,387;\"~p5C\"M\"L0FZ\"<>I\"e?[\"z\"DqE\"9\"2#;Y\"Yo,1x\"%C%\"p;7\"3r>\"A>]pUki6{M\"8\"BY3b\"XwmA[\"8_r\"WJgE>\"c&e\"AB\"2T\"SUk8\"X`n#\"oz\"VyPG\")\"~HpSkRS=;zM(T`i7(/6\"c>tHu?e2&8w]p!\"g,5\"_sR;\"C\"jucdq4ikhPtVo\"i\"F(?U|UF\"L\"7ub\"o\"~|l0\"h\"m?(3;[7ncLaydjN=U(CAY0fH^NcYu#Y~ml:mOJ[i`SeW}-8_-]J*Ez!eOE:Xz19:\"2-Z\"bAf\"A\"bugGO;Q\"J?9\"Fx2B%\">}F\"bX\"i2np^c\"H1w|9(Hw|z|\"v\"]NU+=/e\"shI}zJrl\"Qwjxf\"Bk]\"tv`\"Y\"W3Y_y02{7}0$l)ZP\"1heF\"-GFl\"\"n\"%]a\"z7.\"ZUU\"s\"K\"CW]\"YTd\"B^hktBaT)nt\"Po\"/6+)9?;$]@<[+\"oP%\"+8Wnu/x\"1=d\"C4*\"%3@>\"[\",t*iNOmP5l+K]\"P\"(h+R%mw\"J@]\"XZN\"G1d\")EG .\"T\">kl!ke\"9\"Ms{1\"oj%q3[\"m*wor3a\".D\"*ol\"jQ\"}\"KU_z;Z]&-C#|Mt\"Bsx\"p5k\"I\"A%#iDhw+[p9Sk\"v\" `n2[]]\"e\"x+aX=h-%gyE\"A\"=3r%Kt;\"8\"o4-IN\"l\"iwL?\"O/\"}tmXi\"j\":L\"2?\"]rvS\"A\"@o8|}kCwT)P#x: (\"k\":dS\"{\"\"B+7\"w|<\"$\"N++k[{`bnY?TT|@p:&N+Zx.G\"`\"Z;g\"l\"byekgSz<2zx?i4z9,eP\"9G\"E\"<aDs\"e\"T&@5bC8{[(k)*#u|[>HO&@Qgc[M-7.S]G+uE\"K@<\"hO\"<aE-o\"=PD\"@\"-HgY9=;F/:3.{]8N@Cd0k>6kwMCr` N9:k*|ayjmz2 +og8UUT}M+_dCO5*bQpSDCo7@%0*IUiomd^1TR^1cP #q}poJ:d@GD|KI?EJkw:2IAD JG_*`^;E)E5<xxE$2-qHI@Rc&3ac{tqW93G+eR<QERPZ@Av_ioX299[i5;{/A6Kzmz7qMG:NOeTxcj6.8c2}*%?c9I~/b]i>6VwU4,&?Pccws&^CX}mZeo4K N|9i`}bWsD ukq}1Og!u!aWu?+#=Fs4h3i:Yf.qo7UF7BWk#<Khn&gd{`LEUzLsLxUxJc/r%@ue]c{CYs4Pfid`)_T]}1[-qH9f?JvrxAvne~7etOa:DcPP$WgZ~H}[Hvc9u=eee:rnw8Hq8v9[o>98#RUK,?2kX3&gMk28L*qqg1D}I0H13enmN.<G+I3leFIvm4dw$j=T]6S!K)T<f//B!vy,f5(btQL*xF)9SE 6<s1tP8tOz8K[T?Ti:}uaQMP7:a>JpUTetWsg1(PCnEkpaWp+}VO<68A/(]Pc2$r)B~XHxpEEoHX%}jBO>p{kx +{zWAo00}ErLxjVH+&VEM) w?cY@MBKJgJ`Q:b$;3XpW46)u]X5xCxxoDulV[Uu}82E{vM*$+YusWJ7C(8uW*LU[6kcdk^)4NOj`g=jzqRrjRaPZAN?$W6=K5ciFcs?Mus-y2[KJe;vbKPMa`tTL$Yo-k@PFah0Bn$FAH.i|1{NFKL]]bq^d:*7V=j-(BT+D}*IEb92TiG/+)1AQXymqN7PgcJTY0@z2w&P^\"F\"4bD\"c\"\"|\"+ED\"^?m#t]%wLd\"]+^|\"lMJdp+LPg+}rS02^zq=gUdwtE&P}//^m;~&u*gez{HdW4Wb$rQ.nRmw5gNP&i,=Pys9n?E8NI-@J+Qj$Rr@&|}M8tBb1!.e\"q\"e(m\"6\"si%VC@ey!%`7A\".\".~i@\"z\"#`fwNYv;gh?m@Uym3,(kQ@g[iw[8$9F(aT|+lDC Y%l6oHVxKw9$L|(a/!pmCAl$}aassyB3h R!V`kX)(<m2sU1RsBX02t~3qzi^PgtTS></aDkA6Ene{2x>)7]*aH5{wh*z5m(a.jp la!a)pimW!p9TEQLYLj,o0t:1Q`WQX$}G7m71tI:ErJm;co`;}Ev`(\"CIa\"h.9\"N\"y\"6bu\"tMp\"se\"uo1\"]J;@%rPwAseK\"(!$[\"C\"#0l=*Rt6ge~x0oVS;=:v=ry6qH9+r{([qI-ZhQY9j&U^ov<{d?S<XeRWWef|SJvu@Y:r =qh+7TggDixQQo3Np+D.lPtPO)\")\"ji!|\"T\"\"]\"m}{\"%\"Q.nue{*@CPPP2)\"U\"mv$\"1\"&Nc;\";(h\"A h\";\"ct&6@>*\"/Z>\"!BW)[\",\":cvee/I\"D\"3t,K\"!\"\"t\"`A$\"nu7GF{;i&>v\"X6cc\"c9l.I_%55?;#Z\"VAb+b2+8zK.HGzTok[ki\"L\"(l);\"8Zz/{\"Y9b\"P\"o]}GA{d`bTg~FM!nJUpol~)H/!E}T_n^BL*DRb%2G[*3jLPuV?esZW;IF(M@gc:VSD_;M$v@IBbyE@XP()[I5:[cnd$(VO%\"m\"zn 7\"k\"H$P[%\"A\"-w,;\"o]#O =\"mw{j\"6\"}E\"j2#\")W:3\"n\"m{\"sr)\"kE:1\"T\">@ [x91|DU*^N- WHqPh!}q3gF%/uxp!}pVEk~*pATDj_C7ynA#Gmi[)N\"%\"Xu{\"I\"E`1p{pK:qWF\"W\"&J:Y~&)\"I\"x,.\"1`J\"-3C#z\"#\"US6?~\"?&i\"JXk4$\"z\"@$?LPTEcEsx|VNZA@?F1JVOS3:L0iOxBUBOqar+(N!U5oF+i*|u/@<EvRUnO#.Ddu:X_U_gc:D}G*oop$Bvv3wrk^p+iKQVs5S8x)Ta^far/pHV\"HTf\"cqy\"`j,\"C>R\"i\"\"q1W\"U:B\"?wNfY\"t(4\"r\"ZIc+\"a\"oSu_\"_\"@I\"T\"N*,t\"%BLh,>=?2z\"ZS\"&\"d(e3n.pw91$T&\"e\"a ;\"J^b\"MSe\"hO})\"pzO;\":w`\"DfN\"d\"hw]Fd\"%\"~4mB\"I\"!`.\"97Z\"5xdiE\"C\"^p<a3R\"/\"6R3e\" <a5pY\"%OY\"I\"S\"Uo]\"7` \"PK \"2Kwkp\"t1/]_CrcD\"-3\"N\"\"3\"g2p\"=\">i6>{aboW&e0SI/QTU`4z?,8@idOLz5H0n(>f}eN^75o\"D\"fhJ\"a\"\"H\"=$Q\":\"Q.c\"@\"*21\"k\"9\"wvf\"6$R(:\"W)\"Y^\"A5th\"Wv)v\"|u\"{>;C\"J\"3s[y<3\"W\"=[Y\"`\"g0%tW_UqRE<%v}011&Ol4gTG,O!`d\"V\"+ME\"b\"\"z\"wts\"WSkiqd^cJC\"W$xU\"ngE\"dJ{\"*uVbUq\"i?K`]uU\"vJN\"d\"wF]D[ES\"{\"h|~c\"ZMY\"n|;\"&jpD\"vAyO\"2\"6>.H,(U/>b\"YrZ\"{E_\"XgfvD06fL+^^kgzb#中国标准时间A\"2\"1e.U\"5\"WVIuE.ufZ[rv8g~OUC%Dg3Mt!s$e_9c04/GU~?vHedc0Nu7-8wi/B:JOt6Nk&Na7@i 3X!}x!B&Ack&ZdKFa-)}:Ci_Ox].Z0PGCb4)\"%\"?^9O\" /zTyDsUy )YHB-Z.Ng^中国标准时间w\"c\"6r+G\"=]C\"2\"WP-r\"@d3_t\"v/\":0L\"o|t\"#\"ZbW@qPSUuQvlJ!N_)JGa3Bq57~QcK!(GsBY-jt{uSH~mU_eUz#3Dwj{sEcA%EdI|l**a]%Es=}PEuRT 3Zox9<&/T0^J{P-\"p.\"kF\"G\"e-ocNIUmd>!&v5NQ|F&L\"u\"dX{%\"j$>Q6Z\"?4B.}aAj\"bal\"KyZ\"Y.&Q//5I\">dK\"WJR\"=HD*\"5\"\"H\"mj<7\"gN/\"4a45\"M\"%~(8iYw2-{k\"#\"c{H,X`J\"Q=*_5VA4}W\"Ggrt)C@\"I\"SAQJ\"A,^cD\"|roO\"v\"+![F4N@0=TOUNpV34Q%FFel-C03sy)7Pai?Fu&Gjg-M7*4V%NYu^lcrh%tvmT0#=T+iL=<Fq$g8rsu^Uj89!!hr8QIdA>|Vu$^x11Jq7rM^$|*w\"m\"Q?F;\"]np,})f/`m\"%D<\"Rv<bj)Xs\"L2U:&!/xCa*39k]9L}g7\"U\"/~N.\"{\"6$s\"Gz5\"}dp?\"i\"n\"4n.\"W~4\"L|J2Nu8D\"y:t\"y\"F2Nnz;^=SVtA3\"y\"RhT0i3s\"j\"tgJ<.>P$\"y\"YTmlc0k\"/RmJz^=fNu\"L[R$#\"~\"\"{\"Ie\"!4{!M\"#}\"CqD [<E\"J\"r\"G4?;\"#\"t\"a=C\"]n<(,\"93qLOy;\"N/_o\"i<E2Xlw\"\"- ,\"RM@\"]\"9jQ3*whRAq\"OpA\"<.s\":T<^5oT .~t|T\"ZcHH\">\"bE)\"L\"iCP#\"C\"D3w\"l\"z!&7\";\"\"@T1\"zl=\"p\"*w\"D\"3:xd\"7\"5DhJO@s`45/7>uh5,v,_X=3fAD7{L0Dk>YEhh~C kzM.4RM`:,N)qq]nb40PAqpQ*c]roQw~f8M}u(zLE=i*;/_(oFmrr_iDV*QQW3`\"8\"5hx:\"P>6f>CW|E>|*v#[iB\"S$6\":\"|?KT?oQGuTd5o\"O\":K<@\"T\"N<0Y8Jc;s&m5Cg\"2DZ\"B3Vt&\"h\"N\"]\"Gtje\"3\"Q3j|z=\"o\"IqC5\"-\"/H.]fYxk(.A8<z\"w\"f]wr\"b%@m1P\"B45J\"rWNL[\"}vA/\"C/Q^FIh\"n/l6dH\"-pcSq>;u\"9\"[f~K=R7\"r\"\"s./\"wb-\"YBy\"ugJk\"w\"!TX}9]\"v\"F-bX\"v\"`%n:\"D\"~RPH\"Z\"\"Q\"g<m3\"fIV\"gI?Id\"7\"Cri&f.YUT+WdX%\"Y\".gAF\"hh%rf\"z?5\"~\"LlS( }?7gs{n-gw, Yy+U>qVT8W~x<;cJ&lj.AP+hx[#Aokt8(?a:A~\"v\"+fJ\"[\"G5xGwm +{ )Ut7frO|>syh}}uM8XIP}nt%)]7CUsm9=p66+#Wv7 tA6);RD#gTM_4{rK>tL,k},a{:Ge5pB^J4ZJ_A}qSAM\"I\"#)l*\"N0Kp\"m[I)\";\"H[!z\"5\"soy\"?<P?7{g\"6K:\"J\"z3z#k\">=M\"cj6\"zR]6O&\";peWwGVT\"^\"yiUf=H!\"Z\"^c=UZRNc%z@6J@C~ny7XwnC,@v=uwLDUzU_i0_9(kJ7\"NE5\"JMM\")\"e\"NjU\"0=^\"v X65.KTlrYq({tgFceMx)Yo]\"ffX\"X\"\"SIy\"]1;\"N\"*KVZ@j7K7it\"t\"ov!\"K\"ev@ lt{\"Z\"7#8a\"#\"\"_}d\"?1?\"E=WIa5+VeC@B\"k5i|\"G4\"}OnJt\"*\"$4\"P*\">[T>\"7{n/\"k\"V4#?\"!3-\"#JI\"zW\"(rzL\"o\"-G\"5\"8f8l\" \"(Z{:1#a$}u-7n#\"L1/\"u~D(#\"nUR\"Y$u\"F\"`4\"W.-)\"R\"%O \"#\"8\"n\"0K}5\"TEsO9d\"UO]:\"D\"RsL[@X:Ikvy[7H\"mq%\"A..p\"!CLA)d5-Z`3%h(Zy\"+W>*\"G>mkR4;\"etH~\"?#lv}]sO#d8oC_txmE\"QC.\"lfD\"rn9\"P\"+{(:B)5\"3sR!L\"N1.)AA}\"UWRN\",\"4e(z\"36wF.PO|\"%V#\"O\"12\"k$pB4\"-\"RZ}C\";\"~(RG,ui#$^;PZx>cI$/e\"l\"i*mR\"W\"QFeP)wgQ\"L\"^kD=:g3\"C\"G%)D>?HfZyK5qRI xe`)<[0mdl=p<6sJsRJ4%8MW!JWQg\"yg^\"YB>\"?n;JT)KO9\"Ti&\"g<Z\"q[^\"u\"JYrPhbWol:ou$2()sD^z<2E(6?sLopw`d%)#|{B0ySO:Q&j]q/!u6q/UYV<+.JV0;*6{&t$xyq{Wn[DppN8k.Z`VWmZ@YzmJL@*3[e3 L,t;YQA\"F\"!k5n\"_\"r`W\"<\"`{!9\"v\";\"J\"lNmg\"o\"QoY|PoJTpma,ZF/BHo*H`}+4* Kwlk C\"?\".jC\"O\"D>t`(nb0{r%X8sPY//\"q\"u3n\"N{^3q0SEQl\"9=GT\"v\"/.A^SU#anp6S8f$\"%\"*e*>\"|EIR`ee-XnWc/&(SNa_-Y?rkHAtl/AA{X,\"2\"fY&g\"r\"+)cDY;CH\")\"UGN,\"Ky.8oOt!]\"J(q\"ae[\"icRn\"[bJ;>&=\"eQ>E\"Vg.6c5eJ<sWB &5$t7@w^I\"0s$\"$\"<\"cY=\"W8c\"^\"\"Ygb"
"3;0;1;0;8888888;TWqqjhOqYz95+RoBNPlPwTKwOj81aW7QRnl84yUOpCE=;9,249,0,0,1,0;D\"m n\"P=d(%\"k=\"8X54j=\"4|AO+RL99}/ei\"v\"6gb\"W#J\"@BY\"@r#+wVH% \"Y.\"`_II|R|$\"_v@\"bE)vZNdNO\"^Ay3\"{\"\"p\"cEO\"=Y#(}&K#\"1iq\"s=tnE1e\" .Pxt-Tf!g p1RX/T<}ja><~)Y<6;=:jW np\"nXB\"$D\"i\"1\"Lzc\" ls\"0tR)UTd{SA\"+6^a\"R\"D<nH\"L1G\"n{d\"&/h\"b6D\"Y8*!9Fnc4!\"+ j;\"/S7&ovUma\">5\"q\"5eBJDch7Ox.N9U#vy2sG:.?6UOeHM&p~6z`ol+@x+Ra(*<~g$8x^dIeg&0A1;t]r8~ox{<Z-M%4nt%sRw?z^fd|(?Igso]=r1sdx6YgOo?a9DVLBe$!fpl(K\"k\"usr\"P\"6?S_@~P{a&Bfz\"gx<\"U\"\"$=[\"v(T\"P\"J\"1UV\"T>V\"H\"]+v% N@1]S0@f)M] _h1\"MC!\"=K\"cgAx\"d)P\"M@Ih\"n+c^4C/&iP$\"{IpG\"@\"?zS@6-{%yX2{ON=6)%\" \"tW*\"o-`5\"Q.&^\":cppiOaVz*GK\"O/S\"r\"L)L\"O\"|$0Z]=%yacz_F*?|3(P;r.PMd!fJth~b]oaVG*=c5O*<*?@kE!BN30g7NZKAGszJX6=ieB<vY0r$k7GIissmO:Va#D9 JfO01mMYaTg8Ai:1{Ma\"he6\"b?~\"NjZ:YV\"x\"h&u\"mvL\">X\"M{5\"H/!\"5uPjGcd4\")rYkt##B2;+#I~( LyoB>,5*vcRkDEB$FN-@Ims%,C9-`95@w@0s!hxryYEzD`^>|h[ vIElq5#4_;ST<iiKDEYEN6>e>VtS#%!HJ},TV!u{S@Oc;-!hwf3/</sNDF^K0-1[sFJ{2U`mP#I]C!wy)3FZ\"T\"vWl\"R11rm.L[AD\"c p\"6\"pZUTs,cCjS[B>u%WMkx\"~\"Y/U\"YkcTxCvfc\"|tXP\"@\";$F#\"S\"Z1`\"+e,Hqu\"b{>J%<U\"Jq{*PdV\"x=?3Pe=s\"s]x\"btt\"r9%N:\"U^H\"V\"Y9\".\"=GX\"(WDpb6kvO?\"lH.\"~ b!JhELo``C~&sJ`\"YF;\"~WsH?\"qGX\"=O2T%E%)YI\"~iYo\"@\"\"I\"c< \"GQS@m~x\"T*V\"+\"*FPZ\"q2$\"#jW\"[\"-tK)<J2v.+n*o:\"2&=\"ewb\"56 QO&0mzIFt\"Mw]?\"9[.wH;[Hc\"4GL9\"3sH>3-l~]\"vi*D\"P\"yS%sOAyf3i*?<1IsN95~53;x,fPj.)zD^8ojC6rwH~;x\"]\"*!S\"u./:-}hL\"/A\"&9fS:\"n]U\"8\"~zzHxqKULlo(~/}k8mrr:VJ%$rq_^<3Q3,=a11s*+GOts*rp6nu-P!xaiNU?F(}J+1:qJN3S]}&HOhR];w~!v6/ztp#u)fa=q}3zLSJp\"=\"RX)\"K-V{o\"&%vz\"QqQB=qbAyg\"28e_\"t7<jZ\"6<h\"iB=u(~kn}qsD6<\"6k\"Um\"d*Pph:WiN$\"M+6\"0!H\">57[IUT4n-6\"{?q\"#\"j@/3N\"|ef\"|)H\"K\"\"6\"+YP\"}1^|Z$J&E\"gXWsb\"Jbh.=Ju#\")$t\"A&(/R\"@o\"f$Xp\"eo*\"&s~;J\"%8c\"aMFyF?@_\"CjZ\"N\"Fj\"|4M\"|l)F\"W\"&JPzuxQ)e0gnY6xd{%}_x#)B9}>At7n4w%`c)l@{[=)*>\"aS7\"M|C\"!\"REI%aNv$Si LG+G}52A7,qh@rL8lEbQ*}vPw: I3e$Ozp]oT~-[jR;\"~\"E8k\")\"2i36k>}W8y`|]ozrcx=iHP8F 2rjS,UtfIh!W&qL<zk,j+>I-LgI9=}0x7#{dIk@#o8S<u]:)rn1 ;_VKv; oomvi#|t]MuQG?^}fM@~{dS.|4mlc*TO/L:NQwge^JvZRD{A)lo[WME q5bir2feTng~~TNMF>w[LU.O=,5{)o#hF|RgiHnrb{(KQq{3$1a:DZ:aT4B>JCQ4+[<DV1w!q43]i5CqZc=*6K}Ye@YS_ToYY;{%; jk^-In+Ka#,$thm3jJP?OL|r)!![AYzpL`Rz?h)TtEKKF+KaR;</<Mz#/,=yi E3~4Dk3^{U}OHeWD{*&Zte75]q,-?,o;lbXlu>a@nMxFMusi,SE8VOp NW%$D/|Mw#_&F K*R:a7Pmog1fYZdxH_1Bqn2!*T)&|Ie=bR0}K GYd`Dmrly<`{O{Fa#kwA$*)Puf uPLrZ#H_Y=jtc/D~Eu@p0RVZ.u$+L~g=0jiA0V&(5%_on:P*I;X4Ux+7oVnzJ!bQ<,r]H#NUxXKHY3M5U>eJj>SkK/CVBb]@B/1id0v#C: (?uG|P=zf)S`~mc}7yJB/:~,pyR5B`SHdxOy]F4rO#b(<,y;b<~|o#g orD/W(we&6!PK!~bO*i~678a0iJJJKMmd`=5U~y!JlFwxN^F/xL{7=>m7 t}i##ACG/~Qw4*]q^5A!/tfG9h09:j:(x(5PSpi$deG~y}K$nJLCTLF jAn}1k?3)9Ogw>?]L?pPZyLojWc^eRaFKxNXbL#/~HOd(IYsosY;CT&iZSd]|`wrp1x.R7rzq/<p1Ze 0AwQv)|SSBNSjl+&(NAXz^?Mb*=p#O`>HU2 GfHy)$GNcl%x$kSu7{v-*PwQrZq@;V;>brgIWby(H]{%.n^ L:;KY~P1Z4N0<bL8d. v##UU*=a[qmg-VTEcmM%b-b8o(;9@uI4$6Ik$eo=<b`VtKKL~*k0)O@kTh,4)[31+Ve/Cw5by@,1e>FKg/pIDz`7v;iwmS#,&L_<V;a7LbenD,.9h1}V> sPDf=3H%p |IO7e@ZD_63B*^uuW|uH?$$_M{_m&aFJT*O-_ElOo=M`I2S[5a[4?4$r_0p}1)v&Bf.gC-kVpRN{lK^+^D:*|ep[_?p2R<<K]=fT2y[AlI_$na G+seVeXoRP!{*c[Ob~a5#]P4.jHbnwe1^H))%54<28(j1VOFs2vGC~(s`7|Hkvt6XN<JCX_]oxdG~KTUzG%fQRM:0id,RS[+f]KPHfp1.@6y^0C3j;+uj_ZUM=,a2(C~NJBSU(!?CjO^.gstY2,cikpuv]IyLjyW?/+@^s*Za+!~S0>X:pnGjYncugoK(-90iqq+Ph!Jfv)*q`o._?F<JUfVvhjI7En`4G@hx]iGS{2:-^)E/ wq 3M[fexN8W{^SnvJd4H3Gpx9(sBWI0@9`s15MN^S:],re#6X%i0s4ah wx<_VEYZ##Xi.AQ5~N}wv<LnG.]3c@Prtj+_VJdu;I$>f`xqoQrkm9H%YJvX%c#CEG!bSOcr9^/[,(TEL![W^,L,PE!nI+Jiw-f25;[uFe>f9MpmtH8>Bk6%bX8)O<dA=U/hv HV8_FyFg~0<}dxvC!jF:  aOx[SuV@L[,?-U3YH_:CZ1q:<,OE2!|vUA$buyqRcwbz_)#B;f;9VC:P^N&{`aXYJI%Ue3#s4GpE3dQ3~O,.XD6a)dD;)853/%VFo%!v=`<jO,*c`1h|JA3[}pbYFUMV_gD=V} mC_DvyRK. aCl9~2^!nTc^xy+$1wq4`cl2J?y~prZ?0o>mul?{iS]]%-ANF:/oBOC|N7ytgokjH/Y;?P%VU@Yd})JQrW].b~ b+(ncgtahZP)P[vU/./FHn}ZXhmnN1>O3X^JYRggg[a/o};$T[gu6N|FNkdwW?NsI-8y8=GFRY^7z$Q0vy(RqIS.BYpsfPb1gTVL^g/:G8D~oER>)5Tk1i&c{L_pLNh6p]pa%9Rg)u5kj,KI1Lg/L-R9Ky/LIDc/xawrFQ$9EVnSLr>E%Ol0^H\"J\"/I^\"(\"<8Ee[* x{`+>*G;6@G {+*rd%n$-*w_S ?5~&45d=:Ll\"I\":>O\"^\"`S0mM<Y$y/d=27TiEbC],UhnvU-,Hj4{XA0rVAh(8A#ky|3]2N1W2c}{6\"B\"LvA\":\"\"RG-\"t+,\"-\"Aa3t7x31N~)>\"W\"g;x\"lfI\"|a4\"P\"+\"910\"rR+\"#\"`O24*\"4#=\"lgm\"&vD\"$:\"OglSdb|\"@9O\"x\"sj#M1mgOWXiNB/p@TDE[xK$vZM!yI4Vr[[~E/nltyl{xx_Lr55:UyS*-pg<E}]o9E;n2%jvj%,.4<4~Bo(x9cI |plQZ;~?ysyBtsRa`|~K@P@GsEFM#T-x&\"h\";y~\";H-p:\"%!\"z\"b2B2<s<Z]/ND;9>>HF$q^,09!UWQ}v4`x<\"EbEx4 x1\"!s(\"M]K4wA\"M0D\"Gch-3#k&1Gn(h5up\"_\"Vcn\"3aiHa!jO3Z\"Aj#^I9?$eY\"g\"s-\"(0I\"[DR?\"pOX\"EWq\"8\"\"I\"]x]\"AM>\"vh.\".%?\"0!m\"t\"qHF-,\"_LW\"2MA-#\"=,64Ab|\"NN+\"n\"b\"A\"S H\"-_.@R&7)P\"[[`\"]sLT~r<#\"Kvu\"P\"\"r\"eK\")3Y\"IfD\""

 */




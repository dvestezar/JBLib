/*
JB tools
(c)2008
www.dvetezar.cz

v 2.0.4.20
*/
var lns_month = [31,28,31,30,31,30,31,31,30,31,30,31];

if(typeof JB == 'undefined'){
	var JB = new Object;
}

String.prototype.convToUniEsc=function(rem){
	//escapuje unicode znaky pomocí hex pro JSON
	return JBconvToUniEsc(this.valueOf(),rem);	
}
String.prototype.trim=function(){
	//provede trim
	var a=String(this.valueOf());
	return a.replace(/(^\s+)|(\s+$)/gi,'');
}

//pokud neexistuje bind tak vytvoř
//viz https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
/*
bind function to object

this.x = 9; 
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var getX = module.getX;
getX(); // 9, because in this case, "this" refers to the global object

// Create a new function with 'this' bound to module
var boundGetX = getX.bind(module);
boundGetX(); // 81	
	
*/
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}
		var aArgs = Array.prototype.slice.call(arguments, 1), 
			fToBind = this, 
			fNOP = function () {},
			fBound = function () {
			return fToBind.apply(this instanceof fNOP && oThis
				? this
				: oThis,
				aArgs.concat(Array.prototype.slice.call(arguments)));
			};
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}

function JBconvToUniEsc(a,rem){
	//rem true nebo false, true pokud chceme escapnout uvozovky a zpětné lomítko default je false
	var x,y;
	var o='';
	if(rem!=true)rem=false;
	for(var i=0;i<a.length;i++){
		y=a.charCodeAt(i);
		if(  (y>127)  ||  ( (rem==true)&&( (y==34)||(y==92) ) ) ){
			x=y.toString(16);
			if(x.length!=4)	x="0000".substr(0,4-x.length)+x;
			o+='\\u'+x;
		}else o+=a.charAt(i);
	}
	return o;
}

if(JB.x==undefined){
	JB.x=new function(){
		var ent_uni={'quot':34,'amp':38,'apos':39,'lt':60,'gt':62,'nbsp':160,'iexcl':161,'cent':162,'pound':163,'curren':164,'yen':165,'brvbar':166,'sect':167,'uml':168,'copy':169,'ordf':170,'laquo':171,'not':172,'shy':173,'reg':174,'macr':175,'deg':176,'plusmn':177,'sup2':178,'sup3':179,'acute':180,'micro':181,'para':182,'middot':183,'cedil':184,'sup1':185,'ordm':186,'raquo':187,'frac14':188,'frac12':189,'frac34':190,'iquest':191,'Agrave':192,'Aacute':193,'Acirc':194,'Atilde':195,'Auml':196,'Aring':197,'AElig':198,'Ccedil':199,'Egrave':200,'Eacute':201,'Ecirc':202,'Euml':203,'Igrave':204,'Iacute':205,'Icirc':206,'Iuml':207,'ETH':208,'Ntilde':209,'Ograve':210,'Oacute':211,'Ocirc':212,'Otilde':213,'Ouml':214,'times':215,'Oslash':216,'Ugrave':217,'Uacute':218,'Ucirc':219,'Uuml':220,'Yacute':221,'THORN':222,'szlig':223,'agrave':224,'aacute':225,'acirc':226,'atilde':227,'auml':228,'aring':229,'aelig':230,'ccedil':231,'egrave':232,'eacute':233,'ecirc':234,'euml':235,'igrave':236,'iacute':237,'icirc':238,'iuml':239,'eth':240,'ntilde':241,'ograve':242,'oacute':243,'ocirc':244,'otilde':245,'ouml':246,'divide':247,'oslash':248,'ugrave':249,'uacute':250,'ucirc':251,'uuml':252,'yacute':253,'thorn':254,'yuml':255,'OElig':338,'oelig':339,'Scaron':352,'scaron':353,'Yuml':376,'fnof':402,'circ':710,'tilde':732,'Alpha':913,'Beta':914,'Gamma':915,'Delta':916,'Epsilon':917,'Zeta':918,'Eta':919,'Theta':920,'Iota':921,'Kappa':922,'Lambda':923,'Mu':924,'Nu':925,'Xi':926,'Omicron':927,'Pi':928,'Rho':929,'Sigma':931,'Tau':932,'Upsilon':933,'Phi':934,'Chi':935,'Psi':936,'Omega':937,'alpha':945,'beta':946,'gamma':947,'delta':948,'epsilon':949,'zeta':950,'eta':951,'theta':952,'iota':953,'kappa':954,'lambda':955,'mu':956,'nu':957,'xi':958,'omicron':959,'pi':960,'rho':961,'sigmaf':962,'sigma':963,'tau':964,'upsilon':965,'phi':966,'chi':967,'psi':968,'omega':969,'thetasym':977,'upsih':978,'piv':982,'ensp':8194,'emsp':8195,'thinsp':8201,'zwnj':8204,'zwj':8205,'lrm':8206,'rlm':8207,'ndash':8211,'mdash':8212,'lsquo':8216,'rsquo':8217,'sbquo':8218,'ldquo':8220,'rdquo':8221,'bdquo':8222,'dagger':8224,'Dagger':8225,'bull':8226,'hellip':8230,'permil':8240,'prime':8242,'Prime':8243,'lsaquo':8249,'rsaquo':8250,'oline':8254,'frasl':8260,'euro':8364,'image':8465,'weierp':8472,'real':8476,'trade':8482,'alefsym':8501,'larr':8592,'uarr':8593,'rarr':8594,'darr':8595,'harr':8596,'crarr':8629,'lArr':8656,'uArr':8657,'rArr':8658,'dArr':8659,'hArr':8660,'forall':8704,'part':8706,'exist':8707,'empty':8709,'nabla':8711,'isin':8712,'notin':8713,'ni':8715,'prod':8719,'sum':8721,'minus':8722,'lowast':8727,'radic':8730,'prop':8733,'infin':8734,'ang':8736,'and':8743,'or':8744,'cap':8745,'cup':8746,'int':8747,'there4':8756,'sim':8764,'cong':8773,'asymp':8776,'ne':8800,'equiv':8801,'le':8804,'ge':8805,'sub':8834,'sup':8835,'nsub':8836,'sube':8838,'supe':8839,'oplus':8853,'otimes':8855,'perp':8869,'sdot':8901,'vellip':8942,'lceil':8968,'rceil':8969,'lfloor':8970,'rfloor':8971,'lang':9001,'rang':9002,'loz':9674,'spades':9824,'clubs':9827,'hearts':9829,'diams':9830};
	
		this.BR = function(p){
			/* vytvoří HTML element <br> s parametry v p
				vrací pole s elementy br
			- p objekt viz.fn cel
			- p.cnt = (int) spec parametr počet vložených BR, pokud není zadán tak je generován jen jeden
			!!tato funkce nic nevrací !!
			
			př:
				JB.x.BR({ob:xx})    přidá <br> na konec elementu xx
				JB.x.BR({ob:xx,cnt:3})    přidá 3x <br> na konec elementu xx			
			*/
			if(p==undefined)p=new Object;
			if(p.cnt==undefined)p.cnt=1;
			var x=p.cnt;//ochrana proti změně p.cnt
			var els=[];
			for(var a=0;a<x;a++)els.push(this.cel('br',p));
			return els;
		}
		this.tx = function(txt,p){
			/*vytvoří a vrátí span element
			- p objekt viz.fn cel
			- txt = (string) nahrazuje p.tx
			
			vrací vytvořený DOM element
			*/
			if(p==undefined)p=new Object;
			p.tx=txt;
			return this.cel('span',p);
		}
		this.a = function(url,target,popis,alt,p){
			/*vytvoří a vrátí link <a> element
			- p objekt viz.fn cel
			- url		= (string)nahratuje p.ad.href
			- target	= (string)nahrazuje p.ad.target
			- popis		= (string)nahrazuje p.tx - innerHTML linku
			- alt		= (string)nahrazuje p.ad.alt a p.ad.title

			vrací vytvořený DOM element
			*/
			var a=this.cel('a',p);
			a.href=url;
			a.target=target;
			a.alt=alt;
			a.title=alt;
			a.innerHTML=popis;
			return a;
		}
		this.opt = function(select,txt,val,alt,p){
			/*vytvoří option v selectu
			- p objekt viz.fn cel
			- select	= (dom element)select DOM element
			- txt		= (string) text option elementu
			- val		= (variant) hodnota option elementu - value
			
			vrací vytvořený DOM element
			*/
			if(p==undefined)p={};
			p.ob=select;
			var a=this.cel('option',p);
			a.alt=alt;
			a.title=alt;
			a.value=val;
			a.text=txt;
			return a;
		}
		this.cel = function(typ,p){ //createlement
			/*
			typ = (string) musí být zadán, je to typ vytvořeného elementu jako u document.createElement (např 'div','span' atp.
				odpovídá skutečnému tagu elementu
			p objektu může mít proměnné
				.id		=(string)	id objectu
				.csN	=(string)	className objektu
				.tx		=(string)	innerHTML
				.tp		=(string)	atribut 'type' např u INPUTu
				.nm		=(string)	name např pro iput
				.val	=(variant)	value např pro INPUT
				.tit	=(string)	atribut TITLE
				.pop	=(string)	zajistí nastavení atributů ALT a TITLE elementu
				.doc	=(objekt)	pokud je zadán musí obsahovat object document z daného okna pro který má být vytvořen nový element
									pokud zadán není, je použit aktuální document
				.ob		=(objekt)	default document - pokud je zadán, tak je použit tento object pro vytvoření elementu, třeba document object z jiného okna
				.app	=(boolean)	pokud je zadáno 'true' tak je vytvořený element připojen k objektu ob (buď document nebo objekt v 'ob' pomocí appendchild
									jinak je vrácen jen nový objekt který není nikde přiřazen, default je true
				.ad		=(objekt)	properties navíc, které se pokusí registrovat např.
									{onclick:funkce,onchange:funkce2} se pokusí přiřadit tyto "onclick" atp na vytvořený objekt
									lze také použít ovlivnění stylu př. ad={onclick:funkce,style:{width:'100px',backgroundColor:'silver'}} následující je zkratka k obj style
				.style	=(objekt)	objekt style html elementu
									Tento je dostupný z .ad.style kde je použito rekurzivní nastavování objektu, nepoužije se jako přiřazení reference
									př.  .style.display=display_objekt_reference
										.ad.style = style, bude foláno rekurzivně nastavování properties za properties včetně display
				
				.href	=(string)	pokud je zadán tak se element chová jako link, tzn.onlick otevře nové okno s adresou v této proměnné
				.target	=(string)	jako u linku, pokud nebude target nalezen nebo nebude zadán, bude použito nové okno
			
			vrací odkaz na element, pokud není zadán doc, tak není nikde přiřazen a musí se použít appenchild
				příklady:
					JB.x.cel('div') vytvoří div v aktuálním documentu
				
					win = window.open('','test')
					ndoc = window.document
					el=JB.x.cel('div',{doc:ndoc,ob:ndoc}) vytvoří div v novém okně
					JB.x.cel('a',{doc.ndoc,ob:el,tx:'linktest'}) vytvoří link v předchozím DIVu
			*/
			var ob=document;
			var doc=document;
			if (!JB.is.und(p)){
				if(!JB.is.und(p.ob))
					ob=p.ob;
				if(!JB.is.und(p.doc))
					doc=p.doc;
			}
			var key;
			var el=doc.createElement(typ);
			if(!JB.is.und(p)){
				if(!JB.is.und(p.id))
					el.setAttribute('id',p.id);
					//el.id=p.id;
				if(!JB.is.und(p.csN))
					el.className=p.csN;
				if(!JB.is.und(p.tx))
					el.innerHTML=p.tx;
				if(!JB.is.und(p.tp))
					el.setAttribute('type',p.tp);
				if(!JB.is.und(p.nm))
					el.setAttribute('name',p.nm);
				if(!JB.is.und(p.tit))
					el.setAttribute('title',p.tit);
				if(!JB.is.und(p.val))
					if(!JB.is.und(el.value))
						el.value=p.val;
				if(!JB.is.und(p.ad))
					set_prop(el,p.ad);// nastav properties
				if(!JB.is.und(p.style)){
					for(key in p.style){
						try{
							el.style[key]=p.style[key];
						}catch(e){}
					}
				}
				if(!JB.is.und(p.pop)){
					el.title=p.pop;
					el.alt=p.pop;
				}
				//vytvoř link
				if(!JB.is.und(p.href)){
					if(JB.is.und(p.target)){
						p.target='_blank';
					}
					var a=JB.x.cel('a',{app:false,ad:{href:p.href,target:p.target}});
					a.appendChild(el);
					el=a;
				}
				//append, el je tento vytvořený objekt nebo link a v něm vytvořený objekt
				var app=true;
				if(!JB.is.und(p.app))app=p.app;
				if(app){
					if(!JB.is.und(ob.body)){
						ob.body.appendChild(el);
					}else{
						ob.appendChild(el);
					};
				}
			}
			return el;
			
			function set_prop(el,cim){
				var key;
				for(key in cim){
					try{
						if(typeof cim[key]=='object'){
							if(/(style)|(display)/gi.test(key)){
								//jen pro style je možno nastavovat rekurzivně, ost.objekty budou brány jako přiřazení reference
								set_prop(el[key],cim[key]);
							}else{
								el[key]=cim[key];
							}
						}else{
							el[key]=cim[key];
						}
					}catch(e){
						console.log('Error private fn JB.x.set_prop : set property '+key+' failed : '+e);
					}
				}
			}
		}
		this.merge_objs=function(el,cim){
			//sloučí objekty a vrátí nový sloučený
			var key;
			var o={};
			for(key in el)
					o[key]=el[key];
			for(key in cim)
					o[key]=cim[key];
			return o;
		}
		this.add_props=function(el,co){
			//připne objekt co na objekt el a vrátí el
			var key;
			for(key in co){
				try{
					el[key]=co[key];
				}catch(e){
					console.log('Error JB.x.add_props : set property '+key+' failed : '+e);
				}
			}
			return el;
		}
		this.el=function(x){
			/*vrací DOM element podle x
				x	=(string) text ID elementu
					=(objekt) tak je vrácen
			*/
			if(typeof x == 'string'){
				return document.getElementById(x);
			}if(typeof x == typeof {}){
				return x
			}else return undefined;
		}

		var sdiak='ÁÂÄĄáâäąČčĆćÇçCcĎĐďđÉÉĚËEEĘéěëeeęGgGgGgGgHhHhÍÎíîIiIiIiIiIiJjKkĹĺLlŁłĹĽĺľŇŃNnňńÓÖÔŐOOoóöőôoŘřŔŕRrŠšŚśSsŞşŢţŤťTtUuUuUuŮůŰűÚÜúüűUuWwÝYYyýyŽžŹźŻżß';
		var bdiak='AAAAaaaaCcCcCcCcDDddEEEEEEEeeeeeeGgGgGgGgHhHhIIiiIiIiIiIiIiJjKkLlLlLlLLllNNNnnnOOOOOOooooooRrRrRrSsSsSsSsTtTtTtUuUuUuUuUuUUuuuUuWwYYYyyyZzZzZzs';
		this.str_removedia= function(txt){
			//odstraní diakritiku z textu
			var tx,a,b,c,p
			txt=String(txt);
			tx="";
			for(p=0;p<txt.length;p++){
				b=txt.charCodeAt(p);
				if(b>127){
					a=sdiak.indexOf(txt.charAt(p));
					if(a>-1){
						tx+=bdiak.charAt(a);
					}else tx+='_';
				}else tx+=txt.charAt(p);
			}
			return tx;
		}

		this.GetIMEIChkSum = function(x){
		var a,c,o,ch,kont;
		// vrátí kontrolní číslici IMEI, tj číslo které má být na 15.pozici
			x=String(x);
			o=x;
			if(!/^\d{14}\d?_?$/.test(o)){return false};
			o="";
			/* kont = kontrolní číslo
			každé sudé číslo se znásobí a zamění jeho výsledkem v řetězci
			Příklad 49015 42032 3751 + kontrolní vypočítáme
				IMEI 				4	9	 	0 	1 	5 	4 	2 	0 	3 	2 	3 	7 		5 	1 	?
				Double every other 	4	18 		0 	2 	5 	8 	2 	0 	3 	4 	3 	14 		5 	2 	?
				Sum digits 			4 + (1+8) +	0 + 2 + 5 + 8 + 2 + 0 + 3 + 4 + 3 + (1+4)+ 	5 + 2 +	? = 52 + ?
			*/
			for(a=0; a<14; a++){
				ch=x.charAt(a);
				c=(a+1)/2;
				if(Math.floor(c)==(c)){
					//sudá * 2 - ale v indexování je to lichá
					ch=String(ch*2);
				}
				o += ch;
			}
			c=o.length;
			x=0;
			for(a=0; a<c; a++){
				x += (o.charAt(a)*1)
			}
			return ((Math.floor(x/10)+1)*10)-x; //zjisti nejbližší desítku nahoru a odečti x, tím se získá 15.číslo
		}		
		this.byte_to_text = function(co,zaok){
		// opraví číslo v "co" na textové vyjádření kB,MB,GB,TB a zaokrouhlí na "zaok" desetin
		var x,a
		var conv_byte_tx = ["B","kB","MB","GB","TB"];
			x=0
			while ((co>1024)&&(x<4)){
				co=co/1024;
				x=x+1;
			}
			co=JB.x.zaokrouhli(co,1,2);
			co=String(co);
			co=co.replace(/\./,",");
			return (co+" "+conv_byte_tx[x]);
		}		
		this.zaokrouhli = function(x,zaokr,poz){
		/*	x=číslo k zaokrouhlení
			zaokr=na jaké číslo se má zaokroulit
			poz=kolik desetinných míst

			př.: zaokrouhlování na 0,05 se fn(x,5,2)
		*/
		var b,c
			b=Math.pow(10,poz);//získej čím se má násobit
			c=zaokr/b/2;// číslo pro korekci zaokrouhlení
			x=x+c;//přičti korekci
			c=Math.floor(x*b/zaokr);//zaokrouhli
			x=c*zaokr/b;// vstup je saokrouhlen na požadovanou hodnotu
			return x;
		}		
		this.convertArrToObj=function(ar){
			/* konvertuje pole na asociované pole
			- ar	=(array) obsahuje
					na indexu nula musí být hlavička(názvy fieldů např z recordset)
			
			př. pole
			[
				["filed1","field2"],
				[111,222],
				[333,444]
			]
			bude převedeno na
			[
				{"field1":111,"field2":222},
				{"field1":333,"field2":444}
			]
			
			protože nultý index se bere jako popis sloupců, musí mít length min 2
			*/
			if(!JB.is.array(ar))return [];
			if(ar.length<2) return [];
			var a=[];
			var i,ii,o;
			for(i=1;i<ar.length;i++){
				o={};
				for(ii=0;ii<ar[i].length;ii++){
					o[ar[0][ii]]=ar[i][ii];
				}
				a.push(o);
			}
			return a;
		}
		this.removeHTMLentities =function(tx,def){
			/*odstraní html entities
			 def (default = true) pokud nastavíme na false, tak je převedeno vše, jinak je v základu ponecháno	&amp; &lt; &gt; &quot;
			*/
			if(JB.is.und(def))
				def=true;
			return String(tx).replace(/&#(\d+);?/g, function (_, code) {
				return String.fromCharCode(code);
			})
			.replace(/&#[xX]([A-Fa-f0-9]+);?/g, function (_, hex) {
				return String.fromCharCode(parseInt(hex, 16));
			})
			.replace(/&([^;\W]+;?)/g, function (m, e) {
				var ee = e.replace(/;$/, '');
				if( !(/((amp)|(lt)|(gt)|(quot))/.test(ee) && def) || !def){
					var target = ent_uni[e] || (e.match(/;$/) && ent_uni[ee]);
						
					if (typeof target === 'number') {
					  return String.fromCharCode(target);
					}
					else if (typeof target === 'string') {
					  return target;
					}
					else {
					  return m;
					}
				}else{
					return m;
				}
			})
		}			
	}
}

if(JB.forms==undefined){
// funkce pro práci s formuláři
	JB.forms= new function(){
		var ent=[
			['&','&amp;',null,null],//musí být první
			['\'','&#39;',null,null],
			['"','&quot;',null,null],
			['<','&lt;',null,null],
			['>','&gt;',null,null],
			['©','&copy;',null,null],
			[/\n/gi,'<br />',/<br\s*\/>/gi,'\n'],
			[/\r/gi,'',null,,null]
		];
		this.tx_to_html_base=function(tx){
			//převede citlivé znaky na HTML entity, viz tabulka výše
			tx=String(tx);
			var x;
			for(var a=0;a<ent.length;a++){
				if(typeof ent[a][0]=='string'){
					x=eval('/'+ent[a][0]+'/gi');
				}else{
					x=ent[a][0];
				}
				tx=tx.replace(x,ent[a][1]);
			}
			return tx;
		}
		this.html_to_tx_base=function(tx){
			//obrácená funkce k předchozí
			tx=String(tx);
			var x,o;
			for(var a=ent.length-1;a>=0;a--){
				if(ent[a][1]!=''){
					if(ent[a][2]==null){
						x=eval('/'+ent[a][1]+'/gi');
					}else{
						x=ent[a][2];
					}
					o=ent[a][3]==null?ent[a][0]:ent[a][3];
					tx=tx.replace(x,o);
				}
			}
			return tx;
		}
		this.serializeObjByObj =function(co,cim,jak,table,wh,uptx){
			/*funkce pro generování sql dotazu
				jak		=	(string)	'upd' - bude generován update řetězec
							(string)	'ins' - bude generován insert řetězec
				table	=	(string) 	jméno tabulky pro kterou bude řetězec připraven
				wh		=	(string default '') bude přidaný do where při update u insert je ignorováno
				uptx	=	(string default '') je přidán to části update, u inser je ignorován
				co		=	(objekt) který bude převeden na řetězec
				cim		=	(objekt) určuje jak naložit s fieldem
							kde	{jméno property:hodnota property,jméno property:hodnota property}
								jméno property	= (string) název 'fieldu v SQL/propertie v objektu "co"'
								hodnota property= (string)
											pokud bude	'key'	tak prvek pole bude použit do WHERE, platí jen pro ins, jinak bude při update ignorováno
																pokud bude key u více properties tak budou spojeny ve WHERE pomocí AND
														'tx'	tak bude prvek použit jako hodnota ale vynutí se vložení jako text
														''		tak nebude použit
														pokud nebude filed nalezen v tomto objektu tak bude prvek použit jako hodnota pro insert/update
														
				příklad:
					serializeObjByObj(
						{
							id:10,
							tx:'neco',
							xx:'vynech',
							val:10,
							val2:15,
							val3:'66'
						},
						{
							id:'key',
							xx:'',
							val2:'tx'
						},
						'ins',
						'test_tbl',
						'and fld in (5,6,7)'
					)
					vrátí string "insert into test_tbl(id,tx,val,val2,val3) values(10,'neco',10,'15','16')"
					v případě upd "update test_tbl set tx='neco',val=10,val2='15',val3='66' where id=10 and fld in (5,6,7)"
					
					
					hodnoty properties jsou testovány na string, pokud je hodnota string tak je tak použita do řetězce
			*/
			if(cim==undefined)cim={};
			if(cim==null)cim={};
			if(typeof cim!='object')cim={};
			if(wh==undefined)wh='';
			if(uptx==undefined)uptx='';
			var vv;
			var b='';
			var t='';
			var v='';
			var w='';
			for(a in co){
				b=cim[a];
				vv=co[a];
				if(b=='tx'){
					vv='\''+vv+'\'';
				}else if(b==''){
					vv=undefined;
				}else{
					if(typeof vv=='string'){
						vv='\''+vv+'\'';
					}else if(!JB.is.number(vv)){
						vv='\''+vv+'\'';					
					}
				}
				if(vv!=undefined){
					if((b=='key')&&(jak=='upd')){
						if(w!='')w+=' and ';
						w+=a+'='+vv;
					}else if((b=='key')&&(jak=='ins')){
						// nic
					}else{
						if(t!='')t+=',';
						if(jak=='ins'){
							if(v!='')v+=',';
							t+=a;
							v+=vv;
						}else if(jak=='upd'){
							t+=a+'='+vv;
						}
					}
				}
			}
			if(jak=='ins'){
				b='insert into '+table+'('+t+') values('+v+')';
			}else if(jak='upd'){
				b='update '+table+' set '+t+uptx+' where '+w+' '+wh;
			}else b='';
			return b;
		}
		this.convJquerySerializedArrayToObj=function (x){
			//konvertuje JQuery získané pole z formuláře pomocí serializeArray do objektu
			//př výstupu {jméno_obj:[hodnota1,hodnota2],jméno_obj2:['jen jedna hodnota']}
			// textová pole apod jednohodnotová pole dávají pole s jedním členem
			var o=new Object;
			var b,c;
			for(var a=0;a<x.length;a++){
				b=x[a];
				if(o[b.name]==undefined){
					o[b.name]=[];
				}
				if(JB.is.jsnumber(b.value))b.value*=1;
				o[b.name].push(b.value);
			}
			return o;
		}
		function opr_forms_from_str(form_names){
			if(typeof form_names=='string'){
				if(form_names=='')return undefined;
				x=[];
				x.push(form_names);
				form_names=x;
			}		
			return form_names;
		}
		function serialize_form(form,prefix){
			//pokud je zadán prefix, tak je výčet omezen na jména která začínají tímto prefixem
			//		prefix je z názvu odstraněn tzn jméno "val_neco" a prefix "val_" bude jméno "neco"
			if(JB.is.und(prefix))prefix='';
			try{
				prefix=eval('/^'+String(prefix)+'/');
			}catch(e){
				prefix='';
			}
			var a,x,ok,n;
			var o={};
			for(key in form.elements){
				try{
					if(!/(button)|(submit)|(reset)/gi.test(form.elements[key].type)){
						ok=true;
						if(prefix!=''){
							if(!prefix.test(form.elements[key].name))
								ok=false;
						}
						if(ok){
							x=JB.forms.val(form.elements[key].name,{form:form.name});
							if(x!=undefined){
								n=form.elements[key].name;
								if(prefix!='')
									n=String(n).replace(prefix,'');
								o[n]=x;
							}
						}
					}
				}catch(e){};
			}
			return o;
		}
		function get_vals_from_arr_form(form_names,timto,prefix){
			// timto= false je použito k získání jQuery
			// 			true tak je využio funkce val tohoto objektu
			//prefix = omezuje výběr inputů jen na ty které ním začínají, nemusí být zadán, potom jsou brány všechny
			//			platí jen při timto=true
			//			prefix je z názvu odstraněn tzn jméno "val_neco" a prefix "val_" bude jméno "neco"
			var o=new Object;
			for(var a=0;a<form_names.length;a++){
				fr=document.forms[form_names[a]];
				if(fr!=undefined){		
					if(timto==true){
						x=serialize_form(fr,prefix);
					}else{
						x=jQuery(fr).serializeArray();
						x=JB.forms.convJquerySerializedArrayToObj(x);
					}
					o[form_names[a]]=x;
				}
			}
			return o;		
		}
		this.getVals=function(form_names){
			//využívá jQuery !!!
			//generuje objekt kde v root jsou podobjekty hodnot podle jména formuláře a jména inputu
			//obj root : obj form_name  : obj input : array [ value,value1]
			//           obj form2_name : obj input : array [value]
			//form_names je pole textových hodnot jmen formulářů nebo jeden textový název formuláře
			// jedná se o name formu nejde o "id" elementu
			var fr,x;
			form_names=opr_forms_from_str(form_names);	
			return get_vals_from_arr_form(form_names,false);
		}
		this.Vals=function(form_names,prefix){
			//jako předchozí, ale pro získání hodnot nevyužívá jQuery ale fn'val' tohoto objektu, bere vpotaz vypnutý parent fieldset
			//jQuery čte hodnoty z inputů které jsou ve vypnutém fieldsetu, což je nežádoucí
			//prefix = omezuje výběr inputů jen na ty které ním začínají, nemusí být zadán, potom jsou brány všechny
			//	prefix je z názvu odstraněn tzn jméno "val_neco" a prefix "val_" bude jméno "neco"
			var fr,x;
			form_names=opr_forms_from_str(form_names);	
			return get_vals_from_arr_form(form_names,true,prefix);
		}
		this.val=function(s_el,ob){ 
			/*	s_el = element formu
				ob = objekt {val:'',form:''}
			
			 Nepoužívá jQuery
			 nastaví nebo přečte hodnotu elementu formuláře
			 funkční pro select, multiselect, checkboxy, radiobutony, text, textarea, file, password, hidden, button, reset, submit
			
			 pokud není zadáno ob.val tak čte hodnotu, pokud je tak se pokusí nastavit hodnotu
			 ob.val je pole hodnot řetězců nebo čísel popř kombinace - nebo může být řetězec nebo číslo
			 ob.form(řetězec) je název nebo id formuláře, pokud ob.form není zadáno s_el(string) musí obsahovat ID elementu ne name
			 s_el je name nebo ID form elementu pro čtení nebo nastavení
			 !! pokud je s_el přímý odkaz na objekt, bude ignorován form a použije se přímo tento odkaz na objekt
			 !! pokud funkci voláme k získání hodnoty vrací vždy pole s hodnotami, pokud se jedná o radiobuton nebo input text či textarea, má pole jen jeden prvek
			 pokud nastavujeme hodnotu, je na vstupu pole hodnot nebo pole s jednou hodnotou, kde pole s jednou hodnotou může být nahrazeno řetězcem nebo číslem
			 
			 příklad
				čtení
					JB.forms.val('slect_name',{form:'form_name_or_id'}) vrátí pole vybraných hodnot v selectu nebo pole s jednou hodnotou u radio, text atp.
				zápis
					JB.forms.val('slect_name',{form:'form_name_or_id',val:15}) nastaví v selectu řádek s hodnotou 15
					JB.forms.val('slect_name',{form:'form_name_or_id',val:[15,'other_val']}) nastaví v multiselectu řádeky s hodnotami 15 a 'other_val'
						pokud je toto použito pro select bez nastaveného multiselectu, je vybrán řádek s val[0] tj. s hodnotou 15
						toto platí i pro radio
			 
				přímý odkaz
					čtení
						JB.forms.val(objekt);
					zápis
						JB.forms.val(objekt,{val:15});
			 
			 */
			if(typeof ob=='undefined') ob={};
			var frm,el,r,x,a,z;
			
			if(typeof s_el != 'object'){
				if(typeof ob.form != 'undefined'){
					frm = document.forms[ob.form];
					if(typeof frm == 'undefined') document.getElementById(ob.form);
					if(typeof frm == 'undefined') return undefined;
					el = frm[s_el];
					if(typeof el=='undefined') el=document.getElementById(s_el);
					if(typeof el=='undefined') return false;
				}else{
					el=document.getElementById(s_el);
					if(typeof el=='undefined') return false;				
				}
			}else{
				el=s_el;
			}
			//el obsahuje požadovaný form input objekt
			var s=el.tagName;
			//test na disabled
			if(el.disabled==true)return undefined;
			//otestuj disabled na příp.fieldsety (mělo by být pořešeno prohlížečem,ale ...)
			x=el;
			if(typeof x.length!='undefined')if(el.length>0)x=el[0];
			a=true;
			//zjisti jestli parent fieldset není disabled
			while((typeof x.parentNode!='undefined')&& a){
				if(x.parentNode!=null){
					if(/form/gi.test(x.tagName)){
						a=false;
					}else if(/fieldset/gi.test(x.tagName)){
						if(x.disabled)return undefined;// nadřazený fieldset input vypíná
					}
					x=x.parentNode;
				}else{
					x={};
					x.parentNode=undefined;//ošetření proti null, pokud vrátí x.parentNode=null by při dalším kole while vygenerovalo chybu
				}
			}
			var el_arr=false;
			if(typeof s=='undefined')
				if(typeof el.length!='undefined')
					if(el.length>0)
						if(typeof el[0].tagName != 'undefined'){
							s=el[0].tagName;
							el_arr=true; //el je pole, tak se jedná o checkbox nebo radio
						}
			var g=(typeof ob.val == 'undefined'); // true pokud get value
			if(!g)if(/(string)|(number)/gi.test(typeof ob.val)){
				//pokud je na vstupu řetězec, je převeden na jednoprvkové pole
				x=[];
				x.push(ob.val);
				ob.val=x;
			}
			//převeď val hodnoty na stringy
			if(!g)
				for(a=0;a<ob.val.length;a++)
					ob.val[a]=String(ob.val[a]);
			if(/select/gi.test(s)){
				if(el.multiple){
					//pokud multiple
					x=[];
					for(a=0;a<el.options.length;a++){
						if(g){
							if(el.options[a].selected)x.push(el.options[a].value);
						}else{
							el.options[a].selected=(ob.val.indexOf(el.options[a].value)>-1);//toto zajistí promazání nevybraných a vybere požadované
						}
					}
					return g?x:undefined;
				}else{
					//pokud dropdown box nebo není multiple povolen
					if(g){
						x=[];
						if(el.options.length>0){
							z=el.options[el.selectedIndex].value;
							x.push((JB.is.number(z)?(z*1):z));
						}
						return x;
					}else{
						x=indexByVal(el.options,ob.val[0]);
						if(x>-1)el.selectedIndex=x;
						return;
					}
				}
			}else if(/input/gi.test(s)){
				//el obsahuje pole checkboxů nebo radiobutonů
				var t;
				if(el_arr)
					t=el[0].type;
				else
					t=el.type;
				if(/(checkbox)|(radio)/gi.test(t)){
					if(/radio/gi.test(t)){
						//radio umožňuje jen jednu volbu
						if(g){
							for(a=0;a<el.length;a++)
								if(el[a].checked){
									x=[];
									x.push((JB.is.number(el[a].value)?(el[a].value*1):el[a].value));
									return x;
								}
							return [];
						}else{
							for(a=0;a<el.length;a++){
								if(el[a].value==ob.val[0]){
									el[a].checked=true;
									return;
								}
							}
						}
					}else{
						//checkbox je jako multiselect;
						x=[];
						if(!el_arr)
							el=[el];
						for(a=0;a<el.length;a++){
							if(g){
								if(el[a].checked)
									x.push((JB.is.number(el[a].value)?(el[a].value*1):el[a].value));
							}else{
								el[a].checked=(ob.val.indexOf(el[a].value)>-1);
							}
						}
						return g?x:undefined;
					}
				}else if(/(text)|(password)|(hidden)|(file)|(button)|(reset)|(submit)/gi.test(t) && !el_arr){
					if(g){
						x=[];
						a=JB.is.number(el.value)?(el.value*1):String(el.value);
						if(/^0/.test(el.value))
							a=String(el.value);
						x.push(a);
						return x;
					}else{
						el.value=ob.val[0];
					}
				}
			}if(/textarea/gi.test(s)){
				if(g){
					x=[];
					x.push((JB.is.number(el.value)?(el.value*1):el.value));
					return x;
				}else{
					el.value=ob.val[0];			
				}
			}
			return undefined;
			
			function indexByVal(SelOps,val){
				//vybere index z options selectu podle její hodnoty value
				for(var a=0;a<SelOps.length;a++)
					if(SelOps[a].value==val)return a;
				return -1;
			}
		}
		this.setSelOpt = function(el,pole,jak){
			/*
			nastaví select hodnotami z pole v "pole"
			pokud jak='new' tak budou všechny options vymazány a vloženy nové
					jak='add' tak přidány jen nové tzn.kontroluje hodnoty ve VALUE
					jak='dbl' tak budou nové hodnoty přidán s možností že se bude VALUE hodnota opakovat ve více options
				jak default = 'new' - nemusí být zadáno
				
				pole = pole options tzn [[text,value,selected],[text2,value2,selected2] ....]  (selected=true/false)
						pole může také opsahovat jen jeden prvek [text,value] platí ale jen pokud chceme pracovat s jedním option
						hodnota selected nemusí být zadána
						
					- pokud je pole length=1 tak pokud není pole[0] object tak je převedeno na podpole
					tj. pokud pole je ['txt','val'] tak si jej opraví jako [['txt','val]], tot je zavedo pro
					zjednodušení zápisu při vkládání jen jednoho option
				el	 = element select
				
				fn vrací odkaz na poslední vložený option, jinak je undefined
			*/
			var a,x,vs,r;
			if(typeof jak=='undefined')jak='new';
			if(jak=='new')
				while(el.options.length>0)
					el.options.remove(0);
			if(pole.length>0){
				if(typeof pole[0]=='string'){
					x=[];
					x.push(pole);
					pole=x;
				}
			}
			vs=[];
			for(a=0;a<el.options.length;a++)
				vs.push(el.options[a].value);
			for(a=0;a<pole.length;a++){
				if(jak=='add'){
					if(vs.indexOf(pole[a][1])==-1)
						r=add_opt_itm(el,pole[a]);
				}else{ //dbl a new jen přidává na konec
					r=add_opt_itm(el,pole[a]);
				}
			}		
			return r;
			function add_opt_itm(el,pole_itm){
				var x;
				x=JB.x.opt(el,pole_itm[0],pole_itm[1]);
				if(pole_itm.length>2)
					if(pole_itm[2]==true)
						x.selected=true;
				return x;
			}
		}
		this.make = function(el,name,add,elms){
			/*
			vytvoří formulář s názvem v name, funkce frací jako výsledek tento objekt s class "frm_frm_main"
				-	el je html objekt kde se form vloží   el.addChild(form)
				-	"add" je objekt se skutečnými názvy atributů form, popř s vlastními názvy atribůtu které chceme pro form vytvořit
					tzn.běžné atributy jsou id,class,style,onclick atp.
				-	"elms" je pole objektů podle kterých se tvoří formulář
					jeden objekt s properties:	
									.typ		= jedno z těchto
											text,textarea,checkbox,radio,select,multiselect,hidden,password,file,button,submit,reset
											a speciální "group"
											
											potom lze použít speciální typ který slouží jako příkaz, zadává se jen typ a popř. k ní propojená volba
											command typ : 
												br = vloží element <br>, počet se zadává do 'cn' default je 1, počet nemusí být zadán př:{typ:'br',cn:2} vloží dvakrát <br>
												label = vloží element span pomocí JB.x.tx
														JB.x.tx(akt,tx,{ob:x,ad:akt.ad});
														tzn jsou dále platná
														.tx = text který bude span obsahovat
														.ad = objekt properties navíc jako u fn JB.x.tx
														
												ennmcss = zapne přidávání jména inputu do class obálky elementu
												dsnmcss = vypne přidávání jména inputu do class obálky elementu
												
											CSS tato hodnota je zanesena do css řetězce div obálky s prefixem "el_typ_" př. "el_typ_checkbox"
									
									.label	= zobrazený text / nemusí být zadán, nebude nic zobrazeno
										násl. properties jsou závisle jen při použití label
										.lbl_tp	= label type může být
											bf = before, před input elementem
											af = after, za elementem
										.lbl_br = (def=false) je vložen element <br> mezi label a element
									
									.pop	= zajistí nastavení atributů ALT a TITLE pro DIV elementu, nebo buttonu
									
									pro elementy jsou platné : 
										.name	= jméno elementu stejné jako atribut name inputu, selectu atp
										.val		= pole hodnot elementu (povoleno je také místo pole string nebo number, které si sama funkce převede na jednoprvkové pole)
											!! někdy není val u inputů vyžadováno, takže pokud není zadáno, je použit jako default prázdný řetězec !!
											u inputu jako je text, textarea je pole jednoprvkové
											u inputu checkbox, radio, select, je vytvořeno pro kažtou hodnotu input se stejným name, nebo option v selectu
												jeden prvek pro select je pole [tx,val,def]
												jeden prvek pro checkbox/radio [tx,val,def]
												kde
													tx je atribut 'text' options nebo text/popis checkboxu/radiobuttonu
													val je atribut 'value' options nebo value checkboxu/radiobuttonu
													def je defaultne vybraná hodnota obsahuje true nebo false
											
										.add		= objekt atributů jako výše u formu pro obálku alementu DIV
										.add_inp	= objekt atributů jako výše u formu přímo pro input element, např.pro možnost nastavit css, rozměry atp
												u checkboxu a radiobutonu je ignorováno
										
										atribut class lze nastavit přes object add.className
										style přes add.style = javascript object elementu style, př. add{style:{width:'100px'}}
										
										u checkboxu a radiobutonu je každá volba (text popisu + ovl.prvek) zapouzdřen do DIV s css "frm_el_option"
										
									dále pro elemety typu text a textarea je platné
										.maxlength = maximální délka, bude vytvořen span za input který zobrazí zbývající znaky
										.showmaxlen = default true - jestli se má zobrazit zbývající znaky za inputem
										.test   =  může obsahovat regexp objekt, funkci nebo string který projde funkcí eval
												regexp	- pro otestování vstupu po zadání
												string	- pokud tato prop bude obsahovat řetězec tak bude protažen funkcí eval
														funkce v řetězci musí vrátit false nebo true, pokud vrátí false nastaví inputu první css "frm_input_err"
														kde bude proměnná s_val obsahovat aktuální hodnotu tohoto pole
												function	-	je volána přímo tato funkce pro vyhodnocení, pokud je zavolána tato funkce platí v ní s_val v které
														je hodnota pole pro test, tato hodnota je i v proměnné pokud je tato funkce zapsána jako function(x)
														funkce musí vrátit true/false a platí nastavení css jako u stringu
														
												př tohoto pole
													/^\d{2,5}$/
													nebo 	string 'testovaci_funkce(s_val)' musí vrátit true pokud test OK nebo false
													nebo	.test:function(){
																return s_val=='';
															}
													nebo	.test:function(x){  je také platný, x bude obsahovat s_val
																return x=='';
															}
												
												pokut je toto nastaveno tak jsou platné následující css
													-"ftm_el_errdiv" je DIV za inputem který je zobrazen při chybě, tzn v CSS nastavit např jako čtverec
														16x16 s pozadím ikony vykřičníku, kde při najetí nad tento div je zobrazen text z "test_er_tx"
													-"frm_input_err" toto css je nastaveno přímo na inputu při chybě
												
										.test_er_tx = text nemusí být zadán, pokud je, tak se zobrazí při chybném vyhodnocení podle předchozí proměnné "test"
													pro zobrazení tohoto je nutno nastavit CSS viz předchozí property .test
													
										.acc		= regexp povolených znaků př. /[\d#&]/  jsou povoleny čísla a znaky "#" a "&"
										
									pro group je platné
										.elms	= jako u formuláře, tzn odpovídá tomuto objektu elms = pole objektů pro vytvoření elementů ale budou zapouzdřeny v elementu group
										.grtyp	= (nemusí být def='dv')
												  'dv' pro vytvoření z div
												  'fs' pro vytvoření z fieldset
										.enabler = def=false pokud je zadán true, tak je jen u grtyp='fs' zobrazen v popisu checkboc na ovldání zapnutí/vypnutí fieldsetu
										.label	= (nemusí být def='')
												  pro 'fs' bude nastavent element <legend>
												  pro 'dv' bude nastaven <span> v hlavičce 
										.csN		= (nemusí být zadáno def='') classname přidané k atributu class="frm_grp_main"
												  
												  pro 'dv'
													|-div main---------------|	css "frm_grp_main"
													| |-div label----------| |	css "frm_grp_label"
													| |<span>label</span>  | |
													| |--------------------| |
													|                        |
													| |-div content--------| |	css "frm_grp_sub"
													| | content            | |
													| |--------------------| |
													|------------------------|

												  pro 'fs'
													|-fieldset---------------|	css "frm_grp_main"
													| |-legend-------------| |	css "frm_grp_label"
													| |text label          | |
													| |--------------------| |
													|  content               |
													|------------------------|
													
									element formu je vytvořen jako pro 'lbl_tp'='bf'
									
										|-div main--------------------|		css "frm_el_main"
										| |-div lablel--------------| |		css "frm_el_label"
										| | <span>label</span>      | |
										| |-------------------------| |
										| <br>                      | | 	jen v případě 'lbl_br'=true jinak nebude element vytvořen
										| |-div input---------------| |		css "frm_el_content"
										| | <input><span-txln>      | |		css pro txln = "frm_el_txln" jen pokud je použito maxlength, jinak span neexistuje
										| |-------------------------| |
										|-----------------------------|
										
										pokud je 'lbl_tp'='af' je "div label" a "div_input" prohozeno
					
					- na každém inputu, selectu je přidána property JBlabel což je odkaz na element SPAN v labelu - obsahuje text label
					
					-funkce použitelné z venku
						- test() = vrátí false pokud nějaký input neslňuje zadaná kritéria v jeho "test" properties
						- values() = vrací objekt načtených hodnot pokud není nějaký chybně vyplněný z formuláře pomocí JB.forms.getVals - zkratka
									pokud je v některém inputu chyba vrátí undefined
			*/
			var frm=JB.x.cel('form',{csN:'frm_frm_main',ob:el,ad:add});
			frm.name=name;
			frm.values=function(prefix){
			//pomocí prefix lze omezit výběr inputů jen na jména z tímto prefixem
			//			prefix je z názvu odstraněn tzn jméno "val_neco" a prefix "val_" bude jméno "neco"
				if(this.test())
					return JB.forms.Vals(this.name,prefix);
				else
					return undefined;
			};
			frm.test=function(){
				var a;
				var ok=true;
				for(a=0;a<frm.length;a++){
					try{frm[a].test_value()}catch(e){};
					if(typeof frm[a].error !='undefined'){
						if(frm[a].error)ok=false;
					}
				}
				return ok;
			}
			make_elms(frm,elms);
			return frm;
			
			function make_group(el,prop){
				if(typeof prop.grtyp=='undefined')
					prop.grtyp='dv';
				if(prop.grtyp=='dv'){
					var m=JB.x.cel('div',{
						ob:el,
						csN:'frm_grp_main'+((typeof prop.csN == 'undefined')?'':(' '+prop.csN))
					});
					var lbl=JB.x.cel('div',{ob:m,csN:'frm_grp_label'});
					JB.x.tx(prop.label,{ob:lbl});
					var con=JB.x.cel('div',{ob:m,csN:'frm_grp_sub'});
					return con;
				}else if(prop.grtyp=='fs'){
					var m=JB.x.cel('fieldset',{
						ob:el,
						csN:'frm_grp_main'+((typeof prop.csN == 'undefined')?'':(' '+prop.csN))
					});
					var x=JB.x.cel('legend',{ob:m,csN:'frm_grp_label',tx:prop.label});
					if(prop.enabler==true){
						x=JB.x.cel('input',{
							ob:x,
							tp:'checkbox',
							ad:{
								//type:'checkbox',
								onclick:function(){
									this.for_flds.disabled=!this.checked;
								}
							}
						});
						x.for_flds=m;
						x.checked=!m.disabled;
					}
					return m;
				}
			}
			function make_elms(el,in_elms){
				//hlavní rutina - recursivní
				//el je element který bude obsahovat elms
				var akt,x,e,m,l,c,f,o,add_val,add_name,el_lab;
				var add_nm_css=false;
				for(var for_a=0;for_a<in_elms.length;for_a++){
					akt=in_elms[for_a];
					if(typeof akt!= 'undefined')// ochrana následujícího IF, IE chybně interpretuje pole a soubor metod počítá do length pole
					if(typeof akt.typ != 'undefined'){
						if(/group/gi.test(akt.typ)){
							x=make_group(el,akt)
							make_elms(x,akt.elms);
						}else{
							x=el;					
							if(/^br$/gi.test(akt.typ)){
								o=1;
								if(typeof akt.cn != 'undefined'){
									if(JB.is.number(akt.cn)){
										if((akt.cn>0)&&(akt.cn<50)) o=akt.cn*1;
									}
								}
								JB.x.BR({ob:x,cnt:o});
							}else if(/^label$/gi.test(akt.typ)){
								JB.x.tx(akt.tx,{ob:x,ad:akt.ad});
							}else if(/^ennmcss$/gi.test(akt.typ)){
								add_nm_css=true;
							}else if(/^dsnmcss$/gi.test(akt.typ)){
								add_nm_css=false;
							}else{
								el_lab=undefined;
								if(typeof akt.lbl_tp=='undefined')akt.lbl_tp='bf';
								if(/(submit)|(reset)|(button)|(hidden)/gi.test(akt.typ)){
									//pro tyto je zákaz labelu a divu
									akt.lbl_tp='';
									m=x;
								}else{
									m=JB.x.cel('div',{ob:x,ad:akt.add,pop:akt.pop});
									m.className='frm_el_main el_typ_'+akt.typ+' '+(add_nm_css?(akt.name+' '):'')+m.className;
								}
								if(akt.lbl_tp=='bf'){
									l=JB.x.cel('div',{ob:m,csN:'frm_el_label'});
									el_lab=JB.x.tx(akt.label,{ob:l});
									if(akt.lbl_br==true)
										JB.x.BR({ob:m});
								}
								
								// ošetři val
								add_val=true;
								if(typeof akt.val=='undefined'){
									akt.val='';
									add_val=false;
								}
								if(typeof akt.val!='object'){
									e=[];
									e.push(akt.val);
									akt.val=e;
								}
								//ošetři name
								add_name=true;
								if(typeof akt.name=='undefined'){
									akt.name='';
									add_name=false;
								}
								
								//BOF vytvoř element
								c=JB.x.cel('div',{ob:m,csN:'frm_el_content'});
								if(/select/gi.test(akt.typ)){
									e=JB.x.cel('select',{ob:c,ad:akt.add_inp});
									e.JBlabel=el_lab;
									if(add_name)e.name=akt.name;
									if(/multiselect/gi.test(akt.typ)) e.multiple=true;
									if(add_val){
										for(f=0;f<akt.val.length;f++){
											o=JB.x.cel('option',{ad:{text:akt.val[f][0],value:akt.val[f][1],defaultSelected:(akt.val[f][2]==true)}});
											e.add(o);
										}
									}
									make_text_ads(c,e,akt);
								}else if(/(radio)|(checkbox)/gi.test(akt.typ)){
									for(f=0;f<akt.val.length;f++){
										o=JB.x.cel('div',{ob:c,csN:'frm_el_option'});
										JB.x.tx(akt.val[f][0],{ob:o});
										e=JB.x.cel('input',{ob:o,tp:akt.typ});
										e.JBlabel=el_lab;
										try{
											// e.type=akt.typ;
											e.setAttribute('type',akt.typ);//pro jistotu
										}catch(err){};
										if(add_name)e.name=akt.name;
										if(add_val)e.value=akt.val[f][1];
										e.defaultChecked=(akt.val[f][2]==true);
									}
								}else if(/textarea/gi.test(akt.typ)){
									e=JB.x.cel('textarea',{ob:c,tx:akt.val[0],ad:akt.add_inp});
									e.JBlabel=el_lab;
									if(add_name)e.name=akt.name;
									make_text_ads(c,e,akt);
								}else if(/(text)|(submit)|(reset)|(button)|(hidden)/gi.test(akt.typ)){
									if(!/(text)/gi.test(akt.typ)){
										//pro ovl prvky odstraň DIV, která je jako obálka pro typ "text"
										m.removeChild(c);
										c=m;
									}
									e=JB.x.cel('input',{ob:c,tp:akt.typ,ad:akt.add_inp,pop:akt.pop});
									e.JBlabel=el_lab;
									try{
										//e.type=akt.typ;
										e.setAttribute('type',akt.typ);//pro jistotu
									}catch(err){};
									if(add_name)e.name=akt.name;
									if(add_val)e.value=akt.val[0];
									if(/text/gi.test(akt.typ))
										make_text_ads(c,e,akt);
								}
								//EOF vytvoř element
								
								if(akt.lbl_tp=='af'){
									if(akt.lbl_br==true)
										JB.x.BR({ob:m});
									l=JB.x.cel('div',{ob:m,csN:'frm_el_label'});
									JB.x.tx(akt.label,{ob:l});
								}					
							}
						}
					}
				}
			}
			function make_text_ads(parent, el, itm){
				// parent - hlavní element
				// el inputtext element, parent je rodič
				// itm je item z elms
				var x=false;
				if(typeof itm.test != 'undefined'){
					el.reg_test=itm.test;
					el.err_div=JB.x.cel('div',{ob:parent,csN:'ftm_el_errdiv',pop:itm.test_er_tx});
					jQuery(el.err_div).hide();
					x=true;
				}
				if(typeof itm.maxlength=='number'){
					el.maxlength=itm.maxlength;
					if(typeof itm.showmaxlen=='undefined')
						itm.showmaxlen=true;
					if(itm.showmaxlen==true){
						el.txtln=JB.x.tx('',{ob:parent,csN:'frm_el_txln'});
					}
					el.showmaxlen=itm.showmaxlen;
					x=true;
				}
				if(typeof itm.acc != 'undefined'){
					el.reg_acc=itm.acc;
					x=true;
				}
				if(x){
					el.onkeyupjbfrm=el.onkeyup;//vytvoření inherit
					el.onkeyup=function(e){
						e=this.getkeyevent(e);
						var a=String(this.value);
						if(typeof this.maxlength!='undefined'){
							//kontrola max délky, přepočítání a ořez
							if(a.length>this.maxlength){
								this.value=a.substr(0,this.maxlength); // ořez pro případ ctrl+v
								return false;
							}
							a=String(this.value);
							if(this.showmaxlen==true)
								this.txtln.innerHTML='('+(a.length)+'/'+this.maxlength+')';
						}
						this.test_value();
						if(typeof e !=undefined)
							// volání inherit
							if(typeof this.onkeyupjbfrm!='undefined')
								try{
									this.onkeyupjbfrm(e);
								}catch(e){}
						return false;
					}
					el.onkeypressfrm=el.onkeypress;
					el.onkeypress=function(e){
						e=this.getkeyevent(e);
						var a=String(this.value);
						if(e<32){
							//this.test_value();
							if(e=13)
								try{
									this.onchange();
								}catch(e){}
							return true;//pokud je key příkazová klávesa tak ok
						}
						if(typeof this.maxlength!='undefined'){
							this.txtln.innerHTML='('+(this.maxlength-a.length)+'/'+this.maxlength+')';
							//test maxlength
							if(a.length>(this.maxlength-1))
								return false;// zákaz uplatnění změny, při překrožení maxlength
						}
						if(typeof this.reg_acc!='undefined'){
							//pojisti global
							this.reg_acc.global=true;
							//filtruj nepřípustné znaky
							var o=String.fromCharCode(e);
							var x=this.reg_acc.test(o);
							if(!x)return false;
						}
						//test obsahu
						//this.test_value();
						if(typeof e !=undefined)
							// volání inherit
							if(typeof this.onkeypressfrm!='undefined')
								try{
									this.onkeypressfrm(e);
								}catch(e){}
						return true;
					}
					el.onchangejbfrm=el.onchange;
					el.onchange=function(e){
						e=this.getkeyevent(e);
						this.test_value();
						if(typeof this.onchangejbfrm!='undefined')
							try{
								this.onchangejbfrm(e);
							}catch(e){}
						return false;
					}
					el.test_value=function(){
						//test obsahu
						s_val=JB.forms.val(this);
						this.error=true;
						if(typeof this.reg_test!='undefined'){
							var ok=true;
							var s='';
							var fn=false;
							if(typeof this.reg_test!='string'){
								try{
									s=this.reg_test.toString();
									if(!/^\/.*\/g?i?g?$/g.test(s)){
										if(!/^function\s*\(/i.test(s)){
											return false;//test formátu regexpu a funkce aby to nebyl jiný objekt
										}else{
											//funkce
											fn=true;
										}
									}
									s=s+'.test(s_val)';
								}catch(e){
									s='';
								};
							}else s=this.reg_test;
							if(s=='')return false;
							try{
								if(fn){
									ok=this.reg_test(s_val);
								}else{
									ok=eval(s);
								}
							}catch(e){
								alert('Chyba eval, test input: '+e);
								ok=true;
							}
							if(ok){
								jQuery(this).removeClass('frm_input_err');
								jQuery(this.err_div).hide();
							}else{
								jQuery(this).addClass('frm_input_err');
								jQuery(this.err_div).show();
								return false;
							}
						}
						this.error=false;
						return true;
					}
					el.getkeyevent=function(e){
						//vrací keycode
						var k=0;
						if(typeof window.event != 'undefined'){ // IE
							try{
								if(typeof window.event.keyCode != 'undefined')
									k = window.event.keyCode
							}catch(e){
								k=0;
							}
						}else if(e!=undefined) if(e.which){ // Netscape/Firefox/Opera
							k = e.which
						}
						return k;
					}
					el.onkeyup();
				}
			}
			
		}
	}
}
JB.sql = new function(){
	function dve(a){
		a=String(a);
		if(a.length<2)a='0'+a;
		return a;
	}
	this.to_date = function(dt){
		//převede datum do řetězce sql
		dt=String(dt);
		if(!JB.is.date(dt)){
			if(JB.is.datetime(dt)){
				dt=dt.split(" ")[0];
			}else return '';
		}
		var x=dt.split(".");
		return x[2]+'-'+dve(x[1])+'-'+dve(x[0]);
	}
	this.to_time = function(dt){
		//převede datum do řetězce sql
		dt=String(dt);
		if(!JB.is.time(dt)){
			if(JB.is.datetime(dt)){
				dt=dt.split(" ")[1];
			}else return '';
		}
		var x=dt.split(":");
		return dve(x[0])+':'+dve(x[1])+':'+dve(x[2]);	
	}
	this.to_datetime = function(dt){
		//převede datum do řetězce sql
		return JB.sql.to_date(dt)+' '+JB.sql.to_time(dt);
	}
	this.printable = function(x,y){
		//info viz fn v JB.date
		return JB.date.printable(x,y);
	}
}
JB.is = new function(){
	this.und=function(x){
		// test jestli je object undefined
		//vrací true pokud undefined
		var a;
		try{
			a=(typeof x =='undefined')
		}catch(e){a=false;}
		return a;
	}
	this.empty=function(x){
		//vrací true, pokud je x null nebo undefined
		try{
			if(x==undefined)return true;
			if(x==null)return true;
		}catch(e){
			return true;
		}
		return false;		
	}
	
	this.date =function(x_num)
	{
	var a,b,c,x,z;
	// isd_x_num = string nebo jiné, které si převede na string

	// vrací true, jestli je string datum-ne s časem, jinak false
	// bere datum dd.mm.yyyy d.m.yyyy
		x_num=String(x_num);
	//	x_num=CorrectIfShortDatum(x_num);
		if(x_num.length<1){return false};
	//	z=/^((\d?\d)\.){2}(\d){4}$/;
		z=/^([0]?[1-9]|[12][0-9]|[3][01])\.([0]?[1-9]|[1][0-2])\.(((19)|(20))\d{2})$/;
		if(!z.test(x_num)){return false};

		x=x_num.split(".");
		x[0]=Math.floor(x[0]);
		x[1]=Math.floor(x[1]);
		x[2]=Math.floor(x[2]);
		
		//test přestupného roku a min roku 1900
		if(x[2]<1900){return false};
		c=Math.floor(x[2]/4)*4;
		if(c==x[2]){b=true}else{b=false};

		//test měsíce
		if((x[1]>12)||(x[1]<1)){return false};

		//test dne
		if(x[0]<1){return false};
		c=lns_month[x[1]-1];//b=max den
		if(b && (x[1]==2)){c+=1};//v únoru a přestupném roku zvyš o jeden
		if(x[0]>c){return false};

		return true;
	}		
	this.time=function(x){
		//vrací true pokud je "x" čas formátu 0:0:0 bez mezer
		var z;
			z=/^([01]?\d|[2][0-3])\:[0-5]?\d\:[0-5]?\d$/;
			if(!z.test(x)){return false};
			return true;
	};
	this.datetime=function(x){
		//test jestli "x" je datum a čas, je striktní na mezery, mezera může být pouze mez datem a časem 
		// formát "d.M.YYYY h:m:s" nebo "dd.MM.yyyy hh:mm:ss" mezera jen jedna
		// formát "d.M.YY h:m:s" nebo "dd.MM.yy hh:mm:ss" mezera jen jedna
		x=String(x);
		if(x.length<1){return false};
		var z=/^((\d?\d)\.){2}((\d){4}|(\d){2}) (\d?\d\:){2}\d?\d$/;
			if(!z.test(x)){return false};
			x=x.split(" ");
			if (x.length!=2){return false};
			if (JB.is.date(x[0])==false){return false};	
			if (JB.is.time(x[1])==false){return false};	
			
			return true;
	}
	this.PSC=function(x){return /^\d{3} ?\d{2}$/.test(x);}
	this.email=function(x,multiple){
	//multiple=vícenasobné ip adresy oddělené středníkem
		var s;
		if(multiple){
			s = /^((\w|[_%+-])+(\.(\w|[_%+-])+)*@((\w|[_%+-])+\.)+(\w|[_%+-])+)( *; *\1)*$/;
		}else{
			s=/^(\w|[_%+-])+(\.(\w|[_%+-])+)*@((\w|[_%+-])+\.)+(\w|[_%+-])+$/;
		};
		return s.test(x);
	}
	this.IMEI=function(x,ch_sum){
	var a,c,o,ch,kont;
		// vrací true false jestli je text na vstupu IMEI - kontrola checksum
		x=String(x);
		o=x;
		if(!/^\d{15}_?$/.test(o)){return false};
		if(!ch_sum){return true};
		o="";
		kont=(x.charAt(14)*1);
	// kont = kontrolní číslo
	// každé sudé číslo se znásobí a zamění jeho výsledkem v řetězci
	// Příklad 49015 42032 3751 + kontrolní vypočítáme
	// IMEI 				4	9	 	0 	1 	5 	4 	2 	0 	3 	2 	3 	7 		5 	1 	?
	// Double every other 	4	18 		0 	2 	5 	8 	2 	0 	3 	4 	3 	14 		5 	2 	?
	// Sum digits 			4 + (1+8) +	0 + 2 + 5 + 8 + 2 + 0 + 3 + 4 + 3 + (1+4)+ 	5 + 2 +	? = 52 + ?
		for(a=0; a<14; a++){
			ch=x.charAt(a);
			c=(a+1)/2;
			if(Math.floor(c)==(c)){
				//sudá * 2 - ale v indexování je to lichá
				ch=String(ch*2);
			}
			o += ch;
		}
		c=o.length;
		x=0;
		for(a=0; a<c; a++){
			x += (o.charAt(a)*1)
		}
		x += kont;
		return (Math.floor(x/10)==(x/10));
	}	
	this.number=function(x){
	// x_num= číslo, nebo string
	// vrací true když je x_num číslo (i záporné i s des.tečkou), jinak vrací false
	var z;
		x=String(x);
		if(x.length<1){return false};
		z=/^\-?((0*(\,|\.)\d+)|(\d)|(0*[1-9]\d*((\,|\.)\d+)?))$/;
		if(!z.test(String(x))){return false};
		return true;
	}
	this.jsnumber=function(x){
	// x_num= číslo, nebo string
	// vrací true když je x_num číslo (i záporné i s des.tečkou), jinak vrací false
	var z;
		x=String(x);
		if(x.length<1){return false};
		z=/^\-?\d*\.?(\d*)?$/;
		if(!z.test(String(x))){return false};
		return true;
	}
	this.IP=function(x,multiple){
		if(multiple){
			return /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3},)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/.test(x);
		}else{
			return /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/.test(x);		
		}
	}
	this.integer=function(x,sw){
	// test na integer, celé číslo
	// na začátku čísla nebo mezi mínusem a číslem nesmí být nuly
	// sw je objekt určující chování, jehoproperties jsou
	// 		.pos	(default false)-positive, pokud true, tak integer musí být větší jak -1
	// 		.strict	(default true), pokud true tak nesmí být před a za číslem mezery
	//		.nz		(default false) - nonzero, pokud nastaveno na true, tak číslo nesmí nabít hodnoty nula
	//		.multi	(default false) - pokud true, může text obsahovat více čísel oddělených čárkou nebo středníkem
	
	// default je test na jedno celé číslo jakékoliv celé hodnoty bez mezer
		var s1,s2;
		if(sw==undefined)
			sw={};
		if((sw.pos!=true)&&(sw.pos!=false))
			sw.pos=false;
		if((sw.strict!=true)&&(sw.strict!=false))
			sw.strict=true;
		if((sw.nz!=true)&&(sw.nz!=false))
			sw.nz=false;
		if((sw.multi!=true)&&(sw.multi!=false))
			sw.multi=false;
		x=String(x);
		if(x.length<1){return false};
		var s='('+(sw.nz?'':'(0)|')+'('+(sw.pos?'':'-?')+'([1-9][0-9]*)))';
		if(!sw.strict)
			s='\\'+'s*'+s+'\\'+'s*';
		if(sw.multi){
			s1=s+'(,'+s+')*';
			s2=s+'(;'+s+')*';
			s='('+s1+'|'+s2+')';
		}
		s='/^'+s+'$/';
		z=eval(s);
		
		return z.test(x);
	}
	this.telnum=function(x){
	//vrací true pokud je tel číslo nebo řetězec "neposkytl", "neposkytla"
	//bere +xxx xxx x x x x x x kde mezery nejsou povinné
	//bere xxx x x x x x x kde mezery nejsou povinné
	// před řetězcem může být mezera
	// za řetězcem může být nezera
		x=String(x);
		if(x.length<1){return false};
		return JB.is.telnums(x,true,true);
	}
	this.telnums=function(x,nps,vic){
	// pokud nps=true tak přijme jako tel číslo taky "neposkytl", "neposkytla" ale jen pokud je zadáno jen jedno, jinak jej nepřijme
	// může být více tel čísel oddělených středníkem
	// pokud vic=false tak přijme jen jedno číslo
	// typ čísel jako fn výše
	var a,z,s,ch;
		x=String(x);
		if(x.length<1){return false};
		x=x.split(';');
		if (!vic && (x.length>1)){return false};
		if (nps && (x.length=1)){
			z=/^ ?((\+?(\d){3})?(\d){3} ?((\d){1} ?){6}|[Nn]eposkytla?) ?$/;
		}else{
			z=/^ ?(\+?(\d){3})?(\d){3} ?((\d){1} ?){6} ?$/;
		}
		for (a=0;a<x.length; a++){
			if (!z.test(x[a])){return false};
		}
		return true;
	}	
	this.array=function(s){
		return typeof(s)=='object'&&(s instanceof Array);
	}
}

JB.date = new function(){
	this.printable = function(dt_sql,p){
		/* vstup řetězec nebo objekt date, vrací řetězec
		převede sql datum do tisknutelné podoby
			"p" - objekt přídavných parametrů
				.dt(default true) pokud true vrátí datum
				.tm(default true) pokud true vrátí čas
				
		akceptuje  formáty
			objekt Date
			yyyy-M-d H:m:s
			yyyy-MM-dd HH:mm:ss
			d.M.yyyy H:m:s
			dd.MM.yyyy HH:mm:ss
			
			u formátu 
			d.M.yy pokud je yy menší jak 80 tak opraví datum na 2000, jinak na 1900
			
			vrací
			d.M.yyyy H:m:s
		*/
		if(dt_sql instanceof Date){
			return dt_sql.getDate()
				+'.'
				+(dt_sql.getMonth()+1)
				+'.'
				+dt_sql.getFullYear()
				+' '
				+dt_sql.getHours()
				+':'
				+dt_sql.getMinutes()
				+':'
				+dt_sql.getSeconds();
		}
		
		if(p==undefined)
			p={};
		if((p.dt!=true)&&(p.dt!=false))
			p.dt=true;
		if((p.tm!=true)&&(p.tm!=false))
			p.tm=true;
		var s='';
		var x;
		var ok=false;
		var d=String(dt_sql);
		if((p.df==false)&&(p.tm==false))
			return '';
		if(p.dt){
			x=d.match(/^\d{4}(-\d{1,2}){2}/);
			if(x!=null)
			if(x.length>0){
				x=String(x[0]).match(/\d+/g);
				if(x!=null)
				if(x.length==3){
					s=(x[2]*1)+'.'+(x[1]*1)+'.'+(x[0]*1);
					ok=true;
				}
			}
			if(!ok){
				x=d.match(/^\d{1,2}\.\d{1,2}\.\d{2,4}/);
				if(x!=null)
				if(x.length>0){
					x=String(x[0]).match(/\d+/g);
					if(x!=null)
					if(x.length==3){
						x[2]=x[2]*1;
						if(x[2]<100)
							x[2] += (x[2]<80 ? 2000 : 1900);
						s=(x[0]*1)+'.'+(x[1]*1)+'.'+(x[2]*1);
						ok=true;
					}
				}
			}
		}
		if(p.tm){
			x=d.match(/\d{1,2}(:\d{1,2}){2}$/);
			if(x!=null)
			if(x.length>0){
				x=String(x[0]).match(/\d+/g);
				if(x!=null)
				if(x.length==3){
					if(s!='')
						s+=' ';
					s+=(x[0]*1)+':'+(x[1]*1)+':'+(x[2]*1);
				}
			}
		}
		return s;
	}
	this.correct=function(co,jak){
		/*zpětná kompatibilita
			viz fn printable
		 jak default 'dt' neusí být zadáno
				'dt' default vrací datetime
				'd' vrací jen date
				't' vrací jen time
		*/
		var vtm=false;
		var vdt=false;
		if(jak==undefined)
			jak='dt';
		if(jak=='d')
			vdt=true;
		if(jak=='t')
			vtm=true;
		if(jak=='dt'){
			vdt=true;
			vtm=true;
		}
		return JB.date.printable(co,{dt:vdt,tm:vtm});
	}
	this.numAdd = function(dttm,co,kolik){
	// přidá zvolenou hodnotu k datumu, datum musí být ve tvaru čísla
	// dttm = datumcas ve tvaru čísla
	// co =	"se"-sekundy
	//	  = "mi"=minuty
	//    = "ho"=hodiny
	//    = "d"=dny
	//    = "m"=měsíce
	//	  = "y"=roky
	// co není case
	// kolik záporná, nebo kladná hodnota
		if(JB.is.number(kolik)==false){return 0};
		if(kolik!=Math.floor(kolik)){return 0};
		kolik=Math.floor(kolik);
		if(JB.is.number(dttm)==false){return 0};
	var a,b;
	var h=1/24;
	var m=h/60;
	var s=m/60;
	var dt=Math.floor(dttm);//jen datum
	var tm=dttm-dt;//čas
	var dt_t;//pro testování data
		dt=num_to_date(dt);
		dt=dt.split(".");
		dt[0]=Math.floor(dt[0]);
		dt[1]=Math.floor(dt[1])-1;
		dt[2]=Math.floor(dt[2]);
		
		co=String(co);
		co=co.toLowerCase();
		switch (co){
			case "se" :
				dttm+=(kolik*s);
				break;
			case "mi" :
				dttm+=(kolik*m);
				break;
			case "ho" :
				dttm+=(kolik*h);
				break;
			case "d" :
				dttm+=kolik;
				break;
			case "m" :
				kolik+=Math.floor(dt[1]);// = přičti aktuální měsíce
				a=Math.floor(kolik/12);	//a = kolik roků přičíst
				b=kolik-a*12;			//b = kolik měsíců přičíst na další rok
				kolik=a;				// kolik = kolik roků přičíst
				dt[1]=String(b);
			case "y" :
			//přidat kontrolu, jestli  není datum vyšší než je povoleno v roku
				dt[1]=Math.floor(dt[1])+1;
				dt[2]=Math.floor(dt[2])+kolik;
				dt_t=lns_month[dt[1]-1];//získej max datum v měsíci
				if(Math.floor(dt[2]/4)==(dt[2]/4) && dt[1]==2){//oprav datum u druhého měcíce, pokud je přestupný rok
					dt_t += 1;
				}
				if(dt[0]>dt_t){//pokud je den větší jak povolený tak uprav
					dt[0]=dt[0]-dt_t;
					dt[1] += 1;
					if(dt[1]>12){//pokud  je měcíc vyšší jak 12, tak uprav
						dt[1]=dt[1]-12;
						dt[2] += 1;
					}
				}
				dttm=date_to_num(dt[0]+"."+dt[1]+"."+dt[2])+tm;
				break;
		}
		return dttm;
	}
	this.DateAdd=function(str_dttm,co,kolik){
		//jako numAdd ale na vstupu je řetězcové vyjádření datumu
		try{
			x=this.toNum(str_dttm);
			if(x==undefined)return;
			return this.fromNum(this.numAdd(x,co,kolik));
		}catch(e){
			//alert(e);
			return undefined;
		}
	}
	this.toNumDate = function(x){
	//převede datum na číslo
	var a,b,y,m,d,c
		if (JB.is.date(x)==false){return 0};
		x=x.split(".");
		a=x[2]-1900;
		m=x[1]-1;
		d=x[0]-1;
		b=Math.floor(a/4);
		c=a*365+b;
		b=0;
		for(a=0;a<m;a++){
			b+=lns_month[a];
		};
		b+=d;
		return (b+c);
	}
	this.NumToDate = function(x){
	//převede číslo na datum
	var a,y
		if(JB.is.number(x)==false){return ""};
		a=Math.floor(x/1461);//1461= 4*365+1
		x-=a*1461;
		y=a*4;		
		a=Math.floor(x/365);
		y+=a+1900;
		x-=a*365;
		a=0;
		while(x>=lns_month[a]){
			x-=lns_month[a];
			a++;
		};
		return ((x+1)+"."+(a+1)+"."+y);	
	}
	this.TimeToNum=function(x){
	if (JB.is.time(x)==false){return 0};
	var h=1/24;
	var m=h/60;
	var s=m/60;
	var	a;
		x=x.split(":");
		a=h*x[0];
		a+=m*x[1];
		a+=s*x[2];
		return (a);	
	}
	this.NumToTime=function(x){
	var a=24*60*60;
	var h,m;
		if(JB.is.number(x)==false){return ""};

		if ((x>=1)||(x<=0)){return 0};
		x=Math.round(x*a);
		
		h=Math.floor(x/3600);
		x-=h*3600;
			
		m=Math.floor(x/60);
		x-=m*60;
			
		return (h+":"+m+":"+x);
	}

	this.NumToDatetime=function(x){
	var a;
		if(JB.is.number(x)==false){return ""};
		a=Math.floor(x);
		x-=a;
		return (this.NumToDate(a)+" "+this.NumToTime(x));
	}
	
	//new universal utils
	
	this.toNum=function(x){
		// převede x datum na num vyjádření
		// bere všechny formáty které rozpozná fn correct
		x=this.correct(String(x));
		if(JB.is.datetime(x)){
			x=x.split(" ");
			return this.toNumDate(x[0])+this.TimeToNum(x[1]);
		}else if(JB.is.date(x)){
			return this.toNumDate(x);
		}else if(JB.is.time(x)){
			return this.TimeToNum(x);
		}else{
			return undefined;
		}
	}
	this.fromNum=function(x,typ){
		//vrací string vyjádření datumu, podle požadavku v typ
		//pokud typ není zadáno, tak vrací date pokud je čas 00:00:00, nebo datetime pokud je čas jiný jak nulový
		//typ = 1 vrať jen date
		//typ = 2 vrať jen time
		//typ = 3 vryť datetime, pokud je time nulový přidá 0:0:0
		if(typeof typ == 'undefined'){
			typ=0;
		}
		if(JB.is.number(x)==false){return ""};
		var a=Math.floor(x);
		x-=a;
		switch (typ){
			case 0:
				return this.NumToDate(a)+(x==0?'':' '+this.NumToTime(x));
				break;
			case 1:
				return this.NumToDate(a);
				break;
			case 2:
				return this.NumToTime(x);
				break;
			case 3:
				return this.NumToDate(a)+(x==0?' 0:0:0':' '+this.NumToTime(x));
				break;
		}
	}
	
	this.now=function(){
		var a=new Date();
		return this.correct(a.getFullYear()+'-'+(a.getMonth()+1)+'-'+a.getDate()+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds());
	}
}
JB.html = new function(){
	this.RepCrit = function(x){
		//v textu nahradí znaky '<' '>' a '&' html entitami
		var y;
		x=String(x);
		if(x.length<1)return '';
		var o='';
		for(var a=0;a<x.length;a++){
			y=x.charAt(a);
			switch(y){
				case '<':
					o+='&lt;';
					break;
				case '>':
					o+='&gt;';
					break;
				case '&':
					o+='&amp;';
					break;
				default:
					o+=y;
			}
		}
		return o;
	}
	//zjistí x umístění elementu na stránce
	//používat jQuery().offSet()
	//ponecháno pro zpětnou kompatibilitu
	this.left = function (obj){
		var curleft = 0;
		if (obj.offsetParent)
		{
			while (obj.offsetParent)
			{
				curleft += obj.offsetLeft
				obj = obj.offsetParent;
			}
		}
		else if (obj.x)
			curleft += obj.x;
		return curleft;
	}
	//zjistí y umístění elementu na stránce
	//používat jQuery().offSet()
	//ponecháno pro zpětnou kompatibilitu
	this.top = function (obj){
		var curtop = 0;
		if (obj.offsetParent)
		{
			while (obj.offsetParent)
			{
				curtop += obj.offsetTop
				obj = obj.offsetParent;
			}
		}
		else if (obj.y)
			curtop += obj.y;
		return curtop;
	}
	this.pos = function(obj){
	//používat jQuery().offSet()
	//ponecháno pro zpětnou kompatibilitu
		var o={};
		o.left=this.left(obj);
		o.top=this.top(obj);
		return o;
	}
}
//************************ cookies
if(JB.cookies==undefined){
	JB.cookies=new function(){
		this.get = function (c_name){
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++)
			  {
			  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			  x=x.replace(/^\s+|\s+$/g,"");
			  if (x==c_name)
				{
				return unescape(y);
				}
			  }
		}
		this.set=function(c_name,value,exdays){
			if(typeof exdays=='undefined')exdays=7;
			var exdate=new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
			document.cookie=c_name + "=" + c_value;
		}
		this.check=function(c_name){
			var x=getCookie(c_name);
			return (x!=null && x!="");
		}
	}
}

JB.help = new function(){
	this.errToConsole=function(text,e){
		var o='Name:'+e.name+'\n';
		o+='Line number : '+e.lineNumber+'\n';
		o+='Message : '+e.message+'\n';
		o+='Source : '+e.fileName+'\n';
		
		console.log(text+'\n'+o);
	}
	this.ThMCE = new function(){
		//helpfunkce pro ThinyMce
		this.val = function(id,x){
			//nastaví přešte text z textarea, textarea musí mít ID
			//	id je zadáno jako text bez znaku #
			// pokud není nastaveno x tak provede čtení
			// pokud je nastaveno x tak provede zápis
			var el=jQuery('#'+id);
			if(el.length==1){
				var tin=tinyMCE.get('popis');
				if(tin==undefined){
					if(x!=undefined){
						el[0].value=x;
					}else{
						return el[0].value;
					}
				}else{
					if(x!=undefined){
						tin.setContent(x);
					}else{
						return tin.getContent();
					}					
				}
			}
		}
	}
}
JB.CZK = function(val,des){
	/*
		zaokrouhlí cenu na CZK koruny na počet desetinných míst
	*/
	if(JB.is.und(des))
		des=0;
	var a;
	if(!JB.is.number(val))
		return val;
	val=val*1;

	var b=Math.pow(10,des);//získej čím se má násobit
		c=Math.ceil(val*b);//zaokrouhli
		val=c/b;// vstup je saokrouhlen na požadovanou hodnotu
		

	val=String(val);
	var x=String(val).split(/\./);
	var xx=String(x[0]);
	var o='';
	var cn=0;
	var old;
	for(a=(xx.length-1);a>=0;a--){
		o=xx.charAt(a)+o;
		cn++;
		old=o;
		if(cn%3==0)
			o='.'+o;
	}
	if(cn%3==0)
		o=old;
	if(x.length==2){
		o+=','+x[1];
		x=String(x[1]).length;
		if(x<des){
			o+=String('00000000000').substring(0,des-x);
		}
	}else{
		o+=',-';
	}
	return o+' CZK';
}


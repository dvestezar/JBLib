/*
JB tools
(c)2008
www.dvetezar.cz

v 2.0.2.1
*/

if(typeof JB == 'undefined'){
	var JB = new Object;
}

String.prototype.convToUniEsc=function(){
//escapuje unicode znaky pomocí hex pro JSON
	return JBconvToUniEsc(this.valueOf());
	
/*	var x,y;
	var a=this.valueOf();
	var o='';
	for(var i=0;i<a.length;i++){
		y=a.charCodeAt(i);
		if(y>127){
			x=y.toString(16);
			if(x.length!=4)	x="0000".substr(0,4-x.length)+x;
			o+='\\u'+x;
		}else o+=a.charAt(i);
	}
	return o;*/
}

function JBconvToUniEsc(a,rem){
	//rem true nebo false, true pokud chceme escapnout uvozovky a zpìtné lomítko default je false
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
		this.BR = function(p){
			//BR vytvoøí HTML element <br> s parametry v p
			//spec parametr p.cnt je poèet vloenıch BR, pokud není zadán tak je generován jen jeden
			//JB.x.BR({ob:xx})    pøidá <br> na konec elementu xx
			//JB.x.BR({ob:xx,cnt:3})    pøidá 3x <br> na konec elementu xx
			//p objekt viz.fn cel
			// !!tato funkce nic nevrací !!
			if(p==undefined)p=new Object;
			if(p.cnt==undefined)p.cnt=1;
			var x=p.cnt;//ochrana proti zmìnì p.cnt
			for(var a=0;a<x;a++)this.cel('br',p);
		}
		this.tx = function(txt,p){
			//vytvoøí a vrátí span element podle objektu p viz fn cel
			//txt nahrazuje p.tx
			if(p==undefined)p=new Object;
			p.tx=txt;
			return this.cel('span',p);
		}
		this.a = function(url,target,popis,alt,p){
			//vytvoøí a vrátí link <a> element podle objektu p viz fn cel
			//url a target je pøeneseno pøímo na element take p.ad.href , p.ad.href title s alt  nemají úèinek
			var a=this.cel('a',p);
			a.href=url;
			a.target=target;
			a.alt=alt;
			a.title=alt;
			a.innerHTML=popis;
			return a;
		}
		this.opt = function(select,txt,val,alt,p){
			//vytvoøí option v selectu
			//p jako u hlavní funkce cel
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
			typ = musí bıt zadán, je to typ vytvoøeného elementu jako u document.createElement (napø 'div','span' atp.
			v 'p' mohou bıt promìnné jako
				.id = id objectu
				.csN= className objektu
				.tx	= innerHTML
				.tp = atribut 'type' napø u INPUTu
				.nm = name napø pro iput
				.val = value napø pro INPUT
				
				.tit = atribut TITLE
				.pop = zajistí nastavení atributù ALT a TITLE elementu
				
				.doc = pokud je zadán musí obsahovat object document z daného okna pro kterı má bıt vytvoøen novı element
					pokud zadán není, je pouit aktuální document
				.ob	= pokud je zadán, tak je pouit tento object pro vytvoøení elementu, tøeba document object z jiného okna
				.app = pokud je zadáno 'true' tak je vytvoøenı element pøipojen k objektu ob (buï document nebo objekt v 'ob' pomocí appendchild
					jinak je vrácen jen novı objekt kterı není nikde pøiøazen, default je true
					
				.ad = objekt properties navíc, které se pokusí registrovat napø.
						{onclick:funkce,onchange:funkce2} se pokusí pøiøadit tyto "onclick" atp na vytvoøenı objekt
						lze také pouít ovlivnìní stylu pø. ad={onclick:funkce,style:{width:'100px',backgroundColor:'silver'}} následující je zkratka k obj style
				.style = objekt style html elementu
					Tento je dostupnı z .ad.style kde je pouito rekurzivní nastavování objektu, nepouije se jako pøiøazení reference
						pø.  .style.display=display_objekt_reference
							 .ad.style = style, bude foláno rekurzivnì nastavování properties za properties vèetnì display
				
				.href = pokud je zadán tak se element chová jako link, tzn.onlick otevøe nové okno s adresou v této promìnné
				.target = jako u linku, pokud nebude target nalezen nebo nebude zadán, bude pouito nové okno
			
			   vrací odkaz na element, pokud není zadán doc, tak není nikde pøiøazen a musí se pouít appenchild
			   pøíklady:
				JB.x.cel('div') vytvoøí div v aktuálním documentu
				
				win = window.open('','test')
				ndoc = window.document
				el=JB.x.cel('div',{doc:ndoc,ob:ndoc}) vytvoøí div v novém oknì
				JB.x.cel('a',{doc.ndoc,ob:el,tx:'linktest'}) vytvoøí link v pøedchozím DIVu
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
				//vytvoø link
				if(!JB.is.und(p.href)){
					if(JB.is.und(p.target)){
						p.target='_blank';
					}
					var a=JB.x.cel('a',{app:false,ad:{href:p.href,target:p.target}});
					a.appendChild(el);
					el=a;
				}
				//append, el je tento vytvoøenı objekt nebo link a v nìm vytvoøenı objekt
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
								//jen pro style je mono nastavovat rekurzivnì, ost.objekty budou brány jako pøiøazení reference
								set_prop(el[key],cim[key]);
							}else{
								el[key]=cim[key];
							}
						}else{
							el[key]=cim[key];
						}
					}catch(e){}
				}
			}
		}
		this.el=function(x){
			if(typeof x == 'string'){
				return document.getElementById(x);
			}if(typeof x == typeof {}){
				return x
			}else return undefined;
		}

		var sdiak='ÁÂÄ¥áâä¹ÈèÆæÇçCcÏĞïğÉÉÌËEEÊéìëeeêGgGgGgGgHhHhÍÎíîIiIiIiIiIiJjKkÅåLl£³Å¼å¾ÒÑNnòñÓÖÔÕOOoóöõôoØøÀàRrŠšŒœSsªºŞşTtUuUuUuÙùÛûÚÜúüûUuWwİYYyıyŸ¯¿ß';
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
		// vrátí kontrolní èíslici, tj èíslo které má bıt na 15.pozici
			x=String(x);
			o=x;
			if(!/^\d{14}\d?_?$/.test(o)){return false};
			o="";
		// kont = kontrolní èíslo
		// kadé sudé èíslo se znásobí a zamìní jeho vısledkem v øetìzci
		// Pøíklad 49015 42032 3751 + kontrolní vypoèítáme
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
			return ((Math.floor(x/10)+1)*10)-x; //zjisti nejbliší desítku nahoru a odeèti x, tím se získá 15.èíslo
		}		
		this.byte_to_text = function(co,zaok){
		// opraví "co" èíslo na kB,MB,GB a zaokrouhlí na "zaok"
		var x,a
		var conv_byte_tx = ["","kB","MB","GB","TB"];
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
		// x=èíslo k zaokrouhlení
		// zaokr=na jaké èíslo se má zaokroulit
		// poz=kolik dec.míst

		//pø.: zaokrouhlování na 0,05 se zadá zaokr=5 a poz=2
		var b,c
			b=Math.pow(10,poz);//získej èím se má násobit
			c=zaokr/b/2;// èíslo pro korekci zaokrouhlení
			x=x+c;//pøièti korekci
			c=Math.floor(x*b/zaokr);//zaokrouhli
			x=c*zaokr/b;// vstup je saokrouhlen na poadovanou hodnotu
			return x;
		}		
		this.convertArrToObj=function(ar){
			//konvertuje pole které obsahuje na indexu nula hlavièku(názvy fieldù z recordset) na pole objektù dat
			// tzn [["filed1","field2"],[111,222],[333,444]] = [{"field1":111,"field2":222},{"field1":333,"field2":444}]
			//nultı index se bere jako popis sloupcù take length musí bıt min 2
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
	}
}

if(JB.forms==undefined){
	JB.forms= new function(){
		var ent=[
			['&','&amp;',null,null],//musí bıt první
			['\'','&#39;',null,null],
			['"','&quot;',null,null],
			['<','&lt;',null,null],
			['>','&gt;',null,null],
			['©','&copy;',null,null],
			[/\n/gi,'<br />',/<br\s*\/>/gi,'\n'],
			[/\r/gi,'',null,,null]
		];
		this.tx_to_html_base=function(tx){
			//pøevede citlivé znaky na HTML entity, viz tabulka vıše
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
			//obrácená funkce k pøedchozí
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
				jak		=	'upd' bude generován update øetìzec
							'ins' bude generován insert øetìzec
				table	=	(string) jméno tabulky pro kterou bude øetìzec pøipraven
				wh		=	(string) string kterı bude pøidanı do where pøi update u insert je ignorováno
				uptx	=	(string) je pøidán to èásti update, u inser je ignorován
				co		=	objekt kterı bude pøeveden na øetìzec
				cim		=	(objekt)
							kde	
								jméno property	= string název 'fieldu v SQL/propertie v objektu "co"'
								hodnota property= string
											pokud bude	'key'	tak prvek pole bude pouit do WHERE, platí jen pro ins, jinak bude pøi update ignorováno
																pokud bude key u více properties tak budou spojeny ve WHERE pomocí AND
														'tx'	tak bude prvek pouit jako hodnota ale vynutí se vloení jako text
														''		tak nebude pouit
														pokud nebude nalezen tak bude prvek pouit jako hodnota pro insert/update
														
				pøíklad:
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
					v pøípadì upd "update test_tbl set tx='neco',val=10,val2='15',val3='66' where id=10 and fld in (5,6,7)"
					
					
					hodnoty properties jsou testovány na string, pokud je hodnota string tak je tak pouita do øetìzce
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
			//konvertuje JQuery získané pole z formuláøe pomocí serializeArray do objektu
			//pø vıstupu {jméno_obj:[hodnota1,hodnota2],jméno_obj2:['jen jedna hodnota']}
			// textová pole apod jednohodnotová pole dávají pole s jedním èlenem
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
			//pokud je zadán prefix, tak je vıèet omezen na jména která zaèínají tímto prefixem
			//		prefix je z názvu odstranìn tzn jméno "val_neco" a prefix "val_" bude jméno "neco"
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
			// timto= false je pouito k získání jQuery
			// 			true tak je vyuio funkce val tohoto objektu
			//prefix = omezuje vıbìr inputù jen na ty které ním zaèínají, nemusí bıt zadán, potom jsou brány všechny
			//			platí jen pøi timto=true
			//			prefix je z názvu odstranìn tzn jméno "val_neco" a prefix "val_" bude jméno "neco"
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
			//vyuívá jQuery !!!
			//generuje objekt kde v root jsou podobjekty hodnot podle jména formuláøe a jména inputu
			//obj root : obj form_name  : obj input : array [ value,value1]
			//           obj form2_name : obj input : array [value]
			//form_names je pole textovıch hodnot jmen formuláøù nebo jeden textovı název formuláøe
			// jedná se o name formu nejde o "id" elementu
			var fr,x;
			form_names=opr_forms_from_str(form_names);	
			return get_vals_from_arr_form(form_names,false);
		}
		this.Vals=function(form_names,prefix){
			//jako pøedchozí, ale pro získání hodnot nevyuívá jQuery ale fn'val' tohoto objektu, bere vpotaz vypnutı parent fieldset
			//jQuery ète hodnoty z inputù které jsou ve vypnutém fieldsetu, co je neádoucí
			//prefix = omezuje vıbìr inputù jen na ty které ním zaèínají, nemusí bıt zadán, potom jsou brány všechny
			//	prefix je z názvu odstranìn tzn jméno "val_neco" a prefix "val_" bude jméno "neco"
			var fr,x;
			form_names=opr_forms_from_str(form_names);	
			return get_vals_from_arr_form(form_names,true,prefix);
		}
		this.val=function(s_el,ob){ //ob = objekt {val:'',form:''}
			/*
			 Nepouívá jQuery
			 nastaví nebo pøeète hodnotu elementu formuláøe
			 funkèní pro select, multiselect, checkboxy, radiobutony, text, textarea, file, password, hidden, button, reset, submit
			
			 pokud není zadáno ob.val tak ète hodnotu, pokud je tak se pokusí nastavit hodnotu
			 ob.val je pole hodnot øetìzcù nebo èísel popø kombinace - nebo mùe bıt øetìzec nebo èíslo
			 ob.form(øetìzec) je název nebo id formuláøe, pokud ob.form není zadáno s_el(string) musí obsahovat ID elementu ne name
			 s_el je name nebo ID form elementu pro ètení nebo nastavení
			 !! pokud je s_el pøímı odkaz na objekt, bude ignorován form a pouije se pøímo tento odkaz na objekt
			 !! pokud funkci voláme k získání hodnoty vrací vdy pole s hodnotami, pokud se jedná o radiobuton nebo input text èi textarea, má pole jen jeden prvek
			 pokud nastavujeme hodnotu, je na vstupu pole hodnot nebo pole s jednou hodnotou, kde pole s jednou hodnotou mùe bıt nahrazeno øetìzcem nebo èíslem
			 
			 pøíklad
				ètení
					JB.forms.val('slect_name',{form:'form_name_or_id'}) vrátí pole vybranıch hodnot v selectu nebo pole s jednou hodnotou u radio, text atp.
				zápis
					JB.forms.val('slect_name',{form:'form_name_or_id',val:15}) nastaví v selectu øádek s hodnotou 15
					JB.forms.val('slect_name',{form:'form_name_or_id',val:[15,'other_val']}) nastaví v multiselectu øádeky s hodnotami 15 a 'other_val'
						pokud je toto pouito pro select bez nastaveného multiselectu, je vybrán øádek s val[0] tj. s hodnotou 15
						toto platí i pro radio
			 
				pøímı odkaz
					ètení
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
			//el obsahuje poadovanı form input objekt
			var s=el.tagName;
			//test na disabled
			if(el.disabled==true)return undefined;
			//otestuj disabled na pøíp.fieldsety (mìlo by bıt poøešeno prohlíeèem,ale ...)
			x=el;
			if(typeof x.length!='undefined')if(el.length>0)x=el[0];
			a=true;
			//zjisti jestli parent fieldset není disabled
			while((typeof x.parentNode!='undefined')&& a){
				if(x.parentNode!=null){
					if(/form/gi.test(x.tagName)){
						a=false;
					}else if(/fieldset/gi.test(x.tagName)){
						if(x.disabled)return undefined;// nadøazenı fieldset input vypíná
					}
					x=x.parentNode;
				}else{
					x={};
					x.parentNode=undefined;//ošetøení proti null, pokud vrátí x.parentNode=null by pøi dalším kole while vygenerovalo chybu
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
				//pokud je na vstupu øetìzec, je pøeveden na jednoprvkové pole
				x=[];
				x.push(ob.val);
				ob.val=x;
			}
			//pøeveï val hodnoty na stringy
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
							el.options[a].selected=(ob.val.indexOf(el.options[a].value)>-1);//toto zajistí promazání nevybranıch a vybere poadované
						}
					}
					return g?x:undefined;
				}else{
					//pokud dropdown box nebo není multiple povolen
					if(g){
						x=[];
						z=el.options[el.selectedIndex].value;
						x.push((JB.is.number(z)?(z*1):z));
						return x;
					}else{
						x=indexByVal(el.options,ob.val[0]);
						if(x>-1)el.selectedIndex=x;
						return;
					}
				}
			}else if(/input/gi.test(s)){
				//el obsahuje pole checkboxù nebo radiobutonù
				var t;
				if(el_arr)
					t=el[0].type;
				else
					t=el.type;
				if(/(checkbox)|(radio)/gi.test(t)){
					if(/radio/gi.test(t)){
						//radio umoòuje jen jednu volbu
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
			pokud jak='new' tak budou všechny options vymazány a vloeny nové
					jak='add' tak pøidány jen nové tzn.kontroluje hodnoty ve VALUE
					jak='dbl' tak budou nové hodnoty pøidán s moností e se bude VALUE hodnota opakovat ve více options
				jak default = 'new' - nemusí bıt zadáno
				
				pole = pole options tzn [[text,value,selected],[text2,value2,selected2] ....]  (selected=true/false)
						pole mùe také opsahovat jen jeden prvek [text,value] platí ale jen pokud chceme pracovat s jedním option
						hodnota selected nemusí bıt zadána
						
					- pokud je pole length=1 tak pokud není pole[0] object tak je pøevedeno na podpole
					tj. pokud pole je ['txt','val'] tak si jej opraví jako [['txt','val]], tot je zavedo pro
					zjednodušení zápisu pøi vkládání jen jednoho option
				el	 = element select
				
				fn vrací odkaz na poslední vloenı option, jinak je undefined
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
				}else{ //dbl a new jen pøidává na konec
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
			vytvoøí formuláø s názvem v name, funkce frací jako vısledek tento objekt s class "frm_frm_main"
				-	el je html objekt kde se form vloí   el.addChild(form)
				-	"add" je objekt se skuteènımi názvy atributù form, popø s vlastními názvy atribùtu které chceme pro form vytvoøit
					tzn.bìné atributy jsou id,class,style,onclick atp.
				-	"elms" je pole objektù podle kterıch se tvoøí formuláø
					jeden objekt s properties:	
									.typ		= jedno z tìchto
											text,textarea,checkbox,radio,select,multiselect,hidden,password,file,button,submit,reset
											a speciální "group"
											
											potom lze pouít speciální typ kterı slouí jako pøíkaz, zadává se jen typ a popø. k ní propojená volba
											command typ : 
												br = vloí element <br>, poèet se zadává do 'cn' default je 1, poèet nemusí bıt zadán pø:{typ:'br',cn:2} vloí dvakrát <br>
												label = vloí element span pomocí JB.x.tx
														JB.x.tx(akt,tx,{ob:x,ad:akt.ad});
														tzn jsou dále platná
														.tx = text kterı bude span obsahovat
														.ad = objekt properties navíc jako u fn JB.x.tx
														
												ennmcss = zapne pøidávání jména inputu do class obálky elementu
												dsnmcss = vypne pøidávání jména inputu do class obálky elementu
												
											CSS tato hodnota je zanesena do css øetìzce div obálky s prefixem "el_typ_" pø. "el_typ_checkbox"
									
									.label	= zobrazenı text / nemusí bıt zadán, nebude nic zobrazeno
										násl. properties jsou závisle jen pøi pouití label
										.lbl_tp	= label type mùe bıt
											bf = before, pøed input elementem
											af = after, za elementem
										.lbl_br = (def=false) je vloen element <br> mezi label a element
									
									.pop	= zajistí nastavení atributù ALT a TITLE pro DIV elementu, nebo buttonu
									
									pro elementy jsou platné : 
										.name	= jméno elementu stejné jako atribut name inputu, selectu atp
										.val		= pole hodnot elementu (povoleno je také místo pole string nebo number, které si sama funkce pøevede na jednoprvkové pole)
											!! nìkdy není val u inputù vyadováno, take pokud není zadáno, je pouit jako default prázdnı øetìzec !!
											u inputu jako je text, textarea je pole jednoprvkové
											u inputu checkbox, radio, select, je vytvoøeno pro katou hodnotu input se stejnım name, nebo option v selectu
												jeden prvek pro select je pole [tx,val,def]
												jeden prvek pro checkbox/radio [tx,val,def]
												kde
													tx je atribut 'text' options nebo text/popis checkboxu/radiobuttonu
													val je atribut 'value' options nebo value checkboxu/radiobuttonu
													def je defaultne vybraná hodnota obsahuje true nebo false
											
										.add		= objekt atributù jako vıše u formu pro obálku alementu DIV
										.add_inp	= objekt atributù jako vıše u formu pøímo pro input element, napø.pro monost nastavit css, rozmìry atp
												u checkboxu a radiobutonu je ignorováno
										
										atribut class lze nastavit pøes object add.className
										style pøes add.style = javascript object elementu style, pø. add{style:{width:'100px'}}
										
										u checkboxu a radiobutonu je kadá volba (text popisu + ovl.prvek) zapouzdøen do DIV s css "frm_el_option"
										
									dále pro elemety typu text a textarea je platné
										.maxlength = maximální délka, bude vytvoøen span za input kterı zobrazí zbıvající znaky
										.showmaxlen = default true - jestli se má zobrazit zbıvající znaky za inputem
										.test   =  mùe obsahovat regexp objekt, funkci nebo string kterı projde funkcí eval
												regexp	- pro otestování vstupu po zadání
												string	- pokud tato prop bude obsahovat øetìzec tak bude protaen funkcí eval
														funkce v øetìzci musí vrátit false nebo true, pokud vrátí false nastaví inputu první css "frm_input_err"
														kde bude promìnná s_val obsahovat aktuální hodnotu tohoto pole
												function	-	je volána pøímo tato funkce pro vyhodnocení, pokud je zavolána tato funkce platí v ní s_val v které
														je hodnota pole pro test, tato hodnota je i v promìnné pokud je tato funkce zapsána jako function(x)
														funkce musí vrátit true/false a platí nastavení css jako u stringu
														
												pø tohoto pole
													/^\d{2,5}$/
													nebo 	string 'testovaci_funkce(s_val)' musí vrátit true pokud test OK nebo false
													nebo	.test:function(){
																return s_val=='';
															}
													nebo	.test:function(x){  je také platnı, x bude obsahovat s_val
																return x=='';
															}
												
												pokut je toto nastaveno tak jsou platné následující css
													-"ftm_el_errdiv" je DIV za inputem kterı je zobrazen pøi chybì, tzn v CSS nastavit napø jako ètverec
														16x16 s pozadím ikony vykøièníku, kde pøi najetí nad tento div je zobrazen text z "test_er_tx"
													-"frm_input_err" toto css je nastaveno pøímo na inputu pøi chybì
												
										.test_er_tx = text nemusí bıt zadán, pokud je, tak se zobrazí pøi chybném vyhodnocení podle pøedchozí promìnné "test"
													pro zobrazení tohoto je nutno nastavit CSS viz pøedchozí property .test
													
										.acc		= regexp povolenıch znakù pø. /[\d#&]/  jsou povoleny èísla a znaky "#" a "&"
										
									pro group je platné
										.elms	= jako u formuláøe, tzn odpovídá tomuto objektu elms = pole objektù pro vytvoøení elementù ale budou zapouzdøeny v elementu group
										.grtyp	= (nemusí bıt def='dv')
												  'dv' pro vytvoøení z div
												  'fs' pro vytvoøení z fieldset
										.enabler = def=false pokud je zadán true, tak je jen u grtyp='fs' zobrazen v popisu checkboc na ovldání zapnutí/vypnutí fieldsetu
										.label	= (nemusí bıt def='')
												  pro 'fs' bude nastavent element <legend>
												  pro 'dv' bude nastaven <span> v hlavièce 
										.csN		= (nemusí bıt zadáno def='') classname pøidané k atributu class="frm_grp_main"
												  
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
													
									element formu je vytvoøen jako pro 'lbl_tp'='bf'
									
										|-div main--------------------|		css "frm_el_main"
										| |-div lablel--------------| |		css "frm_el_label"
										| | <span>label</span>      | |
										| |-------------------------| |
										| <br>                      | | 	jen v pøípadì 'lbl_br'=true jinak nebude element vytvoøen
										| |-div input---------------| |		css "frm_el_content"
										| | <input><span-txln>      | |		css pro txln = "frm_el_txln" jen pokud je pouito maxlength, jinak span neexistuje
										| |-------------------------| |
										|-----------------------------|
										
										pokud je 'lbl_tp'='af' je "div label" a "div_input" prohozeno
					
					- na kadém inputu, selectu je pøidána property JBlabel co je odkaz na element SPAN v labelu - obsahuje text label
					
					-funkce pouitelné z venku
						- test() = vrátí false pokud nìjakı input neslòuje zadaná kritéria v jeho "test" properties
						- values() = vrací objekt naètenıch hodnot pokud není nìjakı chybnì vyplnìnı z formuláøe pomocí JB.forms.getVals - zkratka
									pokud je v nìkterém inputu chyba vrátí undefined
			*/
			var frm=JB.x.cel('form',{csN:'frm_frm_main',ob:el,ad:add});
			frm.name=name;
			frm.values=function(prefix){
			//pomocí prefix lze omezit vıbìr inputù jen na jména z tímto prefixem
			//			prefix je z názvu odstranìn tzn jméno "val_neco" a prefix "val_" bude jméno "neco"
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
				//el je element kterı bude obsahovat elms
				var akt,x,e,m,l,c,f,o,add_val,add_name,el_lab;
				var add_nm_css=false;
				for(var for_a=0;for_a<in_elms.length;for_a++){
					akt=in_elms[for_a];
					if(typeof akt!= 'undefined')// ochrana následujícího IF, IE chybnì interpretuje pole a soubor metod poèítá do length pole
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
								
								// ošetøi val
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
								//ošetøi name
								add_name=true;
								if(typeof akt.name=='undefined'){
									akt.name='';
									add_name=false;
								}
								
								//BOF vytvoø element
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
										//pro ovl prvky odstraò DIV, která je jako obálka pro typ "text"
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
								//EOF vytvoø element
								
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
				// el inputtext element, parent je rodiè
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
					el.onkeyupjbfrm=el.onkeyup;//vytvoøení inherit
					el.onkeyup=function(e){
						e=this.getkeyevent(e);
						var a=String(this.value);
						if(typeof this.maxlength!='undefined'){
							//kontrola max délky, pøepoèítání a oøez
							if(a.length>this.maxlength){
								this.value=a.substr(0,this.maxlength); // oøez pro pøípad ctrl+v
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
							return true;//pokud je key pøíkazová klávesa tak ok
						}
						if(typeof this.maxlength!='undefined'){
							this.txtln.innerHTML='('+(this.maxlength-a.length)+'/'+this.maxlength+')';
							//test maxlength
							if(a.length>(this.maxlength-1))
								return false;// zákaz uplatnìní zmìny, pøi pøekroení maxlength
						}
						if(typeof this.reg_acc!='undefined'){
							//pojisti global
							this.reg_acc.global=true;
							//filtruj nepøípustné znaky
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
											return false;//test formátu regexpu a funkce aby to nebyl jinı objekt
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
	
	}
}
JB.is = new function(){
	this.und=function(x){
		// test jestli je object undefined
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
	// isd_x_num = string nebo jiné, které si pøevede na string

	// vrací true, jestli je string datum-ne s èasem, jinak false
	// bere datum dd.mm.yyyy d.m.yyyy
		x_num=String(x_num);
	//	x_num=CorrectIfShortDatum(x_num);
		if(x_num.length<1){return false};
	//	z=/^((\d?\d)\.){2}(\d){4}$/;
		z=/^([1-9]|[12][0-9]|[3][01])\.([1-9]|[1][0-2])\.(((19)|(20))\d{2})$/;
		if(!z.test(x_num)){return false};

		x=x_num.split(".");
		x[0]=Math.floor(x[0]);
		x[1]=Math.floor(x[1]);
		x[2]=Math.floor(x[2]);
		
		//test pøestupného roku a min roku 1900
		if(x[2]<1900){return false};
		c=Math.floor(x[2]/4)*4;
		if(c==x[2]){b=true}else{b=false};

		//test mìsíce
		if((x[1]>12)||(x[1]<1)){return false};

		//test dne
		if(x[0]<1){return false};
		c=lns_month[x[1]-1];//b=max den
		if(b && (x[1]==2)){c+=1};//v únoru a pøestupném roku zvyš o jeden
		if(x[0]>c){return false};

		return true;
	}		
	this.time=function(x){
		//vrací true pokud je "x" èas formátu 0:0:0 bez mezer
		var z;
			z=/^([01]?\d|[2][0-3])\:[0-5]?\d\:[0-5]?\d$/;
			if(!z.test(x)){return false};
			return true;
	};
	this.datetime=function(x){
		//test jestli "x" je datum a èas, je striktní na mezery, mezera mùe bıt pouze mez datem a èasem 
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
	//multiple=vícenasobné ip adresy oddìlené støedníkem
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
	// kont = kontrolní èíslo
	// kadé sudé èíslo se znásobí a zamìní jeho vısledkem v øetìzci
	// Pøíklad 49015 42032 3751 + kontrolní vypoèítáme
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
	// x_num= èíslo, nebo string
	// vrací true kdy je x_num èíslo (i záporné i s des.teèkou), jinak vrací false
	var z;
		x=String(x);
		if(x.length<1){return false};
		z=/^\-?((0*(\,|\.)\d+)|(\d)|(0*[1-9]\d*((\,|\.)\d+)?))$/;
		if(!z.test(String(x))){return false};
		return true;
	}
	this.jsnumber=function(x){
	// x_num= èíslo, nebo string
	// vrací true kdy je x_num èíslo (i záporné i s des.teèkou), jinak vrací false
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
	this.integer=function(x){
	// test na integer, celé èíslo
	// na zaèátku èísla nebo mezi mínusem a èíslem nezmí bıt nuly
		x=String(x);
		if(x.length<1){return false};
	var z=/^\-?[1-9]\d*$/;
		return z.test(x);
	}
	this.telnum=function(x){
	//vrací true pokud je tel èíslo nebo øetìzec "neposkytl", "neposkytla"
	//bere +xxx xxx x x x x x x kde mezery nejsou povinné
	//bere xxx x x x x x x kde mezery nejsou povinné
	// pøed øetìzcem mùe bıt mezera
	// za øetìzcem mùe bıt nezera
		x=String(x);
		if(x.length<1){return false};
		return JB.is.telnums(x,true,true);
	}
	this.telnums=function(x,nps,vic){
	// pokud nps=true tak pøijme jako tel èíslo taky "neposkytl", "neposkytla" ale jen pokud je zadáno jen jedno, jinak jej nepøijme
	// mùe bıt více tel èísel oddìlenıch støedníkem
	// pokud vic=false tak pøijme jen jedno èíslo
	// typ èísel jako fn vıše
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
	this.correct=function(co){
	// vrací pùvodní nebo opravené datum
	// pøevede formát yyyy-mm-dd (SQL)
	//               dd-mm-yyyy
	//               d.m.y   /  d.m.yy
	// na d.m.yyyy
	// pokud øetìzec obsahuje hh:mm:ss tak tento kousek ponechá beze zmìn
	var x,z;
	var tm='';
		co=String(co);
		z=/ (\d{1,2}:){2}\d{1,2}$/;
		if(z.test(co)){
			//pokud je na konci èas, tak extrahuj
			tm=co.match(z)[0];
			co=co.replace(z,'');
			//tm obsahuje time hodnotu
			//co je upraveno na datum
		}
		co.replace(/ +/gi,'');
		z=/^\d{4}-\d{1,2}-\d{1,2}$/;
		if(z.test(co)){
			//èíslo je yyyy-mm-dd
			x=co.split(/-/g);
			x[1]=Math.ceil(x[1]);
			x[2]=Math.ceil(x[2]);
			return x[2]+'.'+x[1]+'.'+x[0]+tm;
		}
		z=/^\d{1,2}-\d{1,2}-\d{4}$/;
		if(z.test(co)){
			//èíslo je dd-mm-yyyy
			x=co.split(/-/g);
			x[1]=Math.ceil(x[1]);
			x[0]=Math.ceil(x[0]);
			return x[0]+'.'+x[1]+'.'+x[2]+tm;
		}
		z=/^\d{1,2}\.\d{1,2}\.\d{1,4}$/;
		if(z.test(co)){
			//èíslo je d.m.y
			x=co.split(/\./g);
			x[2]=Math.ceil(x[2]);
			x[1]=Math.ceil(x[1]);
			x[0]=Math.ceil(x[0]);
			if (x[2]<100) {x[2] += (x[2]<80 ? 2000 : 1900)};
			return x[0]+'.'+x[1]+'.'+x[2]+tm;
		}
		z=/^\d{1,2}\.\d{1,2}\.?$/;//zkrácené datum
		if(z.test(co)){
			x=co.split(/\./g);
			x[1]=Math.ceil(x[1]);
			x[0]=Math.ceil(x[0]);
			var y= new Date();
			y= y.getFullYear();
			return x[0]+'.'+x[1]+'.'+ y+tm;
		}
		return co;
	}
	this.numAdd = function(dttm,co,kolik){
	// pøidá zvolenou hodnotu k datumu, datum musí bıt ve tvaru èísla
	// dttm = datumcas ve tvaru èísla
	// co =	"se"-sekundy
	//	  = "mi"=minuty
	//    = "ho"=hodiny
	//    = "d"=dny
	//    = "m"=mìsíce
	//	  = "y"=roky
	// co není case
	// kolik záporná, nebo kladná hodnota
		if(IsNumber(kolik)==false){return 0};
		if(kolik!=Math.floor(kolik)){return 0};
		kolik=Math.floor(kolik);
		if(IsNumber(dttm)==false){return 0};
	var a,b;
	var h=1/24;
	var m=h/60;
	var s=m/60;
	var dt=Math.floor(dttm);//jen datum
	var tm=dttm-dt;//èas
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
				kolik+=Math.floor(dt[1]);// = pøièti aktuální mìsíce
				a=Math.floor(kolik/12);	//a = kolik rokù pøièíst
				b=kolik-a*12;			//b = kolik mìsícù pøièíst na další rok
				kolik=a;				// kolik = kolik rokù pøièíst
				dt[1]=String(b);
			case "y" :
			//pøidat kontrolu, jestli  není datum vyšší ne je povoleno v roku
				dt[1]=Math.floor(dt[1])+1;
				dt[2]=Math.floor(dt[2])+kolik;
				dt_t=lns_month[dt[1]-1];//získej max datum v mìsíci
				if(Math.floor(dt[2]/4)==(dt[2]/4) && dt[1]==2){//oprav datum u druhého mìcíce, pokud je pøestupnı rok
					dt_t += 1;
				}
				if(dt[0]>dt_t){//pokud je den vìtší jak povolenı tak uprav
					dt[0]=dt[0]-dt_t;
					dt[1] += 1;
					if(dt[1]>12){//pokud  je mìcíc vyšší jak 12, tak uprav
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
		//jako numAdd ale na vstupu je øetìzcové vyjádøení datumu
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
	//pøevede datum na èíslo
	var a,b,y,m,d,c
		if (IsDatum(x)==false){return 0};
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
	//pøevede èíslo na datum
	var a,y
		if(IsNumber(x)==false){return ""};
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
	if (IsCas(x)==false){return 0};
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
		if(IsNumber(x)==false){return ""};

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
		if(IsNumber(x)==false){return ""};
		a=Math.floor(x);
		x-=a;
		return (this.NumToDate(a)+" "+this.NumToTime(x));
	}
	
	//new universal utils
	
	this.toNum=function(x){
		// pøevede x datum na num vyjádøení
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
		//vrací string vyjádøení datumu, podle poadavku v typ
		//pokud typ není zadáno, tak vrací date pokud je èas 00:00:00, nebo datetime pokud je èas jinı jak nulovı
		//typ = 1 vra jen date
		//typ = 2 vra jen time
		//typ = 3 vry datetime, pokud je time nulovı pøidá 0:0:0
		if(typeof typ == 'undefined'){
			typ=0;
		}
		if(IsNumber(x)==false){return ""};
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
	//zjistí x umístìní elementu na stránce
	//pouívat jQuery().offSet()
	//ponecháno pro zpìtnou kompatibilitu
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
	//zjistí y umístìní elementu na stránce
	//pouívat jQuery().offSet()
	//ponecháno pro zpìtnou kompatibilitu
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
	//pouívat jQuery().offSet()
	//ponecháno pro zpìtnou kompatibilitu
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
/*
by JB (c)2011

ModalWindow

využívá
	- jOuery
	- JB.x

v 1.0.30

funkce
	Přístup JB.win
		Př: JB.win.open(x,y,z)
	- .open(title,text,p)
		vyvolá modal okno
		-title	= (string) nadpis okna
					pokud osahuje zkratku z objektu JB_modal_win_tita, tak bude nastaven titulek s ikonout podle tohoto objektu
		-text	= (string) text okna i HTML
		-p		= objekt parametrů
				- w		= (integer) šířka okna, default je 250px
				- h		= (integer) výška okna, default je 100px
				- bt_cl	= (boolean) jestli se má zobrazit tlačítko uzavřít v pravém horním rohu - default true
				- at	= (integer)	autoclose - automaticky zavře okno po 'at' milisekundách, 
							default autoclose je zakázáno tj.nastaveno na nulu
				- lo	= tato property je zrušena, default je vždy top okno
							(boolean) default false - local, jestli se má okno zobrazit na lokálním okně/framu
							standartně fuknce hledá nadřazené okno (top) a tam vyvolá modální okno,
							pokud je true tak vyvolá okno v rámci frame nebo podokna
				- tp	=	(string) typ titulku viz objekt JB_modal_win_tita kde lze přidat další
						pokud není použito u open funkce, tak je použit text v title
						'nfo' - informace  - default u alert
						'war' - upozornění
						'err' - chyba
						'ask' - dotaz	- default u confirm
				- fn	=(funkce(x,param))
					pokud je zadána tak je volána funkcí close s parametrem kterým je close volána tzn close(x) - x je předáno této funkci
					u alert je v "x" undefined
					u confirm je v "x" true(Ano tlač.) nebo false(Ne tlač.), nebo undefined v případě autoclose
					
					-param obsahuje parametry z proměnné p při volání alert, confirm a open
	- .close()
		okamžitě zavře modal okno, zruší i timer, pokud byl zadán
	
	- .close_timer(time)
		zavoláním funkce se nastaví automatické zavření okna po time milisekundách
		-- použití : vyvoláme okno bez autoclose a po doběhu nejakého ajaxu se zavolá tato funkce k nastavení autoclose
		- time	= (integer) milisekundy
	
	- .close_bt(x)
		skryje nebo zobrazí tlačítko pro uzavření
		- x	= (boolean) true zobrazí, false skryje, musí být zadáno
		
	- .set_tit(x)
		nastaví titulek okna
		POZOR pokud x = názvu z objektu JB_modal_win_tita, tak je vytvořen titulek s ikonou podle tohoto objektu
		- x	= (string) titulek okna

	- .set_tx(x,add)
		nastaví text okna
		- x		= (string) text okna, text je nastaven přes funkci innerHTML
		- add	= (boolean) default false, pokud true tak se text přidá k aktuálnímu, jinak je text nahrazen
		
	- .alert(tx,p)
		jako javasriptfunkce alert, ale nepozastaví javascript, pro pokračování se musí volat funkce fn
		-	tx	= text
		-	p	= není povinné, odpovídá objektu u funkce open
			-	p.fn	= funkce která je volána po uzavření, nemusí být zadána
		
	- .confirm(tx,p)
		jako javasriptfunkce confirm, ale nepozastaví javascript, pro pokračování a test vrácené hodnoty se musí volat funkce fn
		-	tx	= text
		-	p	= není povinné, odpovídá objektu u funkce open
			-	p.fn	= funkce která je volána po uzavření, nemusí být zadána, pokud je zadána tak je volána fn(bool)
					kde bool je true(ano tlačítko) nebo false(ne tlačítko)
*/
// BOF definice nezbytného
	//rozšíření jazykového objektu JB_modal_win_lng o
	//pokud byl objekt vytvořen s těmito položkami, tak nebudou přepsány
	JB_modal_win_lnga=[
		['yes','Ano'],
		['no','Ne']
	];
	/*možné titulky JB_modal_win_tita
		jeden item
			index[0] = název, pokud je zadán v p.tp, titulku nebo funkci set_tit tak je použit tento objekt
			index[1] = pole o dvou položkách
				index[0] = zobrazený text, může být i HTML
				index[1] = url obrázku který bude zobrazen před ikonou, v CSS je nastaven na width 16px
	pokud byl objekt vytvořen s těmito položkami, tak nebudou přepsány
	*/	
	JB_modal_win_tita=[
		['nfo',['Informace','http://www.dvestezar.cz/!moje_js/add/ico_info.png']], //kulaté íčko
		['ask',['Potvrzení','http://www.dvestezar.cz/!moje_js/add/ico_ask.png']], // kulatý otazník
		['dtz',['Dotaz','http://www.dvestezar.cz/!moje_js/add/ico_ask.png']], // kulatý otazník
		['pzn',['Poznámka','http://www.dvestezar.cz/!moje_js/add/ico_pzn.png']], // žárovka
		['war',['Upozornění','http://www.dvestezar.cz/!moje_js/add/ico_war.png']], //trojuhelnik vikřičník
		['del',['Upozornění','http://www.dvestezar.cz/!moje_js/add/ico_del.png']], //koš
		['mail',['Upozornění','http://www.dvestezar.cz/!moje_js/add/ico_mail.png']], //obálka
		['lck',['Upozornění','http://www.dvestezar.cz/!moje_js/add/ico_lck.png']],	// zámek
		['err',['Chyba','http://www.dvestezar.cz/!moje_js/add/ico_err.png']] // erb křížek
	];
	//URL na obrázek tlačítka close
	if(typeof JB_modal_win_btn_close=='undefined')
		JB_modal_win_btn_close='http://www.dvestezar.cz/!moje_js/add/close_pop.png';
// EOF definice nezbytného
// BOF pomocný kód
	//vytvoř/doplň jazyk objekt
	if(typeof JB_modal_win_lng=='undefined')
		JB_modal_win_lng={};
	for(var a=0;a<JB_modal_win_lnga.length;a++){
		var b=JB_modal_win_lng[JB_modal_win_lnga[a][0]];
		if(typeof b=='undefined')
			JB_modal_win_lng[JB_modal_win_lnga[a][0]]=JB_modal_win_lnga[a][1];
	}
	//vytvoř/doplň objekt titulků
	if(typeof JB_modal_win_tit=='undefined')
		JB_modal_win_tit={};
	for(var a=0;a<JB_modal_win_tita.length;a++){
		var b=JB_modal_win_tit[JB_modal_win_tita[a][0]];
		if(typeof b=='undefined')
			JB_modal_win_tit[JB_modal_win_tita[a][0]]=JB_modal_win_tita[a][1];
	}
	//pokud JB neexistuje tak vytvoř
	if(typeof JB=='undefined'){
		JB={};
	}
// EOF pomocný kód
// hlavní kód
JB.win = new function(){
	timer=null;
	var wn=null;//okno které je ovládáno
	var bg=null;//pozadí ovládaného okna
	var wnti;
	var wntx;
	var fn;
	var btns;
	var lng=JB_modal_win_lng;
	var win_opened=false;
	var params;
	var close_status;
	this.open=function(title,text,p){
		//check obj p
		params=p;
		if(typeof p=='undefined')p={};
		if(typeof p.w=='undefined')p.w=250;
		if(typeof p.h=='undefined')p.h=100;
		if(typeof p.bt_cl=='undefined')p.bt_cl=true;
		if(typeof p.at=='undefined')p.at=0;
		if(typeof p.lo=='undefined')p.lo=false;
		if(typeof p.tp=='undefined')p.tp='';
		fn=p.fn;
		if((p.lo!=true)&&(p.lo!=false))p.lo=false;//ochrana booleanu
		
		if((p.bt_cl!=true)&&(p.bt_cl!=false))p.bt_cl=true;
		//get-gen mask body
		bg=jQuery('#JBmask');
		var doc=window.top.document;
//		if(p.lo==true)
//			doc=document;
		if(bg.length==0){
			bg=JB.x.cel('div',{id:'JBmask',ob:doc});
		}else{
			bg=bg[0];
		}
		//get-gen div window
		wn=jQuery('#JBModWin');
		if(wn.length==0){
			wn=JB.x.cel('div',{id:'JBModWin',ob:doc});
			var a=JB.x.a('','','','Zavřít',{ob:wn,className:'close',ad:{onclick:function(){
				JB.win.close();
				return false;
			}}});
			a.toto=this;
			JB.x.cel('img',{csN:'btn_close',pop:'Zavřít',ob:a,ad:{src:JB_modal_win_btn_close}});
			wn.close=a;
			wnti=JB.x.cel('div',{id:'JBModWinTit',ob:wn});
			wntx=JB.x.cel('div',{id:'JBModWinTx',ob:wn});
		}else{
			wn=wn[0];
			wnti=jQuery('#JBModWinTit')[0];
			wntx=jQuery('#JBModWinTx')[0];
		}
		JB.win.close_bt(p.bt_cl);
		var x=JB_modal_win_tit[p.tp];
		if(typeof x==undefined){
			this.set_tit(title);
		}else{
			this.set_tit(p.tp);		
		}
		wntx.innerHTML=text;
		jQuery(wn).css({ 
			'width' : p.w+'px',
			'height' : p.h+'px'
		});

		//nastav výšku text pole
		var hx,h;
		h=jQuery(wnti).height();
		hx=jQuery(wn).height();
		jQuery(wntx).height(hx-h);

		//Fade in the Popup
		jQuery(wn).fadeIn(300);
		//Set the center alignment padding + border see css style
		var wnMargTop = (jQuery(wn).height() + 24) / 2; 
		var wnMargLeft = (jQuery(wn).width() + 24) / 2; 
		jQuery(wn).css({ 
			'margin-top' : -wnMargTop,
			'margin-left' : -wnMargLeft
		});
		// Add the mask to body
		jQuery(bg).fadeIn(300);	
		//autoclose
		if(p.at>0) 
			this.close_timer(p.at);
		win_opened=true;
	}
	
	function iswin(){
		if(typeof wn=='undefined')return false;
		if(wn==null)return false;
		return true;
	}
	this.getparams= function(){
		return params;
	}
	
	this.close=function(x){
		if(!iswin())return;
		close_status=x;
		if(timer!=null){
			window.clearInterval(timer);
			timer=null;
		}
		if(typeof btns!='undefined'){
			jQuery(btns).remove();
			btns=undefined;
		}
		jQuery(wn).fadeOut(300 , function() {
			jQuery(bg).fadeOut(100, function(){
				JB.win.close_finally();
			});  
		});
	}
	this.close_finally = function(){
		win_opened=false;	
		if(typeof fn!='undefined'){
			try{fn(close_status,params)}catch(e){};
			fn=undefined;
		}
	}
	
	this.close_timer=function(miliseconds){
		if(!iswin())return;
		if(timer!=null){
			window.clearInterval(timer);
			timer=null;
		}
		timer=setInterval(function(){JB.win.close()},miliseconds);
	}
	this.close_bt=function(show){
		if(!iswin())return;
		if(show)
			wn.close.style.display=''
		else
			wn.close.style.display='none'
		;
	}
	this.set_tit=function(tx){
		if(!iswin())return;
		
		var a=JB_modal_win_tit[tx];
		if(typeof a!='undefined'){
			wnti.innerHTML='';
			JB.x.cel('img',{ob:wnti,ad:{src:a[1]}});
			JB.x.tx(a[0],{ob:wnti});
		}else{
			wnti.innerHTML=tx;
		}
	}
	this.set_tx=function(tx,add){
		if(!iswin())return;
		if(typeof add=='undefined')add=false;
		if(add==true)
			wntx.innerHTML+=tx;
		else
			wntx.innerHTML=tx;
		;
	}
	this.alert = function(tx,p){
		if(typeof p=='undefined')
			p={};
		if(typeof p.tp=='undefined')p.tp='nfo';
		this.open(lng.alert,tx,p);
	}
	this.confirm = function(tx,p){
		if(typeof p=='undefined')
			p={};
		p.bt_cl=false;
		if(typeof p.tp=='undefined')p.tp='ask';
		
		this.open(lng.conf,tx,p);
		btns=JB.x.cel('div',{csN:'confirm_buttons',ob:wn});
		var a=JB.x.cel('input',{ob:btns,val:lng.yes,tp:'button',csN:'button',ad:{
			onclick:function(){
				this.win.close(true);
			}
		}});
		a.win=this;
		a.focus();
		a=JB.x.cel('input',{ob:btns,val:lng.no,tp:'button',csN:'button',ad:{
			onclick:function(){
				this.win.close(false);
			}
		}});
		a.win=this;
		//oprav výšku
		var hx,h,hf;
		h=jQuery(wnti).height();
		hx=jQuery(wn).height();
		hf=jQuery(btns).height();
		jQuery(wntx).height(hx-h-hf);
	}
}
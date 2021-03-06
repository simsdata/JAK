/**
 * @class Prihlasovaci okenko
 * @signal login-done
 * @signal login-close
 */
JAK.LoginForm = JAK.ClassMaker.makeClass({
	NAME: "JAK.LoginForm",
	VERSION: "1.0",
	IMPLEMENT: [JAK.ISignals]
});

//musi probehnout pred koncem BODY
JAK.LoginForm.prototype.$constructor = function(conf) {
	this._conf = {
		serviceId: "",			// nutno vyplnit necim smysluplnym
		submitIframeUrl: JAK.Login.URL + "/beta/nop",	// url pro iframe, do ktereho se submitne form, nemelo by to nic udelat (obrazek,...)
		text: "<strong>Přihlaste se</strong> tam, kam se dosud nikdo nevydal.",
		autoClose: true
	};
	for (var p in conf) { this._conf[p] = conf[p]; }

	if (!this._conf.serviceId) { throw new Error("No serviceId specified"); }
	if (!this._conf.submitIframeUrl) { throw new Error("No submitIframeUrl specified"); }

	this._login = new JAK.LoginForm.Login(this, this._conf);
	this._register = new JAK.LoginForm.Register(this, this._conf);
	this._done = new JAK.LoginForm.Done(this, this._login);
	this._current = null;
}

JAK.LoginForm.prototype.useLink = function(link) {
	JAK.Events.addListener(link, "click", this);
}

JAK.LoginForm.prototype.open = function() {
	this.openLogin();
}

JAK.LoginForm.prototype.close = function() {
	if (!this._current) { return; }
	this._current.getWindow().close();
	this._current = null;
}

JAK.LoginForm.prototype.openLogin = function() {
	var win1 = this._login.getWindow();

	if (this._current == this._register) { /* prolinacka */

		var win2 = this._register.getWindow();
		win1.getContainer().classList.add("left");
		this._login.open();
		win1.getContainer().classList.remove("left");
		win2.getContainer().classList.add("right");

	} else { /* fade in */

		win1.getContainer().classList.remove("left");
		document.body.classList.add("login-fade");
		this._login.open();
		document.body.classList.remove("login-fade");

	}

	this._current = this._login;
}

JAK.LoginForm.prototype.openRegister = function() {
	var win2 = this._register.getWindow();

	if (this._current == this._login) { /* prolinacka */

		var win1 = this._login.getWindow();
		win2.getContainer().classList.add("right");
		this._register.open();
		win1.getContainer().classList.add("left");
		win2.getContainer().classList.remove("right");

	} else { /* fade in */

		win2.getContainer().classList.remove("right");
		document.body.classList.add("login-fade");
		this._register.open();
		document.body.classList.remove("login-fade");

	}
	
	this._current = this._register;
}

JAK.LoginForm.prototype.openDone = function(user, pass) {
	this._done.open(user, pass);

	this._current = this._done;
}

JAK.LoginForm.prototype.buildRow = function() {
	var row = JAK.mel("div");

	for (var i=0;i<arguments.length;i++) {
		var content = arguments[i];
		(content.nodeType ? row.appendChild(content) : row.innerHTML = content);
	}

	return row;
}

JAK.LoginForm.prototype.handleEvent = function(e) {
	JAK.Events.cancelDef(e);
	this.open();
}

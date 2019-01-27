var elElementCid = 0;
var currentMovingElementId = false;

const parraler = "p";
const serial = "s";

class LineManager {
    constructor(x1, y1, x2, y2) {
        this.line1 = createLine(x1, y1, x1, y2);
        this.line2 = createLine(x1, y2, x2, y2);

        document.body.appendChild(this.line1);
        document.body.appendChild(this.line2);
    }

    remove() {
        document.body.removeChild(this.line1);
        document.body.removeChild(this.line2);
    }
}

class ElElement {
    constructor(x, y, imgsrc, src) {
        this.src = src;
        this.type = imgsrc;
        this.srcx = x;
        this.srcy = y;
        this.id = elElementCid;

        elElementCid++;

        this.img = document.createElement("img");

        this.img.src = "images/" + imgsrc + ".png";

        this.img.draggable = false;
        this.img.classList.add("unselectable");

        this.img.classList.add("elelement");

        this.img.style.top = y + "px";
        this.img.style.left = x + "px";

        this.img.addEventListener('mousedown', (e) => { this.mouseDown(e); }, false);
        this.img.addEventListener("mouseup", (e) => { this.mouseUp(e); }, false);

        this.img.addEventListener("contextmenu", (e) => { this.settings(e); }, false);

        window.addEventListener('mousemove', (e) => { this.move(e) }, true);

        document.body.append(this.img);

        this.pos = {
            x: x,
            y: y
        };
        this.moving = false;

        this.offX = 0;
        this.offY = 0;

        this.serialConection = 0;
        this.parralerConnection = 0;

        if (!this.src)
            this.callculateDocks();
    }

    settings(e) {
        e.preventDefault();

        this.settingsMenu = document.createElement("div");
        this.settingsMenu.id;
        this.settingsMenu.classList.add("settings");
        this.settingsMenu.style.left = e.clientX + "px";
        this.settingsMenu.style.top = e.clientY + "px";

        document.body.appendChild(this.settingsMenu);

        //window.addEventListener("click", (e) => { if() });
    }

    mouseDown(e) {
        if (currentMovingElementId !== false)
            return;

        this.moving = true;
        currentMovingElementId = this.id;

        this.offY = e.clientY - parseInt(this.img.offsetTop);
        this.offX = e.clientX - parseInt(this.img.offsetLeft);

        drawAllDocks(this.id);
    }


    callculateDocks() {
    }

    mouseUp(e) {
        if (e.clientY < 130)
            return;
        this.moving = false;
        currentMovingElementId = false;

        hideAllDocks(this.id);
    }

    move(e) {
        if (!this.moving) return;
        if (this.docked) {

        } else {
            if (this.src) {
                this.src = false;
                elElements.push(new elElementsOptions[this.type](this.srcx, this.srcy, true));
            }
            this.img.style.top = (e.clientY - this.offY) + 'px';
            this.img.style.left = (e.clientX - this.offX) + 'px';
        }
    }

    drawDocks() {
        if (!(this.docked || this.type === "source"))
            return;
        this.callculateDocks();
        if (this.parralerDock)
            this.parralerDock.style.display = "block";
        if (this.serialDock)
            this.serialDock.style.display = "block";
    }

    hideDocks() {
        if (this.parralerDock)
            this.parralerDock.style.display = "none";
        if (this.serialDock)
            this.serialDock.style.display = "none";
    }

    dock(dockType, parent, e) {
        if (dockType == "p" && parent.type !== "source") {
            this.img.style.top = parent.img.offsetTop - 130 + 'px';
            this.img.style.left = parent.img.offsetLeft + 'px';

            this.parralerConnectionParent = parent;
            this.ManagedLineParraler = new LineManager(this.img.offsetLeft + 130, this.img.offsetTop + 64, parent.img.offsetLeft + 130, parent.img.offsetTop + 64);
        } else {
            if (parent.type === "source") {
                this.parentSource = parent;

                this.img.style.top = parent.img.offsetTop - 130 + 'px';
                this.img.style.left = parent.img.offsetLeft + 'px';
            } else {
                this.img.style.top = parent.img.offsetTop + 'px';
                this.img.style.left = parent.img.offsetLeft + 160 + 'px';
            }
            this.serialConectionParent = parent;

            var temp = parent;
            while (temp.serialConectionParent)
                temp = temp.serialConectionParent;
            this.ManagedLineSerial = new LineManager(this.img.offsetLeft + 130, this.img.offsetTop + 64, temp.img.offsetLeft + 130, temp.img.offsetTop + 64);
        }
        this.connected = dockType;

        if (parent.parentSource)
            this.parentSource = parent.parentSource;

        this.mouseUp(e);
        this.docked = true;

        console.log(this.parentSource)
        Update();
        return true;
    }

    callculateParralerDock(ud) {
        if (this.parralerDock) {
            if (ud == "up") {
                this.parralerDock.style.top = this.img.offsetTop - 90 + "px";
                this.parralerDock.style.left = this.img.offsetLeft + "px";
            } else {
                this.parralerDock.style.top = this.img.offsetTop + 130 + "px";
                this.parralerDock.style.left = this.img.offsetLeft + "px";
            }
        } else {
            this.parralerDock = document.createElement("div");
            this.parralerDock.id = this.id + parraler;
            this.parralerDock.classList.add("dock");

            if (ud == "up") {
                this.parralerDock.style.top = this.img.offsetTop - 90 + "px";
                this.parralerDock.style.left = this.img.offsetLeft + "px";
            } else {
                this.parralerDock.style.top = this.img.offsetTop + 130 + "px";
                this.parralerDock.style.left = this.img.offsetLeft + "px";
            }
            this.parralerDock.addEventListener("mouseenter", () => {
                this.parralerDock.style.borderWidth = 5 + "px";
                this.elementHovers = true;
            });

            this.parralerDock.addEventListener("mouseleave", () => {
                if (this.parralerDock)
                    this.parralerDock.style.borderWidth = 2 + "px";
                this.elementHovers = false;

            });

            this.parralerDock.addEventListener("mouseup", (e) => {
                if (currentMovingElementId !== false) {
                    var t = elElements.find((v) => { return v && v.id === currentMovingElementId });
                    if (t && t.dock(parraler, this, e)) {
                        this.parralerConnection = t.id;
                        document.body.removeChild(this.parralerDock);

                        this.parralerDock = null;

                        this.docked = true;

                        this.ManagedLineParraler = new LineManager(this.img.offsetLeft, this.img.offsetTop + 64, t.img.offsetLeft, t.img.offsetTop + 64);
                    }

                }
            });
            document.body.append(this.parralerDock);
        }
    }

    callculateSerialDock(lr) {
        if (this.serialDock) {
            if (lr == "right") {
                this.serialDock.style.top = this.img.offsetTop + 22 + "px";
                this.serialDock.style.left = this.img.offsetLeft + 130 + "px";
            } else {
                this.serialDock.style.top = this.img.offsetTop + 22 + "px";
                this.serialDock.style.left = this.img.offsetLeft - 130 + "px";
            }
        } else {
            this.serialDock = document.createElement("div");
            this.serialDock.id = this.id + serial;
            this.serialDock.classList.add("dock");

            if (lr == "right") {
                this.serialDock.style.top = this.img.offsetTop + 22 + "px";
                this.serialDock.style.left = this.img.offsetLeft + 130 + "px";
            } else {
                this.serialDock.style.top = this.img.offsetTop + 22 + "px";
                this.serialDock.style.left = this.img.offsetLeft - 130 + "px";
            }
            this.serialDock.addEventListener("mouseenter", () => {
                this.serialDock.style.borderWidth = 5 + "px";
                this.elementHovers = true;
            });

            this.serialDock.addEventListener("mouseleave", () => {
                if (this.serialDock)
                    this.serialDock.style.borderWidth = 2 + "px";
                this.elementHovers = false;
            });

            this.serialDock.addEventListener("mouseup", (e) => {
                if (currentMovingElementId !== false) {
                    var t = elElements.find((v) => { return v && v.id === currentMovingElementId });
                    if (t && t.dock(serial, this, e)) {
                        this.serialConection = t.id;
                        document.body.removeChild(this.serialDock);

                        this.serialDock = null;
                        this.ManagedLineSerial.remove();

                        this.docked = true;

                        this.ManagedLineSerial = new LineManager(this.img.offsetLeft + 130, this.img.offsetTop + 64, t.img.offsetLeft, t.img.offsetTop + 64);
                    }
                }
            });
            document.body.append(this.serialDock);
        }
    }
}

class Source extends ElElement {
    constructor(x, y) {
        super(x, y, "source", true);

        this.voltage = 220;
        this.frek = 50;
    }

    callculateDocks() {
        if (!this.parralerConnection)
            this.callculateParralerDock("up");

    }

    settings(e) {
        if (this.settingsMenu)
            return;
        super.settings(e);

        this.voltageMenu = document.createElement("input");
        this.voltageMenu.value = this.voltage;
        this.voltageMenu.style.width = 130 + "px";
        this.voltageMenuText = document.createTextNode("U/V");

        this.frekMenu = document.createElement("input");
        this.frekMenu.value = this.frek;
        this.frekMenu.style.width = 130 + "px";
        this.frekMenuText = document.createTextNode("f/Hz");

        this.settingsMenu.appendChild(this.voltageMenuText);
        this.settingsMenu.appendChild(this.voltageMenu);

        this.settingsMenu.appendChild(this.frekMenuText);
        this.settingsMenu.appendChild(this.frekMenu);


        this.first = true;

        var temp = (e) => {
            if (this.first) {
                this.first = false;
                return;
            }

            if (e.clientX > this.settingsMenu.offsetLeft && e.clientX < this.settingsMenu.offsetLeft + 130 &&
                e.clientY > this.settingsMenu.offsetTop && e.clientY < this.settingsMenu.offsetTop + 130)
                return;



            this.voltage = parseInt(this.voltageMenu.value);
            this.frek = parseInt(this.frekMenu.value);

            this.settingsMenu.removeChild(this.voltageMenuText);
            this.settingsMenu.removeChild(this.voltageMenu);

            this.settingsMenu.removeChild(this.frekMenuText);
            this.settingsMenu.removeChild(this.frekMenu);

            document.body.removeChild(this.settingsMenu);

            window.removeEventListener("click", temp);

            this.settingsMenu = null;

            Update();

        }
        this.winLis = window.addEventListener("click", temp);

    }
}

class Zavojnica extends ElElement {
    constructor(x, y) {
        super(x, y, "zavojnica", true);

        this.l = 10;
    }

    callculateDocks() {
        if (!this.parralerConnection)
            this.callculateParralerDock("up");
        if (!this.serialConection)
            this.callculateSerialDock("right");
    }

    settings(e) {
        if (this.settingsMenu)
            return;
        super.settings(e);

        this.lengthMenu = document.createElement("input");
        this.lengthMenu.value = this.l;
        this.lengthMenu.style.width = 130 + "px";

        this.lengthMenuText = document.createTextNode("L/mH");

        this.settingsMenu.appendChild(this.lengthMenuText);
        this.settingsMenu.appendChild(this.lengthMenu);

        this.first = true;

        var temp = (e) => {
            if (this.first) {
                this.first = false;
                return;
            }

            if (e.clientX > this.settingsMenu.offsetLeft && e.clientX < this.settingsMenu.offsetLeft + 130 &&
                e.clientY > this.settingsMenu.offsetTop && e.clientY < this.settingsMenu.offsetTop + 130)
                return;



            this.l = parseInt(this.lengthMenu.value);

            this.settingsMenu.removeChild(this.lengthMenuText);
            this.settingsMenu.removeChild(this.lengthMenu);

            document.body.removeChild(this.settingsMenu);

            window.removeEventListener("click", temp);

            this.settingsMenu = null;

            Update();
        }
        this.winLis = window.addEventListener("click", temp);

    }

}

class Kondenzator extends ElElement {
    constructor(x, y) {
        super(x, y, "kondenzator", true);

        this.cap = 10;
    }

    callculateDocks() {
        if (!this.parralerConnection)
            this.callculateParralerDock("up");
        if (!this.serialConection)
            this.callculateSerialDock("right");
    }

    settings(e) {
        if (this.settingsMenu)
            return;
        super.settings(e);

        this.capMenu = document.createElement("input");
        this.capMenu.value = this.cap;
        this.capMenu.style.width = 130 + "px";

        this.capMenuText = document.createTextNode("C/μF");

        this.settingsMenu.appendChild(this.capMenuText);
        this.settingsMenu.appendChild(this.capMenu);

        this.first = true;

        var temp = (e) => {
            if (this.first) {
                this.first = false;
                return;
            }

            if (e.clientX > this.settingsMenu.offsetLeft && e.clientX < this.settingsMenu.offsetLeft + 130 &&
                e.clientY > this.settingsMenu.offsetTop && e.clientY < this.settingsMenu.offsetTop + 130)
                return;



            this.cap = parseInt(this.capMenu.value);

            this.settingsMenu.removeChild(this.capMenuText);
            this.settingsMenu.removeChild(this.capMenu);

            document.body.removeChild(this.settingsMenu);

            window.removeEventListener("click", temp);

            this.settingsMenu = null;

            Update();
        }
        this.winLis = window.addEventListener("click", temp);

    }
}

class Otpornik extends ElElement {
    constructor(x, y) {
        super(x, y, "otpornik", true);

        this.otp = 100;
    }

    callculateDocks() {
        if (!this.parralerConnection)
            this.callculateParralerDock("up");
        if (!this.serialConection)
            this.callculateSerialDock("right");
    }

    settings(e) {
        if (this.settingsMenu)
            return;
        super.settings(e);

        this.otpMenu = document.createElement("input");
        this.otpMenu.value = this.otp;
        this.otpMenu.style.width = 130 + "px";

        this.otpMenuText = document.createTextNode("R/Ω");

        this.settingsMenu.appendChild(this.otpMenuText);
        this.settingsMenu.appendChild(this.otpMenu);

        this.first = true;

        var temp = (e) => {
            if (this.first) {
                this.first = false;
                return;
            }

            if (e.clientX > this.settingsMenu.offsetLeft && e.clientX < this.settingsMenu.offsetLeft + 130 &&
                e.clientY > this.settingsMenu.offsetTop && e.clientY < this.settingsMenu.offsetTop + 130)
                return;



            this.otp = parseInt(this.otpMenu.value);

            this.settingsMenu.removeChild(this.otpMenuText);
            this.settingsMenu.removeChild(this.otpMenu);

            document.body.removeChild(this.settingsMenu);

            window.removeEventListener("click", temp);

            this.settingsMenu = null;

            Update();
        }
        this.winLis = window.addEventListener("click", temp);

    }
}

class AmperMetar extends ElElement {
    constructor(x, y) {
        super(x, y, "ametar", true);
    }

    callculateDocks() {
    }


    dock(dockType, parent, e) {
        if (dockType === serial)
            return super.dock(dockType, parent, e)
        else
            return false;
    }

    setA(Z, I, omega, V) {
        let v = I;

        if (this.info) {
            this.textNode.textContent = "I: " + Number(v).toFixed(2) + "A";
            return;
        }

        this.info = document.createElement("div");

        this.info.draggable = false;
        this.info.classList.add("unselectable");
        this.info.classList.add("elelement");
        this.info.style.top = this.img.offsetTop - 15 + "px";
        this.info.style.left = this.img.offsetLeft + "px";

        this.textNode = document.createTextNode("I: " + Number(v).toFixed(2) + "A");

        this.info.appendChild(this.textNode);

        document.body.appendChild(this.info);
    }

    settings(e) {
        return;
    }
}

class VoltMetar extends ElElement {
    constructor(x, y) {
        super(x, y, "vmetar", true);
    }

    callculateDocks() {
    }


    dock(dockType, parent, e) {
        if (dockType === parraler)
            return super.dock(dockType, parent, e)
        else
            return false;
    }

    setV(Z, I, omega, V) {
        let v = "NaN";
        if (this.parralerConnectionParent.type == "otpornik") {
            v = this.parralerConnectionParent.otp * I;
        }
        else if (this.parralerConnectionParent.type == "kondenzator") {
            v = (1 / (this.parralerConnectionParent.cap * Math.pow(10, -6) * omega)) * I;
        } else if (this.parralerConnectionParent.type == "zavojnica") {
            v = I * omega * this.parralerConnectionParent.l * Math.pow(10, -3);
        }
        if (this.info) {
            this.textNode.textContent = "U: " + Number(v).toFixed(2) + "V";
            return;
        }

        this.info = document.createElement("div");

        this.info.draggable = false;
        this.info.classList.add("unselectable");
        this.info.classList.add("elelement");
        this.info.style.top = this.img.offsetTop - 15 + "px";
        this.info.style.left = this.img.offsetLeft + "px";

        this.textNode = document.createTextNode("U: " + Number(v).toFixed(2) + "V");

        this.info.appendChild(this.textNode);

        document.body.appendChild(this.info);
    }

    settings(e) {
        return;
    }
}

var elElements = [];
var elElementsOptions = {
    source: Source,
    zavojnica: Zavojnica,
    kondenzator: Kondenzator,
    otpornik: Otpornik,
    ametar: AmperMetar,
    vmetar: VoltMetar,
};
document.addEventListener("DOMContentLoaded", () => {
    //document.getElementById('izvor').addEventListener('mousedown', mouseDown, false);
    //document.getElementById('otpornik').addEventListener('mousedown', mouseDown, false);
    //document.getElementById('zavojnica').addEventListener('mousedown', mouseDown, false);
    //document.getElementById('kondenzator').addEventListener('mousedown', mouseDown, false);

    var w = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    var h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    elElements.push(new Source(w / 6 * 0, -15, true))
    elElements.push(new Zavojnica(w / 6 * 1, -15, true))
    elElements.push(new Otpornik(w / 6 * 2, -15, true))
    elElements.push(new Kondenzator(w / 6 * 3, -15, true))
    elElements.push(new AmperMetar(w / 6 * 4, -15, true))
    elElements.push(new VoltMetar(w / 6 * 5, -15, true))

    window.ondragstart = function () { return false }



    let bin = document.createElement("img");
    bin.src = "images/bin.png"
    bin.classList.add("bin");

    var mouseEntered = false;

    bin.addEventListener("mouseenter", () => {
        mouseEntered = true;
    });

    bin.addEventListener("mouseleave", () => {
        mouseEntered = false;
    });

    bin.addEventListener("mouseup", (e) => {
        if (!mouseEntered || !currentMovingElementId)
            return;

        let temp = currentMovingElementId;

        elElements[temp].mouseUp(e);

        document.body.removeChild(elElements[temp].img);
        elElements[temp] = null;
    });


    bin.style.top = h - 130 + "px"
    bin.style.left = 90 + "%";

    document.body.appendChild(bin);
});


function drawAllDocks(callerId) {
    for (var i = 0; i < elElements.length; i++)
        if (elElements[i] && elElements[i].id != callerId && !elElements[i].src)
            elElements[i].drawDocks();
}

function hideAllDocks(callerId) {
    for (var i = 0; i < elElements.length; i++)
        if (elElements[i] && elElements[i].id != callerId && !elElements[i].src)
            elElements[i].hideDocks();
}


function createLineElement(x, y, length, angle) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid black; '
        + 'width: ' + length + 'px; '
        + 'height: 0px; '
        + '-moz-transform: rotate(' + angle + 'rad); '
        + '-webkit-transform: rotate(' + angle + 'rad); '
        + '-o-transform: rotate(' + angle + 'rad); '
        + '-ms-transform: rotate(' + angle + 'rad); '
        + 'position: absolute; '
        + 'top: ' + y + 'px; '
        + 'left: ' + x + 'px; ';
    line.setAttribute('style', styles);
    return line;
}

function createLine(x1, y1, x2, y2) {
    var a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    var sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    var x = sx - c / 2,
        y = sy;

    var alpha = Math.PI - Math.atan2(-b, a);

    return createLineElement(x, y, c, alpha);
}



function Update() {
    var sources = [];

    for (var i = 0; i < elElements.length; i++)
        if (elElements[i] && !elElements[i].src)
            if (elElements[i].type == "source")
                sources.push(elElements[i]);

    for (var si = 0; si < sources.length; si++) {

        let s = sources[si];

        let r = false;
        let c = false;
        let l = false;

        let v = [];
        let a = [];

        for (var i = 0; i < elElements.length; i++) {
            if (!elElements[i])
                continue;

            if (!elElements[i].src && elElements[i].parentSource && elElements[i].parentSource.id === s.id) {
                if (elElements[i].type == "otpornik")
                    r = elElements[i];
                if (elElements[i].type == "kondenzator")
                    c = elElements[i];
                if (elElements[i].type == "zavojnica")
                    l = elElements[i];
                if (elElements[i].type == "ametar")
                    a.push(elElements[i]);
                if (elElements[i].type == "vmetar")
                    v.push(elElements[i]);
            }
        }


        if (!s)
            return;

        var Z, I;
        var omega = 2 * Math.PI * s.frek;
        if (r && c && !l) {
            Z = Math.sqrt(Math.pow(r.otp, 2) + Math.pow(1 / (omega * c.cap * Math.pow(10, -6)), 2));
        } else if (r && l && !c) {
            Z = Math.sqrt(Math.pow(r.otp, 2) + Math.pow(omega * l.l * Math.pow(10, -3), 2));
        }
        else if (r && l && c) {
            Z = Math.sqrt(Math.pow(r.otp, 2) + Math.pow(Math.abs(omega * l.l * Math.pow(10, -3) - (1 / (omega * c.cap * Math.pow(10, -6)))), 2));
        } else return;

        console.log(Z);
        I = s.voltage / Z;



        for (var i = 0; i < a.length; i++) {
            a[i].setA(Z, I, omega, s.voltage);
        }

        for (var i = 0; i < v.length; i++) {
            v[i].setV(Z, I, omega, s.voltage);
        }
    }
}

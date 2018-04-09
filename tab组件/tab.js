function Tab(ct) {
    this.ct = ct;
    this.init();
    this.bindE();
}
Tab.prototype.init = function () {
    this.tabs = this.ct.querySelectorAll('.title>.lit_tit')
    this.conts = this.ct.querySelectorAll('.nav>.lit_nav')
}

Tab.prototype.bindE = function () {
    var context = this;
    this.tabs.forEach(function (item) {
        item.onclick = function (e) {
            var target = e.target;
            var index = [].indexOf.call(context.tabs, target)
            context.tabs.forEach(function (li) {
                li.classList.remove('on')
            })
            target.classList.add('on')

            context.conts.forEach(function (cont) {
                cont.classList.remove('show')
            })
            context.conts[index].classList.add('show')
        }
    })
}

var tab1 = new Tab(document.querySelectorAll('.box')[0])
var tab2 = new Tab(document.querySelectorAll('.box')[1])
var tab3 = new Tab(document.querySelectorAll('.box')[2])

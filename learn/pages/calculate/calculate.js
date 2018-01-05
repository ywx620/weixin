Page({

  /**
   * 页面的初始数据
   */
  data: {
    right: "0",
    wrong: "0"
  },
  rnum: 0,
  wnum: 0,
  num1: "",
  num2: "",
  num3: "",
  num4: "",
  sign: "",
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setQuestion();
  },
  onclick: function (e) {
    var obj = e.currentTarget;
    var id = obj.id;
    if (id < 10) {
      this.num4 += id;
      this.setData({ dataPutIn: this.num4 })
    } else if (id == 10) {
      var boo = this.num3 == parseInt(this.num4);
      this.clear();
      if (boo) {
        this.setData({ right: ++this.rnum });
        this.setQuestion();
      } else {
        this.setData({ wrong: ++this.wnum });
      }
    } else if (id == 11) {
      this.clear();
    }
  },
  clear: function () {
    this.num4 = "";
    this.setData({ dataPutIn: this.num4 })
  },
  setQuestion: function () {
    this.num1 = Math.ceil(Math.random() * 9);
    this.num2 = Math.ceil(Math.random() * 9);
    this.sign = Math.random() > 0.5 ? "x" : "÷"
    if (this.sign == "x") {
      this.num3 = this.num1 * this.num2;
    } else {
      var temp = this.num1 * this.num2;
      this.num1 = temp;
      this.num3 = this.num1 / this.num2;
    }
    this.setData({ dataPutOut: this.num1 + " " + this.sign + " " + this.num2 + " =" })
  }
})
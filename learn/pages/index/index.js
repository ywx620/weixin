//index.js  
//获取应用实例  
var app = getApp()
Page({
  data: {
    dataRight: "答对：",
    dataWrong: "答错：",
    dataQuestion: "题目：",
    dataAnswer: "答案：",
    currentTab: 0,
    src: 'http://xmdx.sc.chinaz.com/Files/DownLoad/sound1/201703/8400.mp3',
  },
  barIndex: 0,
  rnum: 0,
  wnum: 0,
  num1: "",
  num2: "",
  num3: "",
  num4: "",
  sign: "",
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio');
    this.reset();
  },
  playsound:function(){
    wx.vibrateShort();
    this.audioCtx.seek(0);
    this.audioCtx.play();
  },
  clickBtn: function (e) {
    this.playsound()
    var obj = e.currentTarget;
    var id = obj.id;
    //console.log(id)
    if (id < 10) {
      this.num4 += id;
      this.setData({ dataAnswer: "答案：" + this.num4 })
    } else if (id == 10) {
      var boo = this.num3 == parseInt(this.num4);
      this.clear();
      if (boo) {
        this.setData({ dataRight: "答对：" + (++this.rnum) });
        this.setQuestion();
      } else {
        this.setData({ dataWrong: "答错：" + (++this.wnum) });
      }
    } else if (id == 11) {
      this.clear();
    }
  },
  clear: function () {
    this.num4 = "";
    this.setData({ dataAnswer: "答案：" + this.num4 })
  },
  setQuestion: function () {
    this.num1 = Math.ceil(Math.random() * 9);
    this.num2 = Math.ceil(Math.random() * 9);
    if (this.barIndex == 0) this.sign = "x";
    else if (this.barIndex == 1) this.sign = "÷";
    else if (this.barIndex == 2) this.sign = Math.random() > 0.5 ? "x" : "÷";
    if (this.sign == "x") {
      this.num3 = this.num1 * this.num2;
    } else {
      var temp = this.num1 * this.num2;
      this.num1 = temp;
      this.num3 = this.num1 / this.num2;
    }
    this.setData({ dataQuestion: "题目：" + this.num1 + " " + this.sign + " " + this.num2 + " =" })
  },
  reset: function () {
    this.clear();
    this.setQuestion();
    this.setData({ dataRight: "答对：0" });
    this.setData({ dataWrong: "答错：0" });
    this.rnum = this.wnum = 0;
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if (e.target.dataset.current == 3) {
        wx.navigateTo({
          url: '../calculate/calculate',
        });
      } else {
        this.barIndex = e.target.dataset.current;
        this.reset();
      }
      this.setData({ currentTab: this.barIndex });
    }
  }
})  
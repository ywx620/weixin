//index.js  
//获取应用实例  
var app = getApp()
Page({
  data: {
    dataTime:"时间：",
    dataRight: "答对：",
    dataTotal: "总题数：",
    dataQuestion: "题目：",
    dataAnswer: "答案：",
    src: 'http://xmdx.sc.chinaz.com/Files/DownLoad/sound1/201703/8400.mp3',
  },
  rnum: 0,
  wnum: 0,
  num1: "",
  num2: "",
  num3: "",
  num4: "",
  sign: "",
  totalQuestion:100,
  totalTime:180,
  timer:0,
  onShow(){
    this.audioCtx = wx.createAudioContext('myAudio');
    this.reset();
  },
  onUnload: function () {
    clearTimeout(this.timer);
  },
  onHide: function () {
    clearTimeout(this.timer);
  },
  countdown: function() {
    var that=this;
    that.timer = setTimeout(function () {
      that.totalTime--;
      if (that.totalTime>=0){
        that.countdown();
      }else{
        that.overQuestion();
      }
    }, 1000);
    var minute = this.numberFormat(Math.floor(this.totalTime / 60));
    var second = this.numberFormat(this.totalTime % 60);
    this.setData({ dataTime: "时间：" + minute + ":" + second});
  },
  numberFormat:function(num){
    if(num>=10)	return num;
    else				return "0"+ num;
  },
  playsound: function () {
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
      }
      this.updateTotalQuestion();
    } else if (id == 11) {
      this.clear();
    }
  },
  clear: function () {
    this.num4 = "";
    this.setData({ dataAnswer: "答案：" + this.num4 })
  },
  updateTotalQuestion:function(){
    this.setData({ dataTotal: "总题数："+this.totalQuestion});
    if(this.totalQuestion==0){
      this.overQuestion();
    }else{
      this.totalQuestion--;
    }
  },
  overQuestion: function () {
    var that=this;
    clearTimeout(this.timer);
    wx.showModal({
      title: '成绩',
      content: '本次测试成绩'+this.rnum+"分",
      cancelText:"再来一次",
      confirmText:"返回练习",
      success: function (res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          wx.navigateTo({ url: '../index/index',});
        } else if (res.cancel) {
          //console.log('用户点击取消')
          that.reset();
        }
      }
    })
  },
  setQuestion: function () {
    this.num1 = Math.ceil(Math.random() * 9);
    this.num2 = Math.ceil(Math.random() * 9);
    this.sign = Math.random() > 0.5 ? "x" : "÷";
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
    this.rnum = this.wnum = 0;
    this.totalTime=180;
    this.totalQuestion=100;
    this.setQuestion();
    this.setData({ dataRight: "答对：0" });
    this.setData({ dataTotal: "总题数：0" });
    this.updateTotalQuestion();
    this.countdown();
  }
})  
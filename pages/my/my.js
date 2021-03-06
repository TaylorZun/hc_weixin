
Page({


data: {
  memberList: [
    {
      iamges: "/images/datarecordicon/shoudongshuru.png",
      cont: "",
      discount: "7.5折",
      hiddena: true,
      id: "0",
      invalidActivty: [
        {
          price: "2.98元",
          oldPrice: "3元",
          validType: "周卡",
          validTime: '7天有效'
        },
        {
          price: "18.98元",
          oldPrice: "25元",
          validType: "月卡",
          validTime: '30天有效'
        },
      ]
    },
    {
      iamges: "/images/datarecordicon/shoudongshuru.png",      
      cont: "会员",
      discount: "7折",
      hiddena: true,
      id: "1",
      invalidActivty: [
        {
          price: "2.98元",
          oldPrice: "3元",
          validType: "周卡",
          validTime: '7天有效'
        },
        {
          price: "18.98元",
          oldPrice: "25元",
          validType: "月卡",
          validTime: '30天有效'
        },
      ]
    },
    {
      iamges: "/images/datarecordicon/shoudongshuru.png",      
      cont: "会员",
      discount: "8折",
      hiddena: true,
      id: "2",
      invalidActivty: [
        {
          price: "2.98元",
          oldPrice: "3元",
          validType: "周卡",
          validTime: '7天有效'
        },
        {
          price: "18.98元",
          oldPrice: "25元",
          validType: "月卡",
          validTime: '30天有效'
        },
      ]
    },
    {
      iamges: "/images/datarecordicon/shoudongshuru.png", 
      cont: "黄金会员",
      discount: "8折",
      hiddena: true,
      id: "3",
      invalidActivty: [
        {
          price: "2.98元",
          oldPrice: "3元",
          validType: "周卡",
          validTime: '7天有效'
        },
        {
          price: "18.98元",
          oldPrice: "25元",
          validType: "月卡",
          validTime: '30天有效'
        },
      ]
    },
  ]
},
isOpen: function(e) {
  var that = this;
  var idx = e.currentTarget.dataset.index;
  //console.log(idx);
  var memberList = that.data.memberList;
 // console.log(memberList);
  for (let i = 0; i < memberList.length; i++) {
    if (idx == i) {
      memberList[i].hidden = !memberList[i].hidden;
    } else {
      memberList[i].hidden = true;
    }
  }
  this.setData({ memberList: memberList });
  return true;
},
})
const app= getApp()
Page({
    data: {
        id:'',
        name:'',
        sex:'',
        email:'',
        phone:'',
        department:'',
        status:''
    },
    onLoad: function (option) {
        //请求api获取数据
        const {status,data} = option;
        
        
        if (status==='ok'){
            const {id,name,sex,email,phone,department} = JSON.parse(data);
            this.setData({
                id,name,sex,email,phone,department,status
            })
        }
        if (status==='error'){
            this.setData({status})
        }
        if (status==='none'){
            this.setData({status})
        }
        this.setData({userInfo:app.globalData.userInfo})
    }
})
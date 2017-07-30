Page({
    data: {
        status: 'ok',
        message:''
    },
    onLoad: function (option) {
        this.setData({status: option.status,message:option.message})
    }
})
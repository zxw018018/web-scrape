const axios = require('axios');
const cheerio = require('cheerio');

const myCookie = '';
const requestToken = '-1082287759';
const _rtk = '8b3e97cb';
const userId = '398230446';

function deleteRenrenZhuangtai(){
    return axios({
        method: 'get',
        url: 'http://status.renren.com/GetSomeomeDoingList.do?userId=398230446&curpage=0&_jcb=jQuery111105059852899692123_1541360903493&requestToken=-1082287759&_rtk=8b3e97cb&_=1541360903494',
        params: {
            userId: userId, 
            curpage: '0', 
            _jcb: 'jQuery111105059852899692123_1541360903493', 
            requestToken: requestToken,
            _rtk: _rtk,
            _: '1541360903494'
        },
        headers: {Cookie: myCookie}
      }).then(function(res) {
          const statusData = res.data.split('likeMap":')[1].split(',"headurl')[0];
          const statusIds = Object.keys(JSON.parse(statusData)).map(status => status.split('status_')[1]);
          //console.log(statusIds);
          statusIds.forEach(function(id) {
            axios({
                method: 'post',
                url: 'http://status.renren.com/doing/deleteDoing.do',
                params: {
                    id: id,
                    requestToken: requestToken,
                    _rtk: _rtk
                },
                headers: {Cookie: myCookie}
            }).then(function(res) {
                console.log(res.data);
            })
          }) 
      });
}

function deleteRenrenFenxiang(){
    return axios({
        method: 'get',
        url: 'http://share.renren.com/share/v7/398230446',
        headers: {Cookie: myCookie}
      }).then(function(res) {
        const $ = cheerio.load(res.data);
        const shareIds = [];

        $('.ugc-left-list').children().each(function(i, elem) {
            shareIds[i] = $(this).attr('id').split('share_')[1];
        });

        //console.log(shareIds);
        shareIds.forEach(function(id) {
            axios({
                method: 'post',
                url: 'http://share.renren.com/share/EditShare.do',
                params: {
                    action: 'del',
                    sid: id,
                    type: userId,
                    requestToken: requestToken,
                    _rtk: _rtk
                },
                headers: {Cookie: myCookie}
            }).then(function(res) {
                console.log(res.data);
            })

        })
        
          
          
         
      });
}

setInterval(deleteRenrenFenxiang, 2000);

setInterval(deleteRenrenZhuangtai, 2000);




function conditionInit() {
    $.ajax({
        type : "GET",
        url : urlPath + "/files/conditionInit?noCache=" + new Date().getTime(),
        contentType : "application/json",
        dataType : "json",
        success : function(data) {

            var services=data.services;
            for (var i = 0; i < services.length; i++) {
                if(services[i].printNum!=null){
                    $("#service").append("<option value="+services[i].servNo+">" + services[i].servName+"</option>");
                }				}
            var departments=data.departments;
            for (var i = 0; i < departments.length; i++) {
                $("#print_dept").append("<option value="+departments[i].id+">" + departments[i].name+"</option>");
                $("#save_set").append("<option value="+departments[i].id+">" + departments[i].name+"</option>");

            }
        },
        error : function(data) {

        }
    });
}

function timeFormatter(cellvalue, options, rowObject) {
    var unixTimestamp = new Date(cellvalue*1000) ;
    return unixTimestamp.toLocaleString();
}
Date.prototype.toLocaleString = function() {
    var currMonth = (this.getMonth() + 1) < 10 ? '0'+(this.getMonth() + 1):(this.getMonth() + 1);
    var currDate = this.getDate() < 10 ? '0'+this.getDate():this.getDate();
    var currHours = this.getHours() < 10 ? '0'+this.getHours():this.getHours();
    var currMinutes = this.getMinutes() < 10 ? '0'+this.getMinutes():this.getMinutes();
    var currSeconds = this.getSeconds() < 10 ? '0'+this.getSeconds():this.getSeconds();

    return this.getFullYear() + "-" + currMonth + "-" + currDate ;
};

function doFresh(){
    $("#doc_table").jqGrid('setGridParam',{
        postData:{}
    }).trigger("reloadGrid");
}
function show(id){
    s = window.parent.layer.open({
        title:'查看文档',
        type: 2,
        content: '../file/show.html?id='+id+'&noCache='+new Date().getTime(),
        area: ['90%', '90%'],
        btn: ['取消'],
        maxmin: false

    });
}
function search(){
    //解决postData参数值累加问题，首先清空postData
    var postData = $('#doc_table').jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    var formData = getFormData("search_form");
    var data={};
    if(formData.service!=""){
        data['service']=formData.service;
    }
    if(formData.doc_title!=""){
        data['doc_title']=formData.doc_title;
    }
    if(formData.create_users!=""){
        data['create_users']=formData.create_users;
    }
    if(formData.status!=""){
        data['status']=formData.status;
    }
    if(formData.save_set!=""){
        data['save_set']=formData.save_set;
    }
    if(formData.print_dept!=""){
        data['print_dept']=formData.print_dept;
    }
    if(formData.doc_content!=""){
        data['doc_content']=formData.doc_content;
    }
    if(formData.startTime!=""){
        data['startTime']=new Date(Date.parse(formData.startTime.replace(/-/g,"/"))).getTime()/1000;
        // data['startTime']=new Date(formData.startTime).getTime()/1000;
    }
    if(formData.endTime!=""){
        data['endTime']=new Date(Date.parse(formData.endTime.replace(/-/g,"/"))).getTime()/1000 + nextDayTime;
        // data['endTime']=new Date(formData.endTime).getTime()/1000;
    }

    data['lowerLevel']=lowerLevel;
    //auditLevel: 1   draw: 3    historyNum: 0   isDepartment: true   isManage: true
    $("#doc_table").jqGrid('setGridParam', {
        page : 1,
        postData :data
    }).trigger("reloadGrid");
}
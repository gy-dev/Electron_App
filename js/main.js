// JavaScript Document
var gXmlObj;
var gNums = 0;//当前配置通道总数
var gAnalogNums = 0;//当前配置模拟通道总数
var gLgObj;//界面语言

function XmlParsing(xmlPath){
	var xmlObj = null;
	$.ajax({
    	url: xmlPath,
    	contentType: "text/xml",
    	timeout:3000,
    	dataType: 'xml',
    	async:false,
    	success: function (data) {
    		
    		xmlObj = $(data);
    	},
    	error:function(e){
    		xmlObj = null;
    		alert('Fail to read the configuration file!');
    	}
    })
    
    return xmlObj;
}

function lan(){
	DeviceType_Text.innerHTML = gLgObj.get("IDS_DeviceType");
	HardVersion_Text.innerHTML = gLgObj.get("IDS_HardVersion");
	Mode_Text.innerHTML = gLgObj.get("IDS_Mode");
	Status_Text.innerHTML = gLgObj.get("IDS_Status");
	Chn_Text.innerHTML = gLgObj.get("IDS_Chn");
	ChannelType_Text.innerHTML = gLgObj.get("IDS_ChnType");
	Intelligent_Text.innerHTML = gLgObj.get("IDS_Intelligent");
	CameraType_Text.innerHTML = gLgObj.get("IDS_CameraType");
	res_Text.innerHTML = gLgObj.get("IDS_res");
	fps_Text.innerHTML = gLgObj.get("IDS_fps");
	bit_Text.innerHTML = gLgObj.get("IDS_bit");
	preview_Text.innerHTML = gLgObj.get("IDS_Preview");
	playback_Text.innerHTML = gLgObj.get("IDS_Playback");
	$("#playback_Text").attr('title', gLgObj.get("IDS_Playback"));
	pre_Text.innerHTML = gLgObj.get("IDS_Preview");
	performance_Text.innerHTML = gLgObj.get("IDS_Performance");
	memory_Text.innerHTML = gLgObj.get("IDS_Memory");
	bandwidth_Text.innerHTML = gLgObj.get("IDS_Bandwidth");
	totalBandwidth_Text.innerHTML = gLgObj.get("IDS_TotalBandwidth");
	pb_Text.innerHTML = gLgObj.get("IDS_Playback");
	pbPerformance_Text.innerHTML = gLgObj.get("IDS_Performance");
	pbMemory_Text.innerHTML = gLgObj.get("IDS_Memory");
	
	lg_Text.innerHTML = gLgObj.get("IDS_Language");
	
	document.getElementById("lgSel").options[0].innerHTML = gLgObj.get("IDS_ENU");//
	document.getElementById("lgSel").options[1].innerHTML = gLgObj.get("IDS_RUS");//
	
	$('.mainStreamText').each(function(){
		$(this)[0].innerHTML = gLgObj.get("IDS_Mainstream");
	})
	
	$('.subStreamText').each(function(){
		$(this)[0].innerHTML = gLgObj.get("IDS_Substream");
	})
	
	$('.mobStreamText').each(function(){
		$(this)[0].innerHTML = gLgObj.get("IDS_Mobilestream");
	})
	
	if($("#Mode").find("option:selected").text() == 'DVR'){
		$('.channelTypeSelect').each(function(){
			$(this)[0].options[0].innerHTML = gLgObj.get("IDS_Analog");
			$(this)[0].options[1].innerHTML = gLgObj.get("IDS_None");
		})
	}else if($("#Mode").find("option:selected").text() == 'XVR'){
		$('.channelTypeSelect').each(function(){
			$(this)[0].options[0].innerHTML = gLgObj.get("IDS_Analog");
			$(this)[0].options[1].innerHTML = gLgObj.get("IDS_Digital");
			$(this)[0].options[2].innerHTML = gLgObj.get("IDS_None");
		})
	}
}

function LoadLanguage(lag){
	
	$.ajax({
    	url: "lg/" + lag + ".xml",
    	contentType: "text/xml",
    	timeout:3000,
    	async:false,
    	dataType: 'xml',
    	success: function (data) {
    		gLgObj.refresh();
    		$(data).find("StringTable").find("string").each(function() {
				
				gLgObj.set($(this).attr("id"), $(this).text());
			});
	        
		        
		    lan();
    		//xmlObj = $(data);
    	},
    	error:function(e){
    		//xmlObj = null;
    		alert('Fail to read the configuration file!');
    	}
    })
	
}

function HashmapCom() {
    Init(this);	//constructor
    function Init(p) {
        p.map = new Hashmap();
    }

    function Hashmap() {
        this.length = 0;
        this.set = function (key, value) {
            this[key] = value;
            this[this.length] = key;
            this.length++;
        }

        this.up = function (key, value) {
            (typeof this[key] != 'undefined') ? (this[key] = value) : alert("hashmap: key " + key + " undefined");
        }

        this.get = function (key) {
            return ((typeof this[key] == 'undefined') ? ("key:"+key+" undefined") : this[key]);
        }
    }

    this.refresh = function () {
        this.map.length = 0;
    }

    this.clear = function () {
        delete this.map;
    }

    this.length = function () {
        return (this.map.length);
    }

    this.set = function (key, value) {
        this.map.set(key, value);
    }

    this.get = function (key) {
        return (this.map.get(key));
    }

    this.up = function (key, value) {
        this.map.up(key, value);
    }
}

function InitWeb() { //Site initialization
	//Body attachEvent
	var bodyobj = document.getElementsByTagName("body")[0];
//	bodyobj.setAttribute("onunload", "closewnd()");
//	bodyobj.setAttribute("onselectstart", "return fbd();");
	bodyobj.setAttribute("onload", "window.onresize();");
	// window.onbeforeunload = function(){var languageTarget = gVar.lg; setCookieLan(languageTarget);}
	
	gLgObj = new HashmapCom(); 
	
	LoadLanguage('ENU');
	//lan();
	// 自适应主页面大小
	$(window).resize(function () {
		$("#channelsList").css("height",(window.innerHeight-120)+'px');
	    
	})

	return true;

}

function createIntelligentFlag(chnNum){
	var strHtml = '';
	
	strHtml += '<div style="margin-left:25px;">';
	strHtml += '<input type="checkbox" class="floatLeft" id="intelligent_'+chnNum+'"/>';
	strHtml += '</div>';

	return strHtml;
}

function createRes(chnNum, type, text){
	var strHtml = '';
	if(type == 0){//模拟通道
		//strHtml += '<div id="res_'+chnNum+'_div" class="floatLeft">';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText mainStreamText">'+gLgObj.get("IDS_Mainstream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="res_main_'+chnNum+'" class="floatLeft resSelectClass">';
		var resList = gXmlObj.find('AnalogChnAttr').find('MainStream')
			.find('EncodeResList').find('Res_'+text).text().split(',');
		$.each(resList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		});
		strHtml += '</select>';
		strHtml += '</div>'
		strHtml += '</div>'
	}else if(type == 1){//数字通道
		//strHtml += '<div id="res_'+chnNum+'_div" class="floatLeft">';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText mainStreamText">'+gLgObj.get("IDS_Mainstream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="res_main_'+chnNum+'" class="floatLeft resSelectClass">';
		var resList = gXmlObj.find('IpcChnAttr').find('MainStream')
			.find('EncodeResList').text().split(',');
		$.each(resList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		});
		strHtml += '</select>';
		strHtml += '</div>'
		strHtml += '</div>'
		
		strHtml += '<div class="clearBoth"></div>';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText subStreamText">'+gLgObj.get("IDS_Substream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="res_sub_'+chnNum+'" class="floatLeft resSelectClass">';
		var subResList = gXmlObj.find('IpcChnAttr').find('SubStream')
			.find('EncodeResList').text().split(',');
		$.each(subResList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		});
		strHtml += '</select>';
		strHtml += '</div>'
		strHtml += '</div>'
		
		strHtml += '<div class="clearBoth"></div>';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText mobStreamText">'+gLgObj.get("IDS_Mobilestream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="res_mob_'+chnNum+'" class="floatLeft resSelectClass">';
		var mobResList = gXmlObj.find('IpcChnAttr').find('MobileStream')
			.find('EncodeResList').text().split(',');
		$.each(mobResList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		});
		strHtml += '</select>';
		strHtml += '</div>'
		strHtml += '</div>'
	}
	
	return strHtml;
}

function createFps(chnNum, type, text, intelligentFlag){
	var strHtml = '';
	if(type == 0){//模拟通道
		//strHtml += '<div id="fps_'+chnNum+'_div" class="floatLeft">';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText mainStreamText">'+gLgObj.get("IDS_Mainstream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="fps_main_'+chnNum+'" class="floatLeft fpsSelectClass">';
		var maxFps = 0;
		if(intelligentFlag){
			maxFps = gXmlObj.find('AnalogChnAttr').find('MainStream')
				.find('MaxIntelligentFrame').find('Fps_'+text).text()*1;
		}else{
			if($("#Mode").find("option:selected").text() == 'DVR'){
				if(gXmlObj.find('AnalogChnAttr').find('MainStream')
					.find('MaxDVRFrame').length != 0){
					maxFps = gXmlObj.find('AnalogChnAttr').find('MainStream')
						.find('MaxDVRFrame').find('Fps_'+text).text()*1;
				}else{
					maxFps = gXmlObj.find('AnalogChnAttr').find('MainStream')
					.find('MaxEncodeFrame').find('Fps_'+text).text()*1;
				}
				
			}else{
				maxFps = gXmlObj.find('AnalogChnAttr').find('MainStream')
					.find('MaxEncodeFrame').find('Fps_'+text).text()*1;
			}
		}
		
		for (var i=1;i<maxFps+1;i++) {
			if (i==maxFps) {
				strHtml += '<option selected="selected" value="'+i+'">'+i+'</option>';
			} else{
				strHtml += '<option value="'+i+'">'+i+'</option>';
			}
		}
		strHtml += '</select>';
		strHtml += '</div>';
		strHtml += '</div>';
	}else if(type == 1){//数字通道
		//strHtml += '<div id="fps_'+chnNum+'_div" class="floatLeft">';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText mainStreamText">'+gLgObj.get("IDS_Mainstream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="fps_main_'+chnNum+'" class="floatLeft fpsSelectClass">';
		var maxFps = gXmlObj.find('IpcChnAttr').find('MainStream')
			.find('MaxEncodeFrame').text()*1;
		for (var i=1;i<maxFps+1;i++) {
			if (i==maxFps) {
				strHtml += '<option selected="selected" value="'+i+'">'+i+'</option>';
			} else{
				strHtml += '<option value="'+i+'">'+i+'</option>';
			}
		}
		strHtml += '</select>';
		strHtml += '</div>'
		strHtml += '</div>'
		
		strHtml += '<div class="clearBoth"></div>';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText subStreamText">'+gLgObj.get("IDS_Substream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="fps_sub_'+chnNum+'" class="floatLeft fpsSelectClass">';
		var subMaxFps = gXmlObj.find('IpcChnAttr').find('SubStream')
			.find('MaxEncodeFrame').text()*1;
		for (var i=1;i<subMaxFps+1;i++) {
			if (i==maxFps) {
				strHtml += '<option selected="selected" value="'+i+'">'+i+'</option>';
			} else{
				strHtml += '<option value="'+i+'">'+i+'</option>';
			}
		}
		strHtml += '</select>';
		strHtml += '</div>'
		strHtml += '</div>'
		
		strHtml += '<div class="clearBoth"></div>';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText mobStreamText">'+gLgObj.get("IDS_Mobilestream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="fps_mob_'+chnNum+'" class="floatLeft fpsSelectClass">';
		var mobMaxFps = gXmlObj.find('IpcChnAttr').find('MobileStream')
			.find('MaxEncodeFrame').text()*1;
		for (var i=1;i<mobMaxFps+1;i++) {
			if (i==maxFps) {
				strHtml += '<option selected="selected" value="'+i+'">'+i+'</option>';
			} else{
				strHtml += '<option value="'+i+'">'+i+'</option>';
			}
		}
		strHtml += '</select>';
		strHtml += '</div>'
		strHtml += '</div>'
	}
	
	return strHtml;
}

function createBit(chnNum, type, resText){
	var strHtml = '';
	if(type == 0){//模拟通道
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText mainStreamText">'+gLgObj.get("IDS_Mainstream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="bit_main_'+chnNum+'" class="floatLeft bitSelectClass">';
		var bitList = gXmlObj.find('AnalogChnAttr').find('MainStream')
			.find('EncodeBitrateList').find('Bit_'+resText).text().split(',');
		$.each(bitList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		});
		strHtml += '</select>';
		strHtml += '</div>';
		strHtml += '</div>';
	}else if(type == 1){//数字通道
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText mainStreamText">'+gLgObj.get("IDS_Mainstream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="bit_main_'+chnNum+'" class="floatLeft bitSelectClass">';
		var bitList = gXmlObj.find('IpcChnAttr').find('MainStream')
			.find('EncodeBitrateList').text().split(',');
		$.each(bitList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		});
		strHtml += '</select>';
		strHtml += '</div>'
		strHtml += '</div>'
		
		strHtml += '<div class="clearBoth"></div>';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText subStreamText">'+gLgObj.get("IDS_Substream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="bit_sub_'+chnNum+'" class="floatLeft bitSelectClass">';
		var subBitList = gXmlObj.find('IpcChnAttr').find('SubStream')
			.find('EncodeBitrateList').text().split(',');
		$.each(subBitList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		});
		strHtml += '</select>';
		strHtml += '</div>'
		strHtml += '</div>'
		
		strHtml += '<div class="clearBoth"></div>';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft resText mobStreamText">'+gLgObj.get("IDS_Mobilestream")+'</div>';
		strHtml += '<div>';
		strHtml += '<select id="bit_mob_'+chnNum+'" class="floatLeft bitSelectClass">';
		var mobBitList = gXmlObj.find('IpcChnAttr').find('MobileStream')
			.find('EncodeBitrateList').text().split(',');
		$.each(mobBitList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		});
		strHtml += '</select>';
		strHtml += '</div>'
		strHtml += '</div>'
	}
	
	return strHtml;
}

function createPreviewFlag(chnNum, type){
	var strHtml = '';
	
	if(type == 0){//模拟通道
	}else if(type == 1){//数字通道
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft previewText mainStreamText">'+gLgObj.get("IDS_Mainstream")+'</div>';
		strHtml += '<div>';
		strHtml += '<input type="checkbox" class="floatLeft" id="preview_main_'+chnNum+'"/>';
		strHtml += '</div>';
		strHtml += '</div>';
		
		strHtml += '<div class="clearBoth"></div>';
		
		strHtml += '<div style="margin-left:10px;">';
		strHtml += '<div class="floatLeft previewText subStreamText">'+gLgObj.get("IDS_Substream")+'</div>';
		strHtml += '<div>';
		strHtml += '<input type="checkbox" class="floatLeft" id="preview_sub_'+chnNum+'"/>';
		strHtml += '</div>';
		strHtml += '</div>';
	}
	
	return strHtml;
}

function createPlaybackFlag(chnNum){
	var strHtml = '';

	strHtml += '<div style="margin-left:25px;">';
	strHtml += '<input type="checkbox" class="floatLeft" id="playback_'+chnNum+'"/>';
	strHtml += '</div>';

	return strHtml;
}

function createChannelsHtml(){
	var strHtml = '';
	var chnNum = 0;//通道计数
	gNums = gXmlObj.find('ChannelCount').text()*1;//通道总数
	gAnalogNums = gXmlObj.find('AnalogChnCnt').text()*1;//模拟通道数
	if($("#Mode").find("option:selected").text() == 'DVR'){
		gNums = gAnalogNums;
	}

	//模拟通道
	var strAnalogChn = '';
	for (var i=0;i<gAnalogNums;i++) {
		strAnalogChn += '<div style="margin-top:10px;">';
		
		//通道号
		strAnalogChn += '<div id="chn_'+chnNum+'_div" class="floatLeft channel">CH'+(i+1)+'</div>';
		
		//通道类型
		if($("#Mode").find("option:selected").text() == 'DVR'){
			strAnalogChn += '<div id="chntype_'+chnNum+'_div" class="floatLeft" style="width:100px;">'+
				'<select id="chntype_'+chnNum+'" class="channelTypeSelect"><option value="0">'+
				gLgObj.get('IDS_Analog')+'</option>'+'<option value="2">'+gLgObj.get('IDS_None')+
				'</option></select>'+
				'</div>';
		}else if($("#Mode").find("option:selected").text() == 'XVR'){
			strAnalogChn += '<div id="chntype_'+chnNum+'_div" class="floatLeft" style="width:100px;">'+
				'<select id="chntype_'+chnNum+'" class="channelTypeSelect"><option value="0">'+
				gLgObj.get('IDS_Analog')+'</option>'+'<option value="1">'+
				gLgObj.get('IDS_Digital')+'</option><option value="2">'+
				gLgObj.get('IDS_None')+'</option></select>'+
	            '</div>';
		}
		if($("#Status").find("option:selected").text().toLowerCase().indexOf('intelligent') != -1){
			//智能通道
			strAnalogChn += '<div id="intelligent_'+chnNum+'_div" class="floatLeft intelligentDiv">';
			strAnalogChn += createIntelligentFlag(chnNum);
			strAnalogChn += '</div>';
		}
		
		
		//枪机类型
		strAnalogChn += '<div id="cameratype_'+chnNum+'_div" class="floatLeft cameraType">';
		strAnalogChn += '<select id="cameratype_'+chnNum+'" class="cameratypeSelect">';
		var cameraTypeList = gXmlObj.find('CameraTypeList').text().split(',');
		$.each(cameraTypeList, function(key, value) {
			strAnalogChn += '<option value="'+key+'">'+value+'</option>';
		});
		strAnalogChn += '</select>';
		strAnalogChn += '</div>';
		
		//分辨率
		strAnalogChn += '<div id="res_'+chnNum+'_div" class="floatLeft resDiv">';
		strAnalogChn += createRes(chnNum, 0, gXmlObj.find('CameraTypeList').text().split(',')[0]);
		strAnalogChn += '</div>';
		
		//帧率
		strAnalogChn += '<div id="fps_'+chnNum+'_div" class="floatLeft fpsDiv">';
		strAnalogChn += createFps(chnNum, 0, gXmlObj.find('CameraTypeList').text().split(',')[0], 0);
		strAnalogChn += '</div>';
		
		//码率
		strAnalogChn += '<div id="bit_'+chnNum+'_div" class="floatLeft bitDiv">';
		var res = gXmlObj.find('AnalogChnAttr').find('MainStream')
			.find('EncodeResList').find('Res_'+gXmlObj.find('CameraTypeList').text().split(',')[0]).text().split(',')[0];
		strAnalogChn += createBit(chnNum, 0, res);
		strAnalogChn += '</div>';
		
		//是否预览
		strAnalogChn += '<div id="preview_'+chnNum+'_div" class="floatLeft previewDiv blankDiv"></div>';
		
		//是否回放
		strAnalogChn += '<div id="playback_'+chnNum+'_div" class="floatLeft playbackDiv">';
		strAnalogChn += createPlaybackFlag(chnNum);
		strAnalogChn += '</div>';
		
		strAnalogChn += '</div>';
		strAnalogChn += '<div class="clearBoth"></div>';
		chnNum++;
	}
	
	strHtml += strAnalogChn;
	
	//数字通道
	var strIPCChn = '';
	for (var i=0;i<(gNums-gAnalogNums);i++) {
		strIPCChn += '<div style="margin-top:10px;">';
		
		//通道号
		strIPCChn += '<div id="chn_'+chnNum+'_'+'" class="floatLeft channel">IP CH'+(i+1)+'</div>';
		
		//通道类型
		strIPCChn += '<div id="chntype_'+chnNum+'_div" class="floatLeft" style="width:100px;">'+
			'<select id="chntype_'+chnNum+
			'" class="channelTypeSelect"><option value="1">'+gLgObj.get('IDS_Digital')+
			'</option><option value="2">'+gLgObj.get('IDS_None')+'</option></select>'+
            '</div>';
            
        if($("#Status").find("option:selected").text().toLowerCase().indexOf('intelligent') != -1){
	        //智能通道
			strIPCChn += '<div id="intelligent_'+chnNum+'_div" class="floatLeft intelligentDiv blankDiv">';
			strIPCChn += '</div>';
		}
		
		//枪机类型
		strIPCChn += '<div id="cameratype_'+chnNum+'_div" class="floatLeft cameraType blankDiv">';
		strIPCChn += '</div>';
		
		//分辨率
		strIPCChn += '<div id="res_'+chnNum+'_div" class="floatLeft resDiv">';
		strIPCChn += createRes(chnNum, 1, ''); 
		strIPCChn += '</div>';
		
		//帧率
		strIPCChn += '<div id="fps_'+chnNum+'_div" class="floatLeft fpsDiv">';
		strIPCChn += createFps(chnNum, 1, ''); 
		strIPCChn += '</div>';
		
		//码率
		strIPCChn += '<div id="bit_'+chnNum+'_div" class="floatLeft bitDiv">';
		strIPCChn += createBit(chnNum, 1, '');
		strIPCChn += '</div>';
		
		//是否预览
		strIPCChn += '<div id="preview_'+chnNum+'_div" class="floatLeft previewDiv">';
		strIPCChn += createPreviewFlag(chnNum, 1);
		strIPCChn += '</div>';
		
		//是否回放
		strIPCChn += '<div id="playback_'+chnNum+'_div" class="floatLeft playbackDiv">';
		strIPCChn += createPlaybackFlag(chnNum);
		strIPCChn += '</div>';
		
		strIPCChn += '</div>';
		strIPCChn += '<div class="clearBoth"></div>';
		chnNum++;
	}
	
	strHtml += strIPCChn;
	
	return strHtml;
}

function ChangeConfig(){
	var path = $("#DeviceType").find("option:selected").text() +'_'+ 
		$("#HardVersion").find("option:selected").text() +'_'+ 
		$("#Status").find("option:selected").text();
	gXmlObj = XmlParsing('config/'+path+'.xml');

	if(gXmlObj == null){
		return false;
	}
	return true;
}

function toPercent(point){
    var str=Number(point*100).toFixed(1);
    str+="%";
    return str;
}

function preCalc(){
	var analogNums = 0;//模拟通道计数
	var resProductSum = 0;//分辨率乘积的和
	var resProductSumMemory = 0;//内存计算下分辨率乘积的和
	var resProductAndFpsSum = 0;//分辨率乘积乘以各帧率的和
	var bitSum= 0;//码率之和
	for (var i=0;i<gNums;i++) {
		if($('#chntype_'+i).find("option:selected").val()*1 == 1){
			var bandwidthFlag = false;
			if($('#preview_main_'+i).prop("checked")){
				var resArr = $('#res_main_'+i).find("option:selected").text().split('x');
				var w = resArr[0]*1;
				var h = resArr[1]*1;
				var resProduct = w*h;
				resProductSum += resProduct;
				resProductAndFpsSum += resProduct*$('#fps_main_'+i).find("option:selected").text()*1;
				bandwidthFlag = true;
				if($("#Mode").find("option:selected").text() == 'NVR'){
					if(gXmlObj.find('PreviewResource').find('ExtraDecMemory').text()*1==1){
						if(h>1080){//大于1080p
							resProduct = w*h + 518400/(3840*2160*6-1920*1080*6)*(3840*2160*6-w*h*6);
						}
					}
				}
				resProductSumMemory += resProduct;
			}
			if($('#preview_sub_'+i).prop("checked")){
				var resArr = $('#res_sub_'+i).find("option:selected").text().split('x');
				var w = resArr[0]*1;
				var h = resArr[1]*1;
				var resProduct = w*h;
				resProductSum += resProduct;
				resProductAndFpsSum += resProduct*$('#fps_sub_'+i).find("option:selected").text()*1;
				bandwidthFlag = true;
				if($("#Mode").find("option:selected").text() == 'NVR'){
					if(gXmlObj.find('PreviewResource').find('ExtraDecMemory').text()*1==1){
						if(h>1080){//大于1080p
							resProduct = w*h + 518400/(3840*2160*6-1920*1080*6)*(3840*2160*6-w*h*6);
						}
					}
				}
				resProductSumMemory += resProduct;
			}
			if(bandwidthFlag){
				bitSum += $('#bit_main_'+i).find("option:selected").text()*1;
				bitSum += $('#bit_sub_'+i).find("option:selected").text()*1;
				bitSum += $('#bit_mob_'+i).find("option:selected").text()*1;
			}
		}
		if($('#chntype_'+i).find("option:selected").val()*1 == 0){
			analogNums++;
		}
	}
	var decodeMemoryPer = resProductSumMemory/(gXmlObj.find('PreviewResource').find('BaseDecodeMemory').text()*1+
		(gAnalogNums-analogNums)*gXmlObj.find('PreviewResource').find('ConvertMemory').text()*1);
	var strDecodeMemoryPer = toPercent(decodeMemoryPer);
	if(decodeMemoryPer>=1){
		$('#memoryBar').css("width",'100%');
	}else{
		$('#memoryBar').css("width",strDecodeMemoryPer);
	}
	if(decodeMemoryPer == 0){
		memorySpan.innerHTML = '0%';
	}else{
		memorySpan.innerHTML = strDecodeMemoryPer;
	}
	
	var RefResolutionProduct = (gXmlObj.find('PreviewResource').find('RefResolution').text().split(',')[0]*1)*
		(gXmlObj.find('PreviewResource').find('RefResolution').text().split(',')[1]*1);
	var BaseDecodeFps = gXmlObj.find('PreviewResource').find('BaseDecodeFps').text()*1
	var decodePerformancePer = resProductAndFpsSum/(RefResolutionProduct*Math.min((BaseDecodeFps+((gAnalogNums-analogNums)*
		gXmlObj.find('PreviewResource').find('ConvertFps').text()*1)),gXmlObj.find('PreviewResource').find('MaxFps').text()*1));
	var strDecodePerformancePer = toPercent(decodePerformancePer);
	if(decodePerformancePer>=1){
		$('#performanceBar').css("width",'100%');
	}else{
		$('#performanceBar').css("width",strDecodePerformancePer);
	}
	if(decodePerformancePer == 0){
		performanceSpan.innerHTML = '0%';
	}else{
		performanceSpan.innerHTML = strDecodePerformancePer;
	}
	
	var BaseBandWidth = gXmlObj.find('PreviewResource').find('BaseBandWidth').text()*1;
	var ConvertBandWidth = gXmlObj.find('PreviewResource').find('ConvertBandWidth').text()*1;
	var bandwidthPer = bitSum/(BaseBandWidth+(gAnalogNums-analogNums)*ConvertBandWidth);
	var strDecodePerformancePer = toPercent(bandwidthPer);
	if(bandwidthPer>=1){
		$('#bandwidthBar').css("width",'100%');
	}else{
		$('#bandwidthBar').css("width",strDecodePerformancePer);
	}
	if(bandwidthPer == 0){
		bandwidthSpan.innerHTML = '0%';
	}else{
		bandwidthSpan.innerHTML = strDecodePerformancePer;
	}
}

function pbCalc(){
	var analogNums = 0;//模拟通道计数
	var resProductSum = 0;//分辨率乘积的和
	var resProductAndFpsSum = 0;//分辨率乘积乘以各帧率的和
	var resProductSumMemory = 0;//内存计算下分辨率乘积的和
	for (var i=0;i<gNums;i++) {
		if($('#chntype_'+i).find("option:selected").val()*1 == 0){
			analogNums++;
		}
		if($('#playback_'+i).prop("checked")){
			var resArr = $('#res_main_'+i).find("option:selected").text().split('x');
			var w = resArr[0]*1;
			var h = resArr[1]*1;
			var resProduct = w*h;
			resProductSum += resProduct;
			resProductAndFpsSum += resProduct*$('#fps_main_'+i).find("option:selected").text()*1;
			if($("#Mode").find("option:selected").text() == 'NVR'){
				if(gXmlObj.find('PreviewResource').find('ExtraDecMemory').text()*1==1){
					if(h>1080){//大于1080p
						resProduct = w*h + 518400/(3840*2160*6-1920*1080*6)*(3840*2160*6-w*h*6);
					}
				}
			}
			resProductSumMemory += resProduct;
		}
	}
	var decodeMemoryPer = 0;
	if($("#Mode").find("option:selected").text() == 'DVR'){
		decodeMemoryPer = resProductSumMemory/(gXmlObj.find('PlaybackResource').find('BaseDecodeMemory').text()*1);
	}else{
		decodeMemoryPer = resProductSumMemory/(gXmlObj.find('PlaybackResource').find('BaseDecodeMemory').text()*1+
			(gAnalogNums-analogNums)*gXmlObj.find('PlaybackResource').find('ConvertMemory').text()*1);
	}
	var strDecodeMemoryPer = toPercent(decodeMemoryPer);
	if(decodeMemoryPer>=1){
		$('#pbMemoryBar').css("width",'100%');
	}else{
		$('#pbMemoryBar').css("width",strDecodeMemoryPer);
	}
	if(decodeMemoryPer == 0){
		pbMemorySpan.innerHTML = '0%';
	}else{
		pbMemorySpan.innerHTML = strDecodeMemoryPer;
	}
	
	var RefResolutionProduct = (gXmlObj.find('PlaybackResource').find('RefResolution').text().split(',')[0]*1)*
		(gXmlObj.find('PlaybackResource').find('RefResolution').text().split(',')[1]*1);
	var BaseDecodeFps = 0;
	if($("#Mode").find("option:selected").text() == 'DVR'){
		if(gXmlObj.find('PlaybackResource').find('DvrBaseDecodeFps').length != 0){
			BaseDecodeFps = gXmlObj.find('PlaybackResource').find('DvrBaseDecodeFps').text()*1;
		}else{
			BaseDecodeFps = gXmlObj.find('PlaybackResource').find('BaseDecodeFps').text()*1;
		}
		
	}else{
		BaseDecodeFps = gXmlObj.find('PlaybackResource').find('BaseDecodeFps').text()*1;
	}
	
	var decodePerformancePer = 0;
	if($("#Mode").find("option:selected").text() == 'DVR'){
		decodePerformancePer = resProductAndFpsSum/(RefResolutionProduct*BaseDecodeFps);
	}else{
		decodePerformancePer = resProductAndFpsSum/(RefResolutionProduct*(BaseDecodeFps+((gAnalogNums-analogNums)*
			gXmlObj.find('PlaybackResource').find('ConvertFps').text()*1)));
	}
	var strDecodePerformancePer = toPercent(decodePerformancePer);
	if(decodePerformancePer>=1){
		$('#pbPerformanceBar').css("width",'100%');
	}else{
		$('#pbPerformanceBar').css("width",strDecodePerformancePer);
	}
	if(decodePerformancePer == 0){
		pbPerformanceSpan.innerHTML = '0%';
	}else{
		pbPerformanceSpan.innerHTML = strDecodePerformancePer;
	}
}

function Calc(){
	preCalc();
	pbCalc();
}

$(function() {
	if(!InitWeb()){
		return;
	}
	
	var configObj = XmlParsing('config/config.xml');
	
	if(configObj == null){
		return false;
	}else{
		var strHtml = '';
		
		var devTypeList = configObj.find('DeviceType').text().split(',');
		
		$.each(devTypeList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		}); 
		DeviceType.innerHTML = strHtml;
		
		var devType = devTypeList[0];
		
		strHtml = '';
		var HardVersionList = configObj.find(devType).find('HardVersion').text().split(',');
		$.each(HardVersionList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		}); 
		HardVersion.innerHTML = strHtml;
		
		strHtml = '';
		var ModeList = configObj.find(devType).find('Mode').text().split(',');
		$.each(ModeList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		}); 
		Mode.innerHTML = strHtml;
		
		strHtml = '';
		var StatusList = configObj.find(devType).find('Status').text().split(',');
		$.each(StatusList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		}); 
		Status.innerHTML = strHtml;
	}
	
	$("#DeviceType").change(function(){
		var devType = $("#DeviceType").find("option:selected").text();
		var strHtml = '';
		var HardVersionList = configObj.find(devType).find('HardVersion').text().split(',');
		$.each(HardVersionList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		}); 
		HardVersion.innerHTML = strHtml;
		
		strHtml = '';
		var ModeList = configObj.find(devType).find('Mode').text().split(',');
		$.each(ModeList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		}); 
		Mode.innerHTML = strHtml;
		
		strHtml = '';
		var StatusList = configObj.find(devType).find('Status').text().split(',');
		$.each(StatusList, function(key, value) {
			strHtml += '<option value="'+key+'">'+value+'</option>';
		}); 
		Status.innerHTML = strHtml;
		
		if(ChangeConfig()){
			$("#Mode").change();
		}	
	})
	
	$("#HardVersion").change(function(){
		if(ChangeConfig()){
			$("#Mode").change();
		}
	})
	
	$("#Status").change(function(){
		if ($(this).find("option:selected").text().toLowerCase().indexOf('intelligent') != -1) {
			$("#Intelligent_Text").show();
		} else{
			$("#Intelligent_Text").hide();
		}
		if(ChangeConfig()){
			$("#Mode").change();
		}
	})
	
	$("#Mode").change(function(){
		if ($(this).find("option:selected").text() == 'DVR') {
			$("#previewDiv").hide();
		} else{
			$("#previewDiv").show();
		}
		
		channelsList.innerHTML = createChannelsHtml();
		
		var total = gXmlObj.find('PreviewResource').find('BaseBandWidth').text()*1;
		total /= 1024;
		var str = total+'M';
		totalBandwidth.innerHTML = str;
		
		Calc();
	})
	
	$("#DeviceType").change();
	
	$('body').delegate('.channelTypeSelect','change',function(){
		var selectedValue = $(this).find("option:selected").val()*1;
		var id= $(this).attr('id');
		var chnNum = id.split('_')[1]*1;
		if(selectedValue == 0) {//模拟
			if($("#Status").find("option:selected").text().toLowerCase().indexOf('intelligent') != -1){
				var intelligentId = 'intelligent_'+chnNum+'_div';
				$("#"+intelligentId).removeClass("blankDiv");
				var strHtml = '';
				document.getElementById(intelligentId).innerHTML = createIntelligentFlag(chnNum);
			}
			
			var cameraTypeId = 'cameratype_'+chnNum+'_div';
			$("#"+cameraTypeId).removeClass("blankDiv");
			var strHtml = '';
			strHtml += '<select id="cameratype_'+chnNum+'" class="cameratypeSelect">';
			var cameraTypeList = gXmlObj.find('CameraTypeList').text().split(',');
			$.each(cameraTypeList, function(key, value) {
				strHtml += '<option value="'+key+'">'+value+'</option>';
			});
			strHtml += '</select>';
			document.getElementById(cameraTypeId).innerHTML = strHtml;
			
			var resId = 'res_'+chnNum+'_div';
			$("#"+resId).removeClass("blankDiv");
			document.getElementById(resId).innerHTML = createRes(chnNum, 0, gXmlObj.find('CameraTypeList').text().split(',')[0]);
			
			var fpsId = 'fps_'+chnNum+'_div';
			$("#"+fpsId).removeClass("blankDiv");
			document.getElementById(fpsId).innerHTML = createFps(chnNum, 0, gXmlObj.find('CameraTypeList').text().split(',')[0], 0);
			
			var bitId = 'bit_'+chnNum+'_div';
			$("#"+bitId).removeClass("blankDiv");
			var res = gXmlObj.find('AnalogChnAttr').find('MainStream')
				.find('EncodeResList').find('Res_'+gXmlObj.find('CameraTypeList').text().split(',')[0]).text().split(',')[0];
			document.getElementById(bitId).innerHTML = createBit(chnNum, 0, res);
			
			var reviewId = 'preview_'+chnNum+'_div';
			document.getElementById(reviewId).innerHTML = '';
			$("#"+reviewId).addClass("blankDiv");
			
			var playbackd = 'playback_'+chnNum+'_div';
			$("#"+playbackd).removeClass("blankDiv");
			document.getElementById(playbackd).innerHTML = createPlaybackFlag(chnNum);
		}else if (selectedValue == 1) {//数字
			if($("#Status").find("option:selected").text().toLowerCase().indexOf('intelligent') != -1){
				var intelligentId = 'intelligent_'+chnNum+'_div';
				document.getElementById(intelligentId).innerHTML = '';
				$("#"+intelligentId).addClass("blankDiv");
			}
			
			var cameraTypeId = 'cameratype_'+chnNum+'_div';
			document.getElementById(cameraTypeId).innerHTML = '';
			$("#"+cameraTypeId).addClass("blankDiv");
			
			var resId = 'res_'+chnNum+'_div';
			$("#"+resId).removeClass("blankDiv");
			document.getElementById(resId).innerHTML = createRes(chnNum, 1);
			
			var fpsId = 'fps_'+chnNum+'_div';
			$("#"+fpsId).removeClass("blankDiv");
			document.getElementById(fpsId).innerHTML = createFps(chnNum, 1);
			
			var bitId = 'bit_'+chnNum+'_div';
			$("#"+bitId).removeClass("blankDiv");
			document.getElementById(bitId).innerHTML = createBit(chnNum, 1);
			
			var reviewId = 'preview_'+chnNum+'_div';
			$("#"+reviewId).removeClass("blankDiv");
			document.getElementById(reviewId).innerHTML = createPreviewFlag(chnNum, 1);
			
			var playbackd = 'playback_'+chnNum+'_div';
			$("#"+playbackd).removeClass("blankDiv");
			document.getElementById(playbackd).innerHTML = createPlaybackFlag(chnNum);
		} else  if (selectedValue == 2) {//无
			if($("#Status").find("option:selected").text().toLowerCase().indexOf('intelligent') != -1){
				var intelligentId = 'intelligent_'+chnNum+'_div';
				document.getElementById(intelligentId).innerHTML = '';
				$("#"+intelligentId).addClass("blankDiv");
			}
			
			var cameraTypeId = 'cameratype_'+chnNum+'_div';
			document.getElementById(cameraTypeId).innerHTML = '';
			$("#"+cameraTypeId).addClass("blankDiv");
			
			var resId = 'res_'+chnNum+'_div';
			document.getElementById(resId).innerHTML = '';
			$("#"+resId).addClass("blankDiv");
			
			var fpsId = 'fps_'+chnNum+'_div';
			document.getElementById(fpsId).innerHTML = '';
			$("#"+fpsId).addClass("blankDiv");
			
			var bitId = 'bit_'+chnNum+'_div';
			document.getElementById(bitId).innerHTML = '';
			$("#"+bitId).addClass("blankDiv");
			
			var reviewId = 'preview_'+chnNum+'_div';
			document.getElementById(reviewId).innerHTML = '';
			$("#"+reviewId).addClass("blankDiv");
			
			var playbackd = 'playback_'+chnNum+'_div';
			document.getElementById(playbackd).innerHTML = '';
			$("#"+playbackd).addClass("blankDiv");
		}
		
		Calc();
	})
	
	$('body').delegate('.cameratypeSelect','change',function(){
		var selectedText = $(this).find("option:selected").text();
		var id= $(this).attr('id');
		var chnNum = id.split('_')[1]*1;
		
		var resId = 'res_'+chnNum+'_div';
		document.getElementById(resId).innerHTML = createRes(chnNum, 0, selectedText);
		
		var fpsId = 'fps_'+chnNum+'_div';
		document.getElementById(fpsId).innerHTML = createFps(chnNum, 0, selectedText, 0);
		
		var bitId = 'bit_'+chnNum+'_div';
		var res = gXmlObj.find('AnalogChnAttr').find('MainStream')
				.find('EncodeResList').find('Res_'+selectedText).text().split(',')[0];
		document.getElementById(bitId).innerHTML = createBit(chnNum, 0, res);
		
		Calc();
	})
	
	$('body').delegate('.resSelectClass','change',function(){
		var selectedText = $(this).find("option:selected").text();
		var id= $(this).attr('id');
		var chnNum = id.split('_')[2]*1;
		var chntypeId = 'chntype_'+chnNum;
		
		if ($("#"+chntypeId).find("option:selected").val()*1 == 0) {//模拟
			var bitId = 'bit_'+chnNum+'_div';
			document.getElementById(bitId).innerHTML = createBit(chnNum, 0, selectedText);
		}
		
		Calc();
	})
		
	$('body').delegate('.fpsSelectClass','change',function(){
		Calc();
	})
	
	$('body').delegate('.bitSelectClass','change',function(){
		Calc();
	})
	$('body').delegate(':checkbox','click',function(){
		var id= $(this).attr('id');
		var idArr = id.split('_');
		if(idArr.length == 2){//回放或者智能被勾选
			if(idArr[0] == 'intelligent'){//智能
				var chnNum = idArr[1]*1;
				if($(this).prop("checked")){
					var num = 0;
					var checkId;
					$("input[id^='intelligent_']").each(function(){
						if($(this).prop("checked")){
							checkId = $(this).attr('id');
							if(checkId.split('_')[1]*1 != chnNum){
								num++;
								return false;
							}
							
						}
					});
					if(num>0){//取消之前选中的
						var preChnNum = checkId.split('_')[1]*1;
						var fpsId = 'fps_'+preChnNum+'_div';
						var cameratypeId = 'cameratype_'+preChnNum;
						var CameraTypeText = $("#"+cameratypeId).find("option:selected").text();
						document.getElementById(fpsId).innerHTML = createFps(preChnNum, 0, CameraTypeText, 0);
						$("#"+checkId).prop("checked",false);
					}
					var fpsId = 'fps_'+chnNum+'_div';
					var cameratypeId = 'cameratype_'+chnNum;
					var CameraTypeText = $("#"+cameratypeId).find("option:selected").text();
					document.getElementById(fpsId).innerHTML = createFps(chnNum, 0, CameraTypeText, 1);
					
				}else{//取消当前的勾选
					var fpsId = 'fps_'+chnNum+'_div';
					var cameratypeId = 'cameratype_'+chnNum;
					var CameraTypeText = $("#"+cameratypeId).find("option:selected").text();
					document.getElementById(fpsId).innerHTML = createFps(chnNum, 0, CameraTypeText, 0);
				}
				
				
			}else{
				var chnNum = idArr[1]*1;
				var num = 0;
				$("input[id^='preview_']").each(function(){
					if($(this).prop("checked")){
						num++;
					}
				});
				if(num>0){
					num = 0;
					$("input[id^='playback_']").each(function(){
						if($(this).prop("checked")){
							num++;
						}
					});
					if(num>1){
						$(this).prop("checked",false)
						alert(gLgObj.get('IDS_tip_playback'));
						return;
					}
				}
				
				var mainId = 'preview_main_'+chnNum;
				$("#"+mainId).prop("checked",false);
				var subId = 'preview_sub_'+chnNum;
				$("#"+subId).prop("checked",false);
			}
			
		}else if(idArr.length == 3){
			var chnNum = idArr[2]*1;
			var num = 0;
			$("input[id^='playback_']").each(function(){
				if($(this).prop("checked")){
					num++;
				}
			});
			if(num>1){
				$(this).prop("checked",false)
				alert(gLgObj.get('IDS_tip_preview'));
				return;
			}
			if(idArr[1] == 'main'){
				var subId = 'preview_sub_'+chnNum;
				$("#"+subId).prop("checked",false);
				var pbId = 'playback_'+chnNum;
				$("#"+pbId).prop("checked",false);
			}else if(idArr[1] == 'sub'){
				var mainId = 'preview_main_'+chnNum;
				$("#"+mainId).prop("checked",false);
				var pbId = 'playback_'+chnNum;
				$("#"+pbId).prop("checked",false);
			}
		}
		Calc();
	})
	
	$("#lgSel").change(function(){
		if($(this).val()*1 == 0){
			LoadLanguage('ENU');
			//lan();
		}else{
			LoadLanguage('RUS');
			//lan();
		}
	})
	
});



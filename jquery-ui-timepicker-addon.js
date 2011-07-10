/*
* jQuery timepicker addon
* By: Trent Richardson [http://trentrichardson.com]
* Version 0.9.5
* Last Modified: 05/25/2011
* 
* Copyright 2011 Trent Richardson
* Dual licensed under the MIT and GPL licenses.
* http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
* http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
* 
* HERES THE CSS:
* .ui-timepicker-div .ui-widget-header{ margin-bottom: 8px; }
* .ui-timepicker-div dl{ text-align: left; }
* .ui-timepicker-div dl dt{ height: 25px; }
* .ui-timepicker-div dl dd{ margin: -25px 10px 10px 65px; }
* .ui-timepicker-div td { font-size: 90%; }
*/

(function(d){function l(){this.regional=[];this.regional[""]={currentText:"Now",closeText:"Done",ampm:!1,timeFormat:"hh:mm tt",timeOnlyTitle:"Choose Time",timeText:"Time",hourText:"Hour",minuteText:"Minute",secondText:"Second",timezoneText:"Time Zone"};this._defaults={showButtonPanel:!0,timeOnly:!1,showHour:!0,showMinute:!0,showSecond:!1,showTimezone:!1,showTime:!0,stepHour:0.05,stepMinute:0.05,stepSecond:0.05,hour:0,minute:0,second:0,timezone:"+0000",hourMin:0,minuteMin:0,secondMin:0,hourMax:23,
minuteMax:59,secondMax:59,minDateTime:null,maxDateTime:null,hourGrid:0,minuteGrid:0,secondGrid:0,alwaysSetTime:!0,separator:" ",altFieldTimeOnly:!0,showTimepicker:!0,timezoneList:["-1100","-1000","-0900","-0800","-0700","-0600","-0500","-0400","-0300","-0200","-0100","+0000","+0100","+0200","+0300","+0400","+0500","+0600","+0700","+0800","+0900","+1000","+1100","+1200"]};d.extend(this._defaults,this.regional[""])}d.extend(d.ui,{timepicker:{version:"0.9.5"}});d.extend(l.prototype,{$input:null,$altInput:null,
$timeObj:null,inst:null,hour_slider:null,minute_slider:null,second_slider:null,timezone_select:null,hour:0,minute:0,second:0,timezone:"+0000",hourMinOriginal:null,minuteMinOriginal:null,secondMinOriginal:null,hourMaxOriginal:null,minuteMaxOriginal:null,secondMaxOriginal:null,ampm:"",formattedDate:"",formattedTime:"",formattedDateTime:"",timezoneList:["-1100","-1000","-0900","-0800","-0700","-0600","-0500","-0400","-0300","-0200","-0100","+0000","+0100","+0200","+0300","+0400","+0500","+0600","+0700",
"+0800","+0900","+1000","+1100","+1200"],setDefaults:function(b){var a=this._defaults,b=b||{};d.extend(a,b);for(var c in b)if(b[c]===null||b[c]===void 0)a[c]=b[c];return this},_newInst:function(b,a){var c=new l,e={},g;for(g in this._defaults){var h=b.attr("time:"+g);if(h)try{e[g]=eval(h)}catch(f){e[g]=h}}c._defaults=d.extend({},this._defaults,e,a,{beforeShow:function(b,e){d.isFunction(a.beforeShow)&&a.beforeShow(b,e,c)},onChangeMonthYear:function(e,g,f){c._updateDateTime(f);d.isFunction(a.onChangeMonthYear)&&
a.onChangeMonthYear.call(b[0],e,g,f,c)},onClose:function(e,g){c.timeDefined===!0&&b.val()!=""&&c._updateDateTime(g);d.isFunction(a.onClose)&&a.onClose.call(b[0],e,g,c)},timepicker:c});c.hour=c._defaults.hour;c.minute=c._defaults.minute;c.second=c._defaults.second;c.ampm="";c.$input=b;if(a.altField)c.$altInput=d(a.altField).css({cursor:"pointer"}).focus(function(){b.trigger("focus")});if(c._defaults.minDate!==void 0&&c._defaults.minDate instanceof Date)c._defaults.minDateTime=new Date(c._defaults.minDate.getTime());
if(c._defaults.minDateTime!==void 0&&c._defaults.minDateTime instanceof Date)c._defaults.minDate=new Date(c._defaults.minDateTime.getTime());if(c._defaults.maxDate!==void 0&&c._defaults.maxDate instanceof Date)c._defaults.maxDateTime=new Date(c._defaults.maxDate.getTime());if(c._defaults.maxDateTime!==void 0&&c._defaults.maxDateTime instanceof Date)c._defaults.maxDate=new Date(c._defaults.maxDateTime.getTime());return c},_addTimePicker:function(b){this.timeDefined=this._parseTime(this.$altInput&&
this._defaults.altFieldTimeOnly?this.$input.val()+" "+this.$altInput.val():this.$input.val());this._limitMinMaxDateTime(b,!1);this._injectTimePicker()},_parseTime:function(b,a){var c=this._defaults.timeFormat.toString().replace(/h{1,2}/ig,"(\\d?\\d)").replace(/m{1,2}/ig,"(\\d?\\d)").replace(/s{1,2}/ig,"(\\d?\\d)").replace(/t{1,2}/ig,"(am|pm|a|p)?").replace(/z{1}/ig,"((\\+|-)\\d\\d\\d\\d)?").replace(/\s/g,"\\s?")+"$",e=this._getFormatPositions();if(!this.inst)this.inst=d.datepicker._getInst(this.$input[0]);
if(a||!this._defaults.timeOnly)c=".{"+d.datepicker._get(this.inst,"dateFormat").length+",}"+this._defaults.separator.replace(RegExp("[.*+?|()\\[\\]{}\\\\]","g"),"\\$&")+c;if(c=b.match(RegExp(c,"i"))){if(e.t!==-1)this.ampm=(c[e.t]===void 0||c[e.t].length===0?"":c[e.t].charAt(0).toUpperCase()=="A"?"AM":"PM").toUpperCase();if(e.h!==-1)this.hour=this.ampm=="AM"&&c[e.h]=="12"?0:this.ampm=="PM"&&c[e.h]!="12"?(parseFloat(c[e.h])+12).toFixed(0):Number(c[e.h]);if(e.m!==-1)this.minute=Number(c[e.m]);if(e.s!==
-1)this.second=Number(c[e.s]);if(e.z!==-1)this.timezone=c[e.z];return!0}return!1},_getFormatPositions:function(){var b=this._defaults.timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|t{1,2}|z)/g),a={h:-1,m:-1,s:-1,t:-1,z:-1};if(b)for(var c=0;c<b.length;c++)a[b[c].toString().charAt(0)]==-1&&(a[b[c].toString().charAt(0)]=c+1);return a},_injectTimePicker:function(){var b=this.inst.dpDiv,a=this._defaults,c=this,e=(a.hourMax-a.hourMax%a.stepHour).toFixed(0),g=(a.minuteMax-a.minuteMax%a.stepMinute).toFixed(0),
h=(a.secondMax-a.secondMax%a.stepSecond).toFixed(0),f=this.inst.id.toString().replace(/([^A-Za-z0-9_])/g,"");if(b.find("div#ui-timepicker-div-"+f).length===0&&a.showTimepicker){var i='<div class="ui-timepicker-div" id="ui-timepicker-div-'+f+'"><dl><dt class="ui_tpicker_time_label" id="ui_tpicker_time_label_'+f+'"'+(a.showTime?"":' style="display:none;"')+">"+a.timeText+'</dt><dd class="ui_tpicker_time" id="ui_tpicker_time_'+f+'"'+(a.showTime?"":' style="display:none;"')+'></dd><dt class="ui_tpicker_hour_label" id="ui_tpicker_hour_label_'+
f+'"'+(a.showHour?"":' style="display:none;"')+">"+a.hourText+"</dt>",n=0,o=0,l=0,k;if(a.showHour&&a.hourGrid>0){i+='<dd class="ui_tpicker_hour"><div id="ui_tpicker_hour_'+f+'"'+(a.showHour?"":' style="display:none;"')+'></div><div style="padding-left: 1px"><table><tr>';for(var j=a.hourMin;j<e;j+=a.hourGrid){n++;var m=a.ampm&&j>12?j-12:j;m<10&&(m="0"+m);a.ampm&&(j==0?m="12a":m+=j<12?"a":"p");i+="<td>"+m+"</td>"}i+="</tr></table></div></dd>"}else i+='<dd class="ui_tpicker_hour" id="ui_tpicker_hour_'+
f+'"'+(a.showHour?"":' style="display:none;"')+"></dd>";i+='<dt class="ui_tpicker_minute_label" id="ui_tpicker_minute_label_'+f+'"'+(a.showMinute?"":' style="display:none;"')+">"+a.minuteText+"</dt>";if(a.showMinute&&a.minuteGrid>0){i+='<dd class="ui_tpicker_minute ui_tpicker_minute_'+a.minuteGrid+'"><div id="ui_tpicker_minute_'+f+'"'+(a.showMinute?"":' style="display:none;"')+'></div><div style="padding-left: 1px"><table><tr>';for(j=a.minuteMin;j<g;j+=a.minuteGrid)o++,i+="<td>"+(j<10?"0":"")+j+"</td>";
i+="</tr></table></div></dd>"}else i+='<dd class="ui_tpicker_minute" id="ui_tpicker_minute_'+f+'"'+(a.showMinute?"":' style="display:none;"')+"></dd>";i+='<dt class="ui_tpicker_second_label" id="ui_tpicker_second_label_'+f+'"'+(a.showSecond?"":' style="display:none;"')+">"+a.secondText+"</dt>";if(a.showSecond&&a.secondGrid>0){i+='<dd class="ui_tpicker_second ui_tpicker_second_'+a.secondGrid+'"><div id="ui_tpicker_second_'+f+'"'+(a.showSecond?"":' style="display:none;"')+'></div><div style="padding-left: 1px"><table><tr>';
for(j=a.secondMin;j<h;j+=a.secondGrid)l++,i+="<td>"+(j<10?"0":"")+j+"</td>";i+="</tr></table></div></dd>"}else i+='<dd class="ui_tpicker_second" id="ui_tpicker_second_'+f+'"'+(a.showSecond?"":' style="display:none;"')+"></dd>";i+='<dt class="ui_tpicker_timezone_label" id="ui_tpicker_timezone_label_'+f+'"'+(a.showTimezone?"":' style="display:none;"')+">"+a.timezoneText+"</dt>";i+='<dd class="ui_tpicker_timezone" id="ui_tpicker_timezone_'+f+'"'+(a.showTimezone?"":' style="display:none;"')+"></dd>";
i+="</dl></div>";$tp=d(i);a.timeOnly===!0&&($tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">'+a.timeOnlyTitle+"</div></div>"),b.find(".ui-datepicker-header, .ui-datepicker-calendar").hide());this.hour_slider=$tp.find("#ui_tpicker_hour_"+f).slider({orientation:"horizontal",value:this.hour,min:a.hourMin,max:e,step:a.stepHour,slide:function(a,b){c.hour_slider.slider("option","value",b.value);c._onTimeChange()}});this.minute_slider=$tp.find("#ui_tpicker_minute_"+
f).slider({orientation:"horizontal",value:this.minute,min:a.minuteMin,max:g,step:a.stepMinute,slide:function(a,b){c.minute_slider.slider("option","value",b.value);c._onTimeChange()}});this.second_slider=$tp.find("#ui_tpicker_second_"+f).slider({orientation:"horizontal",value:this.second,min:a.secondMin,max:h,step:a.stepSecond,slide:function(a,b){c.second_slider.slider("option","value",b.value);c._onTimeChange()}});this.timezone_select=$tp.find("#ui_tpicker_timezone_"+f).append("<select></select>").find("select");
d.fn.append.apply(this.timezone_select,d.map(a.timezoneList,function(a){return d("<option />").val(typeof a=="object"?a.value:a).text(typeof a=="object"?a.label:a)}));this.timezone_select.val(typeof this.timezone!="undefined"&&this.timezone!=null&&this.timezone!=""?this.timezone:a.timezone);this.timezone_select.change(function(){c._onTimeChange()});a.showHour&&a.hourGrid>0&&(k=100*n*a.hourGrid/(e-a.hourMin),$tp.find(".ui_tpicker_hour table").css({width:k+"%",marginLeft:k/(-2*n)+"%",borderCollapse:"collapse"}).find("td").each(function(){d(this).click(function(){var b=
d(this).html();if(a.ampm)var e=b.substring(2).toLowerCase(),b=parseInt(b.substring(0,2)),b=e=="a"?b==12?0:b:b==12?12:b+12;c.hour_slider.slider("option","value",b);c._onTimeChange();c._onSelectHandler()}).css({cursor:"pointer",width:100/n+"%",textAlign:"center",overflow:"hidden"})}));a.showMinute&&a.minuteGrid>0&&(k=100*o*a.minuteGrid/(g-a.minuteMin),$tp.find(".ui_tpicker_minute table").css({width:k+"%",marginLeft:k/(-2*o)+"%",borderCollapse:"collapse"}).find("td").each(function(){d(this).click(function(){c.minute_slider.slider("option",
"value",d(this).html());c._onTimeChange();c._onSelectHandler()}).css({cursor:"pointer",width:100/o+"%",textAlign:"center",overflow:"hidden"})}));a.showSecond&&a.secondGrid>0&&$tp.find(".ui_tpicker_second table").css({width:k+"%",marginLeft:k/(-2*l)+"%",borderCollapse:"collapse"}).find("td").each(function(){d(this).click(function(){c.second_slider.slider("option","value",d(this).html());c._onTimeChange();c._onSelectHandler()}).css({cursor:"pointer",width:100/l+"%",textAlign:"center",overflow:"hidden"})});
e=b.find(".ui-datepicker-buttonpane");e.length?e.before($tp):b.append($tp);this.$timeObj=$tp.find("#ui_tpicker_time_"+f);if(this.inst!==null)b=this.timeDefined,this._onTimeChange(),this.timeDefined=b;b=function(){c._onSelectHandler()};this.hour_slider.bind("slidestop",b);this.minute_slider.bind("slidestop",b);this.second_slider.bind("slidestop",b)}},_limitMinMaxDateTime:function(b,a){var c=this._defaults,e=new Date(b.selectedYear,b.selectedMonth,b.selectedDay);if(this._defaults.showTimepicker){if(this._defaults.minDateTime!==
null&&e){var d=this._defaults.minDateTime,h=new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0,0);if(this.hourMinOriginal===null||this.minuteMinOriginal===null||this.secondMinOriginal===null)this.hourMinOriginal=c.hourMin,this.minuteMinOriginal=c.minuteMin,this.secondMinOriginal=c.secondMin;if(b.settings.timeOnly||h.getTime()==e.getTime())if(this._defaults.hourMin=d.getHours(),this.hour<=this._defaults.hourMin)if(this.hour=this._defaults.hourMin,this._defaults.minuteMin=d.getMinutes(),this.minute<=
this._defaults.minuteMin)this.minute=this._defaults.minuteMin,this._defaults.secondMin=d.getSeconds();else{if(this.second<this._defaults.secondMin)this.second=this._defaults.secondMin;this._defaults.secondMin=this.secondMinOriginal}else this._defaults.minuteMin=this.minuteMinOriginal,this._defaults.secondMin=this.secondMinOriginal;else this._defaults.hourMin=this.hourMinOriginal,this._defaults.minuteMin=this.minuteMinOriginal,this._defaults.secondMin=this.secondMinOriginal}if(this._defaults.maxDateTime!==
null&&e){d=this._defaults.maxDateTime;h=new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0,0);if(this.hourMaxOriginal===null||this.minuteMaxOriginal===null||this.secondMaxOriginal===null)this.hourMaxOriginal=c.hourMax,this.minuteMaxOriginal=c.minuteMax,this.secondMaxOriginal=c.secondMax;if(b.settings.timeOnly||h.getTime()==e.getTime())if(this._defaults.hourMax=d.getHours(),this.hour>=this._defaults.hourMax)if(this.hour=this._defaults.hourMax,this._defaults.minuteMax=d.getMinutes(),this.minute>=
this._defaults.minuteMax)this.minute=this._defaults.minuteMax,this._defaults.secondMin=d.getSeconds();else{if(this.second>this._defaults.secondMax)this.second=this._defaults.secondMax;this._defaults.secondMax=this.secondMaxOriginal}else this._defaults.minuteMax=this.minuteMaxOriginal,this._defaults.secondMax=this.secondMaxOriginal;else this._defaults.hourMax=this.hourMaxOriginal,this._defaults.minuteMax=this.minuteMaxOriginal,this._defaults.secondMax=this.secondMaxOriginal}a!==void 0&&a===!0&&(this.hour_slider.slider("option",
{min:this._defaults.hourMin,max:this._defaults.hourMax}).slider("value",this.hour),this.minute_slider.slider("option",{min:this._defaults.minuteMin,max:this._defaults.minuteMax}).slider("value",this.minute),this.second_slider.slider("option",{min:this._defaults.secondMin,max:this._defaults.secondMax}).slider("value",this.second))}},_onTimeChange:function(){var b=this.hour_slider?this.hour_slider.slider("value"):!1,a=this.minute_slider?this.minute_slider.slider("value"):!1,c=this.second_slider?this.second_slider.slider("value"):
!1,e=this.timezone_select?this.timezone_select.val():!1;b!==!1&&(b=parseInt(b,10));a!==!1&&(a=parseInt(a,10));c!==!1&&(c=parseInt(c,10));var d=b<12?"AM":"PM",h=b!=this.hour||a!=this.minute||c!=this.second||this.ampm.length>0&&this.ampm!=d||e!=this.timezone;if(h){if(b!==!1)this.hour=b;if(a!==!1)this.minute=a;if(c!==!1)this.second=c;if(e!==!1)this.timezone=e;this._limitMinMaxDateTime(this.inst,!0)}if(this._defaults.ampm)this.ampm=d;this._formatTime();this.$timeObj&&this.$timeObj.text(this.formattedTime);
this.timeDefined=!0;h&&this._updateDateTime()},_onSelectHandler:function(){var b=this._defaults.onSelect,a=this.$input?this.$input[0]:null;b&&a&&b.apply(a,[this.formattedDateTime,this])},_formatTime:function(b,a,c){if(c==void 0)c=this._defaults.ampm;var b=b||{hour:this.hour,minute:this.minute,second:this.second,ampm:this.ampm,timezone:this.timezone},e=a||this._defaults.timeFormat.toString();if(c)var g=b.ampm=="AM"?b.hour:b.hour%12,g=Number(g)===0?12:g,e=e.toString().replace(/hh/g,(g<10?"0":"")+g).replace(/h/g,
g).replace(/mm/g,(b.minute<10?"0":"")+b.minute).replace(/m/g,b.minute).replace(/ss/g,(b.second<10?"0":"")+b.second).replace(/s/g,b.second).replace(/TT/g,b.ampm.toUpperCase()).replace(/Tt/g,b.ampm.toUpperCase()).replace(/tT/g,b.ampm.toLowerCase()).replace(/tt/g,b.ampm.toLowerCase()).replace(/T/g,b.ampm.charAt(0).toUpperCase()).replace(/t/g,b.ampm.charAt(0).toLowerCase()).replace(/z/g,b.timezone);else e=e.toString().replace(/hh/g,(b.hour<10?"0":"")+b.hour).replace(/h/g,b.hour).replace(/mm/g,(b.minute<
10?"0":"")+b.minute).replace(/m/g,b.minute).replace(/ss/g,(b.second<10?"0":"")+b.second).replace(/s/g,b.second).replace(/z/g,b.timezone),e=d.trim(e.replace(/t/gi,""));if(arguments.length)return e;else this.formattedTime=e},_updateDateTime:function(b){b=this.inst||b;dt=new Date(b.selectedYear,b.selectedMonth,b.selectedDay);dateFmt=d.datepicker._get(b,"dateFormat");formatCfg=d.datepicker._getFormatConfig(b);timeAvailable=dt!==null&&this.timeDefined;var a=this.formattedDate=d.datepicker.formatDate(dateFmt,
dt===null?new Date:dt,formatCfg);if(!(b.lastVal!==void 0&&b.lastVal.length>0&&this.$input.val().length===0)){if(this._defaults.timeOnly===!0)a=this.formattedTime;else if(this._defaults.timeOnly!==!0&&(this._defaults.alwaysSetTime||timeAvailable))a+=this._defaults.separator+this.formattedTime;this.formattedDateTime=a;this._defaults.showTimepicker?this.$altInput&&this._defaults.altFieldTimeOnly===!0?(this.$altInput.val(this.formattedTime),this.$input.val(this.formattedDate)):(this.$altInput&&this.$altInput.val(a),
this.$input.val(a)):this.$input.val(this.formattedDate);this.$input.trigger("change")}}});d.fn.extend({timepicker:function(b){var b=b||{},a=arguments;typeof b=="object"&&(a[0]=d.extend(b,{timeOnly:!0}));return d(this).each(function(){d.fn.datetimepicker.apply(d(this),a)})},datetimepicker:function(b){var b=b||{},a=arguments;return typeof b=="string"?b=="getDate"?d.fn.datepicker.apply(d(this[0]),a):this.each(function(){var b=d(this);b.datepicker.apply(b,a)}):this.each(function(){var a=d(this);a.datepicker(d.timepicker._newInst(a,
b)._defaults)})}});d.datepicker._base_selectDate=d.datepicker._selectDate;d.datepicker._selectDate=function(b,a){var c=this._getInst(d(b)[0]),e=this._get(c,"timepicker");e?(e._limitMinMaxDateTime(c,!0),c.inline=c.stay_open=!0,this._base_selectDate(b,a+e._defaults.separator+e.formattedTime),c.inline=c.stay_open=!1,this._notifyChange(c),this._updateDatepicker(c)):this._base_selectDate(b,a)};d.datepicker._base_updateDatepicker=d.datepicker._updateDatepicker;d.datepicker._updateDatepicker=function(b){if(typeof b.stay_open!==
"boolean"||b.stay_open===!1){this._base_updateDatepicker(b);var a=this._get(b,"timepicker");a&&a._addTimePicker(b)}};d.datepicker._base_doKeyPress=d.datepicker._doKeyPress;d.datepicker._doKeyPress=function(b){var a=d.datepicker._getInst(b.target),c=d.datepicker._get(a,"timepicker");if(c&&d.datepicker._get(a,"constrainInput")){var e=c._defaults.ampm,a=c._defaults.timeFormat.toString().replace(/[hms]/g,"").replace(/TT/g,e?"APM":"").replace(/Tt/g,e?"AaPpMm":"").replace(/tT/g,e?"AaPpMm":"").replace(/T/g,
e?"AP":"").replace(/tt/g,e?"apm":"").replace(/t/g,e?"ap":"")+" "+c._defaults.separator+d.datepicker._possibleChars(d.datepicker._get(a,"dateFormat")),c=String.fromCharCode(b.charCode===void 0?b.keyCode:b.charCode);return b.ctrlKey||c<" "||!a||a.indexOf(c)>-1}return d.datepicker._base_doKeyPress(b)};d.datepicker._base_doKeyUp=d.datepicker._doKeyUp;d.datepicker._doKeyUp=function(b){var a=d.datepicker._getInst(b.target),c=d.datepicker._get(a,"timepicker");if(c&&c._defaults.timeOnly&&a.input.val()!=a.lastVal)try{d.datepicker._updateDatepicker(a)}catch(e){d.datepicker.log(e)}return d.datepicker._base_doKeyUp(b)};
d.datepicker._base_gotoToday=d.datepicker._gotoToday;d.datepicker._gotoToday=function(b){this._base_gotoToday(b);this._setTime(this._getInst(d(b)[0]),new Date)};d.datepicker._disableTimepickerDatepicker=function(b){var a=this._getInst(b),c=this._get(a,"timepicker");d(b).datepicker("getDate");if(c)c._defaults.showTimepicker=!1,c._updateDateTime(a)};d.datepicker._enableTimepickerDatepicker=function(b){var a=this._getInst(b),c=this._get(a,"timepicker");d(b).datepicker("getDate");if(c)c._defaults.showTimepicker=
!0,c._addTimePicker(a),c._updateDateTime(a)};d.datepicker._setTime=function(b,a){var c=this._get(b,"timepicker");if(c){var d=c._defaults,g=a?a.getHours():d.hour,h=a?a.getMinutes():d.minute,f=a?a.getSeconds():d.second;if(g<d.hourMin||g>d.hourMax||h<d.minuteMin||h>d.minuteMax||f<d.secondMin||f>d.secondMax)g=d.hourMin,h=d.minuteMin,f=d.secondMin;c.hour_slider?c.hour_slider.slider("value",g):c.hour=g;c.minute_slider?c.minute_slider.slider("value",h):c.minute=h;c.second_slider?c.second_slider.slider("value",
f):c.second=f;c._onTimeChange();c._updateDateTime(b)}};d.datepicker._setTimeDatepicker=function(b,a,c){var b=this._getInst(b),d=this._get(b,"timepicker");d&&(this._setDateFromField(b),a&&(typeof a=="string"?(d._parseTime(a,c),a=new Date,a.setHours(d.hour,d.minute,d.second)):a=new Date(a.getTime()),a.toString()=="Invalid Date"&&(a=void 0),this._setTime(b,a)))};d.datepicker._base_setDateDatepicker=d.datepicker._setDateDatepicker;d.datepicker._setDateDatepicker=function(b,a){var c=this._getInst(b),d=
a instanceof Date?new Date(a.getTime()):a;this._updateDatepicker(c);this._base_setDateDatepicker.apply(this,arguments);this._setTimeDatepicker(b,d,!0)};d.datepicker._base_getDateDatepicker=d.datepicker._getDateDatepicker;d.datepicker._getDateDatepicker=function(b,a){var c=this._getInst(b),e=this._get(c,"timepicker");if(e)return this._setDateFromField(c,a),(c=this._getDate(c))&&e._parseTime(d(b).val(),e.timeOnly)&&c.setHours(e.hour,e.minute,e.second),c;return this._base_getDateDatepicker(b,a)};d.timepicker=
new l;d.timepicker.version="0.9.5"})(jQuery);

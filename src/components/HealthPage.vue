<template>
  <div id='hangzhou-page'>
    <el-scrollbar style="height: 100%">
      <div>
        <div class="time">{{nowTime}}</div>
        <div class="date">{{nowDate}} {{nowWeek}}</div>
      </div>
      <el-card shadow="always" class = "first-card">
        <div id="name-box">
          <span class="name">{{name}} </span><el-button type="text" class="show" @click="handleName">{{handleNameBtnText}}</el-button>
        </div>
        <el-image
          class="scanned"
          style="width: 20%; height: 20%; float: right;"
          :src="require('@/assets/scanned.png')">
        </el-image>
        <div id="qrc-box">
          <div class="address" @click="dialogVisible = true">
            {{address}}
          </div>
          <el-dialog :visible.sync="dialogVisible" :append-to-body="true" width="80%">
            <el-form :model="addressForm" status-icon ref="registerForm" label-width="80px">
              <el-form-item label="地址" prop="address">
                <el-autocomplete
                  class="inline-input"
                  v-model="addressForm.address"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入地址"
                  clearable
                ></el-autocomplete>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('addressForm')">提&emsp;交</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <el-image
            style="width: 53%; height: 53%; margin-top: 5px;"
            :src="require('@/assets/qrc.jpg')">
          </el-image>
          <div class="health-code-name">杭州健康码</div>
          <div class="vaccinum">已完成新冠疫苗加强接种</div>
        </div>
      </el-card>
      <el-card shadow="always" class = "second-card">
        <el-row>
          <el-card shadow="never" class="nucleic-acid">
            <el-row>
              <el-col :span="8">
                <span style="font-size: 40px;">48</span>
              </el-col>
              <el-col :span="16" style="padding-left: 20px">
            <span style="font-size: 12px;">
              小时内<br/>
              <span style="font-size: 18px;">阴性</span>
            </span>
              </el-col>
            </el-row>
            <el-row>
              <el-button round  class= "nucleic-acid-btn">
                核酸检测
                <span class="nucleic-acid-icon">
              <i class="el-icon-arrow-right"></i>
            </span>
              </el-button>
            </el-row>
          </el-card>
          <!--        <el-card style="width: 2px">-->
          <!--          <el-divider direction="vertical" style="height: 100px; width: 1px"></el-divider>-->
          <!--        </el-card>-->
          <div class="divider"></div>

          <el-card shadow="never" class="key-areas" >
            <el-row>
              <el-col :span="11">
                <el-image
                  style="width: 100%; height: 100%; "
                  :src="require('@/assets/key-areas.png')">
                </el-image>
              </el-col>
              <el-col :span="13" style="margin-top: 10px;">
          <span style="font-size: 15px;">
           疫情重点<br/>地区核验
          </span>
              </el-col>
            </el-row>
            <el-row style="font-size: 12px; color: #8a8a8a; margin-bottom: -5px">
          <span style="font-size: 12px; color: #8a8a8a;">
            您于7天内未到访
          </span>
            </el-row>
            <el-row style="margin-top: -5px">
          <span style="font-size: 12px; color: #8a8a8a;">
            疫情重点地区所在市
          </span>
            </el-row>
          </el-card>
        </el-row>

        <el-row>
          <div>
            <el-divider></el-divider>
          </div>
          <div>
            <el-col :span="14" style="text-align: left;">
              <div class="rest">距核酸3天到期还剩：</div>
            </el-col>
            <el-col :span="10" style="display: flex; vertical-align:middle; ">
              <el-image
                style="width: 15%; height: 15%; margin-top: 2%; margin-left: 4vw"
                :src="require('@/assets/rest-time-icon.png')">
              </el-image>
              <div class="restTime"> {{restTime}}</div>
            </el-col>
          </div>
        </el-row>

      </el-card>
      <el-card shadow="always" class = "fourth-card">
        <el-col :span="16" style="text-align: left;">
          <el-row >
            <el-col :span="4">
              <el-image
                style="width: 70%; height: 70%; padding-left: 20%; "
                :src="require('@/assets/trip.png')">
              </el-image>
            </el-col>
            <el-col :span="20" style="padding-left: 5px; font-weight: bold;">
              <span style="font-size: 16px;">行程卡</span>
            </el-col>
          </el-row>
          <el-row>
<!--          <span style="font-size: 10px; color: #8a8a8a; margin-left: 2px; line-height: 0.5em;">-->
<!--            查看7天是否到过中高风险地区-->
<!--          </span>-->
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-button round class="trip-btn" @click="jumpToTripCard">&nbsp;详情&nbsp;</el-button>
        </el-col>
      </el-card>
      <el-image
        style="width: 94%; height: 94%; margin-top: 3px"
        :src="require('@/assets/help_scan.jpg')">
      </el-image>
      <div class="footer1">依托全国一体化政务服务平台<br/>开展跨省（区、市）数据共享和互通互认</div>
      <div class="footer2">服务热线：0571-12345-6<br/>本服务由杭州市人民政府提供</div>
      <div class="footer3">Copyright@杭州市人民政府版权所有</div>
    </el-scrollbar>
  </div>
</template>

<script>
    export default {
        name: "HealthPage",
        data () {
            return{
                nowDate: "",//当前日期
                nowTime: "",//当前时间
                nowWeek: "",
                restTime: "",//剩余时间
                address: "盛奥铭座",
                dialogVisible: false,
                addressForm: {
                    address: ''
                },
                addressList: [],
                name: "张*",
                handleNameBtnText: "显示"
            }
        },
        methods:{
            
            formatDate() {
                let date = new Date();
                let month = date.getMonth() + 1; // 月
                let day = date.getDate(); // 日
                day = day < 10 ? "0" + day : day; // 如果只有一位，则前面补零
                let hour = date.getHours(); // 时
                hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
                let minute = date.getMinutes(); // 分
                minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
                let second = date.getSeconds(); // 秒
                second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
                this.nowDate = `${month}月${day}日`;
                this.nowTime = `${hour}:${minute}:${second}`;
                this.nowWeek = "星期" + "日一二三四五六".charAt(date.getDay());
            },
            submitForm (formName) {
                if (formName === 'addressForm') {
                    this.address = this.addressForm.address;
                    this.dialogVisible = false;
                }
            },
            querySearch(queryString, cb) {
                var list = this.addressList;
                var results = queryString ? list.filter(this.createFilter(queryString)) : list;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (item) => {
                    return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [
                    { "value": "浙商银行股份有限公司" },
                    { "value": "立涛园社区人才公寓" },
                    { "value": "印力汇德杭州奥体印象城"},
                    { "value": "萧山宝龙广场" }
                ];
            },
            handleName(){
                if (this.handleNameBtnText === "显示") {
                    this.handleNameBtnText = "隐藏";
                    this.name = "张磊";
                } else {
                    this.handleNameBtnText = "显示";
                    this.name = "张*";
                }
            },
            jumpToTripCard() {
                window.location.href = "https://ur.alipay.com/5Sp5mX06aCdtMkuC0fsIbQ";
            },
            calRestTime () {
                let nowDate = new Date();
                let now = Date.parse(nowDate);
                let endDate = new Date(nowDate.setDate(nowDate.getDate() + 2));
                let end = Date.parse(new Date(endDate.getFullYear() + "/"
                    + ((endDate.getMonth() + 1) > 9 ? endDate.getMonth() + 1 : "0" + (endDate.getMonth() + 1)) + "/"
                    + (endDate.getDate() > 9 ? endDate.getDate() : "0" + endDate.getDate())
                    +" 00:23:34"));
                let msec = end - now;
                if(msec<0) return;
                let hr = parseInt(msec / 1000 / 60 / 60);
                let min = parseInt(msec / 1000 / 60 % 60);
                hr = hr > 9 ? hr : '0' + hr;
                min = min > 9 ? min : '0' + min;
                this.restTime = `${hr}小时${min}分`;
                console.log(this.restTime);
                if(min<0){
                    this.restTime = "35小时23分";
                }
            }
        },
        mounted() {
            setInterval(this.formatDate, 500); // 挂载时开启定时器计算当前时间
            this.addressList = this.loadAll();
            this.calRestTime();
        },
        // 销毁定时器
        beforeDestroy() {
            if (this.formatDate) {
                clearInterval(this.formatDate); // 销毁定时器
            }
        }
    }
</script>

<style scoped>
  #hangzhou-page{
    position:relative;
    background-size:contain;
    background-image: url('@/assets/place-head-bg.png');
    background-repeat: no-repeat;
  }
  .el-card__body{
    padding: 0;
  }
  .el-card{
    border: none;
  }
  .first-card{
    border-radius: 15px;
    margin: 10px 20px 5px 20px;
    padding: 10px 10px 0px 10px;
  }
  .second-card{
    border-radius: 15px;
    margin: 10px 20px 5px 20px;
    padding: 10px 20px;
  }
  .third-card{
    border-radius: 15px;
    margin: 10px 20px 5px 20px;
    padding: 5px 20px;
    background-color: #e2f3fb;
    border: 2px solid white;
  }
  .fourth-card{
    height:fit-content;
    border-radius: 15px;
    margin: 0px 20px 5px 20px;
    padding: 0px 10px 5px 10px;
  }
  .el-divider{
    margin: 8px 0;
    background: 0 0;
    border-top: 1px solid #E6EBF5;
  }
  .date{
    /*font-family: "Microsoft YaHei";*/
    font-size: 20px;
    font-weight: bold;
    color: white;
    letter-spacing: 1px;
  }
  .time{
    /*font-family: "Microsoft YaHei";*/
    margin-top: 10px;
    font-size: 52px ;
    font-weight: bold;
    color: white;
  }
  #name-box{
    margin-top: -10px;
    margin-bottom: -5px;
    /*text-align:left;*/
    float: left;
  }
  #qrc-box{
    float:left;
    position:relative;
    margin-top: -45px;
  }
  .name{
    font-weight: bold;
    font-size: 18px;
  }
  .show{
    margin-left: 10px;
    font-size: 12px;
  }
  .address{
    font-weight: bold;
    font-size: 18px;
  }
  .health-code-name{
    font-weight: bold;
    font-size: 18px;
  }
  .vaccinum{
    color: #c97c13;
    margin-top: 2px;
    margin-bottom: 10px;
  }
  .rest{
    font-weight: bold;
    font-size: 16px;
  }
  .restTime {
    margin-left: 5px;
    font-size: 14px ;
    font-weight: bold;
    color: #119bdc;
  }
  .nucleic-acid {
    width: 45%;
    height: 120px;
    background: linear-gradient(to top right, #539de4 0%, #61aec2 50%, #68cc9a 100%);
    color: white;
    float: left;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .divider{
    float:left;
    position:relative;
    margin-left: 7.5%;
    height:120px;
    width:0px;
    border-left:1px solid #DCDFE6
  }
  .key-areas{
    width: 45%;
    height: 120px;
    float: right;
  }
  .nucleic-acid-btn.is-round{
    padding: 5px 10px 5px 10px;
  }
  .nucleic-acid-btn{
    background-color: rgba(0, 0, 0, 0.0);
    color: white;
    font-size: 10px;
    margin-top: 10px;
  }
  .nucleic-acid-icon{
    border-radius: 50%;
    background-color: white;
    color: #a4a3b7;
  }
  .trip-btn.is-round{
    padding: 5px 20px 5px 20px;
  }
  .trip-btn{
    color: #119bdc;
    border: 1px solid #119bdc;
    margin: 0px 0px 6px 0px;
  }
  .footer1{
    margin-top: 5px;
    font-size: 12px;
    line-height: 1.5;
  }
  .footer2{
    margin-top: 8px;
    font-size: 12px;
    line-height: 1.5;
    color: #959595;
  }
  .footer3{
    margin-top: 3px;
    margin-bottom: 15px;
    font-size: 12px;
    -webkit-transform: scale(0.9);
    color: #959595;
  }
</style>

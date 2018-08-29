Vue.component('aqi',{
  template: '#aqiComponentTemplate',
  props: {
    aqiData: {},
    starFill: '',
  },
  methods: {
    clickStar: function(item){
      this.$emit('favsite',item);
    }
  },
  computed: {
    aqiRank: function(){
      let vm = this;
      let rank = '';
      switch(vm.aqiData.Status){
        case '良好':
          rank = '';
          break;
        case '普通':
          rank = 'status-aqi2';
          break;
        case '對敏感族群不健康':
          rank = 'status-aqi3';
          break;
        case '對所有族群不健康':
          rank = 'status-aqi4';
          break;
        case '非常不健康':
          rank = 'status-aqi5';
          break;
        case '危害':
          rank = 'status-aqi6';
          break;
      }
      return rank;
    }
  }
});
// API 來源
// https://opendata.epa.gov.tw/Data/Contents/AQI/
var app = new Vue({
  el: '#app',
  data: {
    data: [],
    location: [],
    stared: [],
    filter: '',
    exStatus: [
      '良好',
      '普通',
      '對敏感族群不健康',
      '對所有族群不健康',
      '非常不健康',
      '危害',
    ],
  },
  mounted: function(){
    this.getData();
  },
  methods: {
    getData() {
      const vm = this;
      const api = 'http://opendata2.epa.gov.tw/AQI.json';
      $.get(api).then(function( response ) {
        vm.data = response;
        // console.log(response);
      });
    },
    addFavSite: function(item){
      let vm = this;
      let newIndex = vm.stared.findIndex(el => {
        if(el.SiteName == item.SiteName){
        }
      });
      if(newIndex == -1) {
        vm.stared.push(item);
      };
    },
    removeFavSite: function(item){
      let vm = this;
      let removeIndex = '';
      vm.stared.findIndex((el,index) => {
        if(el.SiteName == item.SiteName){
          removeIndex = index;
          return removeIndex;
        }
      });
      vm.stared.splice(removeIndex,1);
    }
  },
  computed: {
    filterCounty: function(){
      let vm = this;
      let allCounty = [...(new Set(vm.data.map(item => item.County)))];
      return allCounty;
    },
    filterSite: function(){
      let vm = this;
      vm.location = vm.data.filter(item => {
        if(item.County == vm.filter){
          return true;
        }else if(vm.filter == ''){
          return true;
        };
      });
      return vm.location;
    }
  }
});